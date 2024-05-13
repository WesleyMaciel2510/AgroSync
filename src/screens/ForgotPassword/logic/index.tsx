import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {updatePassword} from '../../../services/user/index';

export const useStateVariables = () => {
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  return {
    isEmailValidated,
    setIsEmailValidated,
    isPasswordChanged,
    setIsPasswordChanged,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};

export const handleChangePassword = async (Email: string, Password: string) => {
  console.log('chamou handleChangePassword');
  try {
    console.log('O EMAIL A SER ENVIADO É = ', Email);
    console.log('A NOVA SENHA A SER ENVIADA É = ', Password);
    const result = await updatePassword(Email, Password);
    if (result) {
      return true;
    }
  } catch (error: any) {
    console.error('Error updating Password: ', error);
    return false;
  }
};
