import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  Vibration,
  Platform,
} from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import moment from 'moment'
import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'

// styles for GUI
const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    marginLeft: 5,
  },
  mainView: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  subView1: {
    flexDirection: 'row',
  },
  subView2: {
    marginTop: 10,
  },
  listItem: {
    elevation: 3,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
    borderLeftWidth: 1,
    borderLeftColor: '#cccccc',
    borderRightColor: '#cccccc',
    borderBottomColor: '#cccccc',
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
  },
})

// function to send push notification which uses state and body from class
const sendPushNotification = async (to, body) => {
  const message = {
    to,
    sound: 'default',
    title: 'Upcomming Appointment',
    body,
    data: { data: '' },
    _displayInForeground: true,
  }
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

let expoToken
let body
let time

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Back Ground fetching start /////////////////////////////////

// for checking the time match to send notification in background
const setClock = (time) => {
  /////////////////////////// BUG HERE ////////////////////////////////////
  // only the last booking time is comming here by props (correct this bug)
  const a = time

  const [timeStart, unit1, dash, timeEnd, unit2] = a.split(' ')

  // console.log("time is: " + time);

  let format = 'h:mm'

  const curTime = moment().format('h:mm')

  const time1 = moment(curTime, format),
    beforeTime = moment(timeStart, format),
    afterTime = moment(timeEnd, format)

  // if (timeStart === moment().format('h:mm')) {
  //   sendPushNotification(expoToken, body);
  // } else {
  //   return console.log(moment().format('h:mm:ss'))
  // }
  if (time1.isBetween(beforeTime, afterTime)) {
    sendPushNotification(expoToken, body)
  } else {
    return console.log(moment().format('h:mm:ss'))
  }
}

const setStateFn = () => {
  //console.log("State not yet initialized");
}

// method to make background task work
function myTask() {
  try {
    // fetch data here...
    const backendData = 'Simulated fetch ' + setClock(time)
    console.log('myTask() ', backendData)
    setStateFn(backendData)
    return backendData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData
  } catch (err) {
    return BackgroundFetch.Result.Failed
  }
}

async function initBackgroundFetch(taskName, taskFn, interval = 1) {
  try {
    if (!TaskManager.isTaskDefined(taskName)) {
      TaskManager.defineTask(taskName, taskFn)
    }
    const options = {
      minimumInterval: interval, // in seconds
    }
    await BackgroundFetch.registerTaskAsync(taskName, options)
  } catch (err) {
    console.log('registerTaskAsync() failed:', err)
  }
}
//  /\
//  ||
/// calling is in componentDidMount

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Back Ground fetching End ///////////////////////////////////

class PendingBookingListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expoPushToken: '',
      notification: {},
      doctor: '',
      date: '',
      timeSlot: '',
      notification: false,
      dateOfAppointment: this.props.date,
    }
  }

  // permission to send push notifications and generating expoPushToken for notification recieving
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      )
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = await Notifications.getExpoPushTokenAsync()
      console.log(token)
      expoToken = token
      this.setState({ expoPushToken: token })
    } else {
      alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      })
    }
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync()

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    )

    // body is called in above function (sendPush notifications)
    body = `${
      ' With: ' +
      this.props.doctor +
      ' At: ' +
      this.props.timeSlot +
      '\n please visit website to call doctor'
    }`

    time = this.props.timeSlot

    //console.log("componet mount time: " + time);

    // setting interval to check for time match for nofification after every 5 second

    setInterval(() => {
      ////// console log testing /////////////

      const a = this.props.timeSlot

      const [timeStart, unit1, dash, timeEnd, unit2] = a.split(' ')

      ///////////////////////////////////////

      let format = 'h:mm'

      const curTime = moment().format('h:mm')

      const time = moment(curTime, format),
        beforeTime = moment(timeStart, format),
        afterTime = moment(timeEnd, format)

      if (time.isBetween(beforeTime, afterTime)) {
        this.pushNotification()
        this.setState({ notification: true })
      } else {
        console.log(moment().format('h:mm:ss'))
      }
    }, 20000)
  }

  componentWillUpdate() {
    // called to start backgroundFetch process when app is closed
    initBackgroundFetch('myTaskName', myTask, 1)
  }

  registerTaskAsync = async () => {
    await BackgroundFetch.registerTaskAsync(taskName)
    alert('task registered')
  }

  // handling notification features i.e vibration
  _handleNotification = (notification) => {
    Vibration.vibrate()
    console.log(notification)
    this.setState({ notification: notification })
  }

  // used the function inside to give its access to backgroundFetch
  pushNotification = () => {
    sendPushNotification(
      this.state.expoPushToken,
      `${
        ' With: ' +
        this.props.doctor +
        ' At: ' +
        this.props.timeSlot +
        '\n please visit website to call doctor'
      }`
    )
  }

  // used the function inside to give its access to set the time of notification for backgroundFetch
  setClockData = () => {
    setClock(this.props.timeSlot)
  }

  render() {
    console.log(this.props.date)
    // converting date to proper booked
    const d = new Date(this.state.dateOfAppointment)
    d.setDate(d.getDate() - 1)
    // GUI
    return (
      <TouchableOpacity activeOpacity={1} style={styles.listItem}>
        <View style={styles.mainView}>
          <View style={styles.leftView}>
            <View style={styles.subView1}>
              <Text style={styles.name}>{this.props.doctor}</Text>
            </View>
            <View style={styles.subView2}>
              <Text>Date of Appointment: {new Date(d).toDateString()}</Text>
              <Text>Time of Appointment: {this.props.timeSlot}</Text>
            </View>
          </View>
        </View>
        {/* <Button title={'Press to Send Notification'} onPress={() => this.pushNotification()} /> */}
      </TouchableOpacity>
    )
  }
}

export default PendingBookingListItem
