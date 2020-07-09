let timeout;

navbarTransition = () => {
    let scroll  = $(window).scrollTop();

    if (scroll <= 150) {
        $('#navbar-custom').css('box-shadow', 'none');
    } else {
        $('#navbar-custom').css('box-shadow', 'rgba(0, 0, 0, 0.1) 0 0 10px');
    }
};

$(window).scroll(() => {
    clearTimeout(timeout);  
    timeout = setTimeout(() => {
        navbarTransition();
    }, 50);
});

$(document).ready(() => {
    navbarTransition();
});
