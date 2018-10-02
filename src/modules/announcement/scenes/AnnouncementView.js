import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from '../../../../src/components';
import moment from 'moment';
import styles from '../styles';
import theme from '../../../styles/theme';

class AnnouncementView extends Component {
  renderView() {
    const data = this.props.navigation.getParam('data', null);
    const { title, body, author, timestamp } = data;
    if (data !== null) {
      return (
        <View style={{ flex: 1 }}>

            <Text style={theme.smallTitleStyle}>{title}</Text>
            <Text style={{ alignSelf: 'center', flexDirection: 'column' }}>{body}</Text>
            {/* bottom right corner? */}
            <Text>-{author.firstName}</Text>
            {/* style to put time bottom right corner */}
            <Text>{moment.unix(timestamp.seconds).fromNow()}</Text>

        </View>
      );
    }

    return <Text>Props not loaded.</Text>;
  }

  render() {
    return <View style={{ backgroundColor: 'white', flex: 1 }}>{this.renderView()}</View>;
  }
}

export default AnnouncementView;
