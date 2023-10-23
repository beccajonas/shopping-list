// Bringing in what we need for functionality
// Putting in global scope to access them for multiple functions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');


function addItem(e) {
    // Call preventDefault because we don't want form submitting to file
    e.preventDefault();

    const newItem = itemInput.value; // We're looking at the value of what's getting submitted 
    
    // Validate input
    if (newItem === '') { 
        alert('Please add an item');
        return; // Add return because we don't want anything else happening
    }
    
    // Create list item
    const li = document.createElement('li'); // create an list item
    li.appendChild(document.createTextNode(newItem)); // appending a text node of the value of itemInput

    const button = createButton('remove-item btn-link text-red'); // calling button with class that includes x icon
    
    li.appendChild(button); // adding the icon, with button child to the li

    itemList.appendChild(li); // adding the li to the itemList

    itemInput.value = '';
} 

function createButton(classes) { // new function for creating button using HTML classes
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark') // calling function below to join x icon to button
    button.appendChild(icon) // appending the icon into the button
    return button; 
}

function createIcon(classes) { // new function for adding x icon using HTML classes
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
update