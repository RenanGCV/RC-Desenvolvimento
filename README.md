# 🚀 R&C Dev - Portfolio Completo

Portfolio profissional desenvolvido pela **R&C Dev** contendo 6 demonstrações completas de projetos web modernos.

## 📁 Estrutura do Projeto

```
SiteVendas/
├── index.html                 # Página principal do portfolio
│
├── assets/                    # Recursos estáticos
│   ├── css/                   # Folhas de estilo
│   │   ├── styles.css         # Estilos da página principal
│   │   ├── ecommerce-styles.css
│   │   ├── delivery-styles.css
│   │   ├── dashboard-styles.css
│   │   ├── restaurant-styles.css
│   │   ├── ead-styles.css
│   │   └── medico-styles.css
│   │
│   ├── js/                    # Scripts JavaScript
│   │   ├── script.js          # Script da página principal
│   │   ├── ecommerce-script.js
│   │   ├── delivery-script.js
│   │   ├── dashboard-script.js
│   │   ├── restaurant-script.js
│   │   ├── ead-script.js
│   │   └── medico-script.js
│   │
│   └── images/                # Imagens e assets visuais
│
├── portfolio/                 # Páginas de demonstração
│   ├── portfolio-ecommerce.html
│   ├── portfolio-delivery.html
│   ├── portfolio-dashboard.html
│   ├── portfolio-restaurant.html
│   ├── portfolio-ead.html
│   └── portfolio-medico.html
│
└── docs/                      # Documentação dos projetos
    ├── EAD-README.md
    ├── EAD-CUSTOMIZATION.md
    ├── RESTAURANT-README.md
    ├── RESTAURANT-CUSTOMIZATION.md
    └── MEDICO-README.md
```

## 🎨 Projetos do Portfolio

### 1. 🛍️ PHLOX - E-commerce Premium
**Arquivo:** `portfolio/portfolio-ecommerce.html`

E-commerce moderno de tecnologia com design minimalista premium.

**Características:**
- Design minimalista e elegante
- Sistema de produtos com grades responsivas
- Animações suaves e efeitos parallax
- Formulário de contato com validação
- Totalmente responsivo

**Tecnologias:**
- HTML5 Semântico
- CSS3 Avançado (Grid, Flexbox, Animations)
- JavaScript Vanilla
- Font Awesome Icons
- Google Fonts (Poppins)

---

### 2. 🍔 FoodExpress - App de Delivery
**Arquivo:** `portfolio/portfolio-delivery.html`

Aplicativo mobile-first de delivery de comida com design vibrante.

**Características:**
- Design mobile-first otimizado
- Carrossel de banners promocionais
- Categorias de restaurantes
- Sistema de cupons de desconto
- Interface colorida e moderna

**Tecnologias:**
- HTML5
- CSS3 (Mobile-First Design)
- JavaScript
- Swiper.js para carrosséis
- Font Awesome

---

### 3. 📊 DataVision - Dashboard Corporativo
**Arquivo:** `portfolio/portfolio-dashboard.html`

Dashboard corporativo completo com gráficos interativos e métricas em tempo real.

**Características:**
- Gráficos interativos com Chart.js
- Cards de métricas com animações
- Tabela de transações responsiva
- Efeitos de partículas no background
- Design profissional e clean

**Tecnologias:**
- HTML5
- CSS3 (Advanced Layouts)
- JavaScript
- Chart.js (Gráficos)
- Font Awesome

---

### 4. 🍽️ Le Gourmet - Restaurante Elegante
**Arquivo:** `portfolio/portfolio-restaurant.html`

Website de restaurante gourmet com design escuro e sofisticado.

