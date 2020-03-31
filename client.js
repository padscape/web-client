insertNewCode = (code, creator) => {
    const http = new XMLHttpRequest();
    http.open("POST", 'http://94.64.8.137:5520/code', true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(`Code=${code}&Creator=${creator}`);
}

updateCode = (id, code, creator) => {
    const http = new XMLHttpRequest();
    http.open("PUT", `http://94.64.8.137:5520/code/${id}`, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(`Code=${code}&Creator=${creator}`);
}

deleteCode = id => {
    const http = new XMLHttpRequest();
    http.open("DELETE", `http://94.64.8.137:5520/code/${id}`, true);
    http.send();
}

getCode = id => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) console.log(http.responseText);
    }

    http.open("GET", `http://94.64.8.137:5520/code/${id}`, true);
    http.send();
}

getCode = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) console.log(http.responseText);
    }

    http.open("GET", `http://94.64.8.137:5520/code`, true);
    http.send();
}
