import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Rating } from 'react-native-ratings';

const styles = StyleSheet.create({
name: {
    fontSize: 20,
    marginLeft: 5
},
mainView: {
    flexDirection: 'row',
    marginBottom: 5
},
leftView: {
    width: 175
},
subView1: {
    flexDirection:'row',
},
subView2: {
    marginTop: 10
},
rightView:{
    alignItems: 'flex-start',
    width: 150
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
button: {
    width: 105,
    alignSelf: 'flex-end'
}
});

initialState = {
    name: '',
    picture: '',
    specialization: [],
    rating: '',
    price: '',
    location: ''
}

class DoctorListItem extends Component {

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
                            <Avatar rounded source={{ uri: this.props.picture }} />
                            <Text style={styles.name}>{this.props.name}</Text>
                        </View>
                        <View style={styles.subView2}>
                            <Text>Urologist, Child Specialist</Text>
                        </View>
                    </View>
                    <View style={styles.rightView}>
                        <Rating 
                            type='star' 
                            imageSize={20}
                            ratingCount={5} 
                            ratingColor='#4287f5' 
                            readonly={true} 
                            startingValue={this.props.rating}
                        />
                        <Text>PKR 200</Text>
                        <Text>{this.props.location}</Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button color='#9458AE' title='View Profile' onPress={()=> this.props.navigation.navigate('DoctorProfile',{ 
                        name: this.props.name,
                        picture: this.props.picture,
                        specialization: this.props.specializations,
                        rating: this.props.rating,
                        price: this.props.price,
                        location: this.props.location,
                        docId: this.props.docId
                        })}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

export default DoctorListItem;