<?php
// Obtener la conexión a la base de datos
require_once('conexion.php');

if ($conn->connect_error) {
  die("Error en la conexión: " . $conn->connect_error);
}
session_start();
$idUsuario = $_SESSION['id_user'];

if (isset($_FILES['imagen'])) {
  $imagen = $_FILES['imagen'];
  $contenidoImagen = file_get_contents($imagen['tmp_name']);
  // Preparar la consulta SQL
  $sql = "UPDATE usuario SET imagen_usuario = ? WHERE id_usuario = ?";
  // Preparar la sentencia
  $stmt = $conn->prepare($sql);

  $stmt->bind_param("si", $contenidoImagen, $idUsuario);

  if ($stmt->execute()) {
    // La imagen se actualizó correctamente
    $respuesta = array('mensaje' => 'La imagen se ha actualizado correctamente', 'completado' => true);
    echo json_encode($respuesta);
  } else {
    // Hubo un error al actualizar la imagen
    $respuesta = array('mensaje' => 'Error al actualizar la imagen', 'completado' => false);
    echo json_encode($respuesta);
  }

  $stmt->close();
}

//
