<?php

function getNamaKlien() {
    global $conn;
    global $idpengguna;
    $nama = '';
    $q = $conn->prepare("SELECT NAMAPENGGUNA FROM `masterpengguna` WHERE IDPENGGUNA LIKE :idpengguna");
    $q->execute(array('idpengguna'=>$idpengguna));
    $d = $q->fetch(PDO::FETCH_ASSOC);
    $nama = $d['NAMAPENGGUNA'];
    return $nama;
}

function GetIP() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
                $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
                $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
                $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
                $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
                $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
                $ipaddress = getenv('REMOTE_ADDR');
        else
                $ipaddress = 'UNKNOWN';

        return $ipaddress;
}

function randText( $type = 'alnum', $length = 10 ){
        switch ( $type ) {
                case 'alnum':
                        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        break;
                case 'alpha':
                        $pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        break;
                case 'caps':
                        $pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        break;
                case 'hexdec':
                        $pool = '0123456789abcdef';
                        break;
                case 'numeric':
                        $pool = '0123456789';
                        break;
                case 'nozero':
                        $pool = '123456789';
                        break;
                case 'distinct':
                        $pool = '2345679ACDEFHJKLMNPRSTUVWXYZ';
                        break;
                default:
                        $pool = (string) $type;
                        break;
        }

        $crypto_rand_secure = function ( $min, $max ) {
                $range = $max - $min;
                if ( $range < 1 ) return $min; // not so random...
                $log    = ceil(log( $range, 2 ));
                $bytes  = (int) ( $log / 8 ) + 1; // length in bytes
                $bits   = (int) $log + 1; // length in bits
                $filter = (int) ( 1 << $bits ) - 1; // set all lower bits to 1
                do {
                        $rnd = hexdec( bin2hex( openssl_random_pseudo_bytes( $bytes ) ) );
                        $rnd = $rnd & $filter; // discard irrelevant bits
                } while ( $rnd > $range );
                return $min + $rnd;
        };

        $token = "";
        $max   = strlen( $pool );
        for ( $i = 0; $i < $length; $i++ ) {
                $token .= $pool[$crypto_rand_secure( 0, $max - 1 )];
        }
        return $token;
}

function doLogin() {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $passc = hash('sha256',$password);
    $log_ip = GetIP();
    $token = randText('alnum', 200);
    include(__DIR__."/DBConnectPDOH.php");
    $ada=1;
    while ($ada == 1) { //agar token nya unik maka ulang terus sampai token nya blm ada dalam tabel token di aps
        $q = $conn2->prepare("SELECT COUNT(*) AS ADA FROM `token` WHERE token LIKE :token");
        $q->execute(array('token'=>$token));
        $d = $q->fetch(PDO::FETCH_ASSOC);
        $ada = $d['ADA'];
        $token = randText('alnum', 200);
    }
    $q = $conn2->prepare("SELECT DBKLIEN FROM `listlogin` WHERE EMAIL LIKE :email");
    $q->execute(array('email'=>$email));
    $row = $q->rowCount();
    if ($row > 0) {
        $d = $q->fetch(PDO::FETCH_ASSOC);
        $dbklien = $d['DBKLIEN'];
        $q = $conn2->prepare("SELECT STATUSKEAKTIFAN,PASSWORD FROM `$dbklien`.`masterpengguna` WHERE EMAIL LIKE :email");
        $q->execute(array('email'=>$email));
        if ($q->rowCount() > 0) {
            $d = $q->fetch(PDO::FETCH_ASSOC);
            $status = $d['STATUSKEAKTIFAN'];
            if ($status == '1') {
                $passdb = $d['PASSWORD'];
                if ($passc == $passdb){
                    $q = $conn2->prepare("INSERT INTO `token` (idowner,token,expired_time,is_active,log_ip) VALUES(:idowner,:token,DATE_ADD(NOW(), INTERVAL 1 DAY),1,:log_ip) ON DUPLICATE KEY UPDATE token = :token, expired_time = DATE_ADD(NOW(),INTERVAL 1 DAY), log_ip = :log_ip");
                    $q->execute(array('idowner'=>$email,'token'=>$token,'log_ip'=>$log_ip));
                    $_SESSION['aps_id'] = $token;
                    return array('errcode'=>'OK');
                } else {
                    return array('errcode'=>'FAILED','reason'=>"Password yang di input salah");
                }
            } else {
                return array('errcode'=>'FAILED','reason'=>"Email ($email) sudah tidak aktif");
            }
        } else {
            return array('errcode'=>'FAILED','reason'=>"Email ($email) tidak terdaftar sebagai pengguna");
        }
    } else {
        $q = $conn2->prepare("SELECT KONFIRMASI FROM `listdaftarsekarang` WHERE EMAIL LIKE :email");
        $q->execute(array('email'=>$email));
        if ($q->rowCount() > 0) {
            $d = $q->fetch(PDO::FETCH_ASSOC);
            $konfirmasi = $d['KONFIRMASI'];
            if ($konfirmasi == 1) {
                return array('errcode'=>'FAILED','reason'=>"Harap hubungi CS");
            } else {
                return array('errcode'=>'FAILED','reason'=>"Anda belum mengkonfirmasi email Anda ($email)");
            }
        } else {
            return array('errcode'=>'FAILED','reason'=>"Email ($email) belum terdaftar");
        }
    }
}

