import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Calander from './../screens/Calander';
import Maps from './../screens/Maps';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const DiscoverStack = createStackNavigator(
  {
    Discover: DiscoverScreen,
  },
  config
);

DiscoverStack.navigationOptions = {
  tabBarLabel: 'Doctors',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

DiscoverStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';


const MapStack = createStackNavigator(
  {
    Maps: Maps,
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'} />
  ),
};

MapStack.path = '';

const CalanderStack = createStackNavigator(
  {
    Calander: Calander,
  },
  config
);

CalanderStack.navigationOptions = {
  tabBarLabel: 'Calander',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  ),
};

CalanderStack.path = '';




const tabNavigator = createBottomTabNavigator({
  MapStack,
  DiscoverStack,
  CalanderStack,
  ProfileStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
