import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailDishesScreen from '../screens/DetailDishesScreen';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName="List_Dishes">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                navigation={navigation}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Detail_Dishes"
                component={DetailDishesScreen}
                options={{
                    title: '',
                }}
                navigation={navigation}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
