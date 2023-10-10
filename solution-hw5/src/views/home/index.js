import React, { Component } from 'react';
import './index.css';

import RollCard from '../elements/roll';
import NavBar from '../elements/navbar';
import Cart from '../elements/cart';
import Search from '../elements/search';


// Homepage class is the whole homepage
class Homepage extends Component {
  // Using state for roll information so I can use map to populate with components
  // Holding the cart and search information in state so I can update the cart component
  constructor(props) {
    super(props);
    this.state = {
      rollData: [
          {imageURL: "assets/products/original-cinnamon-roll.jpg",
          imageAlt: "A frosted cinnamon roll on a plate with cinnamon sticks",
          rollName: "Original cinnamon roll",
          rollId: "og",
          basePrice: 2.49,
          rollShowing: true,
          },
          {imageURL:"assets/products/apple-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a plate next to a fork",
          rollName:"Apple cinnamon roll",
          rollId:"apple",
          basePrice: 3.49,
          rollShowing: true,
          },
          {imageURL:"assets/products/raisin-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll with raisins protruding",
          rollName:"Raisin cinnamon roll",
          rollId:"raisin",
          basePrice:2.99,
          rollShowing: true,
          },
          {imageURL:"assets/products/walnut-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a black plate with a 2 prong fork",
          rollName:"Walnut cinnamon roll",
          rollId:"walnut",
          basePrice:3.49,
          rollShowing: true,
          },
          {imageURL:"assets/products/double-chocolate-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a piece of paper with a chocolate glaze and chopped nuts on top",
          rollName:"Double-chocolate cinnamon roll",
          rollId:"choc",
          basePrice:3.99,
          rollShowing: true,
          },
          {imageURL:"assets/products/strawberry-cinnamon-roll.jpg",
          imageAlt:"Multiple cinmamon rolls and straberries skewered by sticks",
          rollName:"Strawberry cinnamon roll",
          rollId:"strawberry",
          basePrice:3.99,
          rollShowing: true,
        }
      ],
      rollList : [],
      itemCount: 0, 
      itemTotal: 0,
      showCartPopUp: false,
      showCartArea: false,
      searchQuery: '',
      showingCount: 6,
    };
  }



  // Method to update the cart values
  updateCart = () => {

    // Loop over each roll and add the price to the total
    let totalCost = 0
    for (const roll of this.state.rollList){
      totalCost += roll.price
    }

    // Update the cart length and total cost
    this.setState(prevState => ({
      ...prevState,
      itemCount: this.state.rollList.length, 
      itemTotal: totalCost
    }))
  }

  // Method to show the cart popup for 3 seconds
  cartPopUp = () => { 
      this.setState(prevState => ({
        ...prevState,
        showCartPopUp: true}))
      
      // Hide the popup after 3 seconds
      setTimeout( () => {
        this.setState(prevState => ({
          ...prevState,
          showCartPopUp: false
        }));
      }, 3000);
  }
  
  // Add roll associated with a buy button to rollList and update the cart
  addToCart = (rollDetails) => {
    this.setState({rollList: [...this.state.rollList, rollDetails]}, () => {
      this.updateCart();
      this.cartPopUp();
    });
  };

  // Show/hide the cart menu
  toggleCart = () => {
    this.setState(prevState => ({
      ...prevState,
      showCartArea: !prevState.showCartArea
    }));  
  }

  // Delete a roll from the cart at a given index
  deleteRoll = (rollIndex) => {
    let rollList = [...this.state.rollList]
    rollList.splice(rollIndex, 1);
    this.setState({rollList: rollList}, () => {
      this.updateCart();
    });
  }

  // Sort the rolls based on a given string and update the state
  sortRolls = (sortBy) => {
    let rollData = [...this.state.rollData]
    switch(sortBy) {
      case "name":
        rollData.sort((roll1, roll2) => (roll1.rollName > roll2.rollName) ? 1 : (roll1.rollName < roll2.rollName) ? -1 : 0)
        break;
      case "base":
        rollData.sort((roll1, roll2) => (roll1.basePrice > roll2.basePrice) ? 1 : (roll1.basePrice < roll2.basePrice) ? -1 : 0)
        break;
      default:
        rollData.sort((roll1, roll2) => (roll1.rollName > roll2.rollName) ? 1 : (roll1.rollName < roll2.rollName) ? -1 : 0)
    }
    this.setState(prevState => ({
      ...prevState,
      rollData: rollData
    }));  
  }

  // Capture the current search value
  updateSearchQuery = (e) => {
    this.setState(prevState => ({
      ...prevState,
      searchQuery: e.target.value
    }));  
  }

  // Search through the rolls, and hide any that don't match the searchQuery
  searchRolls = () => {
    let rollData = [...this.state.rollData]
    let showingCount = 0
    for (let i=0; i<rollData.length; i++){
      let lowerQuery = this.state.searchQuery.toLowerCase();
      let lowerRollName = rollData[i].rollName.toLowerCase();
      rollData[i].rollShowing = lowerRollName.includes(lowerQuery)
      if (rollData[i].rollShowing) showingCount++;
    }
    
    this.setState(prevState => ({
      ...prevState,
      rollData: rollData,
      showingCount: showingCount
    }));  
  }

  // Render the Homepage here, using the imported Navbar, Roll, Cart, and Search elements
  render() {
    return (
      <div>
        <NavBar 
          cartUpdated = {this.state.showCartPopUp}
          recentRoll = {this.state.rollList[this.state.rollList.length-1]}
          toggleCart={this.toggleCart}
        />
        {this.state.showCartArea && 
          <Cart 
            rollList ={this.state.rollList}
            itemTotal = {this.state.itemTotal}
            deleteRoll = {this.deleteRoll}
          />
        }
        <Search 
          sortRolls={this.sortRolls}
          updateSearchQuery={this.updateSearchQuery}
          searchRolls={this.searchRolls}/>
        <main>
        {(!this.state.showingCount) && <span className="largest-font bold">No match!</span>}
        {this.state.rollData.map((roll, idx) => {
            return <RollCard
              key={roll.rollName}
              rollIndex={idx}
              imageURL={roll.imageURL}
              imageAlt={roll.imageAlt}
              rollName={roll.rollName}
              rollId={roll.rollId}
              basePrice={roll.basePrice}
              clickBuy={this.addToCart}
              rollShowing={roll.rollShowing}
              />;
          })}
        </main>
      </div>
    );
  }
}

export default Homepage