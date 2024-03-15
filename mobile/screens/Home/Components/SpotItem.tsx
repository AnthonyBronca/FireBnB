import React, { memo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Spot } from '../../../typings/redux';
import { fonts } from '../../../constants/stylings/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'expo-image';
import SpotDetails from './SpotDetails';

interface ISpotItemProps {
    item: Spot;
    navigation: any;
}
interface IHeartPressed {
    [key: number]: boolean
};


const SpotItem:React.FC<ISpotItemProps> = ({item, navigation}) => {
    const [isHeartPressed, setIsHeartPressed] = useState<IHeartPressed>({});

    const goToSpotDetail = (spot: Spot) => {
        navigation.navigate('SpotDetail', {
            spot,
        })
    };

    const toggleHeartPress = (spotId:number) => {
        setIsHeartPressed(prev => ({
            ...prev,
            [spotId]: !prev[spotId]
        }));
    };
  return (
      <View key={`${item.id}-${new Date()}`} style={styles.spotImageView}>
          <Pressable style={styles.spotImageContainer} onPress={() => goToSpotDetail(item)}>
              <View style={styles.heartContainer}>
                  <View>
                      {item.id % 2 === 0 && (
                          <View style={styles.guestFavContainer}>
                              <Text style={styles.guestFavText}>Guest favorite</Text>
                          </View>
                      )}
                  </View>
                  <Pressable style={styles.heartIcon} onPress={() => toggleHeartPress(item.id)}>
                      <FontAwesomeIcon
                          icon={faHeart}
                          size={25}
                          color={isHeartPressed[item.id] ? '#FF385B' : '#535350'}
                      />
                  </Pressable>
              </View>
              <Image style={styles.image} source={{ uri: item.previewImage }} />
              <SpotDetails spot={item} />
          </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
    spotImageView: {
        alignItems: 'center',
        marginTop: 20,
        overflow: 'hidden'
    },
    spotImageContainer: {
        width: 355,
        height: 450,
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    image: {
        width: 355,
        height: 355,
        objectFit: 'fill',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    heartContainer: {
        position: 'absolute',
        top: 15,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 355,
    },
    heartIcon: {
        marginHorizontal: 15
    },
    guestFavContainer: {
        backgroundColor: "#FBFBFB",
        borderColor: '#A19F9D',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 125,
        height: 25,
        marginHorizontal: 15
    },
    guestFavText: fonts.subHeader,
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default memo(SpotItem);
