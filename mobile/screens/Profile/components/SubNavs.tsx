import { Image, ImageSource} from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface ISubNavsProps {
    navigation: any;
    icon?:IconDefinition;
    iconImage?: ImageSource
    text: string;
    to: string;
}

const SubNavs: React.FC<ISubNavsProps> = ({navigation, icon, iconImage, text, to}) => {

  const handlePress = () => {
    console.log('pressed')
    // navigation.navigate(to);
  }

  return (
      <Pressable
          onPress={() => {
              handlePress
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
        <View style={styles.container}>
            <View style={{flexDirection: 'row', gap: 10, alignContent: 'center'}}>
                {iconImage && (
                    <Image
                    style={styles.iconImageStyle}
                    source={iconImage}
                    />
                    )}
                {icon && (
                    <FontAwesomeIcon
                        style={styles.iconImageStyle}
                        icon={icon}
                        size={20}
                        />
                    )}
                    <Text style={styles.text}>{text}</Text>
            </View>
            <View>
                <FontAwesomeIcon icon={faChevronRight} size={10} />
            </View>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    iconImageStyle: {
        height: 22,
        width: 22,
    },
    text: {
        fontFamily: 'System',
        fontSize: 15
    }
})

export default SubNavs;
