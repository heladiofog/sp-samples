import React, { Component } from 'react';
// import './header.css';

// import SearchNav from '';
// import DepartamentosNav from '';
// import app from '../../../../RestaurantAPI/src/index'

class Header extends Component {
    render() {
        return (
            <div className="Header">
                Header NavBar
                {/* <SearchNav /> */}
                <a>Link</a>
                <a>Link</a>
                <a>Link</a>
                <ul>
                    {/* Pintar lista departamentos */}
                    {/* <DepartamentosNav /> */}
                    {/* <li>Test</li> */}
                </ul>

            </div>
        );
    }
}

export default Header;