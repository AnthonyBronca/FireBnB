import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from './components/Header';

const SpotDetail:React.FC = ():JSX.Element => {
  return (
    <ScrollView>
      <Header />
      <Text>Hello World</Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({

})

export default SpotDetail;
