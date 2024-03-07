import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DriverModules = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>DriverModules</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DriverModules;
