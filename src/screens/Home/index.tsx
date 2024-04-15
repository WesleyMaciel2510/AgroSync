import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
//import {useSharedState} from './logic';
import DriverModules from '../../components/DriverComponents/modules';
import OperatorModules from '../../components/OperatorComponents/modules';
import ProducerModules from '../../components/ProducerComponents/modules';
import {RootState} from '../../redux/types';
import {useSelector} from 'react-redux';

interface Props {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const selectUserType = (state: RootState) => state.userType;
  const USERTYPE = useSelector(selectUserType);
  return (
    <View style={styles.container}>
      <View>
        {USERTYPE === 'Motorista' && <DriverModules navigation={navigation} />}
      </View>
      <View>
        {USERTYPE === 'Operador' && <OperatorModules navigation={navigation} />}
      </View>
      <View>
        {USERTYPE === 'Produtor' && <ProducerModules navigation={navigation} />}
      </View>
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
