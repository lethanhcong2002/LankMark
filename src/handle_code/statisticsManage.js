import firestore from '@react-native-firebase/firestore';

const RESERVATIONS = firestore().collection('Reservations');

function getTotalInvoice(id, callback) {
    try {
        const unsubscribe = RESERVATIONS.where('customerId', '==', id).onSnapshot(snapshot => {
            let totalItemCount = snapshot.size;
            callback(totalItemCount);
        }, error => {
            console.error('Error getting invoices:', error);
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error getting total invoice:', error);
        return null;
    }
}

function getTotalInvoiceComplete(id, callback) {
    try {
        const unsubscribe = RESERVATIONS.where('customerId', '==', id).onSnapshot(snapshot => {
            let totalItemCount = 0;

            snapshot.docs.forEach(doc => {
                const invoiceData = doc.data();
                if (invoiceData.status === "Đã thanh toán") {
                    totalItemCount += 1;
                }
            });

            callback(totalItemCount);
        }, error => {
            console.error('Error getting invoices:', error);
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error getting total invoice:', error);
        return null;
    }
}

function getTotalInvoiceDelete(id, callback) {
    try {
        const unsubscribe = RESERVATIONS.where('customerId', '==', id).onSnapshot(snapshot => {
            let totalItemCount = 0;

            snapshot.docs.forEach(doc => {
                const invoiceData = doc.data();
                if (invoiceData.status === "Hủy đặt") {
                    totalItemCount += 1;
                }
            });

            callback(totalItemCount);
        }, error => {
            console.error('Error getting invoices:', error);
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error getting total invoice:', error);
        return null;
    }
}

export { getTotalInvoice, getTotalInvoiceComplete, getTotalInvoiceDelete };
