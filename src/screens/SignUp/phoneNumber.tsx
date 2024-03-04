import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSharedState} from '../../context/userInfo';
import {DefaultStyles} from '../../styles/styles';

const PhoneNumberArea = () => {
  const {phoneNumber, setPhoneNumber, setScreen} = useSharedState();

  const formatPhoneNumberArea = (number: string): string => {
    let cleanedNumber = number.replace(/\D/g, '');

    // Remove leading zeros
    cleanedNumber = cleanedNumber.replace(/^0+/, '');

    // Format the phone number
    if (cleanedNumber.length <= 2) {
      return cleanedNumber;
    } else if (cleanedNumber.length <= 7) {
      return `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(2)}`;
    } else {
      return `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(
        2,
        3,
      )} ${cleanedNumber.slice(3, 7)}-${cleanedNumber.slice(7)}`;
    }
  };

  // Format the phone number whenever PhoneNumberArea changes
  const formattedPhoneNumberArea = formatPhoneNumberArea(phoneNumber);

  const handleChangeText = (text: string) => {
    const formattedText = formatPhoneNumberArea(text);
    setPhoneNumber(formattedText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[DefaultStyles.title, {paddingBottom: 20}]}>
          Qual seu número de telefone?
        </Text>
        <TextInput
          value={formattedPhoneNumberArea}
          onChangeText={handleChangeText}
          keyboardType="number-pad"
          placeholder="(99) 9 9999-9999"
          style={DefaultStyles.inputContent}
        />
      </View>
      <View style={DefaultStyles.buttonContainer}>
        <Button
          title="Next"
          color="#3AC0A0"
          onPress={() => {
            setScreen('name');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default PhoneNumberArea;
