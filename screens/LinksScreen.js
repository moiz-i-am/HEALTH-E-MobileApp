import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  return (
    <Text>hello</Text>
  );
}

LinksScreen.navigationOptions = {
  title: 'Discover',
  headerTitleStyle: { 
    textAlign:"center", 
    flex:1 
},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
