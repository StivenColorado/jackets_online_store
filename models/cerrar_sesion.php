<?php
    session_start();
    session_unset();
    session_destroy();
    $response = array('mensaje' => 'si');
    header('Content-Type: application/json');
    echo json_decode($response);
    exit();
?>