// Component into Reacr, the whole library
import React, {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed';

// Defining a reusable component
class WishList extends Component {

    constructor (props) {
        super(props);

        this.state = {wishlist:[
            {
                title: "Vaqueraza",
                price: 15.00,
                _id: "dadasj83li3"
            },
            {
                title: "Cochi",
                price: 152.00,
                _id: "dadfs4444fv"
            },
            {
                title: "Pato",
                price: 152.00,
                _id: "dadacdas32"
            }
        ]}

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
                        {this.createWishList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default WishList;
