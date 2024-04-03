document.querySelector('.boton_agregar_producto_carrito').addEventListener('click', function () {
  const idSaco = this.getAttribute('data-id');
  const tamanoSaco = document.querySelector('.select_talla_producto').value;

  // const userData = JSON.parse(localStorage.getItem('user'));
  // console.log(userData);
  // return
  // Realizar la solicitud fetch al archivo PHP enviando el id_saco y el tamanoSaco en los datos GET
  fetch(`./models/add_item_cart.php?id_saco=${idSaco}&tamano_saco=${tamanoSaco}`)
    .then(response => response.json())
    .then(data => {
      if (data.existeEnCarrito) {
        Swal.fire('Advertencia', 'El producto ya está en el carrito.', 'warning');
      } else {
        Swal.fire('Éxito', 'Producto agregado al carrito exitosamente.', 'success');
        setTimeout(() => {
          location.reload();
        }, 2000); // Recargar la página después de 2 segundos
      }
    })
    .catch(error => {
      console.log('Error al realizar la consulta:', error);
      Swal.fire('Error', 'Error al realizar la consulta', 'error');
    });
});