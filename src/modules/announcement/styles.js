import { StyleSheet } from 'react-native';
import { Font } from 'expo';

export default StyleSheet.create({
    announcementStyle: {
        flex: 1,
        borderColor: 'transparent',
        shadowColor: 'transparent',
        flexDirection: 'column',
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    textStyle: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'PingFang SC'
    }
});
