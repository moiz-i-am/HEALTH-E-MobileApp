import React, { Component } from 'react';
import axios from 'axios';
import { View, FlatList } from 'react-native';
import DoctorListItem from '../components/DoctorListItem';

class DiscoverScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doctors: []
    };
  }
  
  componentDidMount(){
    axios.get("http://192.168.1.5:3001/v1/users").then(res => {
      this.setState({ doctors: res.data});
    }).catch(error => console.log(error));
  }

  render(){
    return (
      <View>
        <FlatList
          data={this.state.doctors}
          renderItem={({item}) => (<DoctorListItem
                                        navigation={this.props.navigation}
                                        picture={item.picture}
                                        name={item.name}
                                        specialization={item.specializations}
                                        rating={item.rating}
                                        price={item.price}
                                        docId={item.id}
                                        location={ item.location_city +
                                          ", " +
                                          item.location_state +
                                          ", " +
                                          item.location_country
                                        }
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
  title: 'Doctors',
  headerTitleStyle: { 
    textAlign:"center", 
    flex:1 
  },
};

