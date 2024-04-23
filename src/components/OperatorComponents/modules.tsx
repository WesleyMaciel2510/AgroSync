import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {StackNavigationProp} from '@react-navigation/stack';
import SearchSchedulingModal from '../Modals/searchSchedulingModal';
import {useOnHandlePermission} from '../../screens/Camera/requestPermission';
import CardHome from '../cardHome';
import {RootState} from '../../redux/types';
import {useSelector} from 'react-redux';

interface Props {
  navigation: StackNavigationProp<any>;
}
const OperatorModules: React.FC<Props> = ({navigation}) => {
  const {setModalVisible} = useSharedState();
  const {setCameraType, setActionType, setQuickRegister, setCameraScreen} =
    useSharedGlobalState();
  const {handlePermission} = useOnHandlePermission();
  const selectCameraPermission = (state: RootState) => state.locationPermission;
  const CAMERAPERMISSION = useSelector(selectCameraPermission);

  // ============================================================

  const handleCameraPermission = async () => {
    if (!CAMERAPERMISSION) {
      const result = await handlePermission();
      console.log('result = ', result);
      if (result) {
        navigation.navigate('ReaderCamera');
        setCameraScreen(true);
      } else {
        navigation.navigate('DeniedPermission');
      }
    } else {
      navigation.navigate('ReaderCamera');
      setCameraScreen(true);
    }
  };
  // ============================================================

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
        handleCameraPermission();
      },
    },
    {
      cardTitle: 'Ler Cód. \nde Barras',
      cardIcon: 'barcode',
      cardAction: () => {
        setCameraType('barcode');
        setActionType('schedulingInfo');
        handleCameraPermission();
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
