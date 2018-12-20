<?php
session_start();
include("../Functions.php");
include("../cekUser.php");
include("../DBConnectPDOH.php");

function getDaftarOutlet($idpengguna) {
    global $conn;
    $hasil = array();
    $q = $conn->prepare("SELECT * FROM `masteroutlet`");
    $q->execute();
    $jmloutlet = $q->rowCount();
    $q = $conn->prepare("SELECT a.IDOUTLET, b.NAMAOUTLET FROM `masterpengguna_outlet` a INNER JOIN masteroutlet b ON a.IDOUTLET = b.IDOUTLET WHERE a.IDPENGGUNA LIKE :idpengguna AND b.STATUSKEAKTIFAN = 1");
    $q->execute(array('idpengguna'=>$idpengguna));
    if ($q->rowCount() == $jmloutlet) $hasil[] = array('idoutlet'=>0,'namaoutlet'=>'Semua Outlet');
    while ($d = $q->fetch(PDO::FETCH_ASSOC)) {
        $hasil[] = array('idoutlet'=>$d['IDOUTLET'],'namaoutlet'=>$d['NAMAOUTLET']);
    }
    return $hasil;
}

header("Content-type:application/json");

$post = file_get_contents("php://input");
$req = json_decode($post);

if (isset($req->action)) {
    if ($req->action == 'UPDATE_SELECTED_OUTLET') {
        $outletnow = $outletsekarang;
        $selectedoutlet = $req->outlet;
        $found = false;
        foreach ($outlet as $o) {
            if ($o['IDOUTLET'] == $selectedoutlet) $found = true;
        }
        if ($found) $_SESSION['outletsekarang'] = $selectedoutlet; else $_SESSION['outletsekarang'] = $outletnow;
        echo json_encode(array('errcode'=>'OK'));
    }
    
    if ($req->action == 'GET_LIST_OUTLET') {
        $hasil = getDaftarOutlet($idpengguna);
        if (count($hasil) > 0) {
            echo json_encode(array('errcode'=>'OK','result'=>$hasil));
        } else {
            echo json_encode(array('errcode'=>'FAILED','msg'=>'No Active Outlet'));
        }
    }
    
    if ($req->action == 'GET_SELECTED_OUTLET') {
        echo json_encode(array('errcode'=>'OK','result'=>$outletsekarang));
    }
    
}
?>