# -*- coding: utf-8 -*-
"""
Created on Sat Apr 23 14:10:44 2022

@author: Xiaobo Qian
"""

# CS5800 Final Project
# Kruskal Algorithm for Clustering
# Modified by Xiaobo Qian
import sys
import math
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd 
import scipy as stats

class Node:
    def __init__(self, x, y, p):
        self.x = x
        self.y = y
        self.parent = p
        self.rank = 0

class Edge:
    def __init__(self, u, v, w):
        self.u = u
        self.v = v
        self.weight = w

def euclidean_distance(x1, y1, x2, y2):
    return math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))

def chebyshev_distance(x1, y1, x2, y2):
    return max(abs(x1 - x2), abs(y1 - y2))

def manhattan_distance(x1, y1, x2, y2):
    return abs(x1 - x2) + abs(y1 - y2)

def mahalanobis_distance(x1, y1, x2, y2, inv_covmat):
    a = np.zeros((1,2))
    b = np.zeros((1,2))
    a[0][0],a[0][1] = x1, y1
    b[0][0],b[0][1] = x2, y2
    diff = b - a
    left = np.dot(diff, inv_covmat)
    mahal = np.dot(left, diff.T)
    val = mahal[0]
    return val**0.5


def Gaussian_kernel(index, arr, cutoff, choose):
    ret = 0
    for i in range(len(arr)):
        if i == index or not i in choose:
            continue
        x = arr[i][1]
        ret += math.exp(-(x**2/cutoff**2))
    return ret
    
def Find(nodes, i):
    if i != nodes[i].parent :
        nodes[i].parent = Find(nodes, nodes[i].parent)
    return nodes[i].parent

def Union(nodes, u, v):
    r1 = Find(nodes, u)
    r2 = Find(nodes, v)
    if (r1 != r2):
        if (nodes[r1].rank > nodes[r2].rank):
            nodes[r2].parent = r1
        else:
            nodes[r1].parent = r2
            if (nodes[r1].rank == nodes[r2].rank):
                nodes[r2].rank += 1

def drawPoints(x, y, l, m, c):
    plt.scatter(x, y, color= c,
            marker= m, s=10)
    
def draw(w,t):
    plt.gcf().canvas.manager.set_window_title(w)
    plt.xlabel('x - axis')
    plt.ylabel('y - axis')
    plt.title(t)
    plt.legend()
    plt.show()
    
