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
    {text: cancelButton, onPress: () => console.log('Cancel button pressed!')},
    {text: okButton, onPress: confirmAction},
  ]);
};

export default AlertComponent;
