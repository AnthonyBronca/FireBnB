import React, { memo, useRef} from 'react';
import { ScrollView, View, StyleSheet,Text, Animated} from 'react-native';
import SpotTitle from './components/SpotTitle';
import {Divider, ImageProps} from 'react-native-elements'
import SubDetail from './components/SubDetail';
import BottomReserve from './components/BottomReserve';
// import randomPerson from '../../assets/images/random-person.jpg';
import door from '../../assets/images/door.png';
import superhost from '../../assets/images/superhost.png';
import calendar from '../../assets/images/calendar.png';
import DetailParagraph from './components/DetailParagraph';
import pineapple from '../../assets/images/pineapple.jpg';
import SpotImages from './components/SpotImages';
import placeholder1 from './../../assets/placeholders/placeholder1.png'
import placeholder2 from './../../assets/placeholders/placeholder2.png'
import placeholder3 from './../../assets/placeholders/placeholder3.png'
import placeholder4 from './../../assets/placeholders/placeholder4.png'
import { fonts } from '../../constants/stylings/styles';
import AnimatedNav from './components/AnimatedNav';
import Reviews from './components/Reviews';
import { Spot } from '../../typings/redux';

interface ISpotDetail {
  navigation:any;
  route: any;
}



const SpotDetail:React.FC<ISpotDetail> = ({route, navigation}):JSX.Element => {
  const spot:Spot = route.params.spot;


  const scrollOffSetY = useRef(new Animated.Value(0)).current;
  const moveUpMax = 200;
  const moveUpMin = 100;
  const scrollDistance = moveUpMax - moveUpMin;

  const animatedScrollViewHeight = scrollOffSetY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [200, 300],
    extrapolate: 'clamp'
  })


  const imagePlaceHolders = [
    pineapple,
    placeholder1,
    placeholder2,
    placeholder3,
    placeholder4
  ]


  return (
    <View style={styles.screenContainer}>
      <AnimatedNav
        navigation={navigation}
        spotHeader={spot.previewImage}
        >
      <ScrollView>
      <View style={styles.titleContainer}>
        <SpotTitle spot={spot}/>
      </View>
        <View style={styles.contentContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
        <SubDetail
            spot={spot}
            title={`Hosted By ${spot.Owner.firstName}`}
            text='4 years hosting'
            additionalDets={false}
            />
        <View style={styles.contentContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
          <View style={styles.additionalDetsContainer}>
            <SubDetail
              spot={spot}
              title="Self check-in"
              text='Check yourself in.'
              additionalDets={true}
              img={door} />
          </View>
          <View style={styles.additionalDetsContainer}>
            <SubDetail
              spot={spot}
              title={`${spot.Owner.firstName} is a superhost`}
              text='Superhosts are experienced, highly rated Hosts.'
              additionalDets={true}
              img={superhost} />
          </View>
          <View style={styles.additionalDetsContainer}>
            <SubDetail
              spot={spot}
              title="Free Cancellation for 48 hours"
              text='Easy cancellation process.'
              additionalDets={true}
              img={calendar} />
          </View>
        <View style={styles.sectionContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
        <DetailParagraph details={[spot.description, "fix me"]}/>
        <View style={styles.sectionContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
        <Text style={[fonts.header, {marginLeft: 40, marginBottom: 10}]}>Where you'll be staying</Text>
        <ScrollView
          horizontal={true}
          snapToInterval={3}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          >
          <SpotImages images={imagePlaceHolders}/>
        </ScrollView>
        <View style={styles.sectionContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
        <Reviews navigation={navigation} spot={spot} />
        <View style={styles.sectionContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
      </ScrollView>
        </AnimatedNav>
        <BottomReserve price={364} dateRange='Feb 23 - 28' />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    marginHorizontal: 40,
    marginBottom: 20
  },
  screenContainer: {
    flex: 1
  },
  additionalDetsContainer: {
    marginBottom: 20
  },
  titleContainer: {
    marginTop: 20
  }
})


export default memo(SpotDetail);
