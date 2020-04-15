import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import axios from 'axios';
import {
  Text, View, FlatList,
} from 'react-native';
import DoctorListItem from '../components/DoctorListItem';

class DiscoverScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doctors: []
    };
  }

  componentDidMount(){
    axios.get(`/v1/users`).then(res => {
      this.setState({ doctors: res.data});
      alert("res: " + res);
    });
  }

  render(){
    return (
      <View>
        <FlatList
          data={this.state.doctors}
          renderItem={({item}) => (<DoctorListItem 
                                        picture={item.picture}
                                        name={item.name}
                                        rating={item.rating}
                                        price={item.price}
                                        location={item.location}
                                      />
                                    )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
}

export default DiscoverScreen;

DiscoverScreen.navigationOptions = {
  title: 'Discover',
  headerTitleStyle: { 
    textAlign:"center", 
    flex:1 
  },
};

