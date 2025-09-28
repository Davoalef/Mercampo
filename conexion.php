<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'mercampo';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión:".$conn->connect_error);
        exit(); // Evita que el script continúe si la conexión falla
}

