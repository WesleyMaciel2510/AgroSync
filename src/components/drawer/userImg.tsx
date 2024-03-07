import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useSharedState as useSharedUserState} from '../../context/userInfo';

const UserImage = () => {
  const {userType} = useSharedUserState();
  let imageSource;
  switch (userType) {
    case 'Produtor':
      imageSource = require('../../assets/imgs/user1.png');
      break;
    case 'Operador':
      imageSource = require('../../assets/imgs/user2.png');
      break;
    case 'Motorista':
      imageSource = require('../../assets/imgs/user3.png');
      break;

    default:
      imageSource = require('../../assets/imgs/user4.png');
      break;
  }

  return (
    <View>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    resizeMode: 'contain',
  },
});

export default UserImage;
