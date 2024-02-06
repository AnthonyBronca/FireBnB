import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faMessage, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import NavBarTile from './NavBarTile';



interface IBottomTabs {
  navigation: any;
}

const BottomTabs:React.FC<IBottomTabs> = ({navigation}) => {

  const icons = {
    Home: true,
    Wishlists: false,
    Trips: false,
    Inbox: false,
    Profile: false
  }

  const [activeIcon, setActiveIcon] = useState<any>(icons);



  // const [homeState, setHomeState] = useState(true);
  // const [searchState, setSearchState] = useState(false);
  // const [micState, setMicState] = useState(false);
  // const [bellState, setBellState] = useState(false);
  // const [letterState, setLetterState] = useState(false);

  const clearIcons = () => {
   const keys = Object.keys(activeIcon);

    for(let key of keys){
      if(activeIcon[key]){
        activeIcon[key] = false;
        return ''
      }
    }
  }

  const handleIcons = (name: string) => {
    clearIcons()
    let newActive = {...activeIcon};
    newActive[name] = true;
    setActiveIcon(newActive);
    navigation.navigate(`${name}`)
  }



  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> handleIcons('Home')} activeOpacity={1}>
            {!activeIcon['Home']?
              <NavBarTile
                icon={faMagnifyingGlass}
                name='Explore'
                color='#8E8E8F'
                size={25}
                /> :
              <NavBarTile
                icon={faMagnifyingGlass}
                name='Explore'
                color='#FF375D'
                size={25}
              />
                }
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={()=>handleIcons('Wishlists')} activeOpacity={1} >
            {!activeIcon['Wishlists'] ?
              <NavBarTile
                icon={faHeart}
                name='Wishlists'
                color='#8E8E8F'
                size={25}
              /> :
              <NavBarTile
                icon={faHeart}
                name='Wishlists'
                color='#FF375D'
                size={25}
              />

            }
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={()=>handleIcons('Trips')} activeOpacity={1}>
            {!activeIcon['Trips'] ?
              <NavBarTile
                icon={faAirbnb}
                name='Trips'
                color='#8E8E8F'
                size={25}
                /> :
              <NavBarTile
                icon={faAirbnb}
                name='Trips'
                color='#FF375D'
                size={25}
              />

                }
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={()=>handleIcons('Inbox')} activeOpacity={1}>
            {!activeIcon['Inbox'] ?
              <NavBarTile
                icon={faMessage}
                name='Inbox'
                color='#8E8E8F'
                size={25}
                /> :
              <NavBarTile
                icon={faMessage}
                name='Inbox'
                color='#FF375D'
                size={25}
              />

                }
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={()=>handleIcons('Profile')} activeOpacity={1}>
            {!activeIcon['Profile'] ?
              <NavBarTile
                icon={faCircleUser}
                name='Log In'
                color='#8E8E8F'
                size={25}
                /> :
              <NavBarTile
                icon={faCircleUser}
                name='Log In'
                color='#FF375D'
                size={25}
              />
                }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 'auto',
    marginBottom: 10,
    paddingTop: 5,
    borderTopColor: 'rgb(200,200,200)',
    borderTopWidth: .5

  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center'
  },
  icon: {
    height: 30,
    width: 30
  }
})


export default BottomTabs;


// import React from 'react';
// import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { IconDefinition, faHeart, faMessage, faCircleUser } from '@fortawesome/free-regular-svg-icons';
// import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
// import SpotDetail from '../../SpotDetail';
// import Home from '..';
// import NavBarTile from './NavBarTile';
// // import Svg, {Path} from 'react-native-svg';
// // import Test from './Test';

// const Tab = createBottomTabNavigator();
// const home = "Home";
// const explore = "Explore";
// const wishlists = "Wishlists";
// const trips = "Trips";
// const inbox = "Inbox";
// const login = "Log In";

// let iconName:IconDefinition;

// const NavBar:React.FC = ():JSX.Element => {




//   return (
//     <View style={styles.container}>
//       <View style={styles.iconContainer}>
//         <TouchableOpacity>
//           <NavBarTile icon={faMagnifyingGlass} name={'Explore'} color={'#8E8E8F'} size={25}/>
//         </TouchableOpacity>
//       </View>
//     </View>
//     // <Tab.Navigator
//     //   initialRouteName={home}
//     //   screenOptions={({ route }) => ({
//     //     tabBarActiveTintColor:"#ff375d",
//     //     tabBarInactiveTintColor:"#8e8e8f",
//     //     headerShown: false,
//     //     tabBarIcon: ({ color }) => {
//     //       let routeName = route.name;

//     //       if (routeName === explore ) {
//     //         iconName = faMagnifyingGlass
//     //       }
//     //       if (routeName === wishlists) {
//     //         iconName = faHeart
//     //       }
//     //       if (routeName === trips) {
//     //         iconName = faAirbnb
//     //       }
//     //       if (routeName === inbox ) {
//     //         iconName = faMessage
//     //       }
//     //       if (routeName === login) {
//     //         iconName = faCircleUser
//     //       }
//     //     return <FontAwesomeIcon icon={iconName} color={color} size={25} />
//     //     },
//     //   })}>
//     //   <Tab.Screen name={explore} component={Home} />
//     //   <Tab.Screen name={wishlists} component={SpotDetail} />
//     //   <Tab.Screen name={trips} component={SpotDetail} />
//     //   <Tab.Screen name={inbox} component={SpotDetail} />
//     //   <Tab.Screen name={login} component={SpotDetail} />
//     // </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignContent: 'flex-end',
//     borderTopColor: 'rgb(200,200,200)',
//     borderTopWidth: .5,
//   },
//   iconContainer: {
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     backgroundColor: 'orange',
//   }
// })

// export default NavBar;
