(function($) {
    "use strict";

    //Run function when document ready
    $(document).ready(function() {
        init_loader();
        init_chart();
        init_prettyphoto();
        init_team();
        init_testimonials();
        init_sponsorsslider();
        init_height();
        init_countdown();
        init_backtotop();


    });




    /*------------------------------------------*/
    /*           /*Nav Scroll Fix /*
    /*------------------------------------------*/


    $(window).on('scroll', function() {

        if ($(window).scrollTop() > 40) {
            $("nav.transparrent-bg").css({
                'background-color': '#fff',
                'border-bottom': '1px solid #eee'
            });
            $("nav.transparrent-bg .menuzord-menu > li > a").css({
                'padding-top': '40px',
                'color': '#333'
            });
            $("nav.transparrent-bg .menuzord-brand").css({
                'margin-top': '6px',
            });
            $("nav.transparrent-bg .right_mp_menu > ul > li > a").css({
                'padding-top': '40px',
                'color': '#333'
            });
            $("nav.navbar-fixed-top").addClass("nav_border");
            $(".changeable").attr("src", "img/logo.png");
        } else {
            $("nav.transparrent-bg").css({
                'background-color': 'transparent',
                'border': '1px solid transparent'
            });
            $("nav.transparrent-bg .menuzord-menu > li > a").css({
                'padding-top': '40px',
                'color': '#fff'
            });
            $("nav.transparrent-bg .menuzord-brand").css({
                'margin-top': '6px',
            });
            $("nav.transparrent-bg .right_mp_menu > ul > li > a").css({
                'padding-top': '40px',
                'color': '#fff'
            });
            $("nav.navbar-fixed-top").removeClass("nav_border");
            $(".changeable").attr("src", "img/logo-2.png");
        }


    });


    /*------------------------------------------*/
    /*           /*Menu /*
    /*------------------------------------------*/


    $("#menuzord").menuzord({
        align: "right",
        scrollable: true
    });


    /*------------------------------------------*/
    /*      /*. loader /*
    /*------------------------------------------*/

    function init_loader() {
            $("#loader").fadeOut("slow", function() {
                $("#preloader").delay(300).fadeOut("slow")
            })

        }
		
		

	
        /*------------------------------------------*/
        /*           /*.Skills Chart /*
        /*------------------------------------------*/

    function init_chart() {
            $(document).scroll(function() {
                var index = 0;
                var top = $('#skills').height() - $(window).scrollTop();
                console.log(top);
                if (top < -1200) {
                    if (index === 0) {
                        $('.chart').easyPieChart({
                            easing: 'easeOutBounce',
                            onStep: function(from, to, percent) {
                                $(this.el).find('.percent').text(Math.round(percent));
                            }
                        });
                    }
                    index++;
                }
            });

        }
		
		
        /*------------------------------------------*/
        /*      /*.  prettyphoto Lightbox /*
        /*------------------------------------------*/

    function init_prettyphoto() {
            $("a[class^='prettyphoto']").prettyPhoto();
            $("a[class^='work']").prettyPhoto();

        }

        /*------------------------------------------*/
        /*           /*.  Team /*
        /*------------------------------------------*/

    function init_team() {
        var slider = new MasterSlider();
        slider.setup('teamslider', {
            loop: true,
            width: 240,
            height: 240,
            speed: 20,
            view: 'focus',
            preload: 'all',
            space: 0,
            wheel: true
        });
        slider.control('arrows');
        slider.control('slideinfo', {
            insertTo: '#staff-info'
        });

        $('#myTab a').on(function(e) {
            e.preventDefault();
            $(this).tab('show');
        });

    }


    /*------------------------------------------*/
    /*         /*. Testimonials /*
    /*------------------------------------------*/

    function init_testimonials() {
            if ($('.testimonials-carousel').length) {
                $('.testimonials-carousel').owlCarousel({
                    loop: true,
                    margin: 60,
                    nav: true,
                    autoplayHoverPause: false,
                    autoplay: 5000,
                    smartSpeed: 700,
                    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 1
                        },
                        760: {
                            items: 2
                        },
                        1024: {
                            items: 3
                        },
                        1100: {
                            items: 3
                        }
                    }
                });
            }

        }
        /*------------------------------------------*/
        /*         /*. Sponsors Slider /*
        /*------------------------------------------*/
		

    function init_sponsorsslider() {

            if ($('.sponsors-slider').length) {
                $('.sponsors-slider').owlCarousel({
                    loop: true,
                    margin: 0,
                    nav: true,
                    smartSpeed: 500,
                    autoplay: 4000,
                    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        600: {
                            items: 2
                        },
                        800: {
                            items: 3
                        },
                        1200: {
                            items: 4
                        }
                    }
                });
            }

        }
        /*------------------------------------------*/
        /*           /*. full-heigh banner /*
        /*------------------------------------------*/


    function init_height() {
        $(".full-height").height($(window).height()),
            $(window).on("resize", function() {

                $(".full-height").height($(window).height())
            })
    }


  
    /*------------------------------------------*/
    /*           /*. Count Down /*
    /*------------------------------------------*/


    function init_countdown() {
        if ($(".count-down").length) {
            var year = parseInt($(".count-down").attr("data-countdown-year"), 10);
            var month = parseInt($(".count-down").attr("data-countdown-month"), 10) - 1;
            var day = parseInt($(".count-down").attr("data-countdown-day"), 10);
            $(".count-down").countdown({
                until: new Date(year, month, day),

                padZeroes: true
            });
        }
    }
	

  function startPlayback()
  {
    if (!video) {
      video = document.createElement('video');
      video.src = 'videos/girls.mp4';
      video.loop = true;
      video.addEventListener('playing', paintVideo);
    }
    video.play();
  }

  
    /*------------------------------------------*/
    /*           /*. Go to top /*
    /*------------------------------------------*/

    function init_backtotop() {
        if ($('#back-to-top').length) {
            var scrollTrigger = 100,
                backToTop = function() {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
            backToTop();
            $(window).on('scroll', function() {
                backToTop();
            });
            $('#back-to-top').on('click', function(e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 900);
            });
        }
    }

})(jQuery); // JavaScript Document

// JavaScript Document// JavaScript Document