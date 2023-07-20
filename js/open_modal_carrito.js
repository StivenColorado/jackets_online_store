//trolley
document.addEventListener('DOMContentLoaded', () => {
    const modal_carrito = document.querySelector('.modal_carrito');
    const trolley = document.querySelector('.trolley');
    const btn_close_modal_carrito = document.querySelector('.btn_close_modal_carrito');

    //btn_cerrar_modal_administrar_productos

    trolley.addEventListener('click', () => {
        modal_carrito.style.animation = "show_modal_productos_carrito .3s alternate ease-in forwards";
    });

    btn_close_modal_carrito.addEventListener('click', () => {
        modal_carrito.style.animation = "hidden_modal_productos_carrito .3s alternate ease-in forwards";
    })

});
