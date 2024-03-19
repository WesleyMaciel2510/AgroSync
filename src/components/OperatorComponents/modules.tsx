import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {StackNavigationProp} from '@react-navigation/stack';
import SearchScheduling from '../Modals/searchScheduling';
import CardHome from '../cardHome';

interface Props {
  navigation: StackNavigationProp<any>;
}
const OperatorModules: React.FC<Props> = ({navigation}) => {
  const {setModalVisible} = useSharedState();
  const {setCameraType, setActionType} = useSharedGlobalState();

  const cardsData = [
    {
      cardTitle: 'Consultar Agendamento',
      cardIcon: 'calendar-check',
      cardAction: () => setModalVisible(true),
    },
    {
      cardTitle: 'Registro \nRápido',
      cardIcon: 'dolly-flatbed',
      cardAction: () => navigation.navigate('Picture'),
    },
    {
      cardTitle: 'Ler QRCODE',
      cardIcon: 'qrcode',
      cardAction: () => {
        setCameraType('qrcode');
        setActionType('schedulingInfo');
        navigation.navigate('ReaderCamera');
      },
    },
    {
      cardTitle: 'Ler Cód. \nde Barras',
      cardIcon: 'barcode',
      cardAction: () => {
        setCameraType('barcode');
        setActionType('schedulingInfo');
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
      <SearchScheduling />
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

export default OperatorModules;
