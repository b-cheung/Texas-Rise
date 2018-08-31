import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { Card, CardSection } from '../../../components';

const PollListItem = props => {
  const { onPress } = props;
  const { title, author, timestamp } = props.data;
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={{ flex: 1 }}>{title}</Text>
          <Text style={{ flex: 1 }}>{author.firstName}</Text>
          <Text style={{ flex: 1 }}>{moment.unix(timestamp.seconds).fromNow()}</Text>
        </CardSection>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
});

export default PollListItem;
