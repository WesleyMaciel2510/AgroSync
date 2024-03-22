import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const colors = {
  background: '#FFF',
  primary: '#3498DB',
  secondary: '#2ECC71',
  error: '#E74C3C',
  warning: '#F1C40F',
  info: '#8E44AD',
  success: '#27AE60',
  green: '#3AC0A0',
  gray: '#1F2024',
};

export const DefaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.background,
  },
  loginContainer: {
    flex: 1,
    //backgroundColor: '#5ea8f2',
    backgroundColor: '#edf7f1',
    resizeMode: 'center',
    width: width,
    height: height - 575,
  },
  center: {
    flex: 1,
    justifyContent: 'center', // centers child components vertically
    alignItems: 'center', // centers child components horizontally
  },
  title: {
    color: '#71727A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputArea: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: 350,
  },
  inputContent: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
  },
});
