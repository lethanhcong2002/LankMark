import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { IconButton, Menu } from 'react-native-paper';

export default function CustomDotUser({navigation}) {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigateToDetail = screenName => {
    closeMenu();
    navigation.navigate(screenName);
  };


  return (
    <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item
                onPress={() => navigateToDetail('UpdateUser')}
                title="Chỉnh sửa thông tin cá nhân"
            />
            <Menu.Item
                title="Thay đổi mật khẩu"
            />
    </Menu>
  )
}
