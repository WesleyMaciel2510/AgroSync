import React, {useEffect} from 'react';
import AppStack from './src/routes';
import {useSharedState} from './src/context/globalUseState';
import DrawerMenu from './src/components/Drawer/drawerMenu';
import Header from './src/components/Header/header';
import NetStatusInfo from './src/components/netStatusInfo';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from './src/redux/types';
import {loadSavedState} from './src/redux/mmkv/mmkvStartup';

const App: React.FC = () => {
  const {cameraScreen} = useSharedState();
  const selectIsLogged = (state: RootState) => state.isLogged;
  const ISLOGGED = useSelector(selectIsLogged);
  // ===========================================================
  useEffect(() => {
    const initializeState = async () => {
      try {
        loadSavedState();
      } catch (error) {
        console.log('@ error loading SavedState = ', error);
      }
    };

    initializeState();
  }, []);
  // ===========================================================

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
          </DrawerMenu>
        )
      ) : (
        <AppStack />
      )}
    </NavigationContainer>
  );
};

export default App;
