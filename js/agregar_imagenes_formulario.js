// Obtener referencia al campo de imágenes y al contenedor de previsualización
const imagenesInput = document.getElementById('imagenes');
const previsualizacionContainer = document.getElementById('previsualizacion');

// Escuchar el evento change del campo de imágenes
imagenesInput.addEventListener('change', function (e) {
  // Obtener los archivos seleccionados
  const archivos = Array.from(e.target.files);

  // Verificar el límite máximo de imágenes
  if (archivos.length + previsualizacionContainer.childElementCount > 1) {
    alert('¡Se excedió el límite máximo de imágenes permitidas (1)!');
    imagenesInput.value = ''; // Limpiar el campo de imágenes seleccionadas
    return;
  }

  // Mostrar una previsualización de cada archivo
  archivos.forEach(function (archivo) {
    if (previsualizacionContainer.childElementCount >= 3) {
      alert('¡Se alcanzó el límite máximo de imágenes permitidas (3)!');
      return;
    }
    const lector = new FileReader();
    lector.onload = function (e) {
      const imagen = document.createElement('img');
      imagen.src = e.target.result;
      previsualizacionContainer.appendChild(imagen);
    }
    lector.readAsDataURL(archivo);
  });
});


