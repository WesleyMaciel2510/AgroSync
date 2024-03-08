import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
//import {useSharedState} from './logic';
import {useSharedState as useSharedUserState} from '../../../context/globalUseState';
import DrawerMenu from '../../../components/drawer/drawerMenu';
import Header from '../../../components/header/header';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoadInfoScreen: React.FC<Props> = ({navigation}) => {
  const {userType} = useSharedUserState();

  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <Text> LoadInfo Screen</Text>
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

export default LoadInfoScreen;
