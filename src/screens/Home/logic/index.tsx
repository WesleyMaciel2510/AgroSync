import {useEffect, useState} from 'react';
import {useSharedState as useSharedUserState} from '../../../context/globalUseState';
import {storage} from '../../../helpers/storage';
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
  const {setIsLogged, userType, setName, setUserType} = useSharedUserState();
  useEffect(() => {
    const storedIsLogged = storage.getBoolean('ISLOGGED') || false;
    const storedUserName = storage.getString('loggedUserName') || '';
    console.log('storedUserName = ', storedUserName);
    setName(storedUserName);
    const storedUserType = storage.getString('loggedUserType') || '';
    setUserType(storedUserType);
    // ============================================================
    console.log('storedIsLogged = ', storedIsLogged);
    console.log('userType = ', userType);
    setIsLogged(storedIsLogged);
  }, [setIsLogged, setName, setUserType, userType]);
};
