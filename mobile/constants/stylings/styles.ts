interface ITheme {
    primaryColor:string;
    secondaryColor:string;
};

interface IFontStyle {
    fontFamily:string;
    fontSize:number;
    color:string;
};

interface IFont {
    header: IFontStyle;
    subHeader: IFontStyle;
    subHeading: IFontStyle;
    detailText: IFontStyle;
    defaultText: IFontStyle;
};

const BNBRED = "#FF375D";

const lightMode:ITheme= {
    primaryColor:"#FFFFFF",
    secondaryColor:BNBRED
};
