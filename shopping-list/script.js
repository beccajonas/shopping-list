// Bringing in what we need for functionality
// Putting in global scope to access them for multiple functions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');



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

    // Add li to the DOM
    itemList.appendChild(li); // adding the li to the itemList

    checkUI();

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

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) { // Using event delegation to target the button via the parent element // using contains method
        if(confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove(); // Traversing the dom to be sure the LI is getting removed, not just the button
        checkUI();
        }
    }
}

function clearItems() { 
    while (itemList.firstChild) { // while loop that continues as long as there is a "first child" element within the itemList
        itemList.removeChild(itemList.firstChild); // itemList.firstChild is used to access the first child element of the itemList
    } 
    checkUI();
    // itemList.removeChild(itemList.firstChild) is removing the first child element from the itemList on each iteration of the loop.
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li'); // querySeletorAll gives us a node list - can use forEach method
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) { // indexOf method - if it doesn't match it = -1, so we add ! 
            item.style.display = 'flex'; // default to flex as seen in elements of DOM
        } else {
            item.style.display = 'none';
        }
    });
    
}

function checkUI() { // function to display the filter and clear all button if there's lis 
    const items = itemList.querySelectorAll('li');
    if(items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block'; 
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem); 
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);


checkUI(); // Apply this to every function / scope needed throughout code 
