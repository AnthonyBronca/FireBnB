import React, { memo } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { fonts } from '../../../constants/stylings/styles';
import { IReview, Spot } from '../../../typings/redux';
import { Image } from 'expo-image';

interface ISubDetail {
    title: string,
    text: string,
    additionalDets: boolean,
    style?: any
    spot: Spot,
    img?: ImageSourcePropType;
    rev?: IReview
}


const SubDetail: React.FC<ISubDetail> = ({title, text, additionalDets, style, spot, img, rev}) => {


  return (
    <View style={style && Object.keys(style).length > 0 ? style :styles.mainContainer}>
        <View style={styles.imgContainer}>
              {
                additionalDets?
                <Image
                    placeholder={img}
                    style={styles.detImg}
                    source={img}
                    />
                : rev?
                <Image
                    cachePolicy={'memory-disk'}
                    placeholder={{uri: rev.User.previewImageUrl}}
                    style={styles.profileImg}
                    source={{ uri: rev.User.previewImageUrl}} />
                :
                <Image
                    cachePolicy={'memory-disk'}
                    placeholder={{uri: spot.Owner.UserImages[0].url}}
                    style={styles.profileImg}
                    source={{ uri: spot?.Owner.UserImages[0].url }} />}
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

export default memo(SubDetail);
