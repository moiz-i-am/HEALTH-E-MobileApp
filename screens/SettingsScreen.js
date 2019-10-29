import React,{Component} from 'react';
import {Button,InteractionManager,View,Text,StyleSheet} from 'react-native';
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
    <View>
      <Text style={styles.button} onPress={()=>alert("button pressed")}>Edit Info</Text>
      <Text style={styles.button} onPress={()=>alert("button pressed")}>Delete Account</Text>
      <Text style={styles.buttonLogout} onPress={() => { this.logout(this.props.navigation) }}>Logout</Text>
    </View>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    fontWeight:"bold",
    marginHorizontal: 0,
    height: 56,
    padding: 15,
    paddingLeft:20,
    borderBottomColor: '#007ACC',
    borderBottomWidth: 1,
  },
  buttonLogout:{
    textAlign: 'center',
    fontWeight:"bold",
    marginHorizontal: 0,
    height: 56,
    padding: 15,
    backgroundColor: '#66CCFF',
    color:'#ffffff'
  }
});