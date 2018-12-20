<?php
$host = 'localhost';
$dbname2 = 'aps';
$connStr2 = "mysql:host=$host;dbname=$dbname2";
$user2 = 'aps';
$pass2 = 'aps';

try{
        $conn2 = new PDO($connStr2, $user2, $pass2);
        $conn2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
        echo "Gagal tehubung dengan database : $e";
}

if (isset($dbklien)) {
    $dbname = $dbklien;
    $connStr = "mysql:host=$host;dbname=$dbname";

    try{
            $conn = new PDO($connStr, $user2, $pass2);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
            echo "Gagal tehubung dengan database : $e";
    }
}
?>
