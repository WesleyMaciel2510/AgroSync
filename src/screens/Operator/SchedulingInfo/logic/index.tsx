import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {useSharedState as useSharedGlobalState} from '../../../../context/globalUseState';

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
  const {schedulingInfo} = useSharedGlobalState();
  useEffect(() => {
    console.log('chamou useInit');
    console.log('schedulingInfo = ', schedulingInfo.Status);
  }, []);
};
