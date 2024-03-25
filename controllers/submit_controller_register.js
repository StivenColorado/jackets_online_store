if (localStorage.getItem("user")) {
    window.location = '../index.html';
}
document.getElementById('register').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario
    // Información de registro
    const nombre = document.getElementById('input_nombre').value;
    const correo = document.getElementById('input_correo').value;
    const contrasena = document.getElementById('input_contrasena').value;
    // Validar el campo nombre
    if (nombre.trim() === '') {
        alert('Por favor, ingresa un nombre');
        return;
    }
    if (nombre.trim().length < 3) {
        alert('El nombre debe tener al menos 5 caracteres');
        return;
    }
    if (contrasena.trim() === '') {
        alert('Por favor, ingresa una contraseña');
        return;
    }

    if (!/[0-9]/.test(contrasena) || !/[A-Z]/.test(contrasena)) {
        alert('La contraseña debe contener al menos un número y una letra mayúscula');
        return;
    }

    const datos = {
        nombre: nombre,
        correo: correo,
        contrasena: contrasena
    };

    fetch('../models/registro.php', {
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
            location.href = "../views/iniciar_sesion.html"
        })
        .catch(error => {
            console.log('Error:', error);
        });
});