**Características:**
- Tema escuro elegante com detalhes dourados (#d08c32)
- Efeito parallax no hero
- Galeria de imagens com lightbox
- Menu interativo com pratos
- Formulário de reservas com validação
- Animações sofisticadas

**Tecnologias:**
- HTML5
- CSS3 (Dark Theme, Parallax)
- JavaScript Vanilla
- Google Fonts (Playfair Display, Poppins)
- Font Awesome


---

### 5. 📚 LearnHub - Plataforma EAD (PT-BR)
**Arquivo:** `portfolio/portfolio-ead.html`

Plataforma de cursos online moderna com design colorido e intuitivo.

**Características:**
- **100% em Português Brasileiro**
- Design light mode com 4 cores principais
- Sidebar com navegação completa
- 6 cursos com progresso visual
- Calendário de eventos integrado
- Sistema de busca
- Cards de estatísticas
- Totalmente responsivo

**Cores:**
- Azul: #2563EB (Primary)
- Roxo: #A855F7 (Accent)
- Amarelo: #FACC15 (Warning)
- Vermelho: #F87171 (Danger)

**Tecnologias:**
- HTML5
- CSS3 (Grid complexo, Flexbox)
- JavaScript Vanilla
- SVG para ícones e gráficos
- Google Fonts (Poppins, Inter, Nunito Sans)


---

### 6. 🏥 Smile360 - Sistema Médico (PT-BR)
**Arquivo:** `portfolio/portfolio-medico.html`

Sistema de gestão médica profissional para clínicas e hospitais.

**Características:**
- **100% em Português Brasileiro**
- Design profissional limpo
- Sidebar com 7 módulos de navegação
- Tabela de consultas com 8 pacientes
- 4 cards de estatísticas com métricas
- Sistema de busca e filtros
- Paginação funcional
- Atalhos de teclado (Ctrl+K, Ctrl+N, Esc)
- Notificações toast
- Theme toggle (claro/escuro)

**Cores:**
- Azul: #2563EB (Primary)
- Verde: #22C55E (Confirmed)
- Amarelo: #FACC15 (Pending)
- Vermelho: #EF4444 (Cancelled)

**Tecnologias:**
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla
- Google Fonts (Poppins, Inter, Nunito Sans)
- Font Awesome


---

## 🚀 Como Usar

### Instalação Local

1. **Clone ou baixe o repositório**
```bash
git clone [seu-repositorio]
cd SiteVendas
```

2. **Abra o arquivo principal**
- Abra `index.html` em um navegador moderno
- Ou use um servidor local (recomendado):

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

3. **Navegue pelo portfolio**
- Acesse http://localhost:8000
- Clique nos cards do portfolio para ver as demonstrações
- Use o botão "Voltar ao Portfolio" para retornar

### Estrutura de Navegação

```
index.html (Principal)
    ↓
[6 Cards de Portfolio]
    ↓
Páginas de Demonstração (portfolio/*.html)
    ↓
Botão "Voltar ao Portfolio" → index.html
```

---

## 📱 Responsividade

Todos os projetos são **100% responsivos** e otimizados para:

- 📱 **Mobile** (320px - 767px)
- 📱 **Tablet** (768px - 1023px)
- 💻 **Desktop** (1024px - 1399px)
- 🖥️ **Large Desktop** (1400px+)

---

## 🎨 Paleta de Cores

### Portfolio Principal (index.html)
- Primária: #667eea (Roxo vibrante)
- Secundária: #764ba2 (Roxo escuro)
- Texto: #1a202c (Escuro)
- Background: #f7fafc (Claro)

### PHLOX (E-commerce)
- Primária: #667eea
- Secundária: #764ba2
- Accent: #f093fb

### FoodExpress (Delivery)
- Primária: #FF6B6B (Vermelho)
- Secundária: #4ECDC4 (Turquesa)
- Accent: #FFE66D (Amarelo)

### DataVision (Dashboard)
- Primária: #667eea
- Secundária: #764ba2
- Success: #48bb78
- Warning: #ed8936
- Danger: #f56565

### Le Gourmet (Restaurante)
- Background: #0d0d0d (Preto)
- Primária: #d08c32 (Dourado)
- Texto: #e8e8e8 (Branco suave)

### LearnHub (EAD)
- Primária: #2563EB (Azul)
- Accent 1: #A855F7 (Roxo)
- Accent 2: #FACC15 (Amarelo)
- Danger: #F87171 (Vermelho)

### Smile360 (Médico)
- Primária: #2563EB (Azul)
- Success: #22C55E (Verde)
- Warning: #FACC15 (Amarelo)
- Danger: #EF4444 (Vermelho)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados, Grid, Flexbox, Animations
- **JavaScript (Vanilla)** - Interatividade e lógica

### Bibliotecas Externas
- **Font Awesome 6.5** - Ícones vetoriais
- **Google Fonts** - Tipografia premium
- **Chart.js 4.4** - Gráficos interativos (Dashboard)
- **AOS (Animate On Scroll)** - Animações de scroll

### Recursos
- **CSS Variables** - Tematização fácil
- **Flexbox & Grid** - Layouts modernos
- **Media Queries** - Responsividade
- **LocalStorage** - Persistência de dados
- **Form Validation** - Validação de formulários
- **Smooth Scroll** - Navegação suave

---

## 📈 Estatísticas do Projeto

```
Total de Arquivos: 21
- HTML: 7 páginas
- CSS: 7 folhas de estilo (~7.500 linhas)
- JS: 7 scripts (~3.500 linhas)

Total de Linhas de Código: ~11.180 linhas

Projetos Completos: 6
```

---

## 📝 Customização

Cada projeto possui variáveis CSS no topo dos arquivos de estilo para fácil customização:

### Exemplo (Restaurant)
```css
:root {
    --bg-dark: #0d0d0d;
    --bg-dark-alt: #1a1a1a;
    --gold: #d08c32;
    --gold-dark: #a87228;
    --text-light: #e8e8e8;
    --text-dim: #b0b0b0;
}
```

### Exemplo (EAD)
```css
:root {
    --primary-blue: #2563EB;
    --primary-purple: #A855F7;
    --primary-yellow: #FACC15;
    --primary-red: #F87171;
    --bg-white: #FFFFFF;
    --bg-gray: #F7F8FA;
}
```

Para mais detalhes de customização, consulte os arquivos na pasta `docs/`.

---

## 🔧 Suporte de Navegadores

✅ **Compatível com:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

❌ **Não suportado:**
- Internet Explorer

---

## 📞 Contato

**R&C Dev**
- 📱 WhatsApp: [(21) 97266-1951](https://wa.me/5521972661951)
- 📧 Email: [Contato via formulário]
- 🌐 Website: [(https://rc-desenvolvimento.vercel.app/)]

---

## 📄 Licença

Este projeto é de **demonstração** e parte do portfolio da R&C Dev.

© 2024 R&C Dev. Todos os direitos reservados.

---

## 🎯 Próximos Passos

- [ ] Adicionar mais projetos ao portfolio
- [ ] Implementar blog técnico
- [ ] Sistema de filtros por tecnologia
- [ ] Modo escuro no index.html
- [ ] PWA (Progressive Web App)
- [ ] Animações 3D com Three.js
- [ ] Backend com Node.js
- [ ] Painel administrativo

---

**Desenvolvido com ❤️ pela R&C Dev**
