import React from 'react';
import {TouchableOpacity, Text, GestureResponderEvent} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface BackButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const BackButton: React.FC<BackButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={[{position: 'absolute', bottom: 30, right: 30}]}
      onPress={onPress}>
      <FontAwesome5
        name={'arrow-circle-left'}
        size={40}
        color={'white'}
        style={{marginLeft: 5}}
      />
      <Text style={[{color: 'white', fontSize: 15}]}>Voltar</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
