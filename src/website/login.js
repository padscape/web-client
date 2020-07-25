$('#loginbtn').click(() => {
    $('.username, .password').parent().removeClass('alert-required');

    let valid = true;

    if (!$('.username').eq(0).val() || $('.username').eq(0).val().trim() === '') {
        $('.username').eq(0).parent().addClass('alert-required');
        valid = false;
    }

    if (!$('.password').eq(0).val() || $('.password').eq(0).val().trim() === '') {
        $('.password').eq(0).parent().addClass('alert-required');
        valid = false;
    }

    if (!valid) {
        return;
    }

    $.ajax({
        url: 'https://padscape.herokuapp.com/user/login/',
        type: 'post',
        data: `Username=${$('.username').eq(0).val()}&Password=${$('.password').eq(0).val()}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: data => {
            if (data.page === 'valid') {
                window.location.assign(`${window.location.protocol}//${window.location.host}`);
            }

            $('#invalid').css('display', 'block');
        }
    });
});

$('#signupbtn').click(() => {
    $('.username, .password, .email').parent().removeClass('alert-required');

    let valid = true;

    if (!$('.username').eq(1).val() || $('.username').eq(1).val().trim() === '') {
        $('.username').eq(1).parent().addClass('alert-required');
        valid = false;
    }

    if (!$('.password').eq(1).val() || $('.password').eq(1).val().trim() === '') {
        $('.password').eq(1).parent().attr('data-validate', 'Password is required.').addClass('alert-required');
        valid = false;
    } else if ($('.password').eq(1).val().length < 8) {
        $('.password').eq(1).parent().attr('data-validate', 'Password must be longer than 8 characters.').addClass('alert-required');
        valid = false;
    }

    if (!$('.email').val() || $('.email').val().trim() === '') {
        $('.email').parent().attr('data-validate', 'Email is required.').addClass('alert-required');
        valid = false;
    } else {
        let regex = /\S+@\S+\.\S+/;

        if (!regex.test($('.email').val())) {
            $('.email').parent().attr('data-validate', 'Invalid email.').addClass('alert-required');
            valid = false;
        }
    }

    if (!valid) {
        return;
    }

    $.ajax({
        url: 'https://padscape.herokuapp.com/user/signup/',
        type: 'post',
        data: `Username=${$('.username').eq(1).val()}&Password=${$('.password').eq(1).val()}&Email=${$('.email').val()}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: data => {
            if (data.id) {
                window.location.assign(`${window.location.protocol}//${window.location.host}`);
            } else {
                $('.username').eq(1).parent().attr('data-validate', data.page).addClass('alert-required');
            }
        }
    });
});

$('.js-tilt').tilt({
    scale: 1.1
});

openTab = id => {
    $('#signup-div, #login-div').css('display', 'none');
    $(id).css('display', 'block');
};

window.onhashchange = () => {
    openTab(`${window.location.hash}-div`);
};

window.onload = () => {
    openTab(`${window.location.hash}-div`);
};
