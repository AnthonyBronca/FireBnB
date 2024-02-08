import React, {memo, useRef} from 'react';
import {ScrollView, Animated, StyleSheet} from 'react-native';
import pineapple from '../../../assets/images/pineapple.jpg'
import TopNav from './TopNav';
import { Spot } from '../../../typings/redux';

interface IDynamicHeader {
    val: any;
    img: string; //change this to be a string when redux is added
}

const DynamicHeader:React.FC<IDynamicHeader> = ({val, img}) => {

    const header_max = 200;
    const header_min = 100;

    const scroll_distance = (header_max - header_min);


    const animatedHeaderHeight = val.interpolate({
        inputRange: [0, scroll_distance],
        outputRange: [header_max, header_min],
        extrapolate: 'clamp'
    })

    const animatedHeadercolor = val.interpolate({
        inputRange: [0, scroll_distance],
        outputRange: ["transparent", "transparent"],
        extrapolate: 'clamp'
    })

    const animatedOpacity = val.interpolate({
        inputRange: [1, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const animatedBottomBorderColor = val.interpolate({
        inputRange: [0, 100],
        outputRange: ["transparent", "rgb(200,200,200)"],
        extrapolate: 'clamp'
    })
    const animatedBottomBorder = val.interpolate({
        inputRange: [0,100],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })


    return (
        <Animated.View
            style={[styles.header,
            {
                height: animatedHeaderHeight,
                backgroundColor: animatedHeadercolor,
                marginBottom: 10,
                borderBottomColor: animatedBottomBorderColor,
                borderBottomWidth: animatedBottomBorder,
            }
            ]}
        >
            <Animated.Image
                source={{uri:img}}
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: animatedHeaderHeight,
                    opacity: animatedOpacity
                }}
            />
        </Animated.View>
    )
}


interface INewNav {
    navigation: any;
    children: any;
    spotHeader: string
}

const AnimatedNav:React.FC<INewNav> = ({navigation, children, spotHeader}) => {

    const scrollOffSetY = useRef(new Animated.Value(0)).current;

    return (
    <>
        <TopNav navigation={navigation} val={scrollOffSetY}/>
        <DynamicHeader val={scrollOffSetY} img={spotHeader}/>
        <ScrollView
        style={styles.container}
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([{
                nativeEvent: { contentOffset: {y: scrollOffSetY}}
            }], {useNativeDriver: false})}>
                {children}
        </ScrollView>
   </>
  );
}

const styles = StyleSheet.create({
    header: {

    },
    container: {

    },
})

export default memo(AnimatedNav);
