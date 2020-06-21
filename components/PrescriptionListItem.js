import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Overlay } from 'react-native-elements';


const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        marginLeft: 5
    },
    mainView: {
        flexDirection: 'row',
        marginBottom: 5
    },
    subView1: {
        flexDirection:'row',
    },
    subView2: {
        marginTop: 10
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
        margin      : 10,
        padding     : 10,
    },
    modalHeader: {
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
    modalView: {
        textAlign: 'center',
        alignItems:'center',
        fontSize: 30,
      },
    button: {
        width: 105,
      alignSelf: 'flex-end'
      },
    prescriptionText:{
      flex: 1,
      width: 140
      },
      
    });

const    initialState = {
        doctorName: '',
        date: '',
        prescriptionText: '',
        isVisible: false
    }

class PrescriptionListItem extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {
        return (
            <View>
                <Overlay
                  isVisible={this.state.isVisible} 
                  onBackdropPress={() => this.setState({ isVisible: false })}
                  animationType='fade'
                  width={320}
                  height={550}>
                    <View>
                        <Text style={styles.modalHeader}>{this.state.doctorName}</Text>
                        <View style={styles.modalView}>
                            {/* <Text>Appointment Date: {new Date(this.state.date).toDateString()}</Text> */}
                            <Text>{this.state.prescriptionText}</Text>
                        </View>
                    </View>
                  </Overlay>

            <TouchableOpacity activeOpacity={1} style={styles.listItem}>
                <View style={styles.mainView}>
                    <View style={styles.leftView}>
                        <View style={styles.subView1}>
                            <Text style={styles.name}>{this.props.doctor}</Text>
                        </View>
                        <View style={styles.subView2}>
                            <Text>Date of Appointment: {new Date(this.props.date).toDateString()}</Text>
                            <Text style={styles.prescriptionText} ellipsizeMode='tail' numberOfLines = {1}>Prescription: {this.props.prescriptionText}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button color='#9458AE' title='View Details' onPress={() => this.setState({isVisible: true, doctorName: this.props.doctor,
                                                                                                date: new Date(this.props.date).toDateString(),
                                                                                                prescriptionText: this.props.prescriptionText})}
                    />
                </View>
            </TouchableOpacity>
            </View>
        );
    }
}

export default PrescriptionListItem;