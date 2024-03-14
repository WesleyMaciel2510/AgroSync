import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
//import {useSharedState} from './logic';
import {useSharedState as useSharedUserState} from '../../context/globalUseState';
import DrawerMenu from '../../components/Drawer/drawerMenu';
import Header from '../../components/Header/header';
import DriverModules from '../../components/DriverComponents/modules';
import OperatorModules from '../../components/OperatorComponents/modules';
import ProducerModules from '../../components/ProducerComponents/modules';

interface Props {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {userType} = useSharedUserState();

  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View>
          {userType === 'Motorista' && (
            <DriverModules navigation={navigation} />
          )}
        </View>
        <View>
          {userType === 'Operador' && (
            <OperatorModules navigation={navigation} />
          )}
        </View>
        <View>{userType === 'Produtor' && <ProducerModules />}</View>
      </DrawerMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default HomeScreen;
