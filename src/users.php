<?php
$conn = new PDO("mysql:host=localhost;dbname=pfr", 'root', '');

$req = $conn->prepare('SELECT * FROM users');


$req->execute();
$data = $req->fetchAll();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$json = json_encode($data);
echo $json;
?>