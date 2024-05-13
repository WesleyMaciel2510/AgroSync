import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {DefaultStyles} from '../../styles/styles';
import Button from '../../components/Button/button';
import {useSharedState} from '../../context/globalUseState';
import {confirmEmailService} from '../../services/user/confirmEmail';
import LottieView from 'lottie-react-native';

const ConfirmEmailArea = () => {
  const {email, isLoading, setIsLoading, setScreen} = useSharedState();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [EmailCodeTyped, setEmailCodeTyped] = useState('');
  const [EmailCodeSecret, setEmailCodeSecret] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const MAX_LENGTH = 6;
  // =================================================================
  const handleEmailCodeChange = (text: string) => {
    console.log('text = ', text);
    setEmailCodeTyped(text);
  };
  const handleSendCode = async () => {
    if (!isCodeSent) {
      //chamar serviço para enviar o email
      const result = await confirmEmailService(email);
      console.log('result = ', result);
      if (result) {
        console.log(`Received valid code: ${result.code}`);
        //if return a code, store the code
        setEmailCodeSecret(result.code);
        setIsCodeSent(true);
      }
    } else {
      console.log('EmailCodeTyped = ', EmailCodeTyped);
      console.log('Typeof EmailCodeTyped = ', typeof EmailCodeTyped);

      console.log('EmailCodeSecret = ', EmailCodeSecret);
      console.log('Typeof EmailCodeSecret = ', typeof EmailCodeSecret);

      // do not compare types, `EmailCodeTyped` is string and `EmailCodeSecret` is number
      if (EmailCodeTyped == EmailCodeSecret) {
        console.log('@@@@@ passou @@@@@');
        setIsLoading(true);
        setErrorInput(false);
        setScreen('userType');
        //else shows alert
      } else {
        console.log('nao passou');
        setErrorInput(true);
        setIsLoading(false);
      }
    }
  };
  // =================================================================

  return (
    <View style={[DefaultStyles.container, DefaultStyles.center]}>
      <Text style={styles.title}> CONFIRMAÇÃO DE E-MAIL</Text>
      {!isCodeSent ? (
        <View>
          <Text style={styles.description}>
            Confirme seu email. {'\n'}Um código será enviado para: {'\n'}
            {email}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.description}>
            Um email com o código foi enviado para: {email}
          </Text>
          <Text style={styles.description}>
            Por favor, digite o código abaixo para confirmar seu e-mail.
          </Text>

          <View style={{alignItems: 'center', padding: 20}}>
            <TextInput
              value={EmailCodeTyped}
              onChangeText={handleEmailCodeChange}
              keyboardType="number-pad"
              placeholder=""
              maxLength={MAX_LENGTH}
              style={styles.inputContent}
            />
          </View>
        </View>
      )}

      {errorInput && (
        <Text style={[DefaultStyles.errorText, {fontSize: 18, lineHeight: 25}]}>
          O Código Digitado não está correto. {'\n'}
          Verifique o código digitado{'\n'}
          ou tente enviar um novo código. {'\n'}
        </Text>
      )}
      <View style={styles.buttonSend}>
        {isLoading ? (
          <LottieView
            source={require('../../assets/lottie/loading-black.json')}
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
            }}
            autoPlay
            loop={true}
          />
        ) : (
          <Button
            onPress={() => handleSendCode()}
            text={isCodeSent ? 'CONFIRMAR' : 'ENVIAR'}
          />
        )}
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
    lineHeight: 28,
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 30,
    letterSpacing: 1,
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
  buttonSend: {
    width: '50%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConfirmEmailArea;
