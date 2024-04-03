<?php
// Obtener el id_saco enviado en la solicitud
$idSaco = $_GET['id_saco'];
$tamanoSaco = $_GET['tamano_saco'];

// Realizar las validaciones y consultas necesarias
require_once 'conexion.php';

// Verificar si el id_saco ya está registrado en la tabla carrito_saco
$sql_check_carrito_saco = "SELECT COUNT(*) as total FROM carrito_saco WHERE id_saco = ? AND tamano = ?";
$stmt_check_carrito_saco = $conn->prepare($sql_check_carrito_saco);
$stmt_check_carrito_saco->bind_param("is", $idSaco, $tamanoSaco);
$stmt_check_carrito_saco->execute();
$result_check_carrito_saco = $stmt_check_carrito_saco->get_result();
$row_check_carrito_saco = $result_check_carrito_saco->fetch_assoc();
$stmt_check_carrito_saco->close();

$response = array();

if ($row_check_carrito_saco['total'] > 0) {
    // El producto ya está en el carrito
    $response = array("existeEnCarrito" => true);
} else {
    // Obtener el id_carrito del usuario en la tabla carrito_compras
    session_start();
    $idUsuario = $_SESSION['id_user'];

    $sql_get_id_carrito = "SELECT id_carrito FROM carrito_compras WHERE codigo_usuario = ?";
    $stmt_get_id_carrito = $conn->prepare($sql_get_id_carrito);
    $stmt_get_id_carrito->bind_param("i", $idUsuario);
    $stmt_get_id_carrito->execute();
    $result_get_id_carrito = $stmt_get_id_carrito->get_result();
    $row_get_id_carrito = $result_get_id_carrito->fetch_assoc();
    $stmt_get_id_carrito->close();

    if ($row_get_id_carrito) {
        $idCarrito = $row_get_id_carrito['id_carrito'];
        // Aquí puedes usar el $idCarrito para insertar el producto en la tabla carrito_saco
        // ...
        // Por ejemplo, para obtener la cantidad del saco de la tabla 'saco'
        $sql_get_cantidad_saco = "SELECT cantidad FROM saco WHERE id_saco = ?";
        $stmt_get_cantidad_saco = $conn->prepare($sql_get_cantidad_saco);
        $stmt_get_cantidad_saco->bind_param("i", $idSaco);
        $stmt_get_cantidad_saco->execute();
        $result_get_cantidad_saco = $stmt_get_cantidad_saco->get_result();
        $row_get_cantidad_saco = $result_get_cantidad_saco->fetch_assoc();
        $stmt_get_cantidad_saco->close();

        if ($row_get_cantidad_saco) {
            $cantidad = $row_get_cantidad_saco['cantidad'];

            $fechaSacoAgregado = date("Y-m-d");

            $sql_insert_carrito_saco = "INSERT INTO carrito_saco (id_carrito, id_saco, cantidad, fecha_saco_agregado, tamano) VALUES (?, ?, ?, ?, ?)";
            $stmt_insert_carrito_saco = $conn->prepare($sql_insert_carrito_saco);
            $stmt_insert_carrito_saco->bind_param("iiiss", $idCarrito, $idSaco, $cantidad, $fechaSacoAgregado, $tamanoSaco);
            if ($stmt_insert_carrito_saco->execute()) {
                $response = array("existe" => false, "mensaje" => "Producto agregado al carrito exitosamente.");
            } else {
                $response = array("existe" => false, "mensaje" => "Error al agregar el producto al carrito.");
            }

            $stmt_insert_carrito_saco->close();
        } else {
            // No se encontró la cantidad del saco en la tabla 'saco', manejar el error según tus necesidades
            $response = array("existe" => false, "error" => "No se encontró la cantidad del saco en la base de datos.");
        }
    } else {
        // No se encontró el carrito del usuario, manejar el error según tus necesidades
        $response = array("existe" => false, "error" => "No se encontró el carrito del usuario.");
    }
}

$response = array("id" => $idSaco) + $response; // Agregar el id_saco al arreglo de respuesta

header('Content-Type: application/json');
echo json_encode($response);
?>
