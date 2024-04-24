import React, {ReactNode, useRef} from 'react';
import {
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useSharedState} from '../../screens/Home/logic';
import {useSharedState as useSharedUserState} from '../../context/globalUseState';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DrawerLine from './drawerLine';
import {storage} from '../../redux/mmkv/storage';
import UserImage from './userImg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/types';
import {setIsLogged} from '../../redux/actions';
import {StackNavigationProp} from '@react-navigation/stack';

interface DrawerMenuProps {
  children: ReactNode;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({children}) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  const {setDrawerOn} = useSharedState();
  const selectUserType = (state: RootState) => state.userType;
  const USERTYPE = useSelector(selectUserType);
  // ==============================================================
  const useLogout = () => {
    const {setName, setPassword} = useSharedUserState();
    const dispatch = useDispatch();

    const handleLogout = () => {
      // Save the JSON string to MMKV storage
      storage.set('ISLOGGED', false);
      dispatch(setIsLogged(false));
      setName('');
      setPassword('');
    };
    return {handleLogout};
  };
  // ==============================================================
  const {handleLogout} = useLogout();
  const {name} = useSharedUserState();

  const handleOpen = () => {
    drawerRef.current?.openDrawer();
    setDrawerOn(true);
  };

  const handleClose = () => {
    drawerRef.current?.closeDrawer();
    setDrawerOn(false);
  };
  // ==============================================================

  const navigationView = (
    <View style={styles.navigationViewContainer}>
      <View style={{flex: 1}}>
        <View style={styles.headerArea}>
          <TouchableOpacity onPress={handleClose}>
            <FontAwesome5 name={'arrow-left'} size={30} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={[styles.title, {color: '#000'}]}>Voltar</Text>
          </View>
        </View>
        <View style={styles.userBanner}>
          <UserImage />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.title}>{name ? name : 'User1576'}</Text>
            <Text style={styles.text}>{USERTYPE ? USERTYPE : 'Outros'}</Text>
          </View>
        </View>
        <DrawerLine
          text={'Página Inicial'}
          onPress={() => console.log('AAAA ')}
          iconName="home"
          isDisabled={true}
        />
        <DrawerLine
          onPress={() => console.log('AAAA ')}
          text={'Perfil'}
          iconName="user-circle"
        />
        <DrawerLine
          onPress={() => console.log('AAAA ')}
          text={'Tema Escuro'}
          iconName="adjust"
        />
      </View>
      <View style={styles.bottomContent}>
        <DrawerLine
          onPress={() => console.log('AAAA ')}
          text={'Configurações'}
          iconName="cog"
        />
        <DrawerLine
          onPress={() => {
            drawerRef.current?.closeDrawer();
            setDrawerOn(false);
            handleLogout();
          }}
          text={'Sair'}
          iconName="sign-out-alt"
        />
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={() => navigationView}
      onDrawerOpen={handleOpen}
      onDrawerClose={handleClose}>
      {children}
      <TouchableOpacity style={styles.drawerTrigger} onPress={handleOpen}>
        <FontAwesome5 name={'bars'} size={30} color="#fff" />
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
  title: {
    flex: 1,
    fontSize: 20,
    color: 'black',
  },
  text: {
    flex: 1,
    fontSize: 17,
    color: 'black',
  },
  drawerTrigger: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 1,
  },
  headerArea: {
    padding: 12,
    backgroundColor: '#3AC0A0',
    borderBottomWidth: 1,
  },
  userBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F8F9FE',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  bottomContent: {
    borderTopWidth: 2,
    borderTopColor: '#D4D6DD',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default DrawerMenu;
