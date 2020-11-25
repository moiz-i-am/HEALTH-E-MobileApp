import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'

import Header from '../components/Header'

const ShowProfileScreen = () => {

  // let username;
  // let emailId;
  // let locale;
  // let phoneNo;
  // const userDetails = await AsyncStorage.getItem('jwtToken');
  //   if (userDetails !== null) {
  //     const user = JSON.parse(userDetails)
  //     console.log(user.user.name);
  //     // let username;
  //     // let emailId;
  //     // let locale;
  //     // let phoneNo;

  //     if(user.user.name === "") {
  //       username = <Text>Name not defined</Text>
  //     } else {
  //       username = <Text>{user.user.name}</Text>
  //     }
  
  //     if(user.user.email === null) {
  //       emailId = <Text>Email not defined</Text>
  //     } else {
  //       emailId = <Text>{user.user.email}</Text>
  //     }
  
  //     if(user.user.location_city === "") {
  //       locale = <Text>Location not defined</Text>
  //     } else {
  //       locale = <Text>{user.user.location_city}</Text>
  //     }

  //     if(user.user.phone === "") {
  //       phoneNo = <Text>Phone Number not defined</Text>
  //     } else {
  //       phoneNo = <Text>{user.user.phone}</Text>
  //     }
  //   } else {
  //     console.log('no data...')
  //  }

  return (
    <View>
      <Header title={'Your Profile'} />
      <View style={styles.screen}>
        <Text>bcdo</Text>
        {/* <Text>{username}</Text>
        <Text>{emailId}</Text>
        <Text>{locale}</Text>
        <Text>{phoneNo}</Text> */}
      </View>
    </View>
  )
}

export default ShowProfileScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
})
