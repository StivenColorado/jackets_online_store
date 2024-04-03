// valida_sesion.js
function verificarSesion() {
  // Puedes ajustar la URL de acuerdo a tu configuración
  fetch('./models/validar_sesion.php')
    .then(respuesta => respuesta.json())
    .then(data => {
      if (data.sesion_activa) {
        // La sesión existe
        const container_button = document.querySelector('.container-button')
        const btn_cerrar = document.querySelector('#btn_cerrar_menu_configuraciones')

        let btn_profile = document.createElement('button')
        btn_profile.className = "profile"
        container_button.appendChild(btn_profile)
        btn_profile.dataset.id = data.sesion//se obtiene el identificador el archivo php
        btn_profile.addEventListener('click', () => {
          abrirMenu(btn_profile)
        })
        btn_cerrar.addEventListener('click', () => {
          cerrarMenu(btn_cerrar)
        })
      } else {
        // No hay sesión activa
        console.log('No hay sesión activa. Usuario no autenticado.');
        localStorage.clear()
        // Realiza las acciones necesarias para usuarios no autenticados
      }
    })
    .catch(error => {
      console.error('Error al verificar la sesión:', error);
    });
}
// Ejecuta la función de verificación de sesión cuando se cargue la página
window.addEventListener('load', verificarSesion);
