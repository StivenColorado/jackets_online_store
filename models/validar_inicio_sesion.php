<?php
//en este archivo se inicia la sesion en el formulario de iniciar sesion
require_once('conexion.php');
$data = json_decode(file_get_contents('php://input'), true);
$response = array();

if ($data) {
    $email = $data['correo'];
    $password = $data['contrasena'];

    // Verificar si la conexión fue exitosa
    if ($conn->connect_error) {
        $response["mensaje"] = "Error de conexión a la base de datos";
    } else {
        // Verificar si el correo existe en la base de datos
        $sql_verificar = "SELECT contrasena_usuario FROM usuario WHERE correo_usuario = ?";
        $stmt_verificar = $conn->prepare($sql_verificar);
        $stmt_verificar->bind_param("s", $email);
        $stmt_verificar->execute();
        $result_verificar = $stmt_verificar->get_result();
        $row_verificar = $result_verificar->fetch_assoc();

        if ($row_verificar) {
            // Se encontró el correo, verificar la contraseña
            $hashedPassword = $row_verificar['contrasena_usuario'];
            if (password_verify($password, $hashedPassword)) {
                // La contraseña es válida

                $response["mensaje"] = "Contraseña correcta. Puedes proceder.";
                // Iniciar sesión

                // Consultar el ID del correo
                $sql_id = "SELECT id_usuario FROM usuario WHERE correo_usuario = ?";
                $stmt_id = $conn->prepare($sql_id);
                $stmt_id->bind_param("s", $email);
                $stmt_id->execute();
                $result_id = $stmt_id->get_result();
                $row_id = $result_id->fetch_assoc();
                if ($row_id) {
                    $idUsuario = $row_id['id_usuario'];
                    $response["id_usuario"] = $idUsuario;
                    // Guardar el ID en una variable si se encuentra
                    $idUsuarioEncontrado = $idUsuario;
                    // Configurar el tiempo de vida de la sesión en 30 minutos (1800 segundos)
                    session_set_cookie_params(1800);
                    session_start();
                    $_SESSION['id_user'] = $idUsuarioEncontrado;
                } else {
                    // No se encontró el ID del correo en la base de datos
                    $response["mensaje"] = "No se pudo obtener el ID del usuario";
                }
            } else {
                // La contraseña no coincide
                $response["mensaje"] = "La contraseña ingresada no es correcta";
            }
        } else {
            // No se encontró el correo en la base de datos
            $response["mensaje"] = "El correo ingresado no existe";
        }

        // Cerrar la conexión a la base de datos
        $conn->close();
    }
} else {
    $response["mensaje"] = "No se recibieron datos";
}

header('Content-Type: application/json');
echo json_encode($response);
?>