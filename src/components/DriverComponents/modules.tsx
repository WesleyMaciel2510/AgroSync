import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedState} from './logic';
import CardHome from '../cardHome';
import SearchLoadModal from '../../components/Modals/searchLoadModal';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}
const DriverModules: React.FC<Props> = ({navigation}) => {
  const {setModalVisible} = useSharedState();

  const cardsData = [
    {
      cardTitle: 'Buscar Carga',
      cardIcon: 'truck',
      cardAction: () => setModalVisible(true),
    },
    {
      cardTitle: 'Intralogística',
      cardIcon: 'warehouse',
      cardAction: () => setModalVisible(true),
    },
    {
      cardTitle: 'Ler QRCODE',
      cardIcon: 'qrcode',
      cardAction: () => navigation.navigate('ReaderCamera'),
    },
    {
      cardTitle: 'Cód. de Barras',
      cardIcon: 'barcode',
      cardAction: () => console.log('Cód. de Barras action'),
    },
  ];

  return (
    <View style={styles.container}>
      {cardsData.map((data, index) => (
        <CardHome
          key={index}
          cardTitle={data.cardTitle}
          cardIcon={data.cardIcon}
          onPress={data.cardAction}
        />
      ))}
      <SearchLoadModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default DriverModules;
