import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSharedState} from '../../context/userData';

const PhoneNumber = () => {
  const {phoneNumber, setPhoneNumber} = useSharedState();

  const formatPhoneNumber = (number: string): string => {
    let cleanedNumber = number.replace(/\D/g, '');

    if (cleanedNumber.length > 2) {
      cleanedNumber = cleanedNumber.replace(/^0+/, '');
    }

    if (cleanedNumber.length >= 3 && cleanedNumber.length <= 11) {
      return `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(
        2,
        3,
      )} ${cleanedNumber.slice(3, 7)}-${cleanedNumber.slice(7)}`;
    } else {
      return cleanedNumber;
    }
  };

  // Format the phone number whenever phoneNumber changes
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  const handleChangeText = (text: string) => {
    const formattedText = formatPhoneNumber(text);
    setPhoneNumber(formattedText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}> What is your phone number? </Text>
        <View style={styles.inputArea}>
          <TextInput
            value={formattedPhoneNumber}
            onChangeText={handleChangeText}
            keyboardType="number-pad"
            placeholder="(99) 9 9999-9999"
            style={styles.inputContent}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          color="#3AC0A0"
          onPress={() => console.log('aaaaaaaa ')}
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
    justifyContent: 'flex-start', // Align content at the top
  },
  title: {
    color: '#71727A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputArea: {
    padding: 10,
  },
  inputContent: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default PhoneNumber;
