// Global State
let currentScreen = 'home';
let cartItems = [];
let quantity = 1;

// Screen Navigation
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        
        // Update bottom nav active state
        updateBottomNav(screenId);
        
        // Update sidebar active state
        updateSidebarNav(screenId);
        
        // Close sidebar if open
        closeSidebar();
    }
}

// Update Bottom Navigation
function updateBottomNav(screenId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.querySelector(`.nav-btn[onclick*="${screenId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Update Sidebar Navigation
function updateSidebarNav(screenId) {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.sidebar-link[onclick*="${screenId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    
    // Add overlay
    if (sidebar.classList.contains('active')) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.onclick = closeSidebar;
        document.body.appendChild(overlay);
    } else {
        removeOverlay();
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
    removeOverlay();
}

function removeOverlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Product Detail
function showProductDetail(name, price) {
    document.getElementById('detail-product-name').textContent = name;
    document.getElementById('detail-product-price').textContent = price;
    quantity = 1;
    document.getElementById('qty-value').textContent = quantity;
    showScreen('product-detail');
}

// Quantity Controls
function increaseQty() {
    quantity++;
    document.getElementById('qty-value').textContent = quantity;
    updateDetailPrice();
}

function decreaseQty() {
    if (quantity > 1) {
        quantity--;
        document.getElementById('qty-value').textContent = quantity;
        updateDetailPrice();
    }
}

function updateDetailPrice() {
    const basePriceText = document.getElementById('detail-product-price').textContent;
    const basePrice = parseFloat(basePriceText.replace('R$ ', '').replace(',', '.'));
    const totalPrice = (basePrice * quantity).toFixed(2).replace('.', ',');
    
    // Update only if showing calculated price
    if (quantity > 1) {
        document.getElementById('detail-product-price').textContent = `R$ ${totalPrice}`;
    }
}

// Add to Cart
function addToCart() {
    const productName = document.getElementById('detail-product-name').textContent;
    const productPrice = document.getElementById('detail-product-price').textContent;
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    const currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + quantity;
    
    // Show notification
    showNotification(`${quantity}x ${productName} adicionado ao carrinho!`, 'success');
    
    // Return to home after short delay
    setTimeout(() => {
        showScreen('home');
    }, 800);
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-blue)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Favorite Toggle
function toggleFavorite(event) {
    event.stopPropagation();
    const btn = event.currentTarget;
    btn.classList.toggle('active');
    
    const icon = btn.querySelector('i');
    const isActive = btn.classList.contains('active');
    
    if (isActive) {
        showNotification('Adicionado aos favoritos!', 'success');
        // Vibration effect
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    } else {
        showNotification('Removido dos favoritos', 'info');
    }
}

// Category Selection
function selectCategory(event) {
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Scroll Animations (AOS-like)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

// Particle Background Effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 59, 48, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.querySelector('.app-container').prepend(particlesContainer);
}

// Touch Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .sidebar-overlay {
        position: fixed;
        top: 48px;
        left: 0;
        width: 100%;
        height: calc(100% - 48px);
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        z-index: 999;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Show home screen
    showScreen('home');
    
    // Init scroll animations
    initScrollAnimations();
    
    // Create particles
    createParticles();
    
    // Add ripple effect to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Category chip interactions
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.addEventListener('click', selectCategory);
    });
    
    // Favorite button interactions
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });
    
    // Add smooth scroll behavior
    document.querySelectorAll('.main-content').forEach(content => {
        content.style.scrollBehavior = 'smooth';
    });
    
    // Prevent clicks on product cards from propagating when clicking favorite
    document.querySelectorAll('.product-card .favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    
    // Loading animation on first load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🍕 FoodExpress App Initialized!');
    console.log('📱 Demo Mobile - R&C Dev Portfolio');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions if needed
        console.log('Window resized');
    }, 250);
});

// Prevent default touch behavior on buttons
document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        e.target.style.transform = 'scale(0.95)';
    }
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        e.target.style.transform = 'scale(1)';
    }
}, { passive: true });

// Easter egg: Shake to refresh cart count
let shakeTimeout;
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', (event) => {
        const acceleration = event.accelerationIncludingGravity;
        if (acceleration.x > 15 || acceleration.y > 15 || acceleration.z > 15) {
            clearTimeout(shakeTimeout);
            shakeTimeout = setTimeout(() => {
                // Shake detected
                const cartCount = document.querySelector('.cart-count');
                cartCount.style.animation = 'none';
                setTimeout(() => {
                    cartCount.style.animation = 'pulse 0.5s ease 3';
                }, 10);
            }, 100);
        }
    });
}

// Export functions for inline onclick handlers
window.showScreen = showScreen;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.showProductDetail = showProductDetail;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.addToCart = addToCart;
