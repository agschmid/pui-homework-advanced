import React, { Component } from 'react';
import './index.css';

import RollCard from '../elements/roll';
import NavBar from '../elements/navbar';
import Cart from '../elements/cart';
import Search from '../elements/search';


// Homepage class is the whole homepage
class Homepage extends Component {
  // Using state for roll information so I can use map to populate with components
  // Holding the cart information in state so I can update the cart component
  constructor(props) {
    super(props);
    this.state = {
      rollData: [
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL: "assets/products/original-cinnamon-roll.jpg",
          imageAlt: "A frosted cinnamon roll on a plate with cinnamon sticks",
          rollName: "Original cinnamon roll",
          rollId: "og",
          basePrice: 2.49,
          displayPrice: 2.49,
          rollShowing: true,
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/apple-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a plate next to a fork",
          rollName:"Apple cinnamon roll",
          rollId:"apple",
          basePrice: 3.49,
          displayPrice: 3.49,
          rollShowing: true,
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/raisin-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll with raisins protruding",
          rollName:"Raisin cinnamon roll",
          rollId:"raisin",
          basePrice:2.99,
          displayPrice: 2.99,
          rollShowing: true,
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/walnut-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a black plate with a 2 prong fork",
          rollName:"Walnut cinnamon roll",
          rollId:"walnut",
          basePrice:3.49,
          displayPrice: 3.49,
          rollShowing: true,
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/double-chocolate-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a piece of paper with a chocolate glaze and chopped nuts on top",
          rollName:"Double-chocolate cinnamon roll",
          rollId:"choc",
          basePrice:3.99,
          displayPrice: 3.99,
          rollShowing: true,
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/strawberry-cinnamon-roll.jpg",
          imageAlt:"Multiple cinmamon rolls and straberries skewered by sticks",
          rollName:"Strawberry cinnamon roll",
          rollId:"strawberry",
          basePrice:3.99,
          displayPrice: 3.99,
          rollShowing: true,
        }
      ],
      rollList : [],
      itemCount: 0, 
      itemTotal: 0,
      showCartPopUp: false,
      showCartArea: false
    };
  }



  // Method to update the cart values and show the popup for 3 secs
  updateCart = () => {

    // Loop over each roll and add the price to the total
    let totalCost = 0
    for (const roll of this.state.rollList){
      totalCost += roll.price
    }
    // Update the cart displayed on the webpage, and show the popup
    this.setState(prevState => ({
      ...prevState,
      itemCount: this.state.rollList.length, 
      itemTotal: totalCost
    }))

  }

   // Show the cart popup
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
  
  // Add roll associated with a buy button to rollList, and update cart when done
  // This method is passed across components – it's triggered by RollCard
  addToCart = (rollDetails) => {
    this.setState({rollList: [...this.state.rollList, rollDetails]}, () => {
      this.updateCart();
      this.cartPopUp();
    });
  };

  toggleCart = () => {
    this.setState(prevState => ({
      ...prevState,
      showCartArea: !prevState.showCartArea
    }));  
  }

  updateRollData = (rollIndex, rollInfo) => {
    let rollData = [...this.state.rollData];
    rollData[rollIndex].selectedPack = rollInfo.selectedPack;
    rollData[rollIndex].selectedGlazing = rollInfo.selectedGlazing;
    rollData[rollIndex].displayPrice = (rollData[rollIndex].basePrice + rollInfo.glazingPrice) * rollInfo.packPrice;

    this.setState(prevState => ({
      ...prevState,
      rollData: rollData
    }));    
  }

  deleteRoll = (rollIndex) => {
    let rollList = [...this.state.rollList]
    rollList.splice(rollIndex, 1);
    this.setState({rollList: rollList}, () => {
      this.updateCart();
    });
  }

  // TODO: Fix this and be consistent between e and event
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
        //Should leave as is if default. TODO: Check if I should adjust this.
    }
    this.setState(prevState => ({
      ...prevState,
      rollData: rollData
    }));  
  }


  // Render the Homepage here, using the imported Navbar and Roll elements
  render() {
    return (
      <div>
        <NavBar 
          itemCount = {this.state.itemCount}
          itemTotal = {this.state.itemTotal}
          cartUpdated = {this.state.showCartPopUp}
          recentRoll = {this.state.rollList[this.state.rollList.length-1]}
          toggleCart={this.toggleCart}
        />
        <Search sortRolls={this.sortRolls}/>
        {this.state.showCartArea && 
          <Cart 
            rollList ={this.state.rollList}
            itemTotal = {this.state.itemTotal}
            deleteRoll = {this.deleteRoll}
          />
        }
        <main>
        {this.state.rollData.map((roll, idx) => {
            return <RollCard
              key={idx}
              rollIndex={idx}
              imageURL={roll.imageURL}
              imageAlt={roll.imageAlt}
              rollName={roll.rollName}
              rollId={roll.rollId}
              basePrice={roll.basePrice}
              displayPrice={roll.displayPrice}
              selectedGlazing={roll.selectedGlazing}
              selectedPack={roll.selectedPack}
              clickBuy={this.addToCart}
              updateRollData={this.updateRollData}
              />;
          })}
        </main>
      </div>
    );
  }
}

export default Homepage