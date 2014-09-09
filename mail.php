<?
$to = 'contato@anytimetraducoes.com.br';
#$to = 'csgyuricza@gmail.com';
$subject = 'Mensagem enviada pelo site Anytime';
$message = 'Nome: ' . $_REQUEST['nome'] . "\n\n" . 'Fone: ' . $_REQUEST['prefixo'] . '-' . $_REQUEST['fone'] . "\n\n" . 'Empresa: ' . $_REQUEST['empresa'] . "\n\n" . 'Email: ' . $_REQUEST['email'] . "\n\n" . 'Mensagem: ' . $_REQUEST['mensagem'];
$email = $_REQUEST['email'];
$headers = 'From: ' . $email . "\r\n" .
            'Reply-To: ' . $email . "\r\n" .
          'X-Mailer: PHP/' . phpversion();
 
if (strlen($email)>0) {
  mail ($to, $subject, $message, $headers);
  header("Location: index.html?msg=ok");
} else {
  header("Location: index.html");
}

?>
