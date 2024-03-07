import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSharedState} from '../../context/userInfo';
import {DefaultStyles} from '../../styles/styles';
import UserTypeSelector from '../../components/userTypeSelector';
import {createUser} from '../../services/user';
import {useNavigation} from '@react-navigation/native';

const UserType: React.FC = () => {
  const {name, email, password, phoneNumber, userType, setUserType} =
    useSharedState();
  const navigation = useNavigation();

  const handleCreateUser = async () => {
    const userDataToSend = {
      FullName: name,
      Email: email,
      Password: password,
      PhoneNumber: phoneNumber,
      UserType: userType,
    };

    console.log('userDataToSend = ', userDataToSend);
    const success = await createUser(userDataToSend);

    if (success) {
      // Handle success
      navigation.navigate('Login');
      //if success, save userInformation in local storage
    } else {
      // Handle failure
      console.log('Failed to create user');
    }
  };

  const components = [
    {
      title: 'Produtor Agrícola',
      description: 'Milho, Cana de Açúcar, \nAlgodão, Soja e outros',
      onPress: () => {
        setUserType('Produtor');
        handleCreateUser();
      },
    },
    {
      title: 'Operador de Armazém',
      description: 'Armazenamento de \nProdutos Agrícolas',
      onPress: () => {
        setUserType('Operador');
        handleCreateUser();
      },
    },
    {
      title: 'Motorista',
      description: 'Transporte de Produtos',
      onPress: () => {
        setUserType('Motorista');
        handleCreateUser();
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[DefaultStyles.title, {textAlign: 'center'}]}>
        Qual sua atuação {'\n'}no agronegócio?
      </Text>
      <View style={styles.content}>
        {components.map((component, index) => (
          <UserTypeSelector key={index} {...component} />
        ))}
      </View>
      {/* <View style={DefaultStyles.buttonContainer}>
        <Button
          title="Register"
          color="#3AC0A0"
          onPress={() => handleCreateUser()}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export default UserType;
