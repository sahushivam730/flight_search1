"use strict";

// *** General Variables *** //
var $window = $(window),
	$document = $(document),
	$this = $(this),
	$html = $("html"),
	$body = $("body");


// *** On ready *** //
$document.on("ready", function () {
	responsiveClasses();
	imageBG();
	fitVideos();
	lightboxImage();
	lightboxGallery();
	lightboxIframe();
	onePageNav();
	scrollToAnchor();
	stickyHeaderBar();
	sliderBanner();
	sliderServices2();
	sliderTopDestinations();
	sliderPopularPackages();
	sliderTestimonials();
	sliderInstagramFeed();
	sliderPriceRange();
	bannerTabs();
	hotelInfoTabs();
	sliderRelatedPosts();
	sliderAirfaresCalender();
	sliderHotelPreview();
	sliderPostPrevNext();
	languageSelect();
	countrySelect();
	itemClickCounter();
	formDatepicker();
	dropdownPassengers();
	multipleDestinations();
	sliderFeaturedCars();
	optionsSelect2();
	formLabelStyle1();
	menuMain();
	mobileMenuSidePanel();
	mobileMenu();
	sliderImageBG();
	optimizeSliderImageBG();	
	sectionParallaxImageBG();
	bannerParallaxImageBG();
});


// *** On load *** //
$window.on("load", function () {
	websiteLoading();
	popupRegister();
	popupLogin();
	popupLanguageChoice();

})

	// *** On resize *** //
	.on("resize", function () {
		responsiveClasses();
		bannerTabs();
		hotelInfoTabs();
	})

	// *** On scroll *** //
	.on("scroll", function () {
		scrollTopIcon();
		stickyHeaderBar();
	});



// *** Responsive Classes *** //
function responsiveClasses() {
	var jRes = jRespond([
		{
			label: "smallest",
			enter: 0,
			exit: 479
		}, {
			label: "handheld",
			enter: 480,
			exit: 767
		}, {
			label: "tablet",
			enter: 768,
			exit: 991
		}, {
			label: "laptop",
			enter: 992,
			exit: 1199
		}, {
			label: "desktop",
			enter: 1200,
			exit: 10000
		}
	]);
	jRes.addFunc([
		{
			breakpoint: "desktop",
			enter: function () { $body.addClass("device-lg"); },
			exit: function () { $body.removeClass("device-lg"); }
		}, {
			breakpoint: "laptop",
			enter: function () { $body.addClass("device-md"); },
			exit: function () { $body.removeClass("device-md"); }
		}, {
			breakpoint: "tablet",
			enter: function () { $body.addClass("device-sm"); },
			exit: function () { $body.removeClass("device-sm"); }
		}, {
			breakpoint: "handheld",
			enter: function () { $body.addClass("device-xs"); },
			exit: function () { $body.removeClass("device-xs"); }
		}, {
			breakpoint: "smallest",
			enter: function () { $body.addClass("device-xxs"); },
			exit: function () { $body.removeClass("device-xxs"); }
		}
	]);
}


// *** RTL Case *** //
var HTMLDir = $("html").css("direction"),
	carouselRtl,
	selectRtl,
	slickDirection;

// If page is RTL
if (HTMLDir == "rtl") {
	$("body").addClass("direction-rtl");
	
	carouselRtl = true;
	selectRtl = "rtl";
	slickDirection = true;
} else {
	carouselRtl = false;
	selectRtl = false;
	slickDirection = false;
}


// *** Image Background *** //
function imageBG() {
	$(".img-bg").each(function () {
		var $this = $(this),
			imgSrc = $this.find("img").attr("src");

		if ($this.parent(".section-image").length) {
			$this.css("background-image", "url('" + imgSrc + "')");
		} else {
			$this.prepend("<div class='bg-element'></div>");
			var bgElement = $this.find(".bg-element");
			bgElement.css("background-image", "url('" + imgSrc + "')");
		}
		$this.find("img").css({ "opacity": 0, "visibility": "hidden" });
	});
}


