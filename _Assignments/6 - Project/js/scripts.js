$(document).ready(function() {
    pauseVideo();
    stickyColumn();
    carousel();
});


function pauseVideo() {

    let $video = $('#video-main')[0];
    let $control = $('.video-control');

    let flip = true,
        pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
        play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";

    let $animation = $('#animation');

    let events = {
        play: function() {
            $video.play();
        },
        pause: function() {
            $video.pause();
        }
    };

    $control.on('click', function() {

        flip = !flip;
        // Animation Toggle
        $animation.attr({
            "from": flip ? pause : play,
            "to": flip ? play : pause
        })[0].beginElement();

        // Video Control
        if($video.paused) {
            events.play();
        }
        else {
            events.pause();
        }
    })
}

function stickyColumn() {

    let videoHeight = $('#video-banner').outerHeight();
    let column = $('.sticky-column');

    $(window).on('resize', function() {
        column.height = videoHeight;
    });
}

function carousel() {

    // Handlers
    let next = $('.next');
    let prev = $('.prev');
    let dot1 = $('.dot-1');
    let dot2 = $('.dot-2');

    // On Click Events
    next.on('click', function() {
        plusSlides(1);
    });

    prev.on('click', function() {
        plusSlides(-1);
    });

    dot1.on('click', function() {
        currentSlide(1);
    });

    dot2.on('click', function() {
        currentSlide(2);
    });

    // Carousel Logic
    let slideIndex = 1;
    showSlides(1);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i,
            slides = document.getElementsByClassName('carousel-slides');
            dots = document.getElementsByClassName('dot');

        if ( n > slides.length ) {
            slideIndex = 1;
        }

        if ( n < 1 ) {
            slideIndex = slides.length;
        }

        for ( i = 0; i < slides.length; i++ ) {
            slides[i].style.display = "none";
        }

        for ( i = 0; i < dots.length; i++ ) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
}