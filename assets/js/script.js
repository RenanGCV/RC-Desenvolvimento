// ===== ANIMAÇÕES AOS (Animate On Scroll) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observar todos os elementos com data-aos
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// ===== MENU MOBILE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Adicionar estilo ao menu mobile quando ativo
        if (navMenu.classList.contains('active')) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '70px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(15, 15, 35, 0.98)';
            navMenu.style.padding = '2rem';
            navMenu.style.gap = '1.5rem';
            navMenu.style.borderTop = '1px solid rgba(99, 102, 241, 0.2)';
        } else {
            navMenu.style.display = 'none';
        }
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navMenu.style.display = 'none';
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Adicionar sombra ao scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== PARTÍCULAS NO HERO =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 4 + 1;
        
        // Duração da animação aleatória
        const duration = Math.random() * 20 + 10;
        
        // Delay aleatório
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            animation: float-particle ${duration}s ${delay}s infinite ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() + 0.5});
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajuste para navbar fixa
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTADOR DE NÚMEROS (PARA ESTATÍSTICAS) =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== EFEITO DE DIGITAÇÃO NO HERO =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== LAZY LOADING DE IMAGENS =====
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== FORMULÁRIO DE CONTATO (SE ADICIONAR) =====
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Aqui você pode adicionar a lógica de envio do formulário
        console.log('Dados do formulário:', data);
        
        // Feedback visual
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular envio
        setTimeout(() => {
            submitButton.textContent = 'Enviado! ✓';
            submitButton.style.background = '#10b981';
            
            setTimeout(() => {
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// ===== ALTERNAR TEMA CLARO/ESCURO (OPCIONAL) =====
let isDarkMode = true;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.documentElement.style.setProperty('--dark-bg', '#0f0f23');
        document.documentElement.style.setProperty('--darker-bg', '#070714');
        document.documentElement.style.setProperty('--card-bg', '#1a1a2e');
    } else {
        document.documentElement.style.setProperty('--dark-bg', '#f8f9fa');
        document.documentElement.style.setProperty('--darker-bg', '#ffffff');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
    }
}

// ===== SCROLL REVEAL PARA ESTATÍSTICAS =====
const stats = document.querySelectorAll('.stat-number');

if (stats.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== CURSOR CUSTOMIZADO (OPCIONAL) =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * 0.1;
    cursorY += distY * 0.1;
    
    cursorFollower.style.left = cursorX + 'px';
    cursorFollower.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Adicionar estilos do cursor
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor,
    .cursor-follower {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        display: none; /* Ocultar em dispositivos móveis */
    }
    
    @media (min-width: 769px) {
        .custom-cursor,
        .cursor-follower {
            display: block;
        }
    }
    
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: var(--primary-color);
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s;
    }
    
    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid var(--primary-color);
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
    }
    
    a:hover ~ .custom-cursor,
    button:hover ~ .custom-cursor {
        width: 20px;
        height: 20px;
    }
    
    a:hover ~ .cursor-follower,
    button:hover ~ .cursor-follower {
        width: 60px;
        height: 60px;
    }
`;
document.head.appendChild(cursorStyle);

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 998;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 6px 25px rgba(99, 102, 241, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)';
});

// ===== ANALYTICS E TRACKING (OPCIONAL) =====
function trackEvent(category, action, label) {
    // Integração com Google Analytics ou similar
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    
    // Se usar Google Analytics:
    // gtag('event', action, {
    //     'event_category': category,
    //     'event_label': label
    // });
}

// Rastrear cliques nos botões de WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'Click', 'WhatsApp Button');
    });
});

// Rastrear visualização de planos
document.querySelectorAll('.plan-card').forEach(card => {
    const planObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const planName = entry.target.querySelector('.plan-name').textContent;
                trackEvent('Plans', 'View', planName);
                planObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    planObserver.observe(card);
});

// ===== NÚMERO DE WHATSAPP ATUALIZADO =====
// WhatsApp: (21) 97266-1951
// Formato: Código do país (55) + DDD (21) + Número (972661951)

console.log('%c🚀 Site desenvolvido por Renan & Cássio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c💼 Precisa de um site profissional? Entre em contato!', 'color: #25d366; font-size: 14px;');
console.log('%c📱 WhatsApp: https://wa.me/5521972661951', 'color: #94a3b8; font-size: 12px;');
