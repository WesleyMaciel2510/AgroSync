import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface CustomTextInputProps {
  value: string;
  action: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({value, action}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={action}
      placeholder="Enter text"
      placeholderTextColor="#3AC0A0"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#3AC0A0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default GreenTextInput;
