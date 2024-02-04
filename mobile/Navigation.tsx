import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import SpotDetail from "./screens/SpotDetail";
import NewNav from "./screens/SpotDetail/components/NewNav";

const RootNavigation:React.FC = (): JSX.Element => {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false
    };


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='SpotDetail' component={SpotDetail} />
                {/* <Stack.Screen name="Test" component={NewNav} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation
