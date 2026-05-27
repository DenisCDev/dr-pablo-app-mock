/* ============================================================================
   db.js — "banco de dados" FALSO em localStorage (mock connectado).
   Compartilhado por app.html (paciente) e index/revisar-anamnese/montar-protocolo
   (Dr. Pablo). Mesmo origin no GitHub Pages => mesmo localStorage => tudo conectado.
   NÃO é backend real — é simulação. Chave única + seed + reset.
   ========================================================================== */
(function (global) {
  var KEY = 'pv_db_v2';

  function todayISO() { return new Date().toISOString().slice(0, 10); }

  /* ---- SEED (estado inicial de demonstração) ---- */
  function seed() {
    var t = todayISO();
    return {
      meta: { version: 2, seededAt: new Date().toISOString(), today: t },
      currentPatientId: 'maria',
      patients: [
        { id: 'joao',   nome: 'João Mendes',        idade: 41, sexo: 'Masculino', altura: '1,78 m', peso: '94 kg', objetivo: 'Desinflamação',  status: 'triagem',   submittedRel: 'há 2 dias', flags: 3 },
        { id: 'lucas',  nome: 'Lucas Pereira',      idade: 35, objetivo: 'Performance',  status: 'aguardando', sentRel: 'há 4 dias' },
        { id: 'camila', nome: 'Camila Nogueira',    idade: 39, objetivo: 'Definição',    status: 'aguardando', sentRel: 'há 1 dia' },
        { id: 'maria',  nome: 'Maria Clara Souza',  idade: 33, objetivo: 'Emagrecimento', status: 'ativo', adesaoSemana: 92 },
        { id: 'bia',    nome: 'Beatriz Carvalho',   idade: 47, objetivo: 'Saúde geral',  status: 'ativo', adesaoSemana: 86 },
        { id: 'rafael', nome: 'Rafael Antunes',     idade: 28, objetivo: 'Ganho de massa', status: 'ativo', adesaoSemana: 64 }
      ],
      anamneses: {
        joao: {
          submittedRel: 'há 2 dias',
          e1: { nome: 'João Mendes', idadeSexo: '41 · Masculino', alturaPeso: '1,78 m · 94 kg', objetivo: 'Desinflamação', dexa: 'Sim · 28% gordura' },
          e2: { diag: 'Disbiose', lactose: 'Confirmada', gluten: 'Não', fezes: 'Alternadas', gases: 'Sim', distensao: 'Depois de comer', desconforto: 'leite e pão integral' },
          e3: { estresse: '7/10 · fonte: trabalho', humor: 'Ansioso', sono: '6h · qualidade Ruim', tela: 'Sim, até na cama', indutor: 'melatonina', cafeNoite: 'Sim' },
          e4: { agua: '1,5 L/dia', bebidas: 'Café · Chimarrão · Álcool social', refeicoes: '4', doce: 'À noite', ultra: 'Frequentemente', frituras: 'Raramente' },
          e5: { proteinas: 'Frango, patinho', carbo: 'Arroz, batata-doce', frutas: 'Banana, mamão', vegetais: 'Abobrinha, cenoura', evita: 'Queijo (lactose) · jiló', pioraIntestino: 'Leite' },
          e6: { pratica: 'Sim · musculação + corrida', freq: '3–4×/semana · Moderada', aerobico: 'Sim · disposição Boa', lesao: 'menisco direito', medicamentos: 'losartana 50 mg', suplementos: 'creatina, whey' },
          e7: { doenca: 'hipertensão', familiar: 'pai hipertenso, mãe diabética', cirurgia: 'Não', incomodo: 'inchaço e cansaço à tarde', acompanhamento: 'Sim, mas parei', preparo: 'Tempo limitado' },
          flags: [
            { sev: 'danger', titulo: 'Medicamento contínuo', det: 'losartana 50 mg', tag: 'Risco clínico', icon: 'ph-pill' },
            { sev: 'danger', titulo: 'Cirurgia', det: 'joelho · 2021 (menisco direito)', tag: 'Risco clínico', icon: 'ph-bandaids' },
            { sev: 'danger', titulo: 'Intolerância', det: 'lactose confirmada', tag: 'Risco clínico', icon: 'ph-prohibit' },
            { sev: 'warning', titulo: 'Estresse', det: '7/10 · fonte: trabalho · sono 6h', tag: 'Estilo de vida', icon: 'ph-brain' }
          ],
          resumo: {
            objetivo: 'Desinflamação',
            saude: 'Hipertensão controlada (losartana); cirurgia no joelho em 2021',
            intestino: 'Lactose confirmada; distensão após comer; fezes alternadas',
            atividade: 'Moderada, 3–4×/semana; disposição "Boa"'
          }
        },
        maria: { submittedRel: 'há 6 semanas', e1: { nome: 'Maria Clara Souza', idadeSexo: '33 · Feminino', alturaPeso: '1,65 m · 68 kg', objetivo: 'Emagrecimento', dexa: 'Não' } }
      },
      protocols: {
        maria: {
          nutricao: [
            { t: '07:00', n: 'Café da manhã', d: 'Ovos mexidos (3), pão integral, mamão, café sem açúcar' },
            { t: '10:00', n: 'Lanche', d: 'Iogurte sem lactose, castanhas (30g)' },
            { t: '12:30', n: 'Almoço', d: 'Frango grelhado, arroz integral, salada, azeite' },
            { t: '18:30', n: 'Pré-treino', d: 'Banana com pasta de amendoim' },
            { t: '20:30', n: 'Jantar', d: 'Salmão, batata-doce, legumes no vapor' }
          ],
          suplementos: [
            { t: '08:00', n: 'Creatina', d: '5 g · diária' },
            { t: '08:00', n: 'Vitamina D', d: '2000 UI' },
            { t: '12:00', n: 'Ômega 3', d: '1 g · almoço' },
            { t: '19:30', n: 'Whey', d: '30 g · pós-treino' },
            { t: '22:00', n: 'Magnésio', d: '300 mg · antes de dormir' }
          ],
          treino: [
            { n: 'Agachamento livre', sets: '4 séries', rest: '90s descanso' },
            { n: 'Supino reto', sets: '4 séries', rest: '75s descanso' },
            { n: 'Remada curvada', sets: '3 séries', rest: '60s descanso' },
            { n: 'Corrida leve', sets: '1 série', rest: '20 min contínuo' }
          ],
          treinoHorario: '18:00',
          habitos: { agua: '2,5 L', sono: '8 h' }
        }
      },
      logs: { maria: {} },        // preenchido abaixo p/ hoje
      weights: {
        maria: [
          { d: '04/03', kg: 71.5 }, { d: '18/03', kg: 70.4 }, { d: '01/04', kg: 69.6 },
          { d: '15/04', kg: 68.9 }, { d: '29/04', kg: 68.4 }, { d: '13/05', kg: 68.1 }
        ]
      },
      weeks: { maria: [ { wk: 'Sem 1', pct: 78 }, { wk: 'Sem 2', pct: 84 }, { wk: 'Sem 3', pct: 90 }, { wk: 'Atual', pct: 92, current: true } ] },
      consults: {},               // {patientId: {quando, link}}
      anamneseDone: {}            // marca quando o paciente conclui no app
    };
  }

  /* ---- persistência ---- */
  var mem = null; // fallback se localStorage indisponível
  function read() {
    try { var raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); }
    catch (e) {}
    return mem;
  }
  function write(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { mem = state; }
  }
  function load() {
    var s = read();
    if (!s || !s.meta || s.meta.version !== 2) { s = seed(); seedTodayLog(s); write(s); }
    // garante log de hoje (vira um novo dia => recomeça o checklist do dia)
    var t = todayISO();
    if (!s.logs.maria || !s.logs.maria[t]) { seedTodayLog(s); write(s); }
    return s;
  }
  function seedTodayLog(s) {
    var t = todayISO();
    s.logs = s.logs || {}; s.logs.maria = s.logs.maria || {};
    // 5 itens já feitos hoje (manhã): creatina, vit D, café, lanche, água
    s.logs.maria[t] = { done: ['sup-0', 'sup-1', 'ref-0', 'ref-1', 'hab-agua'] };
  }

  /* ---- derivação dos itens do dia a partir do protocolo ---- */
  function buildTodayItems(proto) {
    var items = [];
    (proto.suplementos || []).forEach(function (x, i) { items.push({ id: 'sup-' + i, group: 'sup', name: x.n, time: x.t, sub: x.d }); });
    (proto.nutricao || []).forEach(function (x, i) { items.push({ id: 'ref-' + i, group: 'ref', name: x.n, time: x.t, sub: x.d }); });
    items.push({ id: 'trn', group: 'trn', name: 'Treino do dia', time: proto.treinoHorario || '18:00', sub: (proto.treino || []).length + ' exercícios' });
    var h = proto.habitos || {};
    items.push({ id: 'hab-agua', group: 'hab', name: 'Água ' + (h.agua || ''), time: '', sub: '' });
    items.push({ id: 'hab-sono', group: 'hab', name: 'Sono ' + (h.sono || ''), time: '', sub: '' });
    return items;
  }

  /* ---- API pública ---- */
  var API = {
    KEY: KEY,
    reset: function () { var s = seed(); seedTodayLog(s); write(s); return s; },
    all: function () { return load(); },
    today: todayISO,

    patients: function () { return load().patients; },
    patient: function (id) { return load().patients.filter(function (p) { return p.id === id; })[0]; },
    currentId: function () { return load().currentPatientId; },
    current: function () { var s = load(); return API.patient(s.currentPatientId); },

    addPatient: function (nome, objetivo) {
      var s = load();
      var id = 'p' + Date.now();
      s.patients.unshift({ id: id, nome: nome, objetivo: objetivo || 'Saúde geral', status: 'aguardando', sentRel: 'agora' });
      write(s); return id;
    },
    setStatus: function (id, status) { var s = load(); var p = API.patient(id); if (p) { p.status = status; write(s); } },

    anamnese: function (id) { return load().anamneses[id] || null; },
    saveAnamnese: function (id, data) {
      var s = load(); s.anamneses[id] = data; s.anamneseDone[id] = new Date().toISOString();
      var p = API.patient(id); if (p && p.status === 'aguardando') p.status = 'triagem';
      write(s);
    },
    anamneseDone: function (id) { return !!load().anamneseDone[id]; },

    protocol: function (id) { return load().protocols[id] || null; },
    hasProtocol: function (id) { return !!load().protocols[id]; },
    saveProtocol: function (id, proto) {
      var s = load(); s.protocols[id] = proto;
      var p = API.patient(id); if (p) p.status = 'ativo';
      if (!s.logs[id]) s.logs[id] = {};
      write(s);
    },

    todayItems: function (id) {
      var s = load(); var proto = s.protocols[id]; if (!proto) return [];
      var t = todayISO(); var doneArr = (s.logs[id] && s.logs[id][t] && s.logs[id][t].done) || [];
      return buildTodayItems(proto).map(function (it) { it.done = doneArr.indexOf(it.id) >= 0; return it; });
    },
    toggleItem: function (id, itemId) {
      var s = load(); var t = todayISO();
      s.logs[id] = s.logs[id] || {}; s.logs[id][t] = s.logs[id][t] || { done: [] };
      var arr = s.logs[id][t].done; var i = arr.indexOf(itemId);
      if (i >= 0) arr.splice(i, 1); else arr.push(itemId);
      write(s); return arr.indexOf(itemId) >= 0;
    },
    isDone: function (id, itemId) {
      var s = load(); var t = todayISO();
      return !!(s.logs[id] && s.logs[id][t] && s.logs[id][t].done.indexOf(itemId) >= 0);
    },
    adherenceToday: function (id) {
      var items = API.todayItems(id); var total = items.length || 1;
      var done = items.filter(function (i) { return i.done; }).length;
      return { done: done, total: total, pct: Math.round((done / total) * 100) };
    },
    adherenceWeek: function (id) { var p = API.patient(id); return p && p.adesaoSemana != null ? p.adesaoSemana : 0; },
    weeks: function (id) { return load().weeks[id] || []; },

    weights: function (id) { return load().weights[id] || []; },
    addWeight: function (id, kg) {
      var s = load(); s.weights[id] = s.weights[id] || [];
      var d = new Date(); var label = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2);
      s.weights[id].push({ d: label, kg: kg }); write(s);
    },

    consult: function (id) { return load().consults[id] || null; },
    scheduleConsult: function (id, quando, link) { var s = load(); s.consults[id] = { quando: quando, link: link || 'https://meet.google.com/abc-defg-hij' }; write(s); }
  };

  global.PVDB = API;
})(window);
