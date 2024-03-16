import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Header from './components/Header';
import { User } from '../../../typings/redux';
import { useAppDispatch } from '../../../store';
import { logout } from '../../../store/session';
import AuthContext from '../../../context/AuthContext';
import FirebnbCard from '../components/FirebnbCard';
import SubNavs from '../components/SubNavs';
import { faBell, faCircleUser } from '@fortawesome/free-regular-svg-icons';

import paymentIcon from '../../../assets/icons/payment-icon.png';
import securityIcon from '../../../assets/icons/security-icon.png';
import fileIcon from '../../../assets/icons/file-icon.png';
import eyeIcon from '../../../assets/icons/eye-icon.png'

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
            navigation.navigate('Home')
        }
    }

  return (
    <View style={{marginHorizontal: 20, marginTop: 40}}>
        <Header navigation={navigation} user={user} />
        <FirebnbCard navigation={navigation} />
        <View style={{marginTop: 10, marginBottom: 15}}>
            <Text style={styles.settings}>Settings</Text>
        </View>
        <View style={styles.subNavContainer}>
            <SubNavs
                navigation={navigation}
                text='Personal Information'
                icon={faCircleUser}
                to='Home'
                />
            <SubNavs
                navigation={navigation}
                text='Manage Bookings'
                iconImage={paymentIcon}
                to='Home'
                />
            <SubNavs
                navigation={navigation}
                text='Login & Security'
                iconImage={securityIcon}
                to='Home'
                />
            <SubNavs
                navigation={navigation}
                text='Listing Management'
                iconImage={fileIcon}
                to='Home'
                />
            <SubNavs
                navigation={navigation}
                text='Notifications'
                icon={faBell}
                to='Home'
                />
            <SubNavs
                navigation={navigation}
                text='Reviews'
                iconImage={eyeIcon}
                to='Home'
                />
        </View>
          <Pressable onPress={() => {
              handleLogOut()
          }}
              style={({ pressed }) => [
                  {
                      backgroundColor: pressed ? 'rgba(200,200,200,.5)' : 'rgba(255,255,255,0)',
                  },
                  {
                      height: 30,
                      paddingTop: 10
                  }
              ]}>
            <Text style={styles.logOutText}>Log out</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    settings: {
        fontFamily: 'System',
        fontWeight: '500',
        fontSize: 18
    },
    subNavContainer: {
        marginBottom: 50,
        gap: 10
    },
    logOutText: {
        fontFamily: 'System',
        textDecorationLine: 'underline',
    }
})

export default LoggedIn;
