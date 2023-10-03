import React, { Component } from 'react';
import './roll.css';

//Component for a roll, its price, and options, as would be shown on the products page
class RollCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGlazing: this.props.selectedGlazing,
      selectedPack: this.props.selectedPack,
      glazingPrice: 0,
      packPrice: 1
    };    
  }


  // TODO Function that updates price vals in the parent index

  // Method to update the current pack and it's price
  // Was having problems with setting state being async – used this resource for solve
  // https://techgleanings.com/decoding-the-delays-understanding-setstate-and-how-to-ensure-immediate-updates
  updatePack(e){
    let selectedPackValue = e.target.parentNode.querySelector('input:checked + label').textContent
    this.setState({packPrice: Number(e.target.value), selectedPack: selectedPackValue}, () => {
      this.props.updateRollData(this.props.rollIndex, this.state)
    });
  }

  // Method to update the current glazing and it's price
  updateGlazing(e){
    let selectedGlazingValue = e.target.options[e.target.selectedIndex].text
    this.setState({glazingPrice: Number(e.target.value), selectedGlazing: selectedGlazingValue}, () => {
      this.props.updateRollData(this.props.rollIndex, this.state)
    });
  }

  render() {
    //TODO Check this
    const packStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid black",
      width: "35px",
      height: "35px",
      cursor: "pointer",
    }

    const selectedPackStyle = {
      ...packStyle,
      backgroundColor: "lightgray",
    }

    return (
        <div className="item">
        <img src={this.props.imageURL} width="280" alt={this.props.imageAlt}/>
        <h1 className="larger-font bold">{this.props.rollName}</h1>

        <div className="item-info">

          <div className="item-row">
            <label htmlFor={this.props.rollId+'-glazing'}>Glazing:</label>
            <select name={this.props.rollId+'-glazing'} id={this.props.rollId+'-glazing'} className="item-choice" onChange={(e) => this.updateGlazing(e)}>
              <option value="0">Keep original</option>
              <option value="0">Sugar milk</option>
              <option value="0.5">Vanilla milk</option>
              <option value="1.5">Double chocolate</option>
            </select>
          </div>

          <div className="item-row">
            <span>Pack Size:</span>
            <div className="pack-radio item-choice" id={this.props.rollId+'-pack'} onChange={(e) => this.updatePack(e)}>
              <input type="radio" id={this.props.rollId+'-pack1'} name={this.props.rollId} value="1" defaultChecked/>
              <label htmlFor={this.props.rollId+'-pack1'} style={this.state.selectedPack === "1" ? selectedPackStyle : packStyle}>1</label>

              <input type="radio" id={this.props.rollId+'-pack3'} name={this.props.rollId} value="3"/>
              <label htmlFor={this.props.rollId+'-pack3'} style={this.state.selectedPack === "3" ? selectedPackStyle : packStyle}>3</label>
              
              <input type="radio" id={this.props.rollId+'-pack6'} name={this.props.rollId} value="5"/>
              <label htmlFor={this.props.rollId+'-pack6'} style={this.state.selectedPack === "6" ? selectedPackStyle : packStyle}>6</label>
              
              <input type="radio" id={this.props.rollId+'-pack12'} name={this.props.rollId} value="10"/>
              <label htmlFor={this.props.rollId+'-pack12'} style={this.state.selectedPack === "12" ? selectedPackStyle : packStyle}>12</label>
            </div>
          </div>

          <div className="item-row">
            <span className="larger-font bold">$ {this.props.displayPrice.toFixed(2)}</span>
            <button className="cart bold larger-font hover-hl item-choice" 
              onClick={() => this.props.clickBuy({roll: this.props.rollName, 
                glazing: this.state.selectedGlazing, 
                pack: this.state.selectedPack, 
                price: this.props.displayPrice,
                imageURL: this.props.imageURL,
                imageAlt: this.props.imageAlt})}>
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    ) 
  }
}

export default RollCard