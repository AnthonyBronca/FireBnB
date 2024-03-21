import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


interface IReviewNav {
    navigation: any;
}

const ReviewNav:React.FC<IReviewNav> = ({navigation}) => {

  const goBack = () => {
    navigation.pop()
  }



  return (
    <>
    <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
            <View style={styles.backBtnContainer}>
                <FontAwesomeIcon size={15} icon={faChevronLeft} />
            </View>
        </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 100,
        position: 'absolute',
        top: 55,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        // paddingBottom: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: 50
    },
    backBtnContainer: {
        flexDirection: 'row'
    }
})

export default ReviewNav;
