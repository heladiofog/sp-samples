// A singleton service
// creating a global constant
export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

// Observers is going to be an object of objects full of arrays of objects
var observers = {
    // "whishListChanged": [{ observer: someComponent, callBack: someFunction }, { observer: someOtherComponent, callBack: someFunction }],
    // "userHasLoggedIn": [{ observer: someComponent, callBack: someFunction }]
}; // Should use a dictionary

// Singleton reference
let instance = null;

class NotificationService {
    constructor() {
        // Singleton setup
        if (!instance) {
            instance = this;
        }
        
        return instance;
    }

    postNotification = (notifName, data) => {
        let obs = observers[notifName];
        // find the right observer
        for (var x = 0; x < obs.length; x++) {
            var obj = obs[x];
            obj.callBack(data);
        }
    }
    
    // observer is the component who observs
    removeObserver = (observer, notifName) => {
        var obs = observers[notifName];

        if (obs) {
            for (var x = 0; x < obs.length; x++) {
                if (observer === obs[x].observer) {
                    obs.splice(x, 1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }

    // notifName: type of notification you are going to receive
    // observer: the conponent who wants to listen
    // callback: a function to attend the petition
    addObserver = (notifName, observer, callBack) => {
        let obs = observers[notifName]; //accesing the object by unique key, p. e. "whishListChanged"
        // Check if the property related to the notification exists
        if (!obs) {
            // if it does not exist, it's created/initialized as an empty array
            observers[notifName] = [];
        }

        let obj = { observer: observer, callBack: callBack };
        observers[notifName].push(obj);
    };
}

export default NotificationService;
