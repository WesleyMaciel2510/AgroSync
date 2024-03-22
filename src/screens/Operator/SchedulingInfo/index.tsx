import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {/* useSharedState */ useInit} from './logic';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import Button from '../../../components/Button/button';
import InfoTable from '../../../components/infoTable';
import CalendarComponent from '../../../components/OperatorComponents/calendar';

interface Props {
  navigation: StackNavigationProp<any>;
}

const SchedulingInfoScreen: React.FC<Props> = ({navigation}) => {
  const {photo, setPhoto, schedulingInfo} = useSharedGlobalState();
  useInit();
  const handleChangeStatus = () => {
    console.log('CHAMOU handleChangeStatus');
    navigation.navigate('Picture');
  };
  let tableColor: string;
  switch (schedulingInfo?.Status) {
    case 'Criado':
      tableColor = '#3498DB';
      break;
    case 'Iniciado':
      tableColor = '#EB4C1A';
      break;
    case 'Finalizado':
      tableColor = '#FF0000';
      break;
    default:
      tableColor = '#3498DB';
      break;
  }

  //============================================================================
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View style={styles.contentArea}>
          <InfoTable
            color={tableColor}
            iconName={'calendar-plus'}
            title={'Informações do Agendamento'}
            line1={'Status do Agendamento: Criado'}
            line2={'Nome do Produto: Soja'}
            line3={'Peso do Produto: 5000kg'}
            line4={'Quantidade: 10 Sacas'}
            highlightText={'Data do Agendamento: 14/03/2024'}
          />
          {schedulingInfo?.Status !== 'Finalizado' ? (
            <CalendarComponent />
          ) : null}
        </View>

        {schedulingInfo?.Status !== 'Finalizado' ? (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => handleChangeStatus()}
              text={
                schedulingInfo?.Status === 'Criado' ? 'INICIAR' : 'FINALIZAR'
              }
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#2897ff',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 22,
    paddingLeft: 20,
  },
  title: {
    fontSize: 22,
    color: 'gray',
  },
  invoicesImageArea: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'black',
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 15,
  },
});

export default SchedulingInfoScreen;
