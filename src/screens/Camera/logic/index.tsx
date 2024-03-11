import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {useCameraPermission} from 'react-native-vision-camera';
import {requestSavePermission} from '../../../helpers/savePicture';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {useOnCheckPermission} from '../../../services/camera/requestPermissions';
import {useSharedState as useSharedGlobalState} from '../../../context/globalUseState';
//import {storage} from '../../../helpers/storage';

export const useStateVariables = () => {
  const {
    cameraPermission,
    setCameraPermission,
    savePermission,
    setSavePermission,
  } = useSharedState();
  const [photo, setPhoto] = useState<PhotoIdentifier>();

  return {
    photo,
    setPhoto,
  };
};
export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const checkPermission = useOnCheckPermission();
  const {hasPermission, requestPermission} = useCameraPermission();
  const {setCameraPermission, savePermission, setSavePermission} =
    useSharedGlobalState();

  useEffect(() => {
    console.log('chamou useInit');
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
        console.log(' entrou em permissionToSave');
        const permissionToSave = await requestSavePermission();
        console.log('permissionToSave status = ', permissionToSave);
        permissionToSave ? setSavePermission(true) : setSavePermission(false);
      }
    };
    requestPermissions();
  }, [
    hasPermission,
    requestPermission,
    savePermission,
    setCameraPermission,
    setSavePermission,
  ]);
};