// *** Fit Videos *** //
function fitVideos() {
	$("#full-container").fitVids();
}


// *** Banner Parallax Image BG *** //
function bannerParallaxImageBG() {
	var bannerParallax = $(".banner-parallax"),
		imgSrc = bannerParallax.children("img:first-child").attr("src");

	bannerParallax.prepend("<div class='bg-element'></div>");
	var bgElement = bannerParallax.find("> .bg-element");
	bgElement.css("background-image", "url('" + imgSrc + "')").attr("data-stellar-background-ratio", 0.2);
}


// *** Lightbox Iframe *** //
function lightboxIframe() {
	$(".lightbox-iframe").magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
}


// *** Lightbox Image *** //
function lightboxImage() {
	$(".lightbox-img").magnificPopup({
		type: 'image',
		gallery: {
			enabled: false
		},
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
}


// *** Lightbox Gallery *** //
function lightboxGallery() {
	$( ".list-lightbox-gallery" ).each( function() {
		$(this).find(".lightbox-gallery").magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	} );
}


// *** Scroll Top Icon *** //
function scrollTopIcon() {
	var windowScroll = $(window).scrollTop();
	if (windowScroll > 800) {
		$(".scroll-top-icon").addClass("show");
	} else {
		$(".scroll-top-icon").removeClass("show");
	}
}

$(".scroll-top").on("click", function (e) {
	e.preventDefault();
	$("html, body").animate({
		scrollTop: 0
	}, 1200); //1200 easeInOutExpo
});


// *** One Page Nav *** //
function onePageNav() {
	var stickyBar = $(".header-bar.sticky"),
		stickyBarHeight = stickyBar.height() - 20,
		offsetDifference = (!stickyBar) ? 0 : stickyBarHeight;

	$.scrollIt({
		upKey: false,
		downKey: false,
		scrollTime: 600,
		activeClass: 'current',
		onPageChange: null,
		topOffset: -offsetDifference
	});
}


// *** Scroll To Anchor *** //
function scrollToAnchor() {
	var stickyBar = $(".header-bar.sticky"),
		stickyBarHeight = stickyBar.height(),
		offsetDifference = (!stickyBar) ? 0 : stickyBarHeight;

	$(".scroll-to").on("click", function (e) {
		e.preventDefault();
		var $anchor = $(this);

		// scroll to specific anchor
		$("html, body").stop().animate({
			scrollTop: $($anchor.attr("href")).offset().top - offsetDifference
		}, 800 );
	});
}


// *** Slider Image BG *** //
function sliderImageBG() {
	$(".slider-img-bg .slick-slide").each(function () {
		var $this = $(this),
			imgSrc = $this.find(".slide").children("img").attr("src");
		$this.prepend("<div class='bg-element'></div>");
		var bgElement = $this.find("> .bg-element");
		bgElement.css("background-image", "url('" + imgSrc + "')");
	});
}


// *** Optimize Slider Image BG *** //
function optimizeSliderImageBG() {
	$(".slider-img-bg").each(function () {
		var imgHeight = $(this).closest("div").height();

		if ($(".banner-parallax").children(".banner-slider").length > 0) {
			// $( ".banner-parallax, .banner-parallax .row > [class*='col-']" ).height( $( ".banner-slider" ).height() );
		}

		$(this).find(".owl-item > li .slide").children("img").css({
			"display": "none",
			"height": imgHeight,
			"opacity": 0
		});
	});
}


// Custom banner height
$(".banner-parallax").each(function () {
	var customBannerHeight = $(this).data("banner-height"),
		boxContent = $(this).find(".row > [class*='col-']");
	$(this).css("min-height", customBannerHeight);
	$(boxContent).css("min-height", customBannerHeight);
});

// *** Section Parallax Image BG *** //
function sectionParallaxImageBG() {
	$(".section-parallax").each(function () {
		var parallaxSection = $(this),
			imgSrc = parallaxSection.children("img:first-child").attr("src");

		parallaxSection.prepend("<div class='bg-element'></div>");
		var bgElement = parallaxSection.find("> .bg-element");
		bgElement.css("background-image", "url('" + imgSrc + "')").attr("data-stellar-background-ratio", 0.2);
	});
}


// *** Slider Banner *** //
function sliderBanner() {
	var sliderBanner = $('.slider-banner > .slick-slider');
	sliderBanner.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		infinite: false,
		rtl: slickDirection,
		arrows: false,
		touchThreshold: 20
	});
}


