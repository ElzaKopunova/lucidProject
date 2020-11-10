$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        arrows: false
    })
    $('.slider').on('wheel', (function(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            $(this).slick('slickNext');
        } else{
            $(this).slick('slickPrev');
        }
    }))
})