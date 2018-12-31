import { StyleSheet, Dimensions } from 'react-native';
import { Font } from 'expo';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
};

export const IMAGE_HEIGHT = dimensions.fullWidth / 2;
export const IMAGE_HEIGHT_SMALL = dimensions.fullWidth / 7;

export const colors = {
  primary: '#FFE6A7',
  secondary: '#001B41',
  tertiary: '#5DA6A7'
};

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
};

export const margin = {
  sm: 5,
  md: 10,
  lg: 25,
  xl: 40
};

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Cochin'
};

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20
  },
  textField: {
    height: 50,
    // backgroundColor: '#fff',
    //   marginHorizontal: 10,
    marginVertical: 30
    //   paddingVertical: 5,
    //   paddingHorizontal: 0,
    // width: SCREEN_WIDTH - 30
  },
  textArea: {
    height: 150,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    // paddingHorizontal: 15,
    width: dimensions.fullWidth - 30
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  titleStyle: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 70,
    alignSelf: 'center',
    fontFamily: 'Autery'
  }
});
