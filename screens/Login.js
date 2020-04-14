import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../auth/authActions";



class Login extends Component {

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



  componentDidMount() {
    //this.watchAuthState(this.props.navigation)
  }


  validate = () => {
    let emailError = "";
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(this.state.email)) {
      // if (!this.state.email.includes("@")) {
      emailError = "* Please enter valid email address";
    }
    if (
      !this.state.password.match(
        /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
      )
    )
      if (emailError) {
        this.setState({ emailError });
        return false;
      }
    return true;
  };

  onButtonPress() {
    this.setState({ error: '', loading: true })
    const { email, password } = this.state;

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    const isValid = this.validate();
    if (isValid) {
      this.props.loginUser(userData);
      console.log("loggedin");
      this.props.navigation.navigate('Maps');
      // clear form for removing error if fields are valid
      //this.setState(initialState);
    }
  }
  onLoginSuccess() {
    this.setState({
      email: '', password: '', error: '', loading: false
    })
  }
  onLoginFailure(errorMessage) {
    alert("password not correct");
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, { loginUser })(Login);