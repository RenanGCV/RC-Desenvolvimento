# 📱 Guia Rápido: Testar Correções Mobile

## 🎯 O Que Foi Corrigido

### ✅ Problema 1: Planos bagunçados no mobile
- **Antes:** 4 colunas espremidas, textos sobrepostos
- **Depois:** Layout responsivo inteligente (4→2→1 colunas)

### ✅ Problema 2: Padding indesejado à direita
- **Antes:** Scroll horizontal, espaço branco lateral
- **Depois:** Overflow-x eliminado, width 100% controlado

---

## 🧪 Como Testar AGORA (Chrome DevTools)

### Opção 1: Atalho Rápido (F12)
```
1. Pressione F12 (abre DevTools)
2. Pressione Ctrl + Shift + M (ativa Device Toolbar)
3. Selecione dispositivo no topo:
   - iPhone SE (375px) ← Teste este primeiro!
   - iPhone 12 Pro (390px)
   - iPad Mini (768px)
   - Responsive (para ajustar manual)
```

### Opção 2: Menu Completo
```
1. Clique com botão direito na página
2. Selecione "Inspecionar"
3. Clique no ícone de celular/tablet no topo (Toggle device toolbar)
4. Escolha dispositivo na dropdown
```

---

## 📐 Breakpoints Para Testar

### 🔴 Critical (OBRIGATÓRIO TESTAR)
```
375px  → iPhone SE / Galaxy S9
390px  → iPhone 12/13/14
430px  → iPhone 14 Pro Max
768px  → iPad Mini
```

### 🟡 Importante
```
360px  → Samsung Galaxy
414px  → iPhone Plus
820px  → iPad Air
1024px → iPad Pro
```

### 🟢 Opcional
```
320px  → Telas muito antigas
1920px → Desktop padrão
```

---

## 🎨 O Que Observar

### Na Seção "Planos" (#planos)

#### Desktop (>968px)
- [ ] 4 cards lado a lado
- [ ] Sem scroll horizontal
- [ ] Badges visíveis ("Mais Popular", "Premium")

#### Tablet (768px-968px)
- [ ] 2 cards por linha
- [ ] Preços organizados verticalmente
- [ ] Botões "Contratar" visíveis
- [ ] Sem overflow

#### Mobile Médio (576px-768px)
- [ ] 1 card por vez
- [ ] Card centralizado (max-width 500px)
- [ ] Preços lado a lado legíveis
- [ ] Features list sem corte

#### Mobile Pequeno (<576px)
- [ ] 1 card ocupando largura total
- [ ] Preços em coluna (Adesão em cima, Mensalidade embaixo)
- [ ] Textos legíveis (não pequenos demais)
- [ ] Badges não vazando para fora
- [ ] Botão WhatsApp clicável

---

## 🐛 Checklist de Problemas

### ❌ O Que NÃO Deve Acontecer
- [ ] Scroll horizontal (arrastar para os lados)
- [ ] Textos cortados
- [ ] Preços sobrepostos
- [ ] Cards vazando da tela
- [ ] Badges fora da área visível
- [ ] Botões impossíveis de clicar
- [ ] Espaço em branco à direita

### ✅ O Que DEVE Acontecer
- [ ] Todo conteúdo visível sem scroll horizontal
- [ ] Preços legíveis e destacados
- [ ] Cards bem espaçados
- [ ] Botões fáceis de clicar (área grande)
- [ ] Layout clean e organizado
- [ ] Animações suaves ao passar mouse/dedo

---

## 🎬 Teste Rápido (30 Segundos)

### 1️⃣ Abra DevTools (F12)
### 2️⃣ Ative modo mobile (Ctrl+Shift+M)
### 3️⃣ Vá para seção Planos (scroll até #planos)
### 4️⃣ Teste 3 tamanhos:

```
iPhone SE (375px)
↓
iPad Mini (768px)
↓
Responsive Desktop (1920px)
```

