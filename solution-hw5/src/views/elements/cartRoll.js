import React, { Component } from 'react';
import './cartRoll.css';


//Component for a roll, its price, and options, as would be shown on the products page
class RollInCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };    
  }

  render() {
    return (
        <div className='miniRollParent'>
          <img src={this.props.roll.imageURL} width="150" alt={this.props.roll.imageAlt}/>
          <span>{this.props.roll.type}</span>
          <span>Glazing: {this.props.roll.glazing}</span>
          <span>Pack Size: {this.props.roll.pack}</span>
          <span className='bold'>${this.props.roll.price.toFixed(2)}</span>
          <button>Remove</button>
        </div>
    ) 
  }
}

export default RollInCart