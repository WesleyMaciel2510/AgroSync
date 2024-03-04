import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DefaultStyles} from '../styles/styles';

const UserTypeSelector = ({title, description, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={DefaultStyles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 350,
    height: 120,
    padding: 20,
    backgroundColor: '#65E086',
  },
  description: {
    fontSize: 20,
  },
});

export default UserTypeSelector;
