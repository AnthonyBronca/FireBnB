import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { fonts } from '../../../constants/stylings/styles';


interface IHeaderProps {
    navigation: any;
};

const Header:React.FC<IHeaderProps> = ({navigation}) => {
    const handleGoBack = () => {
        navigation.goBack();
    };


  return (
    <View style={styles.container}>
        <Pressable onPress={handleGoBack}>
            <FontAwesomeIcon icon={faX} size={10} />
        </Pressable>
        <Text style={styles.text}>Log in or sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 115,
        marginHorizontal: 20,
        alignContent: 'center',
        alignItems: 'center'
    },
    text: fonts.subHeader
})

export default Header;
