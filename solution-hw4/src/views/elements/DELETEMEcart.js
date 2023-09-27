// Create a Roll object
// NOTE: price is not basePrice, but the price depending on the glazing and packsize
function Roll(type, price, glazing, packSize, elementID) {
    this.type = type;
    this.glazing = glazing;
    this.packSize = packSize;
    this.price = price;
    this.elementID = elementID;
}

// Construct the six rolls using the Roll object
let ogRoll = new Roll ('Original', 2.49, 'Keep original', 1, 'original');
let appleRoll = new Roll ('Apple', 3.49, 'Keep original', 1, 'apple');
let raisinRoll = new Roll ('Raisin', 2.99, 'Keep original', 1, 'raisin');
let walnutRoll = new Roll ('Walnut', 3.49, 'Keep original', 1, 'walnut');
let chocRoll = new Roll ('Double chocolate', 3.99, 'Keep original', 1, 'choc');
let strawberryRoll = new Roll ('Strawberry', 3.99, 'Keep original', 1, 'strawberry');

// Create a dictionary for the rolls so it is easy to access each Roll with their id as the key
const rollTable ={'original': ogRoll, 
                'apple': appleRoll,
                'raisin': raisinRoll, 
                'walnut': walnutRoll, 
                'choc': chocRoll, 
                'strawberry': strawberryRoll,
};

// Create an object containing the base price for each roll with their id as the key
const rollBasePrice = {'original': 2.49, 
                        'apple': 3.49, 
                        'raisin': 2.99, 
                        'walnut': 3.49, 
                        'choc': 3.99, 
                        'strawberry': 3.99,
};

// Create an empty list of rolls for the cart
let cartList = [];

// Calculate the price of a given roll
function calculatePrice(basePrice, glazingPrice, packPrice){
    return ((basePrice + glazingPrice) * packPrice);
}


// TODO -> TRANSFER THIS OVER

// Update page and roll value when glaze is changed.
function glazingChange(element) {
    // Get elements from the html
    const rollElement = element.closest('.item');

    //Worked out how to get the selected option from here: 
    //https://stackoverflow.com/questions/14976495/get-selected-option-text-with-javascript
    let glazingElement = element.options[element.selectedIndex]; 

    let packElement = rollElement.querySelector('input:checked');

    // Get the relevant roll object
    let roll = rollTable[rollElement.id];

    // update the roll's glazing
    roll.glazing = glazingElement.text;

    // calculate the new price, passing values as numbers as some are strings
    const newPrice = calculatePrice(+rollBasePrice[rollElement.id], +glazingElement.value, +packElement.value); 

    // update the roll's price
    roll.price = newPrice;

    // find the price element and push the new price
    let priceElement = rollElement.querySelector('.price');
    priceElement.innerText = '$ ' + roll.price.toFixed(2);
}

// TODO -> TRANSFER THIS OVER

// Update page and roll value when pack size is changed. 
// NOTE: I would combine this with glazingChange(), but the instructions suggest they should be separate
function packSizeChange(element) {
    // Get elements from the html
    const rollElement = element.closest('.item');
    const glazingElementParent = rollElement.querySelector('select');
    let glazingElement = glazingElementParent.options[glazingElementParent.selectedIndex];
    
    let packElement = element.querySelector('input:checked');

    // Get the related roll object
    let roll = rollTable[rollElement.id];

    // update the roll's glazing
    // Modified the query selector from here: 
    // https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
    roll.packSize = element.querySelector('input:checked + label').textContent; 

    // calculate the new price
    const newPrice = calculatePrice(+rollBasePrice[rollElement.id], +glazingElement.value, +packElement.value);

    // update the roll's price
    roll.price = newPrice;

    // find the price element and push the new price
    let priceElement = rollElement.querySelector('.price');
    priceElement.innerText = '$ ' + roll.price.toFixed(2);
}

// TODO -> TRANSFER THIS
// Make a deep clone of the roll, and add to the list 'cartList'
// NOTE: Doing this as otherwise it makes a soft copy and menu changes affect the rolls in the cart
function addToCart(element) {
    const roll = rollTable[element.closest('.item').id];
    const rollClone = structuredClone(roll);
    cartList.push(rollClone);
    popUpCart(rollClone);
    updateCartDisplay();
}

// TODO -> TRANSFER THIS
// Shows the pop up cart visual with a supplied roll's information
function popUpCart(roll) {
    // Get pop-up elements from the html
    const popUpBox = document.querySelector('.cart-popup');
    const popUpList = document.querySelectorAll('.popup-list li');

    // Populate each element of the popup list with the cinnamon roll information
    popUpList[0].textContent = `${roll.type} cinnamon roll`;
    popUpList[1].textContent = `${roll.glazing}`;
    popUpList[2].textContent = `Pack of ${roll.packSize}`;
    popUpList[3].textContent = `Price: \$${roll.price.toFixed(2)}`;

    // Add the class that fades the box in, and then remove it after 3 seconds
    popUpBox.classList.add('fade-in');
    // Realised I needed to pass a function in the Timeout due to this post: 
    // https://stackoverflow.com/questions/20890943/why-is-javascripts-set-timeout-not-working
    setTimeout(function() {
        popUpBox.classList.remove('fade-in');
    }, 3000); 
}

// TODO -> TRANSFER THIS
// Update the price and quantity of the cart display
function updateCartDisplay() {
    const cartElements = document.querySelectorAll('.cart-elements li');

    // sum each roll in the cartlist to determine the total price
    let totalCost = 0;
    for (const roll of cartList) {
        totalCost+=roll.price;
    }

    // set the word item to be plural based on number of cart items
    let itemText = 'items';
    if (cartList.length == 1) itemText = 'item';

    // update the displayed price value and cart count
    cartElements[0].textContent = `${cartList.length} ${itemText}`;
    cartElements[1].textContent = `Total: \$${totalCost.toFixed(2)}`;
}