function doLogout() {
    if (isset($_SESSION['aps_id'])) {
        include("DBConnectPDOH.php");
        $token = $_SESSION['aps_id'];
        $q = $conn2->prepare("UPDATE `token` SET token='' WHERE token LIKE :token");
        $q->execute(array('token'=>$token));
        $_SESSION = array();
        session_destroy();
    }
}

function cekUser() {
    include("DBConnectPDOH.php");
    $hasil = false;
    if (isset($_SESSION['aps_id'])) {
        $token = $_SESSION['aps_id'];
        $lastpage = $_SERVER['PHP_SELF'];
        //cek siapa owner nya, apakah aktif atau sudah expired
        $q = $conn2->prepare("SELECT idowner FROM `token` WHERE token LIKE :token AND is_active=1 AND expired_time >= NOW()");
        $q->execute(array('token'=>$token));
        $row = $q->rowCount();
        if ($row > 0) {
            $d = $q->fetch(PDO::FETCH_ASSOC);
            $idowner = $d['idowner']; // email login
            $q = $conn2->prepare("SELECT DBKLIEN,IDKLIEN FROM `listlogin` WHERE EMAIL LIKE :idowner LIMIT 1");
            $q->execute(array('idowner'=>$idowner));
            $row = $q->rowCount();
            if ($row > 0) {
                $d = $q->fetch(PDO::FETCH_ASSOC);
                $dbklien = $d['DBKLIEN'];
                $idklien = $d['IDKLIEN'];

                $q = $conn2->prepare("UPDATE `token` SET last_page = :lastpage WHERE token LIKE :token");
                $q->execute(array('lastpage'=>$lastpage,'token'=>$token));

                $q = $conn2->prepare("SELECT IDPENGGUNA,FOTO,NAMAPENGGUNA FROM `$dbklien`.`masterpengguna` WHERE EMAIL LIKE :idowner AND STATUSKEAKTIFAN = 1");
                $q->execute(array('idowner'=>$idowner));
                $row2 = $q->rowCount();
                if ($row2 > 0) {
                    $d = $q->fetch(PDO::FETCH_ASSOC);
                    $idpengguna = $d['IDPENGGUNA'];
                    $fotopengguna = 'https://www.autopilotstore.co.id/media/foto/'.$idklien.'/'.$d['FOTO'];
                    $namapengguna = $d['NAMAPENGGUNA'];
                    
                    $q = $conn2->prepare("SELECT a.IDOUTLET,b.NAMAOUTLET FROM `$dbklien`.`masterpengguna_outlet` a INNER JOIN `$dbklien`.`masteroutlet` b ON a.IDOUTLET=b.IDOUTLET WHERE a.IDPENGGUNA = :idpengguna AND b.STATUSKEAKTIFAN = 1 ORDER BY a.IDOUTLET");
                    $q->execute(array('idpengguna'=>$idpengguna));
                    $jumlahoutlet = $q->rowCount();
                    $outlet = $q->fetchAll(PDO::FETCH_ASSOC);
                    $outletdefault = $outlet[0]['IDOUTLET'];
                    
                    $q = $conn2->prepare("SELECT COUNT(*) AS JML FROM `$dbklien`.`masteroutlet`");
                    $q->execute();
                    $d = $q->fetch(PDO::FETCH_ASSOC);
                    if ($d['JML'] == $jumlahoutlet) {
                        $semuaoutlet = array('IDOUTLET'=>'0','NAMAOUTLET'=>'Semua Outlet');
                        array_unshift($outlet,$semuaoutlet);
                    }

                    $hasil = array('dbklien'=>$dbklien,'idklien'=>$idklien,'idpengguna'=>$idpengguna,'idowner'=>$idowner,'foto'=>$fotopengguna,'namapengguna'=>$namapengguna,'outlet'=>$outlet,'outletdefault'=>$outletdefault);
                    $reason = "OK";
                } else {
                    doLogout();
                    $hasil = false;
                    $reason = "User not Active";
                }
            } else {
                doLogout();
                $hasil = false;
                $reason = "Not Allowed to Login";
            }
        } else {
            doLogout();
            $hasil = false;
            $reason = "Token Invalid";
        }
    } else {
        $hasil = false;
        $reason = "Session Invalid";
    }
    return array('hasil'=>$hasil,'reason'=>$reason);
}

