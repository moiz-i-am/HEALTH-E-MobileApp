import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AppointmentsScreen from './../screens/AppointmentsScreen';
import PrescriptionScreen from './../screens/PrescriptionScreen';


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
  tabBarOptions: { 
    activeTintColor: '#9458AE',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-pulse${focused ? '' : '-outline'}`
          : 'md-pulse'
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
  tabBarOptions: { 
    activeTintColor: '#9458AE',
  },
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
  tabBarOptions: { 
    activeTintColor: '#9458AE',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'} />
  ),
};

SettingsStack.path = '';


const AppointmentStack = createStackNavigator(
  {
    Appointments: AppointmentsScreen,
  },
  config
);

AppointmentStack.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarOptions: { 
    activeTintColor: '#9458AE',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'} />
  ),
};

AppointmentStack.path = '';

const PrescriptionStack = createStackNavigator(
  {
    Prescriptions: PrescriptionScreen,
  },
  config
);

PrescriptionStack.navigationOptions = {
  tabBarLabel: 'Prescriptions',
  tabBarOptions: { 
    activeTintColor: '#9458AE',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'} />
  ),
};

PrescriptionStack.path = '';


const tabNavigator = createBottomTabNavigator({
  AppointmentStack,
  PrescriptionStack,
  DiscoverStack,
  ProfileStack,
  SettingsStack,
});

export default tabNavigator;
