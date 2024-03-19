import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {useSharedState as useSharedGlobalState} from '../../../../context/globalUseState';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};
