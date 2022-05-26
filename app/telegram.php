<?php

/* https://api.telegram.org/bot5117873330:AAG2wA6i1PckdsaJnSaXgKW0a-rDIrx-5E4/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$message = $_POST['user_message'];
$token = "5117873330:AAG2wA6i1PckdsaJnSaXgKW0a-rDIrx-5E4";
$chat_id = "-763006856";
$arr = array(
  "Ім'я користувача: " => $name,
  "Телефон: " => $phone,
  "Повідомлення: " => $message
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: index.html');
} else {
  echo "Error";
}
?>