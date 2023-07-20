document.addEventListener('DOMContentLoaded', () => {
  // Obtener los elementos del DOM para agregar la información
  const panel_productos = document.querySelector('.panel');
  //console.log('cargar-productos')
  const mostrar_productos = (imagen, nombre, precio, id,descripcion) => {
    let producto = document.createElement('article');
    producto.className = 'producto';
    producto.setAttribute('data-id', id);
    producto.setAttribute('data', imagen);
    producto.setAttribute('data-parent',descripcion)

    let img_producto = document.createElement('img');
    img_producto.className = 'img_producto';
    img_producto.src = imagen; // Cambia './models/' según corresponda a tu estructura de archivos
    img_producto.alt = nombre;
    img_producto.setAttribute('data-id', id);
    img_producto.setAttribute('data-parent',descripcion)

    let texto_producto = document.createElement('div');
    texto_producto.className = 'texto-producto';

    let nombre_producto = document.createElement('h1');
    nombre_producto.className = 'nombre_producto';
    nombre_producto.textContent = nombre;

    let precio_producto = document.createElement('p');
    precio_producto.className = 'precio_producto';
    precio_producto.textContent = precio;

    texto_producto.appendChild(nombre_producto);
    texto_producto.appendChild(precio_producto);

    producto.appendChild(img_producto);
    producto.appendChild(texto_producto);
    panel_productos.appendChild(producto);
  };

  // Realizar la solicitud fetch al archivo PHP
  fetch('./models/cargar_productos_usuario.php')
    .then(response => {
      // Verificar si la respuesta es exitosa (código de estado 200)
      if (response.ok) {
        return response.json(); // Parsear la respuesta como JSON
      } else {
        throw new Error('Error en la solicitud');
      }
    })
    .then(data => {
      // Verificar si data es un array
      if (Array.isArray(data)) {
        data.forEach(producto => {
          const codigoSaco = producto.codigo_saco;
          const nombreSaco = producto.nombre_saco;
          const descripcionSaco = producto.descripcion_saco;
          const precioSaco = producto.precio_saco;
          const cantidad = producto.cantidad;
          const imagenes = producto.imagenes;
          mostrar_productos(producto.imagenes[0], producto.nombre_saco, producto.precio_saco, producto.codigo_saco,producto.descripcion_saco);
        });
      } else {
        // Aquí puedes utilizar los datos de data directamente si no es un array
        const codigoSaco = data.codigo_saco;
        const nombreSaco = data.nombre_saco;
        const descripcionSaco = data.descripcion_saco;
        const precioSaco = data.precio_saco;
        const cantidad = data.cantidad;
        const imagenes = data.imagenes;
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

})