import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import NavBar from './Components/NavBar';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IHome {
  navigation: any
}

const Home: React.FC<IHome> = ({ navigation }) => {

  const goToSpotDetail = () => {
    navigation.push('SpotDetail')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the homepage</Text>
      <TouchableOpacity onPress={goToSpotDetail}>
        <Text>Go to SpotDetail</Text>
      </TouchableOpacity>
      <NavBar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Home;
