import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
import InfoTable from '../../../components/infoTable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AlertComponent from '../../../components/Alert/alert';
import {sendPicture} from '../../../services/pictures';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoadInfoScreen: React.FC<Props> = ({navigation}) => {
  const {photo, picturesToSend, loadInfo, setActionType, setCameraScreen} =
    useSharedGlobalState();

  const handleConfirmAction = async () => {
    const dataToSend = {
      ID: loadInfo.ID,
      IDTYPE: 'LOADID',
      IMGBASE64: picturesToSend,
    };
    const result = await sendPicture(dataToSend);
    if (result) {
      navigation.navigate('Home');
    }
  };

  const handleAttachStub = () => {
    navigation.navigate('Camera');
    setActionType('CameraDriver');
    setCameraScreen(true);
  };

  const confirmDelivery = () => {
    AlertComponent({
      title: 'Confirmação de Entrega',
      description: 'Você realmente chegou no cliente?',
      okButton: 'Sim',
      cancelButton: 'Não',
      confirmAction: handleConfirmAction,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InfoTable
        color={'#494A50'}
        iconName={'file-invoice'}
        title={'Informações da Nota'}
        line1={'Número da Nota: ' + (loadInfo?.ID ?? '')}
        line2={'Valor da Nota: R$ 35.000'}
        line3={'Cliente: CropConnect Inc'}
        line4={'Data de Emissão: 20/03/2024'}
        highlightText={'Status do Canhoto: Não Enviado'}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          <FontAwesome5 name={'camera'} size={30} color={'#333'} /> Registro de
          Fotos
        </Text>
      </View>
      <TouchableOpacity onPress={handleAttachStub} style={styles.button}>
        <View style={styles.buttonContent}>
          <FontAwesome5 name={'camera'} size={40} color="#fff" />
          <Text style={styles.text}> Anexar Recibo</Text>
        </View>
      </TouchableOpacity>

      {photo ? (
        <Image source={{uri: photo}} style={styles.invoicesImageArea} />
      ) : (
        <View style={styles.invoicesImageArea} />
      )}

      <TouchableOpacity onPress={confirmDelivery} style={styles.finishButton}>
        <Text style={styles.finishButtonText}>FINALIZAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#2897ff',
    width: '80%',
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    paddingLeft: 20,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  invoicesImageArea: {
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black',
    width: '50%',
    height: '25%',
    alignSelf: 'center',
  },
  finishButton: {
    backgroundColor: '#2897ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default LoadInfoScreen;
