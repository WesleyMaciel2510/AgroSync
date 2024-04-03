import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {useSharedState as useSharedGlobalState} from '../../../../context/globalUseState';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorSync, setErrorSync] = useState(false);
  const [schedulingStatus, setSchedulingStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return {
    isLoading,
    setIsLoading,
    errorSync,
    setErrorSync,
    schedulingStatus,
    setSchedulingStatus,
    modalVisible,
    setModalVisible,
    inputValue,
    setInputValue,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  const {schedulingInfo, setCameraScreen} = useSharedGlobalState();
  useEffect(() => {
    console.log('chamou useInit');
    console.log('schedulingInfo = ', schedulingInfo?.Status);
  }, []);
};
