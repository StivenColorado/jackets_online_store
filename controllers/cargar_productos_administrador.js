// Obtener los elementos del DOM para agregar la información
const contenedor_productos = document.querySelector('.panel_administrar_productos');

const crearSeccion = (imagen, nombre, precio, id) => {
  let seccion_producto = document.createElement('div');
  seccion_producto.className = 'seccion_producto';

  let imagen_seccion_producto = document.createElement('div');
  imagen_seccion_producto.className = 'imagen_seccion_producto';
  imagen_seccion_producto.style.backgroundImage = `url("${imagen}")`;

  let nombre_seccion_producto = document.createElement('div');
  nombre_seccion_producto.className = 'nombre_seccion_producto';
  nombre_seccion_producto.textContent = nombre;

  let precio_seccion_producto = document.createElement('div');
  precio_seccion_producto.className = 'precio_seccion_producto';

  let contenedor_botones_administrador = document.createElement('div');
  contenedor_botones_administrador.className = 'contenedor_botones_administrador';
  contenedor_botones_administrador.textContent = '$ ' +formatNumberWithDots(precio);

  let btn_admin = document.createElement('div');
  btn_admin.className = 'btn_admin';
  btn_admin.classList.add('editar');
  btn_admin.setAttribute('data-id', id);

  let btn_admin2 = document.createElement('div');
  btn_admin2.className = 'btn_admin';
  btn_admin2.classList.add('eliminar');
  btn_admin2.setAttribute('data-id', id);

  contenedor_botones_administrador.appendChild(btn_admin);
  contenedor_botones_administrador.appendChild(btn_admin2);

  seccion_producto.appendChild(imagen_seccion_producto);
  seccion_producto.appendChild(nombre_seccion_producto);
  seccion_producto.appendChild(precio_seccion_producto);
  seccion_producto.appendChild(contenedor_botones_administrador);

  contenedor_productos.appendChild(seccion_producto);
};

// Realizar la solicitud fetch al archivo PHP
fetch('./models/cargar_productos_administrador.php')
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
        const precioSaco = '$ ' +formatNumberWithDots(producto.precio_saco);
        const cantidad = producto.cantidad;
        const imagenes = producto.imagenes;
        crearSeccion(producto.imagenes[0], producto.nombre_saco, formatNumberWithDots(producto.precio_saco), producto.codigo_saco);
      });
    } else {
      // Aquí puedes utilizar los datos de data directamente si no es un array
      const codigoSaco = data.codigo_saco;
      const nombreSaco = data.nombre_saco;
      const descripcionSaco = data.descripcion_saco;
      const precioSaco = formatNumberWithDots(data.precio_saco);
      const cantidad = data.cantidad;
      const imagenes = data.imagenes;
    }
  })
  .catch(error => {
    console.log('Error:', error);
  });

  function formatNumberWithDots(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }