---
layout: page
title: Urban Resilience Analysis - Green Accessibility in Dar es Salaam
---

## Guiding Question

*What percentage of residences in each of Dar es Salam's administrative wards are with 0.25 kilometers (a 3-minute walk) of a public greenspace?*

In this analysis, we used SQL queries in PostGIS to answer this simple spatial question pertaining to urban resilience & environmental justice in Dar es Salaam, Tanzania. This analysis was done in collaboration with [Emma Clinton](https://emmaclinton.github.io/), GIS aficionado and Biology student at Middlebury College.

## Accessing Data
 | |
:--: | :--: | :--:
![](assets/osm.png) | ![](assets/rh.jpeg) | ![](assets/ra.png)

The greenspace and residential data used in this analysis were derived from [OpenStreetMap](https://www.openstreetmap.org/#map=10/-6.8767/39.2287), a collaborative mapping effort aimed at sourcing geodata from the public (relating to the concept of[open source](https://opensource.org/osd)). Data collected for OSM comes from various parties (individuals, research groups, organizations, etc.), where information around the collection is built into the data via a unique identifier and timestamp. For users of OSM, this resource can be helpful for identifying who collected data and when that data was collected for a given space, providing background context that may allude to benefits and gaps within the open source data. In our case, a large portion of contributors to our used dataset were members of Ramani Huria, a community-based mapping project concerned about flood resilience and development in Dar es Salaam.

[Administrative Wards data](https://geonode.resilienceacademy.ac.tz/layers/geonode_data:geonode:dar_es_salaam_administrative_wards) was downloaded from the Resilience Academy, a digital geospatial data repository with WMS raster and WFS feature services that supports research, education, and disaster-risk management practices. Note: The Resilience Academy is one of several projects created by Ramani Huria.   

## Methods

*All sql queries used for this analysis can be found [here](assets/x) for replication*


OpenStreetMap is a collaborative project to create a free editable map of the world. The geodata underlying the map is considered the primary output of the project.
