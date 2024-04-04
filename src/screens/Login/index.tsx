import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  BackHandler,
  Keyboard,
} from 'react-native';
import {useInit, useOnLogin} from './logic/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {DefaultStyles} from '../../styles/styles';
import {useSharedState} from '../../context/globalUseState';
import Logo from '../../components/logo';
import Button from '../../components/Button/button';
import LottieView from 'lottie-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {email, setEmail, password, setPassword} = useSharedState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputFocusOn, setInputFocusOn] = useState(false);

  const {handleLogin} = useOnLogin();
  useInit();
  const {height} = Dimensions.get('window');
  const margin = height > 800 ? 0 : 40;
  const eyeHorizontalPosition = height > 800 ? 60 : 35; //keep logic if needed in other devices
  const eyeVerticalPosition = height > 800 ? 290 : 260;
  //==================================================
  useEffect(() => {
    const handleKeyboardDidHide = () => {
      console.log('Keyboard was hidden');
      setInputFocusOn(false);
    };

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => keyboardDidHideListener.remove();
  }, []);
  //==================================================
  return (
    <ImageBackground
      style={[DefaultStyles.loginContainer, DefaultStyles.center]}
      source={require('../../assets/imgs/bgImage.png')}
      imageStyle={{opacity: 0.6}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <LottieView
          source={require('../../assets/lottie/login1.json')}
          style={styles.animation}
          autoPlay
          loop={true}
        />
        <LottieView
          source={require('../../assets/lottie/login2.json')}
          style={styles.animation}
          autoPlay
          loop={true}
        />
      </View>
      <Logo />

      <View style={styles.inputArea}>
        <FontAwesome5 name={'user-tie'} size={30} color={'#000'} />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu E-mail"
          style={styles.inputContent}
          onFocus={() => setInputFocusOn(true)}
          onSubmitEditing={() => setInputFocusOn(false)}
        />
      </View>

      <View style={styles.inputArea}>
        <FontAwesome5 name={'lock'} size={30} color={'#000'} />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua Senha"
          secureTextEntry={!passwordVisible}
          style={styles.inputContent}
          onFocus={() => setInputFocusOn(true)}
          onSubmitEditing={() => setInputFocusOn(false)}
        />
        {!inputFocusOn ? (
          <TouchableWithoutFeedback
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesome5
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={25}
              color="#000"
              style={[
                styles.hidePassword,
                {bottom: eyeHorizontalPosition, left: eyeVerticalPosition},
              ]}
            />
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      <View style={{width: '50%', padding: 20}}>
        <Button text="LOGIN" onPress={handleLogin} />
      </View>
      {!inputFocusOn ? (
        <View>
          <View style={styles.buttonStyle}>
            <Text style={styles.text}>Esqueceu sua senha?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.link}>Redefinir</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonStyle, {marginBottom: 20}]}>
            <Text style={styles.text}>Não tem sua conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.link}>Cadastre-se Agora</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContent: {
    width: '70%',
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  animation: {
    flex: 1,
    width: 120,
    height: 120,
    marginTop: 20,
    bottom: 20,
  },
  buttonStyle: {
    width: '80%',
    padding: 10,
    textAlign: 'center',
  },
  hidePassword: {
    position: 'absolute',
  },
  text: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
  },
  link: {
    color: '#346ee3',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default LoginScreen;
