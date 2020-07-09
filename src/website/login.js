$('#loginbtn').click(() => {
    $('.username').parent().removeClass('alert-required');
    $('.password').parent().removeClass('alert-required');

    let required = false;

    if (!$('.username').val() || $('.username').val().trim() === '') {
        $('.username').parent().addClass('alert-required');
        required = true;
    }

    if (!$('.password').val() || $('.password').val().trim() === '') {
        $('.password').parent().addClass('alert-required');
        required = true;
    }

    if (required) {
        return;
    }

    $.ajax({
        url: 'https://padscape.herokuapp.com/user/login/',
        type: 'post',
        data: `Username=${$('.username').val()}&Password=${$('.password').val()}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: data => {
            console.log(data.page)
            if (data.page === 'valid') {
                window.location.assign(window.location.hostname);
            }

            $('#invalid').css('display', 'block');
        }
    });
});

$('.js-tilt').tilt({
    scale: 1.1
});
