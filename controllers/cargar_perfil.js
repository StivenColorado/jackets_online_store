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
    
    
    name_input.value = data.nombre_usuario;
    email_input.value = data.correo_usuario;
    direccion_input.value = data.codigo_direccion == 0 ? "No se ha establecido dirección" : data.direccion;
    if(data.rol.nombre_rol == "Administrador"){
      const manage_products = document.createElement('div')
      manage_products.className = "texto_administrar_productos"
      manage_products.innerHTML = `
      <span style="padding-rigth:2em;">Manage products</span> 
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M20.94 10.61l-1.25-3.73C19.39 6.17 18.79 6 18.19 6h-.38c-.57 0-1.11.33-1.35.88L15 10.25V4.5c0-1.38-1.12-2.5-2.5-2.5S10 3.12 10 4.5v5.75l-1.46-4.37c-.24-.55-.78-.88-1.35-.88h-.38c-.6 0-1.2.17-1.7.48l-1.25 3.73C3.05 10.82 2 12.26 2 14v5c0 .83.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5v-1h12v1c0 .83.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5v-5c0-1.74-1.05-3.18-2.56-3.39zM12 4.5c0-.28.22-.5.5-.5s.5.22.5.5v5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.5zm8 14h-17c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5h2.81l.81-2.42 1.19-3.56C6.28 6.29 6.62 6 7 6h10c.38 0 .72.29.88.71l1.19 3.56.81 2.42H20c.28 0 .5.22.5.5v5c0 .28-.22.5-.5.5z"/>
    </svg>
    
      `;
      contenedor_perfil.appendChild(manage_products)
    }
  })
  .catch(error => {
    // Manejar cualquier error
    console.error('Error:', error);
  });

  