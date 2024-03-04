import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSharedState} from '../../context/userInfo';
import {DefaultStyles} from '../../styles/styles';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import PhoneNumberArea from './phoneNumber';
import NameArea from './nameArea';
import EmailArea from './emailAndPassword';
import UserType from './userType';

interface Props {
  navigation: StackNavigationProp<any>;
}

const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const {isLoading, screen} = useSharedState();
  let animationData;

  switch (screen) {
    case 'phoneNumber':
      animationData = require('../../assets/lottie/phoneNumber.json');
      break;
    case 'name':
      animationData = require('../../assets/lottie/name.json');
      break;
    case 'email':
      animationData = require('../../assets/lottie/register.json');
      break;
    case 'userType':
      animationData = require('../../assets/lottie/userType.json');
      break;
    default:
      // Default animation data or error handling
      break;
  }

  return (
    <View style={[DefaultStyles.container, DefaultStyles.center]}>
      <View style={{flex: 1, flexDirection: 'column', marginTop: 20}}>
        <View style={styles.logoArea}>
          <LottieView
            source={animationData}
            style={{width: 200, height: 200, margin: 20}}
            autoPlay
            loop={isLoading}
          />
        </View>
        {screen === 'phoneNumber' && <PhoneNumberArea />}
        {screen === 'name' && <NameArea />}
        {screen === 'email' && <EmailArea />}
        {screen === 'userType' && <UserType />}
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
