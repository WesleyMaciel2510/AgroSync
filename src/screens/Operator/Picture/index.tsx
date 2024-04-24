import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useInit, useOnSendPictures} from './logic';
import Button from '../../../components/Button/button';
import GridComponent from '../../../components/gridPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SendModal from '../../../components/Modals/sendModal';
export {useOnSendPictures} from './logic';

interface Props {
  navigation: StackNavigationProp<any>;
}

const PictureScreen: React.FC<Props> = ({navigation}) => {
  const {handleSendPictures} = useOnSendPictures();
  useInit();
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
        <SendModal navigation={navigation} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => handleSendPictures({navigation})}
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
