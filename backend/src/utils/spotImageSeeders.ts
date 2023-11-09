import {faker} from '@faker-js/faker'
const random = require('getrandomjs')

interface SpotImage {
    spotId: number,
    url: string,
    preview: boolean,
}


const randomHomeUrls = [
"https://www.livehome3d.com/assets/img/social/how-to-design-a-house.jpg",
"https://images.coolhouseplans.com/plans/80523/80523-b440.jpg",
"https://www.theplancollection.com/Upload/Designers/177/1057/Plan1771057MainImage_10_7_2020_16_381_251.jpg",
"https://cdn11.bigcommerce.com/s-g95xg0y1db/images/stencil/1280x1280/g/modern%20house%20plan%20-%20carbondale__05776.original.jpg",
"https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQXyNJ513HK-GVxzE64qgx7wy7srwqDIBxFc539wbrMsf59obQ6QDU9nyLavtC4Yyh_63aUb59MnqgGoK20xRIEpDnpNwmcqjBONLTF2xu8DNU_lljkziiDCTBXxaEmaIAqFAJ249-ALjLzUbYvx4h93ORZA.jpg?r=48b",
"https://res.cloudinary.com/brickandbatten/images/f_auto,q_auto/v1659367745/wordpress_assets/Contemporary-House-57123-5-2_43096e0838/Contemporary-House-57123-5-2_43096e0838.jpg?_i=AA",
"https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
"https://static01.nyt.com/images/2023/07/09/multimedia/07farmhouses-pqcf/07farmhouses-pqcf-videoSixteenByNine3000.jpg",
"https://www.compass.com/m/cdfb4e88e3da2ad6bae5db80ba8fa34ca59f4036_img_0_0f06e/origin.jpg",
"https://photos.zillowstatic.com/fp/8626bbdf8f602304c8907774e86565e1-p_e.jpg",
"https://www.bankrate.com/2019/10/25100200/bungalow-484149133.jpg?auto=webp&optimize=high&crop=16:9",
"https://res.cloudinary.com/brickandbatten/images/f_auto,q_auto/v1640983409/wordpress_assets/Bungalows-social-share/Bungalows-social-share.jpg?_i=AA",
"https://1.bp.blogspot.com/-vhlrt-Buvo8/W0Wyfc_2yUI/AAAAAAAAvU0/nlhPYcf54RAukNiKUUUVhR6os8HKij7awCLcBGAs/s0/1.jpg",
"https://cdn.houseplansservices.com/product/f14kbdvad9hvfguvli1jk9m26b/w620x413.jpg?v=4",
"https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg",
"https://sustainablehouseday.com/wp-content/uploads/2020/07/harmony-house-passive-solar-house-from-NE-scaled.jpg",
"https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8bDSSn30wnxqhfJHI1IhAdQK_iPdu9d8jCg&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtWCS60u9wtZQKKXNglitFbvPBAOt9hWGDpM_GOm6DF3jaaYrrvRGXHPJ3XFA-JequaM8&usqp=CAU",
"https://www.decorilla.com/online-decorating/wp-content/uploads/2020/07/Eclectic-living-room-with-modern-apartment-decor.jpg",
"https://harbr.de/fileadmin/_processed_/a/1/csm_harbr_boardinghouse_ludwigsburg_apartment_comfort_02_8fdc0763bd.jpg",
]

console.log(randomHomeUrls.length)

const generateSpotImageSeeders = (): SpotImage[] => {

    let spotArr:SpotImage[] = [];

    for(let i = 3; i < randomHomeUrls.length; i++){
        let spot:SpotImage = {
            spotId: i,
            url: randomHomeUrls[i],
            preview: true
        }

        spotArr.push(spot)
    }

    return spotArr
}

export default generateSpotImageSeeders
