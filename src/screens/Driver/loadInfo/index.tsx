import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
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
      <View style={styles.contentArea}>
        <View style={styles.tableContainer}>
          <InfoTable
            color={'#3498DB'}
            iconName={'info-circle'}
            title={'Informações da Carga'}
            line1={'Local de Coleta: ' + (loadInfo?.NomeOrigem ?? '')}
            line2={'Produto: ' + (loadInfo?.NomeProduto ?? '')}
            line3={'Peso: ' + (loadInfo?.Peso ?? '')}
            highlightText={
              'Prazo de Entrega: ' + (loadInfo?.PrazoEntrega ?? '')
            }
          />
        </View>
        <View style={styles.tableContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
  },
  contentArea: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  tableContainer: {
    flex: 1,
  },
});

export default LoadInfoScreen;
