// Задержка перед началом анимации
setTimeout(function() {
    // Показываем хедер с анимацией
    document.querySelector('header').style.visibility = 'visible';
    document.querySelector('header').classList.add('animate__animated', 'animate__fadeInDown');

// Задержка перед появлением другого элемента
setTimeout(function() {
// Показываем другой элемент с анимацией
    document.querySelector('intro__subtitle').style.visibility = 'visible';
        document.querySelector('intro__subtitle').classList.add('animate__animated', 'animate__fadeIn');
    }, 1000); // Задержка в 2 секунды
}, 500); // Задержка в 2 секунды