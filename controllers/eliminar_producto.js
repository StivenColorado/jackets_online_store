const eliminarProducto = async (id) => {
    const data = { id: id };

    try {
        const response = await fetch('./models/eliminar_producto.php', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            alert(responseData.mensaje);
            location.href = "./index.html"
        } else {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.log(error);
    }
};

document.body.addEventListener('click', (e) => {
    if (e.target.className == "btn_admin eliminar") {
        const id = e.target.dataset.id;
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");

        if (confirmacion) {
            eliminarProducto(id);
        }
    }
});
