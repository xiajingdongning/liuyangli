import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let visited;  

export default class VisitedDAO {
    static async injectDB(conn) {
        if (visited) {
            return;
        }
        try {
            visited = await conn.db(process.env.CITIESREVIEWS_COLLECTION).collection("VirtualVisits");
        } catch (e) {
            console.error(`Unable to establish a collection handle in VisitedDAO: ${e}`);
        }
    }

    static async create({ userId, cityId }) {
        try {
            const existingVisit = await visited.findOne({ userId: userId, cityId: cityId });

            if (existingVisit) {
                console.log('User has already visited this city.');
                return null;  
            }

            const visitedDoc = {
                userId: userId,
                cityId: cityId,
                date: new Date(),
            };

             await visited.insertOne(visitedDoc);
             console.log('MongoDB Insert Result:', result);

             return result;

        } catch (error) {
            console.error(`Unable to mark city as visited: ${error}`);
            throw error;
        }
    }

    static async findByUser(userId) {
        try {
            return await visited.find({ userId: userId }).toArray();
        } catch (error) {
            console.error(`Unable to get visited cities by user: ${error}`);
            throw error;
        }
    }
}
