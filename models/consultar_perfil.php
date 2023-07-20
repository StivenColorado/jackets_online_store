<?php
require_once('conexion.php');
// Obtener el valor de la sesión "id_usuario"
session_start();
$response = array();

if (isset($_SESSION['id_user'])) {
    $id_usuario = $_SESSION['id_user'];

    // Consulta para obtener los campos de la tabla "usuario"
    $query = "SELECT nombre_usuario, correo_usuario, direccion,imagen_usuario FROM usuario WHERE id_usuario = $id_usuario";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $response['nombre_usuario'] = $row['nombre_usuario'];
        $response['correo_usuario'] = $row['correo_usuario'];
        $response['direccion'] = $row['direccion'];
        //se convierte la imagen
        $imagen_blob = $row['imagen_usuario'];
        $imagen_base64 = base64_encode($imagen_blob);
        $response['imagen_usuario'] = $imagen_base64;

        $query_rol = "SELECT r.* FROM usuario u INNER JOIN rol r ON u.codigo_rol = r.id_rol WHERE u.id_usuario = $id_usuario";
        $result_rol = mysqli_query($conn, $query_rol);

        if ($result_rol) {
            $row_rol = mysqli_fetch_assoc($result_rol);
            $response['rol'] = $row_rol;
        } else {
            $response['error'] = "Error en la consulta del INNER JOIN";
        }
    } else {
        $response['error'] = "Error en la consulta de la tabla 'usuario'";
    }
} else {
    $response['error'] = "No se encuentra el valor de la sesión 'id_usuario'";
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
