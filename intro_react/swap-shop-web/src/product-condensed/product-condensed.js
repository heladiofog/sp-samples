// Component into Reacr, the whole library
import React, {Component} from 'react';
import './product-condensed.css';

// Defining a reusable component
class ProductCondensed extends Component {
    render() {
        // return the component
        return (
            // Create a separate component for the list item
            <li className="list-group-item pc-condensed">
                <a className="btn btn-outline-danger">X</a>
                <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
            </li>
        );
    }
}

export default ProductCondensed;
