document.body.addEventListener('click', (e) => {
    
    if (e.target.matches('.eliminar_producto_carrito')){
        const idSaco = e.target.getAttribute('data-id');
        eliminarProductoCarrito(idSaco)
    }
})
// Función para eliminar un producto del carrito
function eliminarProductoCarrito(id_saco) {
    // Realizar una solicitud POST al archivo PHP para eliminar el registro del carrito_saco
    fetch('./models/remove_item_cart.php', {
        method: 'POST',
        credentials: 'include', // Incluir las cookies de sesión en la solicitud
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_saco: id_saco })
    })
        .then(response => response.json())
        .then(data => {
            // Aquí puedes realizar acciones después de eliminar el registro
            // Por ejemplo, recargar la lista de productos del carrito
            cargarProductosCarrito();
        })
        .catch(error => {
            console.log('Error al eliminar el producto del carrito:', error);
        });
}

  // ... (código existente)
