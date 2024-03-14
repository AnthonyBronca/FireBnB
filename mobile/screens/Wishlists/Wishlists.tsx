import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../../components/BottomTabs';


interface IWishlistsProps {
    navigation: any;
}

const Wishlists:React.FC<IWishlistsProps> = ({navigation}) => {


    // const imageData = [
    //     "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    //     "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
    //     "https://cdn11.bigcommerce.com/s-g95xg0y1db/images/stencil/1280x1280/g/modern%20house%20plan%20-%20carbondale__05776.original.jpg",
    //     "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg"
    // ]

  return (
        <SafeAreaView style={styles.container}>
            <View style={styles.underConstruction}>
                <Text style={styles.text}>Under Construction!</Text>
            </View>
            <Image
                contentFit={'contain'}
                autoplay={true}
                style={styles.imagePlaceHolder}
                source={{ uri: "https://i.pinimg.com/originals/d6/33/67/d633676505858a38c93ef19c1fb41ad1.jpg" }}
            />
            <BottomTabs navigation={navigation} screen={'Wishlists'} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagePlaceHolder: {
        height: 300,
        width: 400,
        flex: 1
    },
    underConstruction: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    text: {
        fontFamily: 'System',
        fontWeight: 'bold',
        fontSize: 25
    }
})


export default Wishlists;
