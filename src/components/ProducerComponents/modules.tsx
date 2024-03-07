import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProducerModules = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'green'}}>Producer Modules</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProducerModules;
