import {faker} from '@faker-js/faker';
import {User} from '../typings/seeders'
const random = require('getrandomjs');
const bcrypt = require("bcryptjs");


const bool:any = {
    0: false,
    1: true
}

const hostUsers: any = [
  {
        firstName: "Anthony",
        lastName: "bronca",
        email: 'anthony@user.io',
        username: 'AnthonyB',
        bio: "I made this site with Typescript :D",
        isHost: true,
        hashedPassword: bcrypt.hashSync('password'),
        userId: 1
      },
        {
        firstName: "Jade",
        lastName: "Grabow",
        email: 'jade@user.io',
        username: 'Jade',
        isHost: true,
        bio: "I am the most beautiful girl ever",
        hashedPassword: bcrypt.hashSync('password2'),
        userId: 2
      },
      {
        firstName: "Joe",
        lastName: "Smith",
        email: 'Joe.Smith@demo.com',
        username: 'Joe_Demo',
        bio: "I made this site with Typescript :D",
        isHost: true,
        hashedPassword: bcrypt.hashSync('StrongDemoPassword!'),
        userId: 3
      },

];

const makeUsers = (): User[] => {
    const usersArr:User[] = [
          {
        firstName: "Anthony",
        lastName: "bronca",
        email: 'anthony@user.io',
        username: 'AnthonyB',
        bio: "I made this site with Typescript :D",
        isHost: true,
        hashedPassword: bcrypt.hashSync('password'),
      },
        {
        firstName: "Jade",
        lastName: "Grabow",
        email: 'jade@user.io',
        username: 'Jade',
        isHost: true,
        bio: "I am the most beautiful girl ever",
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        firstName: "Joe",
        lastName: "Smith",
        email: 'Joe.Smith@demo.com',
        username: 'Joe_Demo',
        bio: "I am the Demo User for Firebnb",
        isHost: true,
        hashedPassword: bcrypt.hashSync('StrongDemoPassword!'),
      },
    ]


    for(let i = 4; i < 23; i++){
        let user:User= {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            bio: '',
            isHost: false,
            hashedPassword: ''
        };
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email({firstName: user.firstName, lastName: user.lastName});
        user.username = faker.internet.displayName({firstName: user.firstName})
        user.bio = faker.lorem.sentences(3);
        user.isHost = bool[`${random(0,1)}`]
        user.hashedPassword = bcrypt.hashSync(faker.internet.password({length: 10}));
        usersArr.push(user);
        if(user.isHost){
            let hostUser = {...user, userId: i}
            hostUsers.push(hostUser)
        };
    }
    return usersArr;
}

// const seedUsers = makeUsers();

