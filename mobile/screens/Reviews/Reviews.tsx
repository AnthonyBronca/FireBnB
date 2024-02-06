import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReviewNav from './components/ReviewNav';



const Reviews:React.FC= ({ navigation}:any) => {

    // const {spotId} = spot;

  return (
    <View style={styles.container}>
        <ReviewNav navigation={navigation} />
        {/* <Text>{`Hello from spot: review`}</Text> */}
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Reviews;
