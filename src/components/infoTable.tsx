import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface InfoTableProps {
  color: string;
  iconName: string;
  title: string;
  line1: string;
  line2: string;
  line3: string;
  line4?: string; // Optional
  line5?: string; // Optional
  highlightText: string;
}

const screenHeight = Dimensions.get('window').height;
const tableHeight = screenHeight * 0.3;

const InfoTable: React.FC<InfoTableProps> = ({
  color,
  iconName,
  title,
  line1,
  line2,
  line3,
  line4,
  line5,
  highlightText,
}) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.infoBar, {backgroundColor: color}]}>
        <View style={[styles.iconArea, {backgroundColor: color}]}>
          <FontAwesome5 name={iconName} size={40} color="#fff" />
        </View>
        <Text style={styles.title}> {title} </Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={[styles.line1, {height: tableHeight / 5}]}>
          <Text style={styles.lineText}>{line1}</Text>
        </View>
        <View style={[styles.line2, {height: tableHeight / 5}]}>
          <Text style={styles.lineText}>{line2}</Text>
        </View>
        <View style={[styles.line1, {height: tableHeight / 5}]}>
          <Text style={styles.lineText}>{line3}</Text>
        </View>
        {line4 && (
          <View style={[styles.line2, {height: tableHeight / 5}]}>
            <Text style={styles.lineText}>{line4}</Text>
          </View>
        )}
        {line5 && (
          <View style={[styles.line1, {height: tableHeight / 5}]}>
            <Text style={styles.lineText}>{line5}</Text>
          </View>
        )}
      </View>
      <View style={[styles.highlightArea, {backgroundColor: color}]}>
        <Text style={[styles.lineText, {color: 'white'}]}>{highlightText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  producArea: {
    backgroundColor: '#3AC0A0',
  },
  infoBar: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C5C6CC',
  },
  iconArea: {
    bottom: 0,
    position: 'absolute',
    padding: 12,
    borderRadius: 30,
  },
  tableContainer: {
    flexDirection: 'column',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: 'gray',
  },
  line1: {
    width: '100%',
    backgroundColor: '#E8E9F1',
  },
  line2: {
    width: '100%',
    backgroundColor: '#FFF',
  },
  highlightArea: {
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
    fontSize: 20,
    bottom: 2,
    left: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lineText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
    padding: 8,
  },
});

export default InfoTable;
