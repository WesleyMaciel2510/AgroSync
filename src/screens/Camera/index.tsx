import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useInit /* useSharedState */ /* useOnSendPicture */} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {storage} from '../../helpers/storage';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const CameraScreen: React.FC<Props> = ({navigation}) => {
  const {cameraPermission, savePermission, setPhoto} = useSharedGlobalState();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  useInit();

  const handleTakePicture = async () => {
    console.log('chamou handleTakePicture');

    if (camera.current) {
      try {
        console.log('entrou no try');
        console.log('savePermission = ', savePermission);

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
          setPhoto(savedPicture.node.image.uri);
          navigation.navigate('InvoiceInfo');
        }
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };
  // eslint-disable-next-line curly, react/jsx-no-undef
  if (device == null) return <NoCameraDeviceError />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {cameraPermission ? (
          <View style={{flex: 1}}>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              ref={camera}
              photo={true}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonTakePicture]}
              onPress={() => {
                handleTakePicture();
              }}>
              <Text style={styles.buttonText}>TAKE PICTURE</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={{color: 'red', fontWeight: 'bold'}}>
              Camera Screen Não tem permissão
            </Text>
          </View>
        )}
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
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CameraScreen;
