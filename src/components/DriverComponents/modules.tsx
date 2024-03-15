import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import CardHome from '../cardHome';
import SearchLoadModal from '../../components/Modals/searchLoadModal';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}
const DriverModules: React.FC<Props> = ({navigation}) => {
  const {setModalVisible} = useSharedState();
  const {setCameraType} = useSharedGlobalState();

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
      cardAction: () => {
        setCameraType('qrcode');
        navigation.navigate('ReaderCamera');
      },
    },
    {
      cardTitle: 'Cód. de Barras',
      cardIcon: 'barcode',
      cardAction: () => {
        setCameraType('barcode');
        navigation.navigate('ReaderCamera');
      },
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
