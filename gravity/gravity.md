---
layout: page
title: Gravity Model of Spatial Interaction
---

**FINAL DELIVERABLES**
* [Online Map](assets/index.html) of Hospital Catchment across New England
* Workflows:
  * Gravity Model [Image](assets/gravitymodel.png)
  * Gravity Model [.model3 File](assets/gravitymodel.model3)
  * Preprocessing Hospital & NE Towns Data (tbd)

**OVERVIEW**
The Gravity Model of Spatial Interaction created this week takes a set of input and target layers, and produces catchments that predict the potential for interaction between the two places. More specifically, our case study applied the gravity model in the context of healthcare. Based on [Homeland Security hospital data](https://hifld-geoplatform.opendata.arcgis.com/datasets/6ac5e325468c4cb9b905f1728d6fbf0f_0) and [New England town data](assets/netown.gpkg) from the American Community Survey 2018 (& processed using [Tidy Census](https://walker-data.com/tidycensus/) in R, thanks Joe <3), we looked at the interactions between hospital clusters and New England towns, then compared the results to preexisting [hospital service area boundaries](https://atlasdata.dartmouth.edu/downloads/supplemental#boundaries) (HSA) from the Dartmouth Atlas of Health Care.

**BREAKING DOWN THE MODEL**
![gravitymodel workflow]((assets/gravitymodel.png))



*Data Sources:*
