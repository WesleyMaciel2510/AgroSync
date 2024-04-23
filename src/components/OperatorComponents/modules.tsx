import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {StackNavigationProp} from '@react-navigation/stack';
import SearchSchedulingModal from '../Modals/searchSchedulingModal';
import {useOnHandlePermission} from '../../screens/Camera/requestPermission';
import CardHome from '../cardHome';

interface Props {
  navigation: StackNavigationProp<any>;
}
const OperatorModules: React.FC<Props> = ({navigation}) => {
  const {setModalVisible} = useSharedState();
  const {setCameraType, setActionType, setQuickRegister, setCameraScreen} =
    useSharedGlobalState();
  const {handlePermission} = useOnHandlePermission();

  const checkIfPermissionIsTrue = async () => {
    const result = await handlePermission();
    console.log('result = ', result);
    if (result) {
      navigation.navigate('ReaderCamera');
      setCameraScreen(true);
    } else {
      navigation.navigate('DeniedPermission');
    }
  };

  const cardsData = [
    {
      cardTitle: 'Consultar Agendamento',
      cardIcon: 'calendar-check',
      cardAction: () => {
        setModalVisible(true);
        setQuickRegister(false);
      },
    },
    {
      cardTitle: 'Registro \nRápido',
      cardIcon: 'dolly-flatbed',
      cardAction: () => {
        navigation.navigate('Picture');
        setQuickRegister(true);
      },
    },
    {
      cardTitle: 'Ler QRCODE',
      cardIcon: 'qrcode',
      cardAction: () => {
        setCameraType('qrcode');
        setActionType('schedulingInfo');
        checkIfPermissionIsTrue();
      },
    },
    {
      cardTitle: 'Ler Cód. \nde Barras',
      cardIcon: 'barcode',
      cardAction: () => {
        setCameraType('barcode');
        setActionType('schedulingInfo');
        checkIfPermissionIsTrue();
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
      <SearchSchedulingModal />
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
