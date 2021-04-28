---
layout: page
title: RP- Vulnerability modeling for sub-Saharan Africa
---


**Replication of**
# Vulnerability modeling for sub-Saharan Africa

Original study *by* Malcomb, D. W., E. A. Weaver, and A. R. Krakowka. 2014. Vulnerability modeling for sub-Saharan Africa: An operationalized approach in Malawi. *Applied Geography* 48:17–30. DOI:[10.1016/j.apgeog.2014.01.004](https://doi.org/10.1016/j.apgeog.2014.01.004)

Replication Authors:
Your Name, Joseph Holler, Kufre Udoh, Open Source GIScience students of fall 2019 and Spring 2021

Replication Materials Available at: [Forked RP-Malcomb Repository](https://github.com/daptx/RP-Malcomb)

Created: `14 April 2021`
Revised: `27 April 2021`

## Abstract

The original study is a multi-criteria analysis of vulnerability to Climate Change in Malawi, and is one of the earliest sub-national geographic models of climate change vulnerability for an African country. The study aims to be replicable, and had 40 citations in Google Scholar as of April 8, 2021.

## Original Study Information

The study region is the country of Malawi. The spatial support of input data includes DHS survey points, Traditional Authority boundaries, and raster grids of flood risk (0.833 degree resolution) and drought exposure (0.416 degree resolution).

The original study was published without data or code, but has detailed narrative description of the methodology. The methods used are feasible for undergraduate students to implement following completion of one introductory GIS course. The study states that its data is available for replication in 23 African countries.

## Data Description and Variables

This section was written collaboratively with fellow peers in GEOG 0323: Maja Cannavo, Emma Clinton, Jacob Freedman, Nick Nonnenmacher, and Alitzel Villanueva.

### *Access & Assets Data*

Demographic and Health Survey data are a product of the United States Agency for International Development (USAID). Variables contained in this dataset are used to represent adaptive capacity (access + assets) in the Malcomb et al.’s (2014) study. These data come from survey questionnaires with large sample sizes.
The DHS data used in our study were collected in 2010. In Malawi, the provenance of the DHA data dates back as far as 1992, but has not been collected consistently every year.

Each point in the household dataset represents a cluster of households with each cluster corresponding to some form of census enumeration units, such as villages in rural areas or city blocks in urban areas [DHS GPS Manual](assets/DHSmanual.pdf). This means that each household in each cluster has the same GPS data. This data is collected by trained [USAID](https://www.usaid.gov/) staff using GPS receivers.

Missing data is a common occurrence in this dataset as a result of negligence or incorrect naming. However, according to the [DHS GPS Manual](assets/DHSmanual.pdf), these issues are easily rectified and typically sites for which data does not exist are recollected. Sometimes, however, missing information is coded in as such or assigned a proxy location.

The DHS website acknowledges the high potential for inconsistent or incomplete data in such broad and expansive survey sets. Missing survey data (responses) are never estimated or made up; they are instead coded as a special response indicating the absence of data. As well, there are clear policies in place to ensure the data’s accuracy. More information about data validity can be found on the [DHS’s Data Quality and Use site](https://www.dhsprogram.com/data/Data-Quality-and-Use.cfm). In this analysis, we use the variables listed in **Table 1** to determine the average adaptive capacity of each TA area. Data transformations are outlined below.

**Table 1:** Variables from DHS Data

| Variable Code | Definition |
| ------------- | ------------- |
| HHID | "Case Identification" |
| HV001 | "Cluster number" |
|HV002 | Household number |
| HV246A |"Cattle own" |
|HV246D | "Goats own"|
|HV246E | "Sheep own" |
|HV246G | "Pigs own" |
| HV248 |"Number of sick people 18-59"|
| HV245 | "Hectares for agricultural land"|
|HV271 | "Wealth index factor score (5 decimals)"|
|HV251 | "Number of orphans and vulnerable children"|
|HV207 | “Has Radio” |
| HV243A | “Has a Mobile Telephone”|
|HV219 | Sex of Head of Household”|
|HV226 | “Type of Cooking Fuel” |
| HV206 |"Has electricty” |
|HV204 |“Time to get to Water Source”|

**Variable Transformations**

1. Eliminate households with null and/or missing values
2. Join TA and LHZ ID data to the DHS clusters
3. Eliminate NA values for livestock
4. Sum counts of all different kinds of livestock into a single variable
5. Apply weights to normalized indicator variables to get scores for each category (assets, access)
6. find the stats of the capacity of each TA (min, max, mean, sd)
7. Join ta_capacity to TA based on ta_id
8. Prepare breaks for mapping
9. Class intervals based on capacity_2010 field
10. Take the values and round them to 2 decimal places
11. Put data in 4 classes based on break values

### *Livelihood Zones Data*

The Livelihood zone data is created by aggregating general regions where similar crops are grown and similar ecological patterns exist. This data exists originally at the household level and was aggregated into Livelihood Zones. To construct the aggregation used for “Livelihood Sensitivity” in this analysis, we use these household points from the FEWSnet data that had previously been aggregated into livelihood zones.

The four Livelihood Sensitivity categories are 1) Percent of food from own farm (6%); 2) Percent of income from wage labor (6%); 3) Percent of income from cash crops (4%); and 4) Disaster coping strategy (4%). In the original R script, household data from the DHS survey was used as a proxy for the specific data points in the livelihood sensitivity analysis (transformation: Join with DHS clusters to apply LHZ FNID variables). With this additional FEWSnet data at the household level, we can construct these four livelihood sensitivity categories using existing variables (Table 1).

