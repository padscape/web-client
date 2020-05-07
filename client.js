// Code functions

createCode = (code, creator, libs) => {
    $.ajax({
        url: 'https://kouritis.ddns.net/code/',
        type: 'post',
        data: `Code=${code}&Creator=${creator}&Libraries=${libs}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    });
};

updateCode = (id, code, creator, libs) => {
    $.ajax({
        url: `https://kouritis.ddns.net/code/${id}`,
        type: 'put',
        data: `Code=${code}&Creator=${creator}&Libraries=${libs}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    });
};

deleteCode = id => {
    $.ajax({
        url: `https://kouritis.ddns.net/code/${id}`,
        type: 'delete'
    });
};

getCode = id => {
    $.ajax({
        url: `https://kouritis.ddns.net/code/${id}`,
        type: 'get',
        success: data => {
            console.log(data);
        }
    });
};

getCode = () => {
    $.ajax({
        url: `https://kouritis.ddns.net/code/`,
        type: 'get',
        success: data => {
            console.log(data);
        }
    });
};

// User functions

createUser = (username, password) => {
    $.ajax({
        url: 'https://kouritis.ddns.net/user/',
        type: 'post',
        data: `Username=${username}&Password=${password}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    });
};

updateUser = (id, username, password) => {
    $.ajax({
        url: `https://kouritis.ddns.net/user/${id}`,
        type: 'put',
        data: `Username=${username}&Password=${password}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
    });
};

deleteUser = id => {
    $.ajax({
        url: `https://kouritis.ddns.net/user/${id}`,
        type: 'delete'
    });
};

getUser = id => {
    $.ajax({
        url: `https://kouritis.ddns.net/user/${id}`,
        type: 'get',
        success: data => {
            console.log(data);
        }
    });
};

getUser = () => {
    $.ajax({
        url: `https://kouritis.ddns.net/user/`,
        type: 'get',
        success: data => {
            console.log(data);
        }
    });
};
