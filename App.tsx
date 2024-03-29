import React from 'react';
import AppStack from './src/routes';
import {useSharedState} from './src/context/globalUseState';
import DrawerMenu from './src/components/Drawer/drawerMenu';
import Header from './src/components/Header/header';

import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  const {isLogged, cameraType, actionType} = useSharedState();
  const notCameraScreen: boolean = cameraType !== '' && actionType !== '';

  return (
    <>
      {isLogged || notCameraScreen ? (
        <NavigationContainer>
          <DrawerMenu>
            <Header />
            <AppStack />
          </DrawerMenu>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
