import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SimpleNav from '../../components/SimpleNav/SimpleNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../../components/BottomTabs';


interface IProfileProps {
    navigation: any;
}

const Profile: React.FC<IProfileProps> = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <SimpleNav navigation={navigation} />
            <Text>Hey</Text>
            <BottomTabs navigation={navigation} screen={'Profile'} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Profile;