// *** Slider Services 2 *** //
function sliderServices2() {
	var sliderServices2 = $('.slider-services-2 > .slick-slider');
	sliderServices2.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true,
		infinite: false,
		rtl: slickDirection,
		arrows: false,
		touchThreshold: 20,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
}


// *** Slider Top Destinations *** //
function sliderTopDestinations() {
	$(".slider-top-destinations").each(function () {
		var sliderTopDestinations = $(this).find(".slick-slider");
		sliderTopDestinations.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: false,
			rtl: slickDirection,
			arrows: true,
			touchThreshold: 20,
			// centerMode: true,
			infinite: true,
			appendArrows: $(this).find('.slick-arrows'),
			prevArrow: '<a href="javascript:;" class="slick-prev"><i class="fas fa-arrow-down"></i></a>',
			nextArrow: '<a href="javascript:;" class="slick-next"><i class="fas fa-arrow-up"></i></a>',
			responsive: [
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	});
}


// *** Slider Popular Packages *** //
function sliderPopularPackages() {
	$( ".slider-popular-packages" ).each( function() {
		var sliderPopularPackages = $(this).find( ".slick-slider" );
		sliderPopularPackages.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: false,
			infinite: false,
			rtl: slickDirection,
			arrows: true,
			touchThreshold: 20,
			// centerMode: true,
			appendArrows: $(this).find('.slick-arrows'),
			prevArrow: '<a href="javascript:;" class="slick-prev"><i class="fas fa-arrow-down"></i></a>',
			nextArrow: '<a href="javascript:;" class="slick-next"><i class="fas fa-arrow-up"></i></a>',
			responsive: [
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	} );
}


// *** Slider Testimonials *** //
function sliderTestimonials() {
	var sliderTestimonials = $('.slider-testimonials > .slick-slider');
	sliderTestimonials.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		infinite: false,
		rtl: slickDirection,
		arrows: false,
		touchThreshold: 20,
		// centerMode: true,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
}


// *** Portfolio Isotope *** //
// Initialize Isotope
// var $portfolioIsotope = $(".grid-masonry").isotope({
// 	itemSelector: ".grid-masonry > li",
// 	isResizeBound: true,
// 	stagger: 0,
// 	transitionDuration: '0.5s',
// 	masonry: {
// 		// horizontalOrder: true
// 	},
// 	hiddenStyle: {
// 		opacity: 0,
// 		transform: 'scale(0.009)'
// 	},
// 	visibleStyle: {
// 		opacity: 1,
// 		transform: 'scale(1)'
// 	}
// });


// *** Slider Instagram Feed *** //
function sliderInstagramFeed() {
	var sliderInstagramFeed = $('.slider-instagram-feed > .slick-slider');
	sliderInstagramFeed.slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		dots: false,
		infinite: true,
		rtl: slickDirection,
		arrows: false,
		touchThreshold: 20,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});
}


// *** Menu Main *** //
function menuMain() {
	// Firing Superfish plugin
	$(".menu-main").superfish({
		popUpSelector: "ul",
		cssArrows: true,
		delay: 0,
		speed: 150,
		speedOut: 150,
		animation: {
			opacity: "show",
			marginTop: 0
		}, //  , height : "show"
		animationOut: {
			opacity: "hide",
			marginTop: 20
		}
	});
}


// *** Mobile Menu Side Panel *** //
function mobileMenuSidePanel() {
	$("body").append("<div class='popup-preview-overlay'>");

	$(".popup-preview-overlay").add(".side-panel-close").on("click", function (e) {
		e.preventDefault();
		$(".popup-preview-overlay").toggleClass("viewed");
		$(".side-panel-menu").removeClass("viewed");
		$(".menu-mobile-btn").find(".hamburger").toggleClass("is-active");
		$("html").toggleClass("scroll-lock");
	});
}


