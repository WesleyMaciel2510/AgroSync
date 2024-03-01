import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import {DefaultStyles} from '../../styles/styles';
import Logo from '../../components/logo';
import {setLogin} from '../../services/login';
import {Alert} from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //const [isInputFocused, setInputFocused] = useState(false);
  const handleLogin = async () => {
    console.log('chamou handleLogin');
    console.log('username = ', username);
    console.log('password = ', password);
    try {
      const loginSuccessful = await setLogin(username, password);
      if (loginSuccessful) {
        // Login successful
        console.log('Login successful!');
        // Perform any actions you want to do after successful login
      } else {
        // Login failed
        console.log('Login failed!');
        Alert.alert(
          'Login Failed', // Alert title
          'Please check your credentials or try again later.', // Alert message
          [
            {text: 'OK', onPress: () => console.log('Button OK Pressed!')},
            {
              text: 'Cancel',
              onPress: () => console.log('Button Cancel Pressed!'),
            },
          ],
        );
        // Handle login failure, such as displaying an error message to the user
      }
    } catch (error) {
      // Error occurred while logging in
      console.error('Error during login:', error);
      // Handle the error, such as displaying an error message to the user
    }
  };
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
