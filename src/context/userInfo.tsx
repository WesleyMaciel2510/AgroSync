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
  };
};

export const useSharedState = () => useBetween(useStateVariables);