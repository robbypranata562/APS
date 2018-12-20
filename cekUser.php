<?php
ini_set('display_errors', 1);
$url = 'https://development.autopilotstore.co.id';
include_once(__DIR__."/Functions.php");
$hasil = cekUser();
if (!($hasil['hasil'])) {
    $reason = $hasil['reason'];
    doLogout();
    header("Location: ".$url."/login.php?err=$reason");
    die();
} else {
    $dbklien = $hasil['hasil']['dbklien'];
    $idklien = $hasil['hasil']['idklien'];
    $idpengguna = $hasil['hasil']['idpengguna'];
    $idowner = $hasil['hasil']['idowner'];//email pengguna
    $fotopengguna_main = $hasil['hasil']['foto'];//foto pengguna
    $namapengguna = $hasil['hasil']['namapengguna'];//nama pengguna
    $outlet = $hasil['hasil']['outlet'];//list outlet yg dapat diakses
    if (isset($_SESSION['outletsekarang'])) {
        $outletsekarang = $_SESSION['outletsekarang'];
    } else {
        $_SESSION['outletsekarang'] = $hasil['hasil']['outletdefault'];
        $outletsekarang = $hasil['hasil']['outletdefault'];
    }
    include("DBConnectPDOH.php");
    $phpself = getPHPSelf();
    //cekisdemo
    if (isDemo($idklien,$phpself)) {
        header("Location: ".$url."/notallowed.php");
        die();
    }
    if (!(cekPrivileges($idpengguna, $phpself))) {
        header("Location: ".$url."/notallowed.php");
    } else {
        if (!(cekAddonPrivileges($idklien, $phpself))) header("Location: ".$url."/notallowed.php");
    }
}
?>