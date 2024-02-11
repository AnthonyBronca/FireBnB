import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';



interface ICarouselProps {
    children: ReactNode;
}

const Carousel:React.FC<ICarouselProps> = ({children}) => {




  return (
    children
  );
}

const style= StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export default Carousel;
