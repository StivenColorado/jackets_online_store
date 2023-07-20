<?php
$servername = "localhost";  // Cambia "localhost" si tu base de datos está en un servidor remoto
$username = "root";   // Reemplaza "tu_usuario" con tu nombre de usuario de MySQL
$password = ""; // Reemplaza "tu_contraseña" con tu contraseña de MySQL
$database = "jacket_shop";  // Nombre de la base de datos
// Crear una conexión
$conn = new mysqli($servername, $username, $password, $database);
// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
