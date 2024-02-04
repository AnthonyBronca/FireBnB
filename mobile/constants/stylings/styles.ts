import { TextStyle } from "react-native";

// interface ITheme {
//     primaryColor:string;
//     secondaryColor:string;
// };




interface IFont{
    header: TextStyle;
    subHeader: TextStyle;
    subHeading?: TextStyle;
    detailText: TextStyle;
    defaultText: TextStyle;
    subText: TextStyle
};


const BNBRED = "#FF375D";
const BLACK = "#000000"
const WHITE = '#FFFFFF'
const LIGHT = '#505050'
const RESERVERED = "#E51F52"

export const colors = {
    BNBRED,
    BLACK,
    WHITE,
    LIGHT,
    RESERVERED
}

export const fonts:IFont = {
    header: {
        fontFamily: 'System',
        fontSize: 20,
        color:  colors.BLACK,
        fontWeight: '600',
        lineHeight: 30
    },
     subHeader: {
        fontFamily: 'System',
        fontSize: 15,
        color: colors.BLACK,
        fontWeight: '500',
     },
     detailText: {
        fontFamily: 'System',
        fontSize: 12,
        color: colors.BLACK,
     },
     subText: {
        fontFamily: 'System',
        fontSize: 12,
        color: colors.LIGHT
     },
     defaultText: {
        fontFamily: 'System',
        fontSize: 14,
        color: colors.BLACK
     }
}



// const lightMode:ITheme= {
//     primaryColor:"#FFFFFF",
//     secondaryColor:BNBRED
// };
