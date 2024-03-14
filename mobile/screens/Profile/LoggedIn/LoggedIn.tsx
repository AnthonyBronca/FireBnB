import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import Header from './components/Header';
import { User } from '../../../typings/redux';
import { useAppDispatch } from '../../../store';
import { logout } from '../../../store/session';
import AuthContext from '../../../context/AuthContext';

export interface ILoggedInProps {
    navigation: any;
    user: User | null;
}

const LoggedIn:React.FC<ILoggedInProps> = ({navigation, user}) => {
    const dispatch = useAppDispatch();
    const {toggleAuthorized} = useContext(AuthContext);

    const handleLogOut = async() => {
        const res = await dispatch(logout());
        if(res.resMsg === 'removed'){
            toggleAuthorized(false);
        } else{
        }
    }

  return (
    <View style={{marginHorizontal: 20, marginTop: 40}}>
        <Header navigation={navigation} user={user} />
        <Pressable onPress={handleLogOut}>
            <Text>Log out</Text>
        </Pressable>
    </View>
  );
}

export default LoggedIn;
