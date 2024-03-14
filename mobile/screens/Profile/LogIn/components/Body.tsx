import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, fonts } from '../../../../constants/stylings/styles';
import FirebnbCard from '../../components/FirebnbCard';

interface IBodyProps {
    navigation: any;
}

const Body:React.FC<IBodyProps> = ({navigation}) => {

    const handleLogin = () => {
        console.log('login pressed')
    }

    const handleSignUp = () => {
        console.log('sign up pressed')
    }

  return (
    <View style={styles.container}>
        <Pressable onPress={handleLogin}>
            <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log in</Text>
            </View>
        </Pressable>
        <View style={styles.signUpContainer}>
            <View style={styles.signUpText}>
                <Text style={styles.text1}>Don't have an account?</Text>
                <Pressable onPress={handleSignUp}>
                    <Text style={styles.signUp}>Sign up</Text>
                </Pressable>
            </View>
        </View>
        <FirebnbCard navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginHorizontal: 40
    },
    loginButton: {
        width: '100%',
        backgroundColor: colors.RESERVERED,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        color: 'white',
        fontWeight: '500',
        fontFamily: 'System'
    },
    signUpContainer: {
        marginTop: 20
    },
    signUpText: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: 5
    },
    text1: fonts.subText,
    signUp: {
        fontFamily: 'System',
        fontWeight: '500',
        textDecorationLine: 'underline',
        fontSize: 12
    }
})

export default Body;
