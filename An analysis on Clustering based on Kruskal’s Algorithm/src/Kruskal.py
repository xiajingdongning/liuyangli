# CS5800 Final Project
# Kruskal Algorithm for Clustering
# Original from addejans
# Modified by Yangli Liu
import sys
import math
import matplotlib.pyplot as plt

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

def Find(nodes, i):
    if (i != nodes[i].parent) :
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

def pick(x, y, l, m, c):
    plt.scatter(x, y, label= l, color= c,
            marker= m, s=30)
    
def draw(w,t):
    # windows title
    plt.gcf().canvas.manager.set_window_title(w)
    # x-axis label
    plt.xlabel('x - axis')
    # frequency label
    plt.ylabel('y - axis')
    # plot title
    plt.title(t)
    # showing legend
    plt.legend()
    # function to show the plot
    plt.show()
    
def clustering(x, y, k):
    #initialization
    n = len(x)
    edges = []
    nodes = []
    
    #initialize nodes with xy-coordinates and index
    for i in range(n):
       nodes.append(Node(x[i], y[i], i))
           
    pick(x,y,'Dot & Line','.','black')
           
    #initialize edges with the Euclidean distance between coordinates
    for i in range(n):
        for j in range(i+1, n):
            edges.append(Edge(i, j, euclidean_distance(x[i], y[i], x[j], y[j])))
    
    edges = sorted(edges, key=lambda edge: edge.weight)
     
    #maintain clusters as a set of connected components of a graph.
    #iteratively combine the clusters containing the two closest items by adding an edge between them.
    num_edges_added = 0
    for edge in edges:
        if Find(nodes, edge.u) != Find(nodes, edge.v):
            num_edges_added += 1
            Union(nodes, edge.u, edge.v)
            plt.plot([nodes[edge.u].x, nodes[edge.v].x],[nodes[edge.u].y, nodes[edge.v].y],color='green',linewidth=1)
	#stop when there are k clusters
        if(num_edges_added > n - k):  
            plt.plot([nodes[edge.u].x, nodes[edge.v].x],[nodes[edge.u].y, nodes[edge.v].y],color='red',marker = 'o')
            draw('Final','Clustering')
            return edge.weight
    return -1.0


if __name__ == '__main__':
    with open("twoCircles.txt", "r") as f1:
        data1 = [tuple(i.strip().split(",")) for i in f1.readlines()]
    x = [float(i[0]) for i in data1]
    y = [float(i[1]) for i in data1]
    k1 = 2
    pick(x,y,'Dot','.','blue')
    draw('Circle-Initial','Ploting')
    print("The largest possible value of distance between any two\n\
    points from diﬀerent subsets is at least {0:.10f}".format(clustering(x, y, k1)))
    
    with open("twoMoons.txt", "r") as f2:
        data2 = [tuple(i.strip().split(",")) for i in f2.readlines()]
    a = [float(j[0]) for j in data2]
    b = [float(j[1]) for j in data2]
    k2 = 2
    pick(a,b,'Star','*','blue')
    draw('Moon-Initial','Ploting')
    print("\nThe largest possible value of distance between any two\n\
    points from diﬀerent subsets is at least {0:.10f}".format(clustering(a, b, k2)))

    with open("normalClusters.txt", "r") as f3:
        data3 = [tuple(i.strip().split(",")) for i in f3.readlines()]
    c = [float(k[0]) for k in data3]
    d = [float(k[1]) for k in data3]
    k3 = 7
    pick(c,d,'Dot','*','blue')
    draw('Normal-Initial','Ploting')
    print("\nThe largest possible value of distance between any two\n\
    points from diﬀerent subsets is at least {0:.10f}".format(clustering(c, d, k3)))

    with open("singleLinkage.txt", "r") as f4:
        data4 = [tuple(i.strip().split(",")) for i in f4.readlines()]
    e = [float(l[0]) for l in data4]
    f = [float(l[1]) for l in data4]
    k4 = 5
    pick(e,f,'Star','*','blue')
    draw('Linkage-Initial','Ploting')
    print("\nThe largest possible value of distance between any two\n\
    points from diﬀerent subsets is at least {0:.10f}".format(clustering(e, f, k4)))


