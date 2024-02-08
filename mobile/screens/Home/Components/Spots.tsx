import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { fetchSpots } from '../../../store/spots';


interface IHome {
    navigation: any
  }

const Spots:React.FC<IHome> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.spots.allSpots);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    console.log('data--', data)
  

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

      console.log('data--', data)

      return (
        <View>
            <View style={styles.spotImageView}>
                <Pressable
                    style={styles.spotImageContainer} 
                    onPress={goToSpotDetail}
                   
                >
                    <Image 
                    style={styles.image} 
                    source={{ uri: "https://harbr.de/fileadmin/_processed_/a/1/csm_harbr_boardinghouse_ludwigsburg_apartment_comfort_02_8fdc0763bd.jpg"}}
                    />
                </Pressable>
            </View>
        </View>
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
            objectFit: 'contain',
            borderRadius: 15,
            backgroundColor:'#FFFFFF',
        }
    })

export default Spots;
