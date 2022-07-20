/* ----------------------------------

     CUSTOM JS
     ---------------------------------------

     filename:asset/js/custom.js
     copyright:2015 Flagship
     License:CC BY Flagship
     contact:info@weareflagship.com

     -------------------------------------------------------------------------- */

//Polyfills
if (!Array.from) {
    Array.from = function (object) {
        'use strict';
        return [].slice.call(object);
    };
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        enumerable: false,
        value: function (obj) {
            var newArr = this.filter(function (el) {
                return el == obj;
            });
            return newArr.length > 0;
        }
    });
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Handler that uses various data-* attributes to trigger
// specific actions, mimicing bootstraps attributes

var triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

window.addEventListener('click', function (ev) {
    var elm = ev.target;
    if (triggers.includes(elm)) {
        var selector = elm.getAttribute('data-target');
        collapse(selector, 'toggle');
    }
}, false);

var fnmap = {
    'toggle': 'toggle',
    'show': 'add',
    'hide': 'remove'
};

var collapse = function (selector, cmd) {
    var targets = Array.from(document.querySelectorAll(selector));
    targets.forEach(function (target) {
        target.classList[fnmap[cmd]]('show');
    });
}

$(function () {
    // slick carousel
    $('.bio-slide').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        arrows: false,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.cap-slide').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        arrows: false,
        centerMode: true,
        adaptiveHeight: true,
        centerPadding: '180px',
        responsive: [
          {
            breakpoint: 769,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '190px',
                slidesToShow: 1,
                slidesToScroll: 1,
                }
          },
          {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                centerPadding: '60px',
                slidesToScroll: 1,
                variableWidth: false,
                }
          }
        ]
    });
    $('.tab-slide').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        dots: false,
        arrows: false,
        variableWidth: true,
        infinite: false,
        responsive: [{
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                variableWidth: false,
            }
        }]
    });

 $('.tab-slide-arrows').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        dots: false,
        arrows: true,
        variableWidth: true,
        infinite: false,
        responsive: [{
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                variableWidth: false,
            }
        }]
    });

    $('.home-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        arrows: false
    });

    AOS.init({
        duration: 600
    });

    // truncate long lines
    $('.trunk1').trunk8({
        lines: 1
    });
    $('.trunk2').trunk8({
        lines: 2
    });
    $('.trunk3').trunk8({
        lines: 3
    });
    $('.trunk4').trunk8({
        lines: 4
    });
    $(window).resize(function () {
        $('.trunk1').trunk8('update');
        $('.trunk2').trunk8('update');
        $('.trunk3').trunk8('update');
        $('.trunk4').trunk8('update');
    });


    $(window).scroll(function () {
        var sticky = $('.sticky'),
            scroll = $(window).scrollTop();

        if (scroll >= 1) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
    });

    var heroHeight = 0;
    var navHeight = 0;

    function setNavMeasurements() {
        console.log('UPDATE')
        heroHeight = $('.header-hero').outerHeight();
        navHeight = $('.site-header-main').outerHeight(); 
    }

    setNavMeasurements();

    var setNavMeasurementsDebounced = debounce(setNavMeasurements, 500);

    window.addEventListener('resize', setNavMeasurementsDebounced);

    $(window).scroll(function () {
        var sticky = $('.sticky-tabs'),
            scroll = $(window).scrollTop();
        
        if (scroll >= heroHeight - navHeight) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
    });

    $(window).scroll(function () {
        var stickyHead = $('.sticky-hero'),
            scrollHead = $(window).scrollTop();

        if (scrollHead >= 180) stickyHead.addClass('fixed');
        else stickyHead.removeClass('fixed');
    });

    $(".btn-menu, .menu-close").click(function () {
        $(".main-menu").animate({
            width: "toggle"
        });
    });

    var linkAnimating = false;
    
    var smoothScroll = function(e, hash) {
        if (linkAnimating) {
            if (e) e.preventDefault();
            return;
        }
        var targetArray = hash ? hash.split('#') : e.currentTarget.href.split('#');
        if (!!targetArray[1]) {
            var fixedNavHeight = 0;
            if ($('.spacer-bar-bio').length) {
                fixedNavHeight = $(window).width() > 480 ? 325 : 190;
            } else {
                fixedNavHeight = $('.sticky-hero').outerHeight() || $('.site-header').outerHeight() || 0;
                if ($('.sticky-tabs').length) {
                    fixedNavHeight = fixedNavHeight + $('.sticky-tabs').outerHeight();
                }
            }


            var $section = $('section#' + targetArray[1]);
            if ($section.length) {
                var scrollPoint = $section.offset().top - fixedNavHeight;
                linkAnimating = true;
                $('body,html').animate({
                    scrollTop: scrollPoint
                }, 800, 'swing', function () {
                    linkAnimating = false;
                });
            }
        }
    }

    /** Smooth Scroll Anchor Links */
    $('body').on('click', '.tab-slide a[href*="#"]', smoothScroll);
    
    $('body').on('click', '.tab-slide-arrows a[href*="#"]', smoothScroll); // new
    /** Handle anchors on initial page load */
    if (location.hash) {               // do the test straight away
        setTimeout(function() {
            smoothScroll(null, location.hash);
        }, 500);
    }
    /** ScrollSpy */
    var $sections = $('section.section-prime');

    function isBelowScroll(element) {
        var fixedNavHeight = $('.sticky-hero').outerHeight() || $('.site-header').outerHeight() || 0;
        if ($('.sticky-tabs').length) {
            fixedNavHeight = fixedNavHeight + $('.sticky-tabs').outerHeight();
        }
        var position = element.getBoundingClientRect();
        return position.top - fixedNavHeight - 1 > 0;
    }

    function getClosestSection() {
        for (var index = 0; index < $sections.length; index++) {
            if (isBelowScroll($sections[index]))
                break;
        }
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        let modifier = 0 === index || (scrollHeight - Math.floor(scrollPosition)) / scrollHeight === 0 ? 0 : -1; /** Handle section at the very bottom of page */
        if ('undefined' !== typeof $sections[index + modifier] && !!$sections[index + modifier].id) selectLink.call(this, $sections[index + modifier].id)
    }

    function selectLink(id) {
        var $target = $('a[href*="#' + id + '"]'),
            slideIndex = $('.tab-slide').find('a.tab-link').index($('a[href*="#' + id + '"]'));

        $('.tab-slide').slick('slickGoTo', slideIndex);

        if ($target.length) {
            $('.tab-link.active').removeClass('active');
            $target.addClass('active');
        }
    }

    var scrollTimeout;
    var throttle = 50;

    $(window).on('scroll', function () {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
                getClosestSection();
                scrollTimeout = null;
            }, throttle);
        }
    });

    // init controller
    var controller = new ScrollMagic.Controller();

    // build tween
    var tween = TweenMax.to(".hero-shrink", 1, {
        className: "+=animate"
    })

    // build scene
    var scene = new ScrollMagic.Scene({
            duration: 430
        })
        .setTween(tween)
        .addTo(controller);


    // build tween
    var tweenTitle = TweenMax.to(".title-shrink, .details-shrink, .social-shrink, .hero-img, .header-animate", 1, {
        className: "+=animate"
    })

    // build scene
    var scene = new ScrollMagic.Scene({
            duration: 180
        })
        .setTween(tweenTitle)
        .addTo(controller);
    // build tween

    var $searchInput = $(".search-input");

    $searchInput.focus(function () {
        $(this).parent().addClass("active");
    })

    $searchInput.blur(function () {
        $(this).parent().removeClass("active");
    })

    //Filter dropdown
    var $closeFilterDropdown = $('.close-filter-dropdown');
    var $filterByToggle = $('a.filter-mb-toggle');
    var $filterByToggleContent = $('.filter-mb-toggle-content');
    var $filterDropdowns = $('.filter-dropdown');
    var $filterLinks = $('a.filter-link:not(".back-btn")');
    var $siteOverlay = $('.site-overlay');

    function closeFilterDropdowns() {
        $filterLinks.each(function (index, elm) {
            $(elm).removeClass('active');
        });
        $filterDropdowns.each(function (index, elm) {
            $(elm).removeClass('show');
        });
    }

    function checkOverlayVisibility() {
        if (!$filterByToggle.is(':visible')) {
            if ($('a.filter-link:not(".back-btn").active').length) {
                $siteOverlay.fadeIn(300);
            } else {
                $siteOverlay.fadeOut(300);
            }  
        } 
    }

    function checkLinkVisibility() {
        if ($filterByToggle.is(':visible')) {
            $filterByToggleContent.slideToggle(function () {
                if ($('a.filter-link:not(".back-btn"):visible').length) {
                    $siteOverlay.fadeIn(300);
                    $('.filter-mb-toggle .close-filter-dropdown.btn-close').show();
                } else {
                    $siteOverlay.fadeOut(300, function () {
                        closeFilterDropdowns();
                        $('.filter-mb-toggle .close-filter-dropdown.btn-close').hide();
                    });
                }
            });
        } else {
            $filterByToggleContent.show();
            $siteOverlay.hide();
            $('.filter-mb-toggle .close-filter-dropdown.btn-close').show();
        }
    }

    var debounced = debounce(checkLinkVisibility, 500);

    window.addEventListener('resize', debounced);

    $filterLinks.on('click', function (e) {
        var $link = $(e.currentTarget);
        if (!$link.hasClass('active')) {
            closeFilterDropdowns();
            $link.addClass('active');
            $link.siblings('.filter-dropdown').addClass('show');
        } else {
            closeFilterDropdowns();
        }
        checkOverlayVisibility();
    });

    $siteOverlay.add($closeFilterDropdown).on('click', function (e) {
        console.log('lkjasdflkjasdfljk')
        e.stopPropagation();
        closeFilterDropdowns();
        checkOverlayVisibility();
        checkLinkVisibility();
    });

    $filterByToggle.on('click', checkLinkVisibility);

    //VR Tabs
    function displayVrTabs() {
        $('.mofo-vr-tabs').each(function(index, element) {
            var $activeLink = $(element).find('.mofo-tab-link.active'),
                $pane = $activeLink.find('.tab-pane'),
                $tabContent = $(element).find('.mofo-tab-content');
            if ($tabContent.is(':visible')) {
                $tabContent.html($pane.html());
            } else {
                $pane.slideDown();
                $activeLink.siblings().find('.tab-pane').slideUp();
            }
        });
    }

    displayVrTabs();
    var debouncedVrTabsResize = debounce(displayVrTabs, 500);
    window.addEventListener('resize', debouncedVrTabsResize);

    $('.mofo-vr-tabs .mofo-tab-link').on('click', function(e) {
        var $currentLink = $(this);
        $currentLink.siblings().removeClass('active');
        $currentLink.addClass('active');
        displayVrTabs();
    });

    //Full-modal
    (function() {
        $(document).on('click', '.js-toggle-form-modal', function(e) {
            e.preventDefault();
            var $modal = $('.full-modal');
            if (!$modal.length) return;
            if($modal.hasClass('active')) {
                $modal.removeClass('active');
            } else {
                $modal.addClass('active');
            }
        });
    })();

});
