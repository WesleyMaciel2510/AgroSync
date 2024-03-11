import {CameraRoll} from '@react-native-community/cameraroll';
import {useRef} from 'react';
import {storage} from '../../helpers/storage';
import {Camera} from 'react-native-vision-camera';

let savePermission = true; // replace with your permission state
let setPhoto = () => {}; // replace with your setPhoto function

export const handleTakePicture = async () => {
  const camera = useRef<Camera>(null); // replace with your camera reference

  console.log('chamou handleTakePicture');

  if (camera.current) {
    try {
      console.log('entrou no try');

      const photo = await camera.current.takePhoto();
      const result = await fetch(`file://${photo.path}`);
      console.log('photo path = ', result);
      const data = await result.blob();
      console.log('Photo taken = ', data);

      if (savePermission) {
        const savedPicture = await CameraRoll.saveAsset(
          `file://${photo.path}`,
          {type: 'photo'},
        );
        console.log('savedPicture = ', savedPicture);
        storage.set('savedPicture', JSON.stringify(savedPicture));
        setPhoto(savedPicture);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }
};
