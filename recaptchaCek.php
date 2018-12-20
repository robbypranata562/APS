<?php
namespace recaptchaCek;

function curl_post($url,$fields) {
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => $fields,
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache",
      ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
      return "cURL Error #:" . $err;
    } else {
      return $response;
    }
}

if (isset($_POST['g-recaptcha-response'])) {
    $recaptcha = $_POST['g-recaptcha-response'];
    $secret = '6LfdfBwUAAAAAEiEpWNVj9ZCI47SB77uJuknRNUI';
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $ip = $_SERVER['REMOTE_ADDR'];

    $fields = array(
        'secret' => $secret,
        'response' => $recaptcha,
        'remoteip' => $ip
    );
    $json = curl_post($url,$fields);
    $hasil = json_decode($json);

    if ($hasil->success == 'true') {
        //cek credential sudah cocok atau blm
        $recaptcharesult = 1;
    } else {
        //kembali ke layar login
        $recaptcharesult = 0;
        //header('Location: https://www.autopilotstore.co.id/login.php');
    }
} else {
    $recaptcharesult = 0;
    //header('Location: https://www.autopilotstore.co.id/login.php');
}
?>
