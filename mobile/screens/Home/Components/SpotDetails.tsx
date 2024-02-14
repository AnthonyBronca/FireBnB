import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spot } from '../../../typings/redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fonts } from '../../../constants/stylings/styles'

interface ISpotDetails {
    spot: Spot
}


const SpotDetails:React.FC<ISpotDetails> = ({spot}) => {
    return (
    <View style={styles.spotDetailsView}>
        <View style={styles.spotDetailsContainer}>
            <Text style={styles.locationText}>{spot.city}, {spot.state}</Text>
            <Text style={styles.nameText}>{spot.name}</Text>
            <Text style={styles.dateText}>Feb 7 - 12</Text>
            <Text style={[styles.priceText, {fontWeight:'600'}]}>${spot.price} <Text style={{fontWeight: '400'}}>night</Text></Text>
        </View>
        <View>
            <Text style={styles.ratingText}><FontAwesomeIcon icon={faStar}/> {spot.avgRating}</Text>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    spotDetailsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 355,
        marginTop: 10
    },
    spotDetailsContainer: {
        height: 75,
    },
    locationText: {
        ...fonts.subHeader
    },
    nameText: {
        ...fonts.subHeader,
        color: '#505050'
    },
    dateText: {
        ...fonts.subHeader,
        color: '#505050'
    },
    ratingText: {
        ...fonts.subHeader,
        fontWeight: '400'
    },
    priceText: {
        ...fonts.subHeader,
    }
})

export default memo(SpotDetails);

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