The LHZ data variables are outlined in **Table 2**. The four categories used to determine livelihood sensitivity were ranked from 1-5 based on percent rank values and then weighted using values taken from Malcomb et al. (2014).


**Table 2:** Constructing Livelihood Sensitivity Categories

| Livelihood Sensitivity Category (LSC)  | Percent Contributing  | How LSC was constructed  |
| ------------- | ------------- | ------------- |
| Percent of food from own farm  |  6%  | Sources of food: crops + livestock  |
| Percent of income from wage labor  | 6%  | Sources of cash: labour etc. / total * 100  |
| Percent of income from cash crops  | 4%  | sources of cash (Crops): (tobacco + sugar + tea + coffee) + / total sources of cash * 100  |
| Disaster coping strategy  | 4%  | Self-employment & small business and trade: (firewood + sale of wild food + grass + mats + charcoal) / total sources of cash * 100  |

**Variable Transformations**

1. Join with DHS clusters to apply LHZ FNID variables
2. Clip TA boundaries to Malawi (st_buffer of LHZ to .01 m)
3. Create ecological areas: LHZ boundaries intersected with TA boundaries to clip out park/conservation boundaries and rename those park areas with the park information from TA data), combined with lake data to remove environmental areas from the analysis

### *Physical Exposure: Floods + Droughts*

**Floods:**This dataset stems from work collected by multiple agencies and funneled into the PREVIEW Global Risk Data Platform, “an effort to share spatial information on global risk from natural hazards.” The dataset was designed by UNEP/GRID-Europe for the Global Assessment Report on Risk Reduction (GAR), using global data. A flood estimation value is assigned via an index of 1 (low) to 5 (extreme).
**Drought:** This dataset uses the Standardized Precipitation Index to measure annual drought exposure across the globe. The Standardized Precipitation Index draws on data from a “global monthly gridded precipitation dataset” from the University of East Anglia’s Climatic Research Unit, and was modeled in GIS using methodology from Brad Lyon at Columbia University. The dataset draws on 2010 population information from the LandScanTM Global Population Database at the Oak Ridge National Laboratory.  Drought exposure is reported as the expected average annual (2010) population exposed. The data were compiled by UNEP/GRID-Europe for the Global Assessment Report on Risk Reduction (GAR). The data use the WGS 1984 datum, span the years 1980-2001, and are reported in raster format with spatial resolution 1/24 degree x 1/24 degree.

****Variable Transformations**

1. Load in UNEP raster
2. Set CRS for drought to EPSG:4326
3. Set CRS for flood to EPSG:4326 1.Reproject, clip, and resample based on bounding box (dimensions: xmin = 35.9166666666658188, xmax = 32.6666666666658330, ymin = -9.3333333333336554, ymax = -17.0833333333336270) and resolution of blank raster we created: resolution is 1/24 degree x 1/24 degree
4. Use bilinear resampling for drought to average continuous population exposure values
5. Use nearest-neighbor resampling for flood risk to preserve integer values

### Analytical Specification

The original study was conducted using ArcGIS and STATA, but does not state which versions of these software were used.
The replication study will use R.


## Materials and Procedure

*Process Adaptive Capacity*

1. Bring in DHS Data [Households Level] (vector)
2. Bring in TA (Traditional Authority boundaries) and LHZ (livelihood zones) data
3. Get rid of unsuitable households (eliminate NULL and/or missing values)
4. Join TA and LHZ ID data to the DHS clusters
5. Pre-process the livestock data Filter for NA livestock data Update livestock data (summing different kinds)
6. FIELD CALCULATOR: Normalize each indicator variable and rescale from 1-5 (real numbers) based on percent rank
7. FIELD CALCULATOR / ADD FIELD: Apply weights to normalized indicator variables to get scores for each category (assets, access)
8. SUMMARIZE/AGGREGATE: find the stats of the capacity of each TA (min, max, mean, sd)
9. Join ta_capacity to TA based on ta_id (Multiply by 20--meaningless??) I have a question about this (so do I) ln.216
10. Prepare breaks for mapping Class intervals based on capacity_2010 field Take the values and round them to 2 decimal places Put data in 4 classes based on break values
11. Save the adaptive capacity scores

