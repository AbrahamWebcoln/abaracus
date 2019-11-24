/* global variables */
var classicLayout = false;
var portfolioKeyword;
(function ($) {
	/* DOCUMENT LOAD */
	$(function () {
		// ------------------------------
		// start loader
		NProgress.start();
		// ------------------------------
		setMasonry();
		// ------------------------------
		// Rotating Words
		var rotate_words = $('.rotate-words');
		if (rotate_words.length) {
			if (Modernizr.csstransforms) {
				rotate_words.each(function (index, element) {
					$(element).find('span').eq(0).addClass('active');
					setInterval(function () {
						next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
						$(element).find('.active').addClass('rotate-out').removeClass('rotate-in active');
						$(element).find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
					}, 3000);
				});
			} else {
				rotate_words.each(function (index, element) {
					$(element).find('span').eq(0).addClass('active').show();
					setInterval(function () {
						next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
						$(element).find('.active').removeClass('active').slideUp(500);
						$(element).find('span').eq(next_word_index).addClass('active').slideDown(500);
					}, 3000);
				});
			}
		}
		// ------------------------------
		// ------------------------------
		// ONE PAGE LAYOUT FUNCTIONS
		if ($('html').hasClass('one-page-layout')) {
			// ------------------------------
			// PORTFOLIO DETAILS
			// if url contains a portfolio detail url
			portfolioKeyword = $('section.portfolio').attr('id');
			initialize();
			var detailUrl = giveDetailUrl();
			// ------------------------------
			// ------------------------------
			// LAYOUT DETECT
			var pagesCount = $('.wrapper > section').length;

			// initialize triple layout
			$.initTripleLayout();
			setTimeout(function () {
				refreshMasonry();
			}, 300);
			// ------------------------------
			// FULL BROWSER BACK BUTTON SUPPORT 
			var prevUrl = -1;
		}
		// ------------------------------	
		// ------------------------------
		// SETUP PLUGINS
		setup();
		// ------------------------------
		// ------------------------------
		// ------------------------------
		// FORM VALIDATION
		// comment form validation fix
		$('#commentform').addClass('validate-form');
		$('#commentform').find('input,textarea').each(function (index, element) {
			if ($(this).attr('aria-required') == "true") {
				$(this).addClass('required');
			}
			if ($(this).attr('name') == "email") {
				$(this).addClass('email');
			}
		});
		// validate form
		if ($('.validate-form').length) {
			$('.validate-form').each(function () {
				$(this).validate();
			});
		}
		// ------------------------------
		// ------------------------------
		// FILL SKILL BARS
		fillBars();
		// ------------------------------
		// ------------------------------
		/* TOOLTIPS */
		$('.tooltip').each(function (index, element) {
			$(this).tooltipster({
				position: $(this).attr('data-tooltip-pos'),
				fixedWidth: 300,
				offsetX: 0,
				animation: "grow",
				delay: 50
			});
		});
		// ------------------------------
		// ------------------------------
		// GOOGLE MAP
		/*
			custom map with google api
			check out the link below for more information about api usage
			https://developers.google.com/maps/documentation/javascript/examples/marker-simple
		*/
		function initializeMap() {
			if ($('.map').length) {
				var mapCanvas = $('#map-canvas');
				var myLatlng = new google.maps.LatLng(mapCanvas.data("latitude"), mapCanvas.data("longitude"));
				var mapOptions = {
					zoom: mapCanvas.data("zoom"),
					center: myLatlng
				}
				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map
				});
			}
		}
		google.maps.event.addDomListener(window, 'load', initializeMap);
		// ------------------------------
	});
	// DOCUMENT READY
	// WINDOW ONLOAD
	window.onload = function () {
		NProgress.done();
	};
	// WINDOW ONLOAD	
	// ------------------------------
	// ------------------------------
	// FUNCTIONS
	// ------------------------------
	// ------------------------------
	// ------------------------------
	// INITIALIZE
	var inAnimation, outAnimation;

	function initialize() {
		inAnimation = $('html').attr('data-inAnimation');
		outAnimation = $('html').attr('data-outAnimation');
	}
	// ------------------------------
	// ------------------------------
	// SETUP : plugins
	function setup() {
		// ------------------------------
		// LIGHTBOX
		setupLightbox();
		// ------------------------------
		// ------------------------------
		// CODE PRETTIFY
		if ($('.prettyprint').length) {
			window.prettyPrint && prettyPrint();
		}
		// ------------------------------
		// ------------------------------
		// TABS
		$('.tabs').each(function () {
			if (!$(this).find('.tab-titles li a.active').length) {
				$(this).find('.tab-titles li:first-child a').addClass('active');
				$(this).find('.tab-content > div:first-child').show();
			} else {
				$(this).find('.tab-content > div').eq($(this).find('.tab-titles li a.active').parent().index()).show();
			}
		});
		$('.tabs .tab-titles li a').click(function () {
			if ($(this).hasClass('active')) {
				return;
			}
			$(this).parent().siblings().find('a').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs').find('.tab-content > div').hide().eq($(this).parent().index()).show();
			return false;
		});
		// ------------------------------
	}
	// ------------------------------
	// ------------------------------
	// CHANGE PAGE
	function setActivePage() {
		$('.page').removeClass('active').hide();
		var path = $.address.path();
		path = path.slice(1, path.length);
		path = giveDetailUrl() != -1 ? portfolioKeyword : path;
		if (path == "") { // if hash tag doesnt exists - go to first page
			var firstPage = $('.vs-nav li').first().find('a').attr('href');
			path = firstPage.slice(2, firstPage.length);
			$.address.path(path);
			return false;
		}
		// show page
		$('#' + path).fadeIn();
		$('.page.active').hide();
		$('#' + path).addClass('active');
		setCurrentMenuItem();
		if (path.indexOf(portfolioKeyword) != -1) {
			setTimeout(function () {
				setMasonry();
			}, 100);
		}
		$("body").scrollTop(0);
	}
	// ------------------------------
	// ------------------------------
	// MASONRY - ISOTOPE
	function setMasonry() {

		var masonry = $('.portfolio-items, .latest-posts');
		if (masonry.length) {
			masonry.each(function (index, el) {
				// call isotope
				refreshMasonry();
				$(el).imagesLoaded(function () {
					$(el).isotope({
						layoutMode: $(el).data('layout') ? $(el).data('layout') : 'masonry'
					});
					// set columns
					refreshMasonry();
				});
				if (!$(el).data('isotope')) {
					// filters
					var filters = $(el).siblings('.filters');
					if (filters.length) {
						filters.find('a').on("click", function () {
							var selector = $(this).attr('data-filter');
							$(el).isotope({
								filter: selector
							});
							$(this).parent().addClass('current').siblings().removeClass('current');
							refreshMasonry();
							return false;
						});
					}

				}

			}); //each
		}
	}
	$(window).on('resize debouncedresize', function () {
		refreshMasonry();
		setTimeout(function () {
			refreshMasonry();
		}, 1000)
	});
	// ------------------------------
	// ------------------------------
	// REFRSH MASONRY - ISOTOPE
	function refreshMasonry() {
		var masonry = $('.portfolio-items, .latest-posts');
		if (masonry.length) {
			masonry.each(function (index, el) {
				// check if isotope initialized
				if ($(el).data('isotope')) {
					var itemW = 360;
					var containerW = $(el).width();
					var items = $(el).children('.hentry');
					var columns = Math.round(containerW / itemW);
					// set the widths (%) for each of item
					items.each(function (index, element) {
						var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
						var itemRealWidth = (Math.floor(containerW / columns) * 100 / containerW) * multiplier;
						$(this).css('width', itemRealWidth + '%');
					});
					var columnWidth = Math.floor(containerW / columns);
					$(el).isotope('option', {
						masonry: {
							columnWidth: columnWidth
						}
					});
					$(el).isotope('layout');
				}
			}); //each
		}
	}
	// ------------------------------
	// ------------------------------
	// FILL PROGRESS BARS
	function fillBars() {
		$('.bar').each(function () {
			var bar = $(this);
			bar.find('.progress').css('width', bar.attr('data-percent') + '%');
		});
	}
	// ------------------------------	
	// ------------------------------
	// LIGHTBOX
	function setupLightbox() {
		//html5 validate fix
		$('.lightbox').each(function (index, element) {
			$(this).attr('rel', $(this).attr('data-lightbox-gallery'));
		});
		$("[data-fancybox]").fancybox({
			onStart: function () {
				NProgress.start();
				$('body').addClass('lightbox-active');
			},
			onClosed: function () {
				$('body').removeClass('lightbox-active');
			},
			onComplete: function () {
				NProgress.done();
			}
		});
		if ($("a[rel^='fancybox']").length) {
			$("a[rel^='fancybox']").fancybox({
				centerOnScroll: true,
				width: 640,
				height: 360,
				transitionOut: 'none',
				overlayColor: '#BEBD97',
				overlayOpacity: '.6',
				onStart: function () {
					NProgress.start();
					$('body').addClass('lightbox-active');
				},
				onClosed: function () {
					$('body').removeClass('lightbox-active');
				},
				onComplete: function () {
					NProgress.done();
					if ($(this).attr('href').indexOf("soundcloud.com") >= 0) {
						$('#fancybox-content').height(166);
					}
				}
			});
		}
	}
	// ------------------------------	
	// ------------------------------
	// SET CURRENT MENU ITEM
	function setCurrentMenuItem() {
		var activePageId = $('.page.active').attr('id');
		// set default nav menu
		$('.vs-nav a[href$=' + activePageId + ']').parent().addClass('current_page_item').siblings().removeClass('current_page_item');
	}
	// ------------------------------
	// ------------------------------
	// AJAX PORTFOLIO DETAILS
	var pActive;
	function giveDetailUrl() {
		var address = $.address.value();
		var detailUrl;
		if (address.indexOf("/" + portfolioKeyword + "/") != -1 && address.length > portfolioKeyword.length + 2) {
			var total = address.length;
			detailUrl = address.slice(portfolioKeyword.length + 2, total);
		} else {
			detailUrl = -1;
		}
		return detailUrl;
	}
	// ------------------------------
	// ------------------------------
	// AJAX LOADER
	function showLoader() {
		NProgress.start();
	}

	function hideLoader() {
		NProgress.done();
	}
	// ------------------------------
})(jQuery);