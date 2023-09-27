import React, { Component } from 'react';
import './navbar.css';

//Navbar component for the whole top of page
class NavBar extends Component {
    render() {
        return (
              <div className="header-group"> 
                <img src="./assets/logo/logo-01.svg" alt="A cinnamon bun drawing next to the text 'Bun bun bake shop'" width="400"/>
                <header>
                  <nav>
                    <a className="bold larger-font hover-hl">PRODUCTS</a>
          
                    <div className="cart-area">

                      <div className="cart-constant">
                        <a className="larger-font">CART</a>
                        <ul className="cart-elements">
                          <li>0 items</li>
                          <li>Total: $0.00</li>
                        </ul>
                      </div>
          
                      <div className="cart-popup">
                        <span>Added to Cart: <br/><br/></span>
                        <ul className="popup-list">
                          <li className="bold"></li>
                          <li></li>
                          <li></li>
                          <li></li> 
                        </ul>
                      </div>
          
                    </div>
          
                  </nav>
                  <hr/>
                  <span className="largest-font">Our hand-made cinnamon rolls</span>
                </header>
              </div>
        ) 
    }
}

export default NavBar