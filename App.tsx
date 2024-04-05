import React from 'react';
import AppStack from './src/routes';
import {useSharedState} from './src/context/globalUseState';
import DrawerMenu from './src/components/Drawer/drawerMenu';
import Header from './src/components/Header/header';
import NetStatusInfo from './src/components/netStatusInfo';
import GpsStatusInfo from './src/components/gpsStatusInfo';

import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  const {isLogged, cameraScreen, gpsOn} = useSharedState();

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
            <GpsStatusInfo />
          </DrawerMenu>
        )
      ) : (
        <AppStack />
      )}
    </NavigationContainer>
  );
};

export default App;
