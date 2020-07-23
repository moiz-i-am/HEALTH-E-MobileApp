import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, Button } from 'react-native'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authActions'
import { Input, Icon } from 'react-native-elements'

const initialState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  errors: {},
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  static navigationOptions = {
    header: null,
  }

  componentWillReceiveProps(nextProps, { navigation }) {
    if (nextProps.auth.isAuthenticated) {
      const { user } = nextProps.auth
      this.props.navigation.navigate('Appointments')
      // push user to signup when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth
      this.props.navigation.navigate('Appointments')
    }
  }

  validate = () => {
    let emailError = ''
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )
    if (!pattern.test(this.state.email)) {
      // if (!this.state.email.includes("@")) {
      emailError = '* Please enter valid email address'
    }
    if (
      !this.state.password.match(
        /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
      )
    )
      if (emailError) {
        this.setState({ emailError })
        return false
      }
    return true
  }

  onButtonPress() {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }

    const isValid = this.validate()

    if (isValid) {
      this.props.loginUser(userData)

      // clear form for removing error if fields are valid
      this.setState(initialState)

      //this.props.navigation.navigate('Maps');
    } else {
      Alert.alert('Alert', 'Invalid Credentials ')
    }
  }
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    })
  }
  onLoginFailure(errorMessage) {
    alert('password not correct')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 10,
          }}>
          Sign In
        </Text>

        <Input
          inputContainerStyle={styles.textInputStyle}
          leftIcon={
            <Icon
              iconStyle={styles.icon}
              name="mail"
              size={22}
              color="#990099"
            />
          }
          label="Your Email Address"
          labelStyle={styles.label}
          placeholder="email@address.com"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={(email) => this.setState({ email })}
        />

        <Input
          inputContainerStyle={styles.textInputStyle}
          leftIcon={
            <Icon
              name="lock"
              size={22}
              color="#990099"
              iconStyle={styles.icon}
            />
          }
          placeholder="Password"
          label="Password"
          labelStyle={styles.label}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={(password) => this.setState({ password })}
        />

        <View style={styles.button}>
          <Button
            color="#990099"
            title="Login"
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
        <Text style={{ marginTop: 30 }} onPress={() => this.onSignupListener()}>
          Not Registered? Signup
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginRight: 20,
    marginLeft: 20,
  },
  textInputStyle: {
    borderColor: '#990099',
  },
  icon: {
    marginLeft: -15,
    marginRight: 10,
  },
  label: {
    bottom: 0,
    marginTop: 15,
  },
  button: {
    alignSelf: 'stretch',
    borderRadius: 15,
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
})

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Login)
