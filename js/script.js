document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    mobileMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        mobileMenu.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking on overlay or links
    navOverlay.addEventListener('click', closeMenu);
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
        nav.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animated counter for stats
    const statCards = document.querySelectorAll('.stat-card h3');
    const statsSection = document.querySelector('.stats');

    function animateCounters() {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.75) && 
                          (rect.bottom >= window.innerHeight * 0.25);
        
        if (isVisible) {
            statCards.forEach(card => {
                const target = parseInt(card.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        clearInterval(counter);
                        card.textContent = target;
                    } else {
                        card.textContent = Math.floor(current);
                    }
                }, 16);
                
                card.removeAttribute('data-count');
            });
            
            observer.disconnect();
        }
    }

    const observer = new IntersectionObserver(animateCounters, {
        threshold: 0.5
    });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let slideInterval;

    if (testimonials.length > 0 && dotsContainer) {
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        function goToTestimonial(index) {
            testimonials[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            testimonials[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        // Navigation buttons
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                goToTestimonial(prevIndex);
                resetInterval();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const nextIndex = (currentIndex + 1) % testimonials.length;
                goToTestimonial(nextIndex);
                resetInterval();
            });
        }

        // Auto slide
        function startInterval() {
            slideInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % testimonials.length;
                goToTestimonial(nextIndex);
            }, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Pause on hover
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', startInterval);
        }

        startInterval();
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-icon').textContent = '+';
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-icon');
            icon.textContent = item.classList.contains('active') ? '-' : '+';
        });
    });

    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                closeMenu();
            }
        });
    });

    // Update year in footer
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${new Date().getFullYear()} Clínica do Notebook. Todos os direitos reservados.`;
    }

    // Form validation for contact page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');
            let isValid = true;
            
            if (name.value.trim() === '') {
                isValid = false;
                name.style.borderColor = 'var(--accent)';
            } else {
                name.style.borderColor = '';
            }
            
            if (email.value.trim() === '' || !email.value.includes('@')) {
                isValid = false;
                email.style.borderColor = 'var(--accent)';
            } else {
                email.style.borderColor = '';
            }
            
            if (message.value.trim() === '') {
                isValid = false;
                message.style.borderColor = 'var(--accent)';
            } else {
                message.style.borderColor = '';
            }
            
            if (isValid) {
                // Simulate form submission
                contactForm.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Mensagem enviada com sucesso!</h3>
                        <p>Entraremos em contato em breve.</p>
                    </div>
                `;
            }
        });
    }
});