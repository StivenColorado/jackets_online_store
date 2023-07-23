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

$idUsuario = $_SESSION['id_user'];

// Obtener el id_carrito del usuario en la tabla carrito_compras
$sql_get_id_carrito = "SELECT id_carrito FROM carrito_compras WHERE codigo_usuario = ?";
$stmt_get_id_carrito = $conn->prepare($sql_get_id_carrito);
$stmt_get_id_carrito->bind_param("i", $idUsuario);
$stmt_get_id_carrito->execute();
$result_get_id_carrito = $stmt_get_id_carrito->get_result();
$row_get_id_carrito = $result_get_id_carrito->fetch_assoc();
$stmt_get_id_carrito->close();

if ($row_get_id_carrito) {
  $idCarrito = $row_get_id_carrito['id_carrito'];

  // Consultar los productos en el carrito_saco
  $sql_consulta_carrito_saco = "SELECT s.id_saco, s.nombre_saco, s.precio_saco, cs.cantidad, cs.tamano, i.ruta_imagen
                               FROM saco s
                               INNER JOIN carrito_saco cs ON s.id_saco = cs.id_saco
                               INNER JOIN imagenes_saco i ON s.id_saco = i.codigo_saco
                               WHERE cs.id_carrito = ? AND i.id_imagen = s.id_saco";
  $stmt_consulta_carrito_saco = $conn->prepare($sql_consulta_carrito_saco);
  $stmt_consulta_carrito_saco->bind_param("i", $idCarrito);
  $stmt_consulta_carrito_saco->execute();
  $result_consulta_carrito_saco = $stmt_consulta_carrito_saco->get_result();

  $productos_carrito = array();
  while ($row_consulta_carrito_saco = $result_consulta_carrito_saco->fetch_assoc()) {
    // Agregar los datos de cada producto en el carrito a un array
    $producto = array(
      'id_saco' => $row_consulta_carrito_saco['id_saco'],
      'nombre' => $row_consulta_carrito_saco['nombre_saco'],
      'precio' => $row_consulta_carrito_saco['precio_saco'],
      'cantidad' => $row_consulta_carrito_saco['cantidad'],
      'tamano' => $row_consulta_carrito_saco['tamano'],
      'ruta_imagen' => $row_consulta_carrito_saco['ruta_imagen']
      // Puedes agregar más campos si es necesario
    );
    $productos_carrito[] = $producto;
  }

  // Cerrar las consultas y liberar recursos
  $stmt_consulta_carrito_saco->close();

  // Devolver los datos en formato JSON
  header('Content-Type: application/json');
  echo json_encode($productos_carrito);
} else {
  // No se encontró el carrito del usuario, retorna un mensaje de error
  $response = array('error' => 'No se encontró el carrito del usuario');
  header('Content-Type: application/json');
  echo json_encode($response);
}
?>
