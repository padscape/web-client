<?php
require __DIR__ . "/../tableGateways/idGateway.php";

class IdController {
    private $db;
    private $requestMethod;
    private $codeId;
    private $idGateway;

    public function __construct($db, $requestMethod, $codeId) {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->codeId = $codeId;
        $this->idGateway = new IdGateway($db);
    }

    public function process_request() {
        switch ($this->requestMethod) {
            case 'GET':
                $response = $this->get_code_by_id($this->codeId);
                break;
            case 'POST':
                $response = $this->make_new_code();
                break;
            case 'PUT':
                $response = $this->update_code_by_id($this->codeId);
                break;
            case 'DELETE':
                $response = $this->delete_code($this->codeId);
                break;
            default:
                $response = $this->not_found_error();
                break;
        }

        header($response['status_code_header']);

        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function not_found_error() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;

        return $response;
    }

    private function unprocessable_entity_response() {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode(['error' => 'Invalid input']);

        return $response;
    }

    private function get_code_by_id($id) {
        $result = $this->idGateway->get_code_by_id($id);

        if (!$result) {
            return $this->not_found_error();
        }

        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);

        return $response;
    }

    private function make_new_code() {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        if (!$this->validate($input)) {
            return $this->unprocessable_entity_response();
        }

        $this->idGateway->add_new_code($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;

        return $response;
    }

    private function update_code_by_id($id) {
        $result = $this->idGateway->get_code_by_id($id);

        if (!$result) {
            return $this->not_found_error();
        }

        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $this->idGateway->update_code($input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;

        return $response;
    }

    private function delete_code($id) {
        $result = $this->idGateway->get_code_by_id($id);
        if (!$result) {
            return $this->not_found_error();
        }

        $this->idGateway->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;

        return $response;
    }

    private function validate($input) {
        if (!isset($input['Code'])) {
            return false;
        }

        return true;
    }
}
?>
