window.addEventListener('DOMContentLoaded', function loaded() {
    function popupLogic() {
        'use strict';
        const popupLinks = document.querySelectorAll('.popup-link');
        const body = document.querySelector('body');
        const lockPadding = document.querySelectorAll('.lock-padding');

        let unlock = true;

        const timeout = 800;

        if (popupLinks.length > 0) {
            for (let i = 0; i < popupLinks.length; i++) {
                const popupLink = popupLinks[i];

                popupLink.addEventListener('click', (e) => {
                    const popupName = popupLink
                        .getAttribute('href')
                        .replace('#', '');
                    const currentPopup = document.getElementById(popupName);
                    popupOpen(currentPopup);
                    e.preventDefault();
                });
            }
        }

        const popupCloseIcon = document.querySelectorAll('.close-popup');

        if (popupCloseIcon.length > 0) {
            for (let i = 0; i < popupCloseIcon.length; i++) {
                const el = popupCloseIcon[i];
                el.addEventListener('click', (e) => {
                    popupClose(el.closest('.popup'));
                    e.preventDefault();
                });
            }
        }

        function popupOpen(currentPopup) {
            if (currentPopup && unlock) {
                const popupActive = document.querySelector('.popup.open');

                if (popupActive) {
                    popupClose(popupActive, false);
                } else {
                    bodyLock();
                }

                currentPopup.classList.add('open');
                currentPopup.addEventListener('click', (e) => {
                    if (!e.target.closest('.popup__content')) {
                        popupClose(e.target.closest('.popup'));
                    }
                });
            }
        }

        function popupClose(popupActive, doUnlock = true) {
            if (unlock) {
                popupActive.classList.remove('open');
                if (doUnlock) {
                    bodyUnlock();
                }
            }
        }

        function bodyLock() {
            const lockPaddingValue =
                window.innerWidth - body.offsetWidth + 'px';

            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = lockPaddingValue;
                }
            }

            body.style.paddingRight = lockPaddingValue;
            body.classList.add('lock');

            unlock = false;
            setTimeout(function timer() {
                unlock = true;
            }, timeout);
        }

        function bodyUnlock() {
            setTimeout(() => {
                if (lockPadding.length > 0) {
                    for (let i = 0; i < lockPadding.length; i++) {
                        const el = lockPadding[i];
                        el.style.paddingRight = '0px';
                    }
                }
                body.style.paddingRight = '0px';
                body.classList.remove('lock');
            }, timeout);

            unlock = false;
            setTimeout(function timer() {
                unlock = true;
            }, timeout);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const popupActive = document.querySelector('.popup.open');
                popupClose(popupActive);
            }
        });

        (function () {
            if (!Element.prototype.closest) {
                Element.prototype.closest = function (css) {
                    var node = this;

                    while (node) {
                        if (node.matches(css)) return node;
                        else node = node.parentElement;
                    }
                    return null;
                };
            }
        })();

        (function () {
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector;
            }
        })();
    }

    function sidebarToggle() {
        const singleBars = document.querySelectorAll('.sidebar-single__show'),
            singleLists = document.querySelectorAll('.sidebar-single__list');

        singleBars.forEach((el) => {
            el.addEventListener('click', (e) => {
                let target = e.target;
                if (target.closest('.sidebar-single__show')) {
                    target
                        .closest('.sidebar-single__show')
                        .nextElementSibling.classList.toggle('show');

                    target
                        .closest('.sidebar-single__show')
                        .querySelector('.catalog__search-icon')
                        .classList.toggle('show');
                }
            });
        });
    }

    popupLogic();
    sidebarToggle();
});
