// Component into Reacr, the whole library
import React, {Component} from 'react';
import './product.css';

// Defining a reusable component
class Product extends Component {
    render() {
        // return the component
        return (
            <div className="card product">
                <img className="card-img-top" alt="Product" src={this.props.imgUrl} />
                <div className="card-block">
                    <h4 className="card-title">{this.props.title}</h4>
                    <p className="card-text">Price: $ {this.props.price} </p>
                    <a href="#" className="btn btn-primary">Add to Wishlist</a>
                </div>
            </div>
        );
    }
}

export default Product;
