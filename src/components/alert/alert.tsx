import {Alert} from 'react-native';

const AlertComponent = ({
  title,
  description,
  okButton,
  cancelButton,
  confirmAction,
}: {
  title: string;
  description: string;
  okButton: string;
  cancelButton: string;
  confirmAction?: () => void;
}) => {
  Alert.alert(title, description, [
    {text: okButton, onPress: confirmAction},
    {text: cancelButton, onPress: () => console.log('Cancel button pressed!')},
  ]);
};

export default AlertComponent;
