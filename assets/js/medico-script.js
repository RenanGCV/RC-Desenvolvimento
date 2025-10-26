// ========================================
// DOM ELEMENTS
// ========================================

const sidebarToggle = document.getElementById('sidebarToggleMed');
const sidebar = document.getElementById('sidebarMed');
const navItems = document.querySelectorAll('.nav-item-med');
const themeToggle = document.getElementById('themeToggle');
const prevPeriod = document.getElementById('prevPeriod');
const nextPeriod = document.getElementById('nextPeriod');
const addAppointmentBtn = document.getElementById('addAppointment');
const selectAllCheckbox = document.getElementById('selectAll');
const rowCheckboxes = document.querySelectorAll('.appointments-table-med tbody input[type="checkbox"]');
const filterTabs = document.querySelectorAll('.filter-tab-med');
const toast = document.getElementById('toastMed');

// ========================================
// SIDEBAR TOGGLE
// ========================================

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Click outside to close sidebar on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// ========================================
// NAVIGATION
// ========================================

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
        
        // Show toast notification
        const section = item.querySelector('.nav-label-med').textContent;
        showToast(`Navegando para ${section}`);
    });
});

// ========================================
// THEME TOGGLE
// ========================================

let isDarkMode = false;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
            showToast('Modo escuro ativado');
        } else {
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
            showToast('Modo claro ativado');
        }
    });
}

// ========================================
// PERIOD NAVIGATION
// ========================================

if (prevPeriod && nextPeriod) {
    const periodText = document.querySelector('.period-text-med');
    let currentWeek = 0;
    
    prevPeriod.addEventListener('click', () => {
        currentWeek--;
        updatePeriodText(currentWeek);
        showToast('Semana anterior');
    });
    
    nextPeriod.addEventListener('click', () => {
        currentWeek++;
        updatePeriodText(currentWeek);
        showToast('Próxima semana');
    });
    
    function updatePeriodText(weekOffset) {
        const baseDate = new Date(2024, 1, 19); // 19 de Fevereiro, 2024
        const startDate = new Date(baseDate);
        startDate.setDate(startDate.getDate() + (weekOffset * 7));
        
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        const month = startDate.toLocaleDateString('pt-BR', { month: 'long' });
        const year = startDate.getFullYear();
        
        periodText.textContent = `${startDay}-${endDay} de ${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
    }
}

// ========================================
// ADD APPOINTMENT
// ========================================

if (addAppointmentBtn) {
    addAppointmentBtn.addEventListener('click', () => {
        showToast('Modal de nova consulta aberto');
        
        // Animação do botão
        addAppointmentBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addAppointmentBtn.style.transform = '';
        }, 150);
    });
}

// ========================================
// SELECT ALL CHECKBOXES
// ========================================

if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (e) => {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
        
        const count = e.target.checked ? rowCheckboxes.length : 0;
        if (count > 0) {
            showToast(`${count} consultas selecionadas`);
        }
    });
}

// Individual row checkboxes
rowCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.appointments-table-med tbody input[type="checkbox"]:checked').length;
        selectAllCheckbox.checked = checkedCount === rowCheckboxes.length;
        selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < rowCheckboxes.length;
    });
});

// ========================================
// FILTER TABS
// ========================================

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show toast
        showToast(`Filtro: ${tab.textContent}`);
    });
});

// ========================================
// TABLE ROW HOVER EFFECT
// ========================================

const tableRows = document.querySelectorAll('.appointments-table-med tbody tr');

tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.transform = 'scale(1.01)';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.transform = '';
    });
});

// ========================================
// ACTION BUTTONS
// ========================================

const actionButtons = document.querySelectorAll('.action-btn-med');

actionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const action = button.getAttribute('title');
        const row = button.closest('tr');
        const patientName = row.querySelector('.patient-cell-med span').textContent;
        
        // Animação do botão
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Show toast based on action
        if (action === 'Visualizar') {
            showToast(`Visualizando dados de ${patientName}`);
        } else if (action === 'Editar') {
            showToast(`Editando consulta de ${patientName}`);
        } else if (action === 'Cancelar') {
            showToast(`Cancelando consulta de ${patientName}`);
        }
    });
});

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

const searchInput = document.querySelector('.search-bar-med input');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        tableRows.forEach(row => {
            const patientName = row.querySelector('.patient-cell-med span').textContent.toLowerCase();
            const diagnosis = row.cells[6].textContent.toLowerCase();
            
            if (patientName.includes(searchTerm) || diagnosis.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// ========================================
// TABLE SORTING
// ========================================

const sortIcons = document.querySelectorAll('.appointments-table-med th i.fa-sort');

sortIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const th = icon.closest('th');
        const columnIndex = Array.from(th.parentElement.children).indexOf(th);
        
        showToast('Ordenando tabela...');
        
        // Visual feedback
        icon.style.transform = 'scale(1.2)';
        icon.style.color = 'var(--color-primary)';
        
        setTimeout(() => {
            icon.style.transform = '';
            
            // Reset other icons
            sortIcons.forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.style.color = '';
                }
            });
        }, 300);
    });
});

// ========================================
// PAGINATION
// ========================================

const pageButtons = document.querySelectorAll('.page-btn-med');

pageButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.disabled || button.classList.contains('active')) return;
        
        // Remove active class from all buttons
        pageButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button (if it's a number)
        if (!isNaN(button.textContent)) {
            button.classList.add('active');
            showToast(`Página ${button.textContent}`);
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message) {
    const toastIcon = toast.querySelector('i');
    const toastText = toast.querySelector('span');
    
    toastText.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// NOTIFICATION BUTTON
// ========================================

const notificationBtn = document.querySelector('.notification-btn-med');

if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        showToast('3 novas notificações');
        
        // Animação do badge
        const badge = notificationBtn.querySelector('.notification-badge-med');
        badge.style.animation = 'bounce 0.5s';
        setTimeout(() => {
            badge.style.animation = '';
        }, 500);
    });
}

// ========================================
// STATS CARDS ANIMATION
// ========================================

const statCards = document.querySelectorAll('.stat-card-med');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statCards.forEach(card => {
    observer.observe(card);
});

// ========================================
// SECONDARY BUTTONS
// ========================================

const secondaryButtons = document.querySelectorAll('.btn-secondary-med');

secondaryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.textContent.trim();
        showToast(action);
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(37, 99, 235, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        showToast('Busca ativada');
    }
    
    // Ctrl/Cmd + N for new appointment
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        addAppointmentBtn.click();
    }
    
    // Escape to close sidebar on mobile
    if (e.key === 'Escape') {
        sidebar.classList.remove('active');
    }
});

// ========================================
// ADD CSS ANIMATION FOR RIPPLE
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// ========================================
// INITIAL LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    // Animate table rows on load
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 100 * index);
    });
});

// ========================================
// USER PROFILE CLICK
// ========================================

const userProfile = document.querySelector('.user-profile-med');

if (userProfile) {
    userProfile.addEventListener('click', () => {
        showToast('Perfil do usuário');
    });
}

// ========================================
// CONSOLE LOG
// ========================================

console.log('🏥 Sistema Médico Smile360 carregado com sucesso!');
console.log('💡 Atalhos: Ctrl+K (Busca), Ctrl+N (Nova Consulta), Esc (Fechar Menu)');
