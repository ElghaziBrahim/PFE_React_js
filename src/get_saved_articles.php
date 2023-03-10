<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

try {
    $conn = new PDO("mysql:host=localhost;dbname=pfr", 'root', '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $req = $conn->prepare("select title from savedarticle where name_user=:name");
    $req->bindParam(':name', $data->name);
    $req->execute();
    $data_ = $req->fetchAll();
    $response =$data_;
    
    echo json_encode($response);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>