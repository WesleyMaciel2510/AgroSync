import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface InfoTableProps {
  color: string;
  iconName: string;
  title: string;
  line1: string;
  line2: string;
  line3: string;
  line4?: string; //Optional
  line5?: string; //Optional
  highlightText: string;
}

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
    <View style={styles.container}>
      <View style={[styles.infoBar, {backgroundColor: color}]}>
        <View style={[styles.iconArea, {backgroundColor: color}]}>
          <FontAwesome5 name={iconName} size={40} color="#fff" />
        </View>
        <Text style={styles.title}> {title} </Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.line1}>
          <Text style={styles.lineText}>{line1}</Text>
        </View>
        <View style={styles.line2}>
          <Text style={styles.lineText}>{line2}</Text>
        </View>
        <View style={styles.line1}>
          <Text style={styles.lineText}>{line3}</Text>
        </View>
        <View style={styles.line2}>
          <Text style={styles.lineText}>{line4}</Text>
        </View>
        <View style={styles.line1}>
          <Text style={styles.lineText}>{line5}</Text>
        </View>
      </View>
      <View style={[styles.highlightArea, {backgroundColor: color}]}>
        <Text style={[styles.lineText, {color: 'white', marginLeft: 10}]}>
          {highlightText}
        </Text>
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
    fontSize: 22,
    bottom: 2,
    left: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lineText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
    padding: 8,
  },
});

export default InfoTable;
