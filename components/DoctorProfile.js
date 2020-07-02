import React, { Component } from 'react';
import { Rating, Header, Avatar, Overlay } from 'react-native-elements';
import { StyleSheet, View, Text, Button, AsyncStorage, ScrollView } from 'react-native';
import ReactNativeCalendarStrip from 'react-native-calendar-strip'; 
import { connect } from "react-redux";
import { getDoctorTimeSlots } from "../actions/schedulingActions";
import { createAppointmentBooking } from "../actions/bookingActions";
import moment from 'moment';
import _ from 'lodash';

const styles = StyleSheet.create({
    subView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20
    },
    avatar: {
        alignSelf: 'center'
    },
    description: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
    },
    locationText: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20
    },
    button: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginTop: 60
    },
    mainView: {
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
    },
    price: {
        fontSize: 20
    },
    listitem: {
      marginTop: 10
    },
    confirmModalView: {
      textAlign: 'center',
      alignItems:'center',
      fontSize: 30,
    },
    confirmButtonsView: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent:'space-evenly'
    },
    confirmModalHeader: {
      textAlign:'center',
      alignItems:'center',
      paddingTop: 30,
      height: 100,
      marginBottom: 20,
      backgroundColor: '#990099',
      fontWeight: "bold", 
      fontSize: 24,
      color: '#ffffff'
    }
});

class DoctorProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            confirmIsVisible: false,
            token: "",
            patientName: "",
            patientId: "",
            docName: "",
            docId: "",
            choosenSlot: "",
            date: "",
            role: "",
            location: "",
            price: "",
            rating: 0,
            picture: "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-512....",
            open: false,
            success: false
        }
    }

    onButtonPress(){
        this.setState({isVisible: true});
    }

    handleClose = () => this.setState({  });

    handleConfirm = () => {
      if (this.props.auth.isAuthenticated) {
        const bookingData = {
          date: this.state.date,
          doctor: this.state.docId,
          patient: this.state.patientId,
          timeSlot: this.state.choosenSlot
        };

      if (
        this.state.role === "doctor" ||
        this.state.role === "lab" ||
        this.state.role === "hospital" ||
        this.state.role === "admin"
      ) {
        return alert(
          `sorry you are ${this.state.role} you cannot make booking form this account !!!`
        );
      } else {
        this.props.createAppointmentBooking(bookingData, this.state.token);
        // console.log("pat: " + bookingData.patient + "doc: " + bookingData.doctor);
        console.log('booking done....');
        this.setState({ confirmIsVisible: false, isVisible: false, success: true });
        setTimeout(() => {
          this.setState({ success: false });
        }, 3000);
      }
    } else {
      console.log("ERROR: not authanticated");
    }
  };

  handleCancel = () => this.setState({ success: false, confirmIsVisible: false });

    async componentDidMount() {
      const { navigation } = this.props;

        this.setState({
          docName: navigation.getParam('name'),
          location: navigation.getParam('location'),
          price: navigation.getParam('price'),
          rating: navigation.getParam('rating'),
          picture: navigation.getParam('picture'),
          docId: navigation.getParam('docId'),
        })
        const userDetails = await AsyncStorage.getItem('jwtToken');
        if (userDetails !== null) {
          const user = JSON.parse(userDetails);

          console.log(user);

          this.setState({
            token: user.token.accessToken,
            patientId: user.user.id,
            patientName: user.user.name,
            role: user.user.role
          })
          
        } else {

          console.log("no data...");

          this.setState({
            token: "",
            patientId: "",
            role: "",
            patientName: ""
          })
        }
    }

    onBackPress = (navigation)=>{
      navigation.navigate('Discover');
    }

    addTimeSlot = schedule => {
      this.setState({
        choosenSlot: schedule,
        confirmIsVisible: true,
        // isVisible: false,
      });
    };

    renderDocTimeSlots = schedules =>
    schedules.schedule ? (
      <ScrollView>
        {schedules.schedule.map(schedule => (
          <View key={null}>
            {schedule === null ? (
              <Text>No Bookings Yet</Text>
            ) : (
              schedule.timeSlots.map(booking => {
                if (booking.reserved != "true") {
                  return (
                    <View style={styles.listitem} key={booking.value}>
                      <Button
                        inverted
                        color="#990099"
                        title= {booking.label}
                        onPress={() => this.addTimeSlot(booking.label)}
                      />
                    </View>
                  );
                }
              })
            )}
          </View>
        ))}
      </ScrollView>
    ) : (
      <Text>Sorry, no time slots available</Text>
    );

    render() {
        let schedules = this.props.schedule;

        const dateSelected = val => {
          const localTime = moment(val).format("YYYY-MM-DD"); // store localTime
          const proposedDate = localTime + "T19:00:00.000Z";
          const docData = {
              user: this.state.docId,
              date: proposedDate
          };
  
          this.props.getDoctorTimeSlots(docData);
          this.setState({ date: proposedDate, choosenSlot: "" });
      }

        return (
            <ScrollView>
                <Overlay 
                  isVisible={this.state.isVisible} 
                  onBackdropPress={() => this.setState({ isVisible: false })}
                  animationType='fade'
                  width={320}
                  height={550}>
                  <View>
                    <ReactNativeCalendarStrip
                      onDateSelected={dateSelected}
                      
                      calendarAnimation={{ type: 'sequence', duration: 7 }}
                      daySelectionAnimation={{
                          type: 'border',
                          duration: 50,
                          borderWidth: 1,
                          borderHighlightColor: 'white',
                      }}
                      style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                      calendarHeaderStyle={{ color: 'white' }}
                      calendarColor={'#990099'}
                      dateNumberStyle={{ color: 'white' }}
                      dateNameStyle={{ color: 'white' }}
                      highlightDateNumberStyle={{ color: 'yellow' }}
                      highlightDateNameStyle={{ color: 'yellow' }}
                      disabledDateNameStyle={{ color: 'grey' }}
                      disabledDateNumberStyle={{ color: 'grey' }}
                      iconContainer={{ flex: 0.1 }}
                    />
                    <Overlay
                      isVisible={this.state.confirmIsVisible} 
                      onBackdropPress={() => this.setState({ confirmIsVisible: false })}
                      animationType='fade'
                      width={320}
                      height={550}>
                      <View>
                        <Text style={styles.confirmModalHeader}>Appointment Details</Text>
                        <View style={styles.confirmModalView}>
                          <Text>Doctor: {this.state.docName}</Text>
                          <Text>Patient: {this.state.patientName}</Text>
                          <Text>Appointment Date: {this.state.date}</Text>
                          <Text>TimeSlot: {this.state.choosenSlot}</Text>
                        </View>
                        <View style={styles.confirmButtonsView}>
                          <Button title='Confirm' color='#990099' onPress={(this.handleConfirm.bind(this))}/>
                          <Button title='Cancel' color='#990099' onPress={(this.handleCancel.bind(this))}/>
                        </View>
                      </View>
                    </Overlay>
                    {this.renderDocTimeSlots(schedules)}
                    {/* <FlatList
                        style={styles.flatlist}
                        data={_.values(schedules)}
                        renderItem={({item}) => (<TimeSlotListItem
                                    label={item.label}
                                  />
                                )}
                        keyExtractor={item => item.value}
                    /> */}
                  </View>
                </Overlay>

                <Header
                    backgroundColor='#990099'
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: ()=> this.onBackPress(this.props.navigation) }}
                    centerComponent={{ text: this.state.name, style: { color: '#fff', fontSize: 20 } }}
                />
                <View style={styles.mainView}>
                    <View style={styles.avatar}>
                        <Avatar rounded size='xlarge' source={{ uri: this.state.picture }} />
                    </View>
                    <Text style={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Quis ipsum suspendisse ultrices gravida.
                        Risus commodo viverra maecenas accumsan lacus vel
                        facilisis orem ipsum dolor sit amet, consectetur
                        adipiscing.
                    </Text>
                    <View style={styles.subView1}>
                        <Rating
                            type='star' 
                            imageSize={25}
                            ratingCount={5} 
                            ratingColor='#4287f5' 
                            readonly={true} 
                            startingValue={this.state.rating}
                        />
                        <Text style={styles.price}>PKR 200</Text>
                    </View>
                    <Text style={styles.locationText}>{this.state.location}</Text>
                    <View style={styles.button}>
                        <Button color='#990099' title='Book Appointment' onPress={(this.onButtonPress.bind(this))}/>
                    </View>
                </View>
            </ScrollView>
            
        );
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      schedule: state.schedule
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      createAppointmentBooking: (bookingData, token) =>
        dispatch(createAppointmentBooking(bookingData, token)),
      getDoctorTimeSlots: data => dispatch(getDoctorTimeSlots(data))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DoctorProfile);