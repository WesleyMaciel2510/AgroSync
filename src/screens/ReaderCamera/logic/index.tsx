import {useEffect, useRef, useState} from 'react';
import {useBetween} from 'use-between';
import {useCameraPermission} from 'react-native-vision-camera';
import {requestSavePermission} from '../../../helpers/savePicture';
import {searchLoad} from '../../../services/loads/index';
//import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {storage} from '../../../helpers/storage';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';

export const useStateVariables = () => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [savePermission, setSavePermission] = useState(false);

  return {
    cameraPermission,
    setCameraPermission,
    savePermission,
    setSavePermission,
  };
};
export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const {setCameraPermission, savePermission, setSavePermission} =
    useSharedState();
  const {cameraType} = useSharedGlobalState();

  useEffect(() => {
    console.log('chamou useInit');
    console.log('cameraType = ', cameraType);
    console.log('savePermission = ', savePermission);

    const requestPermissions = async () => {
      if (!hasPermission) {
        try {
          const status = await requestPermission();
          console.log('status = ', status);
          status ? setCameraPermission(true) : setCameraPermission(false);
        } catch (err) {
          console.error('error = ', err);
        }
      } else {
        console.log('Ja tem permissao!');
        setCameraPermission(true);
      }
      //now ask savePermission
      if (!savePermission) {
        const permissionToSave = await requestSavePermission();
        console.log('permissionToSave status = ', permissionToSave);
        permissionToSave ? setSavePermission(true) : setSavePermission(false);
      }
    };
    requestPermissions();
  }, []);
};

export const useHandleSearch = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const {cameraType} = useSharedGlobalState();

  console.log('chamou useHandleSearch');
  const handleSearch = async (loadNumber: number) => {
    console.log('chamou handleSearch');
    const result = await searchLoad(loadNumber);

    console.log('result in logic = ', result);
    return result;
  };
  return handleSearch;
};
