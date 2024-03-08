import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useInit, useOnLogin} from './logic/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {DefaultStyles} from '../../styles/styles';
import {useSharedState} from '../../context/globalUseState';
import Logo from '../../components/logo';
import Button from '../../components/button/button';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {email, setEmail, password, setPassword} = useSharedState();

  useInit();
  const {handleLogin} = useOnLogin();
  // ========================================
  return (
    <View style={[DefaultStyles.container, DefaultStyles.center]}>
      <Logo />
      <View style={styles.inputArea}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          style={styles.inputContent}
        />
      </View>

      <View style={styles.inputArea}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
          style={styles.inputContent}
        />
      </View>

      <Button text="Login" onPress={handleLogin} />
      <View style={{flexDirection: 'row'}}>
        <View style={[DefaultStyles.center, {flex: 1}]}>
          <Button
            text="Register"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
        <View style={[DefaultStyles.center, {flex: 1}]}>
          <Button
            text="Forgot"
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    paddingBottom: 20,
    width: '50%',
  },
  inputContent: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LoginScreen;
