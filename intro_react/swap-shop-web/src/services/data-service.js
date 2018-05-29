// Services
import NotificationService, { NOTIF_WISHLIST_CHANGED } from './notification-service';

let ns = new NotificationService();

// Singleton Data Service
let instance = null;
var wishList = [];

class DataService {
    // Only should have one instance
    constructor () {
        if (!instance) {
            instance = this;
        }

        return instance;
    } 

    // Whether the item is in the list
    itemOnWishList = item => {
        for (let x = 0; x < wishList.length; x++) {
            if (wishList[x]._id === item._id) {
                return true;
            }
        }

        return false;
    }
    
    addWishListItem = item => {
        wishList.push(item);
        // notification being posted
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
    }

    removeWishListItem = item => {
        for (var x = 0; x < wishList.length; x++) {
            if (wishList[x]._id === item._id) {
                wishList.splice(x, 1);
                // notification being posted
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
                break;
            }
        }    
    }
}

export default DataService;