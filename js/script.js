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
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            
            // Fecha todas as outras respostas
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            // Alterna a resposta atual
            faqItem.classList.toggle('active');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = faqItem.querySelector('.faq-icon');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '-';
            } else {
                answer.style.maxHeight = '0';
                icon.textContent = '+';
            }
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