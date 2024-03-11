import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
//import {useSharedState} from './logic';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import Button from '../../../components/Button/button';
import InfoTable from '../../../components/infoTable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AlertComponent from '../../../components/Alert/alert';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoadInfoScreen: React.FC<Props> = ({navigation}) => {
  const handleConfirmAction = () => {
    console.log('CONFIRMED');
    //navigation.navigate();
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
        <View style={{alignItems: 'center', padding: 20}}>
          <TouchableOpacity
            onPress={() => console.log('aaaaa')}
            style={styles.button}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name={'camera'} size={40} color="#fff" />
              <Text style={styles.text}> Anexar Recibo</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.invoicesImageArea}></View>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 50,
          }}>
          <Button
            onPress={() => confirmDelivery()}
            text={'ENTREGAR'}
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
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  table: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#2897ff',
    width: '80%',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    paddingLeft: 20,
  },
  invoicesImageArea: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'black',
    width: 300,
    height: 180,
  },
});

export default LoadInfoScreen;
