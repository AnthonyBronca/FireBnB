import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { View, ScrollView, Image, Pressable, StyleSheet } from 'react-native';
import { fetchSpots } from '../../../store/spots';


interface IHome {
    navigation: any
  }

const Spots:React.FC<IHome> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const allSpots = useAppSelector((state) => state.spots.allSpots);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
  

    useEffect(() => {
        const getInfo = async() => {
          await dispatch(fetchSpots())
          setIsLoaded(true)
        }
        getInfo()
      }, [isLoaded])

      const goToSpotDetail = () => {
        navigation.push('SpotDetail')
      }

      console.log('data--', allSpots)

      return (
        <ScrollView>
            {allSpots?.map((spot) => (
                <View style={styles.spotImageView}>
                <Pressable
                    style={styles.spotImageContainer} 
                    onPress={goToSpotDetail}
                >
                    <Image 
                    style={styles.image} 
                    source={{ uri: spot.previewImage}}
                    />
                </Pressable>
            </View>
            ))}
        </ScrollView>
      );
    };

    const styles = StyleSheet.create({
        spotImageView: {
            alignItems: 'center',
            marginVertical: 20
        },
        spotImageContainer: {
            width: 375,
            height: 375,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
        },
        image: {
            width: 375,
            height: 375,
            objectFit: 'fill',
            borderRadius: 15,
            backgroundColor:'#FFFFFF',
        }
    })

export default Spots;
