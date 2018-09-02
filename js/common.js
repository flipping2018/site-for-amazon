$(document).ready(function () {

    var width = $(window).width();
    var height = $(window).height();
    $(window).resize(function () {
        width = $(window).width();
        height = $(window).height();
    });

    //Всплывашка
    $(".fancybox").fancybox({
        autoSize: true,
        padding: 0,
        fixed: false,
        autoCenter: false,
        afterClose: function () {
            $("#video").html('');
        }
    });

    //Анимация
    $(".s_trigers .item .icon").animated("zoomIn");

    //анимация при прокрутке
    function animationScroll(section, block, animation) {

        if ($(section).length != "0") {
            $(window).on("scroll load resize", function () {
                var section_top = $(section).offset().top;
                var w_top = $(window).scrollTop();
                var w_height = $(window).height();
                var top_offset_height = w_height / 100 * 30;

                if (w_top + top_offset_height >= section_top) {
                    $(section + " " + block).addClass(animation + " animated").css("opacity", "1");
                }
            });
        }
    }

    animationScroll(".s_models", ".item", "zoomIn");
    animationScroll(".s_coach", ".fact", "zoomIn");

    //определям какое устройство
    var device = $("html").attr("class");
    if (device.indexOf("desktop") != -1) {
        $(".link_mobile").css("display", "none");
    } else {
        $(".link_desktop").css("display", "none");
    }

    $(".btn_not_active").click(function (event) {
        event.preventDefault();
        return false;
    });

    //видео
    $('.video_play').not(".fancybox").click(function (e) {
        e.preventDefault();
        var video_link = $(this).data('src');
        $(this).find(".iframe").html('<iframe src="' + video_link + '"frameborder="0" allowfullscreen></iframe>');
        $(this).addClass("active");
    });
    //видео в popup
    $('.video_play.fancybox').click(function (e) {
        e.preventDefault();
        var video_link = $(this).data('src');
        $("#video").html('<iframe src="' + video_link + '"frameborder="0" allowfullscreen></iframe>');
    });

    //рассчет цены
    setPrice();
    $("#curs input[name='curs']").on("change", function () {
        setPrice()
    });

    function setPrice() {
        var countSelected = $("#curs input[name='curs']:checked").length,
            price = 0,
            price_old = 0;
        if (countSelected) {
            price = $('.prices-block').data('price' + countSelected);
            price_old = $('.prices-block').data('priceold' + countSelected);
        }
        $("#curs .price_old span").html(price_old);
        $("#curs .price span").html(price);
    }


    //faq
    $('.faq h4').click(function (e) {
        e.preventDefault();
        var faq = $(this).parents(".faq");
        var item = $(this).parents('.item');
        if (item.hasClass('active')) {
            $('.desc', item).slideUp(400, function () {
                $(item).removeClass('active');
            });
        } else {
            $('.item.active .desc', faq).slideUp(400);
            $('.desc', item).slideDown(400);
            $('.item.active', faq).removeClass('active');
            $(item).addClass('active');
        }
    });

    //переключатель
    $(".tabs .tab").click(function () {
        var tabs = $(this).parents(".tab_wrap");
        $(".tabs > .tab", tabs).removeClass("active").eq($(this).index()).addClass("active");
        $(".tab_content > .tab_item", tabs).hide().eq($(this).index()).fadeIn();
    });

    //слайдер
    $(".s_review .carousel").owlCarousel({
        loop: true,
        items: 7,
        smartSpeed: 300,
        nav: true,
        dots: false,
        navText: '',
        responsive: {
            0: {
                items: 1,
                margin: 30
            },
            750: {
                items: 7
            },
            1000: {
                items: 7
            }
        }
    });
    function review_carousel(middle_item) {
        $('.s_review .carousel').find('.owl-item').removeClass("middle middle2 middle3 middle4");
        $('.s_review .carousel').find('.owl-item.active').eq(middle_item).addClass("middle");
        $('.s_review .carousel').find('.owl-item.active').eq(middle_item - 1).addClass("middle2");
        $('.s_review .carousel').find('.owl-item.active').eq(middle_item + 1).addClass("middle2");
        $('.s_review .carousel').find('.owl-item.active').eq(middle_item - 2).addClass("middle3");
        $('.s_review .carousel').find('.owl-item.active').eq(middle_item + 2).addClass("middle3");
        $('.s_review .carousel').find('.owl-item.active').eq(middle_item - 3).addClass("middle4");
        $('.s_review .carousel').find('.owl-item.active').eq(middle_item + 3).addClass("middle4");
    }

    review_carousel(3);

    $('.s_review .carousel').on('translated.owl.carousel', function (e) {
        var ths = $('.s_review .carousel');
        ths.find('.owl-item').removeClass("middle middle2 middle3 middle4");
        var item = ths.find('.owl-item.active').length;
        review_carousel(3);
    });
    $('.s_review .owl-prev').click(function () {
        var ths = $('.s_review .carousel');
        ths.find('.owl-item').removeClass("middle middle2 middle3 middle4");
        var item = ths.find('.owl-item.active').length;
        review_carousel(2);
    });
    $('.s_review .owl-next').click(function () {
        var ths = $('.s_review .carousel');
        ths.find('.owl-item').removeClass("middle middle2 middle3 middle4");
        var item = ths.find('.owl-item.active').length;
        review_carousel(4);
    });

    //скролл к блоку
    $(".scroll").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});