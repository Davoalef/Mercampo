<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name     = htmlspecialchars($_POST['name']);
    $email    = htmlspecialchars($_POST['email']);
    $phone    = htmlspecialchars($_POST['phone']);
    $comments = htmlspecialchars($_POST['comments']);

    // correo del admin (tú)
    $adminEmail = "mariangelobandovargas@gmail.com";

    $subject = "Nuevo mensaje desde formulario";
    $message = "
        Nombre: $name <br>
        Email: $email <br>
        Teléfono: $phone <br>
        Mensaje: <br> $comments
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: <$adminEmail>" . "\r\n";

    // enviar al admin
    $sentToAdmin = mail($adminEmail, $subject, $message, $headers);

    // enviar al usuario (copia de confirmación)
    $subjectUser = "Gracias por tu mensaje, $name";
    $messageUser = "
        Hola $name,<br><br>
        Hemos recibido tu mensaje:<br>
        <blockquote>$comments</blockquote>
        <br>
        Pronto nos pondremos en contacto contigo.<br><br>
        Saludos,<br>Tu Empresa
    ";
    $sentToUser = mail($email, $subjectUser, $messageUser, $headers);

    if ($sentToAdmin && $sentToUser) {
        echo "<div class='alert alert-success'>✅ Mensaje enviado con éxito.</div>";
    } else {
        echo "<div class='alert alert-danger'>❌ Error al enviar el mensaje.</div>";
    }
}
?>
