import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const GpsStatusInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Seu GPS está desativado. {'\n'}Por favor, ative o GPS.
      </Text>
      <FontAwesome5 name={'exclamation-triangle'} size={30} color={'white'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    padding: 10,
    alignItems: 'center',
    paddingRight: 20,
  },
  text: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    paddingLeft: 20,
  },
});

export default GpsStatusInfo;
