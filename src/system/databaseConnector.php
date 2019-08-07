<?php
class DatabaseConnector {
    private $connection = null;

    public function __construct() {
        $dbhost = "localhost";
        $dbuser = "pij";
        $dbpass = "pij";
        $db = "padscape";
        $this->connection = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
    }

    public function getConnection() {
        return $this->connection;
    }
}
?>
