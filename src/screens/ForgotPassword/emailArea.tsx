import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const CodeArea = () => {
  const [SMSCode, setSMSCode] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const MAX_LENGTH = 6;

  const handleSMSCodeChange = text => {
    console.log('text = ', text);
    setSMSCode(text);
  };

  const handleSendCode = code => {
    if (code === '111111') {
      console.log('passou');
    } else {
      console.log('nao passou');
      setErrorInput(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> REDEFINIÇÃO {'\n'}DE SENHA</Text>
      <Text style={styles.description}>
        Opa, esqueceu a senha? {'\n'} Nós vamos te ajudar!
      </Text>
      <LottieView
        source={require('../../assets/lottie/forgot.json')}
        style={{width: 200, height: 200, margin: 20}}
        autoPlay
        loop={true}
      />

      <View style={{padding: 20}}>
        <TextInput
          value={SMSCode}
          onChangeText={handleSMSCodeChange}
          keyboardType="number-pad"
          placeholder=""
          maxLength={MAX_LENGTH}
          style={styles.inputContent}
        />
      </View>

      {errorInput && (
        <Text style={styles.errorText}>
          Por favor, digite o código enviado {'\n'} por SMS para redefinir sua
          senha.
        </Text>
      )}
      <View style={{width: '50%'}}>
        <Button onPress={() => handleSendCode(SMSCode)} text={'ENVIAR'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default CodeArea;
