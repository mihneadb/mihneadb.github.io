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

resizePostHeader();