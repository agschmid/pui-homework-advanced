import React, { Component } from 'react';
import './index.css';

import RollCard from '../elements/roll';
import NavBar from '../elements/navbar';

// Homepage class is the whole homepage
class Homepage extends Component {
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
          displayPrice: 2.49
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/apple-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a plate next to a fork",
          rollName:"Apple cinnamon roll",
          rollId:"apple",
          basePrice: 3.49,
          displayPrice: 3.49
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/raisin-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll with raisins protruding",
          rollName:"Raisin cinnamon roll",
          rollId:"raisin",
          basePrice:2.99,
          displayPrice: 2.99
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/walnut-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a black plate with a 2 prong fork",
          rollName:"Walnut cinnamon roll",
          rollId:"walnut",
          basePrice:3.49,
          displayPrice: 3.49
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/double-chocolate-cinnamon-roll.jpg",
          imageAlt:"A cinnamon roll on a piece of paper with a chocolate glaze and chopped nuts on top",
          rollName:"Double-chocolate cinnamon roll",
          rollId:"choc",
          basePrice:3.99,
          displayPrice: 3.99
          },
          {selectedGlazing: "Keep original",
          selectedPack: "1",
          imageURL:"assets/products/strawberry-cinnamon-roll.jpg",
          imageAlt:"Multiple cinmamon rolls and straberries skewered by sticks",
          rollName:"Strawberry cinnamon roll",
          rollId:"strawberry",
          basePrice:3.99,
          displayPrice: 3.99
        }
      ],
      rollList : []
    };
  }

  // Method to add the roll associated with a buy button
  // This method is passed across components – it's triggered by RollCard
  addToCart = (rollDetails) => {
    this.setState({rollList: [...this.state.rollList, rollDetails]}, () => {
      console.log(this.state.rollList)
    });
  };

  // Render the Homepage here, using the imported Navbar and Roll elements
  render() {
    return (
      <div>
        <NavBar />
        <main>
        {this.state.rollData.map((roll, idx) => {
            return <RollCard
              key={idx}
              noteIndex={idx}
              imageURL={roll.imageURL}
              imageAlt={roll.imageAlt}
              rollName={roll.rollName}
              rollId={roll.rollId}
              basePrice={roll.basePrice}
              displayPrice={roll.displayPrice}
              selectedGlazing={roll.selectedGlazing}
              selectedPack={roll.selectedPack}
              clickBuy={this.addToCart}
              />;
          })}
        </main>
      </div>
    );
  }
}

export default Homepage