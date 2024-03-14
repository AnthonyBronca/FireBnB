import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../constants/stylings/styles';
import { Image } from 'expo-image';
import houseList from '../../../assets/images/house-list.jpg'

interface IFirebnbCardProps {
    navigation: any;
}

const FirebnbCard:React.FC<IFirebnbCardProps> = ({navigation}) => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
        <View style={{width: 170, marginRight: 30}}>
            <View>
                <Text style={styles.heading}>
                    Firebnb your place
                </Text>
            </View>
            <Text style={styles.subText}>
                It's simple to get set up and start earning.
            </Text>
        </View>
        <View>
            <Image
                source={houseList}
                style={styles.house}
                />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 14,
        fontFamily: 'System',
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        height: 100,
        marginTop: 40
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    subText: fonts.subText,
    house: {
        height: 70,
        width: 80
    }
});

export default FirebnbCard;
