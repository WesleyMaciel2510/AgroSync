import React, {useRef} from 'react';
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
//import DeniedPermission from '../../components/deniedPermission';

interface Props {
  navigation: StackNavigationProp<any>;
}

const ReaderCameraScreen: React.FC<Props> = ({navigation}) => {
  const {cameraPermission, savePermission} = useSharedState();
  const {cameraType, actionType} = useSharedGlobalState();
  const handleSearch = useHandleSearch();
  useInit();

  const device = useCameraDevice('back');

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
        console.log('entrou em searchLoad');
        const scannedInfo = codes[0]?.value;
        if (
          scannedInfo &&
          typeof parseInt(scannedInfo, 10) === 'number' &&
          parseInt(scannedInfo, 10) > 0
        ) {
          console.log('number is greater than 0');
          //parsing to number
          const numberToSearch = parseInt(scannedInfo, 10);
          let result;

          result = await handleSearch(numberToSearch);
          console.log('result = ', result);
          if (Object.keys(result).length > 0) {
            console.log('dados encontrados');
            const navigateTo =
              actionType === 'searchLoad' ? 'LoadInfo' : 'SchedulingInfo';
            navigation.navigate(navigateTo);
          } else {
            console.log('dados nao encontrados');
          }
        } else {
          console.log('please scan a number greater than 0');
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
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={{
            flex: 1,
          }}
          codeScanner={codeScanner}
          device={device}
          isActive={true}
          ref={camera}
        />
        {cameraType === 'qrcode' ? (
          <View style={styles.borderContainer}>
            <View style={[styles.border, {width: 300, height: 300}]}>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </View>
          </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  borderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderColor: 'white',
  },
  codeBorder: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 15,
  },
});
export default ReaderCameraScreen;
