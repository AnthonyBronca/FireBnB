import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import { Divider } from 'react-native-elements';
import LoginForm from './components/LoginForm';

interface ILoginProps {
    navigation: any;
}

const Login:React.FC<ILoginProps> = ({navigation}) => {

  return (
    <View style={styles.container}>
        <Header navigation={navigation} />
        <Divider style={{marginTop: 15, opacity: .5}} width={1}/>
        <LoginForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
})

export default Login;
