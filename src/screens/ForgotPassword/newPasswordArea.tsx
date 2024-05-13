import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {DefaultStyles} from '../../styles/styles';
import Button from '../../components/Button/button';
import {handleChangePassword} from './logic';

const NewPasswordArea = () => {
  const {email, setEmail, password, setPassword, isLoading, setIsLoading} =
    useSharedGlobalState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorInputPassword, setErrorInputPassword] = useState(false);
  const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState(false);
  const navigation = useNavigation();

  // =========================================================
  const handleResetPassword = async () => {
    const isValid = handlePasswordText(password);
    // se a senha for segura, chamar função para resetar
    if (isValid) {
      setIsLoading(true);
      const result = await handleChangePassword(email, password);
      if (result) {
        setIsLoading(false);
        setEmail('');
        setPassword('');
        navigation.navigate('Login');
      }
    }
  };
  // ========================================================

  const handlePasswordText = (passwordText: string) => {
    // Validate if the password meets the criteria
    let hasNumber = /\d/.test(passwordText);
    let hasLetter = /[a-zA-Z]/.test(passwordText);
    let hasSpecialChar = /[^a-zA-Z0-9]/.test(passwordText);

    // Check if all criteria are met
    if (
      hasNumber &&
      hasLetter &&
      hasSpecialChar &&
      passwordText.length >= 8 &&
      passwordText === confirmPassword &&
      password === confirmPassword
    ) {
      // If all validations pass, password is valid
      console.log('passou');
      return true;
    } else {
      // If any validation fails, display an error message
      if (password !== confirmPassword) {
        setPasswordDoesNotMatch(true);
        return false;
      } else {
        setErrorInputPassword(true);
        return false;
      }
    }
  };
  // =========================================================

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.description}>
          Só um momento.{'\n'} Estamos redefinindo sua senha. {'\n'} Por favor,
          não feche o aplicativo.
        </Text>
      ) : (
        <Text style={styles.description}>
          Opa, esqueceu a senha? {'\n'} Nós vamos te ajudar!
        </Text>
      )}

      <LottieView
        source={require('../../assets/lottie/forgot.json')}
        style={{width: 200, height: 200, margin: 20}}
        autoPlay
        loop={true}
      />
      <Text style={DefaultStyles.title}> Digite sua senha </Text>
      <View style={DefaultStyles.inputArea}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          keyboardType="visible-password"
          placeholder="Digite sua senha"
          style={DefaultStyles.inputContent}
        />
      </View>
      {/* // CONFIRMATION ================================================================== */}
      <Text style={DefaultStyles.title}> Confirme sua senha </Text>
      <View style={DefaultStyles.inputArea}>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          keyboardType="visible-password"
          placeholder="Confirme sua senha"
          style={DefaultStyles.inputContent}
        />
        {errorInputPassword && (
          <Text style={DefaultStyles.errorText}>
            Sua senha precisa ser mais segura.{'\n'}
            Digite uma senha com pelo menos:{'\n'}- Um número, uma letra
            maiúscula, e um caractere especial.
          </Text>
        )}
        {passwordDoesNotMatch && (
          <Text style={DefaultStyles.errorText}>
            Suas senhas não conferem. {'\n'}Por favor, verifique a senha
            digitada.
          </Text>
        )}
        <View style={{width: '50%', alignSelf: 'center', paddingTop: 20}}>
          {isLoading ? (
            <LottieView
              source={require('../../assets/lottie/loading-black.json')}
              style={{width: 50, height: 50, marginLeft: 50}}
              autoPlay
              loop={true}
            />
          ) : (
            <Button onPress={handleResetPassword} text={'REDEFINIR SENHA'} />
          )}
        </View>
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

export default NewPasswordArea;
