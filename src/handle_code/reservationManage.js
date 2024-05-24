import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const RESERVATIONS = firestore().collection('Reservations');
async function addNewReservation(data) {
    try {
        await RESERVATIONS.add(data);
        Alert.alert("Đặt lịch thành công");
    } catch (error) {
        console.log(error);
    }
}

function getReservationList(id, callback) {
    try {
        return RESERVATIONS.where('customerId', '==', id).onSnapshot(snapshot => {
            const dishes = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })).filter(doc => doc.status !== 'Hủy đặt bàn' && doc.status !== 'Đã thanh toán');

            callback(dishes);
        }, error => {
            console.error("Error fetching reservations:", error);
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
    }
}

async function updateReservation(id, data) {
    try {
        await RESERVATIONS.doc(id).update(data);
        Alert.alert("Cập nhật thành công");
    } catch (error) {
        console.log(error);
    }
}

async function deleteReservation(id) {
    try {
        await RESERVATIONS.doc(id).update({ status: "Hủy đặt" });
        Alert.alert("Hủy đặt bàn thành công");
    } catch (error) {
        console.log(error);
    }
}

function getInvoiceActive(id, callback) {
    try {
        return RESERVATIONS.where('customerId', '==', id).onSnapshot(snapshot => {
            const dishes = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })).filter(doc => doc.status !== 'Hủy đặt' && doc.status !== 'Đã thanh toán');

            callback(dishes);
        }, error => {
            console.error("Error fetching reservations:", error);
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
    }
}

function getInvoiceComplete(id, callback) {
    try {
        return RESERVATIONS.where('customerId', '==', id).onSnapshot(snapshot => {
            const dishes = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })).filter(doc => doc.status === 'Hủy đặt' || doc.status === 'Đã thanh toán');

            callback(dishes);
        }, error => {
            console.error("Error fetching reservations:", error);
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
    }
}
export { addNewReservation, getReservationList, updateReservation, deleteReservation, getInvoiceActive, getInvoiceComplete };
