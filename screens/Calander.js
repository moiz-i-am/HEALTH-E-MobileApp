import React, { Component } from 'react';
import {
    View
  } from 'react-native';
  import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';


export default class Calander extends Component {
      render() {
        return (
      <View>
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={'#7743CE'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: 'yellow' }}
          highlightDateNameStyle={{ color: 'yellow' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
          iconContainer={{ flex: 0.1 }}
        />
      </View>
        );
      }
}

Calander.navigationOptions = {
    title: 'Calander',
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1 
  },
  };


