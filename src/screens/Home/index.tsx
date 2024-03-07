import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSharedState} from './logic';
import {useSharedState as useSharedUserState} from '../../context/userInfo';
import DrawerMenu from '../../components/drawer/drawerMenu';
import Header from '../../components/header/header';

interface Props {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
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
  questionCircle: {position: 'absolute', right: 15, top: 15},
});

export default HomeScreen;
