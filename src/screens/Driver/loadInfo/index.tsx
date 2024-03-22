import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
//import {useSharedState} from './logic';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import InfoTable from '../../../components/infoTable';
import Button from '../../../components/Button/button';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoadInfoScreen: React.FC<Props> = ({navigation}) => {
  const {loadInfo} = useSharedGlobalState();
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View style={styles.contentArea}>
          <InfoTable
            color={'#3498DB'}
            iconName={'info-circle'}
            title={'Informações da Carga'}
            line1={'Local de Coleta: ' + (loadInfo?.NomeOrigem ?? '')}
            line2={'Produto: ' + (loadInfo?.NomeProduto ?? '')}
            line3={'Peso: ' + (loadInfo?.Peso ?? '')}
            line4={''}
            highlightText={
              'Prazo de Entrega: ' + (loadInfo?.PrazoEntrega ?? '')
            }
          />
          <InfoTable
            color={'#EB4C1A'}
            iconName={'truck'}
            title={'Informações da Entrega'}
            line1={'Local de Entrega: ' + (loadInfo?.NomeDestino ?? '')}
            line2={' Falar com: Joaquim da Silva'}
            line3={'Contato: (34) 9 8872-9600'}
            line4={'Placa do Caminhão:' + (loadInfo?.PlacaCaminhão ?? '')}
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
