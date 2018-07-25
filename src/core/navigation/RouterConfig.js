import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Splash from '../../modules/auth/scenes/Splash';
import Welcome from '../../modules/auth/scenes/Welcome';
import Login from '../../modules/auth/scenes/Login';
import Register from '../../modules/auth/scenes/Register';
import Home from '../../modules/main/scenes/Home';
import Settings from '../../modules/main/scenes/Settings';
import AnnouncementFeed from '../../modules/main/scenes/announcements/AnnouncementFeed';
import AnnouncementCreate from '../../modules/main/scenes/announcements/AnnouncementCreate';

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

const AnnouncementStack = createStackNavigator(
  {
    AnnouncementFeed: { screen: AnnouncementFeed },
    AnnouncementCreate: { screen: AnnouncementCreate }
  },
  {
    initialRouteName: 'AnnouncementFeed',
    headerMode: 'none',
    mode: 'modal'
  }
);

const AppStack = createBottomTabNavigator(
  {
    AnnouncementStack,
    Home: { screen: Home },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: 'Home'
  }
);

export const RootNavigator = createSwitchNavigator(
  {
    Splash,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Splash'
  }
);
