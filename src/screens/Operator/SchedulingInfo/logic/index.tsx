import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [schedulingStatus, setSchedulingStatus] = useState('');

  return {
    isLoading,
    setIsLoading,
    schedulingStatus,
    setSchedulingStatus,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};
