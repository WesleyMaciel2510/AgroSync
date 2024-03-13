import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {useState} from 'react';
import {useBetween} from 'use-between';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [screen, setScreen] = useState('phoneNumber');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [savePermission, setSavePermission] = useState(false);
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [schedulingStatus, setSchedulingStatus] = useState('');

  return {
    isLoading,
    setIsLoading,
    screen,
    setScreen,
    name,
    setName,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    userType,
    setUserType,
    isLogged,
    setIsLogged,
    cameraPermission,
    setCameraPermission,
    savePermission,
    setSavePermission,
    photo,
    setPhoto,
    schedulingStatus,
    setSchedulingStatus,
  };
};

export const useSharedState = () => useBetween(useStateVariables);
