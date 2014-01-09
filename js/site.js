function resizePostHeader() {
    var windowHeight = $(window).height();
    var postHeaderHeight = Math.max(windowHeight / 2, $(".header").height());
    $(".header").height(postHeaderHeight);

    var contentsHeight = $(".header-contents").height();
    $(".header").css({
        "padding-top": postHeaderHeight / 2 - contentsHeight / 2
    });

}

function placeHeaderIcons() {
    var delta = $(".content").offset().left;
    var links = $(".header-links");
    links.show();
    links.css({
        "right": delta + links.width() / 2 + "px"
    });
}

window.onresize = function () {
    resizePostHeader();
    placeHeaderIcons();
}

