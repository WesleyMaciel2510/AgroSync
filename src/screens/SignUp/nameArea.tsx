import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSharedState} from '../../context/userInfo';
import {DefaultStyles} from '../../styles/styles';

const NameArea = () => {
  const {name, setName, setScreen} = useSharedState();
  const [errorInput, setErrorInput] = useState(false);

  // =========================================================================
  //VALIDATIONS STEPS FOR name:

  //1 Validate that the input has no numbers.
  //2 Validate that the input has no special characters.
  //3 Check if the input contains at least two words (assuming a full
  //name consists of at least a first name and a last name).

  const handleNameText = () => {
    // Reset errorInput state
    setErrorInput(false);

    // Validate no numbers
    if (/\d/.test(name)) {
      setErrorInput(true);
      return;
    }

    // Validate no special characters
    if (/[^a-zA-Z\s]/.test(name)) {
      setErrorInput(true);
      return;
    }

    // Check if the input contains at least two words
    const words = name.trim().split(/\s+/);
    if (words.length < 2) {
      setErrorInput(true);
      return;
    }

    // If all validations pass, update the name and goes to the next step
    setName(name);
    setScreen('email');
  };
  // =========================================================================

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={DefaultStyles.title}> Qual seu nome completo? </Text>
        <View style={DefaultStyles.inputArea}>
          <TextInput
            value={name}
            onChangeText={setName}
            keyboardType="default"
            placeholder="Nome Completo"
            style={[
              DefaultStyles.inputContent,
              errorInput && DefaultStyles.errorInput,
            ]}
          />
        </View>
        {errorInput && (
          <Text style={DefaultStyles.errorText}>
            Por favor, digite pelo menos um nome e um sobrenome.
          </Text>
        )}
      </View>
      <View style={DefaultStyles.buttonContainer}>
        <Button
          title="Next"
          color="#3AC0A0"
          onPress={() => {
            handleNameText();
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

export default NameArea;
