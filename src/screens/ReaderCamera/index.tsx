import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {useInit, useSharedState, useHandleSearch} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {
  Camera,
  CodeType,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const ReaderCameraScreen: React.FC<Props> = ({navigation}) => {
  const {cameraPermission, savePermission} = useSharedState();
  const {cameraType, actionType} = useSharedGlobalState();
  const handleSearch = useHandleSearch();
  useInit();

  const device = useCameraDevice('back');

  //const format = useCameraFormat(device, [{photoResolution: 'max'}]);
  const camera = useRef<Camera>(null);
  const {width, height} = Dimensions.get('screen');

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

  let isScanning = false;

  const codeScanner = useCodeScanner({
    codeTypes: codeNames,
    onCodeScanned: async codes => {
      if (isScanning) {
        return;
      } // If isScanning is true, exit the function
      try {
        //console.log('codes = ', codes);
        console.log('scannedInfo = ', codes[0]?.value);
        if (actionType === 'searchLoad') {
          console.log('entrou em searchLoad');
          const scannedInfo = codes[0]?.value;
          if (
            scannedInfo &&
            typeof parseInt(scannedInfo, 10) === 'number' &&
            parseInt(scannedInfo, 10) > 0
          ) {
            console.log('number is greater than 0');
            //parsing to number
            const loadNumber = parseInt(scannedInfo, 10);
            const result = await handleSearch(loadNumber);
            console.log('result = ', result);
            if (Object.keys(result).length > 0) {
              console.log('dados encontrados');
              navigation.navigate('LoadInfo');
            } else {
              console.log('dados nao encontrados');
            }
          } else {
            console.log('please scan a number greater than 0');
          }
        }
      } catch (error) {
        // Handle any errors that occur during the search
        console.error('Error searching for load:', error);
      }
      setTimeout(() => {
        isScanning = false;
      }, 10000);
    },
  });
  if (device == null) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {cameraPermission ? (
          <View
            style={{
              flex: 1,
            }}>
            <Camera
              style={{
                width: width,
                height: height,
                flex: 1,
              }}
              codeScanner={codeScanner}
              device={device}
              isActive={true}
              ref={camera}
            />
            {cameraType === 'qrcode' ? (
              <View
                style={[
                  styles.codeBorder,
                  {
                    width: width * 0.5,
                    height: width * 0.5,
                    left: width * 0.25,
                    bottom: width * 0.8,
                  },
                ]}
              />
            ) : (
              <View
                style={[
                  styles.codeBorder,
                  {
                    width: width * 0.5,
                    height: width * 1.35,
                    left: width * 0.25,
                    bottom: width * 0.4,
                  },
                ]}
              />
            )}
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
  codeBorder: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 15,
  },
});
export default ReaderCameraScreen;
