$('#accountbtn').click(() => {
    $.ajax({
        url: 'https://padscape.herokuapp.com/user/activate/',
        type: 'post',
        data: `Activation=${$('.input1').val()}`,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: data => {
            if (data.valid === 'true') {
                window.location.assign(`${window.location.protocol}//${window.location.host}`);
            } else {
                $('#invalid').val('Invalid activation code');
            }
        }
    });
});