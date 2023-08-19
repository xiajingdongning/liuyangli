import mongodb from 'mongodb';
// Initialize a new MongoClient
const MongoClient = mongodb.MongoClient;

console.log("start");

async function main() {
  const client = new mongodb.MongoClient(
    "mongodb://0.0.0.0:27017"
  );

  try { 
      //Connect to MongoDB server
      await client.connect();
      let cities_info = await client.db("travel_guide_db").collection('cities_info');
      await cities_info.deleteMany({});     
      await init_yerin(cities_info)
      await init_Yangli(cities_info)
      await init_yiqing(cities_info)
      client.close();
  } catch (e) {
    console.error(e);
    process.exit (1);
  }
}
main().catch(console.error);
// Connect to your MongoDB instance
// MongoClient.connect('mongodb://0.0.0.0:27017', { useUnifiedTopology: true }, function(err, client) {
//   if(err) throw err;

//   console.log("before insert");
//   // Select the `CityGuide` database
//   const db = client.db('travel_guide_db');

//   // Insert documents into the `cities` collection
//   init_yerin(db);
//   init_Yangli(db);
//   init_yiqing(db);
//   console.log("End");
//   // init();
//   // db.collection('cities').insertMany([
//   //   {
//   //     "CityName": "Amsterdam",
//   //     "BriefDescription": "Amsterdam is the capital city...",
//   //     "History": "Amsterdam has a rich history...",
//   //     "Attractions": [
//   //       // attraction data...
//   //     ]
//   //   },
//   //   // more city data...
//   // ], function(err, result) {
//   //   if(err) throw err;
    
//   //   console.log("Data inserted successfully");
//   //   client.close();
//   // });
// });

