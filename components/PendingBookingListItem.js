import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

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
    }
    });

    initialState = {
        doctor: '',
        date: '',
        timeSlot: ''
    }

class PendingBookingListItem extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.listItem}>
                <View style={styles.mainView}>
                    <View style={styles.leftView}>
                        <View style={styles.subView1}>
                            <Text style={styles.name}>{this.props.doctor}</Text>
                        </View>
                        <View style={styles.subView2}>
                            <Text>Date of Appointment: {new Date(this.props.date).toDateString()}</Text>
                            <Text>Time of Appointment: {this.props.timeSlot}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default PendingBookingListItem;