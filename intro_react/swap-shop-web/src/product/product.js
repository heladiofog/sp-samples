// Component into Reacr, the whole library
import React, {Component} from 'react';
import './product.css';

// Services
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

// Defining a reusable component
class Product extends Component {

    constructor(props) {
        super(props);

        // Check if a product is in our product wishList
        this.state = { onWishList: ds.itemOnWishList() };
        // Bind functions
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }

    // Observers, natives from React life cycle
    componentDidMount() {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }

    componentWillUnmount() {
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }
    // Refreshing the state by observer pattern
    onWishListChanged(newWishList) {
        this.setState({ onWishList: ds.itemOnWishList(this.props.product) });
    }

    onButtonClicked = () => {
        // Product Logic 
        if (this.state.onWishList) {
            ds.removeWishListItem(this.props.product);
        } else {
            ds.addWishListItem(this.props.product);
        }

        // ns.postNotification(NOTIF_WISHLIST_CHANGED, this.props.wishList);
    }

    render() {
        // Some front stylish logic
        var btnClass;

        if (this.state.onWishList) {
            btnClass = "btn btn-danger";    // You can remove it
        } else {
            btnClass = "btn btn-primary";   // You can add it
        }
        
        // return the component
        return (
            <div className="card product">
                <img className="card-img-top" alt="Product" src={this.props.product.imgUrl} />
                <div className="card-block">
                    <h4 className="card-title">{this.props.product.title}</h4>
                    <p className="card-text">Price: $ {this.props.product.price} </p>
                    <a href="#" onClick={ () => this.onButtonClicked() } 
                        className={btnClass}>
                        {/* Ternary operation on React */}
                        {this.state.onWishList ? "Remove From Wish List" : "Add To Cart"}
                    </a>
                </div>
            </div>
        );
    }
}

export default Product;
