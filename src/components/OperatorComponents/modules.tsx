import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const OperatorModules = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'green'}}>Operator Modules</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OperatorModules;
