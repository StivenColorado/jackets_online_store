<?php
// Obtener la conexión a la base de datos
require_once('conexion.php');

if ($conn->connect_error) {
  die("Error en la conexión: " . $conn->connect_error);
}

session_start();
$idUsuario = $_SESSION['id_user'];

// Obtener los datos de las contraseñas
$contrasenaActual = $_POST['contrasena_actual'];
$contrasenaNueva = $_POST['contrasena_nueva'];

// Verificar la contraseña actual
$resultado = $conn->query("SELECT contrasena_usuario FROM usuario WHERE id_usuario = $idUsuario");
if ($resultado && $resultado->num_rows > 0) {
  $fila = $resultado->fetch_assoc();
  $contrasenaActualBD = $fila['contrasena_usuario'];
  
  var_dump($contrasenaActual, $contrasenaActualBD); // Depuración
  
  if ($contrasenaActual == $contrasenaActualBD) {
    // Actualizar la contraseña en la base de datos
    $actualizar = $conn->query("UPDATE usuario SET contrasena_usuario = '$contrasenaNueva' WHERE id_usuario = $idUsuario");
    if ($actualizar) {
      $respuesta = array('mensaje' => 'La contraseña se ha actualizado correctamente', 'completado' => true);
      echo json_encode($respuesta);
    } else {
      $respuesta = array('mensaje' => 'Error al actualizar la contraseña', 'completado' => false);
      echo json_encode($respuesta);
    }
  } else {
    $respuesta = array('mensaje' => 'La contraseña actual es incorrecta', 'completado' => false);
    echo json_encode($respuesta);
  }
} else {
  $respuesta = array('mensaje' => 'No se encontró el usuario', 'completado' => false);
  echo json_encode($respuesta);
}
?>
