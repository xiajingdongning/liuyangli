#author: Jieqi Yang
import numpy as np
import random
import argparse
from plotly import graph_objects as go

    
class KMeans:
    
    def __init__(self, k: int) -> None:
        self.centroids = np.array([0] * k)
        self.k = k
    
    def _init_centroids(self, X: np.array):
        # randomly choose k centroids range from 0 ~ the total number of rows
        self.centroids = X[random.sample(range(X.shape[0]), self.k)]
    
    def fit(self, X: np.array) -> np.array:
        self._init_centroids(X)
        
        i = 0
        while True:
            labels = self._get_label_indices(X, self.centroids)
            # for each cluster, find its member, calculate the mean as new centroids
            new_centroids = self._assign_new_centroids(X, labels)

            # when the found new_centroids are as same as the current centroids, stop the iteration
            if self._distance(new_centroids, self.centroids).sum() == 0:
                break
            
            self.centroids = new_centroids
            
            i += 1
    
    
    def _assign_new_centroids(self, X: np.array, labels: np.array) -> np.array:
        new_centroids = []
        for i in range(self.k):
            cluster_members = X[labels == i]
            # (mean of X, mean of Y) for all records
            new_centroids.append(cluster_members.mean(axis=0))
        return np.array(new_centroids)
    
    
    def _get_label_indices(self, X: np.array, centroids: np.array) -> np.array:
        # For each point, get distance to each centroids
        label_indices = []
        for x in X:
            distances_x_to_centroids = self._distance(x, centroids)
            # Find minimum distance index
            label_idx = np.argmin(distances_x_to_centroids)
            label_indices.append(label_idx)
        return np.array(label_indices)
    
    
    def _distance(self, X: np.array, Y: np.array) -> np.array:

        #ndim() function return the number of dimensions of an array.
        return np.sqrt((X - Y)**2).sum(Y.ndim - 1)
    
    
    def predict(self, X: np.array) -> np.array:
        return self._get_label_indices(X, self.centroids)


def generate_plot(X: np.array, labels: np.array, file_name: str, centroids: np.array):
    fig = go.Figure()
    colors = ['blue', 'red']
    fig.add_trace(
        go.Scatter(
            x = X[:, 0],
            y = X[:, 1],
            mode='markers',
            marker=dict(color=labels, size=10, colorscale=colors)
        )
    )
    centroids_colors = colors[:len(centroids)]
    fig.add_trace(
        go.Scatter(
            x = centroids[:, 0],
            y = centroids[:, 1],
            mode='markers',
            name="centroid",
            marker=dict(color=centroids_colors, size=30, colorscale=colors)
        )
    )
    fig.update_layout(title="K means clusters", showlegend=False)
    fig.write_html(file_name)


if __name__ == "__main__":
    
    parser = argparse.ArgumentParser("Run kmeans to a file and generate labels")
    parser.add_argument("--file-path", required=True, help="input file path, should be txt delimited by ','")
    parser.add_argument("--k", required=True, help="Expected number of clusters")
    args = parser.parse_args()
    
    data = np.loadtxt(args.file_path, delimiter=',')
    k = int(args.k)
    kmeans = KMeans(k)
    kmeans.fit(data)
    labels = kmeans.predict(data)
    output_plot_name = f"{args.file_path[:-4]}_{k}_clusters.html"
    generate_plot(data, labels, output_plot_name, kmeans.centroids)
    
