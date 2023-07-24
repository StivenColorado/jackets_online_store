<?php
// Incluir archivo de conexión a la base de datos
require_once 'conexion.php';

// Verificar si el usuario ha iniciado sesión
session_start();
if (!isset($_SESSION['id_user'])) {
  // El usuario no ha iniciado sesión, retorna un mensaje de error
  $response = array('error' => 'Usuario no ha iniciado sesión');
  header('Content-Type: application/json');
  echo json_encode($response);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Obtener el id_saco del producto a eliminar del carrito
  $data = json_decode(file_get_contents('php://input'), true);
  $id_saco = $data['id_saco'];

  // Obtener el id_carrito del usuario en la tabla carrito_compras
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

    // Eliminar el producto del carrito_saco
    $sql_eliminar_producto = "DELETE FROM carrito_saco WHERE id_carrito = ? AND id_saco = ?";
    $stmt_eliminar_producto = $conn->prepare($sql_eliminar_producto);
    $stmt_eliminar_producto->bind_param("ii", $idCarrito, $id_saco);
    $stmt_eliminar_producto->execute();
    $stmt_eliminar_producto->close();

    // Devolver una respuesta de éxito
    $response = array('success' => true);
    header('Content-Type: application/json');
    echo json_encode($response);
  } else {
    // No se encontró el carrito del usuario, retorna un mensaje de error
    $response = array('error' => 'No se encontró el carrito del usuario');
    header('Content-Type: application/json');
    echo json_encode($response);
  }
}
?>
