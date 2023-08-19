import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;
let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    console.log("request db:" + process.env.CITIESREVIEWS_COLLECTION)
    try {
      reviews = await conn.db(process.env.CITIESREVIEWS_COLLECTION).collection('reviews');
    } catch (e) {
      console.error(`Unable to connect to reviewsDAO: ${e}`);
    }
  }

  static async getReview(cityId) {
    try {
      const reviewList = await reviews.find({ city_id: new ObjectId(cityId) }).toArray();
  
      if (!reviewList) {
        throw new Error('No review found with that ID.');
      }
  
      return reviewList;
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }
  

  static async addReview(cityId, cityName, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user.user_id,
        date: date,
        review: review,
        city_id: new ObjectId(cityId),
        city_name: cityName
      };
  
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
  
  static async updateReview(reviewId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) },
        { $set: { review: review, date: date } },
      );

      if (updateResponse.matchedCount === 0) {
        throw new Error('No review found with that ID to update');
      }

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
      });
  
      if (deleteResponse.deletedCount === 0) {
        throw new Error('No review found with that ID to delete');
      }
  
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getReviewByUser(userId) {
    let cursor;
    try {
      cursor = await reviews.find({
        user_id: userId
      });
      const userReviewList = await cursor.toArray();
      console.log(userReviewList);
      return userReviewList;
    } catch(e) {
      console.error(`Something went wrong in getReviewByUser: ${e}`);
      throw e;
    }
  }
  
}
