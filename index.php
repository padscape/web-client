<?php
$conn = OpenCon();

//$query = "insert into `padscape` `code_ids` (`CodeID`, `Code`) values (2, '<html>phptest</html>')";
$query = "select * from code_ids";

Execute($query);
CloseCon($conn);

function OpenCon() {
    $dbhost = "localhost";
    $dbuser = "pij";
    $dbpass = "pij";
    $db = "padscape";
    $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);

    return $conn;
}

function CloseCon($conn) {
    $conn -> close();
}

function Execute($code) {
    global $conn;
    $result = mysqli_query($conn, $code);
    $row = mysqli_fetch_array($result);
    print_r($row);
}
?>
