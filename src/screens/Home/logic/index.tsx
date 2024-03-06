import {useEffect, useState} from 'react';
import {useSharedState as useSharedUserState} from '../../../context/userInfo';
import {storage} from '../../../context/storage';
import {useBetween} from 'use-between';
//import {useNavigation} from '@react-navigation/native';

export const useStateVariables = () => {
  const [drawerOn, setDrawerOn] = useState(false);
  return {
    drawerOn,
    setDrawerOn,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {setIsLogged} = useSharedUserState();
  useEffect(() => {
    const storedIsLogged = storage.getBoolean('ISLOGGED') || false;
    console.log('storedIsLogged = ', storedIsLogged);
    setIsLogged(storedIsLogged);
  }, [setIsLogged]);
};
