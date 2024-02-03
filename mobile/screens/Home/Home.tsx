import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import NavBar from './Components/NavBar';

const Home = () => {
  return (
    <SafeAreaView>
      <Text>This is the homepage</Text>
      <NavBar/>
    </SafeAreaView>
  );
}

export default Home;