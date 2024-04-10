import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AppStack from './src/routes';
import {useSharedState} from './src/context/globalUseState';
import DrawerMenu from './src/components/Drawer/drawerMenu';
import Header from './src/components/Header/header';
import NetStatusInfo from './src/components/netStatusInfo';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const App: React.FC = () => {
  const {isLogged, cameraScreen, gpsOn, setGpsOn} = useSharedState();

  useEffect(() => {
    let watchId: number | null = null;

    const startWatching = () => {
      watchId = Geolocation.watchPosition(
        position => {
          console.log('GPS IS ON: ', position);
          setGpsOn(true);
        },
        error => {
          console.log('GPS IS OFF ');
          console.log(error);
          setGpsOn(false);
        },
        {
          interval: 500,
          fastestInterval: 500,
          timeout: 20000,
          maximumAge: 10000,
          enableHighAccuracy: true,
          distanceFilter: 10,
          useSignificantChanges: false,
        },
      );
    };

    const stopWatching = () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
        watchId = null;
      }
    };

    startWatching();

    // Cleanup function
    return () => {
      stopWatching();
    };
  }, [setGpsOn]);

  return (
    <NavigationContainer>
      <NetStatusInfo />
      {isLogged ? (
        cameraScreen ? (
          <AppStack />
        ) : (
          <DrawerMenu>
            <Header />
            <AppStack />
            {!gpsOn && (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'orange',
                  padding: 10,
                  alignItems: 'center',
                  paddingRight: 20,
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                    textAlign: 'center',
                    paddingLeft: 20,
                  }}>
                  Seu GPS está desativado. {'\n'}Por favor, ative o GPS.
                </Text>
                <FontAwesome5
                  name={'exclamation-triangle'}
                  size={30}
                  color={'white'}
                />
              </View>
            )}
          </DrawerMenu>
        )
      ) : (
        <AppStack />
      )}
    </NavigationContainer>
  );
};

export default App;
