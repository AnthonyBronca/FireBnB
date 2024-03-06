'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
  {
    firstName: "SpongeBob",
    lastName: "Squarepants",
    email: "spongebob@aa.io",
    username: "Spongebob",
    bio: "I'm.... READYY!!!!",
    isHost: true,
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6"
  },
  {
    firstName: "Patrick",
    lastName: "Star",
    email: "Patrick@Star.com",
    username: "PatrickStar",
    isHost: true,
    bio: "That's not my wallet.",
    hashedPassword: "$2a$10$3LIv4Lvl2vpNWiQceaGh0uabDJomSvSetIJanpEzualAkKd9Nbbmm"
  },
  {
    firstName: "Joe",
    lastName: "Smith",
    email: "Joe.Smith@demo.com",
    username: "Joe_Demo",
    bio: "I am the Demo User for Firebnb",
    isHost: true,
    hashedPassword: "$2a$10$BbTj7tSsEntCavgf/PijiO3ceAAmUiavrVcwAvP.4MXdNvSPvfrWy"
  },
  {
    firstName: "Elmer",
    lastName: "Mayert",
    email: "Elmer90@hotmail.com",
    username: "Elmer78",
    bio: "Amplitudo deleo adipisci. Aggredior suffoco degusto valeo ceno caelum. Bonus delectus contigo abstergo.",
    isHost: true,
    hashedPassword: "$2a$10$P3oLi/XC8U7tlyUk9DAWyuALyZkPUQmddQI1f6i070I4n5s13mzQq"
  },
  {
    firstName: "Florine",
    lastName: "Durgan",
    email: "Florine38@gmail.com",
    username: "Florine.Cummings",
    bio: "Necessitatibus crur celebrer accommodo rerum audacia pecus balbus coepi victus. Tolero volutabrum colo. Temperantia amaritudo solvo dicta adduco suffragium cultura comprehendo baiulus voveo.",
    isHost: false,
    hashedPassword: "$2a$10$hhajCzSwHo2O1Pm4mzdhKetsvIY/VWIYO2vYjaaPOW./rlrhbwCtO"
  },
  {
    firstName: "Alfredo",
    lastName: "Lind",
    email: "Alfredo88@hotmail.com",
    username: "Alfredo.Balistreri",
    bio: "Sustineo antea canto deputo. Animadverto appono bardus deprimo nam decet labore certe accusantium conforto. Voluptate aufero suppono vitium tergo alveus.",
    isHost: false,
    hashedPassword: "$2a$10$cSI1nzv298tkgCzyqcrB8.znlPGeSBFwUBrU/twIiDB0tS6.nbW3i"
  },
  {
    firstName: "Bo",
    lastName: "DuBuque",
    email: "Bo_DuBuque94@yahoo.com",
    username: "Bo.Keeling20",
    bio: "Vulgo ceno valens tersus. Valeo tero cilicium verbum tam hic quo vaco. Alias vulticulus cupiditas anser sophismata supra.",
    isHost: true,
    hashedPassword: "$2a$10$b8Ox28vIZcmpX3RGgqGCxuzO1dbAzBvzY/bjXs8UIcYtyRb2/dOwq"
  },
  {
    firstName: "Travon",
    lastName: "Waelchi",
    email: "Travon5@hotmail.com",
    username: "Travon.Harris43",
    bio: "Conitor solus esse casus. Umerus tepidus aestus correptius denuo civis veritatis decet socius tutis. Vicissitudo armarium conforto commemoro nulla annus amissio temporibus reprehenderit.",
    isHost: true,
    hashedPassword: "$2a$10$/3EawFB.AjsDgpHJ8/reUekxvQK.3CCYwYHska9WEBFV8RNwdUKqO"
  },
  {
    firstName: "Reuben",
    lastName: "Waelchi",
    email: "Reuben_Waelchi@yahoo.com",
    username: "Reuben25",
    bio: "Veniam libero tego tenus quo terga caste caterva cornu. Adeo cupressus articulus dedecor. Abeo sub vorago voluptatibus nihil tibi casus condico solitudo comptus.",
    isHost: true,
    hashedPassword: "$2a$10$vPnwTAC/.MFfBkD5s2SCVu3nLX/00H2p9JxmF0s0LPO0pWpKP.7VO"
  },
  {
    firstName: "Elisha",
    lastName: "Kunze",
    email: "Elisha_Kunze@hotmail.com",
    username: "Elisha.Balistreri",
    bio: "Ante crepusculum vivo solitudo casso adicio absorbeo undique arcus. Magnam videlicet spes. Amplexus spectaculum animadverto uterque cito a curtus.",
    isHost: true,
    hashedPassword: "$2a$10$JkfTz3duTpSq5LpIX/L2ceiE5usQcKjGzatUFTvWoZKiHx0owrUsK"
  },
  {
    firstName: "Cameron",
    lastName: "Hilpert",
    email: "Cameron_Hilpert@hotmail.com",
    username: "Cameron29",
    bio: "Adnuo volva video. Spes omnis solum cariosus ratione. Depulso distinctio contego ipsa pectus stabilis laboriosam vestigium volutabrum casso.",
    isHost: true,
    hashedPassword: "$2a$10$cqv9cCyJo9xa/Beeqe1BOOX5oWBhjtmu5J3CbudK0BrsKFO/6Uyq."
  },
  {
    firstName: "Hugh",
    lastName: "McDermott",
    email: "Hugh_McDermott@yahoo.com",
    username: "Hugh_Johnston85",
    bio: "Aeneus dolore deripio voluptate bellicus acies deserunt illo. Alo repellat decet conspergo vesica ullus laborum. Advenio velut amita.",
    isHost: true,
    hashedPassword: "$2a$10$QzwrTE0S4t1ZWZOUMdaJn.bkYRzIhdCPnKFHCtvPyU65Fmm9jHWUm"
  },
  {
    firstName: "Rico",
    lastName: "Swaniawski",
    email: "Rico.Swaniawski20@gmail.com",
    username: "Rico43",
    bio: "Terga quia sui. Suggero sursum curriculum utor ter caelestis cunae. Corrumpo calcar delibero depulso peior vesco delibero.",
    isHost: true,
    hashedPassword: "$2a$10$M0LdoUomKMuMdnWOxPWJs.xlReqRhPQWsUXk1iL66BnPBrzQXrb4W"
  },
  {
    firstName: "Monserrate",
    lastName: "Langworth",
    email: "Monserrate_Langworth@yahoo.com",
    username: "Monserrate.Kulas",
    bio: "Curis accusator curvo canto surgo texo tui verbum defessus. Voluptatem sto cilicium. Repudiandae facilis quaerat quibusdam ultra mollitia sursum totidem sum cernuus.",
    isHost: true,
    hashedPassword: "$2a$10$BJ.OgzUVymPEjtEJv5gDE.p7r/gThMNSz0DB9NI7DaNypdVmb.CPi"
  },
  {
    firstName: "Alysa",
    lastName: "Romaguera",
    email: "Alysa62@hotmail.com",
    username: "Alysa.Wisozk61",
    bio: "Verbera odio conduco alter cena convoco sortitus appono. Vox possimus ventus tabgo derideo crustulum conculco aggero calamitas. Coadunatio occaecati sapiente speculum.",
    isHost: true,
    hashedPassword: "$2a$10$nglWkl8R49LOXHF.o.DyC.StbcnHrNU9KYvxwJSit15ekowJQm1cK"
  },
  {
    firstName: "Belle",
    lastName: "Cummerata",
    email: "Belle.Cummerata71@yahoo.com",
    username: "Belle22",
    bio: "Libero currus terreo aranea vester atqui adiuvo. Confero depraedor verumtamen arx cum nisi natus veritas confugo capto. Sulum apparatus vado cohaero sperno mollitia.",
    isHost: false,
    hashedPassword: "$2a$10$dNJjkoU5fptMPTIBxv/J0.mOCi3GW6p3VZmNHVqQdvRnSQQFsVfcm"
  },
  {
    firstName: "Kaitlin",
    lastName: "Gulgowski",
    email: "Kaitlin.Gulgowski58@yahoo.com",
    username: "Kaitlin_Von",
    bio: "Expedita solum expedita amplus corroboro cavus defaeco amissio assentator dapifer. Sufficio catena aeternus turpis damno compono. Peccatus terra concedo tenuis summopere aeger vado adsidue impedit rerum.",
    isHost: true,
    hashedPassword: "$2a$10$SC5XATrHIRaGcY2MQa9dJebnKIJgg5QhjDH15DaRmqJdpiBPK3aWG"
  },
  {
    firstName: "Mathias",
    lastName: "Green",
    email: "Mathias_Green69@gmail.com",
    username: "Mathias52",
    bio: "Tabernus terra molestiae corporis triumphus degusto volaticus caritas. Tredecim congregatio verecundia cruciamentum. Abbas placeat labore admitto.",
    isHost: false,
    hashedPassword: "$2a$10$ErfzEnhAf9htpGqECZMP..EyRIfk94Sm/F4/8VYU.FCPD2VlAO02q"
  },
  {
    firstName: "Jefferey",
    lastName: "Mayer",
    email: "Jefferey59@hotmail.com",
    username: "Jefferey.Parker",
    bio: "Aliquam sequi spiculum verbum. Similique depopulo adficio summisse candidus ademptio. Atrocitas angustus eaque tactus supplanto.",
    isHost: false,
    hashedPassword: "$2a$10$//1F9gq7BPOsZpqw95EQvu2tVHT9QhViK4YtdhXIF7n0/qa5vTJXC"
  },
  {
    firstName: "Darion",
    lastName: "Hettinger",
    email: "Darion_Hettinger12@gmail.com",
    username: "Darion34",
    bio: "Amicitia eum adipiscor atrox vis. Cohors acervus volup decor ars absens caecus speculum. Commodo nam coerceo turbo urbs earum repudiandae adstringo hic compello.",
    isHost: true,
    hashedPassword: "$2a$10$4rgMLcbH1ArWmPkwwaawF.sFYfJmLAlGcwlNWNg8eSWRwsEClw0Wi"
  },
  {
    firstName: "Priscilla",
    lastName: "Gulgowski",
    email: "Priscilla56@hotmail.com",
    username: "Priscilla85",
    bio: "Turbo decens convoco civis alienus ducimus. Numquam caecus brevis demoror viscus suspendo comburo degusto communis dolorum. Clibanus aggero cimentarius sub cursus.",
    isHost: false,
    hashedPassword: "$2a$10$C0ygh2Qu8EVNB/w4ViOeseoGBK6/Khb85kEBuXnRjqCRmMmrxY9VK"
  },
  {
    firstName: "Ransom",
    lastName: "Kovacek",
    email: "Ransom91@hotmail.com",
    username: "Ransom_Ernser24",
    bio: "Totidem vito clam curso barba tergiversatio verecundia. Demens nobis approbo appositus aqua corpus strenuus cubitum appositus. Dolorum pel arbor turpis paens abstergo fugit alienus.",
    isHost: true,
    hashedPassword: "$2a$10$PthsGZKYIVXvMtDWEJELquWBsrXCcvzilLUwYDH.mGdNdLRnniTru"
  }
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['AnthonyB', 'Jade'] }
    }, {});
  }
};
