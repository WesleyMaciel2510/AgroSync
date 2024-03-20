import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSharedState, useInit} from './logic';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import Button from '../../../components/Button/button';
import GridComponent from '../../../components/gridPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {sendArrayofPictures} from '../../../services/pictures/sendArrayofPictures';

interface Props {
  navigation: StackNavigationProp<any>;
}

const PictureScreen: React.FC<Props> = ({navigation}) => {
  const {setModalVisible} = useSharedState();
  const {schedulingInfo, picturesToDisplay, picturesToSend, quickRegister} =
    useSharedGlobalState();
  useInit();

  const handleChangeStatus = async () => {
    console.log('CHAMOU handleChangeStatus');
    console.log('Amount of pictures = ', picturesToDisplay.length);
    console.log('Amount of picture data = ', picturesToSend.length);

    console.log('picturesToSend = ', typeof picturesToSend);
    console.log('ID', schedulingInfo.IDAgendamento);

    const dataToSend = {
      ID: quickRegister ? 0 : schedulingInfo.IDAgendamento,
      IDTYPE: 'SCHEDULINGID',
      IMGBASE64: {} as {[key: number]: string},
    };
    // Add all the pictures improving the performance of the database architecture
    for (let i = 0; i < picturesToSend.length; i++) {
      dataToSend.IMGBASE64[i] = picturesToSend[i];
    }

    const result = await sendArrayofPictures(dataToSend);
    console.log('result', result);
    if (result) {
      navigation.navigate('Home');
    } else {
      setModalVisible(true);
    }
  };
  //============================================================================
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View style={styles.contentArea}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              <FontAwesome5 name={'camera'} size={30} color={'#333'} /> Registro
              de Fotos
            </Text>
          </View>
          <GridComponent navigation={navigation} />
        </View>

        {schedulingInfo.Status !== 'Finalizado' ? (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => handleChangeStatus()}
              text={'ENVIAR FOTOS'}
              width={'50%'}
            />
          </View>
        ) : null}
      </DrawerMenu>
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
