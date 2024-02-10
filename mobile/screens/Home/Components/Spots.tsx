import React, {memo, useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { View, ScrollView, Text, Pressable, StyleSheet, ActivityIndicator} from 'react-native';
import { fetchSpots } from '../../../store/spots';
import SpotDetails from '../../Home/Components/SpotDetails'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { colors, fonts } from '../../../constants/stylings/styles';
import { Spot } from '../../../typings/redux';
import { Image } from 'expo-image';

interface IHome {
    navigation: any
};

interface IHeartPressed {
    [key:number]: boolean
}


const Spots:React.FC<IHome> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const allSpots = useAppSelector((state) => state.spots.allSpots);
    const [isLoaded, setIsLoaded] = useState(false);
    const date = new Date().getDate();
    const sec = new Date().getSeconds();
    const [isHeartPressed, setIsHeartPressed] = useState<IHeartPressed>({});

    useEffect(() => {
        const getInfo = async() => {
            await dispatch(fetchSpots());
            setIsLoaded(true);
        }
        getInfo()
    }, [dispatch]);

    const toggleHeartPress = (spotId:number) => {
        setIsHeartPressed(prev => ({
            ...prev,
            [spotId]: !prev[spotId]
        }));
    };

    const goToSpotDetail = (spot: Spot) => {
        navigation.navigate('SpotDetail', {
            spot,
        })
    };

    if(!isLoaded){
        return <ActivityIndicator
        style={styles.loading}
        size="large"
        color={colors.RESERVERED}/>
    }

    return (
    <ScrollView>
        {allSpots?.map((spot, idx) => (
            <View
                key={`spot-${idx}-${date}-${sec}`}
                style={styles.spotImageView}
            >
            <Pressable
                style={styles.heartIcon}
                onPress={() => toggleHeartPress(spot.id)}
                >
                {idx % 2 === 0 && (
                    <View style={styles.guestFavContainer}>
                        <Text style={styles.guestFavText}>Guest favorite</Text>
                    </View>
                )}
                <FontAwesomeIcon
                    icon={faHeart}
                    size={25}
                    color={isHeartPressed[spot.id] ? '#FF385B' :'#535350'}
                    />
            </Pressable>
            <Pressable
                style={styles.spotImageContainer}
                onPress={()=> goToSpotDetail(spot)}
            >
                <Image
                    style={styles.image}

                    source={{ uri: spot.previewImage}}
                />
                <SpotDetails spot={spot}/>
            </Pressable>
        </View>
        ))}
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    spotImageView: {
        alignItems: 'center',
        marginTop: 20
    },
    spotImageContainer: {
        width: 375,
        height: 460,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    image: {
        width: 375,
        height: 375,
        objectFit: 'fill',
        borderRadius: 10,
        backgroundColor:'#FFFFFF',
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 45,
        zIndex: 1
    },
    guestFavContainer: {
        backgroundColor: "#FBFBFB",
        borderColor: '#A19F9D',
        borderRadius: 20,
        position: 'absolute',
        right: 220,
        justifyContent: 'center',
        alignItems: 'center',
        width: 125,
        height: 25,
    },
    guestFavText: {
        ...fonts.subHeader
    },
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default memo(Spots);
