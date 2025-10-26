// ========================================
// EAD PLATFORM - JAVASCRIPT
// ========================================

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initAnimations();
    initPlanningTabs();
    initProgressAnimations();
    initSearch();
    
    console.log('📚 EAD Platform Initialized!');
});

// ========================================
// SIDEBAR FUNCTIONALITY
// ========================================

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navItems = document.querySelectorAll('.nav-item-ead');
    
    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Add bounce animation
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.animation = 'bounce 0.5s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            }
            
            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
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
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// PLANNING TABS
// ========================================

function initPlanningTabs() {
    const tabs = document.querySelectorAll('.planning-tab-ead');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Add ripple effect
            createRipple(tab, event);
        });
    });
}

// ========================================
// PROGRESS ANIMATIONS
// ========================================

function initProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress-fill-ead');
    const progressCircles = document.querySelectorAll('.circle-ead');
    
    // Animate progress bars
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Animate progress circles
    progressCircles.forEach(circle => {
        observer.observe(circle);
    });
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function initSearch() {
    const searchInput = document.querySelector('.search-bar-ead input');
    const courseCards = document.querySelectorAll('.course-card-ead');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            courseCards.forEach(card => {
                const title = card.querySelector('.course-title-ead').textContent.toLowerCase();
                const subtitle = card.querySelector('.course-subtitle-ead').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeUp 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// ========================================
// COURSE CARD INTERACTIONS
// ========================================

const courseCards = document.querySelectorAll('.course-card-ead');

courseCards.forEach(card => {
    card.addEventListener('click', () => {
        showCourseModal(card);
    });
    
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.course-icon-ead i');
        if (icon) {
            icon.style.animation = 'bounce 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.course-icon-ead i');
        if (icon) {
            icon.style.animation = '';
        }
    });
});

// ========================================
// COURSE MODAL
// ========================================

function showCourseModal(card) {
    const title = card.querySelector('.course-title-ead').textContent;
    const subtitle = card.querySelector('.course-subtitle-ead').textContent;
    const colorClass = card.classList[1]; // blue, purple, yellow, red
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'course-modal-ead';
    modal.innerHTML = `
        <div class="modal-content-ead ${colorClass}">
            <button class="modal-close-ead">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-header-ead">
                <div class="modal-icon-ead">
                    ${card.querySelector('.course-icon-ead').innerHTML}
                </div>
                <h2>${title}</h2>
                <p>${subtitle}</p>
            </div>
            <div class="modal-body-ead">
                <div class="modal-stats-ead">
                    <div class="modal-stat-ead">
                        <i class="fas fa-play-circle"></i>
                        <span>24 Video Lessons</span>
                    </div>
                    <div class="modal-stat-ead">
                        <i class="fas fa-clock"></i>
                        <span>12 Hours Total</span>
                    </div>
                    <div class="modal-stat-ead">
                        <i class="fas fa-certificate"></i>
                        <span>Certificate Included</span>
                    </div>
                </div>
                <div class="modal-description-ead">
                    <h3>Course Description</h3>
                    <p>This comprehensive course will take you from beginner to advanced level. You'll learn practical skills, work on real projects, and receive personalized feedback from expert instructors.</p>
                    <h3>What You'll Learn</h3>
                    <ul>
                        <li>Core concepts and fundamentals</li>
                        <li>Hands-on practical projects</li>
                        <li>Industry best practices</li>
                        <li>Advanced techniques and strategies</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer-ead">
                <button class="btn-enroll-ead">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Continue Learning</span>
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .course-modal-ead {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease;
            padding: 2rem;
        }
        
        .modal-content-ead {
            background: white;
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .modal-close-ead {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 1;
        }
        
        .modal-close-ead:hover {
            background: rgba(0, 0, 0, 0.2);
            transform: rotate(90deg);
        }
        
        .modal-header-ead {
            padding: 3rem 2rem 2rem;
            text-align: center;
        }
        
        .modal-content-ead.blue .modal-header-ead {
            background: linear-gradient(135deg, #DBEAFE, #EFF6FF);
        }
        
        .modal-content-ead.purple .modal-header-ead {
            background: linear-gradient(135deg, #F3E8FF, #FAF5FF);
        }
        
        .modal-content-ead.yellow .modal-header-ead {
            background: linear-gradient(135deg, #FEF9C3, #FEFCE8);
        }
        
        .modal-content-ead.red .modal-header-ead {
            background: linear-gradient(135deg, #FEE2E2, #FEF2F2);
        }
        
        .modal-icon-ead {
            width: 80px;
            height: 80px;
            margin: 0 auto 1rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
        }
        
        .modal-content-ead.blue .modal-icon-ead {
            background: #2563EB;
            color: white;
        }
        
        .modal-content-ead.purple .modal-icon-ead {
            background: #A855F7;
            color: white;
        }
        
        .modal-content-ead.yellow .modal-icon-ead {
            background: #FACC15;
            color: #1E293B;
        }
        
        .modal-content-ead.red .modal-icon-ead {
            background: #F87171;
            color: white;
        }
        
        .modal-header-ead h2 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
            color: #1E293B;
        }
        
        .modal-header-ead p {
            color: #64748B;
        }
        
        .modal-body-ead {
            padding: 2rem;
        }
        
        .modal-stats-ead {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .modal-stat-ead {
            flex: 1;
            min-width: 150px;
            background: #F7F8FA;
            padding: 1rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-size: 0.9rem;
            color: #64748B;
        }
        
        .modal-stat-ead i {
            font-size: 1.5rem;
            color: #2563EB;
        }
        
        .modal-description-ead h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #1E293B;
        }
        
        .modal-description-ead p {
            color: #64748B;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .modal-description-ead ul {
            list-style: none;
            padding: 0;
        }
        
        .modal-description-ead li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: #64748B;
        }
        
        .modal-description-ead li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #2563EB;
            font-weight: bold;
        }
        
        .modal-footer-ead {
            padding: 2rem;
            border-top: 1px solid #E2E8F0;
        }
        
        .btn-enroll-ead {
            width: 100%;
            background: #2563EB;
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            transition: all 0.3s ease;
        }
        
        .btn-enroll-ead:hover {
            background: #3B82F6;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal
    const closeBtn = modal.querySelector('.modal-close-ead');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// ========================================
// ADD COURSE BUTTON
// ========================================

const addCourseBtn = document.querySelector('.btn-add-course-ead');

if (addCourseBtn) {
    addCourseBtn.addEventListener('click', () => {
        showAddCourseForm();
    });
}

function showAddCourseForm() {
    alert('Add Course functionality coming soon! This would open a form to create a new course.');
}

// ========================================
// NOTIFICATION BUTTON
// ========================================

const notificationBtn = document.querySelector('.notification-btn-ead');

if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('Notifications:\n\n• New comment on Web Development\n• Your certificate is ready!\n• Course deadline reminder');
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-ead');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-ead {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// LEARNING ITEMS INTERACTION
// ========================================

const learningItems = document.querySelectorAll('.learning-item-ead');

learningItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h4').textContent;
        const progress = item.querySelector('.percentage-ead').textContent;
        
        alert(`📚 ${title}\n\nProgress: ${progress}\n\nClick to continue learning!`);
    });
});

// ========================================
// CALENDAR EVENTS
// ========================================

const calendarEvents = document.querySelectorAll('.calendar-event-ead');

calendarEvents.forEach(event => {
    event.addEventListener('click', () => {
        const time = event.querySelector('.event-time-ead').textContent;
        const title = event.querySelector('.event-title-ead').textContent;
        
        alert(`📅 Event Details\n\nTime: ${time}\nTitle: ${title}\n\nClick to view more details or edit.`);
    });
});

// ========================================
// STAT CARDS ANIMATION
// ========================================

const statCards = document.querySelectorAll('.stat-card-ead');

statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.stat-icon-ead i');
        if (icon) {
            icon.style.animation = 'bounce 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.stat-icon-ead i');
        if (icon) {
            icon.style.animation = '';
        }
    });
});

console.log('✨ All interactions initialized!');
