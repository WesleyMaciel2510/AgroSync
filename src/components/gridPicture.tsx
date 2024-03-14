import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, View} from 'react-native';
import {useSharedState} from '../screens/Operator/Picture/logic';
import ErrorSendModal from '../components/Modals/errorSendModal';

const {width} = Dimensions.get('window');
const itemPerRow = 3;
const gap = 12;
const paddingHorizontal = 16; // Adjust as needed
const childWidth =
  (width - gap * (itemPerRow + 1) - paddingHorizontal * 2) / itemPerRow;

const GridView = () => {
  const {modalVisible, setModalVisible} = useSharedState();
  const onPressItem = (index: number) => {
    console.log('Item pressed:', index);
  };

  const renderItems = () => {
    const items = [];
    for (let i = 0; i < 15; i++) {
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
      <TouchableOpacity style={styles.container}>
        <TouchableOpacity style={styles.row}>
          {renderItems().slice(0, 3)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          {renderItems().slice(3, 6)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          {renderItems().slice(6, 9)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          {renderItems().slice(9, 12)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          {renderItems().slice(12, 15)}
        </TouchableOpacity>
      </TouchableOpacity>
      <ErrorSendModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: paddingHorizontal,
    marginVertical: gap / 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: gap,
  },
  item: {
    backgroundColor: 'black',
    width: childWidth,
    height: childWidth,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'gray',
  },
  itemMarginRight: {
    marginRight: gap,
  },
});

export default GridView;
