jQuery(
    (function($) {
        "use strict";
        $(".mean-menu").meanmenu({ meanScreenWidth: "1199" });
        $(window).on("scroll", function() {
            $(window).scrollTop() >= 200 ? $(".main-navbar-area").addClass("stickyadd") : $(".main-navbar-area").removeClass("stickyadd");
        });
        $("#languageButton").on("click", function(e) {
            $(".language > .menu").toggle();
            e.preventDefault();
        });
        $("#control li").on("click", function() {
            $(this).addClass("active").siblings().removeClass("active");
        });
        $(".youtube-popup").magnificPopup({ disableOn: 320, type: "iframe", mainClass: "mfp-fade", removalDelay: 160, preloader: false, fixedContentPos: false });
        $("#searchButton").magnificPopup({
            removalDelay: 500,
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = this.st.el.attr("data-effect");
                },
            },
            midClick: true,
        });
        $(".banner-slider").owlCarousel({
            loop: true,
            margin: 0,
            items: 1,
            dots: false,
            dotsContainer: "#owl-custom-dots",
            nav: true,
            navText: ["<i class='bx bxs-chevron-left'></i>", "<i class='bx bxs-chevron-right'></i>"],
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 8500,
            smartSpeed: 450,
        });
        var bannerSlider = $(".banner-slider");
        $(".owl-dot").click(function() {
            bannerSlider.trigger("to.owl.carousel", [$(this).index(), 300]);
        });
        $(".banner-slider-two").owlCarousel({
            loop: true,
            margin: 0,
            items: 1,
            dots: false,
            nav: true,
            navText: ["<i class='bx bxs-chevron-left'></i>", "<i class='bx bxs-chevron-right'></i>"],
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 8500,
            smartSpeed: 1000,
        });
        $(".banner-slider-three").owlCarousel({
            loop: true,
            margin: 0,
            items: 1,
            dots: false,
            nav: true,
            navText: ["<i class='bx bxs-chevron-left'></i>", "<i class='bx bxs-chevron-right'></i>"],
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 8500,
            smartSpeed: 1000,
        });
        $(".testimonial-slider").owlCarousel({
            loop: true,
            nav: true,
            navText: ["<i class='bx bx-left-arrow-alt'></i>", "<i class='bx bx-right-arrow-alt'></i>"],
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 8500,
            smartSpeed: 450,
            items: 1,
        });
        $(".tours-slider").owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            navText: ["<i class='bx bxs-chevron-left'></i>", "<i class='bx bxs-chevron-right'></i>"],
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 8500,
            smartSpeed: 450,
            responsiveClass: true,
            responsive: { 0: { items: 1, margin: 10 }, 768: { items: 2 }, 991: { items: 3 } },
        });
        $("body").append("<div class='go-top'><i class='bx bx-up-arrow-alt'></i></div>");
        $(window).on("scroll", function() {
            var scrolled = $(window).scrollTop();
            if (scrolled > 600) $(".go-top").addClass("active");
            if (scrolled < 600) $(".go-top").removeClass("active");
        });
        $(".go-top").on("click", function() {
            $("html, body").animate({ scrollTop: "0" }, 500);
        });

        var startDate = new Date();
        var day = 60 * 60 * 24 * 1000;
        var startDate = new Date(startDate.getTime() + day);

        $(".date-select").datepicker({ format: "yyyy-mm-dd", minDate: startDate, startDate: startDate, autoclose: true });
        $("#multi_departure2").datepicker({ minDate: startDate, startDate: startDate, format: "yyyy-mm-dd", autoclose: true });
        $("#multi_departure1").on('change', function() {
            var newDate = this.value
            $("#multi_departure2").datepicker("destroy");
            $("#multi_departure2").val("");
            var startDate = new Date(newDate);
            var day = 60 * 60 * 24 * 1000;
            var startDate = new Date(startDate.getTime() + day);
            console.log(startDate);
            console.log(startDate);
            $("#multi_departure2").datepicker({ minDate: startDate, startDate: startDate, format: "yyyy-mm-dd" });
        })

        function makeTimer() {
            var endTime = new Date("September 20, 2021 17:00:00 PDT");
            var endTime = Date.parse(endTime) / 1000;
            var now = new Date();
            var now = Date.parse(now) / 1000;
            var timeLeft = endTime - now;
            var days = Math.floor(timeLeft / 86400);
            var hours = Math.floor((timeLeft - days * 86400) / 3600);
            var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
            var seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);
            if (hours < "10") {
                hours = "0" + hours;
            }
            if (minutes < "10") {
                minutes = "0" + minutes;
            }
            if (seconds < "10") {
                seconds = "0" + seconds;
            }
            $("#days").html(days + "<span>Days</span>");
            $("#hours").html(hours + "<span>Hours</span>");
            $("#minutes").html(minutes + "<span>Minutes</span>");
            $("#seconds").html(seconds + "<span>Seconds</span>");
        }
        setInterval(function() {
            makeTimer();
        }, 0);
        // $("select").niceSelect();
        // $(".filtr-container").filterizr();
        // $("#dob").datepicker({ format: "yyyy-mm-dd", changeMonth : true,changeYear : true,yearRange: '-100y:c+nn',maxDate: '-1d'});
        $(function() {
            var day = 60 * 60 * 24 * 1000;
            var startDate = new Date();
            var dateNow = new Date(startDate.getTime());
            var dateTomorrow = new Date(startDate.getTime() + day);
            let check_val = true;
            if ($('#hote_range_datepicker').val() != '') {
                check_val = false;
            }
            $('#hote_range_datepicker').daterangepicker({
                opens: 'left',
                minDate: dateNow,
                endDate: dateTomorrow,
                locale: {
                    format: 'YYYY-MM-DD',
                    separator: " To "
                }
            });

            // $('#hote_range_datepicker').on('change', function() {
            //     alert('Hello gaiutam')
            //     $('#hote_range_datepicker').daterangepicker({
            //         opens: 'left',
            //         minDate: dateNow,
            //         endDate: dateNow,
            //         autoUpdateInput: true,
            //         locale: {
            //             format: 'YYYY-MM-DD',
            //             separator: " To "
            //         }
            //     });
            // });



        });

        $(".newsletter-form")
            .validator()
            .on("submit", function(event) {
                if (event.isDefaultPrevented()) {
                    formErrorSub();
                    submitMSGSub(false, "Invalid E-mail.");
                } else {
                    event.preventDefault();
                }
            });

        function callbackFunction(resp) {
            if (resp.result === "success") {
                formSuccessSub();
            } else {
                formErrorSub();
            }
        }

        function formSuccessSub() {
            $(".newsletter-form")[0].reset();
            submitMSGSub(true, "Thank you for subscribing!");
            setTimeout(function() {
                $("#validator-newsletter").addClass("hide");
            }, 4000);
        }

        function formErrorSub() {
            $(".newsletter-form").addClass("animated shake");
            setTimeout(function() {
                $(".newsletter-form").removeClass("animated shake");
            }, 1000);
        }

        function submitMSGSub(valid, msg) {
            if (valid) {
                var msgClasses = "validation-success";
            } else {
                var msgClasses = "validation-danger";
            }
            $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
        }
        $(".newsletter-form").ajaxChimp({ url: "https://hibootstrap.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", callback: callbackFunction });
        $(window).on("load", function(e) {
            $("#loading")
                .delay(100)
                .queue(function() {
                    $(this).remove();
                });
        });
    })(jQuery)
);