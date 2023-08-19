import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;
let cities;

export default class CitiesDAO {
  static async injectDB(conn) {
    if (cities) {
      return;
    }
    try {
      cities = await conn.db(process.env.CITIESREVIEWS_COLLECTION).collection('cities_info');
    } catch (e) {
      console.error(`Unable to connect to citiesDAO: ${e}`);
    }
  }

  static async getCities() {
    let query;

    try {
      const cursor = cities 
        .find(query)

      const citiesList = await cursor.toArray();
      const totalNumCities = await cities.countDocuments(query);

      return { citiesList, totalNumCities };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { citiesList: [], totalNumCities: 0 };
    }
  }

 // static async getRatings() {
 //   let ratings = [];
 //   try {
 //     ratings = await movies.distinct('rated');
 //     return ratings;
 //   } catch (e) {
 //     console.error(`Unable to get ratings, ${e}`);
 //     return ratings;
 //   }
 // }

  static async getCityByID(id) {
    try {
      return await cities.aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "city_id",
            as: "reviews",
          },
        },
      ]).next();

    } catch (e) {
      console.error(`Unable to get city by ID: ${e}`);
      throw e;
    }
  }

static async updateCityVideoLink(cityId, youtubeLink) {
  try {
      const updateResponse = await cities.updateOne(
          { _id: ObjectId(cityId) },
          { $set: { youtubeLink: youtubeLink } }
      );

      if (updateResponse.matchedCount === 0) {
          return null;
      }

      return await cities.findOne({ _id: ObjectId(cityId) });
  } catch (e) {
      console.error(`Unable to update video link: ${e}`);
      throw e;
  }
}
}


