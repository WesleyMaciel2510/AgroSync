import React, {ReactNode, useRef} from 'react';
import {
  Text,
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSharedState} from '../screens/Home/logic';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface DrawerMenuProps {
  children: ReactNode;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({children}) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  const {setDrawerOn} = useSharedState();

  const navigationView = (
    <View style={styles.navigationViewContainer}>
      <Text style={styles.text}>I'm in the Drawer!</Text>
    </View>
  );

  const handleOpen = () => {
    drawerRef.current?.openDrawer();
    setDrawerOn(true);
  };

  const handleClose = () => {
    setDrawerOn(false);
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={() => navigationView}
      onDrawerClose={handleClose}>
      {children}
      <TouchableOpacity style={styles.drawerTrigger} onPress={handleOpen}>
        <FontAwesome5 name={'bars'} size={30} color="#494A50" />
      </TouchableOpacity>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  navigationViewContainer: {
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  drawerTrigger: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});

export default DrawerMenu;
