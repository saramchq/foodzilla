//selected menu function
function showMenu() {
    const menuValue = document.getElementById("selectedMenu").value; // get the value (id) of the selected option from the dropdown
    const card = document.getElementById("menuInfo"); // get the card container where the image and text will be shown

    // check if the selected value exists in the "menus" object
    if (menus[menuValue]) {
        document.getElementById("menuTitle").textContent = menus[menuValue].title;
        document.getElementById("menuDescrip").textContent = menus[menuValue].description;
        document.getElementById("menuImg").src = menus[menuValue].image;
        card.classList.remove("d-none"); // show the card by removing the "d-none" class (which hides it)
    } else {
        card.classList.add("d-none"); // if no valid menu is selected, hide the card
    }
}

//selected dessert function
function showDessert() {
    const dessertValue = document.getElementById("selectedDessert").value;
    const card = document.getElementById("dessertInfo");

    if (desserts[dessertValue]) {
        document.getElementById("dessertTitle").textContent = desserts[dessertValue].title;
        document.getElementById("dessertDescrip").textContent = desserts[dessertValue].description;
        document.getElementById("dessertImg").src = desserts[dessertValue].image;
        card.classList.remove("d-none");
    } else {
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
