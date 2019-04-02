// Component into Reacr, the whole library
import React, {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed';
// Services
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ns = new NotificationService();

// Defining a reusable component
class WishList extends Component {

    constructor(props) {
        super(props);

        this.state = { wishList:[] };
        /*// Test data
        {
                title: "Vaqueraza",
                price: 15.00,
                _id: "dadasj83li3"
            },
            {
                title: "Tocino",
                price: 152.00,
                _id: "dadfs4444fv"
            },
            {
                title: "Pato",
                price: 152.00,
                _id: "dadacdas32"
            }*/

        // Bind functions
        this.createWishList = this.createWishList.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }

    // Observers, natives from React life cycle
    // When the component is rendered on the screen
    componentDidMount() {
        console.log('Check to see if firing DidMount')
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }
    // When the component is out of memory
    componentWillUnmount() {
        console.log('Check to see if firing DidUnmount')
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    // Refresh the component, observer callback function
    onWishListChanged(newWihsList) {
        // Reset the state for the component to be refreshes
        this.setState({ wishList: newWihsList });
    }

    createWishList = () => {
        const list = this.state.wishList.map((product) =>
            <ProductCondensed product={product} key={product._id} />
        );

        return list;
    }

    render() {
        // return the component
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Wish List</h4>
                    <ul className="list-gruop">
                    {/* Create a separate component for the list Item */}
                        {this.createWishList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default WishList;
