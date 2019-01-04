<?php
ini_set('display_errors', 1);
session_start();
include(__DIR__."/Functions.php");
include(__DIR__."/recaptchaCek.php");
$urlnow = 'http://localhost:8160/APS';
if ($recaptcharesult == 0) {
    if (isset($_SESSION['aps_id'])) {
        include(__DIR__."/cekUser.php");
        header("Location: $urlnow/welcome.php");//landing page
    } else {
        doLogout();
        header("Location: $urlnow/login.php?err=Captcha Error (".$recaptcharesult.")");
    }
} else {
    $login = doLogin();
    if ($login['errcode'] == 'OK') {
        //login berhasil
        header("Location: $urlnow/welcome.php");//landing page 
    } else {
        //login gagal
        doLogout();
        $reason = $login['reason'];
        header("Location: $urlnow/login.php?err=$reason");
    }
}
die();
?>
