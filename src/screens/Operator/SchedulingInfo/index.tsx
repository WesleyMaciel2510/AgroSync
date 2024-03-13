import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
//import {useSharedState} from './logic';
//import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
import DrawerMenu from '../../../components/Drawer/drawerMenu';
import Header from '../../../components/Header/header';
import Button from '../../../components/Button/button';

interface Props {
  navigation: StackNavigationProp<any>;
}

const SchedulingInfoScreen: React.FC<Props> = ({navigation}) => {
  //const {photo, setPhoto} = useSharedGlobalState();
  const handleChangeStatus = () => {
    console.log('CONFIRMED');
    //navigation.navigate();
  };
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <Header />
        <View style={styles.contentArea}></View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => handleChangeStatus()}
            text={'ENTREGAR'}
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
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
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
