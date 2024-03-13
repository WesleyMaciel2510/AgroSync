import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const itemPerRow = 3;
const gap = 12;
const paddingHorizontal = 16; // Adjust as needed
const childWidth =
  (width - gap * (itemPerRow + 1) - paddingHorizontal * 2) / itemPerRow;

const GridView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={styles.item} />
      </View>
      <View style={styles.row}>
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={styles.item} />
      </View>
      <View style={styles.row}>
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={styles.item} />
      </View>
      <View style={styles.row}>
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={styles.item} />
      </View>
      <View style={styles.row}>
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={[styles.item, styles.itemMarginRight]} />
        <View style={styles.item} />
      </View>
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
    backgroundColor: 'lightblue',
    width: childWidth,
    height: childWidth,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
  },
  itemMarginRight: {
    marginRight: gap,
  },
});

export default GridView;
