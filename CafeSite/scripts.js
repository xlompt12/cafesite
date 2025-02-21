document.addEventListener("DOMContentLoaded", function() {
    // Скрыть анимацию загрузки после загрузки страницы
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none'; // Убираем элемент из потока
        }, 300); // Время на исчезновение
    }, 500); // Задержка перед скрытием

    // Функция для валидации формы
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.classList.add('error'); // Добавляем класс ошибки
                input.nextElementSibling.textContent = 'Это поле обязательно для заполнения'; // Сообщение об ошибке
            } else {
                input.classList.remove('error'); // Убираем класс ошибки
                input.nextElementSibling.textContent = ''; // Очищаем сообщение об ошибке
            }
        });

        return isValid;
    }

    // Обработка форм бронирования и контактов
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.onsubmit = function(event) {
            event.preventDefault(); // Предотвращаем отправку формы по умолчанию

            if (validateForm(bookingForm)) {
                alert('Форма успешно отправлена!');
                bookingForm.reset(); // Сбрасываем форму после успешной отправки
            }
        };
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = function(event) {
            event.preventDefault(); // Предотвращаем отправку формы по умолчанию

            if (validateForm(contactForm)) {
                alert('Ваше сообщение отправлено!');
                contactForm.reset(); // Сбрасываем форму после успешной отправки
            }
        };
    }

    // Логика для корзины заказа еды
    const cartItems = [];
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const menuItem = button.closest('.menu-item');
            const itemName = menuItem.getAttribute('data-name');
            const itemPrice = parseInt(menuItem.getAttribute('data-price'));

            cartItems.push({ name: itemName, price: itemPrice });
            updateCart();
        });
    });

    function updateCart() {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} ₽`;
            cartItemsList.appendChild(li);
            
            totalPrice += item.price;
        });

        totalPriceElement.textContent = `${totalPrice} ₽`;
    }

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Ваша корзина пуста!');
            return;
        }
        
        // Открываем модальное окно с деталями заказа
        openCheckoutModal();
    });

    function openCheckoutModal() {
        const modalCartItemsList = document.getElementById('modal-cart-items');
        const modalTotalPriceElement = document.getElementById('modal-total-price');

        modalCartItemsList.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} ₽`;
            modalCartItemsList.appendChild(li);
            
            totalPrice += item.price;
        });

        modalTotalPriceElement.textContent = `${totalPrice} ₽`;
        
        // Показать модальное окно
        document.getElementById('checkout-modal').style.display = 'block';
    }

    document.querySelector('.close-button').addEventListener('click', () => {
        document.getElementById('checkout-modal').style.display = 'none';
    });

    document.getElementById('submit-order-button').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;

        if (!name || !address) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        alert(`Заказ оформлен!\nИмя: ${name}\nАдрес: ${address}\nОбщая стоимость: ${modalTotalPriceElement.textContent}`);

        // Очищаем корзину после оформления заказа
        cartItems.length = 0;
        
        // Обновляем отображение корзины и закрываем модальное окно
        updateCart();
        document.getElementById('checkout-modal').style.display = 'none';
    });
});
