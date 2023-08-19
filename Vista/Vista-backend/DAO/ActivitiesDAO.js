import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let activities;

export default class ActivitiesDAO {
    static async injectDB(conn) {
        if (activities) {
            return;
        }
        try {
            activities = await conn.db(process.env.REACT_APP_API_BASE_URL).collection("activities");
        } catch (e) {
            console.error(`Unable to establish collection handles in ActivitiesDAO: ${e}`);
        }
    }

    static async create({ userId, cityId, description }) {
        try {
            const activityDoc = {
                userId: ObjectId(userId),
                cityId: ObjectId(cityId),
                description,
                date: new Date(),
            };

            const result = await activities.insertOne(activityDoc);
            return result.ops[0];  
        } catch (error) {
            console.error(`Unable to post activity: ${error}`);
            return null;
        }
    }

    static async findByCity(cityId) {
        try {
            return await activities.find({ cityId: ObjectId(cityId) }).toArray();
        } catch (error) {
            console.error(`Unable to get activities: ${error}`);
            return [];
        }
    }

    static async update(activityId, updates) {
        try {
            const updateResponse = await activities.updateOne(
                { _id: ObjectId(activityId) },
                { $set: updates }
            );

            if (updateResponse.matchedCount === 0) {
                return null;
            }

            return await activities.findOne({ _id: ObjectId(activityId) });
        } catch (error) {
            console.error(`Unable to update activity: ${error}`);
            return null;
        }
    }

    static async delete(activityId) {
        try {
            const deleteResponse = await activities.deleteOne({ _id: ObjectId(activityId) });

            if (deleteResponse.deletedCount === 0) {
                return null;
            }

            return true;
        } catch (error) {
            console.error(`Unable to delete activity: ${error}`);
            return false;
        }
    }
}
