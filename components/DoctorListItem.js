import React, { Component } from 'react';
import { View, Image, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';

const styles = StyleSheet.create({

});

class DoctorListItem extends Component {
    render() {
        return (
            <TouchableOpacity>
                <View>
                    <Image source={this.props.picture}/>
                    <Text>{this.props.name}</Text>
                    <Rating type='star' ratingCount='5' ratingColor='#4287f5' readonly='true' startingValue={this.props.rating}/>
                    <Text>{this.props.price}</Text>
                    <Text>{this.props.location}</Text>
                    <Button title='View Profile'/>
                </View>
            </TouchableOpacity>
        );
    }
}

export default DoctorListItem;