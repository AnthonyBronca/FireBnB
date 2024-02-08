import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { View, ScrollView, Image, Pressable, StyleSheet } from 'react-native';
import { fetchSpots } from '../../../store/spots';
import SpotDetails from '../../Home/Components/SpotDetails'



interface IHome {
    navigation: any
};




const Spots:React.FC<IHome> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const allSpots = useAppSelector((state) => state.spots.allSpots);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const date = new Date().getDate();
    const sec = new Date().getSeconds();


    useEffect(() => {
        const getInfo = async() => {
            await dispatch(fetchSpots())
            setIsLoaded(true)
        }
        getInfo()
    }, [isLoaded]);

    const goToSpotDetail = () => {
        navigation.push('SpotDetail')
    };

    return (
    <ScrollView>
        {allSpots?.map((spot) => (
            <View 
                key={`spot-${spot.id}-${date}-${sec}`}
                style={styles.spotImageView}>
            <Pressable
                style={styles.spotImageContainer} 
                onPress={goToSpotDetail}
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
}
});

export default Spots;
