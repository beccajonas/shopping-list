// Bringing in what we need for functionality
// Putting in global scope to access them for multiple functions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit(e) {
    // Call preventDefault because we don't want form submitting to file
    e.preventDefault();

    const newItem = itemInput.value; // We're looking at the value of what's getting submitted 
    
    // Validate input
    if (newItem === '') { 
        alert('Please add an item');
        return; // Add return because we don't want anything else happening
    }

    // Check for edit more
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')

        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove();
        isEditMode = false
    } else {
        if(checkIfItemExists(newItem)) {
            alert("That item already exists!")
            return;
        }
    }

    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
} 

function addItemToDOM(item) {
    const li = document.createElement('li'); // create an list item
    li.appendChild(document.createTextNode(item)); // appending a text node of the value of itemInput

    const button = createButton('remove-item btn-link text-red'); // calling button with class that includes x icon
    
    li.appendChild(button); // adding the icon, with button child to the li

    // Add li to the DOM
    itemList.appendChild(li); // adding the li to the itemList

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

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()
    
    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage; 

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = []; 
    } else { 
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains
        ('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        // Remove item from DOM
        item.remove();

        // Remove item from storage
        removeItemFromStorage(item.textContent);

    checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

function clearItems() { 
    while (itemList.firstChild) { // while loop that continues as long as there is a "first child" element within the itemList
        itemList.removeChild(itemList.firstChild); // itemList.firstChild is used to access the first child element of the itemList
    } 

    // Clear from localStorage
    localStorage.removeItem('items');
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
    itemInput.value = ''
    const items = itemList.querySelectorAll('li');
    if(items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block'; 
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = '#333'


    isEditMode = false
}



// Initialize app
function init() {
// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem); 
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI(); // Apply this to every function / scope needed throughout code
}

init();
