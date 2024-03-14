import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SimpleNav from '../../components/SimpleNav/SimpleNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../../components/BottomTabs';


interface IInboxProps {
    navigation: any;
}

const Inbox: React.FC<IInboxProps> = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <SimpleNav />
            <Text>Hey</Text>
            <BottomTabs navigation={navigation} screen={'Inbox'} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Inbox;
