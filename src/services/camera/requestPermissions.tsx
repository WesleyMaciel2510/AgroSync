import {useCameraPermission} from 'react-native-vision-camera';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {useEffect} from 'react';
import {requestSavePermission} from '../../helpers/savePicture';

export const useOnCheckPermission = () => {
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
        const permissionToSave = await requestSavePermission();
        console.log('permissionToSave status = ', permissionToSave);
        permissionToSave ? setSavePermission(true) : setSavePermission(false);
      }
    };
    requestPermissions();
  }, [
    savePermission,
    hasPermission,
    requestPermission,
    setCameraPermission,
    setSavePermission,
  ]);
};
