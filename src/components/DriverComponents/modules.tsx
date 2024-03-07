import React from 'react';
import {StyleSheet, View} from 'react-native';
import CardHome from '../cardHome';
import {searchLoad} from '../../services/loads/index';

const DriverModules = () => {
  const data = 5555;

  const cardsData = [
    {
      cardTitle: 'Buscar Carga',
      cardIcon: 'truck',
      cardAction: () => searchLoad(data),
    },
    {
      cardTitle: 'Intralogística',
      cardIcon: 'warehouse',
      cardAction: () => console.log('Intralogística action'),
    },
    {
      cardTitle: 'Ler QRCODE',
      cardIcon: 'qrcode',
      cardAction: () => console.log('Ler QRCODE action'),
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
