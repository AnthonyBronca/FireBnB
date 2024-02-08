import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';

// import { useAppDispatch, useAppSelector } from '../../store';
// import { fetchSpots } from '../../store/spots';
import BottomTabs from './Components/NavBar';
import Search from './Components/Search';
import Spots from './Components/Spots';


interface IHome {
  navigation: any
}

const Home: React.FC<IHome> = ({ navigation }) => {



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

  return (
    <SafeAreaView style={styles.container}>
      <Search/>
      <Spots navigation={navigation}/>
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
