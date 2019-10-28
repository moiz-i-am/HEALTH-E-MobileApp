import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Text,
} from 'react-native';


export default function DiscoverScreen() {
  return (
    <Text>Discover</Text>
  );
}

DiscoverScreen.navigationOptions = {
  title: 'Discover',
  headerTitleStyle: { 
    textAlign:"center", 
    flex:1 
},
};

