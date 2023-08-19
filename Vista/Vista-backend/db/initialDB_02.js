import mongodb from 'mongodb';
// Initialize a new MongoClient
const MongoClient = mongodb.MongoClient;

console.log("start");

async function main() {
    const client = new mongodb.MongoClient("mongodb://0.0.0.0:27017");
  
    try { 
        await client.connect();
        await addYoutubeLinks(client);
        client.close();
    } catch (e) {
      console.error(e);
      process.exit (1);
    }
  }
  
  main().catch(console.error);

async function addYoutubeLinks(client) {
    let db = await client.db("travel_guide_db").collection('cities_info');
    let links = [
        { cityName: "Amsterdam", url:"https://www.youtube.com/embed/W8_nIQtv5x4" },
        { cityName: "Bali", url: "https://www.youtube.com/embed/Ay2-vH2hNrQ" },
        { cityName: "Bangkok", url: "https://www.youtube.com/embed/h8JXa3dz0_E" },
        { cityName: "Berlin", url:"https://www.youtube.com/embed/A3wriE0MPos" },
        { cityName: "Budapest", url:"https://www.youtube.com/embed/78Cb6rbgTG8" },
        { cityName: "Buenos Aires", url: "https://www.youtube.com/embed/0pXLBg1U-cQ" },
        { cityName: "Cancun", url: "https://www.youtube.com/embed/VCObIPRU4B0" },
        { cityName: "Cape Town", url: "https://www.youtube.com/embed/rWD373Uf0jc" },
        { cityName: "Chiang Mai", url: "https://www.youtube.com/embed/q49G2MXCIk0" },
        { cityName: "Granada", url: "https://www.youtube.com/embed/i1hk6Vi_Dfs" },
        { cityName: "Florence", url: "https://www.youtube.com/embed/ajBikS8f21Y"  },
        { cityName: "Ho Chi Minh City", url: "https://www.youtube.com/embed/SaeH8TtIHPg" },
        { cityName: "Hong Kong", url: "https://www.youtube.com/embed/skn-h6pi8V8" },
        { cityName: "Sofia", url: "https://www.youtube.com/embed/NX2i3kCfsgY" },
        { cityName: "Marseille", url: "https://www.youtube.com/embed/JiAVdr9cOH4" },
        { cityName: "Lisbon", url: "https://www.youtube.com/embed/S2Gi7NBdPyU" },
        { cityName: "Lima", url: "https://www.youtube.com/embed/24q6nES2tk0" },
        { cityName: "London", url: "https://www.youtube.com/embed/YoaCgB3qfnA" },
        { cityName: "Madrid", url: "https://www.youtube.com/embed/RCtVxnLAZpk" },
        { cityName: "Malaga", url: "https://www.youtube.com/embed/xxm-ChzVt48"  },
        { cityName: "New York", url: "https://www.youtube.com/embed/hYV8GiZA6i0" },
        { cityName: "Nice", url: "https://www.youtube.com/embed/i2MGTNjDNqU"},
        { cityName: "Paris", url: "https://www.youtube.com/embed/EkshFcLESPU" },
        { cityName: "Prague", url: "https://www.youtube.com/embed/IGirkLUvOIw" },
        { cityName: "Rome", url: "https://www.youtube.com/embed/1ziMH_lAUW0" },
        { cityName: "Sydney", url: "https://www.youtube.com/embed/GqnCZNGkdfc" },
        { cityName: "Tokyo", url: "https://www.youtube.com/embed/plDirbEb6Y8" },
        { cityName: "Tokyo", url: "https://www.youtube.com/embed/plDirbEb6Y8" },
        { cityName: "Valencia", url: "https://www.youtube.com/embed/zzUrrYvrUmI" },
        { cityName: "Venice", url: "https://www.youtube.com/embed/3Zz7M2vLHJ8" },
        { cityName: "Vienna", url: "https://www.youtube.com/embed/RkoFqCxOWy0"}

    ];
    
    // await db.insertMany(links);



    for (let link of links) {
        await db.updateOne(
            { "CityName": link.cityName },
            { $set: { "youtubeLink": link.url } }
        );
    }
}

console.log("end");
