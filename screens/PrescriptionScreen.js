import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, TouchableHighlight } from 'react-native';
import axios from 'axios';
import PrescriptionListItem from '../components/PrescriptionListItem';
import { AsyncStorage } from 'react-native';
import { Overlay } from 'react-native-elements';

const styles = StyleSheet.create({
    confirmModalHeader: {
        textAlign:'center',
        alignItems:'center',
        paddingTop: 30,
        height: 100,
        marginBottom: 20,
        backgroundColor: '#9458AE',
        fontWeight: "bold", 
        fontSize: 24,
        color: '#ffffff'
      },
      confirmModalView: {
        textAlign: 'center',
        alignItems:'center',
        fontSize: 30,
      }
    });

class PrescriptionScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          id: '',
          prescriptions: [],
          date:'',
          doctor:'',
          prescriptionText:'',
          timeSlot:'',
          isVisible: false
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
          patientId: this.state.id
        };
    
        axios.post(`http://192.168.1.5:3001/v1/prescription/patient`, data).then(res => {
          // this.setState({ bookings: res.data };
          setTimeout(() => {
            this.setState({ prescriptions: res.data  });
          }, 2000);
        });
      }

    handleOverlay = () => {
        this.setState({
                        date: item.date, 
                        doctor: item.doctorName, 
                        prescriptionText: item.prescriptionText, 
                        timeSlot: item.timeSlot,
                        isVisible: true
                    })
    }

    render() {
        return (
            <View>
                {/* <Overlay
                  isVisible={this.state.isVisible} 
                  onBackdropPress={() => this.setState({ isVisible: false })}
                  animationType='fade'
                  width={320}
                  height={550}>
                    <View>
                        <Text style={styles.confirmModalHeader}>Prescription Details</Text>
                        <View style={styles.confirmModalView}>
                            <Text>Doctor: {this.state.docName}</Text>
                            <Text>Appointment Date: {new Date(this.state.date).toDateString()}</Text>
                            <Text>Medication: {this.state.prescriptionText}</Text>
                        </View>
                    </View>
                  </Overlay> */}
                <View>
                <FlatList
                    data={this.state.prescriptions}
                    renderItem={({item}) => (
                                <TouchableOpacity onPress={() => this.handleOverlay}>
                                    <PrescriptionListItem
                                        //navigation={this.props.navigation}
                                        date={item.date}
                                        doctor={item.doctorName}
                                        prescriptionText={item.prescriptionText}
                                        doctorId={item.doctorId}
                                        timeSlot={item.timeSlot}
                                    />
                                </TouchableOpacity>
                                    )}
                    keyExtractor={item => item.id}
                />
                </View>
            </View>
        );
    }
}

export default PrescriptionScreen;

PrescriptionScreen.navigationOptions = {
    title: 'My Prescriptions',
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1,
  },
  };