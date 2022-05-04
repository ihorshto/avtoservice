<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->Charset = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  // від кого лист
  $mail->setFrom('info.guru', 'Фрілансер по життю');
  // кому відправити
  $mail->addAddress('igorshtogrin2016@gmail.com');
  // тема листа
  $mail->Subject = 'Привіт! Це Фрілансер по життю!';


  // Тіло листа
  $body = '<h1>Зустрічайте супер лист!</h1>';

  if(trim(!empty($_POST['name']))){
    $body.="<p><strong>Ім'я:</strong> ".$_POST['name']"</p>";
  }
  if(trim(!empty($_POST['phone']))){
    $body.="<p><strong>Телефон:</strong> ".$_POST['phone']"</p>";
  }
  if(trim(!empty($_POST['message']))){
    $body.="<p><strong>Повідомлення:</strong> ".$_POST['message']"</p>";
  }

  $mail->Body = $body;

  // Відправляємо
  if(!$mail->send()){
    $message = 'Помилка sendmail';
  } else {
    $message = 'Дані відправлені';
  }

  $resposnse = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);