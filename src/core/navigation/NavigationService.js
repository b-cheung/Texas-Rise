import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  console.log('setTopLevelNavigator');
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (navigator !== undefined) {
    console.log('navigate to', routeName);
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  } else {
    console.log('navigator is undefined');
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
