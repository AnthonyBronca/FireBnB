import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

const SimpleNav = () => {
    const navigate = useNavigation();
    const goBack = () => {
        navigate.goBack();
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
