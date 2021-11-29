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

    function layoutHandler(e) {
        const burger = document.querySelector('.header__burger'),
            menu = document.querySelector('.header__top'),
            target = e.target,
            loginInfo = document.querySelector('.authorized__info');
        if (
            target.closest('.header__top') == null &&
            !target.classList.contains('header__burger')
        ) {
            burger.classList.remove('active');
            menu.classList.remove('active');
        }

        console.log();

        if (
            target.closest('.authorized__info') == null &&
            !target.classList.contains('authorized__portrain')
        ) {
            loginInfo.classList.remove('active');
        }
    }

    function menuBurgerHandler() {
        const burger = document.querySelector('.header__burger'),
            menu = document.querySelector('.header__top');

        burger.addEventListener('click', function () {
            this.classList.toggle('active');
            menu.classList.toggle('active');

            if (this.classList.contains('active')) {
                window.addEventListener('click', layoutHandler);
            } else {
                window.removeEventListener('click', layoutHandler);
            }
        });
    }

    function searchBtnHandler() {
        const searchBtn = document.querySelector('.catalog__mobile-search'),
            searchFilter = document.querySelector('.sidebar'),
            closeFilter = document.querySelector('.sidebar__close'),
            body = document.querySelector('body');

        if (searchBtn) {
            searchBtn.addEventListener('click', function () {
                searchBtn.classList.add('open');
                searchFilter.classList.add('open');
                body.classList.add('lock');
            });
        }

        if (closeFilter) {
            closeFilter.addEventListener('click', function () {
                searchBtn.classList.remove('open');
                searchFilter.classList.remove('open');
                body.classList.remove('lock');
            });
        }
    }

    function loginHandler() {
        const loginBtn = document.querySelector('.authorized__portrain'),
            loginInfo = document.querySelector('.authorized__info');

        if (loginBtn) {
            loginBtn.addEventListener('click', function () {
                loginInfo.classList.toggle('active');

                if (loginInfo.classList.contains('active')) {
                    window.addEventListener('click', layoutHandler);
                } else {
                    window.removeEventListener('click', layoutHandler);
                }
            });
        }
    }

    function favoriteTabsHandler() {
        const tabs = document.querySelector('.favorite__category'),
            tab = document.querySelectorAll('.favorite__item');

        if (tabs) {
            tabs.addEventListener('click', (e) => {
                const target = e.target;
                if (target.classList.contains('favorite__item')) {
                    tab.forEach((el) => {
                        el.classList.remove('active');
                    });
                    target.classList.add('active');
                }
            });
        }
    }

    function catalogCardHandler() {
        const catalogCards = document.querySelectorAll('.instrument--catalog');

        if (catalogCards) {
            catalogCards.forEach((el) => {
                elNotLiked = el.querySelector('.instrument__add-icon');
                elLiked = el.querySelector('.instrument__choosen-icon');

                elNotLiked.addEventListener('click', function (e) {
                    el.classList.add('choosen');
                });

                elLiked.addEventListener('click', function (e) {
                    el.classList.remove('choosen');
                });
            });
        }
    }

    popupLogic();
    sidebarToggle();
    menuBurgerHandler();
    searchBtnHandler();
    loginHandler();
    favoriteTabsHandler();
    catalogCardHandler();
});
