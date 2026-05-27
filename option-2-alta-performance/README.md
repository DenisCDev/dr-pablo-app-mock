# Variant B — "Alta Performance" (dark)

Mock HTML navegável do app do Dr. Pablo Vilela (Nutricionista + Educador Físico). Multi-tela, CDN-only, sem build, sem framework, sem backend. Abra `index.html` no navegador e clique pela sidebar.

## Direção estética

- **Aesthetic:** `minimalist-severe` — uma família tipográfica, hierarquia por **peso + espaço + contraste de superfície**, quase zero sombra. Vende o posicionamento "alta performance": energético, focado, premium. Severidade clínica, não dark-neon-gaming.
- **Reference Vibe:** Nordhealth (clinical-clean, alto contraste, dark-capable) + Stripe (weight-contrast numa família, near-zero shadow, color-signals-function, tabular-nums obsessivo). Diverge via dominante **lime-green** (Nordhealth usa blue → hemisfério verde-quente), framing F4 sidebar escuro, herói = big-tabular-number.
- **Dark = direção COMETIDA**, não `dark:` colado: canvas slate profundo `oklch(0.22 0.018 243)` (NÃO preto puro), 3 tiers de superfície (sidebar 950 / conteúdo 900 / card 850).
- **Cor:** acento **lime** `oklch(0.82 0.18 130)` (saúde/energia) — botões lime têm **texto escuro** (slate-950) para contraste AA. Âmbar `oklch(0.80 0.14 75)` para flags de estilo de vida. Vermelho `oklch(0.64 0.20 25)` para risco clínico. Zero roxo/índigo/ciano.
- **Tipografia:** display + body = **Geist** (grotesca neutra, weight-contrast 400/500/600/700); números/horários/% = **Geist Mono** tabular. Geist é o fallback CDN-able da PP Neue Montreal do briefing (mesma família grotesca, mesmo princípio de uma-fonte). **Nunca Inter como display.**
- **Forma:** `rounded-md` (6px) uniforme em tudo; sombra near-none (hierarquia por superfície + hairline `1px`); densidade compact (desktop) → comfortable (frame paciente); motion snappy **120ms linear**, sem bounce.

### Framing device

**F4 sidebar-shell-app (escuro)** — sidebar fixa slate-950 com 2 grupos de nav (Dr. Pablo / App do paciente), conteúdo slate-900, topbar com monograma PV + chip Garmin desabilitado + menu de avatar. Idêntico nas 7 telas (só muda o item ativo). As 4 telas do paciente renderizam dentro de um **frame de celular ~390px** com bottom-nav — o PWA mostrado como mockup.

### Hero signature

**Big tabular-number alto-contraste** — a contagem "1 paciente precisa de ação" em lime gigante no topo do Dashboard, e os números de adesão (92%) no Hoje/Progresso. O dado é o herói; é o momento de screenshot "performance".

## Escolha esta variante quando...

O cliente quer transmitir **energia, foco e exclusividade** ("alta performance", público que treina sério, estética Whoop/Strava sóbria). Vence em: sensação premium, leitura de métricas, baixa fadiga em uso prolongado à noite. Sacrifica: o calor acolhedor da Variant A (creme/serif) — esta é mais "atleta de elite" que "consultório aconchegante".

## 7 telas (o que cada uma demonstra · FRs)

