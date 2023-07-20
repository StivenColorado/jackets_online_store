<?php
// Obtener los datos enviados en el cuerpo de la solicitud
ini_set('display_errors', '0');
$nombreSaco = $_POST['nombre_saco'];
$descripcionSaco = $_POST['descripcion_saco'];
$precioSaco = $_POST['precio_saco'];
$cantidad = $_POST['cantidad'];
// Validar los datos si es necesario

require_once 'conexion.php';

// Insertar los datos en la tabla "saco"
$sql_insert_saco = "INSERT INTO saco (nombre_saco, descripcion_saco, precio_saco, cantidad) 
                    VALUES (?, ?, ?, ?)";
$stmt_insert_saco = $conn->prepare($sql_insert_saco);
$stmt_insert_saco->bind_param("ssdi", $nombreSaco, $descripcionSaco, $precioSaco, $cantidad);

if ($stmt_insert_saco->execute()) {
    $sacoId = $stmt_insert_saco->insert_id; // Obtener el ID del saco recién insertado

    // Verificar si la carpeta "imagenes_sacos" existe, si no, crearla
    $carpetaImagenes = "./imagenes_sacos";
    if (!file_exists($carpetaImagenes)) {
        mkdir($carpetaImagenes, 0777, true);
    }

    // Crear una subcarpeta con el ID del saco
    $subcarpetaSaco = $carpetaImagenes . '/' . $sacoId;
    if (!file_exists($subcarpetaSaco)) {
        mkdir($subcarpetaSaco, 0777, true);
    }

    // Procesar y guardar la imagen
    $imagen = $_FILES['imagen']; // Obtener el archivo de imagen
    $nombreImagenOriginal = $imagen['name'];
    $nombreImagenNuevo = $sacoId . '_' . $nombreImagenOriginal;
    $rutaImagen = $subcarpetaSaco . '/' . $nombreImagenNuevo;
    $rutaCompletaImagen = __DIR__ . '/' . $rutaImagen;

    if (move_uploaded_file($imagen['tmp_name'], $rutaCompletaImagen)) {
        // Insertar la imagen en la tabla "imagenes_saco"
        $sql_insert_imagen = "INSERT INTO imagenes_saco (codigo_saco, ruta_imagen) VALUES (?, ?)";
        $stmt_insert_imagen = $conn->prepare($sql_insert_imagen);
        $rutaImagenDB = "./models/" . $rutaImagen;
        $stmt_insert_imagen->bind_param("is", $sacoId, $rutaImagenDB);
        $stmt_insert_imagen->execute();
        $stmt_insert_imagen->close();

        $response["mensaje"] = "Datos guardados exitosamente";
    } else {
        $response["mensaje"] = "Error al guardar la imagen";
    }
} else {
    $response["mensaje"] = "Error al guardar los datos";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
