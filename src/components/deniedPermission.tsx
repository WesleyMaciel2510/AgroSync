import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState} from './ProducerComponents/logic';
import {Linking} from 'react-native';
import {requestLocationPermission} from '../services/weather/askPermission';
import {useCameraPermission} from 'react-native-vision-camera';

const DeniedPermission: React.FC<{permissionLabel: string}> = ({
  permissionLabel,
}) => {
  const {locationPermission} = useSharedState();
  const {requestPermission, hasPermission} = useCameraPermission();

  const label = permissionLabel === 'location' ? 'Localização' : 'Camera';
  const handlePress = () => {
    permissionLabel === 'location'
      ? requestLocationPermission()
      : requestPermission();
    console.log('locationPermission = ', locationPermission);
    console.log('cameraPermission = ', hasPermission);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {permissionLabel === 'location'
          ? `Permissão de Acesso à ${label} não concedida`
          : `Permissão de Acesso à ${label} não concedida`}
      </Text>

      <View style={styles.background}>
        <LottieView
          source={require('../assets/lottie/producer/travel.json')}
          style={styles.lottieView}
          loop
          autoPlay
        />
      </View>
      <View>
        <Text style={styles.text}>
          Pressione o botão abaixo para solicitar permissão novamente.
          {'\n'}
        </Text>
      </View>
      <View>
        <Text style={styles.text}>
          Se necessário, você pode ir para Configurações e verificar se {'\n'}a
          permissão foi concedida.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openSettings()}>
          <Text style={styles.buttonText}>VERIFICAR PERMISSÃO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>SOLICITAR PERMISSÃO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
    padding: 20,
  },
  background: {
    backgroundColor: 'white',
    borderRadius: 200,
    padding: 10,
  },
  lottieView: {
    width: 300,
    height: 300,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#3AC0A0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DeniedPermission;