### 5️⃣ Arraste para os lados
- ✅ Se NÃO arrastar = CORRETO!
- ❌ Se arrastar horizontalmente = Problema!

---

## 📸 Comparação Visual Esperada

### iPhone SE (375px)
```
┌─────────────────────┐
│  Nossos Planos      │
│  ─────────────      │
│                     │
│ ┌─────────────────┐ │
│ │  🚀 Plano Start │ │
│ │                 │ │
│ │  Adesão         │ │
│ │  R$ 400         │ │
│ │  ─────────      │ │
│ │  Mensalidade    │ │
│ │  R$ 79/mês      │ │
│ │                 │ │
│ │  ✓ 4 páginas    │ │
│ │  ✓ Design       │ │
│ │  ...            │ │
│ │                 │ │
│ │ [Contratar]     │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │  ⭐ Vitrine     │ │
│ │  ...            │ │
└─────────────────────┘
```

### iPad (768px)
```
┌───────────────────────────────────────┐
│        Nossos Planos                  │
│        ─────────────                  │
│                                       │
│  ┌──────────────┐  ┌──────────────┐  │
│  │ 🚀 Start     │  │ ⭐ Vitrine   │  │
│  │              │  │              │  │
│  │ Adesão       │  │ Adesão       │  │
│  │ R$ 400       │  │ R$ 550       │  │
│  │ ────────     │  │ ────────     │  │
│  │ Mensalidade  │  │ Mensalidade  │  │
│  │ R$ 79/mês    │  │ R$ 99/mês    │  │
│  │ ...          │  │ ...          │  │
│  └──────────────┘  └──────────────┘  │
│                                       │
│  ┌──────────────┐  ┌──────────────┐  │
│  │ 🛒 Loja      │  │ 👑 Premium   │  │
│  │ ...          │  │ ...          │  │
└───────────────────────────────────────┘
```

---

## 🚨 Problemas Comuns e Soluções

### Problema: "Ainda tem scroll horizontal"
**Solução:**
1. Limpe cache: Ctrl+Shift+R (hard reload)
2. Verifique se CSS foi salvo
3. Inspecione elemento com padding/margin extra

### Problema: "Cards muito pequenos no mobile"
**Solução:**
- Já corrigido! Agora são 1 coluna em mobile (<768px)
- Se ainda parecer pequeno, pode ser zoom do navegador

### Problema: "Textos cortados"
**Solução:**
- `min-width: 0` adicionado ao `.plan-card`
- `width: 100%` em containers
- Se persistir, verifique content específico

---

## 💻 Comandos DevTools Úteis

### Ver largura da tela atual
```javascript
// Cole no Console (F12 → Console):
console.log(window.innerWidth)
```

### Simular diferentes DPIs
```
1. DevTools → Settings (⚙️)
2. Devices → Add custom device
3. Configure DPR (1x, 2x, 3x)
```

### Inspecionar elemento específico
```
1. Ctrl+Shift+C (ativa seletor)
2. Clique no card de plano
3. Veja estilos aplicados no painel direito
```

---

## ✅ Checklist Final

Antes de dar OK, verifique:

- [ ] Testei em iPhone SE (375px)
- [ ] Testei em iPad (768px)
- [ ] Testei em Desktop (>1024px)
- [ ] Sem scroll horizontal em nenhum tamanho
- [ ] Preços legíveis em todos os tamanhos
- [ ] Botões clicáveis e bem posicionados
- [ ] Cards não vazam da tela
- [ ] Layout agradável visualmente

---

## 🎉 Próximos Passos

1. ✅ Testar no DevTools (agora)
2. 🔄 Commit e push para GitHub
3. ⏱️ Aguardar deploy (2-5 min)
4. 📱 Testar no celular real
5. 🚀 Site mobile-friendly!

---

**Dúvidas?** Confira `MOBILE-FIXES.md` para detalhes técnicos.

**Última atualização:** 26/10/2025
