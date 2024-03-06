import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSharedState} from './logic';
import {useSharedState as useSharedUserState} from '../../context/userInfo';
import DrawerMenu from '../../components/drawer/drawerMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {drawerOn} = useSharedState();
  const {setIsLogged} = useSharedUserState();
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <View style={styles.headerArea}>
          <FontAwesome5
            name={'question-circle'}
            size={30}
            color="#fff"
            style={{position: 'absolute', right: 10, top: 15}}
          />
        </View>
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
  headerArea: {
    backgroundColor: '#3AC0A0',
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
});

export default HomeScreen;
