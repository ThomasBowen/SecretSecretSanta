<?php
$email = $_POST["email"];
$message = $_POST["message"];

$subject = "Secret Secret Santa";
$headers = "From: Secret Secret Santa <do_not_reply@secretsecretsanta.com> \r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Reply-To: do_not_reply@secretsecretsanta.com \r\n";
	
mail($email, $subject, $message, $headers);
?>
