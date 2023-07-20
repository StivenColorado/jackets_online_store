<?php
// Obtener la conexión a la base de datos
require_once('conexion.php');

if ($conn->connect_error) {
  die("Error en la conexión: " . $conn->connect_error);
}
session_start();
$idUsuario = $_SESSION['id_user'];

// Obtener los datos de los campos a actualizar
$nombreUsuario = $_POST['nombre'];
$direccion = $_POST['direccion'];

// Preparar la consulta SQL
$sql = "UPDATE usuario SET nombre_usuario = ?, direccion = ? WHERE id_usuario = ?";
// Preparar la sentencia
$stmt = $conn->prepare($sql);

$stmt->bind_param("ssi", $nombreUsuario, $direccion, $idUsuario);

if ($stmt->execute()) {
  // Los datos se actualizaron correctamente
  $respuesta = array('mensaje' => 'Los datos se han actualizado correctamente', 'completado' => true);
  echo json_encode($respuesta);
} else {
  // Hubo un error al actualizar los datos
  $respuesta = array('mensaje' => 'Error al actualizar los datos', 'completado' => false);
  echo json_encode($respuesta);
}

$stmt->close();
?>
