import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spot } from '../../../typings/redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface ISpotDetails {
    spot: Spot
}


const SpotDetails:React.FC<ISpotDetails> = ({spot}) => {
    return (
    <View style={styles.spotDetailsView}>
        <View style={styles.spotDetailsContainer}>
            <Text>{spot.city}, {spot.state}</Text>
            <Text>Feb 7 - 12</Text>
            <Text>${spot.price} <Text>night</Text></Text>
        </View>
        <View style={styles.rating}>
            <Text><FontAwesomeIcon icon={faStar}/> {spot.avgRating}</Text>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    spotDetailsView: {
        // backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 375,
        marginTop: 10
    },
    spotDetailsContainer: {
        // backgroundColor: 'blue',
        height: 75,
    },
    rating: {
        // backgroundColor: 'green'
    }
})

export default SpotDetails;