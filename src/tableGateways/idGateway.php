<?php
class IdGateway {
    private $db = null;

    public function __construct($db) {
        $this->db = $db;
    }

    public function add_new_code($values) {
        $this->execute("insert into `code_ids` (`CodeID`, `Code`) values ('$values[CodeID]', '$values[Code]')");
    }

    public function update_code($values) {
        $this->execute("update `code_ids` set `Code` = '$values[Code]' where `CodeID` = '$values[CodeID]'");
    }

    public function get_code_by_id($id) {
        $result = $this->execute("select * from `code_ids` where CodeID = '$id'");
        $array = array();

        while($row = mysqli_fetch_assoc($result))
            $array[] = $row;

        return json_encode($array);
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
