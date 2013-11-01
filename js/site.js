function resizePostHeader() {
    var windowHeight = $(window).height();
    var headerHeight = $(".header").height();
    var postHeaderHeight = windowHeight / 2 - headerHeight;
    $(".post-header").height(postHeaderHeight);

    var contentsHeight = $(".post-header-contents").height();
    $(".post-header").css({
        "padding-top": postHeaderHeight / 2 - contentsHeight / 2
    });

}

function placeAbout() {
    if ($(".about").length == 0) {
        return;
    }
    var windowHeight = $(window).height();
    var aboutHeight = $(".about").height();
    $(".about").css({
        "margin-top": windowHeight / 4 - aboutHeight / 2
    });
}

function placeHeaderIcons() {
    var delta = $(".content").offset().left;
    $(".post-header-links").css({
        "right": delta + $(".post-header-links").width() / 2 + "px"
    });
}

window.onresize = function () {
    resizePostHeader();
    placeAbout();
    placeHeaderIcons();
}
