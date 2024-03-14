import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ILoggedInProps } from '../LoggedIn';
import { colors} from '../../../../constants/stylings/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Image } from 'expo-image';
import { faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'react-native-elements';



const Header:React.FC<ILoggedInProps> = ({navigation, user}) => {

    const goToProfile = () => {
        navigation.navigate('Home')
    }

    console.log(user)
  return (
    <>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.h1}>Profile</Text>
                <FontAwesomeIcon icon={faBell} size={20}/>
            </View>
            <Pressable onPress={goToProfile}>
                <View style={{marginTop: 20}}>
                    <View style={styles.userInfoContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        { user && user.UserImage ?
                                (
                                    <Image
                                    style={styles.userImage}
                                    source={{uri: user.UserImage.url}}
                                    />
                                    )
                                    :
                                    <View style={styles.imagePlaceholder}>
                                <FontAwesomeIcon icon={faUser} size={35} />
                            </View>
                        }
                        <View style={{marginLeft: 10, flexDirection: 'column'}}>
                            <Text>{user?.firstName}</Text>
                            <Text>Show profile</Text>
                        </View>
                        </View>
                        <FontAwesomeIcon icon={faChevronRight} size={15} />
                    </View>
                </View>
            </Pressable>
        </View>
        <Divider width={.5} style={{marginVertical: 10}} />
    </>
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
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    imagePlaceholder: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(80,80,80)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default Header;
