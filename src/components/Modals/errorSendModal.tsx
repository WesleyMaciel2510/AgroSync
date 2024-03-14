import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSharedState} from '../../screens/Operator/Picture/logic';
import Button from '../Button/button';
import LottieView from 'lottie-react-native';

const ErrorSendModal = () => {
  const {
    isLoading,
    setIsLoading,
    modalVisible,
    setModalVisible,
    errorSync,
    setErrorSync,
  } = useSharedState();
  const AnimationPath = isLoading
    ? require('../../assets/lottie/loading.json')
    : require('../../assets/lottie/errorSync.json');

  return (
    <Modal
      isVisible={modalVisible}
      animationIn={'bounceIn'}
      animationOut={'bounceOut'}
      onModalHide={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>
              {isLoading
                ? 'Suas fotos estão \n sendo enviadas.'
                : 'Suas fotos não \n foram enviadas.'}
            </Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <FontAwesome5 name={'times'} size={30} color={'gray'} />
            </TouchableOpacity>
          </View>
          <LottieView
            source={AnimationPath}
            style={{width: 200, height: 150, margin: 20}}
            autoPlay
            loop={isLoading}
          />
          {!isLoading && (
            <Button
              onPress={() => {
                console.log('');
                setIsLoading(true);
              }}
              text={'TENTAR NOVAMENTE'}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    height: 200,
    //alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 200,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    color: 'black',
  },
  icon: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    bottom: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#1F2024',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ED7117',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ErrorSendModal;
