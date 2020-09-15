import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header'

const ShowProfileScreen = () => {
  return (
    <View>
      <Header title={'profile'} />
      <View style={styles.screen}>
        <Text>hello bcdo</Text>
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
