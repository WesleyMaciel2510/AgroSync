import React, {useEffect} from 'react';
import AppStack from './src/routes';
import {useSharedState} from './src/context/globalUseState';
import DrawerMenu from './src/components/Drawer/drawerMenu';
import Header from './src/components/Header/header';
import NetStatusInfo from './src/components/netStatusInfo';
import GpsStatusInfo from './src/components/gpsStatusInfo';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {RootState} from './src/redux/types';
import {loadSavedState} from './src/helpers/mmkvStartup';

const App: React.FC = () => {
  const {isLogged, cameraScreen, gpsOn, setGpsOn} = useSharedState();
  const reducer = useSelector((state: RootState) => state);

  useEffect(() => {
    //call mmkv on app Startup
    loadSavedState();

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

    if (reducer.locationPermission) {
      startWatching();

      // Cleanup function
      return () => {
        stopWatching();
      };
    }
  }, [reducer.locationPermission, setGpsOn]);

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
            {!gpsOn && <GpsStatusInfo />}
          </DrawerMenu>
        )
      ) : (
        <AppStack />
      )}
    </NavigationContainer>
  );
};

export default App;
