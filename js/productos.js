let carrito = {};
const phoneMafer = "51913793195";

// 1. Charger les produits depuis le JSON
fetch('data/productos.json')
    .then(response => response.json())
    .then(data => {
        window.productosData = data;
        renderProductos(data);
    });

function renderProductos(productos) {
    const container = document.getElementById('product-list');
    container.innerHTML = productos.map(p => `
        <div class="card">
            <img src="${p.imagen}" alt="${p.nombre}" onerror="this.src='https://placehold.co/400x300?text=Yogurt+Mafer'">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p><strong>S/ ${p.precio.toFixed(2)}</strong></p>
            <div class="qty-controls" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 15px;">
                <button onclick="updateQty(${p.id}, -1)" class="btn-qty">-</button>
                <span id="qty-${p.id}" style="font-weight: bold; width: 30px;">0</span>
                <button onclick="updateQty(${p.id}, 1)" class="btn-qty">+</button>
            </div>
        </div>
    `).join('');
}

function updateQty(id, change) {
    if (!carrito[id]) carrito[id] = 0;
    carrito[id] = Math.max(0, carrito[id] + change);
    document.getElementById(`qty-${id}`).innerText = carrito[id];
    actualizarResumen();
}

function actualizarResumen() {
    const detalle = document.getElementById('carrito-detalle');
    const form = document.getElementById('form-pedido');
    let total = 0;
    let itemsHtml = "";

    window.productosData.forEach(p => {
        if (carrito[p.id] > 0) {
            const subtotal = p.precio * carrito[p.id];
            total += subtotal;
            itemsHtml += `<p style="display:flex; justify-content:space-between;">
                <span>${carrito[p.id]}x ${p.nombre}</span>
                <span>S/ ${subtotal.toFixed(2)}</span>
            </p>`;
        }
    });

    if (total > 0) {
        detalle.innerHTML = itemsHtml + `<hr><h4 style="display:flex; justify-content:space-between;"><span>TOTAL:</span> <span>S/ ${total.toFixed(2)}</span></h4>`;
        form.style.display = 'block';
    } else {
        detalle.innerHTML = `<p style="text-align: center; color: #888;">No has seleccionado productos aún.</p>`;
        form.style.display = 'none';
    }
}

function enviarPedido() {
    const nombre = document.getElementById('nombre-cliente').value;
    const direccion = document.getElementById('direccion-cliente').value;

    if (!nombre || !direccion) {
        alert("Por favor, completa tu nombre y dirección para la entrega.");
        return;
    }

    let msg = `*NUEVO PEDIDO - LA LECHERÍA DE MAFER* 🥛\n\n`;
    msg += `*Cliente:* ${nombre}\n`;
    msg += `*Dirección:* ${direccion}\n`;
    msg += `--------------------------\n`;

    let total = 0;
    window.productosData.forEach(p => {
        if (carrito[p.id] > 0) {
            msg += `• ${carrito[p.id]}x ${p.nombre} (S/ ${p.precio * carrito[p.id]})\n`;
            total += p.precio * carrito[p.id];
        }
    });

    msg += `--------------------------\n`;
    msg += `*TOTAL A PAGAR: S/ ${total.toFixed(2)}*`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${phoneMafer}?text=${encoded}`, '_blank');
}