import React from 'react';
import { View, Image, StyleSheet, Button, Text } from 'react-native';
import { colors } from '../../../constants/stylings/styles';


import pineapple from '../../../assets/images/pineapple.jpg'
import icons from '../../../assets/icons/icons';


const Header:React.FC = ():JSX.Element => {

    const goBack = () => {
        console.log("Go back")
    }

  return (
    <View>
        <View style={styles.topNavContainer}>
            <View>
                <View><Text>{"<"}</Text></View>
            </View>
            <View style={styles.rightButtonContainer}>
                <View><Image style={styles.navIcon} source={pineapple}/></View>
                <Button title='<3' onPress={goBack}></Button>
            </View>
        </View>
        <View style={styles.mainImgContainer}>
            {/* <Image style={styles.mainImg} source={pineapple} /> */}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    mainImg: {
        flex: 1,
        height: 350,
        width: null,
    },
    mainImgContainer: {
        alignSelf: 'stretch',
        width: null,
        height: null,
    },
    topNavContainer: {
        zIndex: 100,
        position: 'absolute',
        top: 40,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    rightButtonContainer: {
        flexDirection: 'row'
    },
    buttonColor: {
        color: colors.BLACK
    },
    navIcon:{
        height: 30,
        width: 30,
    }

})


export default Header;
