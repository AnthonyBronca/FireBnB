import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import SimpleNav from '../../components/SimpleNav/SimpleNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../../components/BottomTabs';
import { Image } from 'expo-image';


interface IInboxProps {
    navigation: any;
}

const Inbox: React.FC<IInboxProps> = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            {/* <SimpleNav navigation={navigation} /> */}
            <View style={styles.underConstruction}>
                <Text style={styles.text}>Under Construction!</Text>
            </View>
            <Image
                contentFit={'contain'}
                autoplay={true}
                style={styles.imagePlaceHolder}
                source={{ uri: "https://i.pinimg.com/originals/d6/33/67/d633676505858a38c93ef19c1fb41ad1.jpg" }}
            />
            <BottomTabs navigation={navigation} screen={'Inbox'} />
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

export default Inbox;
