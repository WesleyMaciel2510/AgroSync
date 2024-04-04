import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSharedState, useInit} from './logic';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
import Button from '../../../components/Button/button';
import GridComponent from '../../../components/gridPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ErrorSendModal from '../../../components/Modals/errorSendModal';

import {sendArrayofPictures} from '../../../services/pictures/sendArrayofPictures';

interface Props {
  navigation: StackNavigationProp<any>;
}

const PictureScreen: React.FC<Props> = ({navigation}) => {
  const {setModalVisible, setIsLoading, setErrorSync} = useSharedState();
  const {
    schedulingInfo,
    picturesToSend,
    quickRegister,
    setSuccessSendingPictures,
    setPictureIndex,
    setPicturesToDisplay,
    setPicturesToSend,
  } = useSharedGlobalState();
  useInit();

  const handleSendPictures = async () => {
    console.log('CHAMOU handleSendPictures');
    setIsLoading(true);
    setErrorSync(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const dataToSend = {
      ID: quickRegister ? 0 : schedulingInfo.IDAgendamento,
      IDTYPE: 'SCHEDULINGID',
      IMGBASE64: {} as {[key: number]: string},
      DATETIME: formattedDate,
    };
    // Add all the pictures improving the performance of the database architecture
    for (let i = 0; i < picturesToSend.length; i++) {
      dataToSend.IMGBASE64[i] = picturesToSend[i];
    }
    console.log('dataToSend = ', dataToSend.IMGBASE64);
    const result = await sendArrayofPictures(dataToSend);
    console.log('result', result);
    if (result) {
      setIsLoading(false);
      setModalVisible(false);
      navigation.navigate('Home');
      setSuccessSendingPictures(true);
      sendArrayofPictures('');
      setPictureIndex(0);
      setPicturesToDisplay(['']);
      setPicturesToSend(['']);
    } else {
      setIsLoading(false);
      setErrorSync(true);
    }
  };
  //============================================================================
  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <FontAwesome5 name={'camera'} size={30} color={'#333'} /> Registro
            de Fotos
          </Text>
        </View>
        <GridComponent navigation={navigation} />
        <ErrorSendModal />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => handleSendPictures()}
          text={'ENVIAR FOTOS'}
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
  },
  contentArea: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 15,
  },
});

export default PictureScreen;
