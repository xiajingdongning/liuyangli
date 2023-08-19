import ReviewsDAO from '../DAO/reviewsDAO.js';

export default class ReviewsController {
  static async apiPostReview(req, res, next) {

    console.log("enter server : ")
    try {
      const cityId = req.body.city_id;
      const cityName = req.body.city_name;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        user_id: req.body.user_id,
      };
      const date = new Date();

      const reviewResponse = await ReviewsDAO.addReview(cityId, cityName, userInfo, review, date);
      const { error } = reviewResponse;

      if (error) {
        res.status(500).json({ error: "Unable to post review." });
      } else {
        res.json({ status: "success", response: reviewResponse });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.reviewId;
      const reviewText = req.body.review;
      const date = new Date();
  
      const updateResponse = await ReviewsDAO.updateReview(reviewId, reviewText, date);
      const { error } = updateResponse;
  
      if (error) {
        res.status(500).json({ error: "Unable to update review." });
      } else if (updateResponse.modifiedCount === 0) {
        res.status(404).json({ error: "No review found with that ID to update." });
      } else {
        res.json({ status: "success", response: updateResponse });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
  
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.reviewId;
      console.log("Delete id:" + reviewId)
  
      const deleteResponse = await ReviewsDAO.deleteReview(reviewId);
      const { error } = deleteResponse;
  
      if (error) {
        res.status(500).json({ error: "Unable to delete review." });
      } else if (deleteResponse.deletedCount === 0) {
        res.status(404).json({ error: "No review found with that ID to delete." });
      } else {
        res.json({ status: "success", response: deleteResponse });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      const cityId = req.params.cityId;
      const reviewList = await ReviewsDAO.getReview(cityId);
  
      if (!reviewList) {
        res.status(404).json({ error: "No review found with that ID." });
        return;
      }
  
      res.json(reviewList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiGetReviewByUser(req, res, next) {
    try {
      const userId = req.params.userId;

      const userReviewList = await ReviewsDAO.getReviewByUser(userId);

      if (!userReviewList) {
        res.status(404).json({ error: "No review found with that ID." });
        return;
      }
  
      res.json(userReviewList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
  
  

}