// *** Mobile Menu *** //
function mobileMenu() {
	// Cloning Main Menu to Mobile Menu
	$("#menu-main").children().clone().appendTo("#menu-mobile");

	// console.log( $( "#menu-mobile-wrap" ).outerHeight() );

	$(".menu-mobile a").each(function (e) {
		if ($(this).next(".sub-menu").length) {
			// $( this ).addClass( "ddddddd" );
			$(this).closest("li").addClass("has-ul");
		}
	})

	$(".menu-mobile a").on("click", function (e) {
		var $this = $(this);
		if ($this.next(".sub-menu").length) {
			e.preventDefault();
			if ($this.next().hasClass("viewed")) {
				$this.next().removeClass("viewed");
				$this.parent().find(".active").removeClass("active")
				$this.next().slideUp(250);
			} else {
				$this.parent().parent().find(".active").removeClass("active");
				$this.parent("ul").find(".active").removeClass("active")
				$this.parent().parent().find("li .sub-menu").removeClass("viewed");
				$this.parent().parent().find("li .sub-menu").slideUp(250);
				$this.toggleClass("active");
				$this.next().toggleClass("viewed");
				$this.next().slideToggle(250);
			}
		}
	});

	// Toggle Mobile Menu
	$(".menu-mobile-btn").on("click", function (e) {
		e.preventDefault();
		$(this).find(".hamburger").toggleClass("is-active");
		$("#menu-mobile-wrap").stop().slideToggle(200);
	});

	$(".menu-mobile-btn").on("click", function (e) {
		e.preventDefault();
		$(".side-panel-menu").addClass("viewed");
		$(".popup-preview-overlay").addClass("viewed");
		$html.addClass("scroll-lock");
	});
}


// *** Sticky Nav *** //
function stickyHeaderBar() {
	var windowScroll = $(window).scrollTop(),
		headerBar = $(".header-bar");

	headerBar.each(function () {
		var $this = $(this);

		if ($this.hasClass("sticky")) {
			if (windowScroll > $this.offset().top) {
				$this.addClass("is-sticky");
				// logo.attr( "src" , logoSrc );
			} else {
				$this.removeClass("is-sticky");
			}
		}
	});
}


// *** Scroll To *** //
$(".scroll-to").on("click", function (e) {
	e.preventDefault();
	var $anchor = $(this);

	// scroll to specific anchor
	$("html, body").stop().animate({
		scrollTop: $($anchor.attr("href")).offset().top
	}, 1200);
});


// *** Website Loading *** //
function websiteLoading() {
	$("#website-loading").find(".loader, .logo-loader").delay(1500).fadeOut(250);
	$("#website-loading").delay(2000).fadeOut(300);
}




// *** Banner Reservation Tabs *** //
function bannerTabs() {
	$(".br-tabs > li").addClass("br-item");

	// Variables
	var clickedTab = $(".br-tabs > .active");
	var tabWrapper = $(".br-tabs-content");
	var activeTab = tabWrapper.find(".active");
	var activeTabHeight = activeTab.outerHeight();

	// Show tab on page load
	activeTab.show();

	// Set height of wrapper on page load
	tabWrapper.height(activeTabHeight);

	$(".br-tabs .br-item").on("click", function () {

		if (!$(this).hasClass("active")) {
			// Remove class from active tab
			$(".br-tabs .br-item").removeClass("active");

			// Add class active to clicked tab
			$(this).addClass("active");

			// Update clickedTab variable
			clickedTab = $(".br-tabs .active");

			// fade out active tab
			activeTab.animate({ top: 10 }, { duration: 200, queue: false }).fadeOut(200, function () {

				// Remove active class all tabs
				$(".br-tabs-content > li").removeClass("active");

				// Get index of clicked tab
				var clickedTabIndex = clickedTab.index();

				// Add class active to corresponding tab
				$(".br-tabs-content > li").eq(clickedTabIndex).addClass("active");

				
				// update new active tab
				activeTab = $(".br-tabs-content > .active");
				
				// Update variable
				activeTabHeight = activeTab.outerHeight();
				
				// Animate height of wrapper to new tab height
				tabWrapper.stop().delay(0).animate({
					height: activeTabHeight
				}, 200, function () {
					
					// Fade in active tab
					activeTab.delay(0).css("top", 10)
					.animate({ top: 0 }, { duration: 150, queue: false }).fadeIn(100, function() {
					});
					
				});
				
			});
		}
	});
}


