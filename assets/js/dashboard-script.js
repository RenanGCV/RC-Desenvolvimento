// Wait for Chart.js to load
function initDashboard() {
    // Verify Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('❌ Chart.js não foi carregado!');
        setTimeout(initDashboard, 100); // Try again
        return;
    }
    
    console.log('✅ Chart.js carregado com sucesso!');
    
    // Global chart configurations
    Chart.defaults.color = '#8b92b8';
    Chart.defaults.borderColor = '#2a3150';
    Chart.defaults.font.family = 'Poppins';
    
    // Initialize all features with error handling
    try {
        console.log('🚀 Iniciando gráficos...');
        initRevenueChart();
        initGaugeChart();
        initTrafficChart();
        initCategoryChart();
        initSparklines();
        
        console.log('🎨 Iniciando animações...');
        initScrollAnimations();
        createParticles();
        initRealTimeUpdates();
        animateKPINumbers();
        
        console.log('📊 Dashboard Initialized!');
    } catch (error) {
        console.error('❌ Erro ao inicializar dashboard:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    // DOM already loaded
    initDashboard();
}

// Animate KPI Numbers on Load
function animateKPINumbers() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    kpiCards.forEach((card, index) => {
        const valueElement = card.querySelector('.kpi-value');
        const targetText = valueElement.textContent;
        
        // Extract number from text
        let targetNumber = parseFloat(targetText.replace(/[^\d.-]/g, ''));
        
        // Check if it's a percentage
        const isPercentage = targetText.includes('%');
        
        // Check if it's currency
        const isCurrency = targetText.includes('R$');
        
        let currentNumber = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetNumber / steps;
        const stepDuration = duration / steps;
        
        let step = 0;
        
        const interval = setInterval(() => {
            step++;
            currentNumber += increment;
            
            if (step >= steps) {
                currentNumber = targetNumber;
                clearInterval(interval);
            }
            
            // Format number
            let displayValue = '';
            if (isCurrency) {
                displayValue = 'R$ ' + currentNumber.toLocaleString('pt-BR', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
            } else if (isPercentage) {
                displayValue = currentNumber.toFixed(1) + '%';
            } else {
                displayValue = Math.floor(currentNumber).toLocaleString('pt-BR');
            }
            
            valueElement.textContent = displayValue;
        }, stepDuration);
    });
}


// Revenue Chart (Line Chart)
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) {
        console.error('❌ Canvas revenueChart não encontrado!');
        return;
    }
    
    console.log('✅ Canvas revenueChart encontrado');

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(101, 69, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(101, 69, 255, 0)');

    const gradient2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, 'rgba(0, 255, 255, 0.2)');
    gradient2.addColorStop(1, 'rgba(0, 255, 255, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Receita 2025',
                    data: [1850000, 1920000, 2010000, 2150000, 2280000, 2350000, 2480000, 2620000, 2710000, 2780000, 2840000, 2847593],
                    borderColor: '#6545ff',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#6545ff',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 3
                },
                {
                    label: 'Receita 2024',
                    data: [1420000, 1580000, 1650000, 1780000, 1890000, 1950000, 2080000, 2150000, 2230000, 2310000, 2380000, 2450000],
                    borderColor: '#00ffff',
                    backgroundColor: gradient2,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#00ffff',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: '#d7e3ff',
                        padding: 15,
                        font: {
                            size: 12,
                            weight: 600
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e2542',
                    titleColor: '#ffffff',
                    bodyColor: '#d7e3ff',
                    borderColor: '#6545ff',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': R$ ' + context.parsed.y.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 1000000,
                    grid: {
                        color: 'rgba(42, 49, 80, 0.3)'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + (value / 1000000).toFixed(1) + 'M';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Gauge Chart (Doughnut)
function initGaugeChart() {
    const ctx = document.getElementById('gaugeChart');
    if (!ctx) {
        console.error('❌ Canvas gaugeChart não encontrado!');
        return;
    }
    
    console.log('✅ Canvas gaugeChart encontrado');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completo', 'Restante'],
            datasets: [{
                data: [87, 13],
                backgroundColor: [
                    '#00ffff',
                    'rgba(42, 49, 80, 0.3)'
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}

// Traffic Chart (Pie Chart)
function initTrafficChart() {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) {
        console.error('❌ Canvas trafficChart não encontrado!');
        return;
    }
    
    console.log('✅ Canvas trafficChart encontrado');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Direto', 'Redes Sociais', 'Orgânico'],
            datasets: [{
                data: [35, 28, 37],
                backgroundColor: [
                    '#00ffff',
                    '#6545ff',
                    '#4ae3b5'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e2542',
                    titleColor: '#ffffff',
                    bodyColor: '#d7e3ff',
                    borderColor: '#00ffff',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Category Chart (Bar Chart)
function initCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) {
        console.error('❌ Canvas categoryChart não encontrado!');
        return;
    }
    
    console.log('✅ Canvas categoryChart encontrado');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Eletrônicos', 'Moda', 'Casa & Jardim', 'Esportes', 'Livros', 'Alimentos', 'Beleza', 'Games'],
            datasets: [
                {
                    label: 'Q3 2025',
                    data: [480000, 520000, 410000, 360000, 280000, 450000, 390000, 425000],
                    backgroundColor: 'rgba(0, 255, 255, 0.8)',
                    borderRadius: 8,
                    barThickness: 28
                },
                {
                    label: 'Q4 2025 (Atual)',
                    data: [620000, 580000, 485000, 420000, 335000, 510000, 445000, 490000],
                    backgroundColor: 'rgba(101, 69, 255, 0.8)',
                    borderRadius: 8,
                    barThickness: 28
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#d7e3ff',
                        padding: 15,
                        font: {
                            size: 12,
                            weight: 600
                        },
                        usePointStyle: true,
                        pointStyle: 'rect'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e2542',
                    titleColor: '#ffffff',
                    bodyColor: '#d7e3ff',
                    borderColor: '#6545ff',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': R$ ' + context.parsed.y.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                        },
                        footer: function(items) {
                            if (items.length === 2) {
                                const diff = items[1].parsed.y - items[0].parsed.y;
                                const percent = ((diff / items[0].parsed.y) * 100).toFixed(1);
                                return '\nVariação: ' + (diff > 0 ? '+' : '') + percent + '%';
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(42, 49, 80, 0.3)'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + (value / 1000) + 'k';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Sparkline Charts
function initSparklines() {
    const sparklineData = [
        // Receita Total - tendência crescente
        [1850, 1920, 2010, 2150, 2280, 2350, 2480, 2620, 2710, 2780, 2840, 2847],
        // Novos Clientes - crescimento constante
        [980, 1020, 1050, 1090, 1130, 1170, 1200, 1230, 1250, 1270, 1284, 1290],
        // Taxa de Conversão - leve crescimento
        [21.2, 21.8, 22.1, 22.5, 23.0, 23.4, 23.8, 24.0, 24.2, 24.4, 24.5, 24.6],
        // Pedidos - pequena queda recente
        [820, 835, 850, 865, 878, 890, 895, 882, 870, 860, 852, 847]
    ];

    const colors = ['#6545ff', '#4ae3b5', '#00ffff', '#fb923c'];

    sparklineData.forEach((data, index) => {
        const container = document.getElementById(`sparkline-${index + 1}`);
        if (!container) {
            console.error(`❌ Container sparkline-${index + 1} não encontrado!`);
            return;
        }

        // Create canvas element
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = 120;
        canvas.height = 40;

        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min;
        const width = canvas.width / (data.length - 1);

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, colors[index] + '40');
        gradient.addColorStop(1, colors[index] + '00');

        // Fill area
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        data.forEach((value, i) => {
            const x = i * width;
            const y = canvas.height - ((value - min) / range) * canvas.height;
            ctx.lineTo(x, y);
        });
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Draw line
        ctx.strokeStyle = colors[index];
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();

        data.forEach((value, i) => {
            const x = i * width;
            const y = canvas.height - ((value - min) / range) * canvas.height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = colors[index];
        ctx.stroke();
    });
}

// Scroll Animations
function initScrollAnimations() {
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

    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Particles Background
function createParticles() {
    const container = document.querySelector('.particles-bg');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#6545ff' : '#4ae3b5'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: float ${Math.random() * 15 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// Real-time Updates Simulation
function initRealTimeUpdates() {
    // Add live indicator
    const topbar = document.querySelector('.topbar');
    const liveIndicator = document.createElement('div');
    liveIndicator.className = 'live-indicator';
    liveIndicator.innerHTML = `
        <span class="live-dot"></span>
        <span class="live-text">Dados em Tempo Real</span>
    `;
    topbar.appendChild(liveIndicator);
    
    // Simulate real-time data updates every 8 seconds
    setInterval(() => {
        updateKPIValues();
        updateProgressBars();
        updateRecentTransactions();
    }, 8000);
    
    // Flash live indicator on update
    setInterval(() => {
        const dot = document.querySelector('.live-dot');
        if (dot) {
            dot.style.animation = 'none';
            setTimeout(() => {
                dot.style.animation = 'pulse 2s infinite';
            }, 10);
        }
    }, 8000);
}

function updateKPIValues() {
    const kpiValues = document.querySelectorAll('.kpi-value');
    kpiValues.forEach((element, index) => {
        const currentValue = element.textContent;
        
        // Add pulse animation
        element.style.transform = 'scale(1.08)';
        element.style.color = '#00ffff';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#ffffff';
        }, 300);
        
        // Simulate small value changes
        if (index === 3) { // Pedidos - can go up or down
            const numMatch = currentValue.match(/\d+/);
            if (numMatch) {
                const num = parseInt(numMatch[0]);
                const change = Math.floor(Math.random() * 5) - 2;
                element.textContent = (num + change).toLocaleString('pt-BR');
            }
        }
    });
}

function updateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width);
        if (!isNaN(currentWidth)) {
            const variation = Math.random() * 1 - 0.5; // -0.5 to +0.5
            const newWidth = Math.min(100, Math.max(0, currentWidth + variation));
            bar.style.width = newWidth + '%';
        }
    });
}

function updateRecentTransactions() {
    const tbody = document.querySelector('.data-table tbody');
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll('tr');
    if (rows.length > 0) {
        // Flash the first row to indicate new data
        rows[0].style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
        setTimeout(() => {
            rows[0].style.backgroundColor = 'transparent';
        }, 1000);
    }
}

// Add gradient to circular progress SVG
const svgGradient = `
<svg width="0" height="0">
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6545ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00ffff;stop-opacity:1" />
        </linearGradient>
    </defs>
</svg>
`;
document.body.insertAdjacentHTML('beforeend', svgGradient);

// Sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Add click listeners to nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Add hover effects to chart cards
document.querySelectorAll('.chart-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add click effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(10px, -10px);
        }
        50% {
            transform: translate(-5px, 5px);
        }
        75% {
            transform: translate(-10px, -5px);
        }
    }
`;
document.head.appendChild(style);

// Loading animation
document.body.style.opacity = '0';
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Export functions
window.toggleSidebar = toggleSidebar;
