import express from 'express';
import {
    postActivity,
    getActivitiesByCity,
    updateActivity,
    deleteActivity
} from './activities.controller.js';

const router = express.Router();

router.post('/', postActivity);

router.get('/city/:cityId', getActivitiesByCity);

router.put('/:activityId', updateActivity);

router.delete('/:activityId', deleteActivity);

export default router;

