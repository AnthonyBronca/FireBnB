import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


interface IReviewNav {
    navigation: any;
}

const ReviewNav:React.FC<IReviewNav> = ({navigation}) => {

    const goBack = () => {
        navigation.pop();
    }


  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} size={15} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginLeft: 40
    }
})


export default ReviewNav;
