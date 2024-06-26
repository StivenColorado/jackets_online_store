let text_price = document.querySelector('.total_carrito > p');
const text_cart = document.querySelector('.header_modal_carrito > h1');
const trolleyElement = document.querySelector('.trolley');

function cargarProductosCarrito() {
  fetch('./models/cargar_carrito_compras.php', {
    method: 'GET',
    credentials: 'include' // Incluir las cookies de sesión en la solicitud
  })
    .then(response => response.json())
    .then(data => {
      // Vaciando la tabla antes de agregar los nuevos productos
      const tbody = document.querySelector('.contenedor_productos_carritos tbody');
      tbody.innerHTML = '';
      let total = 0;
      let items = 0;

      if (data.length === 0) {
        // Si el carrito está vacío, muestra una alerta
        text_cart.textContent = 'El carrito está vacío.';
        trolleyElement.setAttribute('data-count', '0');
      } else {
        text_cart.textContent = 'Carrito de compras';
        // Recorriendo los productos y agregándolos a la tabla
        data.forEach(producto => {
          // Crear la fila de la tabla con los datos del producto
          const filaHTML = `
            <tr>
              <td>
                <img class="imagen_producto_carrito" src="${producto.ruta_imagen}" alt="${producto.nombre}">
              </td>
              <td>${producto.nombre}</td>
              <td class="precio_seccion_producto" data-precio="${producto.precio}">$${formatNumberWithDots(producto.precio)}</td>
              <td>
                <input type="number" name="cantidad[]" value="${producto.cantidad - producto.cantidad + 1}" min="1" max="${producto.cantidad}" class="input_cantidad_productos">
              </td>
              <td>${producto.tamano}</td>
              <td class="campo_eliminar">
                <button data-id="${producto.id_saco}" class="eliminar_producto_carrito"></button>
              </td>
            </tr>
          `;
          total += producto.precio;
          text_price.textContent = '$ ' + formatNumberWithDots(total);
          items++;
          trolleyElement.setAttribute('data-count', String(items));

          // Agregar la fila a la tabla
          tbody.insertAdjacentHTML('beforeend', filaHTML);
        });

        // Agregar el evento onchange a los elementos de entrada (input) con la clase 'input_cantidad_productos'
        const inputCantidadProductos = document.querySelectorAll('.input_cantidad_productos');
        inputCantidadProductos.forEach(input => {
          input.addEventListener('change', recalcularTotal);
        });
      }
    })
    .catch(error => {
      console.log('Error al cargar los productos del carrito:', error);
    });
}

// Función para formatear el número con puntos cada tres dígitos
function formatNumberWithDots(number) {
  return number.toLocaleString();
}

function recalcularTotal() {
  const inputCantidadProductos = document.querySelectorAll('.input_cantidad_productos');
  let total = 0;

  inputCantidadProductos.forEach(input => {
    const cantidad = parseInt(input.value);
    const precioElement = input.closest('tr').querySelector('.precio_seccion_producto');
    if (precioElement) {
      const precio = parseFloat(precioElement.getAttribute('data-precio'));
      total += cantidad * precio;
    }
  });

  text_price.textContent = '$ ' + formatNumberWithDots(total);
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductosCarrito();
});
