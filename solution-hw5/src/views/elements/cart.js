import React, { Component } from 'react';
import './cart.css';

import RollInCart from '../elements/cartRoll';


//Component for a roll, its price, and options, as would be shown on the products page
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };    
  }

  render() {
    let cartDisplay = <div className="cartArea">
                        <div className='cartInfo'>
                            <span className="larger-font bold">Shopping Cart ({this.props.rollList.length} Items)</span>
                            <span className="larger-font bold">Total: ${this.props.itemTotal.toFixed(2)}</span>
                        </div>
                        <div className="cartRollParent">
                          {this.props.rollList.map((roll, idx) => {
                            return <RollInCart
                              key={idx}
                              roll={roll}
                              />;
                          })}
                        </div>
                      </div>
    
    let emptyCartyDisplay = <div className="cartArea bold larger-font">The Cart is Empty!</div>

    return (
      <div>
        {this.props.rollList.length===0 ? emptyCartyDisplay : cartDisplay}
      </div>
    ) 
  }
}

export default Cart