async function init_yerin(db) {
  console.log("yerin start")
  await db.insertMany([
    {
      "CityName": "Amsterdam",
      "BriefDescription": "Amsterdam is the capital city of the Netherlands, known for its picturesque canals, historic architecture, and vibrant cultural scene. Explore its charming streets, world-class museums, and diverse culinary offerings.",
      "History": "Amsterdam has a rich history dating back to the 12th century. From its humble beginnings as a fishing village, it grew into a major trading hub during the Dutch Golden Age. Today, it is celebrated as a center of arts, commerce, and tolerance.",
      "Attractions": [
        {
          "Name": "Van Gogh Museum",
          "Description": "The Van Gogh Museum houses the largest collection of Vincent van Gogh's artworks in the world. Immerse yourself in his post-impressionist masterpieces, including 'Sunflowers' and 'The Starry Night'."
        },
        {
          "Name": "Anne Frank House",
          "Description": "The Anne Frank House is a poignant museum dedicated to the life of Anne Frank, a Jewish girl who hid from the Nazis during World War II. Walk through the secret annex and gain insights into her extraordinary diary."
        },
        {
          "Name": "Vondelpark",
          "Description": "Vondelpark is Amsterdam's most popular park, offering a serene escape from the bustling city. Take a leisurely stroll, rent a bike, or enjoy a picnic in this green oasis."
        }
      ],
      "Restaurants": [
        {
          "Name": "De Kas",
          "Description": "De Kas is a unique farm-to-table restaurant set in a beautiful greenhouse. Indulge in seasonal dishes prepared with fresh ingredients sourced from their own garden."
        },
        {
          "Name": "Foodhallen",
          "Description": "Foodhallen is a vibrant indoor food market where you can sample a wide variety of cuisines from around the world. Enjoy the bustling atmosphere and delicious street food-inspired bites."
        },
        {
          "Name": "Café de Klos",
          "Description": "Café de Klos is a popular eatery famous for its mouthwatering grilled meats, including ribs and steaks. Savor the flavorful dishes and cozy ambiance of this traditional Dutch pub."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Jordaan",
          "Description": "Jordaan is a picturesque neighborhood known for its narrow streets, charming canals, and art galleries. Explore boutique shops, cozy cafes, and local markets in this bohemian district."
        },
        {
          "Name": "De Pijp",
          "Description": "De Pijp is a lively neighborhood with a diverse mix of cultures, vibrant markets, and trendy bars. Discover a wide range of international cuisines, explore the Albert Cuyp Market, and soak up the energetic atmosphere."
        },
        {
          "Name": "Oud-West",
          "Description": "Oud-West is a hip and trendy neighborhood offering a blend of cultural attractions, boutique shops, and cozy cafes. Enjoy the lively atmosphere, beautiful architecture, and vibrant street art."
        }
      ]
    },
    {
      "CityName": "Bali",
      "BriefDescription": "Bali is a tropical paradise in Indonesia known for its stunning beaches, lush landscapes, and rich cultural heritage. Experience its spiritual traditions, vibrant festivals, and warm hospitality.",
      "History": "Bali's history is steeped in ancient traditions and influences from neighboring cultures. From its early kingdom eras to Dutch colonization, it has preserved its distinct cultural identity and is now a sought-after tourist destination.",
      "Attractions": [
        {
          "Name": "Tanah Lot Temple",
          "Description": "Tanah Lot is a famous sea temple perched on a rocky outcrop, offering stunning sunset views. Experience the spiritual ambiance and witness traditional ceremonies at this iconic Balinese landmark."
        },
        {
          "Name": "Ubud Monkey Forest",
          "Description": "The Ubud Monkey Forest is a lush sanctuary inhabited by playful monkeys. Explore its ancient temples, stroll through the jungle pathways, and immerse yourself in Balinese nature and spirituality."
        },
        {
          "Name": "Tegallalang Rice Terraces",
          "Description": "The Tegallalang Rice Terraces present a captivating landscape of stepped rice paddies. Admire the intricate irrigation system, take a leisurely walk, and capture the beauty of Bali's agricultural heritage."
        }
      ],
      "Restaurants": [
        {
          "Name": "Warung Babi Guling Ibu Oka",
          "Description": "Warung Babi Guling Ibu Oka is renowned for its succulent roasted suckling pig, a Balinese delicacy. Indulge in the flavors of this traditional dish and experience the local culinary culture."
        },
        {
          "Name": "Locavore",
          "Description": "Locavore is a fine dining restaurant committed to sustainability and local sourcing. Discover their innovative dishes crafted with fresh, organic ingredients from Bali and the surrounding regions."
        },
        {
          "Name": "Ku De Ta",
          "Description": "Ku De Ta is an iconic beachfront venue offering a blend of sophisticated dining, stunning views, and a lively atmosphere. Enjoy a memorable culinary experience accompanied by ocean breezes."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Seminyak",
          "Description": "Seminyak is a trendy coastal town known for its upscale resorts, stylish boutiques, and vibrant nightlife. Experience the chic beach clubs, indulge in spa treatments, and explore the lively streets."
        },
        {
          "Name": "Ubud",
          "Description": "Ubud is the cultural heart of Bali, surrounded by serene rice fields and lush forests. Discover its art galleries, attend traditional dance performances, and immerse yourself in Balinese spirituality."
        },
        {
          "Name": "Canggu",
          "Description": "Canggu is a laid-back beach town attracting surfers and digital nomads. Enjoy the relaxed vibes, catch some waves, and indulge in healthy cafes, yoga studios, and beachfront bars."
        }
      ]
    },
  {
      "CityName": "Bangkok",
      "BriefDescription": "Bangkok, the capital of Thailand, is a vibrant city that blends ancient traditions with modernity. Explore its bustling markets, majestic temples, and tantalizing street food for an unforgettable experience.",
      "History": "Bangkok has a fascinating history that dates back centuries. It was once the capital of the Kingdom of Siam and has since evolved into a dynamic metropolis that preserves its cultural heritage.",
      "Attractions": [
        {
          "Name": "Grand Palace",
          "Description": "The Grand Palace is a magnificent complex of royal buildings and temples. Admire the intricate architecture, visit the revered Wat Phra Kaew, and immerse yourself in Thai history and culture."
        },
        {
          "Name": "Wat Arun",
          "Description": "Wat Arun, also known as the Temple of Dawn, is an iconic riverside temple with a stunning pagoda adorned with colorful ceramic tiles. Ascend to the top for panoramic views of Bangkok."
        },
        {
          "Name": "Chatuchak Weekend Market",
          "Description": "Chatuchak Market is one of the largest markets in the world, offering a vast array of goods ranging from clothing and accessories to antiques and local handicrafts. Get lost in its maze-like alleys and shop to your heart's content."
        }
      ],
      "Restaurants": [
        {
          "Name": "Jay Fai",
          "Description": "Jay Fai is a legendary street food vendor in Bangkok, famous for her Michelin-starred crab omelets and other Thai delicacies. Be prepared to wait in line for a memorable dining experience."
        },
        {
          "Name": "Gaggan",
          "Description": "Gaggan is an innovative Indian restaurant that pushes the boundaries of traditional cuisine. Experience a unique dining journey with their creative and inventive dishes."
        },
        {
          "Name": "Thip Samai",
          "Description": "Thip Samai is a renowned eatery specializing in Pad Thai, a popular Thai noodle dish. Taste their signature version, cooked to perfection in a flaming wok."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Siam",
          "Description": "Siam is a bustling neighborhood known for its upscale shopping malls, trendy boutiques, and entertainment centers. Explore the vibrant atmosphere, indulge in retail therapy, and enjoy world-class dining and nightlife."
        },
        {
          "Name": "Old City (Rattanakosin)",
          "Description": "The Old City, also known as Rattanakosin, is home to Bangkok's most iconic landmarks, including the Grand Palace and Wat Phra Kaew. Immerse yourself in the rich history and heritage of Thailand."
        },
        {
          "Name": "Chinatown (Yaowarat)",
          "Description": "Chinatown, or Yaowarat, is a bustling district filled with vibrant markets, street food stalls, and ornate temples. Discover the fusion of Chinese and Thai cultures as you wander through its narrow alleys."
        }
      ]
    },
  {
    "CityName": "Berlin",
    "BriefDescription": "Berlin, the capital of Germany, is a cosmopolitan city known for its rich history, vibrant culture, and thriving arts scene. Explore its iconic landmarks, world-class museums, and eclectic neighborhoods.",
    "History": "Berlin's history is marked by tumultuous events, from the Prussian era to the division during the Cold War and the reunification of East and West. Today, it is a symbol of resilience and creativity.",
    "Attractions": [
      {
        "Name": "Brandenburg Gate",
        "Description": "The Brandenburg Gate is an iconic symbol of Berlin and a testament to the city's history. Take a stroll through Pariser Platz and witness the grandeur of this neoclassical monument."
      },
      {
        "Name": "Museum Island",
        "Description": "Museum Island is a UNESCO World Heritage site housing five world-class museums, including the Pergamon Museum and the Neues Museum. Immerse yourself in art, history, and archaeology."
      },
      {
        "Name": "East Side Gallery",
        "Description": "The East Side Gallery is a preserved section of the Berlin Wall adorned with vibrant murals and street art. Walk along this open-air gallery and witness powerful expressions of freedom and unity."
      }
    ],
    "Restaurants": [
      {
        "Name": "Curry 36",
        "Description": "Curry 36 is a beloved institution serving one of Berlin's most famous street foods: currywurst. Enjoy this mouthwatering combination of curry-spiced sausage and tangy sauce."
      },
      {
        "Name": "Markthalle Neun",
        "Description": "Markthalle Neun is a historic market hall that hosts various food events, including Street Food Thursday. Sample a wide range of international cuisines and savor delicious bites from local vendors."
      },
      {
        "Name": "Renger-Patzsch",
        "Description": "Renger-Patzsch offers a modern and innovative dining experience. With a focus on seasonal ingredients, their menu showcases the best of contemporary German cuisine."
      }
    ],
    "Neighborhoods": [
      {
        "Name": "Mitte",
        "Description": "Mitte is the central district of Berlin, home to many famous landmarks, including Brandenburg Gate and Museum Island. Explore its vibrant streets, visit art galleries, and indulge in diverse culinary offerings."
      },
      {
        "Name": "Kreuzberg",
        "Description": "Kreuzberg is a multicultural neighborhood known for its alternative vibe, street art, and vibrant nightlife. Discover its eclectic mix of trendy cafes, bustling markets, and lively bars."
      },
      {
        "Name": "Prenzlauer Berg",
        "Description": "Prenzlauer Berg is a trendy neighborhood with charming streets, leafy parks, and a thriving cafe culture. Explore its boutiques, art galleries, and enjoy the relaxed atmosphere."
      }
    ]
  },
  {
    "CityName": "Budapest",
    "BriefDescription": "Budapest, the capital of Hungary, is a mesmerizing city that straddles the Danube River. Known for its stunning architecture, thermal baths, and vibrant nightlife, Budapest offers a blend of history and modernity.",
    "History": "Budapest has a rich history that spans over a millennium. It was formed by the unification of Buda, Pest, and Óbuda. From its medieval roots to the era of the Austro-Hungarian Empire and beyond, Budapest has been shaped by various influences.",
    "Attractions": [
      {
        "Name": "Buda Castle",
        "Description": "Buda Castle is a historic palace complex perched on a hill overlooking the Danube River. Explore its grand courtyards, visit the Budapest History Museum, and enjoy panoramic views of the city."
      },
      {
        "Name": "Fisherman's Bastion",
        "Description": "Fisherman's Bastion is a fairy-tale-like terrace offering panoramic views of Budapest. Admire its unique architecture, seven towers, and decorative turrets. It's a perfect spot for stunning photographs."
      },
      {
        "Name": "Széchenyi Thermal Bath",
        "Description": "Széchenyi Thermal Bath is one of Budapest's most famous thermal baths. Relax in its medicinal hot springs, enjoy the outdoor pools, and experience the therapeutic benefits of this cultural institution."
      }
    ],
    "Restaurants": [
      {
        "Name": "New York Café",
        "Description": "New York Café is a grand café that exudes elegance and history. Indulge in its opulent surroundings while savoring delicious pastries and traditional Hungarian cuisine."
      },
      {
        "Name": "Ruszwurm",
        "Description": "Ruszwurm is a charming confectionery that has been serving delectable cakes and pastries since 1827. Enjoy a slice of Hungarian cake accompanied by a cup of coffee in this cozy establishment."
      },
      {
        "Name": "Menza",
        "Description": "Menza is a popular retro-style restaurant offering a nostalgic dining experience. Taste Hungarian classics with a modern twist, and immerse yourself in the vibrant atmosphere of this hip eatery."
      }
    ],
    "Neighborhoods": [
      {
        "Name": "District V (Belváros-Lipótváros)",
        "Description": "District V, also known as Belváros-Lipótváros, is the heart of Budapest. It encompasses the iconic Parliament building, St. Stephen's Basilica, and the vibrant shopping street of Váci utca."
      },
      {
        "Name": "District VII (Erzsébetváros)",
        "Description": "District VII, also known as Erzsébetváros, is a trendy neighborhood known for its lively nightlife, ruin bars, and street art. Explore its unique blend of culture, entertainment, and historical sites."
      },
      {
        "Name": "Castle District (Várnegyed)",
        "Description": "The Castle District, or Várnegyed, is the historical heart of Budapest. Explore its cobbled streets, medieval houses, and visit Matthias Church and the Fisherman's Bastion for breathtaking views."
      }
    ]
  },
  {
    "CityName": "Buenos Aires",
    "BriefDescription": "Buenos Aires, the capital of Argentina, is a vibrant city known for its rich culture, tango music and dance, and beautiful architecture. Explore its lively neighborhoods, indulge in delicious cuisine, and experience the passionate spirit of Argentina.",
    "History": "Buenos Aires has a captivating history that reflects the diverse influences of its immigrants. From its colonial past to the struggles of independence and the birth of tango, the city has evolved into a cultural hub and a reflection of Argentine identity.",
    "Attractions": [
      {
        "Name": "La Boca",
        "Description": "La Boca is a colorful neighborhood famous for its vibrant street art, tango performances, and the iconic Caminito street. Immerse yourself in the bohemian atmosphere and visit the Boca Juniors Stadium."
      },
      {
        "Name": "Recoleta Cemetery",
        "Description": "Recoleta Cemetery is a unique burial ground known for its ornate mausoleums and the final resting place of notable figures, including Eva Perón. Take a walk through this open-air museum and discover its architectural beauty."
      },
      {
        "Name": "Palermo",
        "Description": "Palermo is a trendy neighborhood with beautiful parks, hip bars, and boutique shops. Explore the Botanical Garden, visit the MALBA museum, and enjoy the vibrant nightlife of Palermo Soho."
      }
    ],
    "Restaurants": [
      {
        "Name": "Don Julio",
        "Description": "Don Julio is a renowned steakhouse in Buenos Aires, serving mouthwatering Argentine beef cooked to perfection. Experience the traditional asado culture and indulge in delicious cuts of meat."
      },
      {
        "Name": "El Obrero",
        "Description": "El Obrero is a legendary neighborhood restaurant known for its traditional Argentine dishes and rustic ambiance. Enjoy classic favorites such as empanadas and milanesa in this iconic establishment."
      },
      {
        "Name": "La Cabrera",
        "Description": "La Cabrera is a popular parrilla (steakhouse) in Palermo known for its high-quality meats and generous portions. Savor the flavors of Argentine cuisine and pair your meal with local wines."
      }
    ],
    "Neighborhoods": [
      {
        "Name": "San Telmo",
        "Description": "San Telmo is a historic neighborhood famous for its cobblestone streets, colonial buildings, and antique markets. Explore the lively Plaza Dorrego, visit art galleries, and witness tango performances on the streets."
      },
      {
        "Name": "Puerto Madero",
        "Description": "Puerto Madero is a modern waterfront neighborhood known for its upscale restaurants, chic bars, and stunning architecture. Take a stroll along the docklands, enjoy river views, and dine in style."
      },
      {
        "Name": "Belgrano",
        "Description": "Belgrano is a residential neighborhood with leafy streets, beautiful parks, and a tranquil atmosphere. Explore its charming plazas, visit the Barrancas de Belgrano park, and discover the Museo de Arte Español Enrique Larreta."
      }
    ]
  },
  {
    "CityName": "Cancun",
    "BriefDescription": "Cancun, located on the northeastern coast of the Yucatan Peninsula in Mexico, is a renowned beach destination known for its turquoise waters, white sandy beaches, and vibrant nightlife. Explore ancient Mayan ruins, indulge in water sports, and relax in luxury resorts.",
    "History": "Cancun was once a small fishing village and has transformed into a popular tourist destination. The area has a rich Mayan history, and many ancient ruins can be found nearby, including the famous Chichen Itza.",
    "Attractions": [
      {
        "Name": "Chichen Itza",
        "Description": "Chichen Itza is a UNESCO World Heritage site and one of the New Seven Wonders of the World. Explore the ancient Mayan ruins, including the iconic El Castillo pyramid, and learn about the fascinating history and culture."
      },
      {
        "Name": "Isla Mujeres",
        "Description": "Isla Mujeres is a picturesque island known for its crystal-clear waters and relaxed atmosphere. Enjoy snorkeling, swim with whale sharks, or simply unwind on the beautiful beaches."
      },
      {
        "Name": "Xcaret Park",
        "Description": "Xcaret Park is an eco-archaeological park offering a range of activities and attractions. Immerse yourself in nature, swim in underground rivers, visit the butterfly pavilion, and experience a traditional Mayan ceremony."
      }
    ],
    "Restaurants": [
      {
        "Name": "La Habichuela",
        "Description": "La Habichuela is a popular restaurant in Cancun known for its delicious Mayan and Caribbean cuisine. Enjoy traditional dishes, such as cochinita pibil and ceviche, in a charming atmosphere surrounded by lush gardens."
      },
      {
        "Name": "Puerto Madero",
        "Description": "Puerto Madero is a waterfront restaurant offering stunning views of the Nichupté Lagoon. Savor fresh seafood, grilled steaks, and indulge in their extensive wine selection."
      },
      {
        "Name": "Navios Seafood & Grill",
        "Description": "Navios Seafood & Grill is a seafood restaurant located in the Hotel Zone of Cancun. Enjoy a variety of fresh seafood dishes while overlooking the Caribbean Sea."
      }
    ],
    "Neighborhoods": [
      {
        "Name": "Hotel Zone",
        "Description": "The Hotel Zone is the main tourist area of Cancun, stretching along the coastline with luxury resorts, stunning beaches, and vibrant nightlife. Experience a wide range of water activities, visit upscale shopping centers, and enjoy world-class entertainment."
      },
      {
        "Name": "Downtown Cancun",
        "Description": "Downtown Cancun, also known as El Centro, offers a more local and authentic experience. Explore the local markets, visit traditional restaurants, and discover the historic city center."
      },
      {
        "Name": "Playa del Carmen",
        "Description": "Playa del Carmen is a vibrant coastal town located south of Cancun. It offers a bohemian atmosphere, trendy beach clubs, and a bustling Fifth Avenue with shops, bars, and restaurants."
      }
    ]
  },
  {
    "CityName": "Cape Town",
    "BriefDescription": "Cape Town, located on the southwestern coast of South Africa, is a vibrant city known for its stunning natural beauty, diverse culture, and iconic landmarks. Explore the majestic Table Mountain, relax on picturesque beaches, and savor world-class cuisine.",
    "History": "Cape Town has a rich and complex history influenced by indigenous tribes, European colonization, and the struggle against apartheid. Discover the historical significance of Robben Island, the Cape Malay heritage in Bo-Kaap, and the diverse cultural tapestry that makes up the city.",
    "Attractions": [
      {
        "Name": "Table Mountain",
        "Description": "Table Mountain is an iconic landmark and a must-visit attraction in Cape Town. Take a cable car ride or hike to the summit for breathtaking panoramic views of the city, coastline, and surrounding mountains."
      },
      {
        "Name": "Robben Island",
        "Description": "Robben Island is a UNESCO World Heritage site and a symbol of the struggle against apartheid. Take a guided tour of the former prison, led by former political prisoners, and gain insight into South Africa's history."
      },
      {
        "Name": "Kirstenbosch National Botanical Garden",
        "Description": "Kirstenbosch is a botanical garden nestled at the eastern foot of Table Mountain. Explore its diverse flora, enjoy scenic walks, attend outdoor concerts, and experience the tranquility of this natural paradise."
      }
    ],
    "Restaurants": [
      {
        "Name": "Test Kitchen",
        "Description": "The Test Kitchen is an award-winning restaurant that offers a unique culinary experience. Indulge in innovative dishes, carefully curated flavors, and an exceptional dining atmosphere."
      },
      {
        "Name": "Gold Restaurant",
        "Description": "Gold Restaurant is a cultural dining experience that celebrates the diverse flavors of Cape Town. Enjoy a feast of traditional African cuisine, accompanied by live music and interactive entertainment."
      },
      {
        "Name": "The Pot Luck Club",
        "Description": "The Pot Luck Club offers a stylish setting and an eclectic menu of tapas-style dishes with global influences. Delight your taste buds with a variety of flavors while enjoying panoramic views of the city."
      }
    ],
    "Neighborhoods": [
      {
        "Name": "City Bowl",
        "Description": "The City Bowl is the vibrant heart of Cape Town, surrounded by the slopes of Table Mountain. Explore the bustling streets, visit historical landmarks, dine at trendy restaurants, and discover the city's vibrant nightlife."
      },
      {
        "Name": "Bo-Kaap",
        "Description": "Bo-Kaap is a colorful neighborhood known for its vibrant houses, steep cobblestone streets, and Cape Malay culture. Immerse yourself in the rich history, visit the Bo-Kaap Museum, and sample traditional Cape Malay cuisine."
      },
      {
        "Name": "Camp's Bay",
        "Description": "Camp's Bay is a picturesque beachfront neighborhood offering stunning views of the Atlantic Ocean and the Twelve Apostles mountain range. Relax on the golden sandy beach, dine at upscale restaurants, and enjoy the vibrant beach atmosphere."
      }
    ]
  },
  {
    "CityName": "Chiang Mai",
    "BriefDescription": "Chiang Mai, located in the mountainous region of northern Thailand, is a captivating city known for its rich cultural heritage, tranquil temples, and vibrant night markets. Immerse yourself in its charm, indulge in flavorful cuisine, and explore the nearby natural beauty.",
    "History": "Chiang Mai has a storied history dating back over 700 years. It was once the capital of the Lanna Kingdom, known for its distinctive culture and architecture. Today, it showcases a blend of ancient traditions and modern influences.",
    "Attractions": [
      {
        "Name": "Doi Suthep",
        "Description": "Doi Suthep is a sacred mountain located just outside the city, featuring the revered Wat Phra That Doi Suthep temple. Climb the 309 steps to the hilltop temple and enjoy panoramic views of Chiang Mai."
      },
      {
        "Name": "Old City Temples",
        "Description": "Chiang Mai's Old City is home to numerous temples, including Wat Chedi Luang, Wat Phra Singh, and Wat Suan Dok. Explore their intricate architecture, observe Buddhist rituals, and gain insight into Thai religious practices."
      },
      {
        "Name": "Sunday Night Market",
        "Description": "The Sunday Night Market in Chiang Mai's Old City is a bustling market where you can find local handicrafts, street food, and live performances. Stroll through the vibrant lanes, shop for unique souvenirs, and savor the flavors of Northern Thai cuisine."
      }
    ],
    "Restaurants": [
      {
        "Name": "Khao Soi Khun Yai",
        "Description": "Khao Soi Khun Yai is a popular local eatery known for its delicious khao soi, a traditional Northern Thai dish. Enjoy a bowl of rich curry soup with egg noodles, topped with crispy fried noodles and your choice of meat."
      },
      {
        "Name": "Dash! Restaurant & Bar",
        "Description": "Dash! Restaurant & Bar offers a contemporary dining experience with a fusion of Thai and international flavors. Enjoy innovative dishes, crafted cocktails, and a stylish ambiance with views of the Ping River."
      },
      {
        "Name": "The Riverside Bar & Restaurant",
        "Description": "The Riverside Bar & Restaurant is a scenic spot along the Ping River, offering a relaxed atmosphere and a menu of Thai and Western dishes. Enjoy your meal while taking in the picturesque views of the river."
      }
    ],
    "Neighborhoods": [
      {
        "Name": "Nimmanhaemin",
        "Description": "Nimmanhaemin is a trendy neighborhood known for its hip cafes, boutique shops, and art galleries. Explore the vibrant street of Nimman Road, indulge in specialty coffee, and discover the local creative scene."
      },
      {
        "Name": "Old City (Walled City)",
        "Description": "The Old City, or Walled City, is the historic center of Chiang Mai, surrounded by ancient walls and moats. Stroll through its narrow streets, visit temples, and experience the local culture and traditions."
      },
      {
        "Name": "Wat Umong Area",
        "Description": "The Wat Umong area is known for its serene surroundings and the unique Wat Umong temple. Explore the tranquil forest temple, wander through meditation tunnels, and enjoy the peaceful ambiance."
      }
    ]
  },
  {
    "CityName": "Granada",
    "BriefDescription": "Granada, located in the southern region of Spain, is a captivating city renowned for its rich history, stunning architecture, and vibrant culture. Explore the enchanting Alhambra Palace, stroll through the charming Albayzín neighborhood, and savor the flavors of traditional Spanish cuisine.",
    "History": "Granada has a fascinating history that dates back over a thousand years. It was once a Moorish stronghold and the last Muslim kingdom in Spain. The city's architecture, culture, and traditions reflect its diverse heritage influenced by Islamic, Jewish, and Christian civilizations.",
    "Attractions": [
      {
        "Name": "Alhambra Palace",
        "Description": "The Alhambra Palace is a UNESCO World Heritage site and a masterpiece of Islamic architecture. Explore its exquisite palaces, serene courtyards, and lush gardens, and admire the intricate details and stunning views of Granada."
      },
      {
        "Name": "Sacromonte Abbey",
        "Description": "Sacromonte Abbey is a historic monastery located on the hills overlooking Granada. Visit the abbey, explore the catacombs, and learn about the neighborhood's flamenco heritage and the art of cave dwellings."
      },
      {
        "Name": "Cathedral of Granada",
        "Description": "The Cathedral of Granada is an impressive Renaissance cathedral with a mix of Gothic and Baroque elements. Marvel at its grandeur, explore the royal chapel, and enjoy panoramic views from the tower."
      }
    ],
    "Restaurants": [
      {
        "Name": "Carmen de los Chapiteles",
        "Description": "Carmen de los Chapiteles offers a fine dining experience with stunning views of the Alhambra. Indulge in traditional Andalusian cuisine, accompanied by excellent wines, in an elegant setting."
      },
      {
        "Name": "Bodegas Castañeda",
        "Description": "Bodegas Castañeda is a traditional tapas bar in the heart of Granada. Enjoy a wide variety of delicious tapas, paired with a glass of local wine or a refreshing cerveza."
      },
      {
        "Name": "Los Diamantes",
        "Description": "Los Diamantes is a popular seafood restaurant known for its fresh seafood dishes and generous tapas. Taste a variety of seafood delights, including fried fish, shrimp, and calamari."
      }
    ],
    "Neighborhoods": [
      {
        "Name": "Albayzín",
        "Description": "Albayzín is a historic neighborhood with narrow winding streets and traditional white-washed houses. Explore its Moorish charm, visit the Mirador de San Nicolás for panoramic views of the Alhambra, and discover hidden tea houses."
      },
      {
        "Name": "Realejo",
        "Description": "Realejo is the old Jewish quarter of Granada, known for its narrow streets, cozy squares, and bohemian atmosphere. Explore its artistic vibe, visit the Casa de los Tiros museum, and enjoy the local tapas scene."
      },
      {
        "Name": "Centro-Sagrario",
        "Description": "Centro-Sagrario is the central district of Granada, offering a vibrant atmosphere with shops, restaurants, and cultural attractions. Explore the bustling streets, visit the Royal Chapel, and discover the city's vibrant nightlife."
      }
    ]
  }
  ]);
  
  console.log("yerin end")
}



