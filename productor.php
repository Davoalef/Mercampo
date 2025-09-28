<?php
include("conexion.php");

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$tipo_propiedades = $_POST['tipo_propiedades'];
$ubicacion = $_POST['ubicacion'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$imagen = $_POST['imagen'];
$contraseña = $_POST['contraseña'];

// Hashear la contraseña
$hash = password_hash($contraseña, PASSWORD_DEFAULT);

// Verificar si el correo ya existe
$check = $conn->prepare("SELECT id FROM campesinos WHERE correo = ?");
$check->bind_param("s", $correo);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo "❌ El correo ya está registrado. Intenta con otro.";
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// Preparar la consulta de inserción segura
$stmt = $conn->prepare("INSERT INTO campesinos 
    (nombre, tipo_propiedades, ubicacion, correo, telefono, imagen, contraseña)
    VALUES (?, ?, ?, ?, ?, ?, ?)");

if ($stmt === false) {
    die("❌ Error al preparar la consulta: " . $conn->error);
}

// Asociar parámetros
$stmt->bind_param("sssssss", $nombre, $tipo_propiedades, $ubicacion, $correo, $telefono, $imagen, $hash);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "✅ Productor registrado exitosamente.";
} else {
    echo "❌ Error al registrar: " . $stmt->error;
}

// Cerrar recursos
$stmt->close();
$conn->close();
?>
