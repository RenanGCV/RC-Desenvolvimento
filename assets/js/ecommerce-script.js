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

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CART FUNCTIONALITY =====
let cartCount = 0;
const cartBadge = document.querySelector('.cart-badge');
const addToCartButtons = document.querySelectorAll('.action-btn:first-child');

addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartCount++;
        cartBadge.textContent = cartCount;
        
        // Animação de feedback
        cartBadge.style.animation = 'none';
        setTimeout(() => {
            cartBadge.style.animation = 'bounce 0.5s ease';
        }, 10);
        
        // Mostrar notificação
        showNotification('Produto adicionado ao carrinho! 🎉');
    });
});

// ===== FAVORITES =====
const favoriteButtons = document.querySelectorAll('.action-btn:nth-child(2)');

favoriteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.color = '#ff3b30';
            showNotification('Adicionado aos favoritos! ❤️');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.style.color = '';
            showNotification('Removido dos favoritos');
        }
    });
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 30px;
        background: #121212;
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Adicionar animações de notificação ao CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.3);
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===== PRODUCT CARD CLICK =====
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn')) {
            showNotification('Abrindo detalhes do produto...');
        }
    });
});

// ===== CATEGORY CARDS CLICK =====
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('h3').textContent;
        showNotification(`Explorando categoria: ${categoryName}`);
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== PARTICLES BACKGROUND =====
function createParticles() {
    const particlesContainer = document.querySelector('.particles-bg');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, #ff3b30, #ff6b6b);
            border-radius: 50%;
            animation: floatParticle ${duration}s ${delay}s infinite ease-in-out;
            opacity: 0.3;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// CSS para animação das partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() + 0.5});
        }
    }
`;
document.head.appendChild(particleStyle);

createParticles();

// ===== MOBILE MENU =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        
        if (navMenu.style.display === 'flex') {
            navMenu.style.position = 'absolute';
            navMenu.style.top = '80px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '2rem';
            navMenu.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ===== BUTTON INTERACTIONS =====
const allButtons = document.querySelectorAll('button:not(.action-btn):not(.icon-btn)');

allButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!e.target.closest('.product-card')) {
            const btnText = btn.textContent.trim();
            showNotification(`Ação: ${btnText}`);
        }
    });
});

// ===== HOVER SOUND EFFECT (OPCIONAL) =====
const hoverElements = document.querySelectorAll('.product-card, .category-card, .benefit-item');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== SCROLL TO TOP ON LOGO CLICK =====
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    logo.style.cursor = 'pointer';
}

console.log('%c🛍️ PHLOX E-commerce Demo', 'color: #ff3b30; font-size: 20px; font-weight: bold;');
console.log('%c✨ Projeto Demonstrativo - R&C Dev', 'color: #121212; font-size: 14px;');
console.log('%c🚀 Desenvolvido com HTML, CSS e JavaScript', 'color: #8e8e93; font-size: 12px;');