// *** Popup Login Register *** //
if ($(".popup-preview-2").length) {
	$("body").append("<div class='popup-preview-overlay-2'>");
}
function popupRegister() {
	$( ".popup-preview-register" ).each( function() {
		var $this = $( this ),
		btnRegister = $this.find( ".popup-btn-register" ),
			popupBg = $this.find(".popup-bg"),
			popupClose = $this.find(".popup-close");
		$(".popup-btn-register").add(popupBg).add(popupClose).on("click", function (e) {
			e.preventDefault();
			$(".popup-preview-register").toggleClass("viewed");
			$(".popup-preview-overlay-2").toggleClass("viewed");
			$("html").toggleClass("scroll-lock");
		});
	});
}

function popupLogin() {
	$(".popup-preview-login").each(function () {
		var $this = $(this),
			popupBg = $this.find(".popup-bg"),
			popupClose = $this.find(".popup-close");
		$(".popup-btn-login").add(popupBg).add(popupClose).on("click", function (e) {
			e.preventDefault();
			$(".popup-preview-login").toggleClass("viewed");
			$(".popup-preview-overlay-2").toggleClass("viewed");
			$("html").toggleClass("scroll-lock");
		});
	});
}


function popupLanguageChoice() {
	$(".popup-language-choice").each(function () {
		var $this = $(this),
			popupBg = $this.find(".popup-bg"),
			popupClose = $this.find(".popup-close");
		$(".popup-btn-language-choice").add(popupBg).add(popupClose).on("click", function (e) {
			e.preventDefault();
			$(".popup-language-choice").toggleClass("viewed");
			$(".popup-preview-overlay-2").toggleClass("viewed");
			$("html").toggleClass("scroll-lock");
		});
	});
}


// *** Slider Price Range *** //
function sliderPriceRange() {
	if (jQuery('.price-range').length > 0) {
		$('.price-range').slider();
	}
}


// *** Options Select2 *** //
function optionsSelect2() {
	$(".options-select2").select2({
		dir: selectRtl,
		minimumResultsForSearch: -1
	});
}


// *** Dashboard User Upload Image *** //
function formLabelStyle1() {
	$("form.with-label-style-1").each(function () {
		var $this = $(this),
			onClass = "on",
			showClass = "show";

		$this.find("input, textarea").on("checkval", function () {
			var label = $(this).prev("label");
			if (this.value !== "") {
				label.addClass(showClass);
			} else {
				label.removeClass(showClass);
			}
		}).on("keyup", function () {
			$(this).trigger("checkval");
		}).on("focus", function () {
			$(this).prev("label").addClass(onClass);
		}).on("blur", function () {
			$(this).prev("label").removeClass(onClass);
		}).trigger("checkval");
	});
}


// *** Slider Related Posts *** //
function sliderRelatedPosts() {
	var sliderRelatedPosts = $('.slider-related-posts > .slick-slider');
	sliderRelatedPosts.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		infinite: false,
		rtl: slickDirection,
		arrows: false,
		touchThreshold: 20,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
}


// *** Slider Airfares Calender *** //
function sliderAirfaresCalender() {
	var sliderAirfaresCalender = $('.slider-airfares-calender > .slick-slider');
	sliderAirfaresCalender.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		infinite: false,
		rtl: slickDirection,
		arrows: true,
		touchThreshold: 20,
		appendArrows: sliderAirfaresCalender.next('.slick-arrows'),
		prevArrow: '<a href="javascript:;" class="slick-prev"><i class="fas fa-arrow-down"></i></a>',
		nextArrow: '<a href="javascript:;" class="slick-next"><i class="fas fa-arrow-up"></i></a>'
	});
}


