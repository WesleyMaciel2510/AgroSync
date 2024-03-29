import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Text,
  DrawerLayoutAndroid,
} from 'react-native';
import {useInit, useSharedState} from './logic';
import {useSharedState as useSharedHomeState} from '../Home/logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '../../components/Header/header';
import DeniedPermission from '../DeniedPermissionScreen';
import DrawerMenu from '../../components/Drawer/drawerMenu';
interface Props {
  navigation: StackNavigationProp<any>;
}
const CameraScreen: React.FC<Props> = ({navigation}) => {
  const {cameraPermission, savePermission} = useSharedState();
  const {setDrawerOn} = useSharedHomeState();
  const {
    setPhoto,
    picturesToDisplay,
    setPicturesToDisplay,
    setIsLoading,
    setPicturesToSend,
    actionType,
    pictureIndex,
  } = useSharedGlobalState();

  const device = useCameraDevice('back');
  const {width, height} = Dimensions.get('screen');
  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  let currentDrawerRef = drawerRef.current;

  //=======================================
  useEffect(() => {
    // Disable the drawer menu when the camera screen mounts
    currentDrawerRef?.closeDrawer();

    setDrawerOn(false);
    return () => {
      // Re-enable the drawer menu when the camera screen unmounts
      //currentDrawerRef?.openDrawer();
      //setDrawerOn(true);
    };
  }, []);
  //=======================================

  const camera = useRef<Camera>(null);
  useInit();
  if (device == null) {
    return null;
  }

  const handleTakePicture = async () => {
    console.log('chamou handleTakePicture');
    if (camera.current) {
      //setIsLoading(true);
      try {
        console.log('entrou no try');
        console.log('actionType = ', actionType);

        const photo = await camera.current.takePhoto();
        const result = await fetch(`file://${photo.path}`);
        console.log('photo path = ', result);
        const blob = await result.blob();
        console.log('Photo blob = ', blob);
        console.log('savePermission = ', savePermission);
        //=======================================
        actionType === 'CameraOperator'
          ? navigation.navigate('Picture')
          : navigation.navigate('InvoiceInfo');
        //=======================================

        if (savePermission) {
          const savedPicture = await CameraRoll.saveAsset(
            `file://${photo.path}`,
            {type: 'photo'},
          );
          console.log('savedPicture = ', savedPicture);
          //storage.set('savedPicture', JSON.stringify(savedPicture));

          //=======================================
          const reader = new FileReader();
          reader.onloadend = function () {
            const base64data = reader.result;
            console.log('Base64 data:', typeof base64data);
            const imageData = (base64data as string).substring(
              (base64data as string).indexOf(',') + 1,
            );
            if (actionType === 'CameraOperator') {
              setPicturesToDisplay(prevState => {
                const newState = [...prevState]; // Create a copy of the current state array
                newState[pictureIndex] = savedPicture.node.image.uri; // Update the value at the specified index
                return newState; // Return the updated array
              });
              setPicturesToSend((prevState: string) => {
                const newState = [...prevState]; // Create a copy of the current state array
                newState[pictureIndex] = imageData; // Update the value at the specified index
                return newState; // Return the updated array
              });
            } else {
              setPhoto(savedPicture.node.image.uri);
              setPicturesToSend([imageData]);
            }

            //setIsLoading(false);
          };
          reader.readAsDataURL(blob);
          //=======================================
        }
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };
  if (device == null) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Camera
            style={{width: width, height: height}}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
          />
          <View
            style={[
              styles.outerCircle,
              {bottom: width * 0.05, left: width * 0.4},
            ]}>
            <TouchableOpacity onPress={handleTakePicture}>
              <View style={styles.innerCircle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonTakePicture: {
    position: 'absolute',
    bottom: 30,
    left: '33%',
  },
  buttonSendPicture: {
    position: 'absolute',
    bottom: 90,
    left: '33%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  outerCircle: {
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#dcdcde',
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    left: 5,
    backgroundColor: 'white',
  },
});
export default CameraScreen;
