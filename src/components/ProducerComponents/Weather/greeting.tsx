import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const GreetingComponent = () => {
  const [greeting, setGreeting] = useState('');

  const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return 'Bom dia';
    } else if (currentHour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  };

  useEffect(() => {
    const userGreeting = getGreeting();

    setGreeting(userGreeting);
  }, []);

  return (
    <View>
      <Text style={styles.titleText}>{greeting}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default GreetingComponent;
