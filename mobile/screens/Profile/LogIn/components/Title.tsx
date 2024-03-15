import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../../constants/stylings/styles';

const Title:React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.subTextContainer}>
        <Text style={[styles.subText, {fontSize: 15}]}>Log in to start planning your next trip.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40,
        marginTop: 40
    },
    header:{
        fontFamily: 'System',
        fontWeight: '500',
        fontSize: 25
    },
    subText: fonts.subText,
    subTextContainer: {
        marginTop: 10
    }

})

export default Title;
