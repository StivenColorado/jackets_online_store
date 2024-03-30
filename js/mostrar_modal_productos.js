document.addEventListener('DOMContentLoaded', () => {
    const modal_productos = document.querySelector('.modal_administrar_productos');
    const contenedor_padre = document.querySelector('.menu_configuraciones');
    const close_modal_productos = document.querySelector('.btn_cerrar_modal_administrar_productos');

    const btn_cerrar_formulario_agregar_producto = document.querySelector('.btn_cerrar_formulario_agregar_producto')
    const formulario_agregar_producto = document.querySelector('.formulario_agregar_producto')
    const btn_opcion_administrar_productos = document.querySelector('.btn_add_new_product')

    //btn_cerrar_modal_administrar_productos
    contenedor_padre.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.texto_administrar_productos')) {
            // Realizar acciones cuando se hace clic en el elemento con la clase 'texto_administrar_productos'
            modal_productos.style.animation = "show_modal_productos .3s alternate ease-in forwards";
        }
    });

    close_modal_productos.addEventListener('click', () => {
        modal_productos.style.animation = "hidden_modal_productos .3s alternate ease-in forwards";
    })

    btn_opcion_administrar_productos.addEventListener('click', () => {
        formulario_agregar_producto.style.animation = "show_modal_productos .3s alternate ease-in forwards"
    })
    btn_cerrar_formulario_agregar_producto.addEventListener('click', () => {
        formulario_agregar_producto.style.animation = "hidden_modal_productos .3s alternate ease-in forwards"
    })
});
