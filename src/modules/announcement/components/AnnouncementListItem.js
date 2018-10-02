import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { Card, CardSection } from '../../../components';

const AnnouncementListItem = props => {
  const { onPress } = props;
  const { title, body, author, timestamp } = props.data;
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <CardSection style={{ borderTopWidth: 0, borderBottomWidth: 1 }}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={{ flex: 1, marginLeft: 5, color: '#9A9A9A' }}>{author.firstName}: </Text>
          <Text style={styles.timeStyle}>{moment.unix(timestamp.seconds).fromNow()}</Text>
          <Text style={styles.bodyText}>{body}</Text>
        </CardSection>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    flex: 1,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 2,
    paddingLeft: 5
  },
  bodyText: {
    flex: 1,
    marginTop: 3,
    marginBottom: 5,
    paddingBottom: 5,
    paddingLeft: 5
  },
  timeStyle: {
    position: 'absolute', 
    alignSelf: 'flex-end', 
    fontSize: 12,
    color: '#C4C3C3',
    paddingRight: 10
  }

});

export default AnnouncementListItem;
