import React, { memo } from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import Search from './Components/Search';
import Spots from './Components/Spots';
import BottomTabs from '../../components/BottomTabs';


interface IHome {
  navigation: any
}


const Home: React.FC<IHome> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Search/>
      <Spots navigation={navigation}/>
      <BottomTabs navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default memo(Home);