// Yangli------------------------------
async function init_Yangli(db) {  
  console.log("yangli start");
  await db.insertMany(  [
    {
      "CityName": "Florence",
      "BriefDescription": "Florence, the birthplace of the Renaissance, is a city of art, culture, and architectural beauty. Located in the heart of Tuscany, this enchanting city captivates visitors with its iconic landmarks, world-class museums, and charming streets lined with Renaissance palaces and picturesque piazzas.",
      "History": "Florence has a rich history that traces back to Roman times. It flourished during the Renaissance as a center of art, literature, and science, with influential figures like Leonardo da Vinci and Michelangelo leaving their mark. Today, Florence stands as a testament to its glorious past.",
      "Attractions": [
        {
          "Name": "Duomo Santa Maria del Fiore",
          "Description": "Marvel at the breathtaking Duomo, the iconic cathedral of Florence. Admire its magnificent dome designed by Brunelleschi, climb to the top for panoramic views of the city, and explore the intricate marble facade and stunning interior."
        },
        {
          "Name": "Uffizi Gallery",
          "Description": "Step into the world of art at the Uffizi Gallery, home to a vast collection of Renaissance masterpieces. Admire works by Botticelli, Michelangelo, and Raphael, among others, as you wander through its grand halls and immerse yourself in the artistic legacy of Florence."
        },
        {
          "Name": "Ponte Vecchio",
          "Description": "Cross the iconic Ponte Vecchio, a medieval stone bridge that spans the Arno River. Explore the charming shops that line the bridge, enjoy panoramic views of the river, and appreciate the architectural beauty of this historic landmark."
        }
      ],
      "Restaurants": [
        {
          "Name": "Trattoria Sostanza",
          "Description": "Savor traditional Tuscan cuisine at Trattoria Sostanza, a beloved restaurant that has been serving delicious dishes since 1869. Indulge in mouthwatering classics like bistecca alla fiorentina (Florentine steak) and buttery chicken cooked in a secret recipe."
        },
        {
          "Name": "La Giostra",
          "Description": "Dine in a charming atmosphere at La Giostra, a restaurant known for its Tuscan specialties and warm hospitality. Enjoy a blend of traditional and innovative dishes, paired with fine wines, in an intimate setting filled with antiques and artwork."
        },
        {
          "Name": "All'Antico Vinaio",
          "Description": "Treat yourself to delicious sandwiches at All'Antico Vinaio, a popular spot loved by locals and visitors alike. Enjoy freshly baked bread filled with a variety of Tuscan ingredients, creating a mouthwatering combination of flavors and textures."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Duomo",
          "Description": "Experience the heart of Florence in the Duomo neighborhood. Admire the majestic cathedral, explore the vibrant Piazza del Duomo, and wander through narrow streets filled with shops, cafés, and historical landmarks."
        },
        {
          "Name": "Oltrarno",
          "Description": "Discover the artistic and bohemian vibes of Oltrarno, located on the other side of the Arno River. Visit the Pitti Palace, stroll through the picturesque Santo Spirito Square, and explore the artisan workshops that showcase traditional craftsmanship."
        },
        {
          "Name": "San Lorenzo",
          "Description": "Immerse yourself in the lively atmosphere of San Lorenzo, a neighborhood known for its bustling market and historical sites. Explore the vibrant Mercato Centrale, visit the Medici Chapels, and indulge in delicious street food and local delicacies."
        }
      ]
    },
    {    "CityName": "Ho Chi Minh City",    "BriefDescription": "Ho Chi Minh City, the vibrant economic hub of Vietnam, offers a captivating blend of rich history, bustling markets, and mouthwatering cuisine. Formerly known as Saigon, the city showcases a unique fusion of tradition and modernity, captivating visitors with its energy and charm.",    "History": "Ho Chi Minh City has a diverse history, from being a significant trading port in the 17th century to its role as the capital of South Vietnam during the Vietnam War. Today, it stands as a symbol of resilience and rapid development, honoring its past while embracing the future.",    "Attractions": [      {        "Name": "Ben Thanh Market",        "Description": "Immerse yourself in the vibrant atmosphere of Ben Thanh Market, a bustling marketplace offering a wide array of local handicrafts, textiles, and delectable street food. This iconic landmark is a shopper's paradise and a gateway to Vietnamese flavors."      },      {        "Name": "Cu Chi Tunnels",        "Description": "Discover the historic Cu Chi Tunnels, an intricate underground network used by the Viet Cong during the Vietnam War. Gain insights into the guerrilla warfare tactics employed and explore sections of the tunnels to experience the conditions faced by soldiers."      },      {        "Name": "Saigon Opera House",        "Description": "Admire the grandeur of the Saigon Opera House, an architectural gem that showcases French colonial influences. Attend a captivating performance, ranging from traditional Vietnamese art forms to international ballets and operas, in this stunning venue."      }    ],
      "Restaurants": [
        {
          "Name": "Nha Hang Ngon",
          "Description": "Experience the flavors of Vietnam at Nha Hang Ngon, a renowned restaurant serving an extensive range of authentic local dishes. From flavorful pho to savory banh xeo, indulge in traditional Vietnamese cuisine in a charming colonial-style setting."
        },
        {
          "Name": "Cuc Gach Quan",
          "Description": "Visit Cuc Gach Quan, a hidden gem known for its rustic ambiance and delicious Vietnamese home-style cooking. Using fresh ingredients sourced from local farms, the restaurant offers a menu of delectable dishes with a focus on sustainability."
        },
        {
          "Name": "Secret Garden",
          "Description": "Escape the bustling city at Secret Garden, a rooftop oasis offering panoramic views of Ho Chi Minh City. Delight in traditional Vietnamese flavors served in a lush garden setting, providing a tranquil dining experience amidst the urban landscape."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "District 1",
          "Description": "District 1 is the heart of Ho Chi Minh City, home to iconic landmarks, luxury hotels, and vibrant nightlife. Explore the historic Dong Khoi Street, visit the Independence Palace, and indulge in world-class shopping and dining experiences."
        },
        {
          "Name": "District 3",
          "Description": "District 3 offers a glimpse into local life with its residential neighborhoods and bustling streets. Visit the War Remnants Museum, wander through the tree-lined avenues, and savor authentic Vietnamese street food from the local vendors."
        },
        {
          "Name": "District 5 (Chinatown)",
          "Description": "Explore the lively streets of District 5, also known as Chinatown, where vibrant markets, Chinese temples, and traditional medicine shops await. Dive into the flavors of Cantonese cuisine, and witness the harmonious blend of Vietnamese and Chinese cultures."
        }
      ]
    },
    {
      "CityName": "Hong Kong",
      "BriefDescription": "Hong Kong, a bustling global metropolis, mesmerizes visitors with its iconic skyline, diverse culture, and vibrant street life. This dynamic city combines tradition and modernity, offering a unique blend of ancient traditions, colonial influences, and a thriving cosmopolitan atmosphere.",
      "History": "Hong Kong's history is a tale of a small fishing village transforming into a major international financial center. From its humble origins to its colonial past and eventual return to Chinese sovereignty, the city has evolved into a global hub for commerce, culture, and innovation.",
      "Attractions": [
        {
          "Name": "Victoria Peak",
          "Description": "Ascend to the summit of Victoria Peak for breathtaking panoramic views of Hong Kong's skyline, harbor, and surrounding islands. Take the iconic Peak Tram and enjoy the stunning vistas from the observation deck while savoring the city's mesmerizing beauty."
        },
        {
          "Name": "Lantau Island",
          "Description": "Explore Lantau Island, the largest outlying island in Hong Kong. Visit the iconic Tian Tan Buddha, ride the Ngong Ping 360 cable car for scenic views, and experience the cultural tranquility of the Po Lin Monastery. Don't miss the serene beaches and lush hiking trails."
        },
        {
          "Name": "Star Ferry",
          "Description": "Embark on a journey across Victoria Harbor aboard the Star Ferry, an enduring symbol of Hong Kong. Enjoy the picturesque views of the city's skyline and experience the city's maritime heritage on this iconic ferry ride connecting Hong Kong Island and Kowloon."
        }
      ],
      "Restaurants": [
        {
          "Name": "Tim Ho Wan",
          "Description": "Indulge in the culinary delights of Tim Ho Wan, a Michelin-starred dim sum restaurant. Savor exquisite dishes like the famous BBQ pork buns and delectable shrimp dumplings, all prepared with precision and served in a casual setting."
        },
        {
          "Name": "Din Tai Fung",
          "Description": "Experience the world-renowned Din Tai Fung, known for its exceptional xiao long bao (soup dumplings) and Taiwanese cuisine. Enjoy the artistry of the dumpling-making process and relish the delicate flavors that have made this restaurant a global sensation."
        },
        {
          "Name": "Temple Street Night Market",
          "Description": "Immerse yourself in the vibrant atmosphere of Temple Street Night Market, a food lover's paradise. Explore the bustling stalls offering a wide array of street food, from fresh seafood to grilled meats and local delicacies, making it an ideal spot for food enthusiasts."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Central",
          "Description": "Central is the heart of Hong Kong's business district, home to glittering skyscrapers, luxury boutiques, and fine dining establishments. Explore the bustling streets, visit historic landmarks like Man Mo Temple, and indulge in the city's vibrant nightlife."
        },
        {
          "Name": "Tsim Sha Tsui",
          "Description": "Tsim Sha Tsui is a vibrant neighborhood known for its bustling shopping streets, iconic landmarks like the Avenue of Stars, and world-class museums. Immerse yourself in the energetic atmosphere, dine at waterfront restaurants, and enjoy stunning views of the harbor."
        },
        {
          "Name": "Sheung Wan",
          "Description": "Discover the charm of Sheung Wan, a neighborhood that seamlessly blends tradition and modernity. Explore the historic streets, visit art galleries, trendy cafes, and antique shops. Experience the blend of Chinese and Western influences that define this eclectic district."
        }
      ]
    },
    {
      "CityName": "Sofia",
      "BriefDescription": "Sofia, Bulgaria's capital and largest city, boasts a blend of rich history, vibrant culture, and modern dynamism. Set against the backdrop of the Vitosha Mountain, Sofia offers a mix of ancient landmarks, contemporary architecture, and a thriving culinary scene.",
      "History": "Sofia's history spans over 7,000 years, with traces of Thracian, Roman, Byzantine, Ottoman, and Soviet influences. From ancient Serdica to modern Sofia, the city has evolved into a cultural and economic hub that reflects Bulgaria's past and present.",
      "Attractions": [
        {
          "Name": "Alexander Nevsky Cathedral",
          "Description": "Admire the grandeur of Alexander Nevsky Cathedral, one of the largest Eastern Orthodox cathedrals in the world. Marvel at its stunning golden domes and intricate interior adorned with religious art and mosaics."
        },
        {
          "Name": "Vitosha Mountain",
          "Description": "Escape to the natural beauty of Vitosha Mountain, located just outside Sofia. Explore hiking trails, enjoy winter sports, and relish panoramic views of the city from above, making it a favorite destination for both locals and visitors."
        },
        {
          "Name": "National Palace of Culture (NDK)",
          "Description": "Experience cultural events and artistic performances at the National Palace of Culture (NDK), a modern architectural marvel. The NDK hosts exhibitions, concerts, and conferences, making it a prominent cultural and entertainment venue in Sofia."
        }
      ],
      "Restaurants": [
        {
          "Name": "Shtastlivetza",
          "Description": "Dine at Shtastlivetza, a cozy restaurant that celebrates Bulgarian cuisine with a contemporary twist. Indulge in traditional dishes made from locally sourced ingredients and enjoy the warm and inviting atmosphere."
        },
        {
          "Name": "Made in Home",
          "Description": "Savor homemade flavors at Made in Home, a charming restaurant offering a fusion of Bulgarian and international dishes. Experience the cozy ambiance, friendly service, and a diverse menu that caters to different dietary preferences."
        },
        {
          "Name": "Happy Bar & Grill",
          "Description": "Relax at Happy Bar & Grill, a popular chain known for its diverse menu and casual atmosphere. Enjoy a wide range of dishes, from burgers to salads, and embrace the vibrant ambiance that caters to families, friends, and solo diners."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Centrum",
          "Description": "Explore the heart of Sofia in the Centrum neighborhood. Discover historic landmarks like the Presidency and the National Assembly, stroll along Vitosha Boulevard for shopping and dining, and immerse yourself in the city's bustling atmosphere."
        },
        {
          "Name": "Lozenets",
          "Description": "Experience the upscale charm of Lozenets, a residential area known for its elegant architecture, parks, and trendy cafés. Enjoy a leisurely stroll through the tree-lined streets and visit local boutiques and artisan shops."
        },
        {
          "Name": "Oborishte",
          "Description": "Immerse yourself in the bohemian vibes of Oborishte, a neighborhood known for its artistic scene and historical architecture. Explore art galleries, visit the Ivan Vazov National Theater, and unwind in cozy cafés and hidden courtyards."
        }
      ]
    },
    {
      "CityName": "Marseille",
      "BriefDescription": "Marseille, France's second-largest city and oldest port, offers a captivating mix of history, culture, and Mediterranean charm. With a rich maritime heritage, bustling markets, and a diverse culinary scene, Marseille invites visitors to explore its vibrant neighborhoods and enjoy its sunny climate and coastal beauty.",
      "History": "Marseille's history dates back over 2,600 years, making it one of Europe's oldest cities. Founded by the Greeks, it became an essential trading center and a melting pot of cultures. Throughout the centuries, Marseille has evolved into a multicultural and dynamic city, shaping its unique identity.",
      "Attractions": [
        {
          "Name": "Vieux Port (Old Port)",
          "Description": "Visit the heart of Marseille at the Vieux Port, where colorful fishing boats and luxury yachts share the waterfront. Enjoy fresh seafood at bustling restaurants, explore the fish market, and soak in the lively atmosphere of this iconic harbor."
        },
        {
          "Name": "Notre-Dame de la Garde",
          "Description": "Climb to the highest point in Marseille to reach Notre-Dame de la Garde, a stunning basilica with panoramic views of the city and the Mediterranean Sea. Admire the ornate interior and the golden statue of the Virgin Mary, a symbol of protection for sailors."
        },
        {
          "Name": "Le Panier",
          "Description": "Explore the oldest neighborhood in Marseille, Le Panier, known for its narrow streets, charming squares, and vibrant street art. Discover historical landmarks, like the Vieille Charité, and embrace the bohemian ambiance of this artsy and multicultural district."
        }
      ],
      "Restaurants": [
        {
          "Name": "Chez Fonfon",
          "Description": "Taste authentic bouillabaisse, Marseille's famous fish stew, at Chez Fonfon, a beloved seafood restaurant located near the sea. Enjoy a delightful meal while overlooking the harbor and savoring the fresh flavors of the Mediterranean."
        },
        {
          "Name": "L'Épuisette",
          "Description": "Indulge in refined seafood dishes at L'Épuisette, a Michelin-starred restaurant with breathtaking views of the sea. Savor innovative cuisine that highlights the bounty of the Mediterranean, prepared with precision and creativity."
        },
        {
          "Name": "Le Malthazar",
          "Description": "Experience modern Provencal cuisine at Le Malthazar, a stylish restaurant offering a fusion of traditional flavors with a contemporary twist. Enjoy the elegant ambiance and taste dishes made with fresh, seasonal ingredients."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Le Panier",
          "Description": "Discover the oldest district of Marseille, Le Panier, where narrow streets lead to charming squares and vibrant street art adorns the walls. Explore historical landmarks, like the Vieille Charité, and embrace the bohemian ambiance of this artsy and multicultural neighborhood."
        },
        {
          "Name": "Vieux Port (Old Port)",
          "Description": "Experience the heart of Marseille at the Vieux Port, where colorful fishing boats and luxury yachts share the waterfront. Enjoy fresh seafood at bustling restaurants, explore the fish market, and soak in the lively atmosphere of this iconic harbor."
        },
        {
          "Name": "Cours Julien",
          "Description": "Immerse yourself in the lively atmosphere of Cours Julien, a vibrant neighborhood known for its artistic and alternative scene. Stroll along colorful streets adorned with street art, visit art galleries, and enjoy the eclectic mix of cafés, bars, and boutiques."
        }
      ]
    },
    {
      "CityName": "Lisbon",
      "BriefDescription": "Lisbon, the enchanting capital of Portugal, captivates visitors with its rich history, stunning architecture, and vibrant culture. Nestled on the hills overlooking the Tagus River, the city boasts colorful streets, atmospheric neighborhoods, and a warm and welcoming atmosphere.",
      "History": "Lisbon has a captivating history that spans centuries, from its ancient origins as a Phoenician trading post to its prominence during the Age of Discovery. Once a powerful maritime empire, the city still bears the marks of its seafaring past in its grand palaces, cobbled streets, and intricate tilework.",
      "Attractions": [
        {
          "Name": "Belém Tower",
          "Description": "Visit the iconic Belém Tower, a UNESCO World Heritage site and a symbol of Portugal's maritime history. This imposing fortress stands on the banks of the Tagus River, offering panoramic views and a glimpse into the country's rich exploration legacy."
        },
        {
          "Name": "Jerónimos Monastery",
          "Description": "Marvel at the stunning Jerónimos Monastery, another UNESCO World Heritage site, renowned for its intricate Manueline architecture. Explore the ornate cloisters, intricate stone carvings, and visit the tomb of Vasco da Gama, the famed Portuguese explorer."
        },
        {
          "Name": "Lisbon Cathedral",
          "Description": "Discover the Lisbon Cathedral, a historic landmark that dates back to the 12th century. Admire its Romanesque architecture, explore the interior with its beautiful stained glass windows, and enjoy panoramic views of the city from its rooftop terrace."
        }
      ],
      "Restaurants": [
        {
          "Name": "Time Out Market Lisboa",
          "Description": "Experience the vibrant culinary scene at Time Out Market Lisboa, a food hall showcasing a variety of delicious Portuguese dishes from renowned chefs and local vendors. From seafood to pastries, this bustling market offers something for every palate."
        },
        {
          "Name": "Cervejaria Ramiro",
          "Description": "Indulge in the freshest seafood at Cervejaria Ramiro, a legendary Lisbon institution. Feast on delectable shrimp, clams, crab, and other seafood specialties, all served in a lively atmosphere that exudes local charm and hospitality."
        },
        {
          "Name": "Pasteis de Belém",
          "Description": "Savor the world-famous pastéis de nata (custard tarts) at Pasteis de Belém, a historic bakery that has been delighting visitors since 1837. Enjoy these warm, flaky pastries sprinkled with cinnamon and powdered sugar, paired perfectly with a cup of coffee."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Alfama",
          "Description": "Explore the winding streets and narrow alleys of Alfama, Lisbon's oldest neighborhood. Get lost in its medieval charm, visit São Jorge Castle, listen to soulful fado music, and admire panoramic views of the city from its viewpoints."
        },
        {
          "Name": "Bairro Alto",
          "Description": "Experience the bohemian vibes of Bairro Alto, a lively neighborhood known for its vibrant nightlife, eclectic bars, and music venues. During the day, wander through its narrow streets lined with colorful buildings and discover trendy boutiques and quirky shops."
        },
        {
          "Name": "Chiado",
          "Description": "Immerse yourself in the elegant ambiance of Chiado, a sophisticated neighborhood filled with upscale shops, historic cafés, and cultural institutions. Explore its grand squares, browse through bookstores, and indulge in a cup of coffee at Café A Brasileira."
        }
      ]
    },
    {
      "CityName": "Lima",
      "BriefDescription": "Lima, the capital of Peru, enchants visitors with its rich history, culinary delights, and vibrant culture. Nestled on the Pacific coast, the city offers a fascinating blend of ancient ruins, colonial architecture, and a thriving gastronomic scene that has earned it the title of 'Gastronomic Capital of the Americas'.",
      "History": "Lima boasts a captivating history that dates back thousands of years. Founded by Spanish conquistador Francisco Pizarro in 1535, the city became the center of Spanish colonial power in South America. Today, it showcases a unique blend of indigenous, colonial, and contemporary influences.",
      "Attractions": [
        {
          "Name": "Historic Centre of Lima",
          "Description": "Explore the Historic Centre of Lima, a UNESCO World Heritage site. Discover Plaza Mayor, the heart of the city, visit historic landmarks such as the Cathedral of Lima and the Monastery of San Francisco, and marvel at the colonial architecture that transports you to the city's past."
        },
        {
          "Name": "Barranco District",
          "Description": "Immerse yourself in the bohemian charm of the Barranco District. Stroll along its colorful streets adorned with vibrant murals, visit art galleries and cozy cafés, and enjoy breathtaking views of the Pacific Ocean from the famous Bridge of Sighs."
        },
        {
          "Name": "Huaca Pucllana",
          "Description": "Step back in time at Huaca Pucllana, an ancient adobe pyramid located in the heart of Lima. Explore the archaeological site, learn about the fascinating history of the Lima culture that once thrived here, and enjoy the panoramic views of the surrounding cityscape."
        }
      ],
      "Restaurants": [
        {
          "Name": "Central",
          "Description": "Experience the innovative cuisine of Central, a world-renowned restaurant that showcases the biodiversity of Peru. Chef Virgilio Martínez takes you on a culinary journey, incorporating native ingredients and elevating traditional Peruvian dishes to new heights."
        },
        {
          "Name": "Astrid y Gastón",
          "Description": "Indulge in a gastronomic delight at Astrid y Gastón, one of Lima's most celebrated restaurants. Chef Gastón Acurio presents a fusion of Peruvian flavors with international techniques, offering a memorable dining experience in a stylish and elegant setting."
        },
        {
          "Name": "La Mar",
          "Description": "Savor the flavors of Peru's renowned ceviche at La Mar, a beloved seafood restaurant. Enjoy fresh and tangy marinated fish, paired with traditional Peruvian dishes and refreshing cocktails, all served in a lively and vibrant atmosphere."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Miraflores",
          "Description": "Discover Miraflores, a trendy neighborhood that offers a mix of modernity and natural beauty. Explore the picturesque Larcomar, a shopping center perched on cliffs overlooking the Pacific Ocean, visit parks with stunning views, and savor the coastal culinary delights."
        },
        {
          "Name": "Barranco",
          "Description": "Experience the bohemian and artistic vibes of Barranco, a neighborhood known for its colorful colonial houses, art galleries, and lively nightlife. Walk along its charming streets, visit local craft markets, and immerse yourself in the vibrant cultural scene."
        },
        {
          "Name": "Historic Centre",
          "Description": "Explore the Historic Centre of Lima, the city's oldest district. Wander through its colonial streets, visit historic sites, and admire the beautiful architecture. Immerse yourself in the local culture, sample traditional cuisine, and feel the vibrant energy of Lima's heart."
        }
      ]
    },
    {
      "CityName": "London",
      "BriefDescription": "London, the vibrant capital of the United Kingdom, is a city of endless discoveries, where rich history, iconic landmarks, and a thriving cultural scene come together. From royal palaces to world-class museums, diverse neighborhoods to global cuisine, London offers a captivating and cosmopolitan experience.",
      "History": "London's history spans over two millennia. From its Roman origins to its transformation into a global center of trade and culture, the city has witnessed historic events and shaped the world we know today. It has been the seat of power for British monarchs and a melting pot of diverse cultures.",
      "Attractions": [
        {
          "Name": "The British Museum",
          "Description": "Immerse yourself in world history and culture at The British Museum. Discover treasures from ancient civilizations, including the Rosetta Stone and Egyptian mummies, as you explore its vast collection spanning over two million years of human history."
        },
        {
          "Name": "Tower of London",
          "Description": "Step into history at the Tower of London, a UNESCO World Heritage site. Explore the medieval fortress, admire the Crown Jewels, and learn about its dark past, including stories of royal intrigue, imprisonment, and beheadings."
        },
        {
          "Name": "The National Gallery",
          "Description": "Delight in world-class art at The National Gallery. Marvel at masterpieces by renowned artists, such as Leonardo da Vinci, Vincent van Gogh, and Rembrandt, and immerse yourself in the diverse collection that spans centuries of artistic excellence."
        }
      ],
      "Restaurants": [
        {
          "Name": "Dishoom",
          "Description": "Experience the flavors of India at Dishoom, a popular restaurant known for its contemporary take on Bombay cuisine. Indulge in aromatic curries, flavorful street food, and signature dishes like their famous black daal, all served in a stylish and bustling setting."
        },
        {
          "Name": "Sketch",
          "Description": "Dine in style at Sketch, a Michelin-starred restaurant that offers a unique blend of art, design, and gastronomy. Enjoy exquisite dishes presented as culinary masterpieces, while surrounded by a whimsical interior that sets the stage for an extraordinary dining experience."
        },
        {
          "Name": "Borough Market",
          "Description": "Discover the vibrant food scene at Borough Market, one of London's oldest and most renowned food markets. Explore a tempting array of fresh produce, artisanal products, and international street food, and indulge in culinary delights from around the world."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Covent Garden",
          "Description": "Explore the lively streets of Covent Garden, known for its bustling markets, boutique shops, and street performers. Experience the vibrant atmosphere of the Royal Opera House, enjoy a wide range of dining options, and discover hidden gems in its historic arcades."
        },
        {
          "Name": "Notting Hill",
          "Description": "Wander through the colorful streets of Notting Hill, famous for its charming houses and the renowned Portobello Road Market. Discover antique treasures, boutique shops, and cozy cafés, and immerse yourself in the vibrant energy of this trendy and diverse neighborhood."
        },
        {
          "Name": "Shoreditch",
          "Description": "Embrace the creative and eclectic vibes of Shoreditch, a neighborhood at the forefront of London's art, fashion, and food scene. Explore vibrant street art, visit cutting-edge galleries, dine in trendy restaurants, and experience the dynamic nightlife that defines this urban hotspot."
        }
      ]
    },
    {
      "CityName": "Madrid",
      "BriefDescription": "Madrid, the vibrant capital of Spain, captures the essence of Spanish culture with its rich history, artistic heritage, and lively atmosphere. This cosmopolitan city combines grand architecture, world-class museums, and a passion for food and nightlife, offering an unforgettable experience for visitors.",
      "History": "Madrid's history dates back to the 9th century when it was established as a small fortress. Over the centuries, it grew into the capital of Spain and a hub of political and cultural significance. Today, Madrid showcases its heritage through its majestic palaces, historic squares, and iconic landmarks.",
      "Attractions": [
        {
          "Name": "Prado Museum",
          "Description": "Immerse yourself in art at the Prado Museum, home to a vast collection of masterpieces by Spanish and European artists. Admire works by Goya, Velázquez, El Greco, and many others, and discover the evolution of art through the centuries."
        },
        {
          "Name": "Royal Palace of Madrid",
          "Description": "Step into royal grandeur at the Royal Palace of Madrid, the official residence of the Spanish royal family. Explore opulent rooms, admire priceless artworks, and stroll through the beautiful gardens, gaining insights into Spain's regal history."
        },
        {
          "Name": "Retiro Park",
          "Description": "Escape the urban bustle and unwind in the peaceful oasis of Retiro Park. Enjoy a leisurely stroll through its lush gardens, rent a rowboat on the lake, visit the Crystal Palace, and relax in the shade of majestic trees."
        }
      ],
      "Restaurants": [
        {
          "Name": "Botín",
          "Description": "Dine at Botín, the world's oldest continuously operating restaurant, famous for its succulent roast suckling pig and lamb. Indulge in traditional Spanish cuisine in a historic setting, where renowned figures like Ernest Hemingway once savored their meals."
        },
        {
          "Name": "Mercado de San Miguel",
          "Description": "Experience the vibrant food scene at Mercado de San Miguel, a bustling food market housed in a beautifully restored iron structure. Sample a wide variety of Spanish delicacies, from fresh seafood to tapas and regional specialties, accompanied by fine wines and spirits."
        },
        {
          "Name": "DiverXO",
          "Description": "Embark on a culinary adventure at DiverXO, a three-Michelin-starred restaurant helmed by chef David Muñoz. Prepare to be dazzled by the innovative and playful dishes that fuse traditional Spanish flavors with avant-garde techniques in a unique dining experience."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Puerta del Sol",
          "Description": "Explore the bustling Puerta del Sol, the heart of Madrid and a vibrant meeting point. Discover iconic landmarks like the Bear and the Strawberry Tree statue, shop in the bustling Gran Vía, and enjoy lively street performances in this lively neighborhood."
        },
        {
          "Name": "Malasaña",
          "Description": "Immerse yourself in the bohemian and alternative atmosphere of Malasaña. Explore its hip shops, trendy bars, and vibrant street art scene. This neighborhood comes alive at night, offering a vibrant nightlife with live music venues, cocktail bars, and eclectic clubs."
        },
        {
          "Name": "La Latina",
          "Description": "Experience the traditional charm of La Latina, a neighborhood known for its narrow streets, historic squares, and lively tapas bars. Enjoy a leisurely stroll through its picturesque alleys, visit the vibrant Mercado de la Cebada, and indulge in the culinary delights of Spanish cuisine."
        }
      ]
    },
    {
      "CityName": "Malaga",
      "BriefDescription": "Malaga, a vibrant coastal city in southern Spain, captivates visitors with its rich history, stunning beaches, and vibrant culture. Known as the birthplace of Pablo Picasso, the city boasts a mix of ancient ruins, modern architecture, and a lively atmosphere that embraces its Andalusian heritage.",
      "History": "Malaga has a fascinating history that spans thousands of years. From its origins as a Phoenician trading post to its Roman and Moorish influences, the city has been shaped by diverse civilizations. Today, it showcases a blend of historical landmarks, cultural traditions, and a modern cosmopolitan vibe.",
      "Attractions": [
        {
          "Name": "Alcazaba of Malaga",
          "Description": "Explore the Alcazaba of Malaga, a fortress-palace that offers breathtaking views of the city and the Mediterranean Sea. Marvel at its Moorish architecture, stroll through beautiful gardens, and visit the adjoining Roman Theatre, which dates back to the 1st century BC."
        },
        {
          "Name": "Picasso Museum",
          "Description": "Discover the artistic legacy of Pablo Picasso at the Picasso Museum. Housing a remarkable collection of his works, the museum provides insight into the life and evolution of this iconic artist, showcasing paintings, sculptures, ceramics, and drawings."
        },
        {
          "Name": "Malaga Cathedral",
          "Description": "Admire the grandeur of Malaga Cathedral, an architectural masterpiece with a mix of Gothic, Renaissance, and Baroque styles. Visit the interior to appreciate its intricate details and ascend to the rooftop for panoramic views of the city and the surrounding mountains."
        }
      ],
      "Restaurants": [
        {
          "Name": "El Pimpi",
          "Description": "Experience the culinary delights of Malaga at El Pimpi, a legendary restaurant and wine bar. Sample traditional Andalusian dishes, paired with a wide selection of local wines, while immersing yourself in the vibrant ambiance and lively atmosphere."
        },
        {
          "Name": "La Cosmopolita",
          "Description": "Indulge in authentic tapas at La Cosmopolita, a popular spot known for its delicious small plates. Enjoy a variety of traditional Spanish flavors, from Iberian ham to fresh seafood, all prepared with care and served in a cozy and welcoming setting."
        },
        {
          "Name": "Refectorium Catedral",
          "Description": "Savor Mediterranean cuisine at Refectorium Catedral, located in the heart of Malaga. Delight in seafood specialties, grilled meats, and creative dishes inspired by regional ingredients, all served in an elegant and sophisticated environment."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Malaga Centro",
          "Description": "Discover the vibrant Malaga Centro, the city's historic center. Explore its charming streets lined with shops, bars, and restaurants. Visit the bustling Plaza de la Constitución, shop at the famous Calle Marqués de Larios, and immerse yourself in the lively atmosphere."
        },
        {
          "Name": "La Malagueta",
          "Description": "Experience the coastal charm of La Malagueta, a neighborhood known for its beautiful beaches and lively promenade. Enjoy a relaxing day by the sea, indulge in fresh seafood, and soak up the sun while admiring views of the Mediterranean."
        },
        {
          "Name": "Soho District",
          "Description": "Immerse yourself in the artistic and trendy vibes of the Soho District. Explore its colorful streets adorned with vibrant street art, visit contemporary art galleries, and enjoy the bohemian atmosphere that makes this neighborhood a creative hub."
        }
      ]
    }
  ])
  console.log("yangli end")  
}



