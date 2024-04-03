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
        Swal.fire('Error', 'Por favor, ingresa un nombre', 'error');
        return;
    }
    if (nombre.trim().length < 3) {
        Swal.fire('Error', 'El nombre debe tener al menos 5 caracteres', 'error');
        return;
    }
    if (contrasena.trim() === '') {
        Swal.fire('Error', 'Por favor, ingresa una contraseña', 'error');
        return;
    }
    if (!/[0-9]/.test(contrasena) || !/[A-Z]/.test(contrasena)) {
        Swal.fire('Error', 'La contraseña debe contener al menos un número y una letra mayúscula', 'error');
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
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .then(data => {
            console.log(data.mensaje);
            Swal.fire('Mensaje', data.mensaje, 'info');
            setTimeout(() => {
                location.href = "../views/iniciar_sesion.html";
            }, 200);
        })
        .catch(error => {
            console.log('Error:', error);
            Swal.fire('Error', 'Ha ocurrido un error', 'error');
        });
});