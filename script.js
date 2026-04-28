document.addEventListener('DOMContentLoaded', function() {
    // ========== INITIALIZE SWIPER SLIDER ==========
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        effect: 'slide',
        speed: 800,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        parallax: true,
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                const progressFill = document.querySelector('.autoplay-progress .progress-fill');
                if (progressFill) {
                    const circumference = 2 * Math.PI * 45;
                    const dashoffset = circumference * (1 - progress);
                    progressFill.style.strokeDasharray = `${circumference}`;
                    progressFill.style.strokeDashoffset = dashoffset;
                }
                const progressSpan = document.querySelector('.autoplay-progress span');
                if (progressSpan) {
                    progressSpan.textContent = `${Math.ceil(time / 1000)}s`;
                }
            }
        }
    });

    // ========== INITIALIZE AOS ANIMATION ==========
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // ========== STICKY NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========== STATISTICS COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateNumbers() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 80;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
        animated = true;
    }

    // Trigger counter when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});