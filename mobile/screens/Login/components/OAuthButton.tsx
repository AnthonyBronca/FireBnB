import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';

interface IOauthButtonProps {
  icon: IconDefinition;
  text: string;
}

const OAuthButton:React.FC<IOauthButtonProps> = ({icon, text}) => {

  const handlePress = () => {
    if(text !== 'Demo'){
      alert("OAuth is disabled due to API pricing")
    }
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <FontAwesomeIcon icon={icon} size={20} />
        <Text style={styles.text}>{`Continue with ${text}`}</Text>
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
