import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { View, Image, TouchableOpacity } from 'react-native';
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

      return (
        <View>
            <TouchableOpacity onPress={goToSpotDetail}>
                <Image 
                style={{ width: 400, height: 400, objectFit: 'contain' }} 
                source={{ uri: "https://harbr.de/fileadmin/_processed_/a/1/csm_harbr_boardinghouse_ludwigsburg_apartment_comfort_02_8fdc0763bd.jpg"}}
                />
            </TouchableOpacity>
 
        </View>
      );
    }

export default Spots;
