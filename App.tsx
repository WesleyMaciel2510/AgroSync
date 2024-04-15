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
import {loadSavedState} from './src/redux/mmkv/mmkvStartup';

const App: React.FC = () => {
  const {cameraScreen, gpsOn, setGpsOn} = useSharedState();
  const selectLocationPermission = (state: RootState) =>
    state.locationPermission;
  const LOCATIONPERMISSION = useSelector(selectLocationPermission);
  const selectIsLogged = (state: RootState) => state.isLogged;
  const ISLOGGED = useSelector(selectIsLogged);

  useEffect(() => {
    try {
      //call mmkv on app Startup
      loadSavedState();
    } catch (error) {
      console.log('@ error loading SavedState = ', error);
    }

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

    if (LOCATIONPERMISSION) {
      startWatching();

      // Cleanup function
      return () => {
        stopWatching();
      };
    }
  }, [LOCATIONPERMISSION, setGpsOn]);

  return (
    <NavigationContainer>
      <NetStatusInfo />
      {ISLOGGED ? (
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
