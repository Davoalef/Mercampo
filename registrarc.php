<?php include_once 'conexion.php';

$nombres = $_POST['nombres'];
$apellidos = $_POST['apellidos'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
$contraseña = $_POST['contraseña'];

$hash = password_hash($contraseña, PASSWORD_DEFAULT);

$sql = "INSERT INTO clientes (nombres, apellidos, correo, telefono, direccion, contraseña)
    VALUES ('$nombres','$apellidos', '$correo', '$telefono', '$direccion', '$contraseña', '$hash')";

    if ($conn->query($sql)===TRUE){
        echo "Cliente registrado exitosamente.";
    }else {
        echo "Error.". $conn->error;
    }

    $conn->close();
?>