<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    if(isset($_POST['busqueda'])) {
        $txt = $_POST['busqueda'];
        echo 'tu busqueda fue:'.$txt;
    }
?>
