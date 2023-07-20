// Obtener el formulario de actualización de contraseña
const formularioActualizarContrasena = document.querySelector('.formulario_actualizar_contrasena');

// Manejar el evento de envío del formulario
formularioActualizarContrasena.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores del formulario
  const contrasenaActual = document.querySelector('input[name="contrasena_actual"]').value;
  const contrasenaNueva = document.querySelector('input[name="contrasena_nueva"]').value;
  const confirmarContrasenaNueva = document.querySelector('input[name="confirmar_contrasena_nueva"]').value;

  // Verificar que las contraseñas nuevas coincidan
  if (contrasenaNueva !== confirmarContrasenaNueva) {
    alert('Las contraseñas nuevas no coinciden. Por favor, inténtalo de nuevo.');
    return;
  }

  // Crear un objeto con los datos a enviar al servidor
  const datos = {
    contrasena_actual: contrasenaActual,
    contrasena_nueva: contrasenaNueva
  };

  // Realizar la solicitud al servidor
  fetch('./models/actualizar_contrasena.php', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
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
      console.log(data); // Acceder a los datos de respuesta del servidor
      alert(data.mensaje); // Mostrar el mensaje de respuesta en una alerta
      // Realizar cualquier otra acción necesaria después de actualizar la contraseña
    })
    .catch(error => {
      console.log('Error:', error);
    });
});

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
