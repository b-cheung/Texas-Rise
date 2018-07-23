import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Splash from '../../modules/auth/scenes/Splash';
import Welcome from '../../modules/auth/scenes/Welcome';
import Login from '../../modules/auth/scenes/Login';
import Register from '../../modules/auth/scenes/Register';
import Home from '../../modules/home/scenes/Home';
import Settings from '../../modules/home/scenes/Settings';

const AuthStack = createStackNavigator(
  {
    Welcome: { screen: Welcome },
    Login: { screen: Login },
    Register: { screen: Register }
  },
  {
    initialRouteName: 'Welcome'
  }
);

const AppStack = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: 'Home'
  }
);

export const RootNavigator = createSwitchNavigator(
  {
    StartUp: Splash,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'StartUp'
  }
);
