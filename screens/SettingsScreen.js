import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import { logoutUser } from "../actions/authActions";

class SettingsScreen extends Component {

  logout(navigation) {
    this.props.logoutUser(navigation.navigate('Login'));
  }

  render(){
  return(
    <View>
      <Text style={styles.button} onPress={()=>alert("button pressed")}>Edit Info</Text>
      <Text style={styles.button} onPress={()=>alert("button pressed")}>Delete Account <Ionicons
      name={"md-trash"}
      size={20}
      marginHorizontal={30}
    /></Text>
      <Text style={styles.buttonLogout} onPress={() => { this.logout(this.props.navigation) }}>Logout <Ionicons
      name={"md-log-out"}
      size={20}
      color={"#fff"}
      marginHorizontal={30}
    /></Text>
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
    fontSize:20,
    padding: 15,
    backgroundColor: '#9458AE',
    color:'#ffffff',
    // width:"50%",
    // alignContent:"center"
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {logoutUser}
)((SettingsScreen));