// *** Slider Hotel Preview *** //
function sliderHotelPreview() {
	var sliderHotelPreview = $('.slider-hotel-preview > .slick-slider');
	var sliderHotelPreviewThumbs = $('.slider-hotel-preview-thumbs > .slick-slider');

	sliderHotelPreview.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		dots: false,
		infinite: true,
		rtl: slickDirection,
		arrows: true,
		touchThreshold: 20,
		appendArrows: sliderHotelPreview.next('.slick-arrows'),
		prevArrow: '<a href="javascript:;" class="slick-prev"><i class="fas fa-arrow-down"></i></a>',
		nextArrow: '<a href="javascript:;" class="slick-next"><i class="fas fa-arrow-up"></i></a>',
		asNavFor: sliderHotelPreviewThumbs
	});

	sliderHotelPreviewThumbs.slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		dots: false,
		infinite: true,
		rtl: slickDirection,
		arrows: false,
		touchThreshold: 20,
		appendArrows: sliderHotelPreviewThumbs.next('.slick-arrows'),
		prevArrow: '<a href="javascript:;" class="slick-prev"><i class="fas fa-arrow-down"></i></a>',
		nextArrow: '<a href="javascript:;" class="slick-next"><i class="fas fa-arrow-up"></i></a>',
		centerMode: true,
		focusOnSelect: true,
		asNavFor: sliderHotelPreview,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});
}


// *** Hotel Info Tabs *** //
function hotelInfoTabs() {
	$(".hi-tabs > li").addClass("hi-item");

	// Variables
	var clickedTab = $(".hi-tabs > .active");
	var tabWrapper = $(".hi-tabs-content");
	var activeTab = tabWrapper.find(".active");
	var activeTabHeight = activeTab.outerHeight();

	// Show tab on page load
	activeTab.show();

	// Set height of wrapper on page load
	tabWrapper.height(activeTabHeight);

	$(".hi-tabs .hi-item").on("click", function () {	

		if (!$(this).hasClass("active")) {
			// Remove class from active tab
			$(".hi-tabs .hi-item").removeClass("active");

			// Add class active to clicked tab
			$(this).addClass("active");

			// Update clickedTab variable
			clickedTab = $(".hi-tabs .active");

			// fade out active tab
			activeTab.animate({ top: 0 }, 0, function () {

				// Remove active class all tabs
				$(".hi-tabs-content > li").removeClass("active");

				// Get index of clicked tab
				var clickedTabIndex = clickedTab.index();

				// Add class active to corresponding tab
				$(".hi-tabs-content > li").eq(clickedTabIndex).addClass("active");

				// update new active tab
				activeTab = $(".hi-tabs-content > .active");

				// Update variable
				activeTabHeight = activeTab.outerHeight();

				// Animate height of wrapper to new tab height
				tabWrapper.stop().delay(0).animate({
					height: activeTabHeight
				}, 200, function () {

					// Fade in active tab
					activeTab.delay(0)
						.animate({ top: 0 }, 0 );

				});
			});
		}
	});
}


// *** Slider Hotel Preview *** //
function sliderPostPrevNext() {
	var sliderPostPrevNext = $('.slider-post-prev-next > .slick-slider');

	sliderPostPrevNext.slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		dots: false,
		infinite: true,
		// rtl: slickDirection,
		arrows: true,
		touchThreshold: 20,
		appendArrows: '.post-prev-next-arrows',
		prevArrow: '<div class="previous"><span class="arrow"><i class="far fa-arrow-alt-circle-left"></i>Previous</span></div><!-- .previous end -->',
		nextArrow: '<div class="next"><span class="arrow"><i class="far fa-arrow-alt-circle-right"></i>Next</span></div><!-- .next end -->'
	});
}


