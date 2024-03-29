import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState} from '../../components/ProducerComponents/logic';
import {requestLocationPermission} from '../../services/weather/askPermission';
import {useCameraPermission} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const DeniedPermissionScreen: React.FC<Props> = ({navigation}) => {
  /* const DeniedPermissionScreen: React.FC<{permissionLabel: string}> = ({
  permissionLabel,
}) => { */
  const {setLocationPermission} = useSharedState();
  const {hasPermission, requestPermission} = useCameraPermission();

  //const label = permissionLabel === 'location' ? 'Localização' : 'Câmera';
  const label = 'camera';
  const permissionLabel = 'camera';
  const handlePress = () => {
    if (permissionLabel === 'location') {
      const result = requestLocationPermission();
      console.log('requestLocationPermission@result = ', result);
    } else {
      // REQUEST CAMERA PERMISSION
      const result = requestPermission();
      console.log('requestPermission@result = ', result);
      if (hasPermission) {
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`Permissão de Acesso à ${label} não concedida`}
      </Text>

      <View style={styles.background}>
        <LottieView
          source={require('../../assets/lottie/producer/travel.json')}
          style={styles.lottieView}
          loop
          autoPlay
        />
      </View>

      <Text style={styles.text}>
        Pressione o botão abaixo para solicitar permissão novamente.
        {'\n'}
      </Text>
      <Text style={styles.text}>
        Se necessário, você pode ir para Configurações e verificar se {'\n'}a
        permissão foi concedida.
      </Text>

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

export default DeniedPermissionScreen;
