import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useInit, useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {storage} from '../../helpers/storage';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const CameraScreen: React.FC<Props> = ({navigation}) => {
  const {cameraPermission, savePermission} = useSharedState();
  const {setPhoto, setIsLoading} = useSharedGlobalState();

  useInit();

  const device = useCameraDevice('back');
  const {width, height} = Dimensions.get('screen');
  //console.log(' width = ', width, 'height = ', height);

  const camera = useRef<Camera>(null);
  if (device == null) {
    return null;
  }

  const handleTakePicture = async () => {
    console.log('chamou handleTakePicture');

    if (camera.current) {
      try {
        console.log('entrou no try');
        navigation.navigate('InvoiceInfo');
        setIsLoading(true);
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
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error taking photo:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {cameraPermission ? (
          <View style={{flex: 1}}>
            <Camera
              //style={StyleSheet.absoluteFill}
              style={{width: width, height: height, flex: 1}}
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
