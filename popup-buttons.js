// popup-buttons.js
document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки, является ли кнопка исключением
    function isExcludedButton(element) {
        return (
            element.classList.contains('modal-close') || 
            element.closest('form') !== null ||
            element.onclick?.toString().includes('close') ||
            element.getAttribute('onclick')?.includes('close') ||
            // Кнопки меню/навигации (якоря)
            element.closest('.nav-menu') !== null ||
            element.closest('.navbar') !== null ||
            element.closest('.main-nav') !== null ||
            element.closest('.header-nav') !== null ||
            element.closest('.menu') !== null ||
            // Кнопки соцсетей
            element.closest('.social-links') !== null ||
            element.classList.contains('social-icon') ||
            // Кнопки для видео
            element.getAttribute('onclick')?.includes('openVideoModal') ||
            element.textContent?.toLowerCase().includes('видео') ||
            element.textContent?.toLowerCase().includes('смотреть') ||
            element.getAttribute('data-video') ||
            // Кнопки для сертификатов
            element.getAttribute('onclick')?.includes('openCertificateModal') ||
            element.textContent?.toLowerCase().includes('сертификат') ||
            element.textContent?.toLowerCase().includes('увеличить') ||
            // Кнопки переключения в карусели/слайдере/отзывах
            element.classList.contains('swiper-button') ||
            element.classList.contains('slider-arrow') ||
            element.classList.contains('carousel-control') ||
            element.classList.contains('testimonial-nav') ||
            element.closest('.testimonial-controls') !== null ||
            element.closest('.reviews-controls') !== null ||
            element.closest('.slider-controls') !== null
        );
    }

    // Получаем все кнопки с указанными классами
    const classSelectors = [
        '.request-button',
        '.header-button', // Предполагаем, что это кнопка в шапке
        '.equipment-button',
        '.calculate-button',
        '.contact-button',
        '.footer-callback'
    ].join(',');

    // Получаем все кнопки с указанными классами и тегом button
    const buttons = document.querySelectorAll(`${classSelectors}, button`);

    // Фильтруем кнопки по тексту и классам
    const requestButtons = Array.from(buttons).filter(button => {
        if (isExcludedButton(button)) return false;

        // Проверяем классы
        const hasClass = (
            button.classList.contains('request-button') ||
            button.classList.contains('header-button') ||
            button.classList.contains('equipment-button') ||
            button.classList.contains('calculate-button') ||
            button.classList.contains('contact-button') ||
            button.classList.contains('footer-callback')
        );

        // Проверяем текст кнопки
        const text = button.textContent?.toLowerCase() || '';
        const hasText = (
            text.includes('заявка') ||
            text.includes('заявку') ||
            text.includes('заказать звонок') ||
            text.includes('получить каталог') ||
            text.includes('рассчитать')
        );

        return hasClass || hasText;
    });

    // Привязываем обработчик к каждой кнопке заявки
    requestButtons.forEach(function(button) {
        // Если кнопка финансовой модели, открываем финансовую форму
        const text = button.textContent?.toLowerCase() || '';
        if (text.includes('финанс') || text.includes('рассчитать')) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                if (typeof openFinancialForm === 'function') {
                    openFinancialForm('financial');
                } else {
                    console.error('Функция openFinancialForm не найдена');
                }
            });
        }
        // Если кнопка каталога
        else if (text.includes('получить каталог')) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                if (typeof openFinancialForm === 'function') {
                    openFinancialForm('catalog');
                } else {
                    console.error('Функция openFinancialForm не найдена');
                }
            });
        }
        // Если кнопка заказа звонка
        else if (text.includes('заказать звонок')) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                if (typeof openPhoneForm === 'function') {
                    openPhoneForm();
                } else {
                    console.error('Функция openPhoneForm не найдена');
                }
            });
        }
        // Иначе открываем форму заявки
        else {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                if (typeof openFinancialForm === 'function') {
                    openFinancialForm('request');
                } else {
                    console.error('Функция openFinancialForm не найдена');
                }
            });
        }
    });
});