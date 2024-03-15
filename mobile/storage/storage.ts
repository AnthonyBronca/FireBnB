import * as SecureStore from 'expo-secure-store';
import { User } from '../typings/redux';

export const saveUser = async(user:User) => {
    const userString = JSON.stringify(user);
    await SecureStore.setItemAsync("user", userString);
};

export const getUser = async() => {
    const userString = await SecureStore.getItemAsync('user');
    if(userString){
        const user = JSON.parse(userString);
        return user;
    } else{
        return "No user stored";
    }
};

export const removeUserStorage = async() => {
    await SecureStore.deleteItemAsync("user");
    return "user deleted"
}
