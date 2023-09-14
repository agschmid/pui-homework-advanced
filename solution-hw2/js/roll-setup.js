// Make an Adaption object that will be used for each adaption
function Adaption(name, value) {
    this.name = name;
    this.value = value;
}

// Make the list of adaption objects, as it says in the instructions
const glazeAdaption = [new Adaption ("Keep original", 0), 
                        new Adaption ("Sugar milk", 0), 
                        new Adaption ("Vanila milk", 0.5), 
                        new Adaption ("Double chocolate", 1.5) ]

const sizeAdaption = [new Adaption ("1", 1), 
                        new Adaption ("3", 3), 
                        new Adaption ("6", 5), 
                        new Adaption ("12", 10) ]

// Get the elements for the menus we need to populate
let rollWebElement = document.querySelectorAll('.item');

// Iterate over each roll item, and populate the menus with the information from the adaptions
for (i=0; i<rollWebElement.length; i++){

    // Get the elements
    let rollElement = rollWebElement[i];
    let glazeElement = rollElement.querySelector('select')
    let packElement = rollElement.querySelector('.pack-radio')
    let rollName = rollElement.id;

    // Add each adaption into the glaze select element
    for (let adaption of glazeAdaption) {
        addAdaptionToSelect(glazeElement, adaption)
    }

    // Add each adaption into the pack radio element
    for (let adaption of sizeAdaption) {
        addAdaptionToRadio(packElement, adaption, rollName)
    }
}

// Add the adaption into a select element with the correct formatting
function addAdaptionToSelect(selectElement, adaption){
    // Create the option
    let glazeOption = document.createElement("option");

    // Configure the option and the text to be added
    glazeOption.setAttribute('value', adaption.value);
    let glazeText = document.createTextNode(adaption.name);

    // Append each child
    glazeOption.appendChild(glazeText);
    selectElement.appendChild(glazeOption);
}

// Add the adaption into a radio element with the correct formatting
function addAdaptionToRadio(radioElement, adaption, rollName) {
    // Create the input
    let packRadio = document.createElement("input");

    // Configure the input
    packRadio.id = `${rollName}-pack${adaption.name}`
    packRadio.setAttribute('type', "radio");
    packRadio.setAttribute('name', rollName); 
    packRadio.setAttribute('value', adaption.value)

    // Default check the first box
    if (adaption.name == "1") packRadio.checked=true;

    // Configure the label
    let label = document.createElement("label")
    label.setAttribute('for', packRadio.id)
    let labelText =  document.createTextNode(adaption.name);

    // Append each child 
    label.appendChild(labelText);
    radioElement.appendChild(packRadio);
    radioElement.appendChild(label);
}