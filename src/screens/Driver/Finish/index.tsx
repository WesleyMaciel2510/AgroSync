import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Button from '../../../components/Button/button';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
import LottieView from 'lottie-react-native';
import {storage} from '../../../redux/mmkv/storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
//import {fa-solid fa-star} from '@fortawesome/free-solid-svg-icons';

interface Props {
  navigation: StackNavigationProp<any>;
}

const FinishDriverScreen: React.FC<Props> = ({navigation}) => {
  const {name, setName} = useSharedGlobalState();

  // ===============================================================
  useEffect(() => {
    const loadedName = storage.getString('loggedUserName') || '';
    setName(loadedName);
  }, []);
  // ===============================================================
  const getFirstName = (fullName: string) => {
    // Split the full name into parts based on spaces
    const nameParts = fullName.split(' ');

    // Return the first part of the array which is the first name
    return nameParts[0];
  };

  // Store the first name in a variable
  const firstName = getFirstName(name);
  // ===============================================================

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/lottie/driver/finish.json')}
        style={styles.animation}
        autoPlay
        loop={true}
      />
      <Text style={styles.titleText}>Parabéns pela viagem!</Text>

      <View style={styles.contentArea}>
        <View style={styles.border}>
          <Text style={styles.paragraphText}>
            Obrigado por usar nosso serviço, {firstName}! Avalie sua experiência
            abaixo:
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
          <FontAwesome5 name={'star'} size={50} color="yellow" />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate('InvoiceInfo')}
          text={'INICIAR'}
          width={'50%'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentArea: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  animation: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#66c4e3',
    marginBottom: 20,
    textAlign: 'center',
    padding: 20,
  },
  border: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#517af5',
    backgroundColor: 'lightblue',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  paragraphText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'justify',
    lineHeight: 25,
    margin: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    //flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default FinishDriverScreen;
