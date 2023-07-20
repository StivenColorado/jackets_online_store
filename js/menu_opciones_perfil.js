const abrirMenu = (btn) => {
    const menu = document.querySelector('#menu_configuraciones'); // Utiliza el selector de ID (#) para seleccionar el elemento con el ID "menu_configuraciones"
    const icon_no_image = document.querySelector('.sin_imagen')
    if (icon_no_image) {
        icon_no_image.style.animation = "rotate_no_image .3s alternate ease-in backwards"
    }
    menu.style.width = "25%";
    menu.style.right = "0%";
}
const cerrarMenu = (btn) => {
    const menu = document.querySelector('#menu_configuraciones'); // Utiliza el selector de ID (#) para seleccionar el elemento con el ID "menu_configuraciones"
    const icon_no_image = document.querySelector('.sin_imagen')
    menu.style.width = "25%";
    menu.style.right = "-100%";
    if (icon_no_image) {
        icon_no_image.style.animation = ""
    }
}

//esta funcion es para cuando se presione en configurar perfil
const mostrarPerfil = () => {
    const model_perfil = document.querySelector('.model_editar_perfil')
    model_perfil.style.animation = "show_modal_config .5s alternate ease-in forwards";
}

//estas constantes son las que ejecutan las funciones de abrir el modal
const btn_edit_profile = document.querySelector('.icon_edit')
const text_edit_profile = document.querySelector('.texto_editar_perfil')
const btn_close_edit_profile = document.querySelector('.close_formulario_editar_perfil')

//se crea esta funcion ya que el codigo se repite en varias ocasiones
const open_modal_close_menu = () => {
    const menu = document.querySelector('#menu_configuraciones'); // Utiliza el selector de ID (#) para seleccionar el elemento con el ID "menu_configuraciones"
    const icon_no_image = document.querySelector('.sin_imagen')
    menu.style.width = "25%";
    menu.style.right = "-100%";
    if (icon_no_image) {
        icon_no_image.style.animation = ""
    }
    //se muestra el modal
    mostrarPerfil()
}

text_edit_profile.addEventListener('click', () => {
    //se cierra el menu y se abre el modal
    open_modal_close_menu()
})

btn_edit_profile.addEventListener('click', () => {
    //se cierra el menu y se abre el modal
    open_modal_close_menu()
})
btn_close_edit_profile.addEventListener('click', () => {
    const model_perfil = document.querySelector('.model_editar_perfil')
    model_perfil.style.animation = "hidden_modal_config .3s alternate ease-in forwards";
})


// Obtener todos los elementos de la lista
const opciones = document.querySelectorAll('.menu_left_opciones li');

// Función para cambiar la clase al hacer clic en un elemento
function cambiarClase(event) {
  // Eliminar la clase 'opcion_activa' de todos los elementos
  opciones.forEach(opcion => {
    opcion.classList.remove('opcion_activa');
  });

  // Agregar la clase 'opcion_activa' al elemento seleccionado
  event.target.classList.add('opcion_activa');
}

// Asignar el evento 'click' a cada elemento de la lista
opciones.forEach(opcion => {
  opcion.addEventListener('click', cambiarClase);
});

// Agregar la clase 'opcion_activa' al primer elemento al iniciar
opciones[0].classList.add('opcion_activa');



//este codigo cambia los formularios
const opcionPerfil = document.getElementById('opcion_perfil');
const opcionContrasena = document.getElementById('opcion_contrasena');
const formularioPerfil = document.querySelector('.formulario_editar_perfil');
const formularioContrasena = document.querySelector('.formulario_actualizar_contrasena');

opcionPerfil.addEventListener('click', function () {
  formularioPerfil.style.display = 'block';
  formularioContrasena.style.display = 'none';
});

opcionContrasena.addEventListener('click', function () {
  formularioPerfil.style.display = 'none';
  formularioContrasena.style.display = 'block';
});

