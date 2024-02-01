import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, faHeart } from '@fortawesome/free-regular-svg-icons';
import Test from './Test';


const Tab = createBottomTabNavigator();
const home = "Home";
const explore = "Explore";
const wishlists = "Wishlists";
const trips = "Trips";
const inbox = "Inbox";
const login = "Log In";
let iconName:IconDefinition;


const NavBar:React.FC = ():JSX.Element => {
  return (
      <Tab.Navigator initialRouteName={home} screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let rn = route.name;
      
          if (rn === explore && focused) {
            iconName = faMagnifyingGlass
            color = "#ff375d"
          } 
          if (rn === wishlists && focused) {
            iconName = faHeart
            color = "#ff375d"
          }
          if (rn === trips && focused) {
            iconName = faHeart
            color = "#ff375d"
          }
          if (rn === inbox && focused) {
            iconName = faHeart
            color = "#ff375d"
          }
          if (rn === login && focused) {
            iconName = faHeart
            color = "#ff375d"
          }
          return <FontAwesomeIcon icon={iconName} color={color} size={size} />
        }
      })}>
        <Tab.Screen name={explore} component={Test} />
        <Tab.Screen name={wishlists} component={Test} />
      </Tab.Navigator>
  );
}

export default NavBar;
