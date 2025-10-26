// ========================================
// RESTAURANT WEBSITE - JAVASCRIPT
// ========================================

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initFormValidation();
    
    console.log('🍽️ Restaurant Website Initialized!');
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

function initHeader() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link-rest');
    
    // Header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Initial check
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    }
}

// ========================================
// UPDATE ACTIVE NAV LINK
// ========================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-rest');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link-rest');
    
    if (!mobileToggle) return;
    
    // Toggle menu
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ignore if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                const demoNoticeHeight = document.querySelector('.demo-notice-rest').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - demoNoticeHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

function initFormValidation() {
    const form = document.querySelector('.form-rest');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show success message
        showReservationSuccess();
        
        // Reset form
        form.reset();
    });
}

function showReservationSuccess() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message-rest';
    successMessage.innerHTML = `
        <div class="success-content-rest">
            <i class="fas fa-check-circle"></i>
            <h3>Reserva Confirmada!</h3>
            <p>Sua reserva foi recebida com sucesso. Em breve entraremos em contato para confirmar.</p>
            <button class="btn-close-success-rest">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .success-message-rest {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
        }
        
        .success-content-rest {
            background: var(--color-bg-secondary);
            padding: 3rem;
            border-radius: 12px;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 0 50px rgba(208, 140, 50, 0.3);
            position: relative;
            animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .success-content-rest i.fa-check-circle {
            font-size: 4rem;
            color: var(--color-accent-gold);
            margin-bottom: 1rem;
        }
        
        .success-content-rest h3 {
            font-family: var(--font-heading);
            font-size: 2rem;
            color: var(--color-white);
            margin-bottom: 1rem;
        }
        
        .success-content-rest p {
            color: var(--color-text-secondary);
            font-size: 1rem;
            line-height: 1.6;
        }
        
        .btn-close-success-rest {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: none;
            color: var(--color-text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn-close-success-rest:hover {
            background: var(--color-accent-gold);
            color: var(--color-bg-primary);
            transform: rotate(90deg);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(successMessage);
    
    // Close button
    const closeBtn = successMessage.querySelector('.btn-close-success-rest');
    closeBtn.addEventListener('click', () => {
        successMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    });
    
    // Close on background click
    successMessage.addEventListener('click', (e) => {
        if (e.target === successMessage) {
            successMessage.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(successMessage)) {
            successMessage.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }
    }, 5000);
}

// ========================================
// GALLERY LIGHTBOX
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item-rest');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay-rest span');
        
        openLightbox(img.src, caption.textContent);
    });
});

function openLightbox(imageSrc, caption) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-rest';
    lightbox.innerHTML = `
        <div class="lightbox-content-rest">
            <button class="lightbox-close-rest">
                <i class="fas fa-times"></i>
            </button>
            <img src="${imageSrc}" alt="${caption}">
            <p class="lightbox-caption-rest">${caption}</p>
        </div>
    `;
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-rest {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10002;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content-rest {
            max-width: 90%;
            max-height: 90%;
            position: relative;
            animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .lightbox-content-rest img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
            box-shadow: 0 0 50px rgba(208, 140, 50, 0.3);
        }
        
        .lightbox-caption-rest {
            text-align: center;
            color: var(--color-white);
            font-size: 1.2rem;
            margin-top: 1.5rem;
            font-weight: 600;
        }
        
        .lightbox-close-rest {
            position: absolute;
            top: -50px;
            right: 0;
            background: var(--color-accent-gold);
            color: var(--color-bg-primary);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-close-rest:hover {
            transform: rotate(90deg) scale(1.1);
            box-shadow: 0 0 20px rgba(208, 140, 50, 0.5);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    // Close button
    const closeBtn = lightbox.querySelector('.lightbox-close-rest');
    closeBtn.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.contains(lightbox)) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });
}

// ========================================
// ENQUIRY BUTTON
// ========================================

const enquiryBtn = document.querySelector('.btn-enquiry-rest');

if (enquiryBtn) {
    enquiryBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        const headerHeight = document.getElementById('header').offsetHeight;
        const demoNoticeHeight = document.querySelector('.demo-notice-rest').offsetHeight;
        
        window.scrollTo({
            top: contactSection.offsetTop - headerHeight - demoNoticeHeight,
            behavior: 'smooth'
        });
    });
}

// ========================================
// ADD PARALLAX EFFECT TO HERO
// ========================================

window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image-rest');
    if (heroImage) {
        const scrolled = window.scrollY;
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// ANIMATE MENU PRICES ON HOVER
// ========================================

const menuItems = document.querySelectorAll('.menu-item-rest');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const price = item.querySelector('.menu-price-rest');
        price.style.animation = 'priceGlow 0.6s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        const price = item.querySelector('.menu-price-rest');
        price.style.animation = '';
    });
});

// Add price glow animation
const priceStyle = document.createElement('style');
priceStyle.textContent = `
    @keyframes priceGlow {
        0%, 100% {
            text-shadow: none;
        }
        50% {
            text-shadow: 0 0 20px rgba(208, 140, 50, 0.8);
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(priceStyle);

console.log('✨ All interactions initialized successfully!');
