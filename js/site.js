function resizePostHeader() {
    var windowHeight = $(window).height();
    var postHeaderHeight = windowHeight / 2;
    $(".header").height(postHeaderHeight);

    var contentsHeight = $(".header-contents").height();
    $(".header").css({
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
    $(".header-links").css({
        "right": delta + $(".header-links").width() / 2 + "px"
    });
}

window.onresize = function () {
    resizePostHeader();
    placeAbout();
    placeHeaderIcons();
}
