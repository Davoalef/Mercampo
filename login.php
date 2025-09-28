<?php
session_start();
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = md5($_POST['password']); // porque guardamos con MD5

    $sql = "SELECT * FROM usuarios WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['usuario'] = $email;
        header("Location: shop.php"); // redirige a productos
    } else {
        echo "❌ Usuario o contraseña incorrectos.";
    }
}
?>
