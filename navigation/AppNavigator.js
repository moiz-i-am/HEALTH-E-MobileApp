import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import Login from './../screens/Login'
import Signup from './../screens/Signup'
import DoctorProfile from './../components/DoctorProfile'
import ShowProfileScreen from './../screens/ShowProfileScreen'

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: Login,
    Signup: Signup,
    Main: MainTabNavigator,
    DoctorProfile: DoctorProfile,
    Profile: ShowProfileScreen,
  })
)
