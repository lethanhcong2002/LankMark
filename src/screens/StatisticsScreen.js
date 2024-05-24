import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getTotalInvoice, getTotalInvoiceComplete, getTotalInvoiceDelete } from '../handle_code/statisticsManage';

export default function StatisticsScreen() {
    const [totalAmount, setTotalAmount] = useState('0');
    const [totalComplete, setTotalComplete] = useState('0');
    const [totalDelete, setTotalDelete] = useState('0');
    const user = useSelector(state => state.auth.userData);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getTotalInvoice(user.uid, (dishes) => {
                    setTotalAmount(dishes);
                });

                await getTotalInvoiceComplete(user.uid, (dishes) => {
                    setTotalComplete(dishes);
                });

                await getTotalInvoiceDelete(user.uid, (dishes) => {
                    setTotalDelete(dishes);
                });

            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };
        fetchData();
    }, [])
    return (
        <View className="flex-1, p-4">
            <View className="mb-4 bg-transparent p-4 rounded-lg shadow-md">
                <Text className="text-base font-bold">Tổng số hóa đơn: {totalAmount}</Text>
            </View>
            <View className="mb-4 bg-transparent p-4 rounded-lg shadow-md">
                <Text className="text-base font-bold">Tổng số hóa đơn đã thanh toán: {totalComplete}</Text>
            </View>
            <View className="mb-4 bg-transparent p-4 rounded-lg shadow-md">
                <Text className="text-base font-bold">Tổng số hóa đơn đã hủy: {totalDelete}</Text>
            </View>
        </View>
    );
}