function has_child($parentid) {
    global $conn2;
    $q = $conn2->prepare("SELECT COUNT(*) AS ADA FROM `bo_menus` WHERE is_active=1 AND parent_id = :parentid");
    $q->execute(array('parentid'=>$parentid));
    $d = $q->fetch(PDO::FETCH_ASSOC);
    $ada = $d['ADA'];
    if ($ada > 0) return true; else return false;
}

function has_parent($menuid) {
    global $conn2;
    $q = $conn2->prepare("SELECT parent_id FROM `bo_menus` WHERE is_active=1 AND menu_id = :menuid");
    $q->execute(array('menuid'=>$menuid));
    $d = $q->fetch(PDO::FETCH_ASSOC);
    $parentid = $d['parent_id'];
    if ($parentid == 0) return false; else return true;
}

function get_bo_menus($parentid=0,$activeurl='dashboard.php') {
    global $conn2;
    global $idklien;
    global $idpengguna;
    $menu = '';
    if ($parentid == 0) $orderby = "menu_id"; else $orderby = "page_title";
    $q = $conn2->prepare("SELECT * FROM `bo_menus` WHERE is_active = 1 AND parent_id = :parentid ORDER BY $orderby");
    $q->execute(array('parentid'=>$parentid));
    while ($d = $q->fetch(PDO::FETCH_ASSOC)) {
        $menuname = $d['menu_name'];
        $url = $d['url'];
        $class = 'nav-item';
        if ($url == $activeurl) $activeclass = " active"; else $activeclass = '';
        if ($menuname == "Dashboard") $menuname = "<span>$menuname</span>";
        $icon = $d['icon_class'];
        $parentidnew = $d['menu_id'];
        if ((cekPrivileges($idpengguna, $url)) && (cekAddonPrivileges($idklien, $url))) {
            if ($parentidnew != 30){
                if ($icon != '') $icon = "<i class='$icon'></i>";
                if (has_child($parentidnew)) {
                    $class .= ' nav-item-submenu';
                    $menu .= "<li class='$class'><a href='$url' class='nav-link$activeclass' >$icon"."<span>$menuname</span></a>";
                    $menu .= "<ul class='nav nav-group-sub' data-submenu-title='$menuname'>".get_bo_menus($parentidnew,$activeurl)."</ul>";
                } else {
                    $menu .= "<li class='$class'><a href='$url' class='nav-link$activeclass'>$icon"."<span>$menuname</span></a>";
                }
                $menu .= "</li>";
            } else {
                if (($idklien == 8) || ($idklien == 374)) {
                    if ($icon != '') $icon = "<i class='$icon'></i>";
                    if (has_child($parentidnew)) {
                        $class .= ' nav-item-submenu';
                        $menu .= "<li class='$class'><a href='$url' class='nav-link$activeclass'>$icon"."<span>$menuname</span></a>";
                        $menu .= "<ul class='nav nav-group-sub' data-submenu-title='$menuname'>".get_bo_menus($parentidnew,$activeurl)."</ul>";
                    }
                    $menu .= "</li>";
                } else {
                    //return $menu;
                }
            }
        }
    }
    return $menu;ini_set('display_errors',1);
}

