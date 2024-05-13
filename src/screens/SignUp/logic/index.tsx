import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {createUser} from '../../../services/user';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};

export const useOnCreateUser = () => {
  const {name, email, password, phoneNumber} = useSharedGlobalState();

  const handleCreateUser = async () => {
    const userDataToSend = {
      FullName: name,
      Email: email,
      Password: password,
      PhoneNumber: phoneNumber,
      UserType: 'operator',
    };

    console.log('userDataToSend = ', userDataToSend);
    try {
      const success = await createUser(userDataToSend);
      if (success) {
        //console.log('User created successfully');
        return true;
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      return false;
    }
  };
  return {handleCreateUser};
};
