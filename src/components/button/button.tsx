import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
  color?: string;
  onPress: () => void;
  /* width?: string; */
  text: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  color = '#3AC0A0',
  onPress,
  width,
  text,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: color.length > 0 ? color : '#3AC0A0',
          width: width ? width : '100%',
        },
      ]}>
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
    width: '50%',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;
