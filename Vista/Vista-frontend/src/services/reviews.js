import axios from 'axios';

class ReviewsDataService {
    baseURL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/reviews`;

    // Post a new review
    postReview(data) {
        return axios.post(`${this.baseURL}/reviews`, data);
    }

    getReviews(cityId) {
        return axios.get(`${this.baseURL}/bycity/${cityId}`);
    }

    // Update a review by its ID
    updateReview(reviewId, updatedData) {
        return axios.put(`${this.baseURL}/review/${reviewId}`, updatedData);
    }

    // Delete a review by its ID
    deleteReview(reviewId) {
        return axios.delete(`${this.baseURL}/review/${reviewId}`);
    }

    getReviewByUser(userId) {
        return axios.get(`${this.baseURL}/byuser/${userId}`);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ReviewsDataService();
