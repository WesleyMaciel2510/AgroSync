import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {/* useInit, */ useSharedState} from './logic/index';
import {DefaultStyles} from '../../styles/styles';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import PhoneNumber from './phoneNumber';

interface Props {
  navigation: StackNavigationProp<any>;
}

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const {isLoading, setIsLoading, screen} = useSharedState();

  return (
    <View style={[DefaultStyles.container, DefaultStyles.center]}>
      <View style={{flex: 1, flexDirection: 'column', marginTop: 20}}>
        <View style={styles.logoArea}>
          <LottieView
            source={require('../../assets/lottie/register.json')}
            style={{width: 150, height: 150, margin: 20}}
            autoPlay
            loop={isLoading}
          />
        </View>
        {screen === 'phoneNumber' ? <PhoneNumber /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoArea: {
    //justifyContent: 'center',
    alignItems: 'center',
    /* backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#71727A',
    borderRadius: 40, */
  },
});

export default SignUpScreen;
