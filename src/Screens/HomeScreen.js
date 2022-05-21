import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HealthPage from './HealthScreen';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import BedroomScreen from './BedroomScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createNativeStackNavigator()
const Tabs = AnimatedTabBarNavigator()

export default function Home({ logout }) {
    return <Tabs.Navigator
        appearance={{
            shadow: true,
            floating: true,
            whenInactiveShow: 'both'
        }}>
        <Tabs.Screen
            name='Data'
            component={HealthPage} />
        <Tabs.Screen
            name='Bedroom'
            component={BedroomScreen} />
        <Tabs.Screen
            name='Settings'
            initialParams={{ logout: logout }}
            component={ProfileScreen} />
    </Tabs.Navigator>
}