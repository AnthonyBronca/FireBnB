import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
                <TouchableOpacity
                    style={styles.spotImageContainer} 
                    onPress={goToSpotDetail}
                   
                >
                    <Image 
                    style={styles.image} 
                    source={{ uri: "https://harbr.de/fileadmin/_processed_/a/1/csm_harbr_boardinghouse_ludwigsburg_apartment_comfort_02_8fdc0763bd.jpg"}}
                    />
                </TouchableOpacity>
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
            backgroundColor:'green',
            height: 265,
            width: 400,
            alignItems: 'center',
            justifyContent: 'center'
        },
        image: {
            width: 400,
            height: 265,
            objectFit: 'contain',
            backgroundColor:'blue',
        }
    })

export default Spots;