*Process Livelihood Sensitivity*

1. Load in LHZ geometries into R
2. Join LHZ sensitivity data into R code
3. Read in processed LHZ dataset
4. Join the data to the LHZ geometries
5. Put LHZ data into quintiles
6. Calculate capacity score based on values in Malcomb et al. (2014)

*Process Physical Exposure*

1. Load in UNEP rasterSet CRS for drought
2. Set CRS for flood
3. Clean and reproject rasters
4. Create a bounding box at extent of Malawi Where does this info come from
5. For Drought: use bilinear to avg continuous population exposure values
6. For Flood: use nearest neighbor to preserve integer values
7. CLIP the traditional authorities with the LHZs to cut out the lake
8. RASTERIZE the ta_capacity data with pixel data corresponding to capacity_2010 field
9. RASTERIZE the livelihood sensitivity score with pixel data corresponding to capacity_2010 field

*Raster Calculations*

1. Create a mask
2. Reclassify the flood layer (quintiles, currently binary)
3. Reclassify the drought values (quantile [from 0 - 1 in intervals of 0.2 =5])
4. AGGREGATE: Create final vulnerability layer using environmental vulnerability score and ta_capacity.

We then georeferenced maps from the original study using QGIS in order to compare the results generated by our R script to those found in Malcomb et al. (2014). We ran a Spearman's Rho correlation test between the two maps of Figs. 4 and 5 to determine the differences in results.

## Replication Results


| ![](assets/fig4rep.png) | ![](assets/fig4comp.png) |

**Table 3:** Spearman’s rho correlation test results. (rho = 0.7860921). The results of the original study are shown on the x axis (columns), while the results of the reproduction are shown on the y axis (rows).
|   | 1  | 2  | 3  | 4 |
|---|----|----|----|---|
| 1 | 35 | 5  | 0  | 0 |
| 2 | 27 | 26 | 0  | 0 |
| 3 | 5  | 44 | 19 | 0 |
| 4 | 0  | 7  | 28 | 4 |

| ![](assets/fig5rep.png) | ![](assets/fig5comp.png) |

![](assets/scatterplot.png)

For each output from the original study (mainly figure 4 and figure 5), present separately the results of the replication attempt.

2.	State whether the original study was or was not supported by the replication
3.	State whether any hypothesis linked to a planned deviation from the original study was supported. Provide key statistics and related reasoning.

## Unplanned Deviations from the Protocol

Summarize changes and uncertainties between
- your interpretation and plan for the workflow based on reading the paper
- your final workflow after accessing the data and code and completing the code

## Discussion

Provide a summary and interpretation of the key findings of the replication *vis-a-vis* the original study results. If the attempt was a failure, discuss possible causes of the failure. In this replication, any failure is probably due to practical causes, which may include:
- lack of data
- lack of code
- lack of details in the original analysis
- uncertainties due to manner in which data has been used

## Conclusion

Restate the key findings and discuss their broader societal implications or contributions to theory.
Do the research findings suggest a need for any future research?

## References

Include any referenced studies or materials in the [AAG Style of author-date referencing](https://www.tandf.co.uk//journals/authors/style/reference/tf_USChicagoB.pdf).

####  Report Template References & License

This template was developed by Peter Kedron and Joseph Holler with funding support from HEGS-2049837. This template is an adaptation of the ReScience Article Template Developed by N.P Rougier, released under a GPL version 3 license and available here: https://github.com/ReScience/template. Copyright © Nicolas Rougier and coauthors. It also draws inspiration from the pre-registration protocol of the Open Science Framework and the replication studies of Camerer et al. (2016, 2018). See https://osf.io/pfdyw/ and https://osf.io/bzm54/

Camerer, C. F., A. Dreber, E. Forsell, T.-H. Ho, J. Huber, M. Johannesson, M. Kirchler, J. Almenberg, A. Altmejd, T. Chan, E. Heikensten, F. Holzmeister, T. Imai, S. Isaksson, G. Nave, T. Pfeiffer, M. Razen, and H. Wu. 2016. Evaluating replicability of laboratory experiments in economics. Science 351 (6280):1433–1436. https://www.sciencemag.org/lookup/doi/10.1126/science.aaf0918.

Camerer, C. F., A. Dreber, F. Holzmeister, T.-H. Ho, J. Huber, M. Johannesson, M. Kirchler, G. Nave, B. A. Nosek, T. Pfeiffer, A. Altmejd, N. Buttrick, T. Chan, Y. Chen, E. Forsell, A. Gampa, E. Heikensten, L. Hummer, T. Imai, S. Isaksson, D. Manfredi, J. Rose, E.-J. Wagenmakers, and H. Wu. 2018. Evaluating the replicability of social science experiments in Nature and Science between 2010 and 2015. Nature Human Behaviour 2 (9):637–644. http://www.nature.com/articles/s41562-018-0399-z.
