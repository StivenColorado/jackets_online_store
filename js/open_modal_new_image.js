const btn_img = document.querySelector('.imagen_profile')
const formulario_imagen = document.querySelector('.contenedor_formulario_nueva_imagen')
const btn_close_modal = document.querySelector('.close_contenedor_formulario_nueva_imagen')
const assets_open_modal_image = document.querySelector('.contenedor_imagen_perfil')

btn_img.addEventListener('click', () => {
    formulario_imagen.style.display = "flex"
})

assets_open_modal_image.addEventListener('click', () => {
    formulario_imagen.style.display = "flex"
})

btn_close_modal.addEventListener('click', () =>{
    formulario_imagen.style.display = "none"
})