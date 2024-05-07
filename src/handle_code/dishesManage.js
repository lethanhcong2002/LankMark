import firestore from '@react-native-firebase/firestore';

export function getDishesFromFireStore(callback) {
    return firestore().collection('MenuItem').where('status', '!=', 'deleted').onSnapshot(snapshot => {
        const dishes = snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }));
        callback(dishes);
    });
}
