import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const IMAGE_HEIGHT = SCREEN_WIDTH / 2;
export const IMAGE_HEIGHT_SMALL = SCREEN_WIDTH / 7;

export default StyleSheet.create({
  container: {
    //backgroundColor: '#4c69a5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 20
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    // paddingHorizontal: 15,
    width: SCREEN_WIDTH - 30
  },
  textArea: {
    height: 150,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    // paddingHorizontal: 15,
    width: SCREEN_WIDTH - 30
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});
