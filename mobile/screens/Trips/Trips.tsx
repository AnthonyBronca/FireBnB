import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SimpleNav from '../../components/SimpleNav/SimpleNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../../components/BottomTabs';


interface ITripsProps {
    navigation: any;
}

const Trips: React.FC<ITripsProps> = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <SimpleNav />
            <Text>Hey</Text>
            <BottomTabs navigation={navigation} screen={'Trips'} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Trips;
