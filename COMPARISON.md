# Comparação de Variantes — Mock do Sistema · Dr. Pablo Vilela

Mock HTML navegável (CDN-only, sem build) gerado via `/gandalf --html-demo`. **2 variantes** que comparam *pele*, não funcionalidade: mesma navegação, mesmas 7 telas, mesmo mock data PT-BR. Escolha uma direção visual antes de partir para o build.

---

## Como abrir

Cada variante é uma pasta com 7 HTMLs navegáveis. Abra o `index.html` da variante no navegador e use a **sidebar** para circular pelas telas.

```
# opção mais simples (duplo-clique também funciona, precisa de internet p/ fontes+ícones via CDN)
D:\gym\.planning\html-options\option-1-clinico-calmo\index.html
D:\gym\.planning\html-options\option-2-alta-performance\index.html

# ou servidor local (recomendado):
cd D:\gym\.planning\html-options
python -m http.server 8080
# abra http://localhost:8080/option-1-clinico-calmo/index.html
```

> As telas do **paciente** (Anamnese, Hoje, Plano, Progresso) aparecem dentro de um **frame de celular** — é o PWA mobile. As telas do **Dr. Pablo** (Dashboard, Revisar anamnese, Montar protocolo) ocupam a largura toda — é o painel desktop.

---

## As duas direções

| Eixo | **A · Clínico-Calmo** (claro) | **B · Alta Performance** (escuro) |
|---|---|---|
| Esquema | Claro, creme quente | Escuro, slate profundo |
| Estética | Orgânica / hand-crafted | Minimalista / severa |
| Display | Fraunces (serif humanista) | PP Neue Montreal / Geist (grotesca) |
| Corpo | DM Sans | Geist |
| Acento | Sálvia + terracota | Verde-lima sobre slate |
| Densidade | Confortável → arejada | Compacta → confortável |
| Sombra | Dual-layer quente | Quase nenhuma (hierarquia por superfície) |
| Raio | Pillowy (16px) | Sutil (6px) |
| Âncora | Docplanner + Stripe | Nordhealth + Stripe |
| Sensação | Cuidado, confiança, leitura longa | Foco, métrica, premium |

Ambas no **cluster de domínio saúde/wellness** (gate ADR-072 respeitado). A "alta performance" do briefing virou *dark clínico de performance* (Nordhealth), **não** dark-neon/gaming — que ficaria fora do cluster e cairia em AI-slop.

---

## As 7 telas (idênticas nas duas variantes)

| # | Tela | Persona / shell | Arquétipo | O que mostra |
|---|---|---|---|---|
| 1 | **Dashboard por status** | Dr. Pablo · desktop | board | Pacientes em 3 grupos: Precisa de ação · Aguardando paciente · Ativos (com % de adesão) |
| 2 | **Revisar anamnese** ★ | Dr. Pablo · desktop | detail | Resumo automático (cards) + flags de risco (vermelho clínico / amarelo estilo de vida) + acordeão das 7 etapas |
| 3 | **Montar protocolo** | Dr. Pablo · desktop | form | Nutrição (texto livre) · Suplementação · Treino (exercício+séries+descanso) · Hábitos |
| 4 | **Anamnese** | Paciente · phone | wizard | Multi-step (mostra Etapa 2 Saúde intestinal), progresso, autosave |
| 5 | **Hoje** | Paciente · phone | feed | Card AGORA + checklist do dia marcável + % de adesão da semana |
| 6 | **Plano** | Paciente · phone | detail | Protocolo completo em 4 seções (+ estado vazio "em preparação") |
| 7 | **Progresso** | Paciente · phone | stats | Peso (gráfico SVG) + adesão semanal + fotos + card "Conectar Garmin · Em breve" |

★ **Revisar anamnese** é a tela de maior valor — ataca o gargalo real (triagem rápida). É onde o resumo + flags economizam o tempo de consulta.

---

## Interações que funcionam no mock

Accordion das 7 etapas · toggle do checklist recalculando a % de adesão · wizard Voltar/Próximo com barra de progresso · tabs/adicionar item no protocolo · menu de avatar · colapsar grupo no dashboard · alternar Plano cheio/vazio. (A=13 handlers, B=34.) Único controle desabilitado: o card **Garmin "Em breve"** (placeholder de fase futura).

---

## Recomendação

- **A · Clínico-Calmo** se o posicionamento for *cuidado + confiança* e o uso principal for a leitura densa diária da triagem. É a aposta mais segura para um público amplo e para leitura longa de anamnese.
- **B · Alta Performance** se a marca quiser puxar o *"alta performance"* com mais força — métrica em destaque, premium, foco. Vende melhor a parte de treino/adesão.

Dá para escolher uma e manter a outra como tema alternável depois. Decisões de produto travadas neste mock (confirmar com o cliente): regra de adesão (concluídos/previstos no dia; semanal = média de 7 dias), nutrição em texto livre (sem macros), entrada do paciente por link sem login, sem tela de Perfil separada.

---

## Próximo passo

Escolha **1 variante** (e ajuste o que quiser nas telas). Para transformar em produto real (Next.js + Supabase, com banco e telas funcionais):

```
/gandalf -f .planning/gandalf/BRIEFING.md
```

A lista das 7 telas vira o inventário de telas do pipeline completo; a variante escolhida vira o `DESIGN.md` travado. Ver `.planning/gandalf/HANDOFF.md`.
