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

**DECONSTRUCTING THE MODEL**
![gravitymodel workflow](assets/gravitymodel.png)
While the [tutorial videos](https://midd.hosted.panopto.com/Panopto/Pages/Sessions/List.aspx#folderID=%22324cb720-6901-48e2-b57a-acdf014ab826%22) for the week provided a good base for setting up the model, it's worth verbalizing how we integrated this workflow (see below) from GEOG 0120 into our final product. ![](/assets/120workflow.png)

The model was broken down into 3 main parts:
* Executing a Distance Matrix - This required an input and target layer (both with IDs and weights) and k (the # of nearest features each input was compared to, with a default value of 20). An additional step taken to remove error was converting both input and target features into centroids, as distance matrix can only utilize points.
* Calculating Max Potential - This first required two joins, where the input weight (population in this case) and target weight (# of beds in this case) were added to the distance matrix. After, a series of field calculators were used to find the potential and and max potential:
> @InputWeight + '^' + to_string(@lambda) + ' * ' + @TargetWeight + '^' + to_string(@alpha) + ' / ("Distance"/1000)' + '^' + to_string(@beta)
> maximum("potential", group_by:= "InputID")

*NOTE: By adding exponents to the input weight, target weight, and distance parameter, we were able to fully implement the full gravity model formula: (inputWeight)^λ * (targetWeight)^α / (distance)^β as described in Rodrigue’s [The Geography of Transport Systems](https://transportgeography.org/contents/methods/spatial-interactions-gravity-model/)*

* Aggregating the Data to make Catchment Areas-


*Data Sources:*
