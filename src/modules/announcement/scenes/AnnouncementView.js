import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

class AnnouncementView extends Component {
  renderView() {
    const data = this.props.navigation.getParam('data', null);
    const { title, body, author, timestamp } = data;
    if (data !== null) {
      return (
        <View>
          <Text>{title}</Text>
          <Text>{author.firstName}</Text>
          <Text>{moment.unix(timestamp.seconds).fromNow()}</Text>
          <Text>{body}</Text>0
        </View>
      );
    }

    return <Text>Props not loaded.</Text>;
  }

  render() {
    return <View>{this.renderView()}</View>;
  }
}

export default AnnouncementView;
