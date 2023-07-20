document.querySelector('.formulario_agregar_producto').addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los datos del formulario
  const nombreSaco = document.getElementById('nombre_saco').value;
  const descripcionSaco = document.getElementById('descripcion_saco').value;
  const precioSaco = document.getElementById('precio_saco').value;
  const cantidad = document.getElementById('cantidad').value;
  const imagenesInput = document.getElementById('imagenes');
  const imagen = imagenesInput.files[0]; // Obtener solo la primera imagen

  // Validar los datos del formulario
  if (nombreSaco.trim() === '') {
    alert('Por favor, ingresa un nombre de saco');
    return;
  }
  // Validar los demás campos si es necesario

  // Validar la cantidad de imágenes seleccionadas
  if (imagen == null) {
    alert('Por favor, selecciona una imagen');
    return;
  }

  // Crear objeto FormData para la imagen
  const formData = new FormData();
  formData.append('nombre_saco', nombreSaco);
  formData.append('descripcion_saco', descripcionSaco);
  formData.append('precio_saco', precioSaco);
  formData.append('cantidad', cantidad);
  formData.append('imagen', imagen);

  // Realizar la solicitud fetch al archivo PHP
  fetch('./models/registrar_producto.php', {
    method: "POST",
    body: formData
  })
    .then(response => {
      // Verificar si la respuesta es exitosa (código de estado 200)
      if (response.ok) {
        return response.json(); // Parsear la respuesta como JSON
      } else {
        throw new Error('Error en la solicitud');
      }
    })
    .then(data => {
      console.log('Imagen cargada:', data);
      location.href = "./index.html";
    })
    .catch(error => {
      console.log('Error al cargar la imagen:', error);
    });
});
