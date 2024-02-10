import React from "react";
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import SpotDetail from "./screens/SpotDetail";
import Reviews from "./screens/Reviews";

const RootNavigation:React.FC = (): JSX.Element => {
    const Stack = createNativeStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='SpotDetail' component={SpotDetail} />
                <Stack.Screen name='Reviews' component={Reviews} />
                <Stack.Screen name='Wishlists' component={Reviews} />
                <Stack.Screen name='Trips' component={Reviews} />
                <Stack.Screen name='Inbox' component={Reviews} />
                <Stack.Screen name='Profile' component={Reviews} />
                {/* <Stack.Screen options={{animationEnabled: false}} name='Home' component={Home} />
                <Stack.Screen name='SpotDetail' component={SpotDetail} />
                <Stack.Screen name='Reviews' component={Reviews} />
                <Stack.Screen options={{animationEnabled: false}} name='Wishlists' component={Reviews} />
                <Stack.Screen options={{animationEnabled: false}} name='Trips' component={Reviews} />
                <Stack.Screen options={{animationEnabled: false}} name='Inbox' component={Reviews} />
                <Stack.Screen options={{animationEnabled: false}} name='Profile' component={Reviews} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation
