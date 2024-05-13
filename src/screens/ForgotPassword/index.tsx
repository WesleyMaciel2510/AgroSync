import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSharedState} from '../../screens/ForgotPassword/logic';
import {StackNavigationProp} from '@react-navigation/stack';
import ValidateEmailArea from './validateEmail';
import NewPasswordArea from './newPasswordArea';

interface Props {
  navigation: StackNavigationProp<any>;
}

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const {isEmailValidated} = useSharedState();
  // =================================================================

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}> REDEFINIÇÃO {'\n'}DE SENHA</Text>
      </View>

      {!isEmailValidated ? <ValidateEmailArea /> : <NewPasswordArea />}
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
    fontSize: 18,
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
    width: 230,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 10,
  },
});

export default ForgotPasswordScreen;
