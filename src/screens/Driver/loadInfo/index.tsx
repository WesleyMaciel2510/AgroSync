import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
//import {useSharedState} from './logic';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import InfoTable from '../../../components/infoTable';
import Button from '../../../components/Button/button';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoadInfoScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View style={styles.contentArea}>
          <InfoTable
            color={'#3498DB'}
            iconName={'info-circle'}
            title={'Informações da Carga'}
            line1={'Local de Coleta: Uberaba - MG'}
            line2={'Produto: Soja'}
            line3={'Peso: 5000 kg'}
            line4={''}
            highlightText={'Prazo de Entrega: 16/03/2024'}
          />
          <InfoTable
            color={'#EB4C1A'}
            iconName={'truck'}
            title={'Informações da Entrega'}
            line1={'Local de Entrega: Campinas - SP'}
            line2={' Falar com: Joaquim da Silva'}
            line3={'Contato: (34) 9 8872-9600'}
            line4={'Placa do Caminhão: ABC 1234'}
            highlightText={'Status da Entrega: Não Iniciada'}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Button
            onPress={() => navigation.navigate('InvoiceInfo')}
            text={'INICIAR'}
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
});

export default LoadInfoScreen;
