// Submit order
function submitOrder() { // function for the "Take a bite!" button
    const client = document.getElementById('clientName').value.trim(); // gets the client's name from the input and removes spaces using trim
    const menuOption = document.getElementById('selectedMenu').value; // stores the selected menu value
    const dessertOption = document.getElementById('selectedDessert').value; // stores the selected dessert value
    const extrasYes = document.getElementById('extrasYes').checked; // checks and stores the selected "extras" option (yes or no)
    const hasExtras = extrasYes ? 'Yes' : 'No';

    // Basic validation
    if (!client || !menus[menuOption]) {
        alert('Please enter your name and select a menu.');
        return; // if the client didn't write a name or didn't select a menu, the function stops here
    }

    // gets the name of the selected menu and dessert; if no dessert is selected, show "None"
    const selectedMenu = menus[menuOption].title;
    const selectedDessert = desserts[dessertOption]?.title || 'None';

    // checks if the user wants extras and adds them to an array
    let extras = [];
    if (hasExtras === 'Yes') {
        if (document.getElementById('extraCheese').checked) extras.push('Cheese');
        if (document.getElementById('extraBacon').checked) extras.push('Bacon');
        if (document.getElementById('extraSauce').checked) extras.push('Extra Sauce');
    }

    // creates a string with the products and calculates the total price (10€ + 1€ per extra)
    const fullProduct = `${selectedMenu} + ${selectedDessert}`;
    const totalPrice = 10 + (hasExtras === 'Yes' ? extras.length * 1 : 0); // Example price calculation

    // creates an object with the order data and generates a unique id based on time with Date.now
    const order = {
        id: Date.now(),
        client,
        product: fullProduct,
        extras: extras.join(', ') || 'None',
        price: totalPrice.toFixed(2),
        hasExtras
    };

    // fetches stored orders from localStorage, adds the new one, and saves it back
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    renderOrderTable('all'); // updates the orders table and resets the form
    resetForm();
}

// function that resets the form and hides fields
function resetForm() {
    document.getElementById('clientName').value = '';
    document.getElementById('selectedMenu').value = 'Choose your Victim';
    document.getElementById('selectedDessert').value = 'Choose your Dessertzilla';
    document.getElementById('extrasYes').checked = false;
    document.getElementById('extrasNo').checked = false;
    document.getElementById('extraCheese').checked = false;
    document.getElementById('extraBacon').checked = false;
    document.getElementById('extraSauce').checked = false;
    document.getElementById('menuInfo').classList.add('d-none');
    document.getElementById('dessertInfo').classList.add('d-none');
    document.getElementById('extrasSection').classList.add('d-none');
    document.getElementById('extrasList').classList.add('d-none');
}

// Display active orders
function renderOrderTable(filter) {
    const orders = JSON.parse(localStorage.getItem('orders')) || []; // fetches all current orders from localStorage
    const tbody = document.getElementById('ordersTableBody'); // fetches the table body and clears it to refresh
    tbody.innerHTML = '';

    // filters the orders
    let filtered = orders;

    if (filter === 'withExtras') {
        filtered = orders.filter(order => order.hasExtras === 'Yes');
    } else if (filter === 'withoutExtras') {
        filtered = orders.filter(order => order.hasExtras === 'No');
    }

    // if no results, shows a row indicating no orders found
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No orders found</td></tr>';
        return;
    }

    // for each order, create a <tr> element
    filtered.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.client}</td>
          <td>${order.product}</td>
          <td>${order.extras}</td>
          <td>${order.price}€</td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

// remove orders
function deleteOrder(id) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => Number(order.id) !== Number(id));
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrderTable('all');
}

// if no orders exist, show alert and stop
function clearAllOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        alert("No orders to finalize.");
        return;
    }

    // gets the space where the receipt will appear
    const receiptDiv = document.getElementById("receipt");
    const receiptContent = document.getElementById("receiptContent");

    // creates the HTML for the table with the order data
    let tableHTML = `
        <table class="table table-bordered table-striped align-middle">
            <thead class="table-success">
                <tr>
                    <th>Order ID</th>
                    <th>Client</th>
                    <th>Products</th>
                    <th>Extras</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.client}</td>
                        <td>${order.product}</td>
                        <td>${order.extras}</td>
                        <td>${order.price}€</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    receiptContent.innerHTML = tableHTML;
    receiptDiv.classList.remove("d-none");

    // stores the finalized orders in history
    const finalOrders = JSON.parse(localStorage.getItem("finalOrders")) || [];
    localStorage.setItem("finalOrders", JSON.stringify(finalOrders.concat(orders)));

    // clears the active orders
    localStorage.removeItem("orders");
    renderOrderTable("all");
}

// Show everything when the page loads
window.onload = () => {
    renderOrderTable('all');
};
