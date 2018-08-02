$(document).ready(function() {
    pauseVideo();
    stickyColumn();
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