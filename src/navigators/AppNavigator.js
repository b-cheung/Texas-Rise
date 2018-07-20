import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import StartUpScreen from '../screens/StartUpScreen';
import AuthMenuScreen from '../screens/AuthMenuScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AuthStack = createStackNavigator(
  {
    AuthMenu: { screen: AuthMenuScreen },
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen }
  },
  {
    initialRouteName: 'AuthMenu'
  }
);

const AppStack = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen }
});

const AppNavigator = createSwitchNavigator(
  {
    StartUp: StartUpScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'StartUp'
  }
);

export default AppNavigator;
