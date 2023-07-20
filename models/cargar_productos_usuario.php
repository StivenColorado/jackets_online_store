<?php
// cargar_productos_administrador.php
ini_set('display_errors', '0');
require_once 'conexion.php';

// Obtener los datos de la tabla "saco"
$sql_sacos = "SELECT * FROM saco";
$resultado_sacos = $conn->query($sql_sacos);
if (!$resultado_sacos) {
    echo "Error al ejecutar la consulta de sacos: " . $conn->error;
    exit;
}
$productos = array();

if ($resultado_sacos->num_rows > 0) {
    // Recorrer los registros de sacos
    while ($fila_saco = $resultado_sacos->fetch_assoc()) {
        $id_saco = $fila_saco['id_saco'];
        $codigoSaco = $fila_saco['codigo_saco'];
        $nombreSaco = $fila_saco['nombre_saco'];
        $descripcionSaco = $fila_saco['descripcion_saco'];
        $precioSaco = $fila_saco['precio_saco'];
        $cantidad = $fila_saco['cantidad'];

        // Consultar las imágenes correspondientes al saco actual
        $sql_imagenes = "SELECT ruta_imagen FROM imagenes_saco WHERE codigo_saco = '$id_saco'";
        $resultado_imagenes = $conn->query($sql_imagenes);

        if (!$resultado_imagenes) {
            echo "Error al ejecutar la consulta de imágenes para el saco $codigoSaco: " . $conn->error;
            continue; // Pasar al siguiente saco en caso de error
        }

        $imagenes = array();

        // Recorrer los registros de imágenes y agregarlos al array de imágenes
        while ($fila_imagen = $resultado_imagenes->fetch_assoc()) {
            $rutaImagen = $fila_imagen['ruta_imagen'];
            $imagenes[] = $rutaImagen;
        }

        // Crear un nuevo objeto para el saco actual
        $saco = new stdClass();
        $saco->codigo_saco = $id_saco;
        $saco->nombre_saco = $nombreSaco;
        $saco->descripcion_saco = $descripcionSaco;
        $saco->precio_saco = $precioSaco;
        $saco->cantidad = $cantidad;
        $saco->imagenes = $imagenes;

        // Agregar el saco al array de productos
        $productos[] = $saco;
    }
} else {
    echo "No hay sacos registrados";
}

// Convertir el array de productos a JSON y enviarlo como respuesta
header('Content-Type: application/json');
echo json_encode($productos);

?>
