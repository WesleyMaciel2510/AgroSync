import React, {ReactNode, useRef} from 'react';
import {
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSharedState} from '../../screens/Home/logic';
import {useSharedState as useSharedUserState} from '../../context/userInfo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DrawerLine from './drawerLine';
import {storage} from '../../context/storage';

interface DrawerMenuProps {
  children: ReactNode;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({children}) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  const {setDrawerOn} = useSharedState();

  // ==============================================================
  const useLogout = () => {
    const {setIsLogged} = useSharedUserState();

    const handleLogout = () => {
      // Save the JSON string to MMKV storage
      storage.set('ISLOGGED', false);
      setIsLogged(false);
    };
    return {handleLogout};
  };
  // ==============================================================
  const {handleLogout} = useLogout();

  const navigationView = (
    <View style={styles.navigationViewContainer}>
      <View style={{flex: 1}}>
        <View style={styles.headerArea}>
          <FontAwesome5 name={'leaf'} size={30} color="#fff" />
        </View>
        <View>
          <DrawerLine
            onPress={() => console.log('AAAA ')}
            text={'Idioma'}
            iconName="home"
          />
          <DrawerLine
            onPress={() => console.log('AAAA ')}
            text={'Profile'}
            iconName="user-circle"
          />
          <DrawerLine
            onPress={() => console.log('AAAA ')}
            text={'Dark Theme'}
            iconName="adjust"
          />
        </View>
      </View>
      <View style={styles.bottomContent}>
        <DrawerLine
          onPress={() => console.log('AAAA ')}
          text={'Settings'}
          iconName="cog"
        />
        <DrawerLine
          onPress={handleLogout}
          text={'Logout'}
          iconName="sign-out-alt"
        />
      </View>
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
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  drawerTrigger: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  headerArea: {
    padding: 20,
    backgroundColor: '#3AC0A0',
    borderBottomWidth: 1,
  },
  imgContent: {
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  bottomContent: {
    borderTopWidth: 2,
    borderTopColor: '#D4D6DD',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default DrawerMenu;