def clustering(x, y, k):
    n = len(x)
    edges = []
    nodes = []
    
    # calculate inverse of sample covariance matrix (f) (for mahalanobis_distance)
    # data = np.zeros((len(x),2))
    # for i in range(len(x)):
    #     data[i][0] = x[i]
    #     data[i][1] = y[i]
    # cov = np.cov(data.T)
    # inv_covmat = np.linalg.inv(cov)
    
    for i in range(n):
       nodes.append(Node(x[i], y[i], i))
           
    drawPoints(x,y,'Dot & line','.','grey')
           
    dists = [[[0 for k in range(2)] for i in range(n)] for j in range(n)]
    
    #initialize distance matrix
    for i in range(n):
        for j in range(i+1, n):
            val = euclidean_distance(x[i], y[i], x[j], y[j])
            dists[i][j][0] = j 
            dists[i][j][1] = val
            dists[j][i][0] = i
            dists[j][i][1] = val
    
    distsSorted = [[0 for i in range(n)] for j in range(n)]
    for i in range(n):
        distsSorted[i] = list(map(lambda x: x[1], sorted(dists[i], key=lambda ele: ele[1])))
    
    # cutoff distance for CFSFDP
    cnt = 4
    cutoff = sum(map(lambda x:sum(x[:cnt + 1]),distsSorted))/(cnt * len(distsSorted))
    
    # compute scores for all vertices
    chooseSet = set()
    for i in range(n):
        chooseSet.add(i)
    denseRec = [0 for i in range(n)]
    for i in range(n):
        denseRec[i] = Gaussian_kernel(i, dists[i], cutoff, chooseSet)
    
    delta = [0 for i in range(n)]
    for i in range(n):
        minDist = float("inf")
        maxDist = -1
        for j in range(n):
            if i != j and denseRec[j] > denseRec[i] and dists[i][j][1] < minDist:
                minDist = dists[i][j][1]
            if i != j and dists[i][j][1] > maxDist:
                maxDist = dists[i][j][1]
        if minDist == float("inf"):
            delta[i] = maxDist
        else:
            delta[i] = minDist
    scores = {}
    v = [[0 for i in range(2)] for j in range(n)]
    for i in range(n):
        v[i][0] = i
        v[i][1] = denseRec[i] * delta[i] 
        scores[i] =  denseRec[i] * delta[i] 
    
    
    # pick vertices based on scores 
    v_sorted = sorted(v, key=lambda ele: ele[1])
    k2 = math.floor(0.1 * n)
    kleft = n - k2
    chooseSet = set()
    chooseArr = []
    for i in range(k2, n):
        node = nodes[v_sorted[i][0]]
        # drawPoints(node.x,node.y,'Dot & line','.','red')
        # plt.scatter(node.x, node.y, color='red', marker= '.', s=30)
        chooseSet.add(v_sorted[i][0])
        chooseArr.append(v_sorted[i][0])
    for i in range(0, k2):
        node = nodes[v_sorted[i][0]]
        # drawPoints(node.x,node.y,'Dot & line','.','blue')
        # plt.scatter(node.x, node.y, color='blue', marker= '.', s=30)
    
    
    for v in chooseSet:
        nodes[v].parent = v
    chooseEdges = []
    for i in range(len(chooseSet)):
        v1 = chooseArr[i]
        for j in range(i + 1, len(chooseSet)):
            v2 = chooseArr[j]
            chooseEdges.append(Edge(v1, v2, dists[v1][v2][1]))
    # buildMST(chooseEdges, nodes, chooseSet, k, 'red')
    
    # centers based on new calculated scores on picked vertices
    k3 = 7
    chooseScores = computeScores(dists, cutoff, chooseSet)
    n2 = len(chooseScores)
    centers = set()
    for i in range(n2 - k3,n2):
        index = chooseScores[i][0]
        centers.add(index)
        node = nodes[index]
        plt.scatter(node.x, node.y, color='red', marker= '.', s=60)
        
    # add edges and recover nodes for building MST
    for i in range(n):
        for j in range(i + 1, n):
            edges.append(Edge(i, j, dists[i][j][1]))
            # x1 = nodes[i].x
            # y1 = nodes[i].y
            # x2 = nodes[j].x
            # y2 = nodes[j].y
            # edges.append(Edge(i, j, mahalanobis_distance(x1, y1, x2, y2,inv_covmat)))
    
    cSet = set()
    for i in range(n):
        nodes[i].parent = i
        cSet.add(i)
    
    # build clusters based on naive Kruskal clustering
    clusters = buildMST(edges, nodes, cSet, k, 'grey', alpha=0.5)
    
    # compute the number of centers in each cluster
    centerCnt = {}    
    for k in clusters.keys():
        for center in centers:
            cluster = clusters[k]
            if center in cluster:
                if k not in centerCnt:
                    centerCnt[k] = 1
                else:
                    centerCnt[k] = centerCnt[k] + 1
   
    # divide clusters if one cluster contains more than 1 centers
    for k in centerCnt.keys():
        if centerCnt[k] > 1:
            divCnt = centerCnt[k]
            cluster = clusters[k]
            selScores = []
            for index in cluster:
                selScores.append([index, scores[index]])
            tempScores = sorted(selScores, key=lambda x:x[1])
            n_c = len(cluster) # number of vertices in this cluster
            k4 = math.floor(0.9 * n_c) # size of reserved vertices
            reservedVertices = []
            cNodes = set()
            cEdges = []
            for i in range(n_c - k4, n_c):
                reservedVertices.append(tempScores[i][0])
                cNodes.add(tempScores[i][0])
            for v in reservedVertices:
                node = nodes[v]
                node.parent = v
                # plt.scatter(node.x, node.y, color='red', marker= '.', s=10)
            for i in range(len(reservedVertices)):
                v1 = reservedVertices[i]
                for j in range(i + 1, len(reservedVertices)):
                    v2 = reservedVertices[j]
                    cEdges.append(Edge(v1, v2, dists[v1][v2][1]))
            divClusters = buildMST(cEdges, nodes, cNodes, divCnt, "red")
            del clusters[k]
            for k2 in divClusters:
                clusters[k2] = divClusters[k2]
            
           
def computeScores(dists, cutoff, chooseSet):
    denseRec = {}
    delta = {}
    for i in chooseSet:
        denseRec[i] = Gaussian_kernel(i, dists[i], cutoff, chooseSet)
    for i in chooseSet:
        minDist = float("inf")
        maxDist = -1
        for j in chooseSet:
            if i != j and denseRec[j] > denseRec[i] and dists[i][j][1] < minDist:
                minDist = dists[i][j][1]
            if i != j and dists[i][j][1] > maxDist:
                maxDist = dists[i][j][1]
            if minDist == float("inf"):
                delta[i] = maxDist
            else:
                delta[i] = minDist
    arr = []
    for i in chooseSet:
        arr.append([i, denseRec[i] * delta[i]])
    arr = sorted(arr, key=lambda x: x[1])
    return arr
    

def buildMST(edges,nodes, cNodes, k, color, alpha = 1):
    clusters = {}
    n = len(cNodes)
    edges = sorted(edges, key=lambda edge: edge.weight)
     
    #maintain clusters as a set of connected components of a graph.
    #iteratively combine the clusters containing the two closest items by adding an edge between them.
    num_edges_added = 0
    for edge in edges:
        if Find(nodes, edge.u) != Find(nodes, edge.v):
            num_edges_added += 1
            Union(nodes, edge.u, edge.v)
            plt.plot([nodes[edge.u].x, nodes[edge.v].x],[nodes[edge.u].y, nodes[edge.v].y],color=color,linewidth=1, alpha=alpha)
	#stop when there are k clusters
        if(num_edges_added == n - k):
            for i in range(len(nodes)):
                parent = Find(nodes, i)
                if parent not in cNodes:
                    continue
                if parent in clusters:
                    clusters[parent].add(i)
                else:
                    clusters[parent] = set()
                    clusters[parent].add(i)
            return clusters
            
    
         


if __name__ == '__main__':
    with open("singleLinkage2.txt", "r") as f2:
        data2 = [tuple(i.strip().split(",")) for i in f2.readlines()]
    a = [float(j[0]) for j in data2]
    b = [float(j[1]) for j in data2]
    k2 = 7
    drawPoints(a,b,'Star','*','blue')
    draw('Moon-Initial','Ploting')
    clustering(a,b,k2)
   

