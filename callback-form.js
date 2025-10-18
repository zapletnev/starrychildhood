function openCallbackForm() {
    var modal = document.getElementById('callbackFormModal');
    
    // Сначала показываем оверлей
    modal.style.display = "flex";
    
    // Добавляем небольшую задержку перед анимацией для плавности
    setTimeout(function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }, 10);
}

function closeCallbackForm() {
    var modal = document.getElementById('callbackFormModal');
    
    // Плавно скрываем модальное окно
    modal.classList.remove('active');
    setTimeout(function() {
        modal.style.display = "none";
        document.body.style.overflow = ''; // Разблокируем прокрутку
    }, 500); // Увеличиваем время анимации
}

// Инициализация формы заказа звонка
document.addEventListener('DOMContentLoaded', function() {
    var callbackFormModal = document.getElementById('callbackFormModal');
    var callbackForm = document.getElementById('callbackForm');
    
    // Добавляем обработчик для закрытия по клику вне формы
    if (callbackFormModal) {
        callbackFormModal.addEventListener('click', function(event) {
            if (event.target === callbackFormModal) {
                closeCallbackForm();
            }
        });
    }
    
    // Добавляем обработчик для закрытия по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && callbackFormModal && callbackFormModal.classList.contains('active')) {
            closeCallbackForm();
        }
    });
    
    // Функция валидации телефона
    function isValidPhone(phone) {
        // Удаляем все, кроме цифр и проверяем длину
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 10;
    }
    
    // Функция для показа ошибки
    function showFieldError(field, message) {
        const wrapper = field.closest('.input-wrapper');
        
        // Удаляем существующее сообщение об ошибке, если есть
        let existingError = wrapper.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Создаем сообщение об ошибке
        const errorMsg = document.createElement('div');
        errorMsg.className = 'field-error';
        errorMsg.textContent = message;
        
        // Добавляем класс ошибки к обертке поля
        wrapper.classList.add('has-error');
        
        // Добавляем сообщение после поля
        wrapper.appendChild(errorMsg);
        
        // Добавляем дрожащую анимацию
        wrapper.classList.add('shake');
        setTimeout(() => {
            wrapper.classList.remove('shake');
        }, 500);
    }
    
    // Функция для очистки ошибки
    function clearFieldError(field) {
        const wrapper = field.closest('.input-wrapper');
        const errorMsg = wrapper.querySelector('.field-error');
        
        if (errorMsg) {
            errorMsg.remove();
            wrapper.classList.remove('has-error');
        }
    }
    
    // Обработка отправки формы заказа звонка
    if (callbackForm) {
        // Валидация полей при изменении значения
        const phoneField = document.getElementById('callbackPhone');
        
        if (phoneField) {
            phoneField.addEventListener('blur', function() {
                if (this.value && !isValidPhone(this.value)) {
                    showFieldError(this, 'Пожалуйста, введите корректный номер телефона');
                } else {
                    clearFieldError(this);
                }
            });
        }
        
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            var phone = document.getElementById('callbackPhone').value;
            var name = document.getElementById('callbackName').value;
            
            // Валидация полей перед отправкой
            let isFormValid = true;
            
            if (!name) {
                showFieldError(document.getElementById('callbackName'), 'Это поле обязательно для заполнения');
                isFormValid = false;
            }
            
            if (!phone) {
                showFieldError(phoneField, 'Это поле обязательно для заполнения');
                isFormValid = false;
            } else if (!isValidPhone(phone)) {
                showFieldError(phoneField, 'Пожалуйста, введите корректный номер телефона');
                isFormValid = false;
            }
            
            // Если форма не прошла валидацию, прерываем отправку
            if (!isFormValid) {
                return;
            }
            
            // Имитация отправки данных
            var submitButton = this.querySelector('button[type="submit"]');
            var originalBtnHtml = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="button-text">Отправка...</span>';
            submitButton.disabled = true;
            
            // Добавляем анимацию загрузки
            submitButton.classList.add('loading');
            
            // Имитация задержки отправки
            setTimeout(function() {
                // Закрываем модальное окно
                closeCallbackForm();
                
                // Создаем уведомление об успешной отправке
                let successNotification = document.createElement('div');
                successNotification.className = 'success-notification';
                successNotification.innerHTML = `
                    <div class="success-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="success-message">
                        <h3>Спасибо!</h3>
                        <p>Ваша заявка на звонок принята! Мы свяжемся с вами в ближайшее время.</p>
                    </div>
                `;
                document.body.appendChild(successNotification);
                
                // Показываем уведомление
                setTimeout(() => {
                    successNotification.classList.add('show');
                }, 100);
                
                // Скрываем уведомление через 5 секунд
                setTimeout(() => {
                    successNotification.classList.remove('show');
                    setTimeout(() => {
                        successNotification.remove();
                    }, 500);
                }, 5000);
                
                // Сбрасываем форму
                callbackForm.reset();
                submitButton.innerHTML = originalBtnHtml;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }, 1800);
        });
    }
    
    // Маска для телефона в форме заказа звонка
    var phoneInput = document.getElementById('callbackPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + ') ' + (x[3] ? x[3] + '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }
    
    // Добавляем обработчики на все кнопки "Заказать звонок" в футере
    var callbackButtons = document.querySelectorAll('.footer-callback');
    callbackButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openCallbackForm();
        });
    });
});
