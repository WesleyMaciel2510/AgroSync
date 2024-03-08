import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const InfoTable = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.producArea}>

      </View> */}
      <View>
        <View style={[styles.infoBar, {backgroundColor: colors.primary}]}>
          <View style={[styles.iconArea, {backgroundColor: '#3498DB'}]}>
            <FontAwesome5 name={'info-circle'} size={50} color="#fff" />
          </View>
          <Text style={styles.title}> Informações de Origem </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.line1}>
            <Text style={styles.lineText}> Local de Coleta: Uberaba - MG</Text>
          </View>
          <View style={styles.line2}>
            <Text style={styles.lineText}> Falar com: José</Text>
          </View>
          <View style={styles.line1}>
            <Text style={styles.lineText}> Contato: (34) 9 8872-9600 </Text>
          </View>
          <View style={styles.line2}></View>
        </View>
        <View style={styles.deadLineArea}>
          <Text style={[styles.lineText, {color: 'white', marginLeft: 10}]}>
            Prazo de Coleta: 15/03/2024
          </Text>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <View style={[styles.infoBar, {backgroundColor: '#eb7550'}]}>
          <View style={[styles.iconArea, {backgroundColor: '#eb7550'}]}>
            <FontAwesome5 name={'info-circle'} size={50} color="#fff" />
          </View>
          <Text style={styles.title}> Informações de Destino </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.line1}>
            <Text style={styles.lineText}>Local de Entrega: Campinas - SP</Text>
          </View>
          <View style={styles.line2}>
            <Text style={styles.lineText}> Falar com: Maria</Text>
          </View>
          <View style={styles.line1}>
            <Text style={styles.lineText}> Contato: (34) 9 8872-9600 </Text>
          </View>
          <View style={styles.line2}></View>
        </View>

        <View style={[styles.deadLineArea, {backgroundColor: '#eb7550'}]}>
          <Text style={[styles.lineText, {color: 'white', marginLeft: 10}]}>
            Prazo de Entrega: 16/03/2024
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  producArea: {
    backgroundColor: '#3AC0A0',
  },
  infoBar: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C5C6CC',
  },
  iconArea: {
    bottom: 0,
    position: 'absolute',
    padding: 10,
    borderRadius: 30,
  },
  tableContainer: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'gray',
  },
  line1: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#E8E9F1',
  },
  line2: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  deadLineArea: {
    backgroundColor: '#3498DB',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'gray',
    elevation: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    bottom: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lineText: {
    color: '#000',
    fontSize: 22,
    textAlign: 'left',
    padding: 8,
  },
});

export default InfoTable;
