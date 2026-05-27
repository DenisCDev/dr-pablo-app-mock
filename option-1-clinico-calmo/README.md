# Variant A — "Clínico-Calmo" (claro)

Mock HTML navegável do app do **Dr. Pablo Vilela** (Nutricionista + Educador Físico · "Mentor de Saúde e Alta Performance"). 7 telas, CDN-only, sem build/framework/backend.

## A estética

**Direção:** `organic/hand-crafted` · **Framing:** F4 sidebar-shell-app (claro) · **Hero signature:** big tabular number (a contagem "Precisa de ação" e a % de adesão como dado-herói).

A superfície de trabalho do dia-a-dia. Confiança + clareza + densidade legível para triagem rápida. Creme quente em vez de branco puro (reduz fadiga na leitura longa da anamnese), sálvia restrita de baixa chroma (saúde sem clichê fitness verde-limão), terracota quente puxando o olho para os CTAs que precisam vencer. Cards pillowy `rounded-2xl`, sombras quentes de dupla camada, densidade comfortable no dashboard e spacious no frame do paciente. O paciente sente cuidado; o profissional lê rápido.

- **Tipografia:** Fraunces (display, serif óptico — aquece o tom "mentor" premium) · DM Sans (corpo, humanista de alta legibilidade a 390px) · IBM Plex Mono (números/horários/% — tabular-nums alinhados).
- **Cor (OKLCH, 3-tier primitives→alias→component):** sálvia `oklch(0.46 0.05 155)` dominante · terracota `oklch(0.62 0.14 45)` acento · neutros creme quente (hue 70). Flags semânticas: vermelho clínico `oklch(0.52 0.17 28)`, amarelo estilo-de-vida `oklch(0.78 0.13 75)`, verde sálvia.
- **Reference vibe:** Docplanner Watson (warm-clinical) + Stripe (precisão institucional na triagem densa).
- **Anti-slop:** zero `bg-white`/`bg-gray`/`text-black`, zero roxo/índigo, zero Inter como display. Cor nunca é o único sinal — toda flag/chip combina cor + ícone Phosphor + label ("Risco clínico" / "Estilo de vida").

## Quando escolher esta variante

Quando o tom desejado é **acolhimento clínico e calma** — um consultório quente, premium, que tranquiliza o paciente e dá ao Dr. Pablo uma leitura confortável de muitos pacientes ao longo do dia. Sacrifica o "punch" energético da Variant B (escura, alta-performance) em favor de legibilidade prolongada e sensação de cuidado.

## As 7 telas

| # | Arquivo | Tela | Persona/shell | Demonstra |
|---|---|---|---|---|
| 1 | `index.html` | Dashboard por status | Dr. Pablo · desktop | 3 grupos com contagem (1 / 2 / 3) + número-herói; cards de paciente com % de adesão. FR-001/002. **Landing.** |
| 2 | `revisar-anamnese.html` | Revisar anamnese | Dr. Pablo · desktop | A tela mais densa: resumo em cards por categoria + 4 flags de risco (3 clínicas + 1 estilo de vida) acima da dobra; acordeão das 7 etapas (leitura) abaixo. João Mendes. FR-003/004/005. |
| 3 | `montar-protocolo.html` | Montar protocolo | Dr. Pablo · desktop | 4 seções em tabs: Nutrição (texto livre, sem macros) · Suplementação · Treino · Hábitos. FR-006/007/008. |
| 4 | `anamnese.html` | Anamnese multi-step | Paciente · frame celular | Wizard Etapa 2/7 "Saúde intestinal" (controles ricos), barra de progresso, autosave "Salvo", Voltar/Próximo/Concluir. FR-009/010. |
| 5 | `hoje.html` | Hoje | Paciente · frame celular | Card AGORA + ring de adesão 92% + checklist do dia marcável (atualiza contagem/%) + atalhos. Maria Clara. FR-011/012. |
| 6 | `plano.html` | Plano | Paciente · frame celular | Protocolo completo em 4 seções (leitura) + alternador para o estado vazio "Protocolo em preparação". FR-013. |
| 7 | `progresso.html` | Progresso | Paciente · frame celular | Peso no tempo (gráfico SVG inline, 71,5→68,1 kg) + adesão semanal + fotos (estado vazio) + card Garmin desabilitado. FR-014. |

Shell (sidebar com 2 grupos + topbar com monograma PV, chip Garmin desabilitado e menu de avatar) é **idêntico nas 7 telas** — só o item ativo muda. Telas do paciente renderizam dentro de um frame de celular ~390px com bottom-nav.

## Interactive Mock Primitives wired

`tab-switcher` (Montar protocolo: 4 seções; Plano: cheio/vazio) · `accordion` (Revisar anamnese: 7 etapas) · `optimistic-list-add` (Montar protocolo: + Refeição/Suplemento/Exercício com estado loading) · `loading-button` + `toast-on-action` (Salvar protocolo → "Protocolo salvo"; + Água; + Foto) · `form-submit-simulated` (Anamnese: Próximo valida campo obrigatório, mostra erro inline, conclui em "Anamnese enviada") · `scroll-reveal` (cards entram ao rolar — progressive enhancement, conteúdo visível sem JS) · checklist-toggle que recalcula adesão (Hoje) · menu de avatar abre/fecha (topbar, todas as telas).

13 handlers funcionais no total · **único controle desabilitado** = chip/card "Conectar Garmin · Em breve" (`disabled` + `aria-disabled`). Nenhum botão morto.

## A11y (WCAG-AA)

Semântica `<aside>`/`<header>`/`<main>`/`<nav>`; `aria-current="page"` no item ativo; foco visível em tudo (`:focus-visible` com anel sálvia, nunca `outline:none` sem substituto); checklist e acordeão operáveis por teclado (Enter/Espaço); `role="progressbar"` na barra da anamnese; botões só-ícone com `aria-label`; cor + ícone + label nas flags; `prefers-reduced-motion: reduce` honrado (fades viram instantâneos); conteúdo visível por padrão (ADR-103 — motion é enhancement, `opacity:0` só sob `html.js-loaded`). Datas/kg/%/horários em `tabular-nums`, formato BR (`68,1 kg`, `04/03`).

## Como visualizar

Abra **`index.html`** num navegador (duplo-clique ou `file://`). Os links da sidebar navegam entre as 7 telas; os links da bottom-nav navegam entre as telas do paciente. Sem servidor, sem build — os CDNs (Google Fonts, Phosphor) carregam direto.
