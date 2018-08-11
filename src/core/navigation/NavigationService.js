import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  console.tron.log('setTopLevelNavigator');
  navigator = navigatorRef;
  navigate('Initialization');
}

function navigate(routeName, params) {
  if (navigator !== undefined) {
    console.tron.log('navigate to', routeName);
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  } else {
    console.tron.log('navigator is undefined');
  }
}

function goBack(key) {
  navigator.dispatch(NavigationActions.back({ key }));
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator
};
