import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Keyboard, ActivityIndicator} from 'react-native';
import { useAppDispatch } from '../../../store';
import { login } from '../../../store/session';
import AuthContext from '../../../context/AuthContext';
import { colors } from '../../../constants/stylings/styles';

interface IOauthButtonProps {
  icon: IconDefinition;
  text: string;
  navigation: any;
  setErr: Function
}

const OAuthButton:React.FC<IOauthButtonProps> = ({icon, text, navigation, setErr}) => {
  const dispatch = useAppDispatch();
  const { toggleAuthorized } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async() => {
    if(text !== 'Demo'){
      alert("OAuth is disabled due to API pricing")
    } else{
      const form = { credential: "Joe.Smith@demo.com", password: "StrongDemoPassword!" }
      setIsLoading(true);
      Keyboard.dismiss();
      const res = await dispatch(login(form))
      if (res) {
        setIsLoading(false);
      }
      if (res.status !== 200) {
        const newErrors = [res.data.message];
        setErr(newErrors);
      } else {
        toggleAuthorized(true)
        navigation.navigate('Home')
    }
  }
}

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <FontAwesomeIcon icon={icon} size={20} />
        { isLoading && text === "Demo" ?
          <View style={{marginLeft: '35%'}}><ActivityIndicator size="small" color={colors.RESERVERED} /></View>
          :
          <Text style={styles.text}>{`Continue with ${text}`}</Text>
        }
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(100,100,100,1)'
  },
  text: {
    marginLeft: '25%'
  }
})

export default OAuthButton;
