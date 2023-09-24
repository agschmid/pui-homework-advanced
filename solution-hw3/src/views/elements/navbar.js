import React, { Component } from 'react';
import './navbar.css';

//Navbar component for the whole top of page
class NavBar extends Component {
    render() {
        return (
          <div className="header-group">
            <img src="assets/logo/logo-01.svg" alt="A cinnamon bun drawing next to the text 'Bun bun bake shop'" width="400"/>
            <header>
              <nav>
                <a className="bold larger-font hover-hl">PRODUCTS</a>
                <a className="larger-font hover-hl">CART</a>
              </nav>
              <hr/>
              <span className="largest-font">Our hand-made cinnamon rolls</span>
            </header>
          </div>
        ) 
    }
}

export default NavBar