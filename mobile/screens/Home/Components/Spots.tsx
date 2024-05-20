import React, {memo, useCallback, useEffect, useState} from 'react';
import { View, Pressable, StyleSheet, ActivityIndicator, Text} from 'react-native';
import SpotDetails from '../../Home/Components/SpotDetails'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { colors, fonts } from '../../../constants/stylings/styles';
import { Spot } from '../../../typings/redux';
import { Image } from 'expo-image';
import { FlatList } from 'react-native-gesture-handler';
import { getAllPaginatedSpots } from '../../../store/spots';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getUser } from '../../../storage/storage';
import { createLike, fetchLikes } from '../../../store/likes';


interface IHome {
    navigation: any
};

interface IHeartPressed {
    [key:number]: boolean
};


const Spots:React.FC<IHome> = ({navigation}) => {
    const dispatch = useAppDispatch();

    const [user, setUser] = useState<any>(null);
    useEffect(() => {

        const retrieveUser = async () => {
            const { user } = await getUser();
            if (user !== "No user stored") {
                setUser(user);
            }
        }
        if (!user) {
            retrieveUser();
        }
    },)

    const userLikes = useAppSelector((state) => state.likes.byId);

    const [currPage, setCurrPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState<Spot[]>([]);
    const [isHeartPressed, setIsHeartPressed] = useState<IHeartPressed>({});
    const [isLoading, setIsLoading] = useState(false);
    const size=10
    const paginatedSpots = useAppSelector(state => state.spots.allSpots)

    useEffect(() => {
        setIsLoading(true);
        dispatch(getAllPaginatedSpots({page:currPage, size}))
        .then(() => paginatedSpots && setPaginatedData((prev) => [...prev, ...paginatedSpots]))

        dispatch(fetchLikes(user?.id))
        .then((res:any)=> console.log(res))
        .then(()=> setIsLoading(false));

    }, [dispatch, currPage]);

    const handleLoadMore = () => {
        if (!isLoading && paginatedSpots && paginatedSpots.length >= size) {
            setCurrPage(prevPage => prevPage + 1);
        }
    };

    const goToSpotDetail = (spot: Spot) => {
        navigation.navigate('SpotDetail', {
            spot,
        })
    };

    const toggleHeartPress = (spotId:number) => {
        if(user && user.id){
            if(userLikes && userLikes[spotId]){
                // remove like
            } else{
                let userId = user.id;
                const data = {spotId, userId}
                dispatch(createLike(data));
                //set like
            }
            let userId = user.id;
            const data = {spotId, userId}
        }
            // setIsHeartPressed((prev) => {
            // })
            // console.log(spotId)
        // setIsHeartPressed(prev => ({
        //     ...prev,
        //     [spotId]: !prev[spotId]
        // }));
        // console.log(isHeartPressed)
    };


    // const handleUnlike = (e: any, spot: any) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     // if (user) {
    //     //     dispatch(removeLikeThunk(user.id, spot.id))
    //     // }
    // }

    const renderSpots = useCallback(({ item }: { item: Spot }) => {
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
                    size={27}
                    color={'white'}
                    style={{padding: 0, margin: 0, zIndex: 4}}
                    />
                {/* {
                    userLikes && userLikes[item.id] ?
                    <FontAwesomeIcon
                        icon={faHeart}
                        size={25}
                        style={{ bottom: 26, zIndex: 5, left: 1 }}
                        color={'#FF385B'}
                    />
                    :
                    <FontAwesomeIcon
                        icon={faHeart}
                        size={25}
                        style={{ bottom: 26, zIndex: 5, left: 1 }}
                        color={'#535350'}
                    /> */}
                {/* } */}
                <FontAwesomeIcon
                    icon={faHeart}
                    size={25}
                    style={{bottom: 26, zIndex: 5, left: 1}}
                    color={userLikes && userLikes[item.id] ? '#FF385B' :'#535350'}
                    />
                </Pressable>
            </View>
              <Image style={styles.image} source={{ uri: item.previewImage }} />
              <SpotDetails spot={item} />
            </Pressable>
          </View>
        );
    }, []);

    const renderLoading = () => {
        if (isLoading && !paginatedData.length) {
            return <View><ActivityIndicator size="large" color={colors.RESERVERED} /></View>;
        } else if (isLoading) {
            return <View><ActivityIndicator size="large" color={colors.RESERVERED} /></View>;
        }
        return null;
    };


    return (
        <FlatList
            data={paginatedData}
            keyExtractor={(item, index) => `${item.id}-${index}-${new Date()}`}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.8}
            initialNumToRender={10}
            ListFooterComponent={renderLoading}
            renderItem={renderSpots}
            showsVerticalScrollIndicator={false}
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
