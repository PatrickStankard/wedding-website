function setContentWrapperMinHeight() {
    let contentMinHeight;

    const windowHeight = $(window).height();
    const headerHeight = $('#header-wrapper').outerHeight(true);
    const contentHeight = $('#content-wrapper').outerHeight(true);
    const footerHeight = $('#footer-wrapper').outerHeight(true);

    if ((headerHeight + contentHeight + footerHeight) < windowHeight) {
        contentMinHeight = (windowHeight - headerHeight - (footerHeight * 2));
    } else {
        contentMinHeight = '';
    }

    $('#content-wrapper').css('min-height', contentMinHeight);
}

$(() => {
    setContentWrapperMinHeight();
    $('#footer-wrapper').removeClass('invisible');

    $(window).resize(setContentWrapperMinHeight);
});
