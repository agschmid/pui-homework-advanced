import React from 'react';
import RollCard from '../cards/roll';

const Homepage = () => {
    return (
      <div>
          <div className="header-group">
            <img src="assets/logo/logo-01.svg" alt="A cinnamon bun drawing next to the text 'Bun bun bake shop'" width="400"/>
            <header>
              <nav>
                <a className="bold larger-font hover-hl">PRODUCTS</a>
                <a className="larger-font hover-hl">CART</a>
              </nav>
              <hr/>
              <span className="largest-font">Our hand-made cinnamon rolls</span>
            </header>
          </div>

        <main>
          <RollCard 
                imageURL="assets/products/original-cinnamon-roll.jpg" 
                imageAlt = "A frosted cinnamon roll on a plate with cinnamon sticks"
                rollName="Original cinnamon roll" 
                rollId="og" 
                basePrice = {2.49} /> 
          <RollCard 
                imageURL="assets/products/apple-cinnamon-roll.jpg" 
                imageAlt = "A cinnamon roll on a plate next to a fork"
                rollName="Apple cinnamon roll" 
                rollId="apple" 
                basePrice= {3.49} /> 
          <RollCard 
                imageURL="assets/products/raisin-cinnamon-roll.jpg" 
                imageAlt = "A cinnamon roll with raisins protruding"
                rollName="Raisin cinnamon roll" 
                rollId="raisin" 
                basePrice= {2.99} /> 
          <RollCard 
                imageURL="assets/products/walnut-cinnamon-roll.jpg" 
                imageAlt = "A cinnamon roll on a black plate with a 2 prong fork"
                rollName="Walnut cinnamon roll" 
                rollId="walnut" 
                basePrice= {3.49} /> 
          <RollCard 
                imageURL="assets/products/double-chocolate-cinnamon-roll.jpg" 
                imageAlt = "A cinnamon roll on a piece of paper with a chocolate glaze and chopped nuts on top"
                rollName="Double-chocolate cinnamon roll" 
                rollId="choc" 
                basePrice= {3.99} /> 
          <RollCard 
                imageURL="assets/products/strawberry-cinnamon-roll.jpg" 
                imageAlt = "Multiple cinmamon rolls and straberries skewered by sticks"
                rollName="Strawberry cinnamon roll" 
                rollId="strawberry" 
                basePrice= {3.99} /> 
        </main>
      </div>
    );
}

export default Homepage