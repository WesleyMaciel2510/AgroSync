import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import {DefaultStyles} from '../../styles/styles';
import Button from '../../components/button/button';

interface Props {
  navigation: StackNavigationProp<any>;
}

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const [SMSCode, setSMSCode] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const MAX_LENGTH = 6;

  const handleSMSCodeChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');

    const truncatedText = numericText.slice(0, MAX_LENGTH);

    setSMSCode(truncatedText);
  };

  return (
    <View style={[DefaultStyles.container, DefaultStyles.center]}>
      <LottieView
        source={require('../../assets/lottie/forgot.json')}
        style={{width: 200, height: 200, margin: 20}}
        autoPlay
        loop={false}
      />
      <Text style={styles.title}>
        Opa, esqueceu a senha? {'\n'} Nós vamos te ajudar!
      </Text>
      <View style={{padding: 20}}>
        <TextInput
          value={SMSCode.toString()}
          onChangeText={handleSMSCodeChange}
          keyboardType="number-pad"
          placeholder=""
          maxLength={MAX_LENGTH}
          style={styles.inputContent}
        />
      </View>

      {errorInput && (
        <Text style={DefaultStyles.errorText}>
          Por favor, digite o código enviado por SMS para redefinir sua senha.
        </Text>
      )}
      <Button onPress={() => console.log('aaaa')} text={'ENVIAR'} />
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputContent: {
    width: 200,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
  },
});

export default ForgotPasswordScreen;
