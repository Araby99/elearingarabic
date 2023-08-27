
$(document).ready(function () {

    // Top Nav
    $(".account-toggle").click(function () {
        $(".account-menu").toggle()
        return false;
    });


    $('#sidenav').simpleSidebar({
        settings: {
            opener: ".bt-menu-trigger",
            wrapper: "#wrapper",
        },
        sidebar: {
            align: "left",
            width: 220,
            closingLinks: "a",
            style: {
                zIndex: 100
            }
        },
        mask: {
            style: {
                backgroundColor: "grey",
                opacity: 0.9,
                filter: 'Alpha(opacity=90)'
            }
        }
    });


    $(".dropdown li").hover(function () {
        var dropDown = $(this).children("ul");
        var ulWidth = dropDown.width();
        var liWidth = $(this).width();
        var posLeft = 0;

        dropDown.css("left", posLeft);
    });

    $("ul.tabs").tabs("> .tabcontent", {
        tabs: 'li',
        effect: 'fade'
    });




    $(".toggle_content").hide();

    $(".toggle").toggle(function () {
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
    });

    $(".toggle").click(function () {
        $(this).next(".toggle_content").slideToggle(300, 'easeInQuad');
    });

    $(".table-price tr:even").addClass("even");

    // gallery
    $(".gl_col_2 .gallery-item::nth-child(2n)").addClass("nomargin");

    // pricing
    //	$(".table-pricing td.table-row-title:even").addClass("even");


});

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('.link-top').fadeIn();
        } else {
            $('.link-top').fadeOut();
        }
    });
    $('.link-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        },
            1500);
    });
});
