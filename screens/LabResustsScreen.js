import React, { Component } from 'react'
import axios from 'axios'
import { View, FlatList, AsyncStorage } from 'react-native'
import LabResultCard from '../components/LabResultCard'
import ListEmpty from '../components/ListEmpty'

class LabResultsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      tests: [],
    }
  }

  async componentDidMount() {
    const userDetails = await AsyncStorage.getItem('jwtToken')
    if (userDetails !== null) {
      const user = JSON.parse(userDetails)

      console.log(user.user.id)

      this.setState({
        id: user.user.id,
      })
    } else {
      console.log('no data...')

      this.setState({
        id: '',
      })
    }

    axios
      .get(
        `http://192.168.1.14:3001/v1/uploading/testResultsPatient/${this.state.id}`
      )
      .then((res) => {
        this.setState({ tests: res.data.posts })
      })
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.tests}
          ListEmptyComponent={<ListEmpty />}
          renderItem={({ item }) => {
            return (
              <LabResultCard
                navigation={this.props.navigation}
                testId={item._id}
                file={item.fileURL}
                labId={item.labId}
              />
            )
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

export default LabResultsScreen

LabResultsScreen.navigationOptions = {
  title: 'Lab Results',
  headerTitleStyle: {
    textAlign: 'center',
    fontSize: 17,
    flex: 1,
  },
}
