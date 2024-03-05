import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
  color?: string;
  onPress: () => void;
  /* width?: string; */
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  color = '#3AC0A0',
  onPress,
  /* width = '100%', */
  text,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor: color}]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default Button;
