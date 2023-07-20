//obtener elementos para manipular el DOM
const nombre_menu_perfil = document.querySelector("#contenedor_nombre_perfil")//nombre de menu de la derecha
const contenedor_imagen = document.querySelector(".contenedor_imagen_perfil")
const imagen_perfil = document.querySelector('.imagen_profile')
const btn_preload_imagen = document.querySelector('.contenedor-boton-subir input[type=file]') 
const nombre_modal_editar_perfil = document.querySelector('.texto_nombre_profile_modal')
const texto_rol = document.querySelector('.text_rol')
//elementos del formulario para actualizar informacion
const name_input = document.querySelector('input[name=nombre_editar_perfil]')
const email_input = document.querySelector('input[name=correo_editar_perfil]')
const direccion_input = document.querySelector('input[name=direccion_editar_perfil]')
const contenedor_perfil = document.querySelector('.contenedor_perfil')

//aqui se carga la imagen y el nombre del usuario actual apenas se inicie el documento
//tambien se escucha cuando se presione para editar el perfil
fetch('./models/consultar_perfil.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
})
  .then(response => response.json())
  .then(data => {
    // Procesar la respuesta del servidor
    //console.log(data);
    if (data.imagen_usuario == null) {
      contenedor_imagen.classList.add("sin_imagen");
      imagen_perfil.classList.add('sin_imagen');
      btn_preload_imagen.classList.add('sin_imagen');
    } else {
      contenedor_imagen.style.backgroundImage = `url(data:image/jpeg;base64,${data.imagen_usuario})`;
      imagen_perfil.style.backgroundImage = `url(data:image/jpeg;base64,${data.imagen_usuario})`;
      btn_preload_imagen.style.backgroundImage = `url(data:image/jpeg;base64,${data.imagen_usuario})`;
    }
    nombre_menu_perfil.textContent = data.nombre_usuario;
    nombre_modal_editar_perfil.textContent = data.nombre_usuario;
    name_input.placeholder = data.nombre_usuario;
    email_input.placeholder = data.correo_usuario;
    direccion_input.placeholder = data.codigo_direccion == 0 ? "No se ha establecido dirección" : data.direccion;
    texto_rol.textContent = data.rol.nombre_rol
    if(data.rol.nombre_rol == "Administrador"){
      const manage_products = document.createElement('div')
      manage_products.className = "texto_administrar_productos"
      manage_products.textContent = 'manage products'
      contenedor_perfil.appendChild(manage_products)
    }
  })
  .catch(error => {
    // Manejar cualquier error
    console.error('Error:', error);
  });

  