import {StyleSheet} from 'react-native';

export const colors = {
  background: '#FFF',
  primary: '#3498db',
  secondary: '#2ecc71',
  error: '#e74c3c',
  warning: '#f1c40f',
  info: '#8e44ad',
  success: '#27ae60',
  green: '#3AC0A0',
};

export const buttonStyle = '#3AC0A0';

export const DefaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center', // centers child components vertically
    alignItems: 'center', // centers child components horizontally
  },
});
