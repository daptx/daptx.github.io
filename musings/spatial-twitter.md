---
layout: page
title: Reproducibility & Replicability of Twitter Data in Spatial Analyses
---

In light of the abundant Californian wildfires back in 2014, Wang et al. (2016) performed a series of analyses on tweets sourced from Twitter's search API to understand the usefulness of social media data in highlighting situational awareness and disaster response during natural hazards (wildfires in this case). Analytical techniques carried out in this study were kernel density estimation (KDE), text mining and k-mean clustering, and social network analysis. In preparing that data, tweets were filtered by keywords, date, and location where those that contained either keyword "fire" or "wildfire," were collected from May 13 to May 22, 2014 (the period marking the 'beginning & end' of these events), and were pertinent to "Bernardo" or "San Marcos"—specific wildfires—within a 40 mile radius of downtown San Diego. Once the tweets had been sorted through, dual kernel density estimation (Dual KDE = cell value of Tweets / cell value of population) was used to depict the density of wildfire-related tweets by population via a raster-formatted heat map. As well, bar charts of the # of tweets (for each keyword: "fire" & "wildfire," "Bernardo," and "San Marcos") by date were provided to show the temporal distribution of tweets during the wildfire events. Text mining was used to identify the most used terms via a frequency plot, then k-means clustering was used to take this text mined (raw tweets filtered) information and transform it into term clusters for wildfire tweets, expressed in a table. These frequent term clusters revealed two critical findings: a higher geographical awareness of Twitter users during wildfire events, users' concerns about how to respond to wildfires, and an appreciation for firefighters. Lastly, social network analysis was used to create a retweet network via the igraph package in R, emphasizing a dependence on either state government or local news outlets for information during disasters.

From my perspective, the work of Wang et al. (2016) is surely replicable and plausibly reproducible, with a few caveats. Given the methods and general documentation of the workflow are fairly transparent, this study has the potential to be reproduced in the context of wildfires in California during 2014. However, "stop words" aren't explicitly defined within the context of text mining, presenting a degree of uncertainty as to how the content of tweets were cleaned and consolidated beyond the initial keyword filtering. As well, given the temporal limitation of this study, if any tweets were deleted, edited, or the affiliated accounts have been deleted from this study period, there could be deviations from the original findings (whether these changes would significantly alter the reproducibility of this study is uncertain). Lastly, while the dual KDE formula was given to us, how tweets and census blocks are connected isn't explicitly stated (even though it appears as a join), creating some ambiguity when making a comparison to the final deliverable. In terms of replicability, this paper lends quite well towards replication as the purpose and analyses from this study can be easily applied in other contexts. Spatial, temporal, and contextual could all be changed, yet still aim to address the primary scientific question/inquiry Wang et al. (2016) pose. For example, a study looking at tweets from Hurricane Harvey in 2017 could inform situational awareness and disaster response during natural hazards, just like this study (the purpose remains the same, but the context changes).

*Sources*
- Wang, Z., X. Ye, and M. H. Tsou. 2016. Spatial, temporal, and content analysis of Twitter for wildfire hazards. Natural Hazards 83 (1):523–540.