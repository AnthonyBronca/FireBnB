import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import * as filledFaStar from '@fortawesome/free-regular-svg-icons/faStar';
import { colors, fonts } from '../../../constants/stylings/styles';
import { ScrollView } from 'react-native-gesture-handler';
import SubDetail from './SubDetail';
import randomPerson from '../../../assets/images/random-person.jpg'


const Reviews: React.FC = () => {

    const [seeMoreObj, setSeeMoreObj] = useState<any>({});

    const dummyReviews = [
        {
            id: 1,
            username: 'AnthonyBronca',
            location: 'Orlando, Florida',
            review: 5,
            body: [
                "It was a very beautiful pineapple! I loved it! I",
                "It was a very beautiful pineapple! I loved it! I would love to stay here again. Bikini Bottom rules!"
            ]
        },
        {
            id: 2,
            username: 'KrystalKimmel',
            location: 'Chicago, Indiana',
            review: 4,
            body: [
                "This pineapple was very cute! My only gripe was that there was a squid next door",
                "This pineapple was very cute! My only gripe was that there was a squid next door playing his clarinet loudly. He was not that good. But this home was nice!"
            ]
        },
        {
            id: 3,
            username: 'Alexi_bettinger',
            location: 'Denver, Colorado',
            review: 3,
            body: [
                "I got stung by so many jellyfish here! Also, I don't live near an ocean so maybe i'm wrong",
                "I got stung by so many jellyfish here! Also, I don't live near an ocean so maybe i'm wrong, but why are the jellyfish flying?! Besides the talking wild animals, and stinging flying Jelly Fish, the house itself was beautiful! Especially in the sunset with the flowers lining the sky!"
            ]
        },
        {
            id: 4,
            username: 'SquidwardTortellini',
            location: 'Rome, Italy',
            review: 1,
            body: [
                "Boy do I have some reviews about this place.I didn't actually stay here, but",
                "Boy do I have some reviews about this place. I didn't actually stay here, but the person who owns this place is soooo annoying! What a total barnacle head! 'I'm ready.. I'm ready..' non-stop! Plus, I can smell the sweaty grease from my home next door. It's like the owner lives and breaths krabby patties. Don't even get me started on the star fish! The neighborhood itself can be pretty dangerous too! This one time, a giant anchor came falling from the sky and crashed through this pineapple! Also, the bubbles popping sound like massive explosions! Not to mention the US navy likes to test their nuclear capabilities on the atol slight above Bikini Hill not too far from here."]
        },
    ]


    const handleSeeMore = (review: any) => {
        const newSeeMore: any = { ...seeMoreObj }
        if (!seeMoreObj[review.id]) {
            newSeeMore[review.id] = review
            setSeeMoreObj(newSeeMore);
        }
    }


    const handleSeeLess = (review: any) => {
        const newSeeMore: any = { ...seeMoreObj }
        if (seeMoreObj[review.id]) {
            delete newSeeMore[review.id]
            setSeeMoreObj(newSeeMore)
        }
    }

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
    }


  return (
    <View style={styles.container}>
        <View style={styles.reviewContainer}>
            <FontAwesomeIcon size={15} icon={faStar} />
            <Text style={styles.reviewNum}>4.87</Text>
            <FontAwesomeIcon size={3} icon={faCircle} />
            <Text style={styles.reviewCount}>{dummyReviews.length}</Text>
        </View>
        <ScrollView horizontal={true}>
            {dummyReviews.map((rev, idx) => (
                <View style={styles.reviewCard} key={`${rev.username}-${idx}`}>
                  {makeStars(rev.review)}
                  <View style={styles.revSection}>
                    {!seeMoreObj[rev.id] ?
                        <View style={styles.textContainer}>
                            <Text style={styles.revText}>{`${rev.body[0]}...`}</Text>
                        </View>
                         :
                         <View style={styles.textContainer}>
                            <Text style={styles.revText}>{`${rev.body[1]}`}</Text>
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
                        title={rev.username}
                        img={randomPerson}
                        text={rev.location}
                        additionalDets={false}
                        />
                </View>
            ))}
        </ScrollView>
        <TouchableOpacity activeOpacity={.5}>
            <View style={styles.showAllButton}>
                <Text>{`Show all ${dummyReviews.length} reviews`}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40,
        marginVertical: 20,
    },
    reviewContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5
    },
    reviewNum: fonts.subHeader,
    reviewCount: fonts.subHeader,
    reviewCard: {
        borderWidth: 1,
        padding: 20,
        marginTop: 20,
        borderColor: 'rgb(200,200,200)',
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom:40
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
        marginBottom: 10
    },
    reviewUser: {
        flexDirection: 'row'
    }
})


export default Reviews;