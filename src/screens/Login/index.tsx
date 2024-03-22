import React from 'react';
import {View, StyleSheet, TextInput, Text, ImageBackground} from 'react-native';
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
  const {handleLogin} = useOnLogin();
  useInit();
  // ========================================
  return (
    <ImageBackground
      style={[DefaultStyles.loginContainer, DefaultStyles.center]}
      source={require('../../assets/imgs/bgImage.png')}
      imageStyle={{opacity: 0.6}}>
      <View style={{flexDirection: 'row'}}>
        <LottieView
          source={require('../../assets/lottie/login1.json')}
          style={{width: 200, height: 200, margin: 20, flex: 1}}
          autoPlay
          loop={true}
        />
        <LottieView
          source={require('../../assets/lottie/login2.json')}
          style={{width: 200, height: 200, margin: 20, flex: 1}}
          autoPlay
          loop={true}
        />
      </View>
      <Logo />
      <Text style={styles.title}>Agrosync</Text>

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
          secureTextEntry
          style={styles.inputContent}
        />
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3deb82',
    marginBottom: 20,
  },
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
});

export default LoginScreen;
