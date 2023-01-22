$(document).ready(function(){

    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').slideDown("fast", "swing");
    });

    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').slideUp("fast", "swing");
    });
});
