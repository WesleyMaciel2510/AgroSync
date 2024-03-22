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
import {
  useSharedState,
  useOnSearchScheduling,
} from '../OperatorComponents/logic';
import Button from '../Button/button';
import LottieView from 'lottie-react-native';

const SearchSchedulingModal = () => {
  const {
    isLoading,
    setIsLoading,
    modalVisible,
    setModalVisible,
    inputValue,
    setInputValue,
    notFound,
    setNotFound,
    serverTimeout,
    setServerTimeout,
  } = useSharedState();
  const {handleSearchScheduling} = useOnSearchScheduling();
  const AnimationPath = notFound
    ? require('../../assets/lottie/notFound.json')
    : require('../../assets/lottie/operator/warehouse.json');

  return (
    <Modal
      isVisible={modalVisible}
      animationIn={'bounceIn'}
      animationOut={'bounceOut'}
      onModalHide={() => {
        setModalVisible(false);
        setNotFound(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>
              {' '}
              Digite o número {'\n'}do Agendamento{' '}
            </Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                setModalVisible(!modalVisible);
                setNotFound(false);
                setServerTimeout(false);
              }}>
              <FontAwesome5 name={'times'} size={30} color={'gray'} />
            </TouchableOpacity>
          </View>
          <View>
            <LottieView
              source={AnimationPath}
              style={{width: 200, height: 150, margin: 20}}
              autoPlay
              loop={isLoading}
            />
          </View>
          {notFound && (
            <Text style={styles.errorText}>Agendamento não encontrado.</Text>
          )}
          {serverTimeout && (
            <Text style={styles.errorText}>
              Não foi possível enviar sua solicitação ao servidor. Por favor,
              tente novamente mais tarde.
            </Text>
          )}

          <View style={{padding: 20}}>
            <TextInput
              value={inputValue}
              onChangeText={text => setInputValue(text)}
              keyboardType="number-pad"
              placeholder="Número do Agendamento"
              maxLength={4}
              style={styles.input}
            />
          </View>
          <Button
            onPress={() => {
              handleSearchScheduling(inputValue);
              setIsLoading(true);
            }}
            text={' BUSCAR '}
          />
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

export default SearchSchedulingModal;
