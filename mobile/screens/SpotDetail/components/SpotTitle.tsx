import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../../constants/stylings/styles';
import SpotSpecs from '../../../components/SpotSpecs';
import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons/faStar';
import { Spot } from '../../../typings/redux';

interface ISpotTile {
    spot: Spot
};

const SpotTitle:React.FC<ISpotTile> = ({spot}) => {
  return (
    <View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{spot.name}</Text>
        </View>
        <View style={styles.mainContainer}>
            <Text style={styles.subheader}>
                {`${spot.description[1]} located in ${spot.city}, ${spot.state}`}
            </Text>
            <View style={styles.spotSpecView}>
                <SpotSpecs style={styles.detail} count={8} info='guests'/>
                <FontAwesomeIcon style={styles.dot} size={3} icon={faCircle} />
                <SpotSpecs style={styles.detail} count={4} info='bedrooms'/>
                <FontAwesomeIcon style={styles.dot} size={3} icon={faCircle} />
                <SpotSpecs style={styles.detail} count={5} info='beds'/>
                <FontAwesomeIcon style={styles.dot} size={3} icon={faCircle} />
                <SpotSpecs style={styles.detail} count={2} info='baths'/>
            </View>
            <View style={styles.reviewContainer}>
                <FontAwesomeIcon size={10} icon={faStar} />
                <Text style={styles.reviewNum}>{spot.avgRating}</Text>
                <FontAwesomeIcon size={3} icon={faCircle} />
                  <Text style={styles.reviewCount}>{spot.reviews && spot.reviews.length > 0 ?
                `${spot.reviews.length} reviews`:
                'No reviews yet!'}</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    title: fonts.header,
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 40,
    },
    subheader: fonts.subHeader,
    mainContainer: {
        marginLeft: 40,
        marginTop: 20
    },
    detail: fonts.detailText,
    spotSpecView: {
        flexDirection: 'row',

    },
    dot: {
        marginRight: 5,
        top: 5
    },
    reviewContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    reviewNum: {
        fontSize: 12,
        fontWeight: 'bold',
        marginHorizontal: 5
    },
    reviewCount: {
        marginLeft: 10,
        fontWeight: '500',
        fontFamily: 'System',
        textDecorationLine: 'underline'
    }
});


export default memo(SpotTitle);