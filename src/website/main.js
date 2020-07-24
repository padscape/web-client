let timeout;

navbarTransition = () => {
    let scroll  = $(window).scrollTop();

    if (scroll <= 150) {
        $('#navbar-custom').css('box-shadow', 'none');
    } else {
        $('#navbar-custom').css('box-shadow', 'rgba(0, 0, 0, 0.1) 0 0 10px');
    }
};

fixSizes = () => {
    let fullHeight = $('.full1')[0].offsetHeight;
    fullHeight = Math.max(fullHeight, window.innerHeight);
    $('.full1').css('height', `${fullHeight}px`);
    let offset = fullHeight / window.innerHeight * 100 - 10;
    $('.down-btn').css({'top': `${offset}%`, 'transform': `translate(-50%, -${offset}%)`});
    console.log(offset)
}

$(window).scroll(() => {
    clearTimeout(timeout);  
    timeout = setTimeout(() => {
        navbarTransition();
    }, 50);
});

window.onresize = fixSizes;

$(document).ready(() => {
    navbarTransition();
    fixSizes();
});
