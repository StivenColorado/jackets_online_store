if (localStorage.getItem("user")) {
    window.location = '../index.html';
}

document.querySelector('.login').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario

    // Información de registro
    const correo = document.getElementById('input_correo').value;
    const contrasena = document.getElementById('input_contrasena').value;

    // Validar el campo nombre
    if (correo.trim() === '') {
        Swal.fire('Error', 'Por favor, ingresa un correo', 'error');
        return;
    }
    if (contrasena.trim() === '') {
        Swal.fire('Error', 'Por favor, ingresa una contraseña', 'error');
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
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud');
            }
        })
        .then(data => {
            // console.log(data.mensaje);
            console.log(data.usuario);
            localStorage.setItem("user", data.usuario);
            if (data.mensaje === "Contraseña correcta. Puedes proceder.") {
                Swal.fire('Mensaje', data.mensaje, 'success');
                setTimeout(() => {
                    location.href = "../index.html";
                }, 2000);
            } else {
                Swal.fire('Mensaje', data.mensaje, 'info');
            }
        })
        .catch(error => {
            console.log('Error:', error);
            Swal.fire('Error', 'Ha ocurrido un error', 'error');
        });
});