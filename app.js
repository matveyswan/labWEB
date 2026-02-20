/* Тема */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Применяем тему сразу
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    });
}

/* Прогресс бар и скролл */
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
    const windowScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
    }
}, { passive: true });

/* курсор и паралакс только для пк */
const trail = document.getElementById("cursorTrail");
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobile && trail) {
    let mouseX = 0, mouseY = 0, ballX = 0, ballY = 0;
    const speed = 0.2;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const bg = document.querySelector(".parallax-bg");
        if (bg) {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            bg.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.1)`;
        }
    });

    function animateCursor() {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        trail.style.left = ballX + "px";
        trail.style.top = ballY + "px";
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* эффекты наведения */
    const interactive = document.querySelectorAll('a, button, details, summary');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            trail.style.transform = 'translate(-50%, -50%) scale(2.5)';
            trail.style.opacity = '0.2';
        });
        el.addEventListener('mouseleave', () => {
            trail.style.transform = 'translate(-50%, -50%) scale(1)';
            trail.style.opacity = '0.7';
        });
    });
} else if (trail) {
    trail.style.display = 'none';
}

/* Карусель */
const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const dotsNav = document.querySelector('.carousel-dots');

if (track && nextButton && prevButton && dotsNav) {
    const slides = Array.from(track.children);
    const dots = Array.from(dotsNav.children);
    let currentSlideIndex = 0;

    const updateSlide = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    };

    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlide(currentSlideIndex);
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlide(currentSlideIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            updateSlide(index);
        });
    });

    /* Свайп на карусели */
    let touchStartX = 0;
    track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, {passive: true});
    track.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) nextButton.click();
        if (touchStartX - touchEndX < -50) prevButton.click();
    });

}
