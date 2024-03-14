import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

export const saveToken = async(token: string) => {
    await SecureStore.setItemAsync("token", token);
}

export const getToken = async() => {
   let token = await SecureStore.getItemAsync("token");
   return token;

}
