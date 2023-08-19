import express from "express";
import cors from 'cors';
import Cities from "./api/cities.route.js";
import Favorites from './api/favorites.route.js';
import Reviews from './api/reviews.route.js';
import Visited from './api/visited.route.js';
import Activities from './api/activities.route.js';





const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/v1/cities', Cities);
app.use('/api/v1/favorites', Favorites);
app.use('/api/v1/reviews', Reviews);
app.use('/api/v1/visited', Visited);
app.use('/api/v1/activities', Activities);


app.use('*',(req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;
