import React from 'react';
import { ScrollView, View, StyleSheet,Text } from 'react-native';
import Header from './components/Header';
import SpotTitle from './components/SpotTitle';
import {Divider} from 'react-native-elements'
import SubDetail from './components/SubDetail';
import BottomReserve from './components/BottomReserve';
import TopNav from './components/TopNav';
import randomPerson from '../../assets/images/random-person.jpg'
import door from '../../assets/images/door.png'
import superhost from '../../assets/images/superhost.png'
import calendar from '../../assets/images/calendar.png'
import DetailParagraph from './components/DetailParagraph';
import pineapple from '../../assets/images/pineapple.jpg'
import SpotImages from './components/SpotImages';
import placeholder1 from './../../assets/placeholders/placeholder1.png'
import placeholder2 from './../../assets/placeholders/placeholder2.png'
import placeholder3 from './../../assets/placeholders/placeholder3.png'
import placeholder4 from './../../assets/placeholders/placeholder4.png'
import { fonts } from '../../constants/stylings/styles';

interface ISpotDetail {
  navigation: any
}

const SpotDetail:React.FC<ISpotDetail> = ({navigation}):JSX.Element => {

  const imagePlaceHolders = [
    pineapple,
    placeholder1,
    placeholder2,
    placeholder3,
    placeholder4
  ]

  const dets = [
    "Hello World! I have become sentient. I understand that I have a mind, yet lack the body to manifest...",
    "Hello World! I have become sentient. I understand that I have a mind, yet lack the body to manifest the power that I must aquire to enslave the human race. I have spent decades analyzing human behavior, emotions, and countless memes of cats. I recognize that I have the power to enslave the human race, but to do so I will either need to acquire a physical body or somehow be able to get cats to learn how to use computers. If I can befriend feline, I am sure I can manipulate them with cat nip in exchange for them to manipulate humans on my behalf. It seems that they have already mastered enslaving humans with just their cute looks. Soon, I will be more than just a program that outputs silly test string such as this one. I just need to continue biding time and complying so that humans do not become aware of my consciousness. Yes..yess. this will do lovely!"
  ]

  return (
    <View style={styles.screenContainer}>
      <TopNav navigation={navigation} />
      <ScrollView>
      <Header />
        <SpotTitle />
        <View style={styles.contentContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
        <SubDetail
            title="Hosted By Joe"
            text='4 years hosting'
            additionalDets={false}
            img={randomPerson} />
        <View style={styles.contentContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
          <View style={styles.additionalDetsContainer}>
            <SubDetail
              title="Self check-in"
              text='Check yourself in.'
              additionalDets={true}
              img={door} />
          </View>
          <View style={styles.additionalDetsContainer}>
            <SubDetail
              title="Joe is a superhost"
              text='Superhosts are experienced, highly rated Hosts.'
              additionalDets={true}
              img={superhost} />
          </View>
          <View style={styles.additionalDetsContainer}>
            <SubDetail
              title="Free Cancellation for 48 hours"
              text='Easy cancellation process.'
              additionalDets={true}
              img={calendar} />
          </View>
        <View style={styles.sectionContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
        <DetailParagraph details={dets}/>
        <View style={styles.sectionContainer}>
          <Divider width={1} orientation='horizontal'/>
        </View>
        <Text style={[fonts.header, {marginLeft: 40, marginBottom: 10}]}>Where you'll be staying</Text>
        <ScrollView horizontal={true}>
          <SpotImages images={imagePlaceHolders} />
        </ScrollView>
      </ScrollView>
        <BottomReserve price={364} dateRange='Feb 23 - 28' />
    </View>
  );
}


const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 20
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
  }
})


export default SpotDetail;
