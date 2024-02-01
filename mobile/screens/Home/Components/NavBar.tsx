import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, faHeart, faMessage, faCircleUser} from '@fortawesome/free-regular-svg-icons';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
// import Svg, {Path} from 'react-native-svg';
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
    <Tab.Navigator 
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor:"#ff375d",
        tabBarInactiveTintColor:"#8e8e8f",
        tabBarIcon: ({ color }) => {
          let rn = route.name;

          if (rn === explore ) {
            iconName = faMagnifyingGlass
          } 
          if (rn === wishlists) {
            iconName = faHeart
          }
          if (rn === trips) {
            iconName = faAirbnb
          }
          if (rn === inbox ) {
            iconName = faMessage
          } 
          if (rn === login) {
            iconName = faCircleUser
          } 
        return <FontAwesomeIcon icon={iconName} color={color} size={25} />
        },
      })}>
      <Tab.Screen name={explore} component={Test} />
      <Tab.Screen name={wishlists} component={Test} />
      <Tab.Screen name={trips} component={Test} />
      <Tab.Screen name={inbox} component={Test} />
      <Tab.Screen name={login} component={Test} />
    </Tab.Navigator>
  );
}

export default NavBar;