import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    timeText: {
        textAlign: 'center'
    }
})

initialState = {
    label: ''
}

class TimeSlotListItem extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
      }

    render() {
        return (
            <TouchableOpacity>
                <View>
                    <Text style={styles.timeText}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default TimeSlotListItem;