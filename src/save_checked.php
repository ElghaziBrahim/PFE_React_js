<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

try {
    $conn = new PDO("mysql:host=localhost;dbname=pfr", 'root','');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    foreach ($data->data_selected  as $value) {
        $req = $conn->prepare("INSERT INTO savedarticle (title,name_user) VALUES (:title,:name)");
        $req->bindParam(':title', $value);
        $req->bindParam(':name', $data->name_user);
        $req->execute();
    }


} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>