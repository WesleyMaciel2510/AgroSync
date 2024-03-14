import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSharedState} from '../../context/globalUseState';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Header = () => {
  const {name} = useSharedState();
  const nameParts = name.split(' ');
  const firstName = nameParts[0];

  return (
    <View style={styles.headerArea}>
      <FontAwesome5
        name={'question-circle'}
        size={30}
        color="#fff"
        style={styles.questionCircle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerArea: {
    backgroundColor: '#3AC0A0',
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  questionCircle: {position: 'absolute', right: 15, top: 15},
});

export default Header;
