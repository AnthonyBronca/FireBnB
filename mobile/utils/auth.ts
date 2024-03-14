import * as SecureStore from 'expo-secure-store';

export const saveToken = async(token: string) => {
        await SecureStore.setItemAsync("token", token);
};

export const removeToken = async() => {
    try{
        await SecureStore.deleteItemAsync('token');
        return 'removed';
    } catch(e){
        return e
    }
};

export const getToken = async() => {
   let token = await SecureStore.getItemAsync("token");
   return token;

};
