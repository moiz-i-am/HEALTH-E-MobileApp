import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import * as firebaseAPI from '../firebaseAuths/firebaseAPI';

export default class Signup extends Component {

  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
    }
  }

  static navigationOptions = {
    header: null
  }

  submit() {
    firebaseAPI.createUser(this.state.email, this.state.password)
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: 24, paddingLeft: 20 }}>Sign Up</Text>

        <TextInput style={styles.textInputStyle}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={(email) => this.setState({ email })} />

        <TextInput style={styles.textInputStyle}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(password) => this.setState({ password })} />

        <TextInput style={styles.textInputStyle}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
           />

        <Text style={styles.button} onPress={() => this.submit()}>Sign up</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textInputStyle: {
    paddingLeft: 18,
    padding: 18,
    height: 56,
    width: '90%',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 15,
    marginTop: 20
  },
  button: {
    textAlign: 'center',
    marginHorizontal: 0,
    width: '90%',
    height: 56,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    marginTop: 40,
    color:'#ffffff'
  },

});