// *** Form Datepicker *** //
function formDatepicker() {

	var dateToday = new Date();
	var dateAsYMD = new Date();

	var month = dateAsYMD.getMonth() + 1;
	var day = dateAsYMD.getDate();

	var outputDateAsYMD = dateAsYMD.getFullYear() + '/' +
		(('' + month).length < 2 ? '0' : '') + month + '/' +
		(('' + day).length < 2 ? '0' : '') + day;

	// alert(outputDateAsYMD);

	$("#datepicker-time-start, #datepicker-time-end").attr("placeholder", outputDateAsYMD);
	var dates = $("#datepicker-time-start, #datepicker-time-end").datepicker({
		defaultDate: "+2d",
		changeMonth: false,
		numberOfMonths: 2,
		dateFormat: 'yy/mm/dd',
		minDate: dateToday,
		onSelect: function (selectedDate) {
			var option = this.id == "datepicker-time-start" ? "minDate" : "maxDate",
				instance = $(this).data("datepicker"),
				date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
			dates.not(this).datepicker("option", option, date);
		}
	});

	$(".datepicker-2-time-start").datepicker({
		dateFormat: 'yy/mm/dd'
	});
}


$(document).ready(function () {
	$( ".slider-range-price" ).each( function() {
		var $this = $(this),
			sliderRange = $this.find(".slider-range"),
			valMin = sliderRange.data("slider-min-value"),
			valMax = sliderRange.data("slider-max-value"),
			valStart = sliderRange.data("range-start-value"),
			valEnd = sliderRange.data("range-end-value"),
			valueSign = sliderRange.data("slider-value-sign");

		sliderRange.slider({
			range: true,
			min: valMin,
			max: valMax,
			values: [valStart, valEnd],
			slide: function (event, ui) {
				$this.find(".price").val(valueSign + ui.values[0] + " - " + valueSign + ui.values[1]);
			}
		});

		$this.find(".price").val(valueSign + sliderRange.slider("values", 0) +
			" - " + valueSign + sliderRange.slider("values", 1));
	} );



	$(".slider-range-time").each( function() {
		var $this = $(this),
			sliderRange = $this.find(".slider-range"),
			sliderTime1 = $this.find(".slider-time-1"),
			sliderTime2 = $this.find(".slider-time-2"),
			timeStartMinutes = sliderRange.data("time-start-minutes"),
			timeEndMinutes = sliderRange.data("time-end-minutes");
		
			sliderRange.slider({
				range: true,
				min: 0,
				max: 1440,
				step: 15,
				values: [timeStartMinutes, timeEndMinutes],
				slide: function (e, ui) {
					var hours1 = Math.floor(ui.values[0] / 60);
					var minutes1 = ui.values[0] - (hours1 * 60);
		
					if (hours1.length == 1) hours1 = '0' + hours1;
					if (minutes1.length == 1) minutes1 = '0' + minutes1;
					if (minutes1 == 0) minutes1 = '00';
					if (hours1 >= 12) {
						if (hours1 == 12) {
							hours1 = hours1;
							minutes1 = minutes1 + " PM";
						} else {
							hours1 = hours1 - 12;
							minutes1 = minutes1 + " PM";
						}
					} else {
						hours1 = hours1;
						minutes1 = minutes1 + " AM";
					}
					if (hours1 == 0) {
						hours1 = 12;
						minutes1 = minutes1;
					}

					sliderTime1.html(hours1 + ':' + minutes1);
		
					var hours2 = Math.floor(ui.values[1] / 60);
					var minutes2 = ui.values[1] - (hours2 * 60);
		
					if (hours2.length == 1) hours2 = '0' + hours2;
					if (minutes2.length == 1) minutes2 = '0' + minutes2;
					if (minutes2 == 0) minutes2 = '00';
					if (hours2 >= 12) {
						if (hours2 == 12) {
							hours2 = hours2;
							minutes2 = minutes2 + " PM";
						} else if (hours2 == 24) {
							hours2 = 11;
							minutes2 = "59 PM";
						} else {
							hours2 = hours2 - 12;
							minutes2 = minutes2 + " PM";
						}
					} else {
						hours2 = hours2;
						minutes2 = minutes2 + " AM";
					}

					sliderTime2.html(hours2 + ':' + minutes2);
				}
			});
	} );
});


