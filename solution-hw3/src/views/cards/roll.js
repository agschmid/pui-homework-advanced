import React, { Component } from 'react';
//import './roll.css' -> TO DO separate out the CSS where possible

class RollCard extends Component {
    render() {
        return (
            <div className="item">
            <img src={this.props.imageURL} width="280" alt={this.props.imageAlt}/>
            <h1 className="larger-font bold">{this.props.rollName}</h1>

            <div className="item-info">

              <div className="item-row">
                <label htmlFor={this.props.rollId+'-glazing'}>Glazing:</label>
                <select name={this.props.rollId+'-glazing'} id={this.props.rollId+'-glazing'} className="item-choice">
                  <option value="orginal">Keep original</option>
                  <option value="sugar">Sugar milk</option>
                  <option value="vanilla">Vanilla milk</option>
                  <option value="chocolate">Double chocolate</option>
                </select>
              </div>

              <div className="item-row">
                <span>Pack Size:</span>
                <div className="pack-radio item-choice" id={this.props.rollId+'-pack'}>
                  <input type="radio" id={this.props.rollId+'-pack1'} name={this.props.rollId} value="1" defaultChecked/> <label htmlFor={this.props.rollId+'-pack1'}>1</label>
                  <input type="radio" id={this.props.rollId+'-pack3'} name={this.props.rollId} value="3"/><label htmlFor={this.props.rollId+'-pack3'}>3</label>
                  <input type="radio" id={this.props.rollId+'-pack6'} name={this.props.rollId} value="6"/><label htmlFor={this.props.rollId+'-pack6'}>6</label>
                  <input type="radio" id={this.props.rollId+'-pack12'} name={this.props.rollId} value="12"/><label htmlFor={this.props.rollId+'-pack12'}>12</label>
                </div>
              </div>

              <div className="item-row">
                <span className="larger-font bold">$ {this.props.basePrice}</span>
                <button className="cart bold larger-font hover-hl item-choice">Add to Cart</button>
              </div>

            </div>
          </div>
        ) 
    }
}

export default RollCard