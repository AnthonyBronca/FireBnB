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
       address: "123 North Alpine Drive",
       city: "Orlando",
       state: "FL",
       country: "United States of America",
       description: "A cozy 1 x 1 tucked in the Alpines",
       name: "The Alpine",
       lat: 33.00202,
       lng: 33.02412,
       price: 50,
       userId: 1,
    },
    {
       address: "456 South Pine way",
       city: "Orlando",
       state: "FL",
       country: "United States of America",
       description: "A cozy 2 story tucked in the Pines",
       name: "The Pine Grove",
       lat: 33.00302,
       lng: 33.024142,
       price: 45,
       userId: 2,
    },
    {
      userId: 3,
      name: "Savanna-style home",
      address: "71963 Schiller Isle",
      city: "Fort-Lauderdale",
      state: "Oklahoma",
      country: "United States",
      description: "The owner of this home doesn't know I listed their house for Firebnb. Lol!",
      price: 59,
      lat: -168.066595,
      lng: 156.826083
    }, {
      userId: 4,
      name: "German-style home",
      address: "7536 Johnson Mall",
      city: "Mexico City",
      state: "Illinois",
      country: "United States",
      description: "This is where dreams are made of",
      price: 179,
      lat: 166.601428,
      lng: -152.616966
    }, {
      userId: 3,
      name: "3 bed 3 bath",
      address: "37312 Elenora Pines",
      city: "Miami",
      state: "California",
      country: "United States",
      description: "The place to be. One night at a time",
      price: 115,
      lat: -94.093544,
      lng: -28.29927
    }, {
      userId: 19,
      name: "3 bed 3 bath",
      address: "42158 Aileen River",
      city: "Frankfurt",
      state: "Nevada",
      country: "United States",
      description: "Teams of developers make big company moves here",
      price: 49,
      lat: -137.748808,
      lng: 26.938858
    }, {
      userId: 11,
      name: "Cocoa Beach",
      address: "919 Kutch Underpass",
      city: "Tremblayberg",
      state: "Connecticut",
      country: "United States",
      description: "City home but not in the city",
      price: 102,
      lat: -129.305781,
      lng: 53.283183
    }, {
      userId: 12,
      name: "Beach home",
      address: "2207 Abbott Streets",
      city: "Liverpool",
      state: "Alaska",
      country: "United States",
      description: "The owner of this home doesn't know I listed their house for Firebnb. Lol!",
      price: 100,
      lat: 152.989997,
      lng: -97.809971
    }, {
      userId: 12,
      name: "Beach Place views",
      address: "5159 Jana Park",
      city: "Cocoa Beach",
      state: "Alaska",
      country: "United States",
      description: "The owner of this home doesn't know I listed their house for Firebnb. Lol!",
      price: 108,
      lat: 16.766333,
      lng: -114.351417
    }, {
      userId: 21,
      name: "Surfside house",
      address: "85910 Haley Camp",
      city: "Manchester",
      state: "Alaska",
      country: "United States",
      description: "Pine watch home with palm tree views",
      price: 40,
      lat: 36.774111,
      lng: -146.355077
    }, {
      userId: 3,
      name: "Southern-style home",
      address: "39295 Wolf Meadow",
      city: "Cocoa Beach",
      state: "West Virginia",
      country: "United States",
      description: "Crypto Dish sometimes scans this place, but it is a great place to be!",
      price: 169,
      lat: -30.431026,
      lng: 175.561036
    }, {
      userId: 3,
      name: "Beach and ocean views",
      address: "369 Gusikowski Valley",
      city: "Pearl City",
      state: "Connecticut",
      country: "United States",
      description: "The owner of this home doesn't know I listed their house for Firebnb. Lol!",
      price: 119,
      lat: 32.016067,
      lng: 121.353954
    }, {
      userId: 11,
      name: "Mexican retreat",
      address: "688 Bradtke Isle",
      city: "Porto",
      state: "Pennsylvania",
      country: "United States",
      description: "Rural home that is on the edge of surbubia",
      price: 149,
      lat: 143.005415,
      lng: 3.241048
    }, {
      userId: 3,
      name: "Maui getaway",
      address: "21576 Bauch River",
      city: "Bikini Bottom",
      state: "Tennessee",
      country: "United States",
      description: "If you stay here, you must bring pizza!",
      price: 123,
      lat: -117.895666,
      lng: 112.73873
    }, {
      userId: 19,
      name: "Fort-Lauderdale Beach",
      address: "8965 Blanche Plaza",
      city: "London",
      state: "Georgia",
      country: "United States",
      description: "The nights will have fireflies, and the day will have sunkissed sun rays",
      price: 184,
      lat: 9.37876,
      lng: 47.610986
    }, {
      userId: 1,
      name: "Mountain views",
      address: "80222 Hand Trail",
      city: "Leaf Village",
      state: "Wisconsin",
      country: "United States",
      description: "Suburban home tucked away from the city",
      price: 98,
      lat: 128.364541,
      lng: -150.487783
    }, {
      userId: 2,
      name: "Cocoa Beach",
      address: "98898 Berta Mills",
      city: "Leaf Village",
      state: "Alabama",
      country: "United States",
      description: "Suburban home right next to the city",
      price: 70,
      lat: -177.803885,
      lng: 82.095658
    }, {
      userId: 3,
      name: "Central Florida getaway",
      address: "1839 Murphy Junction",
      city: "Fort Drum",
      state: "Connecticut",
      country: "United States",
      description: "Suburban home right next to the city",
      price: 44,
      lat: -12.863672,
      lng: 118.95236
    }, {
      userId: 4,
      name: "Central Florida getaway",
      address: "702 Upton Overpass",
      city: "Porto",
      state: "Alabama",
      country: "United States",
      description: "Suburban home somehow inside the city",
      price: 158,
      lat: -37.935156,
      lng: -58.394989
    }, {
      userId: 3,
      name: "Cuban-style home",
      address: "71720 Laron Plains",
      city: "Dublin",
      state: "Wisconsin",
      country: "United States",
      description: "Great place to stay when you want to get away from it all",
      price: 62,
      lat: -41.946337,
      lng: -29.062167
    }
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
