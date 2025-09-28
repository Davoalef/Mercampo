<?php
include("conexion.php");

// Verificamos si llegaron datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombres   = $_POST['nombres'] ?? '';
    $apellidos = $_POST['apellidos'] ?? '';
    $correo    = $_POST['correo'] ?? '';
    $telefono  = $_POST['telefono'] ?? '';
    $direccion = $_POST['direccion'] ?? '';
    $contrasena= $_POST['contrasena'] ?? '';

    // Encriptar contraseña
    $hash = password_hash($contrasena, PASSWORD_DEFAULT);

    // Consulta preparada
    $sql = "INSERT INTO clientes (nombres, apellidos, correo, telefono, direccion, contrasena) 
            VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("ssssss", $nombres, $apellidos, $correo, $telefono, $direccion, $hash);

        if ($stmt->execute()) {
            echo "✅ Cliente registrado exitosamente.";
        } else {
            echo "❌ Error al registrar: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "❌ Error en la preparación de la consulta: " . $conn->error;
    }

    $conn->close();
} else {
    echo "Acceso no permitido 🚫";
}
?>
