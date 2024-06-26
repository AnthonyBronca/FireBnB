
const random = require('getrandomjs')
import fakeDescriptions from "./fakeDescriptions"

interface Spot {
    userId: number,
    name: string,
    address: string,
    city: string,
    state: string,
    country: string,
    description: string,
    price: number,
    lat: number,
    lng: number,
};

const hosts = [
  {
    firstName: "Anthony",
    lastName: "Bronca",
    email: "anthony@user.io",
    username: "AnthonyB",
    bio: "I made this site with Typescript :D",
    isHost: true,
    hashedPassword: "$2a$10$EAMF.0C1mhgsOuULz02Q3.vRu.4m6PiyrFKjCduUF4GMOqkgDQ7dq",
    userId: 1
  }, {
    firstName: "Athena",
    lastName: "Kudasai",
    email: "Athena@user.io",
    username: "Athena",
    isHost: true,
    bio: "The Twin Broadsides is the best",
    hashedPassword: "$2a$10$7rk2xcHBeV7TKkVNfuMTduelvsW.qdeotxxy1ZYLf8r/oI3IvXu6y",
    userId: 2
  }, {
    firstName: "Joe",
    lastName: "Smith",
    email: "Joe.Smith@demo.com",
    username: "Joe_Demo",
    bio: "I made this site with Typescript :D",
    isHost: true,
    hashedPassword: "$2a$10$Jpoa38dCetj9VgoJuk7tDOdPE2DjnEDElaMiv8rW/eeeCRb8cWNoy",
    userId: 3
  }, {
    firstName: "Berta",
    lastName: "Hintz",
    email: "Berta76@hotmail.com",
    username: "Berta_Boehm29",
    bio: "Debitis vix pauci error careo accendo. Aperio verbum varius cibo patrocinor denuncio tardus artificiose ver. Vulariter appositus tempus bis valde verbera conatus.",
    isHost: true,
    hashedPassword: "$2a$10$CEohrGd3gOlr6EtVHqaKE.pUKQfbfakReHJ0QbdWn6qwZ/D2VA5Z.",
    userId: 4
  }, {
    firstName: "Bertrand",
    lastName: "Spinka",
    email: "Bertrand.Spinka7@yahoo.com",
    username: "Bertrand_Hilpert",
    bio: "Cras demergo ago amaritudo umerus supplanto. Tui tersus illum antepono. Comparo inventore desolo argumentum tersus qui canis aggero cedo.",
    isHost: true,
    hashedPassword: "$2a$10$PJ32/C8RZHjgYl6wErzHx.UcOYiRzZzgk5fO4d.BVfGO/RCvPyG.S",
    userId: 5
  }, {
    firstName: "Eleanora",
    lastName: "Wiegand",
    email: "Eleanora11@gmail.com",
    username: "Eleanora_Mann",
    bio: "Admoneo quis deripio thermae volup ventus terror arca. Voro degenero molestiae. Calamitas theca aufero vigilo curriculum.",
    isHost: true,
    hashedPassword: "$2a$10$E9//xxj0RJLb/h.OnjkT/O..6MITugtvNsL00t9EdN9YONuE3TuKm",
    userId: 11
  }, {
    firstName: "Tom",
    lastName: "Morar",
    email: "Tom.Morar83@yahoo.com",
    username: "Tom.Buckridge",
    bio: "Laborum appono vinum sono adaugeo sollers repudiandae laboriosam bene urbanus. Tricesimus autus titulus patria quod. Debeo thalassinus ceno aspernatur vos adulatio currus vigor vitiosus.",
    isHost: true,
    hashedPassword: "$2a$10$6DRfjGET.rYz.EyoTuqGfehJJUspZrLKY0FMUXBvtpxU.cFiLk4Ga",
    userId: 12
  }, {
    firstName: "Lucius",
    lastName: "Waters",
    email: "Lucius_Waters@hotmail.com",
    username: "Lucius.Lind7",
    bio: "Absum amicitia adsidue thesaurus harum. Timidus conforto ipsum usitas bonus perspiciatis aequus. Statua rem et aggero defendo casso.",
    isHost: true,
    hashedPassword: "$2a$10$mdXpFOXOMRmf4M.ZlaW/iOATFhq2dMuiYIuZ81Nr4FRXcEZVx8HKa",
    userId: 18
  }, {
    firstName: "Assunta",
    lastName: "Langworth",
    email: "Assunta.Langworth36@yahoo.com",
    username: "Assunta.Treutel14",
    bio: "Denuo votum cauda molestias casus auctus colligo deserunt confugo. Deporto trepide usus vulnero porro tamdiu contabesco peior vulnus titulus. Vilitas thesis delectus cernuus patria adhuc vorax vito atqui.",
    isHost: true,
    hashedPassword: "$2a$10$EdgbIr.Fvq.n0gdinHW8IOGGN6B.qeeNses5uZRzUDd5aNZ3YIjKO",
    userId: 19
  }, {
    firstName: "Isobel",
    lastName: "Zieme",
    email: "Isobel_Zieme@yahoo.com",
    username: "Isobel.Fay",
    bio: "Deduco debeo antiquus vester saepe veniam tamen victoria. Sodalitas confugo solus aeternus. Centum studio cognomen esse temptatio arto veritas virga.",
    isHost: true,
    hashedPassword: "$2a$10$SzNBQVd9Rd6B4Iv5ULO4Re1ppPAT5I1BMrbeSh0DB/tul1fVYEf6O",
    userId: 21
  }, {
    firstName: "Sydni",
    lastName: "Grant",
    email: "Sydni_Grant86@yahoo.com",
    username: "Sydni.OReilly82",
    bio: "Porro enim solium totam adeo teneo victoria. Adficio aegrotatio avarus velut vulariter. Accusamus dolores depopulo defungo.",
    isHost: true,
    hashedPassword: "$2a$10$EpmUekby3k87HmOhdS6vtOg1qL04b4YqLBgsC8KexhpVa518x5Obu",
    userId: 22
  }
]

