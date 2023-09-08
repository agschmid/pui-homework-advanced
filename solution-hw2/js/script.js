// Creating a Roll class that can be reused for each purchase -> may need to swap to an object or object constructor
class Roll {
    constructor(type, price, glazing, packSize, elementID) {
        this.type = type;
        this.glazing = glazing;
        this.packSize = packSize;
        this.price = price;
        this.element = document.querySelector(elementID);

        // this.updateElement();

        const packElement = this.element.querySelector('.pack-radio');
        packElement.onchange = this.updatePack.bind(this);

        const glazeElement = this.element.querySelector('select.item-choice');
        glazeElement.onchange = this.updateGlaze.bind(this);
    }

    updatePack(){
        const packElement = this.element.querySelector('input:checked');
        this.packSize = packElement.value;
        this.updatePrice();
    };

    updateGlaze(){
        const glazeElement = this.element.querySelector('select.item-choice');
        this.glazing = glazeElement.options[glazeElement.selectedIndex].text; // found from https://stackoverflow.com/questions/14976495/get-selected-option-text-with-javascript
        this.updatePrice();
    };

    updatePrice(){
        let priceElement = this.element.querySelector('.price');

        const newValue = (2.49 + glazeAdaption[this.glazing]) * sizeAdaption[this.packSize];
        this.price = newValue.toFixed(2);

        priceElement.innerText = "$ " + this.price;
    }
}


// Construct objects for the six rolls - CHECK IF THIS IS WHAT THEY WANT?
let ogRoll = new Roll ("Original", 2.49, "Original", 1, "#og-roll");
// let appleRoll = new Roll ("Apple", 3.49, "Original", 1);
// let raisinRoll = new Roll ("Raisin", 2.99, "Original", 1);
// let walnutRoll = new Roll ("Walnut", 3.49, "Original", 1);
// let chocRoll = new Roll ("Double chocolate", 3.99, "Original", 1);
// let strawberryRoll = new Roll ("Strawberry", 3.99, "Original", 1);

// function glazingChange(element){
//     // get value of selected glazing option
//     const priceChange = element.value;
//     ogRoll.glazing = element.value;
//     console.log(element.value)
//     console.log(glazeAdaption[ogRoll.glazing])
//     console.log(glazeAdaption[ogRoll.glazing])
// }


// // Making an object for the glaze adaption, where the key is the glaze, and the pair is the price adaption
// // TO DO: CHECK THESE TEXT VALUES
const glazeAdaption = {["Keep original"]: 0, ["Sugar milk"]: 0, ["Vanilla milk"]: 0.5, ["Double chocolate"]: 1.5};

// // TO DO: check if this violates any style guides
// // Making an object for the size adaption, where the key is the quantity, and the pair is the price adaption
const sizeAdaption = {1: 1, 3: 3, 6: 5, 12: 10};
