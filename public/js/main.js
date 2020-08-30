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

function onPhotoModalShow(event) {
    const anchor = $(event.relatedTarget);

    setPhotoModalContent(anchor);
}

function onPhotoModalKeyDown(event) {
    const modal = $('#photo-modal');
    const previousPhotoButton = modal.find('button.btn.photo-previous');
    const nextPhotoButton = modal.find('button.btn.photo-next');

    const keyCode = (event.keyCode ?? event.which);

    if (keyCode === 37) {
        previousPhotoButton.click();
    } else if (keyCode === 39) {
        nextPhotoButton.click();
    }
}

function onPhotoNavigationClick(event) {
    const button = $(event.target);
    const anchor = $('a.photo-thumbnail[href="' + button.data('url') + '"]');

    setPhotoModalContent(anchor);
}

function setPhotoModalContent(anchor) {
    const modal = $('#photo-modal');
    const previousPhotoButton = modal.find('button.btn.photo-previous');
    const nextPhotoButton = modal.find('button.btn.photo-next');

    const href = anchor.attr('href');
    const previousPhotoUrl = anchor.data('previousPhoto');
    const nextPhotoUrl = anchor.data('nextPhoto');

    modal.find('a.photo-download').attr('href', href);
    modal.find('img.photo-preview').attr('src', href);

    if (previousPhotoUrl) {
        previousPhotoButton.data('url', previousPhotoUrl);
        previousPhotoButton.attr('disabled', false);
    } else {
        previousPhotoButton.attr('disabled', true);
    }

    if (nextPhotoUrl) {
        nextPhotoButton.data('url', nextPhotoUrl);
        nextPhotoButton.attr('disabled', false);
    } else {
        nextPhotoButton.attr('disabled', true);
    }

    modal.modal('handleUpdate');
}

function setPreviousAndNextPhotos() {
    let index, currentPhoto, previousPhoto, nextPhoto;

    const photos = $('a.photo-thumbnail');
    const numPhotos = photos.length;

    for (index = 0; index < numPhotos; index++) {
        currentPhoto = photos.eq(index);

        if (index > 0) {
            previousPhoto = photos.eq(index - 1);
            currentPhoto.data('previous-photo', previousPhoto.attr('href'));
        }

        if (index < numPhotos - 1) {
            nextPhoto = photos.eq(index + 1);
            currentPhoto.data('next-photo', nextPhoto.attr('href'));
        }
    }
}

$(() => {
    setContentWrapperMinHeight();
    $('#footer-wrapper').removeClass('invisible');
    $(window).resize(setContentWrapperMinHeight);

    setPreviousAndNextPhotos();
    $('#photo-modal').on('show.bs.modal', onPhotoModalShow);
    $('button.btn.photo-previous, button.btn.photo-next').on('click', onPhotoNavigationClick);
    $('body').on('keydown', '#photo-modal, button.btn.photo-previous, button.btn.photo-next', onPhotoModalKeyDown);
});
