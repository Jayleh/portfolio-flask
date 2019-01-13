$(document).ready(function () {
    // declare variable
    let scrollTop = $(".scroll-top > a");

    // Click event to scroll to top
    $(scrollTop).click(function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutCubic');
        return false;

    }); // click() scroll top END
});