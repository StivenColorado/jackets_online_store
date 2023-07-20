const mostrarNombreArchivo = () => {
        var fileInput = document.getElementById('imagen');
        var fileName = document.getElementById('file-name');
        if (fileName) {
                fileName.textContent = fileInput.files[0].name;
        }
}