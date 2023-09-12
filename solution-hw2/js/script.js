// Creating a Roll class that can be reused for each purchase -> TODO may need to swap to an object or object constructor
class Roll {
    constructor(type, price, glazing, packSize) {
        this.type = type;
        this.glazing = glazing;
        this.packSize = packSize;
        this.price = price;
    }
}

// Construct objects for the six rolls, and an object of them so I can access with their ID's in the html - TO DO -> confirm this is what is wanted
let ogRoll = new Roll ("Original", 2.49, "Keep original", 1);
let appleRoll = new Roll ("Apple", 3.49, "Keep original", 1);
let raisinRoll = new Roll ("Raisin", 2.99, "Keep original", 1);
let walnutRoll = new Roll ("Walnut", 3.49, "Keep original", 1);
let chocRoll = new Roll ("Double chocolate", 3.99, "Keep original", 1);
let strawberryRoll = new Roll ("Strawberry", 3.99, "Keep original", 1);
const rollTable ={["original"]: ogRoll, ["apple"]: appleRoll, ["raisin"]: raisinRoll, ["walnut"]: walnutRoll, ["choc"]: chocRoll, ["strawberry"]: strawberryRoll}

// An empty list of rolls for the cart
let cartList = [];

// // Making an object for the glaze adaption, where the key is the glaze, and the pair is the price adaption
const glazeAdaption = {["Keep original"]: 0, ["Sugar milk"]: 0, ["Vanilla milk"]: 0.5, ["Double chocolate"]: 1.5};

// // Making an object for the size adaption, where the key is the quantity, and the pair is the price adaption
const sizeAdaption = {1: 1, 3: 3, 6: 5, 12: 10};

// Make the list of adaption objects, as it says in the instructions. TO DO: check what to do with this
const adaptions = [glazeAdaption, sizeAdaption]

// Get the elements for the menus we need to populate
let glazeElements = document.querySelectorAll('select.item-choice')

// TODO Is this what they want... this seems silly
// Loop over the glaze for each roll
// TODO Probably need to dynamically fill the packsize aswell?
for (i=0; i<glazeElements.length; i++) {
    // Loop over each adaption to update element -> TO DO I got this online, find the resource
    for (let glaze in adaptions[0]) {
        let glazeOption = document.createElement("option");
        glazeOption.setAttribute('value', adaptions[0][glaze]);
    
        let glazeText = document.createTextNode(glaze);
        glazeOption.appendChild(glazeText);

        glazeElements[i].appendChild(glazeOption);
    }
}

// Function to calculate the price of a given roll - not updating the price value as that is where I'm holding the base price TODO update base price usage if needbe
function calculatePrice(roll){
    const basePrice = roll.price;
    const glazingPrice = glazeAdaption[roll.glazing]; //TO DO Might need to change to the adaptions list
    const packPrice = sizeAdaption[roll.packSize]; //TO DO Might need to change to the adaptions list
    return ((basePrice + glazingPrice) * packPrice).toFixed(2);
}

// Function that updates page and roll value when glaze is changed.
function glazingChange(element) {
    // work out which roll we're on
    const rollParent = element.parentNode.parentNode.parentNode //TO DO WHYYYYYYYYYYY THIS IS TERRIBLE
    const roll = getRollFromId(rollParent.id)

    // update the roll's glazing
    roll.glazing = element.options[element.selectedIndex].text //From here https://stackoverflow.com/questions/14976495/get-selected-option-text-with-javascript

    // calculate new prices
    const newPrice = calculatePrice(roll);

    // find the price element and push the new price
    let priceElement = rollParent.querySelector(".price") 
    priceElement.innerText = "$ " + newPrice;
}

// Function that updates page and roll value when glaze is changed.
// TO DO Combine this with the glazingChange, as there's only one line difference
// TO DO Ask if I can combine them?
function packSizeChange(element) {
    // work out which roll we're on
    const rollParent = element.parentNode.parentNode.parentNode //TO DO WHYYYYYYYYYYY THIS IS TERRIBLE
    const roll = getRollFromId(rollParent.id)

    // update the roll's glazing
    roll.packSize = element.querySelector("input:checked").value;

    // calculate new prices
    const newPrice = calculatePrice(roll);

    // find the price element and push the new price
    let priceElement = rollParent.querySelector(".price") 
    priceElement.innerText = "$ " + newPrice;
}

// Make a deep clone of the roll, and at to the list "cartList" TO DO -> can I use this?
// TO DO -> need to improve on getRollFromId as method. Maybe can combine into a function, or pass as a variable?
function addToCart(element) {
    const rollParent = element.parentNode.parentNode.parentNode
    const roll = getRollFromId(rollParent.id)
    const rollClone = structuredClone(roll);
    cartList.push(rollClone)
    popUpCart(rollClone)
    updateCartDisplay();
}

// Function that returns a roll element from it's ID TO DO: may need to replace with something more reasonable
function getRollFromId(index){
    return rollTable[index]
}

// Function that shows the pop up visual with a supplied roll's information
function popUpCart(roll) {
    const popUpBox = document.querySelector(".cart-popup");
    const popUpList = document.querySelectorAll('.popup-list li');

    // Populate each element of the popup list with the cinnamon roll information
    popUpList[0].textContent = `${roll.type} cinnamon roll`
    popUpList[1].textContent = `${roll.glazing}`
    popUpList[2].textContent = `Pack of ${roll.packSize}`
    popUpList[3].textContent = `Price: \$${calculatePrice(roll)}`

    popUpBox.classList.toggle('fade-in');
    setTimeout(function() {popUpBox.classList.toggle('fade-in')}, 3000); //TO DO Check if this is allowed...
}

// Function that updates the price and quantity of the cart display
function updateCartDisplay() {
    const cartElements = document.querySelectorAll(".cart-elements li");

    // loop over each roll in the cartlist to determine the total price
    let totalCost = 0;
    for (const roll of cartList) {
        totalCost+=Number(calculatePrice(roll)); // TO DO -> Why is this a string originally?
    }
    // incase of floating point error
    totalCost = totalCost.toFixed(2); // TO DO -> is this an okay method to use?

    // update the displayed values
    cartElements[0].textContent = `${cartList.length} item`
    cartElements[1].textContent = `Total: \$ ${totalCost}`
}
