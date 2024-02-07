import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchSpots } from '../../store/spots';
import BottomTabs from './Components/NavBar';
import Search from './Components/Search';

// import pineapple from '../../assets/images/pineapple.jpg'

interface IHome {
  navigation: any
}

const Home: React.FC<IHome> = ({ navigation }) => {

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.spots.allSpots);

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

/*
[
"address": "71720 Laron Plains",
"avgRating": "NEW",
"city": "Dublin",
"country": "United States",
"createdAt": "2024-1-6",
"description": "Great place to stay when you want to get away from it all",
"id": 20,
"lat": "-41.946337",
"lng": "-29.062167",
"name": "Cuban-style home",
"ownerId": 3, "previewImage":
"https://harbr.de/fileadmin/_processed_/a/1/csm_harbr_boardinghouse_ludwigsburg_apartment_comfort_02_8fdc0763bd.jpg",
"price": 62,
"reviews": [],
"state":
"Wisconsin",
"updatedAt":
"2024-1-6",
"userId": 3}
]

*/

  console.log(isLoaded)
// console.log(data)



  return (
    <SafeAreaView style={styles.container}>
      <Search/>
      <Text>This is the homepage</Text>
      <TouchableOpacity onPress={goToSpotDetail}>
        <Text>Go to SpotDetail</Text>
      </TouchableOpacity>
      <Image style={{ width: 400, height: 400, objectFit: 'contain' }} source={{ uri: "https://harbr.de/fileadmin/_processed_/a/1/csm_harbr_boardinghouse_ludwigsburg_apartment_comfort_02_8fdc0763bd.jpg"}} />
      <BottomTabs navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue'
  }
})

export default Home;
