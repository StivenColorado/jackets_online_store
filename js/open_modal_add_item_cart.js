window.onload = function () {
  const modal_add_to_cart = document.querySelector('.modal_comprar_producto');
  const img = document.querySelector('.contenedor_imagen_principal_producto');
  const sub_img = document.querySelector('.sub_imagen_producto');
  const price_text_modal = document.querySelector('.texto_precio_producto');
  const title_text_modal = document.querySelector('.texto_nombre_producto');
  const descripcion = document.querySelector('.descripcion_producto_agregar_carrito')
  const btn_close_modal_add_cart = document.querySelector('.close_modal_add_cart');

  const btn_addt_item_cart = document.querySelector('.boton_agregar_producto_carrito')
  const items = document.querySelectorAll('.producto');

  document.body.addEventListener('click', (e) => {
    if (e.target.className == "producto" || e.target.className == "img_producto") {
      // console.log(e.target.className)
      const id = e.target.dataset.id;
      const clickedItem = e.currentTarget;
      const clickedPrice = clickedItem.querySelector('.precio_producto').textContent;
      const clickedTitle = clickedItem.querySelector('.nombre_producto').textContent;
      if (e.target.src) {
        img.style.backgroundImage = `url(${e.target.src})`;
        sub_img.style.backgroundImage = `url(${e.target.src})`;

      } else {
        const imageUrl = e.target.getAttribute('data');
        img.style.backgroundImage = `url(${imageUrl})`;
        sub_img.style.backgroundImage = `url(${imageUrl})`;
      }
      descripcion.textContent = e.target.dataset.parent
      price_text_modal.textContent = clickedPrice;
      title_text_modal.textContent = clickedTitle;
      btn_addt_item_cart.setAttribute('data-id',id); 
      // console.log(id)
      // console.log(btn_addt_item_cart)
      modal_add_to_cart.style.animation = "show_modal_add_cart .2s alternate ease-in forwards";
    }
  })

  btn_close_modal_add_cart.addEventListener('click', () => {
    modal_add_to_cart.style.animation = "hidden_modal_add_cart .2s alternate ease-in forwards";
  });

}