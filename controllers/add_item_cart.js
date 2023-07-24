document.querySelector('.boton_agregar_producto_carrito').addEventListener('click', function () {
    const idSaco = this.getAttribute('data-id');
    const tamanoSaco = document.querySelector('.select_talla_producto').value;
  
    // Realizar la solicitud fetch al archivo PHP enviando el id_saco y el tamanoSaco en los datos GET
    fetch(`./models/add_item_cart.php?id_saco=${idSaco}&tamano_saco=${tamanoSaco}`)
      .then(response => response.json())
      .then(data => {
        if (data.existeEnCarrito) {
          alert('El producto ya está en el carrito.');
        } else {
          alert('Producto agregado al carrito exitosamente.');
          location.reload();
        }
      })
      .catch(error => {
        console.log('Error al realizar la consulta:', error);
      });
  });
  