import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import CardHome from '../cardHome';
import SearchLoadModal from '../../components/Modals/searchLoadModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {useOnHandlePermission} from '../../screens/Camera/requestPermission';
import {RootState} from '../../redux/types';
import {useSelector} from 'react-redux';

interface Props {
  navigation: StackNavigationProp<any>;
}

const DriverModules: React.FC<Props> = ({navigation}) => {
  const {setModalVisible} = useSharedState();
  const {setCameraType, setActionType, setCameraScreen} =
    useSharedGlobalState();
  const {handlePermission} = useOnHandlePermission();
  const selectCameraPermission = (state: RootState) => state.cameraPermission;
  const CAMERAPERMISSION = useSelector(selectCameraPermission);
  // ============================================================
  const handleCameraPermission = async () => {
    console.log('Vai chamar handlePermission ');
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
      cardAction: async () => {
        setCameraType('qrcode');
        setActionType('searchLoad');
        setCameraScreen(false);
        handleCameraPermission();
      },
    },
    {
      cardTitle: 'Cód. de Barras',
      cardIcon: 'barcode',
      cardAction: () => {
        setCameraType('barcode');
        setActionType('searchLoad');
        setCameraScreen(false);
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
