(function($,sr){

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

var $ = jQuery;


(function(){


    ///////////////////////////////
    // Set Home Slideshow Height
    ///////////////////////////////

    function setHomeBannerHeight() {
        var windowHeight = jQuery(window).height();
        jQuery('#header').height(windowHeight);
    }

    ///////////////////////////////
    // Center Home Slideshow Text
    ///////////////////////////////

    function centerHomeBannerText() {
        var bannerText = jQuery('#header > .center');
        var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2) - 40;
        bannerText.css('padding-top', bannerTextTop+'px');
        bannerText.show();
    }

    function setHeaderBackground() {
        var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top

        if (scrollTop > 100 || jQuery(window).width() < 700) {
            jQuery('#header .top').addClass('solid');
        } else {
            jQuery('#header .top').removeClass('solid');
        }
    }




    ///////////////////////////////
    // Initialize
    ///////////////////////////////

    jQuery.noConflict();
    setHomeBannerHeight();
    centerHomeBannerText();

    //Resize events
    jQuery(window).smartresize(function(){
        setHomeBannerHeight();
        centerHomeBannerText();
    });

})();


///////////////////////////////
// Smooth Scroll
///////////////////////////////


smoothScroll.init();




///////////////////////////////
// Animate Css
///////////////////////////////
var $ = jQuery;

function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

$(document).ready(function(){
    $('#scrollToContent').each(function() {
        animationHover(this, 'pulse');
    });
});



///////////////////////////////
// Header Fixed
///////////////////////////////



var menu = $('#navigation');
var origOffsetY = menu.offset().top;

function scroll() {
    if ($(window).scrollTop() >= origOffsetY) {
        $('#navigation').addClass('nav-wrap');
        $('#services').addClass('exp');
        $('body').addClass('nav_is_fixed');
    } else {
        $('#navigation').removeClass('nav-wrap');
        $('#services').removeClass('exp');
        $('body').removeClass('nav_is_fixed');
    }



}

document.onscroll = scroll;



smoothScroll.init({
    // selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
    //selectorHeader: '.nav-wrap', // Selector for fixed headers (must be a valid CSS selector)
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'linear', // Easing pattern to use
    updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
    callback: function ( toggle, anchor ) {
        scroll();
    } // Function to run after scrolling
});


/*
 =============================================
 portfolio
 ===============================================
 */

$(document).ready(function() {
    $('#lightbox-video > .icon-links > a').nivoLightbox({
        effect: 'fadeScale',
        afterShowLightbox: function(){
            src = $('.nivo-lightbox-content > iframe').attr('src');
            $('.nivo-lightbox-content > iframe').attr('src', src + '?autoplay=1');
        }
    });
});



/*===========================  Testimonial  ====================================================*/

$(document).ready(function() {
    $("#client-speech").owlCarousel({
        autoPlay: 3000,
        navigation : false, // Show next and prev buttons
        slideSpeed : 700,
        paginationSpeed : 1000,
        singleItem:true,
        pagination:true
    });
});

/*------------------------------------------
 Contact form
 ------------------------------------------*/

$(document).ready(function () {

    $("#contactForm").submit(function(e){

        e.preventDefault();
        var $ = jQuery;

        var postData        = $(this).serializeArray(),
            formURL         = $(this).attr("action"),
            $cfResponse     = $('#contactFormResponse'),
            $cfsubmit       = $("#cfsubmit"),
            cfsubmitText    = $cfsubmit.text();

        $cfsubmit.text("Sending...");


        $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data)
                {
                    $cfResponse.html(data);
                    $cfsubmit.text(cfsubmitText);
                    $('#contactForm input[name=name]').val('');
                    $('#contactForm input[name=email]').val('');
                    $('#contactForm textarea[name=message]').val('');
                },
                error: function(data)
                {
                    alert("Error occurd! Please try again");
                }
            });

        return false;

    });
});
