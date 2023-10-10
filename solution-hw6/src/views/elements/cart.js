import React, { Component } from 'react';
import './cart.css';

import RollInCart from '../elements/cartRoll';


//Component for the cart area
class Cart extends Component {
  render() {
    // The cart area for if a roll is in the cart
    let cartDisplay = <div className="cartArea">
                        <div className='cartInfo'>
                            <span className="larger-font bold">Shopping Cart ({this.props.rollList.length} Items)</span>
                            <span className="larger-font bold">Total: ${this.props.itemTotal.toFixed(2)}</span>
                        </div>
                        <div className="cartRollParent">
                          {this.props.rollList.map((roll, idx) => {
                            return <RollInCart
                              key={idx}
                              index = {idx}
                              roll={roll}
                              deleteRoll = {this.props.deleteRoll}
                              />;
                          })}
                        </div>
                      </div>
    
    // The cart area for if a roll is not in the cart
    let emptyCartyDisplay = <div className="cartArea bold larger-font">The Cart is Empty!</div>

    // Render conditionally based on cart length
    return (
      <div>
        {this.props.rollList.length===0 ? emptyCartyDisplay : cartDisplay}
      </div>
    ) 
  }
}

export default Cart