import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
} from 'react-native'
import axios from 'axios'

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    marginLeft: 5,
  },
  mainView: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  subView1: {
    flexDirection: 'row',
  },
  subView2: {
    marginTop: 10,
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
    margin: 10,
    padding: 10,
  },
  modalHeader: {
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 30,
    height: 100,
    marginBottom: 20,
    backgroundColor: '#990099',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#ffffff',
  },
  modalView: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  button: {
    width: 105,
    alignSelf: 'flex-end',
  },
  prescriptionText: {
    flex: 1,
    width: 140,
  },
})

class PrescriptionListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
    }
  }

  openFileHandler = (testId) => {
    const postId = testId
    axios
      .get(`http://192.168.86.24:3001/v1/uploading/labUpload/${postId}`)
      .then((res) => {
        console.log(res.data.post)
        this.setState({
          file: 'http://192.168.86.24:3001/' + res.data.post.fileURL,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidUpdate() {
    Linking.openURL(this.state.file) //to open in browser
  }

  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={1} style={styles.listItem}>
          <View style={styles.mainView}>
            <View style={styles.leftView}>
              <View style={styles.subView1}>
                <Text style={styles.name}>{this.props.testId}</Text>
              </View>
              <View style={styles.subView2}>
                <Text
                  style={styles.prescriptionText}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  location: {this.props.file}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.button}>
            <Button
              color="#990099"
              title="View"
              onPress={() => this.openFileHandler(this.props.testId)}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default PrescriptionListItem
