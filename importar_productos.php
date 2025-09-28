<?php
include("conexion.php");

$jsonData = file_get_contents("productos.json");
$productos = json_decode($jsonData, true);

foreach ($productos as $p) {
    $nombre = $conn->real_escape_string($p['nombre']);
    $descripcion = $conn->real_escape_string($p['descripcion']);
    $precio = $p['precio'];
    $unidad = $conn->real_escape_string($p['unidad']);
    $categoria = $conn->real_escape_string($p['categoria']);
    $imagen = $conn->real_escape_string($p['imagen']);

    $sql = "INSERT INTO productos (nombre, descripcion, precio, unidad, categoria, imagen) 
            VALUES ('$nombre', '$descripcion', $precio, '$unidad', '$categoria', '$imagen')";
    $conn->query($sql);
}

echo "✅ Productos importados correctamente";
?>
