import React, { memo, useState } from 'react';
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


export default memo(BottomTabs);
