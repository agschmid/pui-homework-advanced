import React, { Component } from 'react';
import './index.css';

import RollCard from '../elements/roll';
import NavBar from '../elements/navbar';

// Homepage class is the whole homepage
// NOTE: I'm holding the variable roll data in state, but am not updating the state in this assignment
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollData: {
        og: {
          selectedGlazing: "Keep original",
          selectedPack: "1"
        },
        apple: {
          selectedGlazing: "Keep original",
          selectedPack: "1"
        },
        raisin: {
          selectedGlazing: "Keep original",
          selectedPack: "1"
        },
        walnut: {
          selectedGlazing: "Keep original",
          selectedPack: "1"
        },
        choc: {
          selectedGlazing: "Keep original",
          selectedPack: "1"
        },
        strawberry: {
          selectedGlazing: "Keep original",
          selectedPack: "1"
        }
      }
    };
  }

  // Render the Homepage here, using the imported Navbar and Roll elements
  // Each roll element is built using the props defined here
  render() {
    return (
      <div>
        <NavBar />
        <main>
          <RollCard
            imageURL="assets/products/original-cinnamon-roll.jpg"
            imageAlt="A frosted cinnamon roll on a plate with cinnamon sticks"
            rollName="Original cinnamon roll"
            rollId="og"
            basePrice={2.49}
            selectedGlazing={this.state.rollData.og.selectedGlazing}
            selectedPack={this.state.rollData.og.selectedPack} />
          <RollCard
            imageURL="assets/products/apple-cinnamon-roll.jpg"
            imageAlt="A cinnamon roll on a plate next to a fork"
            rollName="Apple cinnamon roll"
            rollId="apple"
            basePrice={3.49}
            selectedGlazing={this.state.rollData.apple.selectedGlazing}
            selectedPack={this.state.rollData.apple.selectedPack} />
          <RollCard
            imageURL="assets/products/raisin-cinnamon-roll.jpg"
            imageAlt="A cinnamon roll with raisins protruding"
            rollName="Raisin cinnamon roll"
            rollId="raisin"
            basePrice={2.99}
            selectedGlazing={this.state.rollData.raisin.selectedGlazing}
            selectedPack={this.state.rollData.raisin.selectedPack} />
          <RollCard
            imageURL="assets/products/walnut-cinnamon-roll.jpg"
            imageAlt="A cinnamon roll on a black plate with a 2 prong fork"
            rollName="Walnut cinnamon roll"
            rollId="walnut"
            basePrice={3.49}
            selectedGlazing={this.state.rollData.walnut.selectedGlazing}
            selectedPack={this.state.rollData.walnut.selectedPack} />
          <RollCard
            imageURL="assets/products/double-chocolate-cinnamon-roll.jpg"
            imageAlt="A cinnamon roll on a piece of paper with a chocolate glaze and chopped nuts on top"
            rollName="Double-chocolate cinnamon roll"
            rollId="choc"
            basePrice={3.99}
            selectedGlazing={this.state.rollData.choc.selectedGlazing}
            selectedPack={this.state.rollData.choc.selectedPack} />
          <RollCard
            imageURL="assets/products/strawberry-cinnamon-roll.jpg"
            imageAlt="Multiple cinmamon rolls and straberries skewered by sticks"
            rollName="Strawberry cinnamon roll"
            rollId="strawberry"
            basePrice={3.99}
            selectedGlazing={this.state.rollData.strawberry.selectedGlazing}
            selectedPack={this.state.rollData.strawberry.selectedPack} />
        </main>
      </div>
    );
  }
}

export default Homepage