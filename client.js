function insertNewCode(id, code) {
    const http = new XMLHttpRequest();

    http.open("POST", 'http://100.73.27.89:5520/code', true);
    http.send(JSON.stringify({"CodeID": id, "Code": code}));
}

function updateCode(id, code) {
    const http = new XMLHttpRequest();

    http.open("PUT", `http://100.73.27.89:5520/code/${id}`, true);
    http.send(JSON.stringify({"CodeID": id, "Code": code}));
}

function deleteCode(id) {
    const http = new XMLHttpRequest();

    http.open("DELETE", `http://100.73.27.89:5520/code/${id}`, true);
    http.send();
}

function getCode(id) {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) console.log(JSON.parse(JSON.parse(http.responseText).slice(1, -1)).Code);
    }

    http.open("GET", `http://100.73.27.89:5520/code/${id}`, true);
    http.send();
}

function getCode() {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) console.log(Number(JSON.parse(JSON.parse(http.responseText).slice(1, -1).split(',').pop()).CodeID) + 1);
    }

    http.open("GET", `http://100.73.27.89:5520/code`, true);
    http.send();
}
