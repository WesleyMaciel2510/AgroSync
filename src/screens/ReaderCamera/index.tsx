import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, BackHandler} from 'react-native';
import {useInit, useSharedState, useHandleSearch} from './logic';
import {useSharedState as useSharedGlobalState} from '../../context/globalUseState';
import {
  Camera,
  CodeType,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  SearchResultSuccess,
  SearchResultTimeout,
} from '../../helpers/interface';
//import DeniedPermission from '../../components/deniedPermission';

interface Props {
  navigation: StackNavigationProp<any>;
}
type SearchResult = SearchResultSuccess | SearchResultTimeout;

const ReaderCameraScreen: React.FC<Props> = ({navigation}) => {
  const {cameraPermission, savePermission} = useSharedState();
  const {cameraType, actionType, setCameraScreen} = useSharedGlobalState();
  const handleSearch = useHandleSearch();
  const lastScanRef = useRef(Date.now());

  useInit();
  //==================================================
  useEffect(() => {
    const backAction = () => {
      console.log('teste');
      setCameraScreen(false);
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //==================================================
  const device = useCameraDevice('back');

  const camera = useRef<Camera>(null);
  const {width} = Dimensions.get('screen');

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
    onCodeScanned: async codes => {
      const now = Date.now();
      if (now - lastScanRef.current < 5000) {
        return;
      }
      console.log('scannedInfo = ', codes[0]?.value);
      try {
        const scannedInfo = codes[0]?.value;
        if (
          scannedInfo &&
          typeof parseInt(scannedInfo, 10) === 'number' &&
          parseInt(scannedInfo, 10) > 0
        ) {
          console.log('number is greater than 0');
          //parsing to number
          const numberToSearch = parseInt(scannedInfo, 10);

          const result: SearchResult | undefined = await handleSearch(
            numberToSearch,
          );

          console.log('result = ', result);
          if (result && Object.keys(result).length > 0) {
            console.log('dados encontrados');
            if (actionType === 'searchLoad') {
              navigation.navigate('LoadInfo');
            } else if (actionType === 'schedulingInfo') {
              navigation.navigate('SchedulingInfo');
            }
            setCameraScreen(false);
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
      // avoid the scan be executed multiple times
      lastScanRef.current = now;
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
