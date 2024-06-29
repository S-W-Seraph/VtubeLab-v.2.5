
function animateAndNavigate(event, url, animation) {
    event.preventDefault(); // Prevent the default link behavior

    const elements = document.querySelectorAll('.animate__animated:not(.header)');
    let delay = 0;

    elements.forEach((element) => {
        setTimeout(() => {
            element.classList.remove('animate__fadeInDown');
            element.classList.add(animation);
            element.style.opacity = 1; // Ensure elements are visible before fading out
        }, delay);
        delay += 100; // Shorter delay for quicker fade-out
    });

    setTimeout(() => {
        window.location.href = url; // Navigate to the new page after animations
    }, delay + 500); // Add extra time to ensure all animations complete
}

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.animate__animated');
    let delay = 0;

    elements.forEach((element) => {
        if (element.classList.contains('header')) {
            element.classList.add('animate__fadeInDown');
            element.style.opacity = 1;
        } else {
            setTimeout(() => {
                element.classList.add('animate__fadeInDown');
                element.style.opacity = 1;
            }, delay);
            delay += 500;
        }
    });

    // Add event listeners to the links
    document.querySelector('a[href="catalog.html"]').addEventListener('click', function(event) {
        animateAndNavigate(event, 'catalog.html', 'animate__fadeOutRight');
    });

    document.querySelector('a[href="gallery.html"]').addEventListener('click', function(event) {
        animateAndNavigate(event, 'gallery.html', 'animate__fadeOutLeft');
    });

    document.querySelector('a[href="basket.html"]').addEventListener('click', function(event) {
        animateAndNavigate(event, 'basket.html', 'animate__fadeOutUp');
    });
});

