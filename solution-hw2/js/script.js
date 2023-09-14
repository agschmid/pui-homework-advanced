// Creating a Roll class that can be reused for each purchase – added element ID to the class too
function Roll(type, price, glazing, packSize, elementID) {
    this.type = type;
    this.glazing = glazing;
    this.packSize = packSize;
    this.price = price;
    this.elementID = elementID
}

// Construct objects for the six rolls
let ogRoll = new Roll ("Original", 2.49, "Keep original", 1, "original");
let appleRoll = new Roll ("Apple", 3.49, "Keep original", 1, "apple");
let raisinRoll = new Roll ("Raisin", 2.99, "Keep original", 1, "raisin");
let walnutRoll = new Roll ("Walnut", 3.49, "Keep original", 1, "walnut");
let chocRoll = new Roll ("Double chocolate", 3.99, "Keep original", 1, "choc");
let strawberryRoll = new Roll ("Strawberry", 3.99, "Keep original", 1, "strawberry");
const rollTable ={"original": ogRoll, "apple": appleRoll, "raisin": raisinRoll, "walnut": walnutRoll, "choc": chocRoll, "strawberry": strawberryRoll} 

// An empty list of rolls for the cart
let cartList = [];

// Making an object for the glaze adaption and size adaptions, where the key is the selection, and the pair is the price adaption
const glazeAdaption = {"Keep original": 0, "Sugar milk": 0, "Vanilla milk": 0.5, "Double chocolate": 1.5};
const sizeAdaption = {1: 1, 3: 3, 6: 5, 12: 10};

// Make the list of adaption objects, as it says in the instructions. TO DO: check what to do with this
const adaptions = [glazeAdaption, sizeAdaption]

// Get the elements for the menus we need to populate
let rollWebElement = document.querySelectorAll('.item');

// TO DO: edit this whole things cos it's a mess -> is there a clever way to do it with the adaptions?
// Maybe it's to have a list of each one... so something like [{name: "Keep original", adaption: "0"}, etc... would be nicer to iterate over I think!]
// Iterate over each roll item, and populate the menus with the information from the adaptions
for (i=0; i<rollWebElement.length; i++){
    let rollElement = rollWebElement[i];
    let rollName = rollElement.id;
    let glazeElement = rollElement.querySelector('select')
    let packElement = rollElement.querySelector('.pack-radio')

    for (let glaze in adaptions[0]) {
        let glazeOption = document.createElement("option");
        glazeOption.setAttribute('value', adaptions[0][glaze]);
    
        let glazeText = document.createTextNode(glaze);
        glazeOption.appendChild(glazeText);

        glazeElement.appendChild(glazeOption);
    }

    for (let pack in adaptions[1]) {
        let packRadio = document.createElement("input");
        const packRadioId = `${rollName}-pack${pack}`
        packRadio.id=packRadioId

        packRadio.setAttribute('type', "radio");
        packRadio.setAttribute('name', rollName); 
        packRadio.setAttribute('value', pack)

        if (pack == "1"){
            packRadio.checked=true;
        }

        let label = document.createElement("label")
        label.setAttribute('for', packRadioId)
        let labelText =  document.createTextNode(pack);
        label.appendChild(labelText);

        packElement.appendChild(packRadio);
        packElement.appendChild(label);
    }
}


// Function to calculate the price of a given roll - note I am not updating the price value as that is where I'm holding the base price
function calculatePrice(roll){
    const basePrice = roll.price;
    const glazingPrice = glazeAdaption[roll.glazing]; //TO DO Might need to change to the adaptions list
    const packPrice = sizeAdaption[roll.packSize]; //TO DO Might need to change to the adaptions list
    return ((basePrice + glazingPrice) * packPrice).toFixed(2);
}

// Function that updates page and roll value when glaze is changed.
function glazingChange(element) {
    // work out which roll we're on
    const rollElement = element.closest(".item")
    let roll = rollTable[rollElement.id] //TO DO Make this a function?

    // update the roll's glazing
    roll.glazing = element.options[element.selectedIndex].text //Modified from here: https://stackoverflow.com/questions/14976495/get-selected-option-text-with-javascript

    // calculate the new price
    const newPrice = calculatePrice(roll);

    // find the price element and push the new price
    let priceElement = rollElement.querySelector(".price") 
    priceElement.innerText = "$ " + newPrice;
}

// Function that updates page and roll value when glaze is changed.
function packSizeChange(element) {
    // work out which roll we're on
    const rollElement = element.closest(".item")
    let roll = rollTable[rollElement.id] //TO DO Make this a function?

    // update the roll's glazing
    roll.packSize = element.querySelector("input:checked").value;//Modified from here: https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value

    // calculate new prices
    const newPrice = calculatePrice(roll);

    // find the price element and push the new price
    let priceElement = rollElement.querySelector(".price") 

    console.log(priceElement)
    priceElement.innerText = "$ " + newPrice;
}

// Make a deep clone of the roll, and at to the list "cartList"
// Doing this as otherwise it makes a soft copy and menu changes affect the rolls in the cart
function addToCart(element) {
    const roll = rollTable[element.closest(".item").id] //TO DO Make this a function?
    const rollClone = structuredClone(roll);
    cartList.push(rollClone)
    popUpCart(rollClone)
    updateCartDisplay();
}


// Function that shows the pop up visual with a supplied roll's information
function popUpCart(roll) {
    const popUpBox = document.querySelector(".cart-popup");
    const popUpList = document.querySelectorAll('.popup-list li');

    // Populate each element of the popup list with the cinnamon roll information TO DO: is there a better way to do this?
    popUpList[0].textContent = `${roll.type} cinnamon roll`
    popUpList[1].textContent = `${roll.glazing}`
    popUpList[2].textContent = `Pack of ${roll.packSize}`
    popUpList[3].textContent = `Price: \$${calculatePrice(roll)}`

    // Add the class the fades the box in, and then remove it after 3 seconds
    popUpBox.classList.add('fade-in');
    setTimeout(function() {popUpBox.classList.remove('fade-in')}, 3000); // Realised I needed to pass a function due to this post: https://stackoverflow.com/questions/20890943/why-is-javascripts-set-timeout-not-working
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
    totalCost = totalCost.toFixed(2);

    // update the displayed values
    cartElements[0].textContent = `${cartList.length} item`
    cartElements[1].textContent = `Total: \$ ${totalCost}`
}
