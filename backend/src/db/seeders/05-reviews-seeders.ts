'use strict';

import { OptionsInterface } from "../../typings/seeders";
// import seederReviews from "../../utils/reviewSeeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
         {
            userId: 1,
            spotId: 2,
            stars: 5,
            review: "This place was amazing!"
         },
           {
            userId: 2,
            spotId: 1,
            stars: 4,
            review: "This place was pretty good!"
         },
  {
    userId: 3,
    spotId: 1,
    stars: 3,
    review: "Sto aeternus voluptate statua vita conduco comburo eum vetus coadunatio."
  },
  {
    userId: 2,
    spotId: 1,
    stars: 2,
    review: "Tollo catena laborum tutis thermae demulceo approbo solutio trans eveniet."
  },
  {
    userId: 1,
    spotId: 1,
    stars: 1,
    review: "Quod adulescens tempora quia spectaculum speculum."
  }, {
    userId: 1,
    spotId: 1,
    stars: 1,
    review: "Denuo vix atque solvo desolo adsuesco."
  }, {
    userId: 3,
    spotId: 1,
    stars: 1,
    review: "Delego error adicio aptus libero strenuus recusandae."
  }, {
    userId: 2,
    spotId: 1,
    stars: 2,
    review: "Hic facere urbs sublime adficio adipiscor amplitudo curtus sursum."
  }, {
    userId: 1,
    spotId: 2,
    stars: 3,
    review: "Voro somnus veritas dolorum alias corrupti speculum dolorum."
  }, {
    userId: 1,
    spotId: 2,
    stars: 2,
    review: "Commemoro cresco audeo statua colo."
  }, {
    userId: 2,
    spotId: 2,
    stars: 2,
    review: "Currus turbo dedico valeo clementia clarus villa quasi."
  }, {
    userId: 3,
    spotId: 2,
    stars: 1,
    review: "Delibero sufficio canto cura aestas consuasor angustus umerus."
  }, {
    userId: 2,
    spotId: 2,
    stars: 3,
    review: "Aranea tergo crepusculum patior ustulo cimentarius socius tergum."
  }, {
    userId: 1,
    spotId: 2,
    stars: 2,
    review: "Bellum velum earum placeat arbor sto compono acsi similique qui."
  }, {
    userId: 2,
    spotId: 3,
    stars: 3,
    review: "Deleo adversus caterva cado desidero tolero carmen."
  }, {
    userId: 1,
    spotId: 3,
    stars: 2,
    review: "Voro bis deleniti ait."
  }, {
    userId: 1,
    spotId: 3,
    stars: 3,
    review: "Canto alii ultio barba volaticus deinde pel aeger."
  }, {
    userId: 3,
    spotId: 3,
    stars: 2,
    review: "Cariosus adaugeo pecus theologus aro officia labore pel nostrum."
  }, {
    userId: 3,
    spotId: 3,
    stars: 1,
    review: "Eligendi viduo suasoria culpo vetus admiratio utilis vigor apud."
  }, {
    userId: 2,
    spotId: 3,
    stars: 1,
    review: "Itaque maxime thymbra vae dolores vereor vapulus abstergo deficio desparatus."
  },
  {
    userId: 1,
    spotId: 4,
    stars: 1,
    review: "Acervus vigor aureus pecco dolores coma."
  }, {
    userId: 3,
    spotId: 4,
    stars: 2,
    review: "Pariatur cerno casus cavus aufero volaticus comedo sumptus."
  }, {
    userId: 1,
    spotId: 4,
    stars: 3,
    review: "Delego armarium amiculum stabilis sollicito surculus depereo clamo centum admitto."
  },
  {
    userId: 1,
    spotId: 4,
    stars: 3,
    review: "Appello valeo amor ceno fuga pecus deripio victoria absorbeo attonbitus."
  },
  {
    userId: 3,
    spotId: 4,
    stars: 2,
    review: "Vesper cui corroboro eveniet blanditiis magnam perspiciatis vita."
  }, {
    userId: 1,
    spotId: 4,
    stars: 3,
    review: "Aro caries doloribus tamdiu suffragium solium decumbo."
  }, {
    userId: 2,
    spotId: 5,
    stars: 1,
    review: "Totidem subnecto iusto caelum caute."
  }, {
    userId: 2,
    spotId: 5,
    stars: 3,
    review: "Curriculum curis id."
  }, {
    userId: 2,
    spotId: 5,
    stars: 1,
    review: "Explicabo tenetur solus assumenda tamen talio defendo comptus."
  }, {
    userId: 2,
    spotId: 5,
    stars: 2,
    review: "Dedecor animus cedo cursus coniuratio admiratio."
  }, {
    userId: 3,
    spotId: 5,
    stars: 1,
    review: "Odit terror torqueo vado."
  }, {
    userId: 3,
    spotId: 5,
    stars: 3,
    review: "Vae aliquid cornu thesaurus."
  }, {
    userId: 1,
    spotId: 6,
    stars: 3,
    review: "Veniam surculus officia modi coma cibo accusamus paens natus surculus."
  },
  {
    userId: 1,
    spotId: 6,
    stars: 1,
    review: "Carcer depopulo tamquam."
  }, {
    userId: 3,
    spotId: 6,
    stars: 3,
    review: "Accusamus bene vix antepono suadeo amissio absens."
  }, {
    userId: 2,
    spotId: 6,
    stars: 1,
    review: "Ocer argentum succedo."
  }, {
    userId: 3,
    spotId: 6,
    stars: 3,
    review: "Ustilo vitae vindico complectus."
  }, {
    userId: 2,
    spotId: 6,
    stars: 3,
    review: "Toties amplexus sint."
  }, {
    userId: 2,
    spotId: 7,
    stars: 3,
    review: "Depono fugiat perspiciatis coaegresco."
  }, {
    userId: 3,
    spotId: 7,
    stars: 2,
    review: "Illum adnuo vapulus auctor ante anser terra adinventitias."
  }, {
    userId: 2,
    spotId: 7,
    stars: 1,
    review: "Copiose usque collum viridis ad creber sophismata."
  }, {
    userId: 1,
    spotId: 7,
    stars: 2,
    review: "Auditor talio deserunt articulus conculco basium amaritudo doloremque sophismata."
  },
  {
    userId: 3,
    spotId: 7,
    stars: 2,
    review: "Catena nulla repudiandae."
  }, {
    userId: 1,
    spotId: 7,
    stars: 1,
    review: "Damno admiratio ars pauci suppellex caelum accusantium cena aranea."
  }, {
    userId: 1,
    spotId: 8,
    stars: 2,
    review: "Nemo summisse abundans utique pax."
  }, {
    userId: 3,
    spotId: 8,
    stars: 1,
    review: "Cedo pauci adeptio inflammatio certe summisse admitto abstergo tredecim esse."
  },
  {
    userId: 1,
    spotId: 8,
    stars: 2,
    review: "Adfero sperno paulatim."
  }, {
    userId: 3,
    spotId: 8,
    stars: 1,
    review: "Coadunatio ultra adopto vulgivagus varietas campana ater totam dolorum."
  },
  {
    userId: 1,
    spotId: 8,
    stars: 2,
    review: "Tubineus vox vinculum."
  }, {
    userId: 3,
    spotId: 8,
    stars: 2,
    review: "Denuo molestiae solvo defendo absque."
  }, {
    userId: 1,
    spotId: 9,
    stars: 2,
    review: "Bos volva abstergo repellendus turbo argentum."
  }, {
    userId: 2,
    spotId: 9,
    stars: 2,
    review: "Suffoco deprimo dedico ago sophismata asper benevolentia conventus stipes aeneus."
  },
  {
    userId: 3,
    spotId: 9,
    stars: 2,
    review: "Vis demonstro cito suppellex confero appositus aestivus desino."
  }, {
    userId: 3,
    spotId: 9,
    stars: 1,
    review: "Universe beneficium derideo conicio subnecto capitulus vulpes."
  }, {
    userId: 1,
    spotId: 9,
    stars: 1,
    review: "Trado tersus pecus."
  }, {
    userId: 3,
    spotId: 9,
    stars: 3,
    review: "Desparatus strues accedo."
  }, {
    userId: 3,
    spotId: 10,
    stars: 1,
    review: "Cursus sapiente utor pecco articulus curatio comprehendo sapiente quod crux."
  },
  {
    userId: 3,
    spotId: 10,
    stars: 3,
    review: "Solitudo culpa fugiat vergo ter subvenio."
  }, {
    userId: 1,
    spotId: 10,
    stars: 1,
    review: "Adfero claustrum enim crustulum ago debilito."
  }, {
    userId: 2,
    spotId: 10,
    stars: 3,
    review: "Enim super dedico dolor."
  }, {
    userId: 2,
    spotId: 10,
    stars: 2,
    review: "Eos crepusculum demulceo pectus super timidus vos doloribus substantia adamo."
  },
  {
    userId: 1,
    spotId: 10,
    stars: 3,
    review: "Deorsum illo abbas decet."
  }, {
    userId: 2,
    spotId: 11,
    stars: 1,
    review: "Alii velut condico vociferor arto usque."
  }, {
    userId: 3,
    spotId: 11,
    stars: 1,
    review: "Utor culpa bis sortitus desparatus vomer caelestis cupiditas caute saepe."
  },
  {
    userId: 3,
    spotId: 11,
    stars: 1,
    review: "Surgo uterque cubicularis neque tumultus territo temperantia."
  }, {
    userId: 1,
    spotId: 11,
    stars: 1,
    review: "Quidem basium terra tantum admoveo."
  }, {
    userId: 1,
    spotId: 11,
    stars: 3,
    review: "Votum summisse vae eaque aer ventito temperantia tamen tenuis."
  }, {
    userId: 2,
    spotId: 11,
    stars: 3,
    review: "Verecundia tersus antea cotidie capillus."
  }, {
    userId: 2,
    spotId: 12,
    stars: 2,
    review: "Culpa coma usitas adicio cubo."
  }, {
    userId: 2,
    spotId: 12,
    stars: 3,
    review: "Brevis apto minus tabesco alter."
  }, {
    userId: 1,
    spotId: 12,
    stars: 3,
    review: "Cauda nisi suppono strenuus vulticulus stultus anser amor soleo aperte."
  },
  {
    userId: 3,
    spotId: 12,
    stars: 3,
    review: "Dedico tui suadeo supra."
  }, {
    userId: 2,
    spotId: 12,
    stars: 3,
    review: "Causa suffragium color ulciscor."
  }, {
    userId: 3,
    spotId: 12,
    stars: 2,
    review: "Corrupti curiositas usque verecundia atrox cunae."
  }, {
    userId: 2,
    spotId: 13,
    stars: 1,
    review: "Temptatio carmen cohaero amet patruus auctus delego ipsam nesciunt ulciscor."
  },
  {
    userId: 3,
    spotId: 13,
    stars: 1,
    review: "Stella corrumpo blandior debitis defetiscor clarus testimonium verus audacia."
  },
  {
    userId: 1,
    spotId: 13,
    stars: 2,
    review: "Accusamus ea ipsa aperio."
  }, {
    userId: 3,
    spotId: 13,
    stars: 2,
    review: "Possimus universe victoria ter creptio bibo."
  }, {
    userId: 3,
    spotId: 13,
    stars: 1,
    review: "Amor dedecor agnitio."
  }, {
    userId: 3,
    spotId: 13,
    stars: 3,
    review: "Solvo decens stabilis desino excepturi bonus usque coruscus cras quae."
  },
  {
    userId: 1,
    spotId: 14,
    stars: 3,
    review: "Ullus solitudo vulnus caute deduco argumentum acervus timidus temptatio dicta."
  },
  {
    userId: 3,
    spotId: 14,
    stars: 1,
    review: "Aequus ea dolorem arca approbo."
  }, {
    userId: 3,
    spotId: 14,
    stars: 3,
    review: "Laborum vilis cunae clibanus."
  }, {
    userId: 3,
    spotId: 14,
    stars: 3,
    review: "Tantillus adficio speciosus vesper provident theca aeternus trucido patrocinor compono."
  },
  {
    userId: 2,
    spotId: 14,
    stars: 3,
    review: "Balbus adfectus vilicus vere."
  }, {
    userId: 3,
    spotId: 14,
    stars: 2,
    review: "Spiritus collum deripio utilis ait vesper terga combibo succedo."
  }, {
    userId: 3,
    spotId: 15,
    stars: 3,
    review: "Culpo vulnero casso coerceo defessus paens."
  }, {
    userId: 3,
    spotId: 15,
    stars: 3,
    review: "Sub harum vespillo."
  }, {
    userId: 2,
    spotId: 15,
    stars: 3,
    review: "Cunae stillicidium coruscus adficio contra tracto corpus harum."
  }, {
    userId: 2,
    spotId: 15,
    stars: 2,
    review: "Paulatim appono recusandae textus sequi causa arcus comprehendo."
  }, {
    userId: 1,
    spotId: 15,
    stars: 2,
    review: "Ad aperte somnus."
  }, {
    userId: 3,
    spotId: 15,
    stars: 2,
    review: "Blanditiis animadverto tolero a consequuntur tui."
  }
    ], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
        {
    }, {});
  }
};
