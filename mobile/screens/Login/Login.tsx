import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Header from './components/Header';
import { Divider } from 'react-native-elements';
import LoginForm from './components/LoginForm';
import OAuthButton from './components/OAuthButton';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faApple, faFacebook, faGoogle,} from '@fortawesome/free-brands-svg-icons';

interface ILoginProps {
    navigation: any;
}

const Login:React.FC<ILoginProps> = ({navigation}) => {

  return (
    <View style={styles.container}>
        <Header navigation={navigation} />
        <Divider style={{marginTop: 15, opacity: .5}} width={1}/>
        <LoginForm navigation={navigation} />
      <View style={{ flexDirection:'row', alignItems: 'center', marginVertical: 30 }}>
        <Divider style={{width: '45%'}} orientation='horizontal'/>
        <Text style={{width: '7%', textAlign: 'center', fontFamily: 'System', color: 'rgba(80,80,80,.9)'}}>or</Text>
        <Divider style={{ width: '45%' }} orientation='horizontal' />
      </View>
      <View style={{gap: 15}}>
        <OAuthButton icon={faEnvelope} text="Demo" />
        <OAuthButton icon={faApple} text="Apple" />
        <OAuthButton icon={faGoogle} text="Google" />
        <OAuthButton icon={faFacebook} text="Facebook" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
})

export default Login;
