document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');

        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking on overlay or links
    navOverlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.main-nav ul li a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Services Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    if (tabBtns.length > 0 && serviceCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons
                tabBtns.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get data-tab value
                const tabName = this.getAttribute('data-tab');

                // Hide all service cards
                serviceCards.forEach(card => {
                    card.classList.remove('show');
                });

                // Show only cards with matching data-tab
                if (tabName === 'all') {
                    serviceCards.forEach(card => {
                        card.classList.add('show');
                    });
                } else {
                    const filteredCards = document.querySelectorAll(`.service-card.${tabName}`);
                    filteredCards.forEach(card => {
                        card.classList.add('show');
                    });
                }
            });
        });
    }

    // Testimonial Slider
    // Testimonial Slider
    const testimonialsContainer = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    let slideInterval;
    let isUserInteracting = false;

    if (testimonials.length > 0) {
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                isUserInteracting = true;
                goToTestimonial(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        // Ativa o testimonial atual
        function activateTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.classList.add('active');
                    dots[i].classList.add('active');
                } else {
                    testimonial.classList.remove('active');
                    dots[i].classList.remove('active');
                }
            });
        }

        // Navega para um testimonial específico
        function goToTestimonial(index) {
            currentIndex = index;
            activateTestimonial(currentIndex);

            if (isUserInteracting) {
                testimonials[currentIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }

        // Navegação pelos botões
        function navigate(direction) {
            isUserInteracting = true;
            let newIndex;

            if (direction === 'prev') {
                newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            } else {
                newIndex = (currentIndex + 1) % testimonials.length;
            }

            goToTestimonial(newIndex);
            resetInterval();
        }

        // Event listeners para os botões
        if (prevBtn) prevBtn.addEventListener('click', () => navigate('prev'));
        if (nextBtn) nextBtn.addEventListener('click', () => navigate('next'));

        // Auto slide
        function startInterval() {
            slideInterval = setInterval(() => {
                if (!document.hidden && isElementInViewport(testimonialsContainer)) {
                    isUserInteracting = false;
                    const nextIndex = (currentIndex + 1) % testimonials.length;
                    goToTestimonial(nextIndex);
                }
            }, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Verifica se o elemento está visível
        function isElementInViewport(el) {
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        // Pausa quando o mouse está sobre o slider
        if (testimonialsContainer) {
            testimonialsContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            testimonialsContainer.addEventListener('mouseleave', startInterval);
        }

        // Pausa quando a aba não está ativa
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(slideInterval);
            } else {
                resetInterval();
            }
        });

        // Inicialização
        activateTestimonial(0);
        startInterval();
    }
    // Testimonial Slider

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            if (icon) {
                icon.textContent = item.classList.contains('active') ? '-' : '+';
            }
        });
    });

    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Update URL without reload
                history.pushState(null, null, targetId);

                closeMenu();
            }
        });
    });

    // Update year in footer
    const footerYear = document.querySelector('.copyright p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
    }

    // Form validation for contact page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple validation
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const phone = contactForm.querySelector('#phone');
            const message = contactForm.querySelector('#message');
            let isValid = true;

            // Reset errors
            contactForm.querySelectorAll('.error').forEach(el => el.remove());

            if (name.value.trim() === '') {
                isValid = false;
                showError(name, 'Por favor, insira seu nome');
            }

            if (email.value.trim() === '' || !email.value.includes('@')) {
                isValid = false;
                showError(email, 'Por favor, insira um e-mail válido');
            }

            if (phone.value.trim() === '') {
                isValid = false;
                showError(phone, 'Por favor, insira seu telefone');
            }

            if (message.value.trim() === '') {
                isValid = false;
                showError(message, 'Por favor, insira sua mensagem');
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

        function showError(input, message) {
            const error = document.createElement('small');
            error.className = 'error';
            error.style.color = 'var(--danger-color)';
            error.textContent = message;
            input.parentNode.appendChild(error);
            input.style.borderColor = 'var(--danger-color)';
        }
    }

    // Animation on Scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.service-card, .quick-service-item, .step, .testimonial-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // WhatsApp button click event
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function (e) {
            // You can add tracking here
            console.log('WhatsApp button clicked');
        });
    }
});