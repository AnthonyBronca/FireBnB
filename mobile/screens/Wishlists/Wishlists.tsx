import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from '../../components/Carousel';
import { Image } from 'expo-image';



const Wishlists = () => {


    const imageData = [
        "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
        "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
        "https://cdn11.bigcommerce.com/s-g95xg0y1db/images/stencil/1280x1280/g/modern%20house%20plan%20-%20carbondale__05776.original.jpg",
        "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg"
    ]





  return (
    <Carousel>
        {imageData.map((img, idx) => (
            <Image
                key={`${idx}-${img}`}
                source={{uri: img}}
                placeholder={{uri: img}}
                style={styles.image}
            />
        ))}
    </Carousel>
  );
}

const styles = StyleSheet.create({
    image:{
        flexDirection: 'row',
        flex: 1,
        height: 250
    }
})


export default Wishlists;
