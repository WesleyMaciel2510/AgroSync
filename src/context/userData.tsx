import {useState} from 'react';
import {useBetween} from 'use-between';

export const useStateVariables = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  return {
    loading,
    setLoading,
    username,
    setUsername,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
  };
};

export const useSharedState = () => useBetween(useStateVariables);
