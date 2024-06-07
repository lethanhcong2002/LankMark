import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const INVOICE = firestore().collection('Invoice');
const INVOICE_DETAIL = firestore().collection('InvoiceDetail');

function getInvoice(id, callback) {
    try {
        return INVOICE.where('reservationKey', '==', id).onSnapshot(snapshot => {
            const dishes = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            callback(dishes);
        }, error => {
            console.error("Error fetching reservations:", error);
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
    }
}

async function orderDishes(id, data) {
    try {
        await firestore().runTransaction(async (transaction) => {
            const totalPrice = data.reduce((total, dish) => total + (parseFloat(dish.price) * parseInt(dish.quantity)), 0);

            const invoiceRef = INVOICE.doc(id);
            const invoiceSnapshot = await transaction.get(invoiceRef);
            const invoiceData = invoiceSnapshot.data();
            transaction.update(invoiceRef, { totalAmount: totalPrice });

            const batch = firestore().batch();
            data.forEach((dish) => {
                const invoiceDetailRef = INVOICE_DETAIL.doc();
                batch.set(invoiceDetailRef, {
                    invoiceKey: id,
                    menuItemKey: dish.id,
                    itemQuantity: parseInt(dish.quantity),
                    totalPrice: parseFloat(dish.price) * parseInt(dish.quantity),
                });
            });
            await batch.commit();
        });
    } catch (error) {
        console.error("Error ordering dishes:", error);
        Alert.alert("Error", "There was an error ordering dishes. Please try again later.");
    }
}


export {getInvoice, orderDishes}