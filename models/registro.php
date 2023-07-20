<?php
$name = null;
$email = null;
$user = 2;

// Obtener los datos enviados en el cuerpo de la solicitud
$data = file_get_contents('php://input');

if ($data) {
    // Decodificar los datos JSON como array asociativo
    $datos = json_decode($data, true);
    $name = $datos['nombre'];
    $email = $datos['correo'];
    $password = $datos['contrasena'];
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    require_once 'conexion.php';

    // Verificar si el correo ya existe en la base de datos
    $sql_verificar = "SELECT COUNT(*) AS count FROM usuario WHERE correo_usuario = ?";
    $stmt_verificar = $conn->prepare($sql_verificar);
    $stmt_verificar->bind_param("s", $email);
    $stmt_verificar->execute();
    $result_verificar = $stmt_verificar->get_result();
    $row_verificar = $result_verificar->fetch_assoc();

    if ($row_verificar['count'] > 0) {
        // El correo ya existe, enviar mensaje de error
        $response["mensaje"] = "El correo ingresado ya existe";
    } else {
        // El correo no existe, realizar la inserción en la base de datos
        $sql_insert = "INSERT INTO usuario (codigo_rol, nombre_usuario, correo_usuario, contrasena_usuario)
            VALUES (?, ?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("isss", $user, $name, $email, $hashedPassword);

        if ($stmt_insert->execute()) {
            $response["mensaje"] = "Datos guardados exitosamente";
            agregar_codigo_carrito($email,$conn);
        } else {
            $response["mensaje"] = "Error al guardar los datos";
        }
    }
} else {
    $response["mensaje"] = "No se recibieron datos";
}
// SELECT * FROM usuario
// LEFT JOIN carrito_compras ON usuario.id_usuario = carrito_compras.codigo_usuario
// WHERE usuario.id_usuario = 2;
function agregar_codigo_carrito($correo, $conexion)
{
    $consultar_id = $conexion->prepare("SELECT id_usuario FROM usuario WHERE correo_usuario = ?");
    $consultar_id->bind_param('s', $correo);
    $consultar_id->execute();
    $resultado = $consultar_id->get_result();
    $id = 0;
    if ($resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
        $id = $fila['id_usuario'];

        $agregar_codigo_carrito = $conexion->prepare('INSERT INTO carrito_compras (codigo_usuario) VALUES(?)');
        $agregar_codigo_carrito->bind_param('i', $id);
        $agregar_codigo_carrito->execute();
    }

}
header('Content-Type: application/json');
echo json_encode($response);
?>