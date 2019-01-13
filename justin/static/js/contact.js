$(document).ready(function () {
    $('textarea#message').characterCounter();

    $('select').formSelect();

    // $('select#connection > option:first-child').prop('readonly', true);
    $('select#connection > option:first-child')
        .attr("disabled", true);
        // .attr("selected", true);
});