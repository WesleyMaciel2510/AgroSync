import {useState} from 'react';
import {useBetween} from 'use-between';
import {SchedulingInfo, LoadInfo} from './interface';

export const useStateVariables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [screen, setScreen] = useState('phoneNumber');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  //const [userType, setUserType] = useState('Motorista');
  const [userType, setUserType] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  //const [isLogged, setIsLogged] = useState(true);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [savePermission, setSavePermission] = useState(false);
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [loadInfo, setLoadInfo] = useState<LoadInfo>({
    Destino: '',
    ID: 0,
    NomeDestino: '',
    NomeMotorista: '',
    NomeOrigem: '',
    NomeProduto: '',
    Origem: '',
    Peso: '',
    PlacaCaminhão: '',
    PrazoEntrega: '',
  });
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
  const [cameraType, setCameraType] = useState('');
  const [actionType, setActionType] = useState('');
  const [picturesToSend, setPicturesToSend] = useState<any>([]);

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
    loadInfo,
    setLoadInfo,
    schedulingInfo,
    setSchedulingInfo,
    cameraType,
    setCameraType,
    actionType,
    setActionType,
    picturesToSend,
    setPicturesToSend,
  };
};

export const useSharedState = () => useBetween(useStateVariables);
