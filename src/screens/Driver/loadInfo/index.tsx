import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
//import {useSharedState} from './logic';
import {useSharedState as useSharedUserState} from '../../../context/globalUseState';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import InfoTable from '../../../components/infoTable';
import Button from '../../../components/Button/button';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoadInfoScreen: React.FC<Props> = ({navigation}) => {
  const {userType} = useSharedUserState();

  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View style={styles.contentArea}>
          <InfoTable />
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: 15,
          }}>
          <Button
            onPress={() => console.log('aaaa')}
            text={'INICIAR'}
            width={'50%'}
          />
        </View>
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
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  table: {
    flex: 1,
  },
});

export default LoadInfoScreen;
