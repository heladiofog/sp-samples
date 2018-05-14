// Component into Reacr, the whole library
import React, {Component} from 'react';
import './product-condensed.css';

// Defining a reusable component
class ProductCondensed extends Component {
    render() {
        // return the component
        return (
            // Create a separate component for the list item
            <li className="list-group-item">
                <a className="btn btn-outline-danger">
                    {this.props.product.title} | ${this.props.product.price}
                </a>
            </li>
        );
    }
}

export default ProductCondensed;
