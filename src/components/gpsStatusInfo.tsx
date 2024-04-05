import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSharedState as useSharedGlobalState} from '../context/globalUseState';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';

const GpsStatusInfo = () => {
  const {gpsOn, setGpsOn} = useSharedGlobalState();
  if (gpsOn) {
    Geolocation.watchPosition(
      (success: any) => {
        console.log('GPS DETECTADO COMO ON');
        if (success) {
          setGpsOn(true);
        }
      },
      (error: any) => {
        console.log('GPS DETECTADO COMO OFF');
        console.error(error);
        setGpsOn(false);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  const handlePress = () => {
    setGpsOn(true);
    console.log('apertou FECHAR');
    console.log('gpsOn = ', gpsOn);
  };
  return (
    !gpsOn && (
      <View style={styles.container}>
        <Text style={styles.text}>
          Seu GPS está desativado. {'\n'}Por favor, ative o GPS.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>FECHAR</Text>
        </TouchableOpacity>
      </View>
    )
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
    textAlign: 'left',
    paddingLeft: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default GpsStatusInfo;
