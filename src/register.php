<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

try {
    $conn = new PDO("mysql:host=localhost;dbname=pfr", 'root', '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $req = $conn->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
    $req->bindParam(':name', $data->name);
    $req->bindParam(':email', $data->email);
    $req->bindParam(':password', $data->password);
    $req->execute();

    $response = array(
        "name" => $data->name,
        "email" => $data->email,
        // Add any additional user data you need to return here
    );
    echo json_encode($response);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>