<?php
$conn = open_con();
close_con($conn);

function add_new_code($values) {
    $result = execute("insert into `code_ids` (`CodeID`, `Code`) values (" . $values[0] . ", '" . $values[1] ."')");
}

function get_code_by_id($id) {
    return mysqli_fetch_array(execute("select * from `code_ids` where CodeID=" . $id));
}

function open_con() {
    $dbhost = "localhost";
    $dbuser = "pij";
    $dbpass = "pij";
    $db = "padscape";
    $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);

    return $conn;
}

function close_con($conn) {
    $conn -> close();
}

function execute($code) {
    global $conn;
    $result = mysqli_query($conn, $code);

    return $result;
}
?>
