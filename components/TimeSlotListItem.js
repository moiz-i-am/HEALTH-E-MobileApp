import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    timeText: {
        textAlign: 'center'
    }
})

class TimeSlotListItem extends Component {

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