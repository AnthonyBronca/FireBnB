import React, {useRef} from 'react';
import {ScrollView, Animated, StyleSheet} from 'react-native';
import pineapple from '../../../assets/images/pineapple.jpg'
import TopNav from './TopNav';


interface IDynamicHeader {
    val: any;
    img: any; //change this to be a string when redux is added
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
                source={img}
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
}

const AnimatedNav:React.FC<INewNav> = ({navigation, children}) => {

    const scrollOffSetY = useRef(new Animated.Value(0)).current;

    return (
    <>
        <TopNav navigation={navigation} val={scrollOffSetY}/>
        <DynamicHeader val={scrollOffSetY} img={pineapple}/>
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
        // justifyContent: 'center',
        // alignItems: 'center',
        // left: 0,
        // right: 0,
        // paddingTop: 25,
        // height: 3
    },
    container: {

    },
})

export default AnimatedNav;
