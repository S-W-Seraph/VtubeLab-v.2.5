// Изначально скрываем элементы
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('header').style.visibility = 'hidden';
    document.querySelector('.intro__subtitle').style.visibility = 'hidden';
    document.querySelector('.intro__title').style.visibility = 'hidden';
    document.querySelector('h3').style.visibility = 'hidden';
    document.querySelector('p').style.visibility = 'hidden';
    document.querySelector('.slider').style.visibility = 'hidden';
});

// Задержка перед началом анимации
setTimeout(function() {
    const introSubtitle = document.querySelector('.intro__subtitle');
    introSubtitle.style.visibility = 'visible';
    introSubtitle.classList.add('animate__fadeIn');

    setTimeout(function() {
        const header = document.querySelector('header');
        header.style.visibility = 'visible';
        header.classList.add('animate__fadeInDown');

        const introTitle = document.querySelector('.intro__title');
        introTitle.style.visibility = 'visible';
        introTitle.classList.add('animate__fadeIn');
    }, 1000);

}, 500);

// Обработка нажатия на main
document.querySelector('main').addEventListener('click', function() {
    const introSubtitle = document.querySelector('.intro__subtitle');
    introSubtitle.classList.add('animate__fadeOut');
    setTimeout(() => introSubtitle.style.visibility = 'hidden', 1000);

    const introTitle = document.querySelector('.intro__title');
    introTitle.classList.add('animate__fadeOut');
    setTimeout(() => introTitle.style.visibility = 'hidden', 1000);

    setTimeout(() => {
        const h3 = document.querySelector('h3');
        h3.style.visibility = 'visible';
        h3.classList.add('animate__fadeInUp');

        setTimeout(() => {
            const p = document.querySelector('p');
            p.style.visibility = 'visible';
            p.classList.add('animate__fadeInUp');

            setTimeout(() => {
                const slider = document.querySelector('.slider');
                slider.style.visibility = 'visible';
                slider.classList.add('animate__fadeInUp');
            }, 500);
        }, 500);
    }, 1000);
});

// Обработка скролла вверх для возврата к предыдущему слайду
window.addEventListener('scroll', function() {
    if (window.scrollY === 0) {
        document.querySelector('header').classList.remove('animate__fadeInDown');
        document.querySelector('.intro__subtitle').classList.remove('animate__fadeIn', 'animate__fadeOutUp');
        document.querySelector('.intro__title').classList.remove('animate__fadeIn', 'animate__fadeOutLeft');

        document.querySelector('.intro__subtitle').classList.add('animate__fadeIn');
        document.querySelector('.intro__subtitle').style.visibility = 'visible';

        document.querySelector('header').classList.add('animate__fadeInDown');
        document.querySelector('header').style.visibility = 'visible';

        document.querySelector('.intro__title').classList.add('animate__fadeIn');
        document.querySelector('.intro__title').style.visibility = 'visible';

        document.querySelector('h3').style.visibility = 'hidden';
        document.querySelector('p').style.visibility = 'hidden';
        document.querySelector('.slider').style.visibility = 'hidden';
    }
});
