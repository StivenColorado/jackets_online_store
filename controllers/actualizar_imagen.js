const enviarBoton = document.querySelector('.boton-subir');

enviarBoton.addEventListener('click', function(event) {
  event.preventDefault();

  const archivoInput = document.getElementById('imagen');
  const archivo = archivoInput.files[0];

  const formData = new FormData();
  formData.append('imagen', archivo);

  fetch('./models/actualizar_imagen.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Aquí puedes manejar la respuesta del servidor
    if (data.completado === true) {
      location.reload();
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
