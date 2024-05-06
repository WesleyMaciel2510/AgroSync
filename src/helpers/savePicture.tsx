import {PermissionsAndroid, Platform} from 'react-native';

export async function requestSavePermission() {
  console.log('@ called requestSavePermission');
  const version: any = Platform.Version;

  const checkPermissionToSavePromise = async () => {
    console.log('called checkPermissionToSavePromise');
    console.log('version = ', version);
    if (version >= 33) {
      return await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await checkPermissionToSavePromise();
  console.log('@@@@ hasPermission = ', hasPermission);
  if (hasPermission) {
    return true;
  }

  const getRequestPermissionPromise = async () => {
    console.log('@ called getRequestPermissionPromise');
    if (version >= 33) {
      console.log('@ version = ', version);
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      console.log('@ status = ', status);
      return status === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      console.log('@ status = ', status);
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  return await getRequestPermissionPromise();
}
