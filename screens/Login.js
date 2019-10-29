import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import * as firebaseAPI from '../firebaseAuths/firebaseAPI';
import firebase from 'firebase';


export default class Login extends Component {

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

  onSignupListener = () => {
    //Alert.alert("Alert", "Button pressed "+viewId);
    this.props.navigation.navigate('Signup');
  }

  // LoginUser = () => {
  //   firebaseAPI.signInUser(this.state.email, this.state.password)
  // }

  componentDidMount() {
    this.watchAuthState(this.props.navigation)
  }

  watchAuthState(navigation) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != undefined) {
        navigation.navigate('Maps');
      }
    });
  }

  onButtonPress() {
    this.setState({ error: '', loading: true })
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch((error) => {
            let errorCode = error.code
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              this.onLoginFailure.bind(this)('Weak password!')
            } else {
              this.onLoginFailure.bind(this)(errorMessage)
            }
          });
      });
  }
  onLoginSuccess() {
    this.setState({
      email: '', password: '', error: '', loading: false
    })
  }
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={{ alignSelf: "flex-start", fontWeight: "bold", fontSize: 24, paddingLeft: 20 }}>Sign In</Text>

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

        <Text style={styles.button} onPress={this.onButtonPress.bind(this)}>Login</Text>
        <Text style={{ marginTop: 30 }} onPress={() => this.onSignupListener()}>Not Registered? Signup</Text>
        
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
    borderColor: '#007ACC',
    borderRadius: 15,
    marginTop: 20
  },
  button: {
    textAlign: 'center',
    marginHorizontal: 0,
    width: '90%',
    height: 56,
    padding: 15,
    backgroundColor: '#007ACC',
    borderRadius: 15,
    marginTop: 40,
    color:'#ffffff'
  },


});