function get_breadcrumb($url) {
    global $conn2;
    $breadcrumb = '';
    $q = $conn2->prepare("SELECT * FROM `bo_menus` WHERE url LIKE :url");
    $q->execute(array('url'=>$url));
    $d = $q->fetch(PDO::FETCH_ASSOC);
    $parentid = $d['parent_id'];
    $menuname = $d['menu_name'];
    $root = 0;
    $iterate = 0;
    while ($root == 0) {
        if ($iterate == 0) {
            $breadcrumb = "<li>" . $menuname . "</li>" . $breadcrumb;
        } else {
            if ($url != '#') $ahref = "<a href='".$url."'>".$menuname."</a>"; else $ahref = $menuname;
            $breadcrumb = "<li>".$ahref."</li>" . $breadcrumb;
        }
        $q = $conn2->prepare("SELECT * FROM `bo_menus` WHERE menu_id = :parentid");
        $q->execute(array('parentid'=>$parentid));
        $d = $q->fetch(PDO::FETCH_ASSOC);
        $parentid = $d['parent_id'];
        $url = $d['url'];
        $menuname = $d['menu_name'];
        if ($parentid == -1) {
            $breadcrumb = "<li><a href='index.php'><i class='icon-home2 position-left'></i>Home</a></li>" . $breadcrumb;
            $root = 1;
        }
        $iterate++;
    }
    return $breadcrumb;
}

function getPHPSelf() {
    $phpself = $_SERVER['SCRIPT_FILENAME'];
    $test = explode(".", $phpself);
    $extension = $test[1];
    $test2 = explode("/",$test[0]);
    $count = count($test2);
    $file = $test2[$count-1];
    return $file.".".$extension;
}

function cekPrivileges($idpengguna,$phpself) {
    global $conn;
    global $conn2;

    $q = $conn->prepare("SELECT IDKATEGORIPENGGUNA FROM `masterpengguna` WHERE IDPENGGUNA = :idpengguna");
    $q->execute(array('idpengguna'=>$idpengguna));
    $d = $q->fetch(PDO::FETCH_ASSOC);
    $idkategori = $d['IDKATEGORIPENGGUNA'];

    $q = $conn2->prepare("SELECT is_active,SINKRONFIELD FROM `bo_menus` WHERE url LIKE :phpself");
    $q->execute(array('phpself'=>$phpself));
    if ($q->rowCount() < 1) {
        return true;
    } else {
        $d = $q->fetch(PDO::FETCH_ASSOC);
        $isactive = $d['is_active'];
        $sinkronfield = $d['SINKRONFIELD'];

        if ($sinkronfield == '') return true;

        if ($isactive == 0) return false;

        $q = $conn->prepare("SELECT $sinkronfield AS BOLEH FROM `masterkategoripengguna` WHERE IDKATEGORIPENGGUNA = :idkategori");
        $q->execute(array('idkategori'=>$idkategori));
        if ($q->rowCount() > 0) {
            $d = $q->fetch(PDO::FETCH_ASSOC);
            $isallowed = $d['BOLEH'];
        } else {
            $isallowed = 0;
        }

        if ($isallowed == 1) return true; else return false;
    }
}

function cekAddonPrivileges($idklien,$phpself) {
    global $conn2;
    $q = $conn2->prepare("SELECT TIPEADDON FROM `bo_menus` WHERE url LIKE :phpself");
    $q->execute(array('phpself'=>$phpself));
    
    if ($q->rowCount() < 1) {
        return true;
    } else {
    
        $d = $q->fetch(PDO::FETCH_ASSOC);
        $tipeaddon = $d['TIPEADDON'];

        if ($tipeaddon == '0') return true;

        $q = $conn2->prepare("SELECT COUNT(*) AS BOLEH FROM `masterklienaddon` a INNER JOIN `masteraddon` b ON a.IDADDON = b.IDADDON WHERE a.IDKLIEN = :idklien AND b.TIPE = :tipeaddon");
        $q->execute(array('idklien'=>$idklien,'tipeaddon'=>$tipeaddon));
        $d = $q->fetch(PDO::FETCH_ASSOC);
        $boleh = $d['BOLEH'];

        if ($boleh > 0) return true; else return false;
    }
}

function isDemo($idklien,$phpself) {
    global $conn2;
    $hasil = false;
    
    if (($idklien == '3') || ($idklien == '4') || ($idklien == '5') || ($idklien == '6') ) {
        if ( ($phpself == 'transfer_produk.php') || ($phpself == 'daftar_produk.php') || ($phpself == 'apsonline_setting.php') || ($phpself == 'profil_owner.php') || ($phpself == 'profil_outlet.php') ) {
            $hasil = true;
        }
    }
    return $hasil;
}
?>
