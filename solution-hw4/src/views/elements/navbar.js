import React, { Component } from 'react';
import './navbar.css';

//Navbar component for the whole top of page
class NavBar extends Component {

  render() {
    // Defining the popup cart and displaying it conditionally using the cartUpdated prop from Homepage
    let popUpCart
    if (this.props.cartUpdated){
      popUpCart = <div className="cart-popup">
                    <span>Added to Cart: <br/><br/></span>
                    <ul className="popup-list">
                      <li className="bold">{this.props.recentRoll.roll}</li>
                      <li>{this.props.recentRoll.glazing}</li>
                      <li>Pack of {this.props.recentRoll.pack}</li>
                      <li>Price: ${this.props.recentRoll.price.toFixed(2)}</li> 
                    </ul>
                  </div>
    }
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
                      <li>{this.props.itemCount} items</li>
                      <li>Total: ${this.props.itemTotal.toFixed(2)}</li>
                    </ul>
                  </div>
                  {popUpCart}
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