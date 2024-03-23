document.addEventListener('DOMContentLoaded', () => {
  // Obtener los elementos del DOM para agregar la información
  const panel_productos = document.querySelector('.panel');
  const formularioBusqueda = document.querySelector('.buscador');
  const inputBusqueda = document.querySelector('.input_product_name');
  const mensaje = document.querySelector('.message');

  const mostrar_productos = (imagen, nombre, precio, id, descripcion) => {
    let producto = document.createElement('article');
    producto.className = 'producto';
    producto.setAttribute('data-id', id);
    producto.setAttribute('data', imagen);
    producto.setAttribute('data-parent', descripcion);

    let img_producto = document.createElement('img');
    img_producto.className = 'img_producto';
    img_producto.src = imagen;
    img_producto.alt = nombre;
    img_producto.setAttribute('data-id', id);
    img_producto.setAttribute('data-parent', descripcion);

    let texto_producto = document.createElement('div');
    texto_producto.className = 'texto-producto';

    let nombre_producto = document.createElement('h1');
    nombre_producto.className = 'nombre_producto';
    nombre_producto.textContent = nombre;

    let precio_producto = document.createElement('p');
    precio_producto.className = 'precio_producto';
    precio_producto.textContent = '$ ' + formatNumberWithDots(precio);

    texto_producto.appendChild(nombre_producto);
    texto_producto.appendChild(precio_producto);

    producto.appendChild(img_producto);
    producto.appendChild(texto_producto);
    panel_productos.appendChild(producto);
  };

  // Realizar la solicitud fetch al archivo PHP
  fetch('./models/cargar_productos_usuario.php')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la solicitud');
      }
    })
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(producto => {
          mostrar_productos(producto.imagenes[0], producto.nombre_saco, producto.precio_saco, producto.codigo_saco, producto.descripcion_saco);
        });
      } else {
        mostrar_productos(data.imagenes[0], data.nombre_saco, data.precio_saco, data.codigo_saco, data.descripcion_saco);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

  // Agregar evento de escucha al campo de búsqueda (input en lugar de change)
  inputBusqueda.addEventListener('input', function (event) {
    const terminoBusqueda = inputBusqueda.value.trim().toLowerCase();

    // Ocultar todos los productos
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
      producto.style.display = 'none';
    });

    // Mostrar solo los productos que coinciden con el término de búsqueda
    const productosCoincidentes = document.querySelectorAll('.producto .nombre_producto');
    let hayCoincidencias = false;
    productosCoincidentes.forEach(producto => {
      const nombreProducto = producto.textContent.toLowerCase();
      if (nombreProducto.includes(terminoBusqueda) || terminoBusqueda === '') {
        producto.parentNode.parentNode.style.display = 'block';
        hayCoincidencias = true;
      }
    });

    // Mostrar mensaje si no hay coincidencias
    if (!hayCoincidencias) {
      mensaje.classList.remove('hidden');
      mensaje.classList.add('show');
      mensaje.textContent = 'No products were found matching your search.';
    } else {
      // Ocultar mensaje si hay coincidencias
      mensaje.classList.add('hidden');
      mensaje.classList.remove('show');
      mensaje.textContent = '';

    }
  });
});
