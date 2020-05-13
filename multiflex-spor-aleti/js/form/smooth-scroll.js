/*!
 * Smooth scrolling plugin.
 */
var $root = $('html, body');

function smooth_scroll(trigger_element, target_element, scroll_offset, scroll_time) {
    scroll_offset = (scroll_offset === undefined || scroll_offset === null) ? target_element.offset().top : scroll_offset;
    scroll_time = (scroll_time === undefined || scroll_time === null) ? 500 : scroll_time;

    $root.animate({
        scrollTop: scroll_offset
    }, scroll_time);
}

var initializeSmoothScroll = function(identifier, callback) {
    $(identifier).click(function() {
        let trigger_element = $(this);
        let target_element = $($.attr(this, 'href'));

        if (target_element.length > 0) {
            let scroll_offset = (trigger_element.attr('data-offset-top')) ? target_element.offset().top - parseInt(trigger_element.data('offset-top')) : null;
            let scroll_time = (trigger_element.attr('data-scroll-time')) ? sparseInt(trigger_element.data('scroll-time')) : null;

            if (typeof callback === 'function') {
                callback();
            }
            smooth_scroll(trigger_element, target_element, scroll_offset, scroll_time);
            return false;
        }
    });
};