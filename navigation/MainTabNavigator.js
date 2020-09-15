import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'

import FindDoctorsScreen from '../screens/FindDoctorsScreen'
import SettingsScreen from '../screens/SettingsScreen'
import AppointmentsScreen from './../screens/AppointmentsScreen'
import PrescriptionScreen from './../screens/PrescriptionScreen'
import LabResultsScreen from '../screens/LabResustsScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const FindDoctorsStack = createStackNavigator(
  {
    FindDoctors: FindDoctorsScreen,
  },
  config
)

FindDoctorsStack.navigationOptions = {
  tabBarLabel: 'Doctors',
  tabBarOptions: {
    activeTintColor: '#990099',
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
}

FindDoctorsStack.path = ''

const LabStack = createStackNavigator(
  {
    Lab: LabResultsScreen,
  },
  config
)

LabStack.navigationOptions = {
  tabBarLabel: 'Lab results',
  tabBarOptions: {
    activeTintColor: '#990099',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-flask-outline' : 'md-flask'}
    />
  ),
}

LabStack.path = ''

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
)

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: {
    activeTintColor: '#990099',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'}
    />
  ),
}

SettingsStack.path = ''

const AppointmentStack = createStackNavigator(
  {
    Appointments: AppointmentsScreen,
  },
  config
)

AppointmentStack.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarOptions: {
    activeTintColor: '#990099',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
    />
  ),
}

AppointmentStack.path = ''

const PrescriptionStack = createStackNavigator(
  {
    Prescriptions: PrescriptionScreen,
  },
  config
)

PrescriptionStack.navigationOptions = {
  tabBarLabel: 'Prescriptions',
  tabBarOptions: {
    activeTintColor: '#990099',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
    />
  ),
}

PrescriptionStack.path = ''

const tabNavigator = createBottomTabNavigator({
  AppointmentStack,
  PrescriptionStack,
  FindDoctorsStack,
  LabStack,
  SettingsStack,
})

export default tabNavigator
