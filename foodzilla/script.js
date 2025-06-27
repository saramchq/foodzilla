//selected menu function
function showMenu() {
    const menuValue = document.getElementById("selectedMenu").value; // get the value (id) of the selected option from the dropdown
    const card = document.getElementById("menuInfo"); // get the card container where the image and text will be shown
    const extrasSection = document.getElementById("extrasSection");

    // check if the selected value exists in the "menus" object
    if (menus[menuValue]) {
        document.getElementById("menuTitle").textContent = menus[menuValue].title;
        document.getElementById("menuDescrip").textContent = menus[menuValue].description;
        document.getElementById("menuImg").src = menus[menuValue].image;
        card.classList.remove("d-none"); // show the card by removing the "d-none" class (which hides it)
        extrasSection.classList.remove("d-none"); // show the extras radio
    } else {
        card.classList.add("d-none"); // if no valid menu is selected, hide the card
        extrasSection.classList.add("d-none");
    }
}
// Toggle visibility of the extras checkboxes
function toggleExtras(show) {
    const extrasList = document.getElementById("extrasList");  // Get the container element that holds the extra options (checkboxes)
    if (show) { // If "show" is true, remove the "d-none" class to make it visible
        extrasList.classList.remove("d-none");
    } 
    else {  // Otherwise, add the "d-none" class to hide it
        extrasList.classList.add("d-none");
    }
}

//selected dessert function
function showDessert() { // Function to display the selected dessert details
    const dessertValue = document.getElementById("selectedDessert").value;  // Get the selected value from the dessert dropdown
    const card = document.getElementById("dessertInfo"); // Get the card element that will display the dessert information
    if (desserts[dessertValue]) { // If the selected dessert exists in the "desserts" object
        document.getElementById("dessertTitle").textContent = desserts[dessertValue].title;  // Set the dessert title in the card
        document.getElementById("dessertDescrip").textContent = desserts[dessertValue].description; // Set the dessert description in the card
        document.getElementById("dessertImg").src = desserts[dessertValue].image; // Set the dessert image in the card
        card.classList.remove("d-none"); // Make the dessert card visible
    }
    else {// If no valid dessert is selected, hide the dessert card
        card.classList.add("d-none");
    }
}

//menu details
const menus = {
    1: {
        title: "Monster Meals",
        description: "Giant meals for giant cravings.",
        image: "#"
    },
    2: {
        title: "Tiny Bites",
        description: "Mini delights with maximum flavor.",
        image: "#"
    },
    3: {
        title: "Snack Attacks",
        description: "When hunger strikes between meals.",
        image: "#"
    },
    4: {
        title: "Guilty Pleasures",
        description: "Sinfully tasty and worth every bite.",
        image: "#"
    },
    5: {
        title: "Crave Crushers",
        description: "Cravings? Crushed.",
        image: "#"
    }
};

//dessert details
const desserts = {
    1: {
        title: "Sweetzilla",
        description: "A monstrous delight of chocolate and cream.",
        image: "#"
    },
    2: {
        title: "Sugar Rush",
        description: "A sugar-packed combo to boost your energy.",
        image: "#"
    },
    3: {
        title: "Cravings Corner",
        description: "Satisfy your sweet tooth with our house specials.",
        image: "#"
    }
};

