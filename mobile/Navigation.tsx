import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import SpotDetail from "./screens/SpotDetail";
import Reviews from "./screens/Reviews";
import Wishlists from "./screens/Wishlists";
import Trips from "./screens/Trips";
import Inbox from "./screens/Inbox";
import Profile from "./screens/Profile";

const RootNavigation: React.FC = (): JSX.Element => {
    const Stack = createStackNavigator();
    const screenOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
                <Stack.Screen options={{ animationEnabled: false }} name='Home' component={Home} />
                <Stack.Screen name='SpotDetail' component={SpotDetail} />
                <Stack.Screen name='Reviews' component={Reviews} />
                <Stack.Screen options={{ animationEnabled: false }} name='Wishlists' component={Wishlists} />
                <Stack.Screen options={{ animationEnabled: false }} name='Trips' component={Trips} />
                <Stack.Screen options={{ animationEnabled: false }} name='Inbox' component={Inbox} />
                <Stack.Screen options={{ animationEnabled: false }} name='Profile' component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation
