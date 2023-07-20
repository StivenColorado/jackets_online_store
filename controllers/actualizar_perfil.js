document.querySelector('.btn_update_profile').addEventListener('click', function (event) {
    event.preventDefault();
  
    const nombreInput = document.querySelector('input[name="nombre_editar_perfil"]');
    const direccionInput = document.querySelector('input[name="direccion_editar_perfil"]');
  
    const formData = new FormData();
    formData.append('nombre', nombreInput.value);
    formData.append('direccion', direccionInput.value);
  
    fetch('./models/actualizar_perfil.php', {
      method: 'POST',
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
        console.log(data.mensaje); // Acceder al mensaje de los datos de respuesta
        alert(data.mensaje); // Mostrar el mensaje en una alerta
        if (data.completado === true) {
          location.reload();
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  });
  