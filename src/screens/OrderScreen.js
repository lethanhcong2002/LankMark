import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import {
    Button,
    Text,
    Modal,
    Portal,
    Checkbox,
    TextInput,
    IconButton,
    Card,
    Divider
} from 'react-native-paper';
import { getInvoice, orderDishes } from '../handle_code/invoiceManage';
import { getDishesFromFireStore } from '../handle_code/dishesManage';
import { formatCurrency } from '../handle_code/supportingCode';

export default function OrderScreen({ navigation , route }) {
    const { reservationData } = route.params;
    const [orderData, setOrderData] = useState([]);
    const [menuData, setMenuData] = useState([]);
    const [filteredMenuData, setFilteredMenuData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [confirmedDishes, setConfirmedDishes] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getInvoice(reservationData.id, data => {
                    setOrderData(data);
                });
                await getDishesFromFireStore(dishes => {
                    setMenuData(dishes);
                    setFilteredMenuData(dishes);
                });
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        fetchData();
    }, []);

    const handleOrder = () => {
        const selectedData = confirmedDishes.map(({ id, quantity, price }) => ({
            id,
            quantity,
            price
        }));
        orderDishes(orderData[0].id, selectedData);
        navigation.goBack();
    }


    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleDishSelection = dish => {
        setSelectedDishes(prevSelectedDishes => {
            if (prevSelectedDishes.some(item => item.id === dish.id)) {
                return prevSelectedDishes.filter(item => item.id !== dish.id);
            } else {
                return [...prevSelectedDishes, dish];
            }
        });
    };

    const handleQuantityChange = (dish, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [dish.id]: quantity,
        }));
    };

    const handleSearch = query => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredMenuData(menuData);
        } else {
            setFilteredMenuData(
                menuData.filter(dish =>
                    dish.foodName.toLowerCase().includes(query.toLowerCase()),
                ),
            );
        }
    };

    const renderDishSelection = () => {
        return filteredMenuData.map(dish => (
            <View key={dish.id} className="mb-4">
                <Checkbox.Item
                    label={`${dish.foodName} - ${dish.price} đ`}
                    status={
                        selectedDishes.some(item => item.id === dish.id)
                            ? 'checked'
                            : 'unchecked'
                    }
                    onPress={() => handleDishSelection(dish)}
                    color='#48bb78'
                />
                {selectedDishes.some(item => item.id === dish.id) && (
                    <TextInput
                        label="Số lượng"
                        mode="outlined"
                        keyboardType="numeric"
                        value={quantities[dish.id] || ''}
                        onChangeText={text => handleQuantityChange(dish, text)}
                        className="mt-2"
                    />
                )}
            </View>
        ));
    };

    const renderConfirmedDishes = () => {
        return confirmedDishes.map((dish, index) => (
            <View key={dish.id}>
                <View>
                    <Text>{`${dish.foodName} - ${formatCurrency(dish.price)}`}</Text>
                    <Text>{`Số lượng: ${dish.quantity || 1}`}</Text>
                    <Text>{`Tổng tiền: ${formatCurrency(dish.price * dish.quantity)}`}</Text>
                </View>
                {index < confirmedDishes.length - 1 && <Divider className="my-2" bold/>}
            </View>
        ));
    };

    const getTotalPrice = () => {
        return confirmedDishes.reduce((total, dish) => total + (dish.price * (dish.quantity || 1)), 0);
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <View className="p-4">
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text className="text-2xl font-bold text-center mb-4">Thông tin lịch đặt</Text>
                            <View className="mb-4">
                                <Text className="text-lg font-semibold mb-2">Thông tin khách hàng:</Text>
                                <View className="ml-4">
                                    <Text>
                                        <Text className="font-semibold">Tên khách hàng: </Text>
                                        {reservationData.customerName}
                                    </Text>
                                </View>
                            </View>
                            <Button onPress={toggleModal}>Gọi món</Button>
                        </Card.Content>
                    </Card>
                    <Card style={[styles.card, { marginTop: 10 }]}>
                        <Card.Content>
                            <Text className="text-2xl font-bold text-center mb-4">Món ăn</Text>
                            <View className="mb-4">
                                {renderConfirmedDishes()}
                            </View>
                            <Divider bold />
                            <View className="my-4 items-end ">
                                <Text className="font-bold text-xl">Tổng tiền: <Text>{formatCurrency(getTotalPrice())}</Text></Text>
                                
                            </View>
                            <Button mode='contained' buttonColor='#48bb78' onPress={handleOrder}>Xác nhận</Button>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>

            <Portal>
                <Modal visible={modalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modal}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View className="p-5 flex-1">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-2xl font-bold text-center">Chọn món</Text>
                                <IconButton
                                    icon="close"
                                    size={24}
                                    onPress={toggleModal}
                                />
                            </View>
                            <TextInput
                                label="Tìm kiếm món ăn"
                                mode="outlined"
                                value={searchQuery}
                                onChangeText={handleSearch}
                                className="mb-4"
                            />
                            <ScrollView className="flex-1">
                                {renderDishSelection()}
                            </ScrollView>
                            <View className="flex-row justify-center mt-4">
                                <Button
                                    onPress={() => {
                                        setConfirmedDishes(selectedDishes.map(dish => ({
                                            ...dish,
                                            quantity: quantities[dish.id] || 1,
                                        })));
                                        toggleModal();
                                    }}
                                    mode='contained'
                                    buttonColor='#48bb78'
                                >
                                    Xác nhận
                                </Button>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 4,
    },
    modal: {
        flex: 1,
        backgroundColor: 'white',
        margin: 0,
    },
});
