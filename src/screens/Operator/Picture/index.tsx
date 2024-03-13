import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {/* useSharedState */ useInit} from './logic';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import Button from '../../../components/Button/button';
import GridComponent from '../../../components/gridPicture';

interface Props {
  navigation: StackNavigationProp<any>;
}

const PictureScreen: React.FC<Props> = ({navigation}) => {
  const {photo, setPhoto, schedulingInfo} = useSharedGlobalState();
  useInit();

  const handleChangeStatus = () => {
    console.log('CHAMOU handleChangeStatus');
    navigation.navigate('');
  };
  //============================================================================
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View style={styles.contentArea}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Registro de Fotos</Text>
          </View>
          <GridComponent />
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
