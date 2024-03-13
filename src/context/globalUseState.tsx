import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {useState} from 'react';
import {useBetween} from 'use-between';

interface SchedulingInfo {
  DataAgendamento: string;
  IDAgendamento: number;
  IDCarga: number;
  NomeProduto: string;
  Observacao: string;
  PesoProduto: string;
  Quantidade: string;
  Status: string;
}

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
  const [schedulingInfo, setSchedulingInfo] = useState<SchedulingInfo>({
    DataAgendamento: '',
    IDAgendamento: 0,
    IDCarga: 0,
    NomeProduto: '',
    Observacao: '',
    PesoProduto: '',
    Quantidade: '',
    Status: '',
  });

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
    schedulingInfo,
    setSchedulingInfo,
  };
};

export const useSharedState = () => useBetween(useStateVariables);
