function openRequestForm() {
    var modal = document.getElementById('requestFormModal');
    
    // Сначала показываем оверлей
    modal.style.display = "flex";
    
    // Добавляем небольшую задержку перед анимацией для плавности
    setTimeout(function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }, 10);
}

function closeRequestForm() {
    var modal = document.getElementById('requestFormModal');
    
    // Плавно скрываем модальное окно
    modal.classList.remove('active');
    setTimeout(function() {
        modal.style.display = "none";
        document.body.style.overflow = ''; // Разблокируем прокрутку
    }, 500); // Увеличиваем время анимации
}

// Инициализация формы заявки
document.addEventListener('DOMContentLoaded', function() {
    var requestFormModal = document.getElementById('requestFormModal');
    var requestForm = document.getElementById('requestForm');
    
    // Добавляем обработчик для закрытия по клику вне формы
    if (requestFormModal) {
        requestFormModal.addEventListener('click', function(event) {
            if (event.target === requestFormModal) {
                closeRequestForm();
            }
        });
    }
    
    // Добавляем обработчик для закрытия по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && requestFormModal && requestFormModal.classList.contains('active')) {
            closeRequestForm();
        }
    });
    
    // Функция валидации email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
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
    
    // Обработка отправки формы заявки
    if (requestForm) {
        // Валидация полей при изменении значения
        const emailField = document.getElementById('requestEmail');
        const phoneField = document.getElementById('requestPhone');
        
        if (emailField) {
            emailField.addEventListener('blur', function() {
                if (this.value && !isValidEmail(this.value)) {
                    showFieldError(this, 'Пожалуйста, введите корректный email');
                } else {
                    clearFieldError(this);
                }
            });
            
            emailField.addEventListener('input', function() {
                if (this.value && isValidEmail(this.value)) {
                    clearFieldError(this);
                }
            });
        }
        
        if (phoneField) {
            phoneField.addEventListener('blur', function() {
                if (this.value && !isValidPhone(this.value)) {
                    showFieldError(this, 'Пожалуйста, введите корректный номер телефона');
                } else {
                    clearFieldError(this);
                }
            });
        }
        
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            var email = document.getElementById('requestEmail').value;
            var phone = document.getElementById('requestPhone').value;
            var name = document.getElementById('requestName').value;
            var theme = document.getElementById('requestTheme').value;
            var size = document.getElementById('requestSize').value;
            var message = document.getElementById('requestMessage').value;
            
            // Валидация полей перед отправкой
            let isFormValid = true;
            
            if (!name) {
                showFieldError(document.getElementById('requestName'), 'Это поле обязательно для заполнения');
                isFormValid = false;
            }
            
            if (!email) {
                showFieldError(emailField, 'Это поле обязательно для заполнения');
                isFormValid = false;
            } else if (!isValidEmail(email)) {
                showFieldError(emailField, 'Пожалуйста, введите корректный email');
                isFormValid = false;
            }
            
            if (!phone) {
                showFieldError(phoneField, 'Это поле обязательно для заполнения');
                isFormValid = false;
            } else if (!isValidPhone(phone)) {
                showFieldError(phoneField, 'Пожалуйста, введите корректный номер телефона');
                isFormValid = false;
            }
            
            if (!theme || theme === "") {
                showFieldError(document.getElementById('requestTheme'), 'Пожалуйста, выберите тематику');
                isFormValid = false;
            }
            
            if (!size) {
                showFieldError(document.getElementById('requestSize'), 'Это поле обязательно для заполнения');
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
                closeRequestForm();
                
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
                        <p>Ваша заявка успешно отправлена! Наш менеджер свяжется с вами в ближайшее время.</p>
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
                requestForm.reset();
                submitButton.innerHTML = originalBtnHtml;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }, 1800);
        });
    }
    
    // Маска для телефона в форме заявки
    var phoneInput = document.getElementById('requestPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + ') ' + (x[3] ? x[3] + '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }
    
    // Добавляем обработчики на все кнопки "Получить каталог"
    var catalogButtons = document.querySelectorAll('.equipment-button');
    catalogButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openRequestForm();
        });
    });
    
    // Добавление стилей для ошибок и анимации
    function addStyles() {
        const styleTag = document.createElement('style');
        styleTag.textContent = `
            .input-wrapper.has-error {
                border-color: rgba(255, 66, 66, 0.5) !important;
                box-shadow: 0 8px 20px rgba(255, 66, 66, 0.15) !important;
            }
            
            .field-error {
                color: #ff4242;
                font-size: 12px;
                margin-top: 5px;
                font-weight: 500;
                padding-left: 15px;
                opacity: 0;
                animation: fadeInError 0.3s ease forwards;
            }
            
            @keyframes fadeInError {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .shake {
                animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            }
            
            @keyframes shake {
                10%, 90% { transform: translateX(-1px); }
                20%, 80% { transform: translateX(2px); }
                30%, 50%, 70% { transform: translateX(-3px); }
                40%, 60% { transform: translateX(3px); }
            }
            
            .submit-button.loading {
                position: relative;
                overflow: hidden;
            }
            
            .submit-button.loading:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 0;
                background: rgba(255, 255, 255, 0.2);
                animation: loading 1.5s infinite ease-in-out;
            }
            
            @keyframes loading {
                0% { width: 0; left: 0; }
                50% { width: 100%; }
                100% { width: 0; left: 100%; }
            }
            
            .success-notification {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                color: white;
                padding: 20px;
                border-radius: 15px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                max-width: 400px;
            }
            
            .success-notification.show {
                transform: translateX(0);
            }
            
            .success-icon {
                background: rgba(255, 255, 255, 0.2);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .success-message h3 {
                margin: 0 0 5px 0;
                font-size: 18px;
            }
            
            .success-message p {
                margin: 0;
                font-size: 14px;
                opacity: 0.9;
            }
            
            @media (max-width: 600px) {
                .success-notification {
                    bottom: 20px;
                    right: 20px;
                    left: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styleTag);
    }
    
    // Добавляем стили
    addStyles();
});
