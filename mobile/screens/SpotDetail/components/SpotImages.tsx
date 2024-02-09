import React, { memo } from 'react';
import { View, StyleSheet, ImageSourcePropType, Text, Image} from 'react-native';
import { fonts } from '../../../constants/stylings/styles';

interface ISpotImageProps {
    images: ImageSourcePropType[]
}

const SpotImages:React.FC<ISpotImageProps> = ({images}) => {
  return (
      <View style={styles.mainContainer}>
      {images.map((img, key) => (
        <View style={styles.imageContainer} key={`${key}-${new Date()}`}>
            <Image style={styles.img} source={img}/>
            <Text style={[fonts.subHeader, {marginTop: 5}]}>{`Photo ${key+1}`}</Text>
        </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginHorizontal: 20
    },
    imageContainer: {
        marginHorizontal: 15
    },
    img: {
        height: 130,
        width: 200,
        borderRadius: 10
    }
})

export default memo(SpotImages);
