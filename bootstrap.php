<?php
require 'src/system/databaseConnector.php';

$connection = (new DatabaseConnector())->getConnection();
?>
