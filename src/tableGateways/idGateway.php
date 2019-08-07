<?php
class IdGateway {
    private $db = null;

    public function __construct($db) {
        $this->db = $db;
    }

    public function add_new_code($values) {
        $this->execute("insert into `code_ids` (`CodeID`, `Code`) values ('$values[0]', '$values[1]')");
    }

    public function update_code($values) {
        $this->execute("update `code_ids` set `Code` = '$values[1]' where `CodeID` = '$values[0]'");
    }

    public function get_code_by_id($id) {
        return $this->execute("select * from `code_ids` where CodeID = '$id'");
    }

    public function delete($id) {
        $this->execute("delete from `code_ids` where `CodeID` = '$id'");
    }

    public function execute($code) {
        $result = mysqli_query($this->db, $code);

        if ($result) {
            return $result;
        }
    }
}
?>
