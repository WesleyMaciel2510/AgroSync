import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const middle = height > 800 ? 380 : 210;
//console.log('height = ', height);

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
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#edf7f1',
    resizeMode: 'center',
    width: width,
    height: middle,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#71727A',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
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
    color: 'black',
    paddingLeft: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
    padding: 10,
  },
});
