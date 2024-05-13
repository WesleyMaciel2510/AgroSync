import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {confirmEmailService} from '../../services/user/confirmEmail';
import Button from '../../components/Button/button';
import LottieView from 'lottie-react-native';

const ValidateEmailArea = () => {
  // =======================================================================
  const {email, setEmail, isLoading, setIsLoading} = useSharedGlobalState();
  const {isEmailValidated, setIsEmailValidated} = useSharedState();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [EmailCodeTyped, setEmailCodeTyped] = useState('');
  const [EmailCodeSecret, setEmailCodeSecret] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const MAX_LENGTH = 6;
  // ========================================================================
  const handleEmailCodeChange = (text: string) => {
    console.log('text = ', text);
    isCodeSent ? setEmailCodeTyped(text) : setEmail(text);
  };

  const handleSendCode = async () => {
    if (!isCodeSent) {
      setIsLoading(true);
      // Define the validateEmail function correctly
      const validateEmail = () => {
        const regex =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
      };

      // Correctly use the validateEmail function by passing 'email' as an argument
      if (validateEmail()) {
        // Call service to send the email
        const result = await confirmEmailService(email);
        console.log('result = ', result);

        // Check if the result has a code and is not null
        if (result && result.code) {
          console.log(`@ Received valid code: ${result.code}`);
          // If return a code, store the code
          setEmailCodeSecret(result.code);
          setIsCodeSent(true);
          setErrorInput(false);
          setIsLoading(false);
        }
      } else {
        console.log('Email is not valid');
        setErrorInput(true);
      }
    } else {
      // do not compare types, `EmailCodeTyped` is string and `EmailCodeSecret` is number
      if (EmailCodeTyped == EmailCodeSecret) {
        console.log('@@ validated ');
        setIsLoading(false);
        setErrorInput(false);
        //change password
        setIsEmailValidated(true);
      } else {
        console.log('nao passou');
        setErrorInput(true);
      }
    }
  };
  // ===================================
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Opa, esqueceu a senha? {'\n'} Nós vamos te ajudar!
      </Text>
      {!isCodeSent ? (
        <Text style={styles.description}>
          Por favor, digite seu e-mail{'\n'} para recuperar o acesso à conta.
        </Text>
      ) : (
        <Text style={styles.description}>
          Por favor, digite o código enviado {'\n'} para {email}.
        </Text>
      )}
      <LottieView
        source={require('../../assets/lottie/forgot.json')}
        style={{width: 200, height: 200, margin: 20}}
        autoPlay
        loop={true}
      />
      <View style={{padding: 20}}>
        <TextInput
          value={isCodeSent ? EmailCodeTyped : email}
          onChangeText={handleEmailCodeChange}
          keyboardType={isCodeSent ? 'number-pad' : 'email-address'}
          placeholder={
            isCodeSent ? 'Digite o código enviado' : 'Digite o seu e-mail '
          }
          maxLength={isCodeSent ? MAX_LENGTH : undefined}
          style={styles.inputContent}
        />
      </View>
      {errorInput && isCodeSent && (
        <Text style={styles.errorText}>
          Por favor, digite o código enviado {'\n'} por email para redefinir sua
          senha.
        </Text>
      )}
      {errorInput && !isCodeSent && (
        <Text style={styles.errorText}>Por favor, digite um email válido.</Text>
      )}
      <View style={{width: '50%', alignSelf: 'center'}}>
        <Button
          onPress={handleSendCode}
          text={isCodeSent ? 'CONFIRMAR' : 'ENVIAR'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#87CEFA',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  inputContent: {
    color: 'black',
    width: 200,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ValidateEmailArea;
