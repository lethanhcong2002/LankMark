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
            let resolvedCount = 0; // Counter for resolved promises
            const top5Dishes = []; // Array to store the top 5 dishes

            snapshot.forEach(doc => {
                const menuItemKey = doc.data().menuItemKey;
                menuItemCounts[menuItemKey] = (menuItemCounts[menuItemKey] || 0) + 1;
            });

            const sortedMenuItemKeys = Object.keys(menuItemCounts)
                .sort((a, b) => menuItemCounts[b] - menuItemCounts[a]);
            sortedMenuItemKeys.forEach(async menuItemKey => {
                try {
                    const menuItemSnapshot = await DISHES.doc(menuItemKey).get();
                    const menuItemData = menuItemSnapshot.data();

                    // Check if the dish is deleted and if we need more dishes
                    if (menuItemData && menuItemData.status !== 'deleted' && top5Dishes.length < 5) {
                        top5Dishes.push(menuItemData);
                        callback([...top5Dishes]); // Update callback with the current top 5 dishes
                    }
                } catch (error) {
                    console.error('Error fetching menu item data:', error);
                } finally {
                    resolvedCount++; // Increment the resolved promise count

                    // Check if all promises have resolved and we still need more dishes
                    if (resolvedCount === sortedMenuItemKeys.length && top5Dishes.length < 5) {
                        callback([...top5Dishes]); // Update callback with the available top 5 dishes
                    }
                }
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