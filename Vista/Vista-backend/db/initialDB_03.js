import mongodb from 'mongodb';

const { MongoClient, GridFSBucket } = mongodb;

async function main() {
    const client = new MongoClient("mongodb://0.0.0.0:27017");

    await client.connect();
    
    let db = await client.db("travel_guide_db").collection('cities_info');
    
    let pictures = [
        { cityName: "Amsterdam", filePath: "/CityImages/Amsterdam.jpg" },
        { cityName: "Bali", filePath: "/CityImages/Bali.jpg" },
        { cityName: "Bangkok", filePath: "/CityImages/Bangkok.jpg" },
        { cityName: "Berlin", filePath: "/CityImages/Berlin.jpg" },
        { cityName: "Budapest", filePath: "/CityImages/Budapest.jpg" },
        { cityName: "Buenos Aires", filePath: "/CityImages/Buenos_Aires.jpg" },
        { cityName: "Cancun", filePath: "/CityImages/Cancun.jpg" },
        { cityName: "Cape Town", filePath: "/CityImages/Cape_Town.jpg" },
        { cityName: "Chiang Mai", filePath: "/CityImages/Chiang_Mai_Pai.jpg" },
        { cityName: "Granada", filePath: "/CityImages/Granada.jpg" },
        { cityName: "Florence", filePath: "/CityImages/Florence.jpg" },
        { cityName: "Ho Chi Minh City", filePath: "/CityImages/Ho_Chi_Minh_City.jpg" },
        { cityName: "Hong Kong", filePath: "/CityImages/Hong_Kong.jpg" },
        { cityName: "Sofia", filePath: "/CityImages/Sofia.jpg" },
        { cityName: "Lisbon", filePath: "/CityImages/Lisbon.jpg" },
        { cityName: "Lima", filePath: "/CityImages/Lima.jpg" },
        { cityName: "London", filePath: "/CityImages/London.jpg" },
        { cityName: "Madrid", filePath: "/CityImages/Madrid.jpg" },
        { cityName: "Malaga", filePath: "/CityImages/Malaga.jpg" },
        { cityName: "Marseille", filePath: "/CityImages/Marseille.jpg" },
        { cityName: "New York", filePath: "/CityImages/New_York.jpg" },
        { cityName: "Nice", filePath: "/CityImages/Nice.jpg" },
        { cityName: "Paris", filePath: "/CityImages/Paris.jpg" },
        { cityName: "Prague", filePath: "/CityImages/Prague.jpg" },
        { cityName: "Rome", filePath: "/CityImages/Rome.jpg" },
        { cityName: "Sydney", filePath: "/CityImages/Sydney.jpg" },
        { cityName: "Tokyo", filePath: "/CityImages/Tokyo.jpg" },
        { cityName: "Valencia", filePath: "/CityImages/Valencia.jpg" },
        { cityName: "Venice", filePath: "/CityImages/Venice.jpg" },
        { cityName: "Vienna", filePath: "/CityImages/Vienna.jpg" }
    ];
    
    
    for (let picture of pictures) {
        await db.updateOne(
            { "CityName": picture.cityName },
            { $set: { "imagePath": picture.filePath } }
        );
    }
}
main();
console.log("end");
