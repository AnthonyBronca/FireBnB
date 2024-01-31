import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import NavBar from './Components/NavBar';

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Hello World</Text>
      <NavBar/>
    </SafeAreaView>
  );
}

export default Home;