document.querySelector('.login').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario
    // Información de registro
    const correo = document.getElementById('input_correo').value;
    const contrasena = document.getElementById('input_contrasena').value;
    // Validar el campo nombre
    if (correo.trim() === '') {
        alert('Por favor, ingresa un correo');
        return;
    }
    if (contrasena.trim() === '') {
        alert('Por favor, ingresa una contraseña');
        return;
    }
    const datos = {
        correo: correo,
        contrasena: contrasena
    };

    fetch('../models/validar_inicio_sesion.php', {
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
            console.log(data.mensaje); // Acceder al mensaje de los datos de respuesta
            alert(data.mensaje); // Mostrar el mensaje en una alerta
            if(data.mensaje == "Contraseña correcta. Puedes proceder."){
                location.href = "../index.html"
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
});
