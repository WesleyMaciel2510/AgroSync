import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
// {useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import Button from '../../../components/Button/button';
import InfoTable from '../../../components/infoTable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AlertComponent from '../../../components/Alert/alert';
import LottieView from 'lottie-react-native';
import {sendPicture} from '../../../services/pictures';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoadInfoScreen: React.FC<Props> = ({navigation}) => {
  const {photo, isLoading, picturesToSend, loadInfo, setActionType} =
    useSharedGlobalState();
  {
    console.log('photo = ', photo);
  }
  const handleConfirmAction = async () => {
    console.log('picturesToSend = ', typeof picturesToSend);
    console.log('ID = ', loadInfo);
    console.log('loadInfo.ID', loadInfo.ID);
    const dataToSend = {
      ID: loadInfo.ID,
      IDTYPE: 'LOADID',
      IMGBASE64: picturesToSend,
    };
    console.log(
      'dataToSend = ',
      dataToSend.ID,
      dataToSend.IDTYPE,
      typeof dataToSend.IMGBASE64,
    );
    const result = await sendPicture(dataToSend);
    console.log('result', result);
    if (result) {
      navigation.navigate('Home');
    }
  };
  const handleAttachStub = ({navigation}) => {
    console.log('CHAMOU handleAttachStub');
    navigation.navigate('Camera');
    setActionType('CameraDriver');
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
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View style={styles.contentArea}>
          <View style={{flex: 12}}>
            <InfoTable
              color={'#494A50'}
              iconName={'file-invoice'}
              title={'Informações da Nota'}
              line1={'Número da Nota: 5555'}
              line2={'Valor da Nota: R$ 35.000'}
              line3={'Cliente: CropConnect Inc'}
              line4={'Data de Emissão: 20/03/2024'}
              highlightText={'Status do Canhoto: Não Enviado'}
            />
          </View>
          <View style={{flex: 7}}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                <FontAwesome5 name={'camera'} size={30} color={'#333'} />{' '}
                Registro de Fotos
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleAttachStub({navigation})}
              style={styles.button}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome5 name={'camera'} size={40} color="#fff" />
                <Text style={styles.text}> Anexar Recibo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {photo ? (
          <Image source={{uri: photo}} style={styles.invoicesImageArea} />
        ) : isLoading ? (
          <View style={styles.invoicesImageArea}>
            <LottieView
              source={require('../../../assets/lottie/loading-white.json')}
              style={{width: 200, height: 200, margin: 20}}
              autoPlay
              loop={true}
            />
          </View>
        ) : (
          <View style={styles.invoicesImageArea} />
        )}

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => confirmDelivery()}
            text={'FINALIZAR'}
            width={'50%'}
          />
        </View>
      </DrawerMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  contentArea: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#2897ff',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 22,
    paddingLeft: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'black',
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 15,
  },
});

export default LoadInfoScreen;
