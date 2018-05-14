import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// Components
import Product from '../product/product';
import WishList from '../wishlist/wishlist';

// Services
import HttpService from '../services/http-service';

const http = new HttpService();

class App extends Component {
    // First thing executed
    constructor(props) {
        super(props);

        // Initial state:
        this.state = {products:[]};

        // Test data API
        // http.getProducts();
        
        // Bind functions
        this.loadData = this.loadData.bind(this);
        this.productList = this.productList.bind(this);
        
        this.loadData();
    }

    // Data Loading
    loadData = () => {
        var self = this;    // refe to the component because of the promise (async) down there

        http.getProducts().then(data => {   // retrieving the promise success
            console.log(data);
            // Set the state: every time it is set all the entire component is reloaded/refresed
            self.setState({products: data});    // to make the right reference
        }, err => { // If there's a error
            console.log(`Msj retrieved: ${err}`);
        });
    }
    
    // Printing product List
    productList = () => {
        // TO DO Check for map function, iterates over a collection
        const list = this.state.products.map((product) => 
            // Create a Product html block
            <div className="col-sm-4" key={product._id}>
                <Product title={product.title} imgUrl={product.imgUrl} price={product.price} />
            </div>
        );

        return list;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {/* <img className="card-img-top" alt="Product" /> */}
                    <h1 className="App-title">Welcome to React Swag Shop</h1>
                </header>
                <div className="container-fluid App-main">
                    {/* Props sample: */}
                    <div className="row">
                        <div className="col-sm-8">
                            {/* Calling the function */}
                            <div className="row">
                                {this.productList()}
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <WishList />
                        </div>
                    </div>
                </div>
                {/* <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
                </p> */}
            </div>
        );
    }
}

export default App;
