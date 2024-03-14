import React from 'react';
import { View, Text } from 'react-native';
import Header from './components/Header';
import { User } from '../../../typings/redux';

export interface ILoggedInProps {
    navigation: any;
    user: User | null;
}

const LoggedIn:React.FC<ILoggedInProps> = ({navigation, user}) => {

  return (
    <View style={{marginHorizontal: 20, marginTop: 40}}>
        <Header navigation={navigation} user={user} />
    </View>
  );
}

export default LoggedIn;
