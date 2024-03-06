import React from 'react';
import { View, StyleSheet} from 'react-native';
import ReviewNav from './components/ReviewNav';


interface IReviewsProps {
  navigation: any;
}

const Reviews:React.FC<IReviewsProps>= ({ navigation}) => {

console.log(navigation)

  return (
    <>
      <View style={styles.container}>
        <ReviewNav navigation={navigation} />

      </View>
    </>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
})

export default Reviews;
