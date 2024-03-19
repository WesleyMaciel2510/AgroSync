import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Image,
} from 'react-native';
import {useSharedState} from '../screens/Operator/Picture/logic';
import {useSharedState as useSharedGlobalState} from '../context/globalUseState';
import ErrorSendModal from '../components/Modals/errorSendModal';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

interface Props {
  navigation: StackNavigationProp<any>;
}

const {width} = Dimensions.get('window');
const itemPerRow = 3;
const paddingHorizontal = 16;
const childWidth = width / 3.5;

const GridView = ({navigation}: Props) => {
  const {photo, isLoading, setActionType, setPictureIndex} =
    useSharedGlobalState();

  const onPressItem = (index: number) => {
    console.log('Item pressed:', index);
    setActionType('CameraOperator');
    setPictureIndex(index);
  };

  const renderItems = () => {
    const items = [];
    for (let i = 0; i < 9; i++) {
      items.push(
        <TouchableOpacity
          key={i}
          style={[styles.item, i % itemPerRow !== 0 && styles.itemMarginRight]}
          onPress={() => onPressItem(i)}
        />,
      );
    }
    return items;
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.row}>{renderItems().slice(0, 3)}</View>
        <View style={styles.row}>{renderItems().slice(3, 6)}</View>
        <View style={styles.row}>{renderItems().slice(6, 9)}</View>
      </View>
      <ErrorSendModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: paddingHorizontal,
    marginVertical: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  item: {
    backgroundColor: 'black',
    width: childWidth,
    height: childWidth,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'gray',
    marginLeft: 10,
  },
  itemMarginRight: {
    //marginRight: gap,
    marginLeft: 10,
  },
  ImageArea: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'gray',
    backgroundColor: 'black',
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
});

export default GridView;