// *** Language Select *** //
function languageSelect() {
	$("#select-language").countrySelect({
		defaultCountry: "gb",
		onlyCountries: ['eg', 'gb'],
		preferredCountries: false,
		responsiveDropdown: true
	});
}


// *** Item Click Increase & Decrease Counter *** //
function itemClickCounter() {
	jQuery.fn.allowDigitsOnly = function () {
		return this.each(function () {
			$(this).keydown(function (e) {
				var key = e.charCode || e.keyCode || 0;
				return (
					key == 8 ||
					key == 9 ||
					key == 46 ||
					key == 110 ||
					key == 190 ||
					(key >= 35 && key <= 40) ||
					(key >= 48 && key <= 57) ||
					(key >= 96 && key <= 105));
			});
		});
	};

	var inputField = $(".counter-add-item input");
	inputField.allowDigitsOnly();

	// $(".increase-btn").on("click", function (e) {
	// 	e.preventDefault();
		
	// 	var inputField = $(this).prev("input");
	// 	var currentInputValue = parseInt(inputField.val());
	// 	inputField.val(currentInputValue + 1);
	// });

	// $(".decrease-btn").on("click", function (e) {
	// 	e.preventDefault();
	// 	var inputField = $(this).next("input");
	// 	var currentInputValue = parseInt(inputField.val());
	// 	inputField.val(currentInputValue - 1);

	// 	if (currentInputValue < 1) {
	// 		inputField.val("0");
	// 	}
	// });
}


// *** Show Dropdown Passsengers *** //
function dropdownPassengers() {
	$(".show-dropdown-passengers").each( function() {
		var $this = $(this),
			dropdownPassengers = $this.siblings(".list-dropdown-passengers");
	
		$this.on( "focus", function() {
			$(".list-dropdown-passengers").removeClass("is-active");
			dropdownPassengers.addClass("is-active");
		} )
	
		dropdownPassengers.find(".btn-reservation-passengers").on("click", function () {
			$this.siblings(".list-dropdown-passengers").removeClass("is-active");
		} )
	} );

}

// *** Multi Multiple Destinations *** //
function multipleDestinations() {
	var cloneWrap = $(".multiple-destinations").find(".form-group:first-child"),
		clonedElement = cloneWrap.find(".fields-row:first-child");

	$(".btn-multiple-destinations").on("click", function() {
		clonedElement.clone().appendTo(cloneWrap);

		var clonedElementLast = cloneWrap.find(".fields-row:last-child");

		clonedElementLast.find(".hasDatepicker").removeClass("hasDatepicker datepicker-2-time-start").removeAttr("id").datepicker({ dateFormat: 'yy/mm/dd' });
		clonedElementLast.find(".list-dropdown-passengers").removeClass("is-active");

		var liHeight = $(this).closest("li").outerHeight();

		$(this).closest(".br-tabs-content").height(liHeight);


		dropdownPassengers();
	});
}


// *** Slider Featured Cars *** //
function sliderFeaturedCars() {
	$(".slider-featured-cars").each(function () {
		var sliderFeaturedCars = $(this).find(".slick-slider");
		sliderFeaturedCars.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: false,
			infinite: false,
			rtl: slickDirection,
			arrows: true,
			touchThreshold: 20,
			// centerMode: true,
			appendArrows: $(this).find('.slick-arrows'),
			prevArrow: '<a href="javascript:;" class="slick-prev"><i class="fas fa-arrow-down"></i></a>',
			nextArrow: '<a href="javascript:;" class="slick-next"><i class="fas fa-arrow-up"></i></a>',
			responsive: [
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	});
}


// *** Country Select *** //
function countrySelect() {
	$("#select-country").countrySelect({
		defaultCountry: "us",
		// onlyCountries: ['eg', 'gb'],
		preferredCountries: false,
		responsiveDropdown: true
	});
}
