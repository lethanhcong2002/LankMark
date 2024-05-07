import React, {useState} from 'react';
import {IconButton, Menu, Button, Text, Portal} from 'react-native-paper';
import CustomDialog from './CustomDialog';

function CustomDotMenu({navigation}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigateToDetail = screenName => {
    closeMenu();
    navigation.navigate(screenName);
  };

  const showDialog = () => {
    closeMenu();
    setDialogVisible(true);
  };
  const hideDialog = () => setDialogVisible(false);

  const handleCancelReservation = () => {
    hideDialog();
  };

  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
        <Menu.Item
          onPress={() => navigateToDetail('Detail_Reservation')}
          title="Xem chi tiết"
        />
        <Menu.Item
          onPress={() => navigateToDetail('Reservation')}
          title="Thay đổi thông tin"
        />
        <Menu.Item onPress={showDialog} title="Hủy đặt bàn" />
      </Menu>

      <Portal>
        <CustomDialog
          visible={dialogVisible}
          onDismiss={hideDialog}
          title="Xác nhận hủy đặt bàn"
          content="Bạn có chắc muốn hủy đặt bàn này?"
          onConfirm={handleCancelReservation}
        />
      </Portal>
    </>
  );
}

export default CustomDotMenu;
