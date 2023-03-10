<?php
$conn = new PDO("mysql:host=localhost;dbname=pfr", 'root', '');
$name = $_GET['name'];
$req = $conn->prepare('SELECT * FROM users where name=:name');
$req->bindParam(':name', $name);


$req->execute();
$data = $req->fetchAll();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$json = json_encode($data);
echo $json;
?>