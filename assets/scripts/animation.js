document.addEventListener("DOMContentLoaded", function() {
    const animatedElement = document.getElementById("animatedElement");

    // Запуск анимации через 1 секунду после загрузки страницы
    setTimeout(() => {
        animatedElement.classList.add("visible");
    }, 1000);
});
