<?php
require "../bootstrap.php";
require "../src/controller/idController.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 600");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Authorization, content-type, user-agent");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if ($uri[1] !== 'code') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$codeId = null;
if (isset($uri[2])) {
    $codeId = (int) $uri[2];
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-With');
    }
    exit();
}

$controller = new IdController($connection, $requestMethod, $codeId);
$controller->process_request();
?>
