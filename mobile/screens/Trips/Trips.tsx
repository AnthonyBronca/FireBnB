import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../../components/BottomTabs';
import { Image } from 'expo-image';

interface ITripsProps {
    navigation: any;
}

const Trips: React.FC<ITripsProps> = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.underConstruction}>
                <Text style={styles.text}>Under Construction!</Text>
            </View>
            <Image
                contentFit={'contain'}
                autoplay={true}
                style={styles.imagePlaceHolder}
                source={{ uri: "https://i.pinimg.com/originals/d6/33/67/d633676505858a38c93ef19c1fb41ad1.jpg"}}
            />
            <BottomTabs navigation={navigation} screen={'Trips'} />
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

export default Trips;
