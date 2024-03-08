import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSharedState} from '../../context/globalUseState';
import {DefaultStyles} from '../../styles/styles';

const EmailArea = () => {
  const {email, setEmail, password, setPassword, setScreen} = useSharedState();
  const [errorInputEmail, setErrorInputEmail] = useState(false);
  const [errorInputPassword, setErrorInputPassword] = useState(false);

  // =========================================================================
  const handleEmailText = (text: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(text)) {
      // If the input matches the email format, update the email state
      setScreen('userType');
    } else {
      setErrorInputEmail(true);
    }
  };
  // =========================================================================
  const handlePasswordText = (passwordText: string) => {
    // Validate if the password meets the criteria
    let hasNumber = /\d/.test(passwordText);
    let hasLetter = /[a-zA-Z]/.test(passwordText);
    let hasSpecialChar = /[^a-zA-Z0-9]/.test(passwordText);

    // Check if all criteria are met
    if (hasNumber && hasLetter && hasSpecialChar && passwordText.length >= 8) {
      // If all validations pass, password is valid
      setScreen('userType');
    } else {
      // If any validation fails, display an error message
      setErrorInputPassword(true);
    }
  };

  // =========================================================================

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={DefaultStyles.title}> Qual seu e-mail? </Text>
        <View style={DefaultStyles.inputArea}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Digite seu Email"
            style={DefaultStyles.inputContent}
          />
          {errorInputEmail && (
            <Text style={DefaultStyles.errorText}>
              Por favor, digite um e-mail válido.
            </Text>
          )}
        </View>
        <Text style={DefaultStyles.title}> Digite sua senha </Text>
        <View style={DefaultStyles.inputArea}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            keyboardType="visible-password"
            placeholder="Digite sua senha"
            style={DefaultStyles.inputContent}
          />
          {errorInputPassword && (
            <Text style={styles.errorPassword}>
              Sua senha precisa ser mais segura.{'\n'}
              Digite uma senha com pelo menos:{'\n'}
              {'-'}Um número {'\n'} Uma letra maiúscula
              {'\n'} caractere especial.
            </Text>
          )}
        </View>
        {/* <Text style={DefaultStyles.title}> Confirme sua senha </Text>
        <View style={DefaultStyles.inputArea}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            keyboardType="visible-password"
            placeholder="Password"
            style={DefaultStyles.inputContent}
          />
          {errorInputPassword && (
            <Text style={DefaultStyles.errorText}>
              Sua senha precisa ser mais segura.{'\n'}
              Digite uma senha com pelo menos:{'\n'}
              {'-'}Um número, uma letra maiúscula, e um caractere especial.
            </Text>
          )}
        </View> */}
      </View>
      <View style={DefaultStyles.buttonContainer}>
        <Button
          title="Next"
          color="#3AC0A0"
          onPress={() => {
            handleEmailText(email);
            handlePasswordText(password);
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
    padding: 10,
  },
  errorPassword: {
    color: 'red',
    marginBottom: 5,
    textAlign: 'left',
  },
});

export default EmailArea;
