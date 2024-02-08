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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 375,
        marginTop: 10
    },
    spotDetailsContainer: {
        height: 75,
    },
    rating: {
    }
})

export default SpotDetails;

/*
[
"address": "71720 Laron Plains",
"avgRating": "NEW",
"city": "Dublin",
"country": "United States",
"createdAt": "2024-1-6",
"description": "Great place to stay when you want to get away from it all",
"id": 20,
"lat": "-41.946337",
"lng": "-29.062167",
"name": "Cuban-style home",
"ownerId": 3, "previewImage":
"https://harbr.de/fileadmin/_processed_/a/1/csm_harbr_boardinghouse_ludwigsburg_apartment_comfort_02_8fdc0763bd.jpg",
"price": 62,
"reviews": [],
"state":
"Wisconsin",
"updatedAt":
"2024-1-6",
"userId": 3}
]

*/