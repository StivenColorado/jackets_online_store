<?php
session_start();
$response = array();

if (isset($_SESSION['id_user'])) {
    // La sesión está activa
    $response["sesion_activa"] = true;
    $response["sesion"] = isset($_SESSION['id_user']) ? $_SESSION['id_user'] : null;
} else {
    // No hay sesión activa
    $response["sesion_activa"] = false;
}

header('Content-Type: application/json');
echo json_encode($response);
?>
