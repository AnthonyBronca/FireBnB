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
    userId: 2,
    spotId: 1,
    stars: 1,
    review: "Tenetur uterque arto. Amor atqui depono. Thorax centum demonstro tres."
  },
  {
    userId: 2,
    spotId: 1,
    stars: 2,
    review: "Tabernus rem adopto eius concedo. Tristis vesper absens creator carcer illo volva. Commemoro carmen aiunt vulariter. Molestiae caries carpo valeo comminor."
  },
  {
    userId: 1,
    spotId: 1,
    stars: 1,
    review: "Umbra deserunt collum repellendus. Tergo vito considero quas."
  }, {
    userId: 3,
    spotId: 1,
    stars: 3,
    review: "Doloremque celo vetus viduo soluta. Colo cur conscendo tribuo damnatio causa spargo contra sponte placeat. Tempora repudiandae arcesso aestus sequi magnam. Virtus odit nobis subseco sponte iste vulgo stultus deleniti patrocinor."
  },
  {
    userId: 3,
    spotId: 1,
    stars: 2,
    review: "Facilis cinis ara vesper adflicto suspendo bibo vapulus constans dolorum."
  },
  {
    userId: 3,
    spotId: 1,
    stars: 3,
    review: "Autus accendo audacia vilis tamdiu amaritudo."
  }, {
    userId: 2,
    spotId: 2,
    stars: 3,
    review: "Neque pauci super. Cetera vociferor qui torqueo absorbeo."
  }, {
    userId: 2,
    spotId: 2,
    stars: 2,
    review: "Ventito quibusdam rerum stabilis quaerat conspergo."
  }, {
    userId: 3,
    spotId: 2,
    stars: 2,
    review: "Deorsum accusantium distinctio adulescens blandior cur."
  }, {
    userId: 1,
    spotId: 2,
    stars: 2,
    review: "Optio stabilis conspergo articulus celebrer colligo. Turbo arx nulla."
  },
  {
    userId: 1,
    spotId: 2,
    stars: 3,
    review: "Carus vulariter carus vesper curia angustus corroboro sordeo decor."
  }, {
    userId: 2,
    spotId: 2,
    stars: 2,
    review: "Demulceo terga conventus. Administratio umerus desino antepono doloremque adulatio temeritas abbas peccatus."
  },
  {
    userId: 2,
    spotId: 3,
    stars: 2,
    review: "Cito animi xiphias. Despecto acquiro supra vilitas iusto. Canto dedecor cribro creator agnosco absorbeo reprehenderit audentia super considero."
  },
  {
    userId: 1,
    spotId: 3,
    stars: 3,
    review: "Accendo cura vomica ambitus crebro tempora. Spero despecto taceo compono tenus vinculum. Vinitor tandem truculenter. Vehemens veniam amoveo cunctatio."
  },
  {
    userId: 3,
    spotId: 3,
    stars: 1,
    review: "Argumentum tristis rerum suadeo traho bellicus vapulus decretum. Antepono casso assentator. Arx abundans cohors."
  },
  {
    userId: 3,
    spotId: 3,
    stars: 3,
    review: "Villa cinis bibo. Ab comminor illo varietas deorsum trans asperiores adficio dolorem at. Denego voco tantillus demum perspiciatis at. Theca crebro decretum tui varius."
  },
  {
    userId: 1,
    spotId: 3,
    stars: 2,
    review: "Spiritus appello quaerat statua dolor atrocitas sub. Volo comprehendo demitto comes. Strues cedo modi."
  },
  {
    userId: 2,
    spotId: 3,
    stars: 1,
    review: "Cornu condico acer aestivus voro uredo valens cupio angulus una. Abstergo assentator aurum theatrum videlicet illum aeternus antiquus."
  },
  {
    userId: 2,
    spotId: 4,
    stars: 1,
    review: "Harum thorax accusamus. Cogo audentia callide vix commemoro ara magni. Deputo angulus decor. Talus auxilium comburo amicitia verbera utrimque defaeco terebro terga bardus."
  },
  {
    userId: 3,
    spotId: 4,
    stars: 1,
    review: "Statua delicate nulla derelinquo civis armarium uxor. Conculco somnus utrum convoco arx spectaculum utilis benigne tubineus theca. Doloremque considero curvo amissio alter degero utrum tametsi. Harum sufficio demergo confido aequus umbra defluo fugiat tum."
  },
  {
    userId: 1,
    spotId: 4,
    stars: 2,
    review: "Cribro auctor alo aetas eveniet uxor non cursim."
  }, {
    userId: 3,
    spotId: 4,
    stars: 2,
    review: "Aeger tabula aetas comburo."
  }, {
    userId: 1,
    spotId: 4,
    stars: 2,
    review: "Contra uberrime animadverto depromo volo tutamen odit."
  }, {
    userId: 2,
    spotId: 4,
    stars: 1,
    review: "Solus decipio odio amissio concedo similique quos benevolentia. Sunt surgo tabernus appono amet auctor coniecto video cornu chirographum."
  },
  {
    userId: 1,
    spotId: 5,
    stars: 1,
    review: "Creator ago vulgaris cursim. Est vilitas undique est tempus. Talis succedo trans cursus alii tergum tergeo careo antiquus. Considero sol stillicidium crebro cedo."
  },
  {
    userId: 2,
    spotId: 5,
    stars: 1,
    review: "Illo decens sollers maxime strenuus cito tendo conspergo aggero thorax. Nulla acsi creta sophismata cur trado considero ultra denuncio."
  },
  {
    userId: 3,
    spotId: 5,
    stars: 1,
    review: "Blanditiis summopere compono certus alias. Cuius beatus deleo tero adsum barba arbor cometes error. Sodalitas vigilo chirographum sit tabgo vox cogito cursus stultus audeo. Thorax cenaculum necessitatibus nemo concedo alius verbera deserunt crinis testimonium."
  },
  {
    userId: 1,
    spotId: 5,
    stars: 1,
    review: "Deserunt copiose laudantium crux. Celo cura velit caveo carmen volaticus tendo saepe."
  },
  {
    userId: 2,
    spotId: 5,
    stars: 2,
    review: "Sint vae odit perferendis conservo patior spiculum nemo id."
  }, {
    userId: 3,
    spotId: 5,
    stars: 1,
    review: "Turpis torqueo ambitus crustulum vulariter bellicus. Sopor apparatus illum annus degenero benigne. Terebro decimus bellum varius tener surculus cupio. Ascit vitae somnus caste quidem."
  },
  {
    userId: 2,
    spotId: 6,
    stars: 3,
    review: "Ducimus decimus crinis aggredior audeo aveho caries."
  }, {
    userId: 2,
    spotId: 6,
    stars: 1,
    review: "Vinculum contego dignissimos templum tepesco aspernatur decet cattus."
  },
  {
    userId: 1,
    spotId: 6,
    stars: 2,
    review: "Deficio cattus vorago depromo pectus theatrum. Venia spectaculum triumphus audax quam decet collum voro tero sint. Congregatio antea laboriosam aperte utilis capio comprehendo adstringo conspergo. Chirographum certe tenus voluptas damnatio quibusdam."
  },
  {
    userId: 1,
    spotId: 6,
    stars: 1,
    review: "Ascit pauper vicinus alter caritas. Conturbo veritatis cito teneo averto nesciunt argumentum iste. Illo rem crudelis autus deorsum succurro. Clibanus thesaurus nisi vado laborum adduco appello."
  },
  {
    userId: 2,
    spotId: 6,
    stars: 3,
    review: "Celo attonbitus cribro currus admoneo textilis delinquo vehemens quae suspendo. Vetus adopto celebrer clarus umbra despecto depraedor abundans trado."
  },
  {
    userId: 3,
    spotId: 6,
    stars: 1,
    review: "Bestia timidus consectetur ustulo in ait totus at quia. Terra cunabula abduco claudeo sit cerno cohibeo crebro."
  },
  {
    userId: 2,
    spotId: 7,
    stars: 3,
    review: "Comburo ambitus defluo carmen utrum esse victoria vilicus illum. Arbitro ago desidero adopto versus amaritudo ultra demergo."
  },
  {
    userId: 3,
    spotId: 7,
    stars: 2,
    review: "Thema comis somniculosus."
  }, {
    userId: 2,
    spotId: 7,
    stars: 3,
    review: "Tui depereo creber adicio abbas aestivus ubi coepi blanditiis. Demo allatus deleo curia adipisci clibanus censura tendo. Cogito delicate vix dens toties conqueror timidus. Testimonium tergo curtus."
  },
  {
    userId: 2,
    spotId: 7,
    stars: 2,
    review: "Derideo atrox sequi strues eius peccatus vivo termes. Accusamus terreo voluntarius voluntarius traho terminatio denuncio."
  },
  {
    userId: 1,
    spotId: 7,
    stars: 1,
    review: "Tollo creo vulgivagus. Vis compello modi alias rerum torrens cavus viscus. Theologus admoveo cultura."
  },
  {
    userId: 1,
    spotId: 7,
    stars: 3,
    review: "Voluptatem ipsa conqueror."
  }, {
    userId: 2,
    spotId: 8,
    stars: 3,
    review: "Bis unde laudantium vicissitudo delectus hic distinctio cognatus tabella adduco. Pecco tricesimus accedo delicate attero cubitum. Ea stabilis dapifer thalassinus patruus bene deripio adhaero."
  },
  {
    userId: 3,
    spotId: 8,
    stars: 1,
    review: "Aegrus curriculum carbo quasi damnatio tepesco vito comburo magni dolore."
  },
  {
    userId: 1,
    spotId: 8,
    stars: 3,
    review: "Eius adeptio viriliter. Placeat uberrime decens utrimque excepturi statim adopto. Aggredior aurum curto assumenda. Varius subito eos truculenter."
  },
  {
    userId: 1,
    spotId: 8,
    stars: 3,
    review: "Armarium testimonium admoveo atque."
  }, {
    userId: 1,
    spotId: 8,
    stars: 1,
    review: "Centum vetus depulso. Solus strues desparatus vulnero traho triumphus caritas spargo. Est apto videlicet anser verto defungo denique."
  },
  {
    userId: 1,
    spotId: 8,
    stars: 1,
    review: "Cunctatio damnatio sumptus auctor error crapula. Terebro clarus cibo abeo adficio strenuus velut."
  },
  {
    userId: 3,
    spotId: 9,
    stars: 3,
    review: "Suscipit varietas sapiente aeneus subvenio vix."
  }, {
    userId: 2,
    spotId: 9,
    stars: 1,
    review: "Tandem cavus somniculosus. Amaritudo denuncio aperte optio. Molestiae approbo aequitas patior adnuo."
  },
  {
    userId: 1,
    spotId: 9,
    stars: 1,
    review: "Pectus bellum capitulus defluo tutamen amoveo. Arceo temeritas aperio trucido tardus tamquam debilito amiculum teneo demulceo. Currus debitis patria. Articulus coepi cohaero adipiscor asporto vix conforto aequitas aliquid."
  },
  {
    userId: 3,
    spotId: 9,
    stars: 1,
    review: "Error bonus tyrannus tremo sonitus. Cur coaegresco facilis dens verus."
  },
  {
    userId: 3,
    spotId: 9,
    stars: 2,
    review: "Nemo vestrum comprehendo absum timidus cibo attero reprehenderit. Strues vomer abduco tolero bos. Conscendo vorago ratione theca stabilis tepesco cultura aranea atrox."
  },
  {
    userId: 1,
    spotId: 9,
    stars: 3,
    review: "Capillus tenetur quibusdam dens videlicet surculus somniculosus apparatus cuius. Comitatus urbanus admiratio bos. Congregatio suus speculum sunt utrum. Uberrime totam abeo strenuus atqui ambulo vinitor aeger tergeo valetudo."
  },
  {
    userId: 1,
    spotId: 10,
    stars: 1,
    review: "Compono cerno trans iste cedo tam. Verbum civis conventus vel. Tutamen abscido accendo ultio sto celo convoco voco supra vester. Demum delectatio antiquus tardus aeternus."
  },
  {
    userId: 2,
    spotId: 10,
    stars: 2,
    review: "Arceo volaticus auxilium apud censura consuasor ultio debitis."
  }, {
    userId: 2,
    spotId: 10,
    stars: 2,
    review: "Cursus capitulus aeger defaeco utpote vallum ascit impedit vicissitudo. Culpo sollicito ullus voluptatem quas tener cervus. Cicuta corrigo amoveo arto crux sponte. Terror delicate deludo pauci."
  },
  {
    userId: 3,
    spotId: 10,
    stars: 3,
    review: "Cornu adsum attonbitus. Aequitas talus dignissimos thema degero defaeco solus caecus. Comis voco degenero chirographum antiquus sit."
  },
  {
    userId: 3,
    spotId: 10,
    stars: 1,
    review: "Colligo rem denuncio neque vulgivagus spargo. Fugit adversus valeo speciosus."
  },
  {
    userId: 2,
    spotId: 10,
    stars: 3,
    review: "Sperno coruscus chirographum trepide bene vetus bardus. Aegre adsuesco solum. Sursum autus volva ultra fugiat tergiversatio inventore temeritas ipsum surgo."
  },
  {
    userId: 2,
    spotId: 11,
    stars: 2,
    review: "Tenax via quos curvo vitiosus adipiscor benigne tolero administratio adfectus. Aliquam magni velociter comitatus defetiscor spectaculum uberrime. Tondeo cognatus defessus amaritudo illo triduana alienus tergo id studio."
  },
  {
    userId: 1,
    spotId: 11,
    stars: 3,
    review: "Veritas basium corpus despecto confugo cupressus succedo cotidie sustineo arbor. Adsuesco spargo viduo censura. Tres amor cumque debeo officia uter volup stips vere villa. Usitas triduana antiquus adipisci studio acerbitas."
  },
  {
    userId: 2,
    spotId: 11,
    stars: 2,
    review: "Tunc velut minima tremo socius asporto autus. Curto voluptatibus coma doloribus tripudio sol strues voluptatum vaco sonitus. Auctor vacuus quidem claro eveniet."
  },
  {
    userId: 2,
    spotId: 11,
    stars: 1,
    review: "Tempus socius cerno abutor ultra. Tenax tumultus nam."
  }, {
    userId: 1,
    spotId: 11,
    stars: 1,
    review: "Cum curriculum abbas iste corporis terminatio. Tamen pectus comminor. Praesentium impedit volaticus tabella patruus volutabrum vitiosus alii demulceo voluptatum. Crepusculum versus accommodo vorago vigilo caries spiritus vapulus confido combibo."
  },
  {
    userId: 3,
    spotId: 11,
    stars: 1,
    review: "Tertius absorbeo adeptio contego doloremque magni optio copia coerceo decor. Templum minima aveho. Minima utrum astrum tot. Tres tepesco tabesco deputo adamo vilicus spectaculum cultellus pectus deleo."
  },
  {
    userId: 3,
    spotId: 12,
    stars: 2,
    review: "Denique tego utroque beneficium tabula careo vigor tamdiu contra somnus. Atrox natus vito alo vomica suscipit incidunt veritas tutis quos. Clam desidero terminatio tenax. Tamen colligo annus."
  },
  {
    userId: 2,
    spotId: 12,
    stars: 1,
    review: "Abundans cuppedia provident ascisco cognomen beatae animadverto. Tenax textilis vere decens adaugeo urbanus denique adulescens arx caterva. Tenetur ventus audeo capillus alienus inflammatio acervus amicitia deputo vulticulus. Depromo cattus vesica."
  },
  {
    userId: 2,
    spotId: 12,
    stars: 2,
    review: "Textor nam auditor accusantium varietas canonicus attollo tamen."
  }, {
    userId: 1,
    spotId: 12,
    stars: 1,
    review: "Tactus quos cribro veniam. Caterva statua crepusculum utroque. Decumbo omnis vetus voluptatem. Velit officiis subnecto comes spargo terreo."
  },
  {
    userId: 1,
    spotId: 12,
    stars: 1,
    review: "Voluptas apparatus thorax voluptatibus termes. Voluptate conqueror degero. Curvo benigne vesper."
  },
  {
    userId: 1,
    spotId: 12,
    stars: 1,
    review: "Impedit aut cura excepturi deporto comparo. Cruciamentum cilicium culpo vulpes tamquam acquiro eum summisse. Truculenter tam ascisco occaecati ustilo vesco adulescens."
  },
  {
    userId: 2,
    spotId: 13,
    stars: 3,
    review: "Vesper debitis compono timor commemoro terror validus tepesco."
  }, {
    userId: 1,
    spotId: 13,
    stars: 3,
    review: "Censura censura saepe pecco carbo."
  }, {
    userId: 3,
    spotId: 13,
    stars: 2,
    review: "Contego amplexus ante utique annus adaugeo admoneo depromo aggredior."
  },
  {
    userId: 3,
    spotId: 13,
    stars: 2,
    review: "Asper catena quo. Ait odio clarus tollo taceo. Necessitatibus amet tersus audeo decretum."
  },
  {
    userId: 1,
    spotId: 13,
    stars: 2,
    review: "Summa provident aeneus corona aestivus coniecto uxor. Caste turpis accusantium catena desipio. Conor accommodo tenus cibo talis. Alias comptus acceptus carus possimus et celer."
  },
  {
    userId: 3,
    spotId: 13,
    stars: 3,
    review: "Iste patrocinor aufero apud audacia candidus decumbo suffoco deinde sophismata. Compello undique ullam verto."
  },
  {
    userId: 1,
    spotId: 14,
    stars: 2,
    review: "Calco cunctatio dens volubilis talus suspendo vix."
  }, {
    userId: 1,
    spotId: 14,
    stars: 2,
    review: "Sol valde cultura demulceo. Vaco saepe caries videlicet curis thymum pel quo supellex comburo."
  },
  {
    userId: 3,
    spotId: 14,
    stars: 2,
    review: "Comparo arca peccatus ventus tergiversatio. Stips stultus alii vae synagoga. Cupressus crur tardus. Adopto adicio non concido cultura voco solvo corroboro."
  },
  {
    userId: 1,
    spotId: 14,
    stars: 3,
    review: "Nisi tracto clarus tutamen tertius bardus tantum. Comburo coniecto eaque deporto quo enim accusator. Vinum pecto advenio."
  },
  {
    userId: 1,
    spotId: 14,
    stars: 2,
    review: "Adhuc debilito depopulo appello socius vilitas temptatio."
  }, {
    userId: 2,
    spotId: 14,
    stars: 3,
    review: "Mollitia cunabula defero. Tum caelum usitas audeo vobis exercitationem."
  },
  {
    userId: 2,
    spotId: 15,
    stars: 1,
    review: "Subvenio assentator facilis crapula. Tametsi crastinus ceno. Defaeco vere veniam surgo abeo. Utrum vulnus vester omnis."
  },
  {
    userId: 2,
    spotId: 15,
    stars: 3,
    review: "Amplitudo defaeco aperio pecto aut aliqua."
  }, {
    userId: 2,
    spotId: 15,
    stars: 2,
    review: "Cuius voluntarius temptatio beatae. Aqua doloremque repudiandae ars repellendus. Dolores aggero ventosus harum admoveo tenax."
  },
  {
    userId: 1,
    spotId: 15,
    stars: 2,
    review: "Dolorum cauda perferendis caelestis. Conscendo calcar vulpes abeo pecco crudelis supellex. Audio sustineo culpo."
  },
  {
    userId: 1,
    spotId: 15,
    stars: 3,
    review: "Audeo quos angulus advoco cohaero colo. Eum tredecim tres."
  }, {
    userId: 3,
    spotId: 15,
    stars: 2,
    review: "Dignissimos porro turba antepono. Sollicito curtus audax vespillo nisi curto tollo. Reiciendis comes aestus decor aequus aperte. Cariosus artificiose thalassinus atrocitas teneo balbus socius caput vinum."
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
