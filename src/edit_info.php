<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

try {
    $conn = new PDO("mysql:host=localhost;dbname=pfr", 'root', '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $req = $conn->prepare("UPDATE users SET  email=:email, address=:address, facebook=:facebook, twitter=:twitter WHERE name=:name");
    $req->bindParam(':name', $data->name);
    $req->bindParam(':email', $data->email);
    $req->bindParam(':address', $data->address);
    $req->bindParam(':facebook', $data->facebook);
    $req->bindParam(':twitter', $data->twitter);
    $req->execute();
    $response = array(
        "email" => $data->email,
        "address" => $data->address,
        "facebook" => $data->facebook,
        "twitter" => $data->twitter,
    );
    echo json_encode($response);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>