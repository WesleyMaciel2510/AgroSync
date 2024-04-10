import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const NewScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text> AAAAAAAAAAAAAAAAAAAAAAAAAAAA </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default NewScreen;
