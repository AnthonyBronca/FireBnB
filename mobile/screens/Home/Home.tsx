import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import NavBar from './Components/NavBar';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IHome {
  navigation: any
}

const Home: React.FC<IHome> = ({ navigation }) => {

  const goToSpotDetail = () => {
    navigation.push('SpotDetail')
  }
  const goToTest = () => {
    navigation.push('Test')
  }

  return (
    <SafeAreaView>
      <Text>This is the homepage</Text>
      <TouchableOpacity onPress={goToSpotDetail}>
        <Text>Go to SpotDetail</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToTest}>
        <Text>Go to Test</Text>
      </TouchableOpacity>
      <NavBar/>
    </SafeAreaView>
  );
}

export default Home;
