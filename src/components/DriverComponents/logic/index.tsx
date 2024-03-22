import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {SearchLoad} from '../../../services/loads/index';
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
    console.log('chamou useInit');
  }, []);
};

export const useOnSearchLoad = () => {
  const navigation = useNavigation();

  const {setIsLoading, setModalVisible, setNotFound, setServerTimeout} =
    useSharedState();
  const {setLoadInfo} = useSharedGlobalState();
  const handleSearchLoad = async (inputValue: string) => {
    console.log('chamou handleSearchLoad');
    const inputNumber = parseInt(inputValue, 10);
    const loadInfo = await SearchLoad(inputNumber);
    console.log('load = ', loadInfo.success);
    console.log('lenght = ', Object.keys(loadInfo.data).length);

    if (loadInfo.timeout) {
      console.log('timeout');
      setServerTimeout(true);
    }
    //check if the result is empty
    if (Object.keys(loadInfo.data).length > 0 && loadInfo.success) {
      setLoadInfo(loadInfo.data?.[0]);
      setModalVisible(false);
      setIsLoading(false);
      navigation.navigate('LoadInfo');
    } else {
      setNotFound(true);
    }
  };
  return {handleSearchLoad};
};
