// Функция для открытия формы заявки при клике на "Посмотреть полный проект"
function openProjectModal(projectId) {
    console.log("Открытие проекта:", projectId);
    // Вместо открытия модального окна проекта вызываем форму заявки
    var modal = document.getElementById("requestFormModal");
    modal.classList.add("active");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Функция закрытия модального окна формы заявки
function closeRequestForm() {
    var modal = document.getElementById("requestFormModal");
    
    modal.classList.remove("active");
    setTimeout(function() {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Разблокируем прокрутку
    }, 300);
}

// Инициализация обработчиков после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    var requestFormModal = document.getElementById('requestFormModal');
    
    // Закрытие по клику вне контента
    if (requestFormModal) {
        requestFormModal.addEventListener('click', function(event) {
            if (event.target === requestFormModal) {
                closeRequestForm();
            }
        });
    }
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && requestFormModal && requestFormModal.classList.contains('active')) {
            closeRequestForm();
        }
    });
    
    // Найдем все кнопки закрытия формы
    var closeButtons = document.querySelectorAll('#requestFormModal .modal-close, #requestFormModal .close-button');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', closeRequestForm);
    });
}); 