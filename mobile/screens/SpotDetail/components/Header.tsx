import React, { memo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { colors } from '../../../constants/stylings/styles';

import pineapple from '../../../assets/images/pineapple.jpg'


const Header:React.FC = ():JSX.Element => {


  return (
    <View>
        <View style={styles.mainImgContainer}>
            <Image style={styles.mainImg} source={pineapple} />
        </View>
            <View style={styles.photoCountContainer}>
                <View style={styles.photoCount}>
                    <Text style={styles.photoCountText}>1 / 4</Text>
                </View>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
    photoCountText: {
        fontSize: 12,
        fontWeight: '600',
        padding: 3,
        color: colors.WHITE

    },
    photoCountContainer: {
        width: 50,
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
        alignSelf: 'flex-end',
        right: 20,
        bottom: 30,
        borderRadius: 4
    },
    photoCount: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    mainImg: {
        flex: 1,
        height: 320,
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
        top: 50,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    rightButtonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: colors.WHITE,
        borderRadius: 50,
        padding: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,


    },
    navIcon:{
        padding: 3,
        width: 3,
    },
    navButton: {
        backgroundColor: colors.WHITE,
        borderRadius: 50,
    },

})


export default memo(Header);
