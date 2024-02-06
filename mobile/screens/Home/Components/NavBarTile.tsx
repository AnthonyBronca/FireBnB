import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';


interface INavBarTile{
    icon: IconDefinition;
    name: string;
    color: string;
    size: number;
}


const NavBarTile: React.FC<INavBarTile> = ({icon, name, color, size}) => {
  return (
    <View style={styles.container}>
        <FontAwesomeIcon icon={icon} color={color} size={size} />
        <Text style={{color: `${color}`}}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default NavBarTile;
