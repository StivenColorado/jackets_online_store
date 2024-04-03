const btn_close_session = document.getElementById('opciones_left_cerrar_sesion')
const btn_close_session2 = document.getElementById('btn_cerrar_sesion_')


const singOff = () => {
    Swal.fire({
        title: 'Success!',
        text: 'You have logged out. Do you want to log out?',
        icon: 'success',
        showCancelButton: true,
        showConfirmButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.showLoading();
            // Aquí puedes deshabilitar los botones manualmente
            Swal.getConfirmButton().setAttribute('disabled', '');
            Swal.getCancelButton().setAttribute('disabled', '');
            
            // Aquí puedes añadir la lógica para cerrar la sesión o cualquier otra acción
            fetch('./models/cerrar_sesion.php')
                .then(response => {
                    if (response.ok) {
                        localStorage.clear()
                        Swal.fire('Logged out', 'Session closed successfully', 'success');
                        location.href = "./views/iniciar_sesion.html";
                    } else {
                        Swal.fire('Error', 'Failed to close session', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire('Error', 'An error occurred', 'error');
                });
        }
    });
}

btn_close_session.addEventListener('click', () => singOff())
btn_close_session2.addEventListener('click', () => singOff())
