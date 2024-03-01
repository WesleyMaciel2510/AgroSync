import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NewComponent = () => {
  return (
    <View style={styles.container}>
      <Text> New Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewComponent;
