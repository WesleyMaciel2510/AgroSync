import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {SearchScheduling} from '../../../services/scheduling/index';
import {useNavigation} from '@react-navigation/native';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [serverTimeout, setServerTimeout] = useState(false);

  return {
    isLoading,
    setIsLoading,
    modalVisible,
    setModalVisible,
    inputValue,
    setInputValue,
    notFound,
    setNotFound,
    serverTimeout,
    setServerTimeout,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit in OperatorComponents');
  }, []);
};

export const useOnSearchScheduling = () => {
  const navigation = useNavigation();
  const {setIsLoading, setModalVisible, setNotFound, setServerTimeout} =
    useSharedState();

  const {setSchedulingInfo} = useSharedGlobalState();

  const handleSearchScheduling = async (inputValue: string) => {
    console.log('chamou handleSearchScheduling');
    const inputNumber = parseInt(inputValue, 10);
    const schedulingInfo = await SearchScheduling(inputNumber);
    console.log('schedulingInfo = ', schedulingInfo);
    console.log('validation = ', schedulingInfo.timeout);
    console.log(
      'Type of schedulingInfo.timeout:',
      typeof schedulingInfo.timeout,
    );

    if (schedulingInfo.timeout) {
      console.log('Timeout occurred');
      setServerTimeout(true);
    }
    //check if the result is empty
    if (
      Object.keys(schedulingInfo.data)?.length > 0 &&
      schedulingInfo.success
    ) {
      console.log('Scheduling info found');
      setSchedulingInfo(schedulingInfo.data?.[0]);
      setModalVisible(false);
      setIsLoading(false);
      navigation.navigate('SchedulingInfo');
    } else {
      console.log('Scheduling info not found');
      setNotFound(true);
    }
  };
  return {handleSearchScheduling};
};
