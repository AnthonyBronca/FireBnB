import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ILoggedInProps } from '../LoggedIn';
import { colors, fonts } from '../../../../constants/stylings/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Image } from 'expo-image';



const Header:React.FC<ILoggedInProps> = ({navigation, user}) => {

    const goToProfile = () => {
        navigation.navigate('ProfilePage')
    }

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.h1}>Profile</Text>
            <FontAwesomeIcon icon={faBell} size={20}/>
        </View>
        <View style={{}}>
            <View>
                <Text>{user?.firstName}</Text>
                <Text>Show profile</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    },
    h1: {
        fontFamily: 'System',
        fontSize: 30,
        fontWeight: '500',
        color: colors.BLACK,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default Header;
