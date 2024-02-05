import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { fonts } from '../../../constants/stylings/styles';

interface ISubDetail {
    img: ImageSourcePropType,
    title: string,
    text: string,
    additionalDets: boolean,
    style?: any
}


const SubDetail: React.FC<ISubDetail> = ({img, title, text, additionalDets, style}) => {
  return (
    <View style={style && Object.keys(style).length > 0 ? style :styles.mainContainer}>
        <View style={styles.imgContainer}>
            <Image style={additionalDets ? styles.detImg :styles.profileImg} source={img} />
        </View>
      <View style={styles.txtContainer}>
        <Text style={[styles.subHeader, styles.txtSpacing]}>{title}</Text>
        <Text style={[styles.subText, styles.txtSpacing]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 40,
        flexDirection: 'row',
    },
    subHeader: fonts.subHeader,
    subText: fonts.subText,
    profileImg: {
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    detImg: {
        height: 25,
        width: 25,
        borderRadius: 50,
    },
    txtContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    txtSpacing: {
        paddingVertical: 2
    },
    imgContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginRight: 10,
    }
})

export default SubDetail;
