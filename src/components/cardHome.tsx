import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../styles/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface CardHomeProps {
  cardTitle: string;
  cardIcon: string;
  onPress?: () => void;
}

const CardHome: React.FC<CardHomeProps> = ({cardTitle, cardIcon, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {backgroundColor: colors.green, borderColor: '#298267'},
      ]}
      onPress={onPress}>
      <View style={[styles.iconContainer]}>
        <FontAwesome5 name={cardIcon} size={30} color={colors.gray} />
      </View>
      <Text style={styles.title}>{cardTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 142,
    height: 120,
    borderRadius: 15,
    padding: 10,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  iconContainer: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    color: '#1F2024',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardHome;
