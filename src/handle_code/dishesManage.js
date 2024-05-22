import firestore from '@react-native-firebase/firestore';

const DISHES = firestore().collection('MenuItem');
const INVOICE_DETAIL = firestore().collection('InvoiceDetail');
function getDishesFromFireStore(callback) {
    try {
        return DISHES.where('status', '!=', 'deleted').onSnapshot(snapshot => {
            const dishes = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            callback(dishes);
        }, error => {
            console.error("Error fetching dishes:", error);
        });
    } catch (error) {
        console.error("Error fetching dishes:", error);
    }
}

function getNewestDishes(callback) {
    try {
        return DISHES.where('status', '!=', 'deleted').onSnapshot(snapshot => {
            const allDishes = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            const selectedDishes = allDishes.slice(0, 5);

            callback(selectedDishes);
        }, error => {
            console.error("Error fetching dishes:", error);
        });
    } catch (error) {
        console.error("Error fetching dishes:", error);
    }
}

async function getPopularDishes(callback) {
    try {
        const unsubscribe = INVOICE_DETAIL.onSnapshot(snapshot => {
            const menuItemCounts = {};

            snapshot.forEach(doc => {
                const menuItemKey = doc.data().menuItemKey;
                menuItemCounts[menuItemKey] = (menuItemCounts[menuItemKey] || 0) + 1;
            });

            const popularDishPromises = Object.keys(menuItemCounts).map(async menuItemKey => {
                try {
                    const menuItemSnapshot = await DISHES.doc(menuItemKey).get();
                    return menuItemSnapshot.data();
                } catch (error) {
                    console.error('Error fetching menu item data:', error);
                    return null;
                }
            });

            Promise.all(popularDishPromises).then(popularDishes => {
                callback(popularDishes.filter(dish => dish !== null));
            });
        }, error => {
            console.error('Error counting menu item occurrences:', error);
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error counting menu item occurrences:', error);
    }
}

export {getDishesFromFireStore, getNewestDishes, getPopularDishes}