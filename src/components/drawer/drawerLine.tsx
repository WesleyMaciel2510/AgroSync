import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface DrawerLineProps {
  onPress: () => void;
  text: string;
  iconName: string;
}

const DrawerLine: React.FC<DrawerLineProps> = ({onPress, text, iconName}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentArea}>
        <FontAwesome5 name={iconName} size={30} color="#494A50" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  contentArea: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    marginTop: 3,
    paddingLeft: 20,
    color: 'black',
    fontSize: 20,
  },
});

export default DrawerLine;
