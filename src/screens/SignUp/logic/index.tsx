import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
//import RegisterAlert from '../../../components/alert/registerAlert';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [screen, setScreen] = useState('phoneNumber');

  return {
    isLoading,
    setIsLoading,
    screen,
    setScreen,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};
