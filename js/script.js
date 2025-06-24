document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    const navOverlay = document.getElementById('navOverlay');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    navOverlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
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
    
    // Smooth Scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
                if (mainNav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    mainNav.classList.remove('active');
                    navOverlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
    
    // Adiciona sombra ao header quando scrollar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Atualiza o ano no footer
    document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} Clínica do Notebook. Todos os direitos reservados.`;
});