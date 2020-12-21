import React, { Component } from 'react'
import axios from 'axios'
import { View, FlatList } from 'react-native'
import DoctorListItem from '../components/DoctorListItem'
import ListEmpty from '../components/ListEmpty'

class FindDoctorsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctors: [],
    }
  }

  componentDidMount() {
    axios
      .get('http://192.168.1.14:3001/v1/users')
      .then((res) => {
        this.setState({ doctors: res.data })
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.doctors}
          ListEmptyComponent={<ListEmpty />}
          renderItem={({ item }) => {
            if (item.role === 'doctor') {
              return (
                <DoctorListItem
                  navigation={this.props.navigation}
                  picture={item.picture}
                  name={item.name}
                  specialization={item.specializations}
                  rating={item.rating}
                  price={item.price}
                  docId={item.id}
                  location={
                    item.location_city //+
                    // ', ' +
                    // item.location_state +
                    // ', ' +
                    // item.location_country
                  }
                />
              )
            }
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

export default FindDoctorsScreen

FindDoctorsScreen.navigationOptions = {
  title: 'Doctors',
  headerTitleStyle: {
    textAlign: 'center',
    fontSize: 17,
    flex: 1,
  },
}
