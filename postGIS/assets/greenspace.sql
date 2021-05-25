/* Create a table of points that are residential buildings*/
/* Here, we are defining residential buildings as any point/polygon that is not listed as an amenity and listed as a building*/
-- by default, PostGIS doesn't seem to know what type of geometry it's getting,
--so we type-cast it with ::geometry(multipolygon,32737)  where the parameters are the geometry type and SRID

CREATE TABLE buildings_point AS
SELECT osm_id, building, amenity, st_transform(way,32737)::geometry(point,32737) as geom, osm_user, osm_uid, osm_version, osm_timestamp
FROM public.planet_osm_point
WHERE amenity IS NULL
AND building IS NOT NULL;

ALTER TABLE buildings_point
ADD COLUMN res real;

UPDATE buildings_point
SET res = 1
WHERE building = 'yes' OR building = 'residential';

DELETE FROM buildings_point
WHERE res IS NULL;

ALTER TABLE buildings_point
DROP COLUMN amenity;

CREATE TABLE buildings_poly AS
SELECT osm_id, building, amenity, st_transform(way,32737)::geometry(polygon,32737) as geom, osm_user, osm_uid, osm_version, osm_timestamp
FROM public.planet_osm_polygon
WHERE amenity IS NULL
AND building IS NOT NULL;

ALTER TABLE buildings_poly
ADD COLUMN res real;

UPDATE buildings_poly
SET res = 1
WHERE building = 'yes' OR building = 'residential';

DELETE FROM buildings_poly
WHERE res IS NULL;

____________________________________________________________
/* Now, convert the polygons to centroids to simplify the geometries. */

CREATE TABLE buildings_centroids AS
SELECT osm_id, building, osm_user, osm_uid, osm_version, osm_timestamp, st_centroid(geom)::geometry(point,32737) as geom
FROM buildings_poly;

/* Union the points together to create one point-based table of residences*/

CREATE TABLE unionres AS
SELECT osm_id, building, st_transform(geom,32737)::geometry(point,32737) as geom, osm_user, osm_uid, osm_version, osm_timestamp
FROM buildings_point
UNION
SELECT osm_id, building, st_transform(geom,32737)::geometry(point,32737) as geom, osm_user, osm_uid, osm_version, osm_timestamp
FROM buildings_centroids;

____________________________________________________________
/* Join the wards data to the unionres table. */

ALTER TABLE unionres
ADD COLUMN ward_name text;

UPDATE unionres
SET ward_name = ward_census.ward_name
FROM ward_census
WHERE st_intersects(unionres.geom, st_transform(ward_census.utmgeom,32737));

____________________________________________________________
/* Count the number of residences per ward */

/* Alter table "ward census" by adding counts of the residences contained within each ward:*/

ALTER TABLE ward_census
ADD COLUMN res_count int;

UPDATE ward_census
SET res_count = (SELECT count(*) FROM unionres WHERE unionres.ward_name = ward_census.ward_name);

____________________________________________________________
/* Time to consider greenspace! */
/* Filter by public accessibility */

CREATE TABLE greenspace AS
SELECT osm_id, access, leisure, landuse, "natural", st_transform(way,32737)::geometry(polygon,32737) as geom, osm_user, osm_uid, osm_version, osm_timestamp
FROM public.planet_osm_polygon
WHERE access = 'yes' OR access = 'permissive' OR access IS NULL;

/* Filter by type of greenspace, based on OSM key values */

ALTER TABLE greenspace
ADD COLUMN green real;

UPDATE greenspace
SET green = 1 WHERE leisure = 'common' OR leisure = 'dog_park'
OR leisure = 'garden' OR landuse = 'greenfield' OR landuse = 'grass'
OR leisure = 'nature_reserve' OR 	leisure = 'park' OR leisure = 'pitch'
OR landuse = 'recreation_ground' OR landuse = 'village_green' OR landuse = 'forest'
OR "natural" = 'wood' OR "natural" = 'grassland' OR "natural" = 'shrub' OR landuse = 'allotments';

DELETE FROM greenspace
WHERE green IS NULL;

/* Buffer the greenspaces by an accessible amount of distance (in our case, .25 km)*/
CREATE TABLE greenbuffer AS
SELECT osm_id, st_buffer(geom, 250)::geometry(polygon,32737) as geom from greenspace;

/* Intersect the points with the greenspace buffer to differentiate points that are within a buffer from those that are not */
ALTER TABLE unionres
ADD COLUMN green int;

UPDATE unionres
SET green = 1
FROM greenbuffer
WHERE st_intersects(unionres.geom, st_transform(greenbuffer.geom,32737));

____________________________________________________________

/* Count the number of greenspace accessible residences per ward */

/* Alter table "ward census" by adding counts of the residences contained within each ward:*/

ALTER TABLE ward_census
ADD COLUMN green_count int;

UPDATE ward_census
SET green_count = (SELECT count(*) FROM unionres WHERE unionres.ward_name = ward_census.ward_name AND unionres.green = 1);

____________________________________________________________
/* Calculate the percentage of the residences in each ward that are within .25km of a publicly accessible greenspace */

ALTER TABLE ward_census
ADD COLUMN greenpct real;

UPDATE ward_census
SET greenpct = CAST(@green_count AS FLOAT) / CAST(@res_count AS FLOAT) * 100;
