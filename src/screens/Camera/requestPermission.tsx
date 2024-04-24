import {useSharedState} from '../Camera/logic/index';
import {requestSavePermission} from '../../helpers/savePicture';
import {useCameraPermission} from 'react-native-vision-camera';

export const useOnHandlePermission = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const {savePermission, setSavePermission} = useSharedState();

  //console.log('useOnHandlePermission initialized');

  // Define handlePermission outside useEffect
  const handlePermission = async () => {
    console.log('handlePermission called');

    let permissionGranted = true;

    // Check for camera permission
    if (!hasPermission) {
      try {
        const status = await requestPermission();
        console.log('status = ', status);
        permissionGranted = status;
      } catch (err) {
        console.error('error = ', err);
        permissionGranted = false;
      }
    } else {
      console.log('Already has permission');
      permissionGranted = true;
    }

    // Now ask for save permission if camera permission is granted
    if (permissionGranted && !savePermission) {
      try {
        const permissionToSave = await requestSavePermission();
        console.log('permissionToSave status = ', permissionToSave);
        setSavePermission(permissionToSave);
        permissionGranted = permissionToSave;
      } catch (err) {
        console.error('Error requesting save permission: ', err);
        setSavePermission(false);
        permissionGranted = false;
      }
    }

    return permissionGranted;
  };

  // If needed on component mount, you can uncomment this:
  // useEffect(() => {
  //   handlePermission(); // This is how you call it inside useEffect.
  // }, [hasPermission, savePermission]); // Ensures effect runs only when permissions change

  return {handlePermission};
};
