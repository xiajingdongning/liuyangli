# Algorithm - Machine Learning [An analysis on Clustering based on Kruskal’s Algorithm] Demo

## [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/JogYMNKuaNw/0.jpg)](https://www.youtube.com/watch?v=JogYMNKuaNw) 


* Name and partners name
 * Team member 1: *Yangli Liu*
 * Team member 2: *Xiaobo Qian*
 * Team member 3: *Jieqi Yang*
 * Team member 4: *Lu Wang*
  
* How many hours did it take you to complete this project?   *Around 40 hours in total.*
* Did you collaborate or share ideas with any other people?   *Especially thanks to all my teammates in creating this project. Our team Lead is Xiaobo Qian.*
* Did you use any external resources? 
  * *https://github.com/addejans/kruskal-clustering*
  * *https://www.geeksforgeeks.org/k-means-clustering-introduction/*
  * *Wang Peng, Wang Junyi, "A Clustering Algorithm Based on Find Density Peaks," Proceedings of 2017 the 7th International Workshop on Computer Science and Engineering, pp. 81-85, Beijing, 25-27 June, 2017.*
  * *Else, please see References section in the final report*
  
* What was the most interesting part of this project? *How to implement different algorithms to achieve the clustering outcomes and using CFSFDP to improve Kruskal Clustering.*

<img src="./media/Silhoutte Analysis.png" alt="picture">
<img src="./media/Original data.png" alt="picture">

### Abstract
*In this project, we were exploring the performance of Kruskal's Algorithm on clustering. 
We tested the algorithm on four different datasets, and by comparing with K-means clustering, we found that Kruskal's algorithm clustering showed better performance than K-means clustering. 
Further, we also tried to make some improvements to the clustering approach. 
By comparing the results before and after the improvements, we found there was no obvious change on the final formed clusters if we changed the function of calculating the distance. 
Besides, we also tried to improve the clustering approach by including the density property of datasets into our calculation.* 

### Project Introduction
Despite the fact that there are different types of clustering algorithms, each of which offers a different approach to the challenge of discovering natural groups in data, most of them have limitations in meeting their robustness and quality for clustering. 
In this project, we are going to further explore Kruskal-based clustering and K-Means clustering by diving into the theories behind how the two algorithms work and comparing their clustering performances directly. 
After that, we will discuss some potential improvements using different distance formula and new techniques for our clustering approach.

### How to run this project
All the data files is in the data folder. We use python to create the project. You can use any IDE or IDLE to run the scripts. 
*In the command prompt to check is python and pip is installed on your system: python --version*
For the kruskal script [Kruskal.py](./src/Kruskal.py), you should try to compile the datas with the script.
If you know how to use command line, you can modify [Kmeans.py](./src/Kmeans.py) to your needs, but you should be able to type `python3 kmeans.py` and then run the generated executable. 
You can also modify [Final_Improvement.py](./src/Final_Improvement.py) to your needs, then run the generated executable. 
In order to do the ploting(visual representation), you will need to import some prebuilt plug-in or libraries including matplotlib.pyplot, sys, math, numpy, pandas, random, argparse and scipy.
*Matplotlib can be installed using pip. The following command is run in the command prompt to install Matplotlib: pip install matplotlib*
[Silhouette.py](./src/Silhouette.py) script is only for evaluating the existing clustering methods and need to be compiled with data file in the same driver.

<p align="center">
  <img src="./media/Fixed Density Peak Center Finding(CFSFDP).png" alt="picture">
  <img src="./media/Evaluation of Kruskal Clustering by CFSFDP centers.png" alt="picture">
  <img src="./media/Improved Kruskal Clustering by CFSFDP.png" alt="picture">
</p>

### Deliverables
* I commit all codes to this repository src folder.
* Upload the final report and the presentation deck to their corresponding folders.
* Put a link to a youtube video in README.md.

