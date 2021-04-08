---
layout: page
title: Urban Resilience Analysis - Green Space Accessibility in Dar es Salaam
---

## Guiding Question

*What percentage of residences in each of Dar es Salam's administrative wards are with 0.25 kilometers (a 3-minute walk) of a public green space?*

In this analysis, we used SQL queries in PostGIS to answer this simple spatial question pertaining to urban resilience & environmental justice in Dar es Salaam, Tanzania. This analysis was done in collaboration with [Emma Clinton](https://emmaclinton.github.io/), GIS aficionado and Conservation Biology student at Middlebury College.

## Accessing Data

![](assets/osm2.png) | ![](assets/rh.jpeg) | ![](assets/ra.png)

The green space and residential data used in this analysis were derived from [OpenStreetMap](https://www.openstreetmap.org/#map=10/-6.8767/39.2287), a collaborative mapping effort aimed at sourcing geodata from the public (relating to the concept of [open source](https://opensource.org/osd)). Data collected for OSM comes from various parties (individuals, research groups, organizations, etc.), where information around the collection is built into the data via a unique identifier and timestamp. For users of OSM, this resource can be helpful for identifying who collected data and when that data was collected for a given space, providing background context that may allude to benefits and gaps within the open source data. In our case, a large portion of contributors to our used dataset were members of [Ramani Huria](https://ramanihuria.org/en/), a community-based mapping project concerned about flood resilience and development in Dar es Salaam. The OSM data downloaded and pushed into our PostGIS database for this analysis was provided by Joseph Holler, Assistant Professor of Geography at Middlebury College.


[Administrative wards data](https://geonode.resilienceacademy.ac.tz/layers/geonode_data:geonode:dar_es_salaam_administrative_wards) was downloaded from the [Resilience Academy](https://geonode.resilienceacademy.ac.tz/), a digital geospatial data repository with WMS raster and WFS feature services that supports research, education, and disaster-risk management practices. Note: The Resilience Academy is one of several projects created by Ramani Huria.   

## Methods

*All sql queries used for this analysis can be found [here](assets/x) for replication*

Our objectives for this analysis are as follows:
- a. to create a vector layer of points representing residential buildings in Dar es Salaam
- b. to determine how many residences are contained within each ward
- c. to filter and pick out green spaces & apply a 0.25 km buffer for accessibility
- d. to calculate how many residences in each ward fall within the green space buffers
In junction, these steps will enable us to run our final calculation, looking at the percentage of residences within an accessible distance of a green space per ward. We acknowledge a network analysis would increase the accuracy of our findings, however, given the learning curve of SQL, we decided to use a buffer for simplicity's sake.

For this analysis, we used the Database Manager within QGIS to access data from Dar es Salaam via the PostGIS database.

First, we will select the residential buildings within Dar es Salaam. Here, we define residential buildings as any point/polygon that is NOT listed as an amenity and has a building tag of 'yes' or 'residential.'

*What is a tag exactly?* In OSM, data is organized in the form of **tags**, which consists of two parts: a *key* and a *value* expressed as key="value." The key defines the categrory of the object, while the value is used to enumerate or further describe the properties of the feature. A goos example of this would be landuse="industrial." The key would be landuse, specifying the feature as a space primarily used by human, and the value would be industrial, meaning the type of feature would be one thats predominantly industrial—such as workshops, factories, or warehouses. Thus, these key value pair will allow us to pick out the residential and greenspace features we want to use in our analysis.

```sql
/* First, lets make a table of the OSM point features that are residential buildings
By default, PostGIS 'does not understand' the type of geometry its getting, so we type-cast
it with ::geometry(geometrytype,SRID) with the parameters being the geometry type & SRID */

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
```

We then repeat this process for the polygon features to ensure our analysis is inclusive of all residences, as contributors to OSM will vary what geometry type they use when inserting geodata.

```sql
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
```
