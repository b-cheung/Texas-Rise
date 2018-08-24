import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Splash from '../../modules/auth/scenes/Splash';
import Initialization from '../../modules/auth/scenes/Initialization';
import Welcome from '../../modules/auth/scenes/Welcome';
import Login from '../../modules/auth/scenes/Login';
import Register from '../../modules/auth/scenes/Register';
import VerifyEmail from '../../modules/auth/scenes/VerifyEmail';
import Home from '../../modules/main/scenes/Home';
import Settings from '../../modules/main/scenes/Settings';
import AnnouncementFeed from '../../modules/announcement/scenes/AnnouncementFeed';
import AnnouncementCreate from '../../modules/announcement/scenes/AnnouncementCreate';
import Poll from '../../modules/polls/scenes/Poll';
import PollResults from '../../modules/polls/scenes/PollResults';
import PollCreate from '../../modules/polls/scenes/PollCreate';

const AuthStack = createStackNavigator(
  {
    Welcome: { screen: Welcome },
    Login: { screen: Login },
    Register: { screen: Register },
    VerifyEmail: { screen: VerifyEmail }
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
    initialRouteName: 'AnnouncementFeed'
    // headerMode: 'none',
    // mode: 'modal'
  }
);

const PollStack = createStackNavigator(
  {
    Poll: { screen: Poll },
    PollCreate: { screen: PollCreate },
    PollResults: { screen: PollResults }
  },
  {
    initialRouteName: 'PollCreate'
  }
);

const AppStack = createBottomTabNavigator(
  {
    AnnouncementStack,
    PollStack,
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
    Initialization,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Splash'
  }
);
