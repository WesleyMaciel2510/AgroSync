import React, {useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useInit, useSharedState} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {
  Camera,
  CodeType,
  Templates,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const ReaderCameraScreen: React.FC<Props> = ({navigation}) => {
  const {cameraPermission, savePermission} = useSharedState();
  const {cameraType} = useSharedGlobalState();
  useInit();

  const device = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera'],
  });
  //const format = useCameraFormat(device, [{photoResolution: 'max'}]);
  const format = useCameraFormat(device, Templates.Snapchat);
  const camera = useRef<Camera>(null);

  const qrCodeTypes: CodeType[] = ['qr', 'pdf-417', 'aztec', 'data-matrix'];
  const barcodeTypes: CodeType[] = [
    'code-128',
    'code-39',
    'code-93',
    'codabar',
    'ean-13',
    'ean-8',
    'itf',
    'upc-e',
  ];

  const codeNames: CodeType[] =
    cameraType === 'qrcode' ? qrCodeTypes : barcodeTypes;

  const codeScanner = useCodeScanner({
    codeTypes: codeNames,
    onCodeScanned: codes => {
      console.log('codes = ', codes);
    },
  });
  if (device == null) {
    return <NoCameraDeviceError />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {cameraPermission ? (
          <View style={{flex: 1}}>
            <Camera
              style={StyleSheet.absoluteFill}
              codeScanner={codeScanner}
              device={device}
              isActive={true}
              ref={camera}
              format={format}
            />
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
});
export default ReaderCameraScreen;
