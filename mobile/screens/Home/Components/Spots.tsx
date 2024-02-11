import React, {memo, useEffect, useState} from 'react';
import { View, Pressable, StyleSheet, ActivityIndicator, Text} from 'react-native';
import SpotDetails from '../../Home/Components/SpotDetails'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { colors, fonts } from '../../../constants/stylings/styles';
import { Spot } from '../../../typings/redux';
import { Image } from 'expo-image';
import { FlatList } from 'react-native-gesture-handler';
import { useGetPaginatedSpotsQuery } from '../../../store/api';


interface IHome {
    navigation: any
};

interface IHeartPressed {
    [key:number]: boolean
};


const Spots:React.FC<IHome> = ({navigation}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState<Spot[]>([]);
    const [isHeartPressed, setIsHeartPressed] = useState<IHeartPressed>({});
    const size=10

    const { data: spots, isLoading, isFetching } = useGetPaginatedSpotsQuery({page:currPage,size});

    useEffect(() => {
        if (!isLoading && spots) {
            setPaginatedData(prevData => [...prevData, ...spots.Spots]);
        }
    }, [isLoading, spots, currPage]);

    console.log("PAGINATED DATA", paginatedData)

  

    const handleLoadMore = () => {
        setCurrPage(prevPage => prevPage + 1);    
    };
   
    const goToSpotDetail = (spot: Spot) => {
        navigation.navigate('SpotDetail', {
            spot,
        })
    };

       const toggleHeartPress = (spotId:number) => {
        setIsHeartPressed(prev => ({
            ...prev,
            [spotId]: !prev[spotId]
        }));
    };


    const renderSpots = ({ item }: { item: Spot }) => {
        return (
          <View style={styles.spotImageView}>
            <Pressable style={styles.spotImageContainer} onPress={() => goToSpotDetail(item)}>
            <View style={styles.heartContainer}>
                <View>
                    {item.id % 2 === 0 && (
                        <View style={styles.guestFavContainer}>
                            <Text style={styles.guestFavText}>Guest favorite</Text>
                        </View>
                    )}
                </View>
                <Pressable style={styles.heartIcon} onPress={() => toggleHeartPress(item.id)}>
                <FontAwesomeIcon
                    icon={faHeart}
                    size={25}
                    color={isHeartPressed[item.id] ? '#FF385B' :'#535350'}
                    />
                </Pressable>
            </View>
              <Image style={styles.image} source={{ uri: item.previewImage }} />
              <SpotDetails spot={item} />
            </Pressable>
          </View>
        );
    };


    const renderLoading = () => {
        if (!isFetching && paginatedData.length === 0) {
            return null;
        }
        return isLoading ? <View><ActivityIndicator size="large" color={colors.RESERVERED} /></View> : null;
    };


    return (     
        <FlatList
            data={paginatedData}
            renderItem={renderSpots}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderLoading}
        />
    );
};


const styles = StyleSheet.create({
    spotImageView: {
        alignItems: 'center',
        marginTop: 20,
        overflow: 'hidden'
    },
    spotImageContainer: {
        width: 355,
        height: 450,
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    image: {
        width: 355,
        height: 355,
        objectFit: 'fill',
        borderRadius: 10,
        backgroundColor:'#FFFFFF',
    },
    heartContainer: {
        position: 'absolute',
        top: 15,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 355,
    },
    heartIcon: {
        marginHorizontal: 15
    },
    guestFavContainer: {
        backgroundColor: "#FBFBFB",
        borderColor: '#A19F9D',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 125,
        height: 25,
        marginHorizontal: 15
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