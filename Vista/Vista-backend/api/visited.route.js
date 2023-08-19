import express from 'express';
import { getCitiesVisitedByUser, markCityAsVisited } from './visited.controller.js';

const router = express.Router();

router.route('/:userId').get(getCitiesVisitedByUser);
router.route('/:userId/cities/:cityId').post(markCityAsVisited);

export default router;
