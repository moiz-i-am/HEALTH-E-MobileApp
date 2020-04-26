import React, { Component } from 'react';
import { Rating, Header, Avatar, Overlay } from 'react-native-elements';
import { StyleSheet, View, Text, Button, FlatList, AsyncStorage } from 'react-native';
import ReactNativeCalendarStrip from 'react-native-calendar-strip'; 
import { connect } from "react-redux";
import { getDoctorTimeSlots } from "../actions/schedulingActions";
import moment from 'moment';
import TimeSlotListItem from './TimeSlotListItem';

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
    }
});

class DoctorProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            token: "",
            patientId: "",
            name: "",
            docId: "",
            choosenSlot: "",
            date: "",
            role: "",
            location: "",
            price: "",
            rating: 0,
            picture: "",
            schedules: [],
            open: false,
            success: false
        }
    }

    onButtonPress(){
        this.setState({isVisible: true});
    }

    componentDidMount() {
      const { navigation } = this.props;  

        this.setState({
          name: navigation.getParam('name'),
          location: navigation.getParam('location'),
          price: navigation.getParam('price'),
          rating: navigation.getParam('rating'),
          picture: navigation.getParam('picture'),
          docId: navigation.getParam('docId'),
          schedules: this.props.schedule
        })
        userDetails = AsyncStorage.getItem('jwtToken');
        if (AsyncStorage.getItem('jwtToken')) {
          this.setState({
            token: userDetails.accessToken,
            patientId: userDetails.id,
            name: userDetails.name,
            role: userDetails.role
          });
        } else {
          this.setState({
            token: "",
            patientId: "",
            role: "",
            name: ""
          });
        }
      }

    onBackPress(){
        
    }

    dateSelected(val){
        const localTime = moment(val).format("YYYY-MM-DD"); // store localTime
        const proposedDate = localTime + "T19:00:00.000Z";
        const docData = {
            user: this.state.docId,
            date: proposedDate
        };

        this.props.getDoctorTimeSlots(docData);
        this.setState({ date: proposedDate, choosenSlot: "" });
    }

    addTimeSlot = schedule => {
        this.setState({
          choosenSlot: schedule
        });
      };

    render() {
        // const { navigation } = this.props;  
        // const name = navigation.getParam('name');
        // const location = navigation.getParam('location');
        // const price = navigation.getParam('price');
        // const rating = navigation.getParam('rating');
        // const picture = navigation.getParam('picture');
        // let docid = navigation.getParam('docId');
        // this.setState({docId : docid});
        // const schedules = this.props.schedule;

        return (
            <View>
                <Overlay 
                  isVisible={this.state.isVisible} 
                  onBackdropPress={() => this.setState({ isVisible: false })}
                  animationType='fade'
                  width={320}
                  height={550}>
                  <View>
                    <ReactNativeCalendarStrip
                      onDateSelected={this.dateSelected.bind(this)}
                      
                      calendarAnimation={{ type: 'sequence', duration: 7 }}
                      daySelectionAnimation={{
                          type: 'border',
                          duration: 50,
                          borderWidth: 1,
                          borderHighlightColor: 'white',
                      }}
                      style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                      calendarHeaderStyle={{ color: 'white' }}
                      calendarColor={'#9458AE'}
                      dateNumberStyle={{ color: 'white' }}
                      dateNameStyle={{ color: 'white' }}
                      highlightDateNumberStyle={{ color: 'yellow' }}
                      highlightDateNameStyle={{ color: 'yellow' }}
                      disabledDateNameStyle={{ color: 'grey' }}
                      disabledDateNumberStyle={{ color: 'grey' }}
                      iconContainer={{ flex: 0.1 }}
                    />
                    <View>
                    <FlatList
                        data={this.state.schedules}
                        renderItem={({item}) => (<TimeSlotListItem
                                    label={item.timeSlots}
                                  />
                                )}
                        keyExtractor={item => item.id}
                    />
                    </View>
                  </View>
                </Overlay>

                <Header
                    backgroundColor='#9458AE'
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: ()=> navigation.goBack(null) }}
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
                        <Button color='#9458AE' title='Book Appointment' onPress={(this.onButtonPress.bind(this))}/>
                    </View>
                </View>
            </View>
            
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