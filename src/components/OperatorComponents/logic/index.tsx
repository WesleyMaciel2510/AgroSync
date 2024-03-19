import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {searchScheduling} from '../../../services/scheduling/index';
import {useNavigation} from '@react-navigation/native';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);

  return {
    isLoading,
    setIsLoading,
    modalVisible,
    setModalVisible,
    inputValue,
    setInputValue,
    notFound,
    setNotFound,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};

export const useOnSearchScheduling = () => {
  const navigation = useNavigation();
  const {setIsLoading, setModalVisible, setNotFound} = useSharedState();

  const {setSchedulingInfo} = useSharedGlobalState();

  const handleSearchScheduling = async (inputValue: string) => {
    console.log('chamou handleSearchScheduling');
    const inputNumber = parseInt(inputValue, 10);
    const schedulingInfo = await searchScheduling(inputNumber);
    //console.log('schedulingInfo = ', schedulingInfo);
    //console.log('found = ', Object.keys(schedulingInfo).length > 0);
    //check if the result is empty
    if (Object.keys(schedulingInfo).length > 0) {
      console.log('encontrado');
      setSchedulingInfo(schedulingInfo[0]);
      setModalVisible(false);
      setIsLoading(false);
      navigation.navigate('SchedulingInfo');
    } else {
      console.log('nao encontrado');
      setNotFound(true);
    }
  };
  return {handleSearchScheduling};
};
