// Component into Reacr, the whole library
import React, {Component} from 'react';
import './product-condensed.css';
// Services
import DataService from '../services/data-service';

let ds = new DataService();

// Defining a reusable component
class ProductCondensed extends Component {
    constructor(props) {
        super(props);

        // Bind
        this.removeProduct = this.removeProduct.bind(this);
    }

    removeProduct = () => {
        ds.removeWishListItem(this.props.product);
    }

    render() {
        // return the component
        return (
            // Create a separate component for the list item
            <li className="list-group-item pc-condensed">
                <a className="btn btn-outline-danger" onClick={() => this.removeProduct()}>X</a>
                <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
            </li>
        );
    }
}

export default ProductCondensed;
