import {useEffect} from 'react';
import {useSharedState} from '../../../context/userInfo';
import {storage} from '../../../context/storage';
//import {useNavigation} from '@react-navigation/native';

export const useInit = () => {
  const {setIsLogged} = useSharedState();
  useEffect(() => {
    const storedIsLogged = storage.getBoolean('ISLOGGED') || false;
    setIsLogged(storedIsLogged);
  }, []);
};
