import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

  const {handleLogin} = useOnLogin();
  useInit();
  const {height} = Dimensions.get('window');
  const margin = height > 800 ? 0 : 40;
  const eyeHorizontalPosition = height > 800 ? 30 : 30; //keep logic if needed in other devices
  const eyeVerticalPosition = height > 800 ? 300 : 270;
  // ========================================
  return (
    <ImageBackground
      style={[DefaultStyles.loginContainer, DefaultStyles.center]}
      source={require('../../assets/imgs/bgImage.png')}
      imageStyle={{opacity: 0.6}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <LottieView
          source={require('../../assets/lottie/login1.json')}
          style={{width: 200, height: 200, margin: 15, flex: 1, bottom: margin}}
          autoPlay
          loop={true}
        />
        <LottieView
          source={require('../../assets/lottie/login2.json')}
          style={{width: 200, height: 200, margin: 15, flex: 1, bottom: margin}}
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
        />
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
      </View>
      <View style={{width: '50%', padding: 20}}>
        <Button text="Login" onPress={handleLogin} />
      </View>
      <View style={{flexDirection: 'row', marginBottom: 50}}>
        <View style={styles.buttonStyle}>
          <Button
            text="Register"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            text="Forgot"
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    padding: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContent: {
    width: '70%',
    marginLeft: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    width: '80%',
    paddingHorizontal: 30,
  },
  hidePassword: {
    position: 'absolute',
  },
});

export default LoginScreen;
