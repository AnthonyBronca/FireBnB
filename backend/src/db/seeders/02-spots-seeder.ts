'use strict';

import { OptionsInterface } from "../../typings/seeders";
// import generateSpotSeeders from "../../utils/spotSeeders";



let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
} else{

}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
        {
          userId: 12,
          name: "Palm Tree stay",
          address: "71963 Schiller Isle",
          city: "Bikini Bottom",
          state: "Mississippi",
          country: "United States",
          description: "Live your fairytale vacation at this stylish, family friendly vacation home. Play and relax in your private pool and hot tub on a peaceful and secluded corner with a lake view. The kids will always remember their favorite characters life-size on their own bedroom walls, and Avengers VR video game motorcycle! No fighting over toilets and showers with FIVE bathrooms! Feel right at home with a full-size kitchen, indoor and outdoor dining, and living room. Write vacation memories to last a lifetime.",
          price: 84,
          lat: 98.245713,
          lng: -125.05892
        }, {
          userId: 3,
          name: "Beautiful Luxuary mansion",
          address: "7536 Johnson Mall",
          city: "London",
          state: "Mississippi",
          country: "United States",
          description: "LIVE LIKE A LOCAL. Unwind in our stylish city views apartment, centrally-located in the heart of Orlando Central Business District. A convenient stay for work or just a night out in Downtown. This bright lil' slice of heaven has all the luxury essentials you need and is in close proximity to so many great restaurants, venues and bars.",
          price: 128,
          lat: 136.799842,
          lng: 128.852935
        }, {
          userId: 5,
          name: "Beach and ocean views",
          address: "37312 Elenora Pines",
          city: "Daytona",
          state: "Indiana",
          country: "United States",
          description: "Home of the Giants, a few feet away",
          price: 49,
          lat: 42.002526,
          lng: 71.490562
        }, {
          userId: 21,
          name: "Satellite Beach",
          address: "42158 Aileen River",
          city: "Manchester",
          state: "Nevada",
          country: "United States",
          description: "Developers paradise",
          price: 192,
          lat: 85.271312,
          lng: 19.70945
        }, {
          userId: 2,
          name: "Lake views",
          address: "919 Kutch Underpass",
          city: "Loweville",
          state: "New York",
          country: "United States",
          description: "Nessi's favorite lounge",
          price: 88,
          lat: 86.987314,
          lng: -108.756763
        }, {
          userId: 3,
          name: "Kid-free resort",
          address: "2207 Abbott Streets",
          city: "Tremblayberg",
          state: "Maine",
          country: "United States",
          description: "Welcome to your family’s beach paradise! Sea View Play is one of New Smyrna Beach’s premiere luxury homes located right across from the ocean waves. In addition to its 5-bedroom, 5.5-bathroom layout, this 3-story home is a quick walk to the beach and local restaurants. From a first-floor suite to a crow’s nest with amazing views, your group of 12 will be never forget this luxe beach experience.",
          price: 29,
          lat: -18.770042,
          lng: 62.566235
        }, {
          userId: 22,
          name: "Downtown home",
          address: "5159 Jana Park",
          city: "Fort Drum",
          state: "Minnesota",
          country: "United States",
          description: "See dolphins from your balcony, the ocean breeze at night, and mimosas in the morning",
          price: 143,
          lat: -52.120286,
          lng: -160.420507
        }, {
          userId: 19,
          name: "Mexican retreat",
          address: "85910 Haley Camp",
          city: "Los Angles",
          state: "Washington",
          country: "United States",
          description: "This is the place to be all the time",
          price: 56,
          lat: 3.539319,
          lng: 132.241411
        }, {
          userId: 3,
          name: "Lake views",
          address: "39295 Wolf Meadow",
          city: "Kawasaki",
          state: "Tennessee",
          country: "United States",
          description: "Disney getaway home for your family and friends",
          price: 29,
          lat: -8.822921,
          lng: 139.412935
        }, {
          userId: 21,
          name: "Wall St. on Elms St. View",
          address: "369 Gusikowski Valley",
          city: "Leaf Village",
          state: "Michigan",
          country: "United States",
          description: "Golden hour never looked so golden! Stay at the most golden place of all!",
          price: 191,
          lat: -112.857272,
          lng: 23.807629
        }, {
          userId: 18,
          name: "Irish getaway",
          address: "688 Bradtke Isle",
          city: "Porto",
          state: "South Carolina",
          country: "United States",
          description: "Welcome to your family’s beach paradise! Sea View Play is one of New Smyrna Beach’s premiere luxury homes located right across from the ocean waves. In addition to its 5-bedroom, 5.5-bathroom layout, this 3-story home is a quick walk to the beach and local restaurants. From a first-floor suite to a crow’s nest with amazing views, your group of 12 will be never forget this luxe beach experience.",
          price: 145,
          lat: -126.771355,
          lng: -97.967106
        }, {
          userId: 19,
          name: "Southern-style home",
          address: "21576 Bauch River",
          city: "Tremblayberg",
          state: "Iowa",
          country: "United States",
          description: "The avengers can be seen fighting aliens from your gorgeous kitchen at this retreat. Beware of aliens.",
          price: 192,
          lat: -179.295396,
          lng: 178.534275
        }, {
          userId: 3,
          name: "Italian springs home",
          address: "8965 Blanche Plaza",
          city: "Fort-Lauderdale",
          state: "Arizona",
          country: "United States",
          description: "This is the place to be all the time",
          price: 103,
          lat: 89.850171,
          lng: -66.627263
        }, {
          userId: 4,
          name: "Beach Place views",
          address: "80222 Hand Trail",
          city: "Pearl City",
          state: "Kansas",
          country: "United States",
          description: "City home but not in the city",
          price: 160,
          lat: -125.96763,
          lng: 103.8891
        }, {
          userId: 2,
          name: "Southern-style home",
          address: "98898 Berta Mills",
          city: "Tokyo",
          state: "North Dakota",
          country: "United States",
          description: "Teams of developers make big company moves here",
          price: 107,
          lat: 143.060459,
          lng: 29.767973
        }, {
          userId: 4,
          name: "Cuban-style home",
          address: "1839 Murphy Junction",
          city: "Lake Maraside",
          state: "Rhode Island",
          country: "United States",
          description: "Welcome to our luxury home located near downtown LA! A true 4 bedroom home, it is perfect for families/friends traveling together. Within minutes to all major attractions. or Stay home and enjoy the magical open-air rooftop deck.",
          price: 193,
          lat: -20.766583,
          lng: -132.943452
        }, {
          userId: 3,
          name: "Beach Place views",
          address: "702 Upton Overpass",
          city: "Bikini Bottom",
          state: "Michigan",
          country: "United States",
          description: "Disney getaway home for your family and friends",
          price: 79,
          lat: -171.927694,
          lng: 80.082717
        }, {
          userId: 19,
          name: "Canal view",
          address: "71720 Laron Plains",
          city: "Maui",
          state: "Maryland",
          country: "United States",
          description: "Home of the Giants, a few feet away",
          price: 144,
          lat: 60.645238,
          lng: 2.236652
      },{
        userId: 2,
        name: "Great Lake Supreme",
        address: "949 South Blossom Trail",
        city: "Miami",
        state: "Florida",
        country: "United States",
        description: "A home with a beautiful view of Great Lake Supreme. The sunsets are beautiful, the sunrises... well to be honest I never wake up in time for those, so i'm not too sure. I tend to get pretty decent reviews! Hopefully Firebnb doesn't realize that this isn't really my home! But you may enjoy it! Don't mind the people who may or may not already be there!",
        price: 144,
        lat: 60.645238,
        lng: 2.236652
      }, {
        userId: 19,
        name: "Krusty Krab",
        address: "123 Bikini Bottom Avenue",
        city: "Bikini Bottom",
        state: "Hawaii",
        country: "United States",
        description: "Stay somewhere not at all resembling the Krusty Krab from the show on spongebob! That restaurant is a giant lobster cage, but this.. this right here is a house, and you are a person! Sorry to get your hopes up by click baiting the tile, but you will somewhat like the stay here!!!! ",
        price: 144,
        lat: 60.645238,
        lng: 2.236652
      },
  ], {});
  },
    down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    }, {});
  }
};