// yiqing -----------------------------------------------------------
async function init_yiqing(db) {
  console.log("yiqing start")
  await db.insertMany( [
    {
      "CityName": "New York",
      "BriefDescription": "New York, often referred to as 'The Big Apple', is a bustling metropolis known for its iconic skyline, vibrant arts scene, and rich history. Delve into its diverse neighborhoods, enjoy world-class entertainment, and taste a myriad of global cuisines.",
      "History": "New York's history stretches from its founding as New Amsterdam in the 17th century by the Dutch to its rise as a global financial and cultural capital. The city has been a crossroads of cultures, with influences from around the world shaping its identity.",
      "Attractions": [
        {
          "Name": "Statue of Liberty",
          "Description": "A symbol of freedom and democracy, this colossal statue was a gift from France to the United States. Visitors can climb up for panoramic views of the harbor."
        },
        {
          "Name": "Central Park",
          "Description": "An urban oasis in the heart of Manhattan, Central Park offers a respite from the city's hustle and bustle. With lakes, trails, and recreational areas, it's a favorite spot for both locals and tourists."
        },
        {
          "Name": "Times Square",
          "Description": "Known as 'The Crossroads of the World', Times Square is famous for its neon lights, Broadway theaters, and bustling atmosphere. Join the crowds for New Year's Eve celebrations or simply soak in the energy of this iconic spot."
        }
      ],
      "Restaurants": [
        {
          "Name": "Joe's Pizza",
          "Description": "A classic New York pizzeria, Joe's has been serving authentic NY-style slices since 1975. Grab a slice and enjoy the city's favorite comfort food."
        },
        {
          "Name": "Katz's Delicatessen",
          "Description": "This historic deli is renowned for its pastrami sandwiches and classic Jewish fare. Experience a taste of old New York with every bite."
        },
        {
          "Name": "Le Bernardin",
          "Description": "A Michelin three-star restaurant, Le Bernardin is a temple of seafood cuisine. Experience fine dining with dishes crafted by world-renowned chefs."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Manhattan",
          "Description": "The heart of the city, Manhattan boasts iconic landmarks, skyscrapers, and a dynamic cultural scene."
        },
        {
          "Name": "Brooklyn",
          "Description": "Known for its diverse communities, Brooklyn offers a mix of historic charm and modern innovation."
        },
        {
          "Name": "Queens",
          "Description": "The city's most ethnically diverse borough, Queens is a culinary and cultural melting pot with unique neighborhoods and attractions."
        }
      ]
    },
    {
      "CityName": "Nice",
      "BriefDescription": "Nice, the crown jewel of the French Riviera, is renowned for its stunning seafront, the Promenade des Anglais, and a vibrant arts scene. With its Mediterranean climate and picturesque landscapes, it offers visitors a mix of relaxation and rich cultural experiences.",
      "History": "Founded by the Greeks and later a retreat for 19th-century European elite, Nice has always attracted admirers from all over the world. Its diverse history is reflected in its architecture, museums, and vibrant streets.",
      "Attractions": [
        {
          "Name": "Promenade des Anglais",
          "Description": "Stretching for several kilometers along the Baie des Anges, the promenade offers breathtaking views, beach access, and a glimpse into the luxurious lifestyle of the Riviera."
        },
        {
          "Name": "Marc Chagall National Museum",
          "Description": "Dedicated to the work of artist Marc Chagall, this museum showcases his biblical-themed paintings, offering a deep dive into his unique world."
        },
        {
          "Name": "Castle Hill",
          "Description": "The historic and natural heart of Nice, Castle Hill offers panoramic views of the city, the Baie des Anges, and the Alps."
        }
      ],
      "Restaurants": [
        {
          "Name": "La Route du Miam",
          "Description": "Offering traditional Niçoise cuisine, La Route du Miam is a haven for food lovers. Dishes like ratatouille and socca are must-tries here."
        },
        {
          "Name": "Le Plongeoir",
          "Description": "Perched on a rock off Nice's coastline, this restaurant offers both exquisite seafood dishes and spectacular sea views."
        },
        {
          "Name": "Jan",
          "Description": "This Michelin-starred restaurant serves a fusion of South African and French cuisines, making it a unique dining experience in Nice."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Vieux Nice",
          "Description": "The old town of Nice, with its narrow cobblestone streets, vibrant markets, and historic buildings, transports visitors to a bygone era."
        },
        {
          "Name": "Cimiez",
          "Description": "Known for its Roman ruins and the Marc Chagall National Museum, Cimiez is a quieter, residential area with parks and monasteries."
        },
        {
          "Name": "Liberation",
          "Description": "A bustling neighborhood, Liberation is known for its daily market and Art Deco architecture."
        }
      ]
    },
    {
      "CityName": "Paris",
      "BriefDescription": "Paris, the 'City of Light', is celebrated for its romantic ambiance, world-class art and fashion, and a rich tapestry of history. Explore its iconic landmarks, indulge in delectable French cuisine, and lose yourself in its charming streets.",
      "History": "Founded over 2,000 years ago, Paris has witnessed pivotal moments from the French Revolution to the Age of Enlightenment. As the epicenter of art, science, and philosophy, Paris's legacy is profound.",
      "Attractions": [
        {
          "Name": "Eiffel Tower",
          "Description": "Constructed in 1889 as the entrance arch for the 1889 World's Fair, the Eiffel Tower is a symbol of Paris and offers panoramic views of the city."
        },
        {
          "Name": "Louvre Museum",
          "Description": "One of the world's largest and most visited art museums, the Louvre houses a vast collection including the Mona Lisa and The Venus de Milo."
        },
        {
          "Name": "Notre-Dame Cathedral",
          "Description": "A masterpiece of French Gothic architecture, the Notre-Dame is famed for its striking facade, sculptures, and rose windows."
        }
      ],
      "Restaurants": [
        {
          "Name": "Le Comptoir du Relais",
          "Description": "Situated in the Saint-Germain neighborhood, this bistro offers classic Parisian dishes in a warm and bustling setting."
        },
        {
          "Name": "L'Ambroisie",
          "Description": "Nestled in the heart of Le Marais, this three-star Michelin restaurant is known for its exquisite French haute cuisine."
        },
        {
          "Name": "Le Jules Verne",
          "Description": "Located within the Eiffel Tower, this Michelin-starred restaurant combines gourmet French dishes with breathtaking views of Paris."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Le Marais",
          "Description": "A historic and trendy district, Le Marais boasts boutique shops, art galleries, and a vibrant nightlife."
        },
        {
          "Name": "Montmartre",
          "Description": "Once the haunt of artists like Picasso, Montmartre is known for the Sacré-Cœur Basilica and its bohemian past."
        },
        {
          "Name": "Saint-Germain-des-Prés",
          "Description": "A cultural hub, this left bank neighborhood is renowned for its cafes, literature, and jazz clubs."
        }
      ]
    },
    {
      "CityName": "Prague",
      "BriefDescription": "Prague, the 'City of a Hundred Spires', is a magical destination known for its Gothic and Baroque architecture, picturesque streets, and the tranquil Vltava River. Steeped in history, Prague's allure is timeless, attracting travelers from across the globe.",
      "History": "With origins in the Romanesque era and key events such as the Prague Spring, the Bohemian capital has been a significant European city for centuries. Its rich cultural heritage is evident in its theaters, museums, and historic squares.",
      "Attractions": [
        {
          "Name": "Prague Castle",
          "Description": "Dominating the city skyline, Prague Castle is the world's largest ancient castle and has been the seat of Bohemian kings and emperors for over a thousand years."
        },
        {
          "Name": "Charles Bridge",
          "Description": "Connecting the Old Town and Lesser Town, this iconic stone bridge, adorned with 30 statues, offers panoramic views of the city and is a hub of activity."
        },
        {
          "Name": "Astronomical Clock",
          "Description": "Located in Old Town Square, the medieval astronomical clock, known as Orloj, attracts spectators every hour for its procession of Apostles and intricate dials."
        }
      ],
      "Restaurants": [
        {
          "Name": "Lokál Dlouhááá",
          "Description": "Offering traditional Czech dishes and fresh Pilsner, Lokál Dlouhááá is a favorite among locals and tourists for its authentic flavors."
        },
        {
          "Name": "Field",
          "Description": "A Michelin-starred establishment, Field presents Czech cuisine with a modern twist, focusing on fresh, farm-to-table ingredients."
        },
        {
          "Name": "Café Savoy",
          "Description": "A historic cafe on the left bank of the Vltava, Café Savoy boasts elegant interiors and is renowned for its breakfasts and Viennese-inspired desserts."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Old Town (Staré Město)",
          "Description": "The heart of Prague, Old Town is filled with winding cobblestone streets, historic buildings, and bustling squares."
        },
        {
          "Name": "Lesser Town (Malá Strana)",
          "Description": "Sitting below Prague Castle, Lesser Town is characterized by Baroque palaces, gardens, and the iconic Charles Bridge."
        },
        {
          "Name": "Vinohrady",
          "Description": "A chic neighborhood known for its Art Nouveau buildings, Vinohrady offers parks, cafes, and a lively local scene."
        }
      ]
    },
    {
      "CityName": "Rome",
      "BriefDescription": "Rome, the 'Eternal City', is a treasure trove of ancient history, art, and culture. From its iconic Colosseum to the majestic St. Peter's Basilica, Rome invites visitors to step back in time and immerse themselves in millennia of history and tradition.",
      "History": "Founded according to legend by Romulus and Remus in 753 BC, Rome became the heart of the mighty Roman Empire. As the center of Catholicism, it has also been a pivotal spiritual and cultural hub for centuries.",
      "Attractions": [
        {
          "Name": "Colosseum",
          "Description": "Once the arena of gladiatorial combat, the Colosseum stands as a testament to the architectural prowess and grandeur of the Roman Empire."
        },
        {
          "Name": "Pantheon",
          "Description": "An architectural marvel, the Pantheon boasts the world's largest unreinforced concrete dome and is a symbol of Roman engineering genius."
        },
        {
          "Name": "Vatican City",
          "Description": "The smallest independent state in the world, it's the religious and administrative center of the Catholic Church, home to St. Peter's Basilica and the Sistine Chapel."
        }
      ],
      "Restaurants": [
        {
          "Name": "La Pergola",
          "Description": "Holding three Michelin stars, La Pergola offers a gastronomic experience with panoramic views of the city from the Rome Cavalieri hotel."
        },
        {
          "Name": "Roscioli",
          "Description": "A beloved institution in Rome, Roscioli combines a bakery, deli, and restaurant, serving some of the city's finest carbonara and fresh breads."
        },
        {
          "Name": "Pizzarium",
          "Description": "Helmed by Gabriele Bonci, Pizzarium offers a modern take on Roman pizza al taglio, with a myriad of innovative toppings on a perfectly crispy crust."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Trastevere",
          "Description": "Charming and bohemian, Trastevere is known for its narrow cobbled streets, medieval houses, and vibrant nightlife."
        },
        {
          "Name": "Monti",
          "Description": "One of Rome's oldest neighborhoods, Monti is a blend of the traditional and the trendy, with vintage shops, artisan boutiques, and cozy cafes."
        },
        {
          "Name": "Prati",
          "Description": "Elegant and spacious, Prati is known for its wide avenues, upscale shops, and its proximity to Vatican City."
        }
      ]
    },
    {
      "CityName": "Sydney",
      "BriefDescription": "Sydney, Australia's vibrant harbor city, is known for its iconic Opera House, sun-kissed beaches, and cosmopolitan lifestyle. The city effortlessly combines its natural beauty with urban sophistication.",
      "History": "Established as a penal colony in 1788, Sydney has transformed into Australia's largest and most internationally recognized city.",
      "Attractions": [
        {
          "Name": "Sydney Opera House",
          "Description": "A masterpiece of 20th-century architecture, the Opera House is Sydney's iconic landmark, hosting world-class performances year-round."
        },
        {
          "Name": "Bondi Beach",
          "Description": "Australia's most famous beach, Bondi is a hotspot for surfers, swimmers, and sunbathers, surrounded by hip cafes and eateries."
        },
        {
          "Name": "Harbour Bridge",
          "Description": "An engineering marvel, the Harbour Bridge offers breathtaking views of the harbor and the city, especially during the renowned New Year's Eve fireworks."
        }
      ],
      "Restaurants": [
        {
          "Name": "Quay",
          "Description": "Offering panoramic views of the Sydney Harbour, Quay is a culinary landmark, known for its innovative and refined dishes."
        },
        {
          "Name": "Aria",
          "Description": "Overlooking the Opera House, Aria offers a fine dining experience with modern Australian cuisine in an elegant setting."
        },
        {
          "Name": "Bennelong",
          "Description": "Housed within the Sydney Opera House, Bennelong showcases the richness of Australian produce with its contemporary menu."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "The Rocks",
          "Description": "Steeped in history, The Rocks is known for its cobblestone lanes, historic buildings, and vibrant weekend markets."
        },
        {
          "Name": "Surry Hills",
          "Description": "An eclectic suburb, Surry Hills is the heart of Sydney's culinary scene with trendy cafes, wine bars, and boutique shops."
        },
        {
          "Name": "Darling Harbour",
          "Description": "A bustling waterfront area, Darling Harbour is packed with attractions, restaurants, and entertainment venues."
        }
      ]
    },
    {
      "CityName": "Tokyo",
      "BriefDescription": "Tokyo, Japan's bustling capital, is a harmonious blend of ultramodern skyscrapers and historic temples. With its vibrant street life, top-notch dining, and cutting-edge technology, Tokyo is a city that never stops surprising.",
      "History": "Formerly known as Edo, Tokyo became Japan's political center in the early 17th century and its modern capital in the mid-19th century.",
      "Attractions": [
        {
          "Name": "Shinjuku Gyoen",
          "Description": "A tranquil oasis in the heart of the city, this national garden offers a respite from Tokyo's hustle with its traditional Japanese gardens and cherry blossoms."
        },
        {
          "Name": "Tokyo Skytree",
          "Description": "Japan's tallest structure, the Skytree offers panoramic views of the sprawling cityscape and is also home to an aquarium, planetarium, and various shops."
        },
        {
          "Name": "Sensō-ji Temple",
          "Description": "Located in Asakusa, this ancient Buddhist temple is Tokyo's oldest and draws visitors with its iconic Thunder Gate and shopping street."
        }
      ],
      "Restaurants": [
        {
          "Name": "Sukiyabashi Jiro",
          "Description": "A sushi institution, this modest-looking eatery has gained global fame for its exquisite sushi, as showcased in the documentary 'Jiro Dreams of Sushi'."
        },
        {
          "Name": "Kanda",
          "Description": "Located in the ritzy Moto-Azabu district, Kanda offers seasonal tasting menus, reflecting the best of Japanese culinary traditions."
        },
        {
          "Name": "Gyuan",
          "Description": "Gyuan is a haven for meat lovers, specializing in sumptuous and high-quality Wagyu beef dishes."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Shibuya",
          "Description": "Known for its bustling crossing and vibrant nightlife, Shibuya is a hub for fashion, entertainment, and youth culture."
        },
        {
          "Name": "Ginza",
          "Description": "Tokyo's upscale shopping district, Ginza boasts luxury boutiques, art galleries, and a plethora of gourmet dining options."
        },
        {
          "Name": "Akihabara",
          "Description": "The mecca for electronics and anime culture, Akihabara is a colorful and electric neighborhood, attracting otaku (geek) culture from around the globe."
        }
      ]
    },
    {
      "CityName": "Valencia",
      "BriefDescription": "Valencia, Spain's third-largest city, perfectly marries its historic past with avant-garde architecture. Renowned for its Fallas Festival and as the birthplace of paella, Valencia is a symphony of culture, cuisine, and coastal beauty.",
      "History": "Founded by the Romans in 138 BC, Valencia has been influenced by various civilizations including the Moors, contributing to its rich cultural tapestry.",
      "Attractions": [
        {
          "Name": "City of Arts and Sciences",
          "Description": "A futuristic complex designed by architect Santiago Calatrava, this cultural and architectural marvel includes a planetarium, opera house, and oceanographic park."
        },
        {
          "Name": "Valencia Cathedral",
          "Description": "A Gothic-style cathedral that claims to house the Holy Grail, offering panoramic city views from its Miguelete tower."
        },
        {
          "Name": "Central Market",
          "Description": "One of Europe's largest and oldest running food markets, offering a variety of fresh produce, meats, and local delicacies."
        }
      ],
      "Restaurants": [
        {
          "Name": "Ricard Camarena Restaurant",
          "Description": "A Michelin-starred venue offering innovative Mediterranean dishes, representing Valencia's rich culinary traditions."
        },
        {
          "Name": "La Salita",
          "Description": "Known for its quirky interiors and innovative menu, La Salita brings a modern twist to traditional Valencian dishes."
        },
        {
          "Name": "Navarro",
          "Description": "A city institution, Navarro is famed for its authentic Valencian paella and warm hospitality."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "El Carmen",
          "Description": "Valencia's old town, El Carmen is a maze of narrow medieval lanes, filled with vibrant street art, bars, and historic monuments."
        },
        {
          "Name": "Ruzafa",
          "Description": "A trendy neighborhood, Ruzafa is known for its bohemian vibe, eclectic shops, and bustling nightlife."
        },
        {
          "Name": "La Malvarrosa",
          "Description": "A picturesque beachfront neighborhood, offering a long stretch of sandy beach, promenades, and seafood restaurants."
        }
      ]
    },
    {
      "CityName": "Venice",
      "BriefDescription": "Venice, Italy's floating city, is a dreamlike maze of canals, bridges, and historic architecture. Famous for its gondola rides and the Venice Biennale, it's a romantic and enchanting destination unlike any other.",
      "History": "Established in the 5th century AD, Venice rose to become a major financial and maritime power during the Middle Ages and Renaissance.",
      "Attractions": [
        {
          "Name": "St. Mark's Square",
          "Description": "Venice's principal public square, home to the majestic St. Mark's Basilica and the iconic Campanile."
        },
        {
          "Name": "Grand Canal",
          "Description": "The city's main water thoroughfare, lined with splendid palaces and crossed by the Rialto Bridge."
        },
        {
          "Name": "Doge's Palace",
          "Description": "A masterpiece of Gothic architecture, the palace was the residence of the Doge and the seat of Venetian government."
        }
      ],
      "Restaurants": [
        {
          "Name": "Da Fiore",
          "Description": "A Michelin-starred restaurant offering a modern take on classic Venetian cuisine, with an emphasis on fresh seafood."
        },
        {
          "Name": "Osteria Boccadoro",
          "Description": "Located away from the tourist trail, it serves traditional dishes in a rustic and charming setting."
        },
        {
          "Name": "Corte Sconta",
          "Description": "A Venice favorite, known for its seafood-centric menu and serene garden seating."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "San Marco",
          "Description": "The heart of Venice, home to iconic landmarks and luxury shopping outlets."
        },
        {
          "Name": "Dorsoduro",
          "Description": "A vibrant neighborhood, known for its art galleries, university buzz, and the Guggenheim Museum."
        },
        {
          "Name": "Cannaregio",
          "Description": "The city's most populous district, offering a mix of historic sites and local life. It's also home to the Jewish Ghetto."
        }
      ]
    },
    {
      "CityName": "Vienna",
      "BriefDescription": "Vienna, the capital of Austria, is renowned for its rich history, classical music, and architectural beauty. Often referred to as the 'City of Music' due to its musical legacy, Vienna is a blend of imperial traditions and modern culture.",
      "History": "As the former seat of the Austro-Hungarian Empire, Vienna played a significant role in shaping European history and culture. The city's illustrious past is evident in its well-preserved palaces, museums, and operas.",
      "Attractions": [
        {
          "Name": "Schönbrunn Palace",
          "Description": "An iconic baroque palace with grandiose rooms and beautiful gardens. It served as the summer residence of the Habsburg monarchs."
        },
        {
          "Name": "St. Stephen's Cathedral",
          "Description": "A Gothic and Romanesque church in the heart of Vienna, recognized for its impressive tower and colorful roof tiles."
        },
        {
          "Name": "Vienna State Opera",
          "Description": "One of the world's leading opera houses, it boasts a rich history and offers a wide repertoire of classics and contemporary productions."
        }
      ],
      "Restaurants": [
        {
          "Name": "Steirereck",
          "Description": "Situated in the city park, Steirereck is a Michelin-starred restaurant known for its innovative Austrian cuisine."
        },
        {
          "Name": "Plachutta Wollzeile",
          "Description": "A traditional Austrian restaurant famous for its Tafelspitz – a classic Viennese dish of boiled beef in broth."
        },
        {
          "Name": "Café Central",
          "Description": "An iconic coffeehouse dating back to 1876, Café Central has been frequented by famous historical figures like Sigmund Freud and Leon Trotsky."
        }
      ],
      "Neighborhoods": [
        {
          "Name": "Innere Stadt",
          "Description": "The historic center of Vienna, filled with landmarks, shops, and cafes. It's a UNESCO World Heritage site."
        },
        {
          "Name": "Leopoldstadt",
          "Description": "Situated on an island between the Danube and the Danube Canal, it's known for the Prater amusement park and the city's green spaces."
        },
        {
          "Name": "Wieden",
          "Description": "A vibrant district south of the city center, Wieden is known for its bohemian atmosphere, boutique shops, and local eateries."
        }
      ]
    },
  ]);
    
  console.log("yiqing end")
  
}






