import {useSharedState} from '../Camera/logic/index';
import {requestSavePermission} from '../../helpers/savePicture';
import {useCameraPermission} from 'react-native-vision-camera';

import {useEffect} from 'react';

export const useOnHandlePermission = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const {setCameraPermission, savePermission, setSavePermission} =
    useSharedState();
  console.log('useOnHandlePermission ');

  const handlePermission = async () => {
    console.log('handlePermission ');

    if (!hasPermission) {
      try {
        const status = await requestPermission();
        console.log('status = ', status);
        return status;
      } catch (err) {
        console.error('error = ', err);
      }
    } else {
      console.log('Ja tem permissao!');
      return true;
    }
    //now ask savePermission
    if (!savePermission) {
      const permissionToSave = await requestSavePermission();
      console.log('permissionToSave status = ', permissionToSave);
      permissionToSave ? setSavePermission(true) : setSavePermission(false);
    }
  };

  useEffect(() => {
    handlePermission();
  }, []); // Empty dependency array to ensure the effect runs only once

  console.log('handlePermission ');
  return handlePermission;
};
