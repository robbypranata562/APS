<?php
session_start();
include("Functions.php");
doLogout();
header("Location: https://development.autopilotstore.co.id/login.php?err=You Have Been Logged Out!");
?>
