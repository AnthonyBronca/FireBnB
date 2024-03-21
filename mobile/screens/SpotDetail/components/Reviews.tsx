import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import * as filledFaStar from '@fortawesome/free-regular-svg-icons/faStar';
import { colors, fonts } from '../../../constants/stylings/styles';
import { ScrollView } from 'react-native-gesture-handler';
import SubDetail from './SubDetail';
import { IReviews, Review } from '../../../typings/redux';
import axios from 'axios';
import urlParser from '../../../utils/url-parser';

interface IReviewsProps {
    navigation: any;
    spot: any;
    reviews?: Review[];
}

const Reviews: React.FC<IReviewsProps> = ({navigation, spot, reviews}) => {

    const [seeMoreObj, setSeeMoreObj] = useState<any>({});
    const [spotReviews, setSpotReviews] = useState<IReviews>({Reviews: []});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);



    useEffect(() => {
        const fetchReviews = async(spotId:number) => {
            const res = await axios.get(urlParser(`/api/spots/${spotId}/reviews`));
            const data: IReviews = await res.data;
            setSpotReviews(data);
            setIsLoaded(true);
        }

        fetchReviews(spot.id)

    }, []);


    const handleSeeMore = (review: any) => {
        const newSeeMore: any = { ...seeMoreObj };
        if (!seeMoreObj[review.id]) {
            newSeeMore[review.id] = review;
            setSeeMoreObj(newSeeMore);
        }
    };


    const handleSeeLess = (review: any) => {
        const newSeeMore: any = { ...seeMoreObj };
        if (seeMoreObj[review.id]) {
            delete newSeeMore[review.id];
            setSeeMoreObj(newSeeMore);
        }
    };

    const makeStars = (stars:number): JSX.Element => {

        const iterationArr = Array(5).fill(null);

        return (
            <View style={styles.starsContainer}>
            {iterationArr.map((_el, idx) => (
                <View key={`${idx}-${new Date()}`}>
                    {idx < stars ?
                    <FontAwesomeIcon icon={faStar} size={10} />
                    :
                    <FontAwesomeIcon icon={filledFaStar.faStar} size={10} />
                    }
                </View>
            ))}
            <FontAwesomeIcon style={styles.reviewStar} icon={faCircle} size={3} />
            <Text style={styles.timePassed}>1 week ago</Text>
            </View>
        )
    };


    const goToReviews = (reviews: IReviews) => {
        navigation.navigate('Reviews', {
            reviews
        });
    };


if(!spotReviews || spotReviews.Reviews.length === 0){
    return null;
} else if(!isLoaded){
    return <ActivityIndicator style={{marginBottom: 20}} color={colors.LIGHT} />
}else if(isLoaded && spotReviews){
  return (
    <View style={styles.container}>
        <View style={styles.reviewContainer}>
            <FontAwesomeIcon size={15} icon={faStar} />
            <Text style={styles.reviewNum}>{`${spot.avgRating}`}</Text>
            <FontAwesomeIcon size={3} icon={faCircle} />
            <Text style={styles.reviewCount}>{`${reviews?.length} Reviews`}</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {spotReviews.Reviews.map((rev, idx) => (
                <View style={styles.reviewCard} key={`${rev.User.username}-${idx}`}>
                  {makeStars(rev.stars)}
                  <View style={styles.revSection}>
                    {!seeMoreObj[rev.id] ?
                        <View style={styles.textContainer}>
                            <Text style={styles.revText}>{`${rev.review[0]}...`}</Text>
                        </View>
                         :
                         <View style={styles.textContainer}>
                            <Text style={styles.revText}>{`${rev.review[1]}`}</Text>
                        </View>
                    }
                    {!seeMoreObj[rev.id] ?
                        <View style={styles.showMoreContainer}>
                            <Text style={styles.showMore} onPress={() => handleSeeMore(rev)}>See More...</Text>
                        </View>
                             :
                             <View style={styles.showMoreContainer}>
                            <Text style={styles.showMore} onPress={() => handleSeeLess(rev)}>See Less...</Text>
                        </View>
                    }
                    </View>
                    <SubDetail
                        style={styles.reviewUser}
                        title={rev.User.username}
                        spot={spot}
                        text={`${spot.city}, ${spot.state}`}
                        additionalDets={false}
                        rev={rev}
                        />
                </View>
            ))}
        </ScrollView>
        <TouchableOpacity activeOpacity={.5} onPress={()=> goToReviews(spotReviews)}>
            <View style={styles.showAllButton}>
                <Text>{`Show all ${spotReviews.Reviews.length} reviews`}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
}}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    reviewContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        marginLeft: 40
    },
    reviewNum: fonts.subHeader,
    reviewCount: fonts.subHeader,
    reviewCard: {
        borderWidth: 1,
        padding: 20,
        marginTop: 20,
        borderColor: 'rgb(200,200,200)',
        borderRadius: 10,
        marginHorizontal: 5,
        marginBottom:40,
        marginLeft: 25
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 1,
        marginBottom: 5,
        alignItems: 'center',
    },
    timePassed: {
        fontFamily: 'System',
        fontWeight: '500',
        fontSize: 12
    },
    reviewStar: {
        marginHorizontal: 5
    },
    revText: {
        ...fonts.defaultText,
        flexWrap: 'wrap',
    },
    showMore: {
        fontFamily: 'System',
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    showMoreContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    textContainer: {
        width: 250,
        marginTop: 5,
        marginBottom: 5
    },
    revSection: {
        flexDirection: 'column',
        height: 150,
    },
    showAllButton: {
        borderWidth: 1,
        borderColor: colors.BLACK,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 40
    },
    reviewUser: {
        flexDirection: 'row'
    }
})


export default memo(Reviews);
