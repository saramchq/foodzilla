// Submit order
function submitOrder() {
    const client = document.getElementById('clientName').value.trim();
    const menuOption = document.getElementById('selectedMenu').value;
    const dessertOption = document.getElementById('selectedDessert').value;
    const extrasYes = document.getElementById('extrasYes').checked;
    const hasExtras = extrasYes ? 'Yes' : 'No';

    // Basic validation
    if (!client || !menus[menuOption]) {
        alert('Please enter your name and select a menu.');
        return;
    }

    const selectedMenu = menus[menuOption].title;
    const selectedDessert = desserts[dessertOption]?.title || 'None';

    let extras = [];
    if (hasExtras === 'Yes') {
        if (document.getElementById('extraCheese').checked) extras.push('Cheese');
        if (document.getElementById('extraBacon').checked) extras.push('Bacon');
        if (document.getElementById('extraSauce').checked) extras.push('Extra Sauce');
    }

    const fullProduct = `${selectedMenu} + ${selectedDessert}`;
    const totalPrice = 10 + (hasExtras === 'Yes' ? extras.length * 1 : 0); // Example price calculation

    const order = {
        id: Date.now(),
        client,
        product: fullProduct,
        extras: extras.join(', ') || 'None',
        price: totalPrice.toFixed(2),
        hasExtras
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    renderOrderTable('all');
    resetForm();
}

// Clear form after submitting
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
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';

    let filtered = orders;

    if (filter === 'withExtras') {
        filtered = orders.filter(order => order.hasExtras === 'Yes');
    } else if (filter === 'withoutExtras') {
        filtered = orders.filter(order => order.hasExtras === 'No');
    }

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No orders found</td></tr>';
        return;
    }

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

// Remove an order from the active table
function deleteOrder(id) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => Number(order.id) !== Number(id));
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrderTable('all');
}

// Finalize and show receipt like a McDonald's screen
function clearAllOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        alert("No orders to finalize.");
        return;
    }

    // Gerar tabela com os pedidos finalizados
    const receiptDiv = document.getElementById("receipt");
    const receiptContent = document.getElementById("receiptContent");

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

    // Guardar no histórico (se quiseres manter localStorage de finalOrders)
    const finalOrders = JSON.parse(localStorage.getItem("finalOrders")) || [];
    localStorage.setItem("finalOrders", JSON.stringify(finalOrders.concat(orders)));

    // Limpar os pedidos ativos
    localStorage.removeItem("orders");
    renderOrderTable("all");
}


// Show everything when the page loads
window.onload = () => {
    renderOrderTable('all');
};
