// Component into Reacr, the whole library
import React, {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed';

// Defining a reusable component
class WishList extends Component {

    constructor (props) {
        super(props);

        

        // Bind functions
        this.createWishList = this.createWishList.bind(this);
    }

    createWishList = () => {
        const list = this.state.wishlist.map((product) =>
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
                        <ProductCondensed  />
                    </ul>
                </div>
            </div>
        );
    }
}

export default WishList;
