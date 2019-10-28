import React,{Component} from 'react';
import {Button,InteractionManager} from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import * as firebaseAPI from './../firebaseAuths/firebaseAPI';
import { NavigationEvents } from 'react-navigation';




export default class SettingsScreen extends Component {

  logout(navigation) {
    firebaseAPI.logoutUser()

    InteractionManager.runAfterInteractions(() => {
        navigation.navigate('Login')
    })
  }

  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  render(){
  return(
    <Button title="Logout" onPress={() => { this.logout(this.props.navigation) }} />
  );
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerTitleStyle: { 
    textAlign:"center", 
    flex:1 
},
};
