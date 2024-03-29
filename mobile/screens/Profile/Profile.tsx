import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../../components/BottomTabs';
// import { useAppSelector } from '../../store';
import Login from './LogIn/Login';
import AuthContext from '../../context/AuthContext';
import LoggedIn from './LoggedIn';
import { getUser } from '../../storage/storage';


interface IProfileProps {
    navigation: any;
}

const Profile: React.FC<IProfileProps> = ({ navigation }) => {

    const {authorized} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const retrieveUser = async() => {
            const {user} = await getUser();
            if(user !== "No user stored"){
                setUser(user);
            }
        }
        if(!user){
            retrieveUser();
        }
    }, )



    // const user = useAppSelector((state) => state.session.user);

    if(!authorized && !user){
        //Logged Out
        return (
            <SafeAreaView style={styles.container}>
                <Login navigation={navigation}/>
                <BottomTabs navigation={navigation} screen={'Profile'} />
            </SafeAreaView>
        )
    } else{
        //Logged in
            return (
                <SafeAreaView style={styles.container}>
                <LoggedIn navigation={navigation} user={user} />
                <BottomTabs navigation={navigation} screen={'Profile'} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Profile;
