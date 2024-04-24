import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {useSharedState as useSharedGlobalState} from '../../../../context/globalUseState';
import {sendArrayofPictures} from '../../../../services/pictures/sendArrayofPictures';
import {StackNavigationProp} from '@react-navigation/stack';

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
  const {schedulingInfo} = useSharedGlobalState();
  useEffect(() => {
    console.log('chamou useInit');
    console.log('schedulingInfo = ', schedulingInfo?.Status);
  }, []);
};

interface Props {
  navigation: StackNavigationProp<any>;
}

export const useOnSendPictures = () => {
  const {setIsLoading, setModalVisible, setErrorSync} = useSharedState();
  const {
    schedulingInfo,
    picturesToSend,
    quickRegister,
    setSuccessSendingPictures,
    setPictureIndex,
    setPicturesToDisplay,
    setPicturesToSend,
  } = useSharedGlobalState();

  const handleSendPictures = async ({navigation}: Props) => {
    console.log('CHAMOU handleSendPictures');
    setIsLoading(true);
    setModalVisible(true);
    setErrorSync(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const dataToSend = {
      ID: quickRegister ? 0 : schedulingInfo.IDAgendamento,
      IDTYPE: 'SCHEDULINGID',
      IMGBASE64: {} as {[key: number]: string},
      DATETIME: formattedDate,
    };
    // Add all the pictures improving the performance of the database architecture
    for (let i = 0; i < picturesToSend.length; i++) {
      dataToSend.IMGBASE64[i] = picturesToSend[i];
    }
    console.log('dataToSend = ', dataToSend.IMGBASE64);
    const result = await sendArrayofPictures(dataToSend);
    console.log('result', result);
    if (result) {
      setIsLoading(false);
      navigation.navigate('FinishOperator');
      setSuccessSendingPictures(true);
      setPictureIndex(0);
      setPicturesToDisplay(['']);
      setPicturesToSend(['']);
    } else {
      setIsLoading(false);
      setErrorSync(true);
    }
  };
  return {handleSendPictures};
};
