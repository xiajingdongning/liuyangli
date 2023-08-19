import express from 'express'; 
import ReviewsController from './reviews.controller.js';

const router = express.Router();

router.route('/review/:reviewId').put(ReviewsController.apiUpdateReview);
router.route('/reviews').post(ReviewsController.apiPostReview);
router.route('/review/:reviewId').delete(ReviewsController.apiDeleteReview);

router.route('/bycity/:cityId').get(ReviewsController.apiGetReview);
router.route('/byuser/:userId').get(ReviewsController.apiGetReviewByUser);


export default router;