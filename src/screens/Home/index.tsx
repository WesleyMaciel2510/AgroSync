import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSharedState} from './logic';
import {useSharedState as useSharedUserState} from '../../context/userInfo';
import DrawerMenu from '../../components/drawer/drawerMenu';
import LottieView from 'lottie-react-native';

interface Props {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {drawerOn} = useSharedState();
  const {setIsLogged} = useSharedUserState();
  /*  const handleLogout = () => {
    // =======================================================
    // Save the JSON string to MMKV storage
    storage.set('ISLOGGED', false);
    setIsLogged(false);
    // =======================================================
  }; */
  return (
    <View style={styles.container}>
      <DrawerMenu>
        <View style={{flex: 1}}>
          <LottieView
            source={require('../../assets/lottie/plant.json')}
            style={{width: 200, height: 200, margin: 20}}
            autoPlay
            loop={false}
          />
        </View>
        <Text style={styles.title}>Welcome to the Home Screen!</Text>
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
