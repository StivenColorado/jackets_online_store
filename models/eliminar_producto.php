<?php
require_once('conexion.php');
ini_set('display_errors', 0);

if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

$data = file_get_contents('php://input');
$id_producto = json_decode($data)->id;

// Eliminar las imágenes del producto en la tabla imagenes_saco
$sql_eliminar_imagen = "DELETE FROM imagenes_saco WHERE codigo_saco = ?";
$stmt_eliminar_imagen = $conn->prepare($sql_eliminar_imagen);
if (!$stmt_eliminar_imagen) {
    $respuesta = array('mensaje' => "Error en la preparación de la consulta: " . $conn->error);
} else {
    $stmt_eliminar_imagen->bind_param("i", $id_producto);
    if ($stmt_eliminar_imagen->execute()) {
        // Eliminar el registro del producto en la tabla saco
        $sql_eliminar_saco = "DELETE FROM saco WHERE id_saco = ?";
        $stmt_eliminar_saco = $conn->prepare($sql_eliminar_saco);
        if (!$stmt_eliminar_saco) {
            $respuesta = array('mensaje' => "Error en la preparación de la consulta: " . $conn->error);
        } else {
            $stmt_eliminar_saco->bind_param("i", $id_producto);
            if ($stmt_eliminar_saco->execute()) {
                // Eliminar la carpeta de imágenes del producto
                $carpeta_imagenes = "./imagenes_sacos/" . $id_producto;
                if (is_dir($carpeta_imagenes)) {
                    $archivos_imagenes = glob($carpeta_imagenes . "/*");
                    foreach ($archivos_imagenes as $archivo_imagen) {
                        if (is_file($archivo_imagen)) {
                            unlink($archivo_imagen);
                        }
                    }
                    rmdir($carpeta_imagenes);
                }
                $respuesta = array('mensaje' => "Se eliminó el producto con ID: " . $id_producto);
            } else {
                $respuesta = array('mensaje' => "Error al eliminar el producto: " . $stmt_eliminar_saco->error);
            }
            $stmt_eliminar_saco->close();
        }
    } else {
        $respuesta = array('mensaje' => "Error al eliminar las imágenes del producto: " . $stmt_eliminar_imagen->error);
    }
    $stmt_eliminar_imagen->close();
}

header('Content-Type: application/json');
echo json_encode($respuesta);
?>
