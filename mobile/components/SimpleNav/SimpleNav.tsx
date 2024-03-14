import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface ISimpleNav {
  navigation: any;
}

const SimpleNav:React.FC<ISimpleNav> = ({navigation}) => {
    const goBack = () => {
      navigation.navigate('Home')
    }

  return (
    <View>
        <Pressable onPress={goBack}>
            <Text>go back</Text>
        </Pressable>

    </View>
  );
}

export default SimpleNav;