| Arquivo | Tela | Demonstra | FRs |
|---|---|---|---|
| `index.html` | Dashboard por status | 3 grupos com contagem (1/2/3) + número-herói + cards de paciente com chip de adesão | FR-001, FR-002 |
| `revisar-anamnese.html` | Revisar anamnese (João Mendes) | **a tela mais densa**: resumo em cards por categoria + 3 flags vermelhas + 1 amarela acima da dobra; acordeão das 7 etapas (leitura) | FR-003, FR-004, FR-005 |
| `montar-protocolo.html` | Montar protocolo (Maria Clara) | 4 seções em tabs (Nutrição sem macros · Suplementação · Treino · Hábitos) + adicionar item + salvar com toast | FR-006, FR-007, FR-008 |
| `anamnese.html` | Anamnese multi-step (paciente) | Etapa 2 "Saúde intestinal" (controles ricos) no frame de celular + barra de progresso + autosave + Voltar/Próximo/Concluir | FR-009, FR-010 |
| `hoje.html` | Hoje (paciente, Maria Clara) | Card AGORA + adesão 92% semana + checklist do dia marcável (contagem ao vivo) + atalhos | FR-011, FR-012 |
| `plano.html` | Plano (paciente, leitura) | Protocolo completo em 4 seções + toggle que demonstra o **estado vazio** "em preparação" (gap #3) | FR-013 |
| `progresso.html` | Progresso (paciente) | **Gráfico de peso em SVG inline** (-3,4 kg) + adesão semanal + fotos (estado vazio) + card Garmin desabilitado | FR-014 |

Mais: `shared.css` (shell + tokens OKLCH 3-tier, importado por todas) e `styles.css` (tweaks por tela). Total = **10 arquivos**.

## Interactive Mock Primitives (wired) — vanilla JS inline, sem framework

| Primitive | Onde | Comportamento |
|---|---|---|
| `accordion` | revisar-anamnese | 7 etapas expandem/colapsam (Etapa 1 aberta no load) |
| `tab-switcher` | montar-protocolo (4 seções) + plano (cheio/vazio) | troca de painel; tabs com `role=tab` + setas ←/→ |
| `optimistic-list-add` | montar-protocolo | "+ Refeição/Suplemento/Exercício" anexa linha nova (fade-in 360ms) + foca o 1º campo |
| `form-submit-simulated` + `loading-button` | montar-protocolo | "Salvar protocolo" → spinner "Salvando…" → toast "Protocolo salvo" |
| `toast-on-action` | montar-protocolo, hoje, progresso | toasts `aria-live=polite` (3s) |
| `checklist-toggle` (search/filter sibling) | hoje | marcar item recalcula contagem + % + barra **ao vivo** (numerador e denominador derivados dos itens renderizados → integridade de contagem) |
| `wizard step nav` | anamnese | Próximo/Voltar move etapa, barra e dots; Etapa 1 desabilita Voltar; Etapa 7 vira "Concluir ✓" → tela de conclusão |
| `avatar-menu` (modal-like) | todas as 7 | menu de conta abre/fecha; Esc fecha; click-fora fecha; `aria-expanded` |
| `status-group collapse` | index | grupos do dashboard colapsam |
| `scroll-reveal` | todas (enhancement) | fade-in ao entrar no viewport |

**Floor ≥5 cumprido com folga (9 tipos de primitive).** Único controle desabilitado: chip/card "Conectar Garmin · Em breve" (`aria-disabled`, sem handler). Nenhum botão morto.

## Acessibilidade (WCAG-AA)

- Cor **nunca** sozinha: flags = cor + ícone Phosphor distinto + label ("Risco clínico" / "Estilo de vida").
- Botão lime com texto escuro (AA sobre fundo claro-lime); lime como texto sobre slate escuro também passa.
- `focus-visible` lime em tudo; `<label>`/`aria-label` em inputs e botões só-ícone; `role=progressbar` na anamnese; `role=tablist/tab/tabpanel` nas tabs; `aria-pressed` nos toggles de checklist; `aria-live` nos toasts.
- `tabular-nums` (Geist Mono) em horários/kg/%/contagens/datas. Formato BR (`68,1 kg`, `04/03`).
- **ADR-103 — motion é enhancement, nunca load-bearing:** conteúdo visível por padrão; o estado `opacity:0` da animação só existe sob `html.js-loaded` (classe adicionada por `<script>` inline no `<head>` antes do CSS). JS bloqueado → página continua legível. `prefers-reduced-motion: reduce` honrado (transições viram instantâneas).

## Como visualizar

Abra `index.html` no navegador (`file://` funciona — Tailwind não é usado; o estilo é CSS puro com tokens OKLCH). Os CDNs (Google Fonts Geist/Geist Mono + Phosphor Icons) carregam por `<link>`/`<script>`. Navegue pela sidebar; as telas de paciente aparecem no frame de celular.

## Notas técnicas (tradeoffs aceitos para mock CDN-only)

- **Sem `integrity`/SRI nas tags CDN:** o spec do `--html-demo` fixa as URLs flutuantes (`unpkg.com/@phosphor-icons/web`); um hash SRI prende um build específico e quebra na tag flutuante exigida. Para um mock de demonstração local sem deploy, o risco de comprometimento de CDN não se aplica. No build real (Next.js), fontes/ícones entram via `next/font` + `@phosphor-icons/react` (sem CDN, sem SRI).
- **`innerHTML` com literais estáticos:** os blocos de JS usam `innerHTML` apenas com strings escritas no código (toasts, linhas de formulário, tela de conclusão) — zero input de usuário ou rede num mock sem backend. Sem superfície de XSS. No build real isso vira JSX/React.