const propertyNames = [
    "Cozy 4 Bedroom",
    "3 bed 3 bath",
    "Nightly Cottage",
    "Beautiful Luxuary mansion",
    "Lake views",
    "Lake and pool views",
    "Beach views",
    "Beach and ocean views",
    "Fort-Lauderdale Beach",
    "Beach Place views",
    "Mountain views",
    "Downtown home",
    "Quiet suburban retreat",
    "Quiet rural retreat",
    "Home away from home",
    "Timeshare condo",
    "Palm Tree stay",
    "World's Most Famous Beach House",
    "Cocoa Beach",
    "Satellite Beach",
    "Disney Firework views",
    "Hawaiian retreat",
    "Surfside house",
    "Hike Trail home",
    "European-style home",
    "Japanese-style home",
    "Savanna-style home",
    "Southern-style home",
    "American-dream home",
    "Great Outdoors home",
    "Beach home",
    "Kid-free resort",
    "Personal resort",
    "Vacation resort",
    "Small family-friendly house",
    "Central Florida getaway",
    "Colorado getaway",
    "Maui getaway",
    "Mexican-style home",
    "Mexican retreat",
    "Cuban-style home",
    "Cuban retreat",
    "German-style home",
    "German retreat",
    "Cozy German Cottage",
    "Irish-style home",
    "Irish-style cottage",
    "Irish getaway",
    "Italian springs home",
    "Italian getaway",
    "Canal view",
    "Laid-back home",
    "Corporate retreat home",
    "Finance St. View",
    "Wall St. on Elms St. View"
];

const fakeAddresses = [
    "71963 Schiller Isle",
    "7536 Johnson Mall",
    "37312 Elenora Pines",
    "42158 Aileen River",
    "919 Kutch Underpass",
    "2207 Abbott Streets",
    "5159 Jana Park",
    "85910 Haley Camp",
    "39295 Wolf Meadow",
    "369 Gusikowski Valley",
    "688 Bradtke Isle",
    "21576 Bauch River",
    "8965 Blanche Plaza",
    "80222 Hand Trail",
    "98898 Berta Mills",
    "1839 Murphy Junction",
    "702 Upton Overpass",
    "71720 Laron Plains"
];

const fakeCities = [
    "Orlando",
    "Lake Erica",
    "Koelpinstead",
    "Redondo Beach",
    "Pearl City",
    "Bikini Bottom",
    "Tremblayberg",
    "Nessi",
    "Sparks",
    "Boylefurt",
    "Frankfurt",
    "New York",
    "Los Angles",
    "Port Arturo",
    "Moenbury",
    "Loweville",
    "Louis Ville",
    "Boulder",
    "Maui",
    "Miami",
    "Fort-Lauderdale",
    "Lake Maraside",
    "Pitsburgh",
    "Fort Ellie",
    "Fort Drum",
    "Madrid",
    "Barcelona",
    "Porto",
    "Manchester",
    "Liverpool",
    "Tokyo",
    "Leaf Village",
    "Kawasaki",
    "Mexico City",
    "Dublin",
    "London",
    "San Francisco",
    "Rino",
    "Springfield",
    "Chicago",
    "Tampa",
    "Cocoa Beach",
    "Daytona",
];

const fakeStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
];


function getRandomInRange(from:number, to:number, fixed:number) {
    return Number((Math.random() * (to - from) + from).toFixed(fixed));
}

const generateSpotSeeders = () => {
    let spotArr: Spot[] = [];

    for (let i = 0; i <= 22; i++) {
        let spot = {
            userId: random(hosts).userId,
            name: random(propertyNames),
            address: fakeAddresses[i],
            city: random(fakeCities),
            state: random(fakeStates),
            country: "United States",
            description: random(fakeDescriptions),
            price: random(20, 200),
            lat: getRandomInRange(-180, 180, 6),
            lng: getRandomInRange(-180, 180, 6),
        };
        spotArr.push(spot);
      }
    return spotArr;
};


generateSpotSeeders()

export default generateSpotSeeders;
