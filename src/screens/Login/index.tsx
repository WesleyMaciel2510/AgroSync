import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import {/* useInit, */ useSharedState, useOnLogin} from './logic/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {DefaultStyles} from '../../styles/styles';
import Logo from '../../components/logo';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {username, setUsername, password, setPassword} = useSharedState();

  //useInit();
  const {handleLogin} = useOnLogin();
  // ========================================
  return (
    <View style={[DefaultStyles.container, DefaultStyles.center]}>
      <Logo />
      <View style={styles.inputArea}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.inputContent}
        />
      </View>

      <View style={styles.inputArea}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.inputContent}
        />
      </View>

      <Button title="Login" onPress={handleLogin} />
      <View style={{flexDirection: 'row'}}>
        <View style={[DefaultStyles.center, {flex: 1}]}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
        <View style={[DefaultStyles.center, {flex: 1}]}>
          <Button title="Forgot" onPress={handleLogin} />
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
