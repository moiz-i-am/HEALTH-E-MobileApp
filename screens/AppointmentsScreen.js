import React, { Component } from 'react';
import axios from 'axios';
import { View, FlatList, AsyncStorage } from 'react-native';
import PendingBookingListItem from '../components/PendingBookingListItem';

class AppointmentsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      bookings: []
    };
  }

  async componentDidMount() {
    const userDetails = await AsyncStorage.getItem('jwtToken');
    if (userDetails !== null) {
      const user = JSON.parse(userDetails);

      console.log(user.user.id);

      this.setState({
            id: user.user.id
      })
          
    } else {
      console.log("no data...");

      this.setState({
        id: ""
      })
    }

    const data = {
      patient: this.state.id
    };

    axios.post(`http://192.168.1.67:3001/v1/booking/bookingList/patient`, data).then(res => {
      // this.setState({ bookings: res.data };
      setTimeout(() => {
        this.setState({ bookings: res.data });
      }, 2000);
    });
  }

  render() {
    return(
      <View>
        <FlatList
          data={this.state.bookings}
          renderItem={({item}) => (<PendingBookingListItem
                                        //navigation={this.props.navigation}
                                        date={item.date}
                                        doctor={item.doctor.name}
                                        doctorId={item.doctor._id}
                                        patientId={item.patient}
                                        timeSlot={item.timeSlot}
                                    />
                                    )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default AppointmentsScreen;

AppointmentsScreen.navigationOptions = {
  title: 'Upcoming Appointments',
  headerTitleStyle: { 
    textAlign:"center", 
    flex:1,
},
};