insertNewCode = (code, creator, libs) => {
    $.ajax({
        url: 'https://kouritis.ddns.net/code/',
        type: 'post',
        data: `Code=${code}&Creator=${creator}&Libraries=${libs}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    });
}

updateCode = (id, code, creator, libs) => {
    $.ajax({
        url: `https://kouritis.ddns.net/code/${id}`,
        type: 'put',
        data: `Code=${code}&Creator=${creator}&Libraries=${libs}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    });
}

deleteCode = id => {
    $.ajax({
        url: `https://kouritis.ddns.net/code/${id}`,
        type: 'delete'
    });
}

getCode = id => {
    $.ajax({
        url: `https://kouritis.ddns.net/code/${id}`,
        type: 'get',
        success: data => {
            console.log(data);
        }
    });
}

getCode = () => {
    $.ajax({
        url: `https://kouritis.ddns.net/code/`,
        type: 'get',
        success: data => {
            console.log(data);
        }
    });
}