const hosts = [
  {
    firstName: "Anthony",
    lastName: "bronca",
    email: "anthony@user.io",
    username: "AnthonyB",
    bio: "I made this site with Typescript :D",
    isHost: true,
    hashedPassword: "$2a$10$EAMF.0C1mhgsOuULz02Q3.vRu.4m6PiyrFKjCduUF4GMOqkgDQ7dq",
    userId: 1
  }, {
    firstName: "Jade",
    lastName: "Grabow",
    email: "jade@user.io",
    username: "Jade",
    isHost: true,
    bio: "I am the most beautiful girl ever",
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

const users = [
  {
    firstName: "Anthony",
    lastName: "bronca",
    email: "anthony@user.io",
    username: "AnthonyB",
    bio: "I made this site with Typescript :D",
    isHost: true,
    hashedPassword: "$2a$10$wht6vvXoQmKpBj/s6C345.xE.ouNZ/VgRQhVVBFEhwG.2A0xAx78K"
  },
  {
    firstName: "Jade",
    lastName: "Grabow",
    email: "jade@user.io",
    username: "Jade",
    isHost: true,
    bio: "I am the most beautiful girl ever",
    hashedPassword: "$2a$10$mGkfon03VuOJ3.3lFnE26uMyyRJ.Z31zf4Vvcfcb9WIW3mEqeJEN6"
  },
  {
    firstName: "Joe",
    lastName: "Smith",
    email: "Joe.Smith@demo.com",
    username: "Joe_Demo",
    bio: "I am the Demo User for Firebnb",
    isHost: true,
    hashedPassword: "$2a$10$9XaOFOhGkIF6KuOKCaNpl.TLMMErrQips4oa/ZhRON4ocuGK8J41G"
  },
  {
    firstName: "Berta",
    lastName: "Hintz",
    email: "Berta76@hotmail.com",
    username: "Berta_Boehm29",
    bio: "Debitis vix pauci error careo accendo. Aperio verbum varius cibo patrocinor denuncio tardus artificiose ver. Vulariter appositus tempus bis valde verbera conatus.",
    isHost: true,
    hashedPassword: "$2a$10$CEohrGd3gOlr6EtVHqaKE.pUKQfbfakReHJ0QbdWn6qwZ/D2VA5Z."
  },
  {
    firstName: "Bertrand",
    lastName: "Spinka",
    email: "Bertrand.Spinka7@yahoo.com",
    username: "Bertrand_Hilpert",
    bio: "Cras demergo ago amaritudo umerus supplanto. Tui tersus illum antepono. Comparo inventore desolo argumentum tersus qui canis aggero cedo.",
    isHost: true,
    hashedPassword: "$2a$10$PJ32/C8RZHjgYl6wErzHx.UcOYiRzZzgk5fO4d.BVfGO/RCvPyG.S"
  },
  {
    firstName: "Amiya",
    lastName: "Douglas",
    email: "Amiya84@gmail.com",
    username: "Amiya89",
    bio: "Et coma laudantium depraedor corrumpo conor umquam eos quia aedificium. Id bellum surculus absconditus aggredior callide saepe votum sunt commemoro. Anser sed colo adulatio baiulus correptius sodalitas soluta provident.",
    isHost: false,
    hashedPassword: "$2a$10$KIzw3D52.DywvEaChxKNWezF66H0BUR9X0jGS5NPlFAM.dZelK.Em"
  },
  {
    firstName: "Sherman",
    lastName: "Roberts",
    email: "Sherman97@hotmail.com",
    username: "Sherman_Gorczany44",
    bio: "Ad coaegresco trado surculus balbus. Tabula suffoco cresco strenuus addo. Eaque calamitas audentia tabesco illo bellum suadeo.",
    isHost: false,
    hashedPassword: "$2a$10$NzPks5fXOSKB/s78qZVc3.COZGaJlMt3e9HBGwVM91DhpB/pxaJni"
  },
  {
    firstName: "Triston",
    lastName: "Ebert",
    email: "Triston_Ebert30@yahoo.com",
    username: "Triston.OHara69",
    bio: "Cunabula arbustum casso verus vulgivagus desidero sint defetiscor. Tutamen corrupti laboriosam chirographum. Verumtamen avaritia sublime a tam consequatur trepide crudelis antepono.",
    isHost: false,
    hashedPassword: "$2a$10$KvOEbGvab3ajn32mfj/3nuF6hLhnNeShlz3t5w.a6DdW94Holcfse"
  },
  {
    firstName: "Arthur",
    lastName: "Abernathy",
    email: "Arthur.Abernathy15@gmail.com",
    username: "Arthur.Zemlak79",
    bio: "Voluptatibus vicissitudo usitas dedico. Vae absque varietas vado sperno trans. Autus venio cedo illum conitor angustus casus.",
    isHost: false,
    hashedPassword: "$2a$10$agwBWe7EibPL.T4dpIV0Iu8BBtmc7tR9MCJM6nZQ0y7/5wS3g09Ty"
  },
  {
    firstName: "Kaleigh",
    lastName: "Dach-Breitenberg",
    email: "Kaleigh.Dach-Breitenberg19@gmail.com",
    username: "Kaleigh12",
    bio: "Abbas sophismata necessitatibus arcus delicate appono. Volo amplitudo odio sunt coma vis consequuntur canonicus culpo. Suasoria magnam eos.",
    isHost: false,
    hashedPassword: "$2a$10$MQtjMiON3jKu3gMQkrDKY.AcuyfYSVCny1yInFt9AZqzgWK4fokXy"
  },
  {
    firstName: "Eleanora",
    lastName: "Wiegand",
    email: "Eleanora11@gmail.com",
    username: "Eleanora_Mann",
    bio: "Admoneo quis deripio thermae volup ventus terror arca. Voro degenero molestiae. Calamitas theca aufero vigilo curriculum.",
    isHost: true,
    hashedPassword: "$2a$10$E9//xxj0RJLb/h.OnjkT/O..6MITugtvNsL00t9EdN9YONuE3TuKm"
  },
  {
    firstName: "Tom",
    lastName: "Morar",
    email: "Tom.Morar83@yahoo.com",
    username: "Tom.Buckridge",
    bio: "Laborum appono vinum sono adaugeo sollers repudiandae laboriosam bene urbanus. Tricesimus autus titulus patria quod. Debeo thalassinus ceno aspernatur vos adulatio currus vigor vitiosus.",
    isHost: true,
    hashedPassword: "$2a$10$6DRfjGET.rYz.EyoTuqGfehJJUspZrLKY0FMUXBvtpxU.cFiLk4Ga"
  },
  {
    firstName: "Bertrand",
    lastName: "Marquardt",
    email: "Bertrand84@gmail.com",
    username: "Bertrand_Feeney21",
    bio: "Defaeco ea cito versus aveho. Itaque curis cultura neque calculus demum. Conservo incidunt coadunatio.",
    isHost: false,
    hashedPassword: "$2a$10$35zIfBCmjIZM/ikDYmTWmOVQ7IC4hhSrscHtnhQd.xaz.31gcJK2."
  },
  {
    firstName: "Freeman",
    lastName: "Mann",
    email: "Freeman.Mann76@hotmail.com",
    username: "Freeman_Howe47",
    bio: "Crepusculum cibo amplexus coerceo. Corporis nostrum occaecati. Cedo creator conscendo venustas tergiversatio provident comparo quidem sodalitas vicinus.",
    isHost: false,
    hashedPassword: "$2a$10$51gmlrRLSARsUlcrIOfBkuYRxHpuu.Nhh1YGvwgMn75N7r5CmsKOO"
  },
  {
    firstName: "Minerva",
    lastName: "Lang",
    email: "Minerva32@gmail.com",
    username: "Minerva.Runte88",
    bio: "Beatae aveho aiunt conduco demoror. Combibo spes auditor pel absorbeo summisse atrox concedo. Pauper convoco cometes cibus animi coerceo.",
    isHost: false,
    hashedPassword: "$2a$10$EiPYryUVSsmVTg9VG08vhuHvmRSfrnyR9UO/Buu0MHBMKyPtAhvSK"
  },
  {
    firstName: "Priscilla",
    lastName: "Kutch",
    email: "Priscilla_Kutch@yahoo.com",
    username: "Priscilla_Balistreri",
    bio: "Video bellum sto ulterius facere crepusculum arbor rem. Sperno trans ullam nihil tricesimus animi cras hic. Magni audentia barba tener candidus molestiae aveho sustineo.",
    isHost: false,
    hashedPassword: "$2a$10$J7tEtsZRE3g/62NMFXSRiebzQTzeb89D5R6k4EOtRDaLmLTH0Plz2"
  },
  {
    firstName: "Ethan",
    lastName: "Larkin-Bechtelar",
    email: "Ethan71@gmail.com",
    username: "Ethan_Collins59",
    bio: "Earum ut aer ventito tutis. Amplexus curo rem cometes amicitia appono. Defluo cruentus comptus delicate cogo ustulo astrum curvo.",
    isHost: false,
    hashedPassword: "$2a$10$G.4XsZghwHq4alEjvovUDOueOfO2z3YEnR.ZAMkx9F20oXH9JgToe"
  },
  {
    firstName: "Lucius",
    lastName: "Waters",
    email: "Lucius_Waters@hotmail.com",
    username: "Lucius.Lind7",
    bio: "Absum amicitia adsidue thesaurus harum. Timidus conforto ipsum usitas bonus perspiciatis aequus. Statua rem et aggero defendo casso.",
    isHost: true,
    hashedPassword: "$2a$10$mdXpFOXOMRmf4M.ZlaW/iOATFhq2dMuiYIuZ81Nr4FRXcEZVx8HKa"
  },
  {
    firstName: "Assunta",
    lastName: "Langworth",
    email: "Assunta.Langworth36@yahoo.com",
    username: "Assunta.Treutel14",
    bio: "Denuo votum cauda molestias casus auctus colligo deserunt confugo. Deporto trepide usus vulnero porro tamdiu contabesco peior vulnus titulus. Vilitas thesis delectus cernuus patria adhuc vorax vito atqui.",
    isHost: true,
    hashedPassword: "$2a$10$EdgbIr.Fvq.n0gdinHW8IOGGN6B.qeeNses5uZRzUDd5aNZ3YIjKO"
  },
  {
    firstName: "Mireya",
    lastName: "Rodriguez",
    email: "Mireya_Rodriguez@yahoo.com",
    username: "Mireya_Purdy90",
    bio: "Vorax votum alius aliquid argumentum. Tersus avaritia commemoro tamen absconditus decumbo. Delicate defleo ipsam.",
    isHost: false,
    hashedPassword: "$2a$10$Yht7rYoBaICubEkeN0dDGugjwvShzTn7o4wviWbyYbf.mgG.j70VO"
  },
  {
    firstName: "Isobel",
    lastName: "Zieme",
    email: "Isobel_Zieme@yahoo.com",
    username: "Isobel.Fay",
    bio: "Deduco debeo antiquus vester saepe veniam tamen victoria. Sodalitas confugo solus aeternus. Centum studio cognomen esse temptatio arto veritas virga.",
    isHost: true,
    hashedPassword: "$2a$10$SzNBQVd9Rd6B4Iv5ULO4Re1ppPAT5I1BMrbeSh0DB/tul1fVYEf6O"
  },
  {
    firstName: "Sydni",
    lastName: "Grant",
    email: "Sydni_Grant86@yahoo.com",
    username: "Sydni.OReilly82",
    bio: "Porro enim solium totam adeo teneo victoria. Adficio aegrotatio avarus velut vulariter. Accusamus dolores depopulo defungo.",
    isHost: true,
    hashedPassword: "$2a$10$EpmUekby3k87HmOhdS6vtOg1qL04b4YqLBgsC8KexhpVa518x5Obu"
  }
]

export {users, hosts}
