import React, { Component } from 'react'
import axios from 'axios'
import { View, FlatList, AsyncStorage } from 'react-native'
import PendingBookingListItem from '../components/PendingBookingListItem'
import ListEmpty from '../components/ListEmpty'

class AppointmentsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      bookings: [],
    }
  }

  async componentDidMount() {
    const userDetails = await AsyncStorage.getItem('jwtToken')
    if (userDetails !== null) {
      const user = JSON.parse(userDetails)

      console.log(user.user.id)

      this.setState({
        id: user.user.id,
      })
    } else {
      console.log('no data...')

      this.setState({
        id: '',
      })
    }

    const data = {
      patient: this.state.id,
    }

    axios
      .post(`http://192.168.1.14:3001/v1/booking/bookingList/patient`, data)
      .then((res) => {
        setTimeout(() => {
          this.setState({ bookings: res.data })
        }, 2000)
      })
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.bookings}
          ListEmptyComponent={<ListEmpty />}
          renderItem={({ item }) => {
            if (new Date(item.date) > new Date()) {
              return (
                <PendingBookingListItem
                  date={item.date}
                  doctor={item.doctor.name}
                  doctorId={item.doctor._id}
                  patientId={item.patient}
                  timeSlot={item.timeSlot}
                />
              )
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

export default AppointmentsScreen

AppointmentsScreen.navigationOptions = {
  title: 'Upcoming Appointments',
  headerTitleStyle: {
    textAlign: 'center',
    fontSize: 17,
    flex: 1,
  },
}
