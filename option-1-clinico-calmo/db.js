/* ============================================================================
   db.js — "banco de dados" FALSO em localStorage (mock conectado).
   Compartilhado por app.html (paciente) e index/revisar-anamnese/montar-protocolo
   (Dr. Pablo). Mesmo origin => mesmo localStorage => conectado NO MESMO navegador.
   NÃO é backend real. v3: treino com séries/reps/kg/método + rastreio por série.
   ========================================================================== */
(function (global) {
  var KEY = 'pv_db_v4';
  function todayISO() { return new Date().toISOString().slice(0, 10); }

  function seed() {
    var t = todayISO();
    var s = {
      meta: { version: 4, seededAt: new Date().toISOString(), today: t },
      currentPatientId: 'maria',
      patients: [
        { id: 'joao',   nome: 'João Mendes',       idade: 41, sexo: 'Masculino', altura: '1,78 m', peso: '94 kg', objetivo: 'Desinflamação',  status: 'triagem',   submittedRel: 'há 2 dias', flags: 3 },
        { id: 'lucas',  nome: 'Lucas Pereira',     idade: 35, objetivo: 'Performance',  status: 'aguardando', sentRel: 'há 4 dias' },
        { id: 'camila', nome: 'Camila Nogueira',   idade: 39, objetivo: 'Definição',    status: 'aguardando', sentRel: 'há 1 dia' },
        { id: 'maria',  nome: 'Maria Clara Souza', idade: 33, objetivo: 'Emagrecimento', status: 'ativo', adesaoSemana: 92 },
        { id: 'bia',    nome: 'Beatriz Carvalho',  idade: 47, objetivo: 'Saúde geral',  status: 'ativo', adesaoSemana: 86 },
        { id: 'rafael', nome: 'Rafael Antunes',    idade: 28, objetivo: 'Ganho de massa', status: 'ativo', adesaoSemana: 64 }
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
          resumo: { objetivo: 'Desinflamação', saude: 'Hipertensão controlada (losartana); cirurgia no joelho em 2021', intestino: 'Lactose confirmada; distensão após comer; fezes alternadas', atividade: 'Moderada, 3–4×/semana; disposição "Boa"' }
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
          treinoHorario: '18:00',
          treino: [
            { n: 'Agachamento livre', metodo: 'reta', rest: 90, musculo: 'Quadríceps e glúteos', equip: 'Barra', img: 'Barbell_Squat', instr: ['Barra apoiada no trapézio, pés na largura dos ombros.', 'Desça empurrando o quadril para trás até as coxas ficarem paralelas ao chão.', 'Suba empurrando pelos calcanhares, sem arredondar a lombar.', 'Core firme e olhar à frente o tempo todo.'], sets: [ { reps: '10' }, { reps: '10' }, { reps: '8' }, { reps: '8' } ] },
            { n: 'Supino reto', metodo: 'piramide', rest: 75, musculo: 'Peitoral e tríceps', equip: 'Barra + banco', img: 'Barbell_Bench_Press_-_Medium_Grip', instr: ['Deitado no banco, pegada um pouco mais aberta que os ombros.', 'Desça a barra até tocar de leve o peito, controlando.', 'Empurre até estender os cotovelos, sem travar.', 'Escápulas retraídas; evite arquear demais a lombar.'], sets: [ { reps: '12' }, { reps: '10' }, { reps: '8' }, { reps: '6' } ] },
            { n: 'Cadeira extensora', metodo: 'drop-set', rest: 60, drops: 'após a falha, baixe ~20% do peso e continue (2 quedas, sem descanso)', musculo: 'Quadríceps', equip: 'Máquina', img: 'Leg_Extensions', instr: ['Ajuste o encosto e o apoio logo acima dos tornozelos.', 'Estenda os joelhos até quase travar, expirando.', 'Segure 1s no topo, contraindo o quadríceps.', 'Desça devagar, sem deixar o peso bater.'], sets: [ { reps: '12 → falha' }, { reps: '12 → falha' }, { reps: 'até a falha' } ] },
            { n: 'Remada curvada', metodo: 'reta', rest: 60, musculo: 'Dorsais e romboides', equip: 'Barra', img: 'Bent_Over_Barbell_Row', instr: ['Tronco inclinado ~45°, coluna neutra, joelhos semiflexionados.', 'Puxe a barra em direção ao abdômen baixo.', 'Aperte as escápulas no topo do movimento.', 'Desça controlando, sem usar impulso.'], sets: [ { reps: '10' }, { reps: '10' }, { reps: '10' } ] },
            { n: 'Corrida leve', metodo: 'reta', rest: 0, musculo: 'Cardio / pernas', equip: 'Esteira ou rua', img: '', instr: ['Ritmo confortável — dá pra conversar enquanto corre.', '20 minutos contínuos.', 'Postura ereta, passada leve, ombros relaxados.', 'Hidrate-se antes e depois.'], sets: [ { reps: '20 min contínuo' } ] }
          ],
          habitos: { agua: '2,5 L', sono: '8 h' }
        }
      },
      logs: { maria: {} },
      weights: { maria: [ { d: '04/03', kg: 71.5 }, { d: '18/03', kg: 70.4 }, { d: '01/04', kg: 69.6 }, { d: '15/04', kg: 68.9 }, { d: '29/04', kg: 68.4 }, { d: '13/05', kg: 68.1 } ] },
      weeks: { maria: [ { wk: 'Sem 1', pct: 78 }, { wk: 'Sem 2', pct: 84 }, { wk: 'Sem 3', pct: 90 }, { wk: 'Atual', pct: 92, current: true } ] },
      resumoProgresso: [
        { pid: 'maria', nome: 'Maria Clara Souza', sexo: 'F', lift: 'Agachamento', de: 55, para: 62, un: 'kg', tend: 'up', nota: '+7 kg em 3 semanas' },
        { pid: 'bia', nome: 'Beatriz Carvalho', sexo: 'F', lift: 'Leg press', de: 80, para: 92, un: 'kg', tend: 'up', nota: '+12 kg em 4 semanas' },
        { pid: 'rafael', nome: 'Rafael Antunes', sexo: 'M', lift: 'Supino reto', de: 70, para: 72, un: 'kg', tend: 'flat', alerta: true, nota: '1 treino incompleto esta semana' }
      ],
      timeline: [
        { tipo: 'peso', pid: 'maria', nome: 'Maria Clara Souza', quando: 'Hoje · 08:15', kg: 68.1, delta: -0.3 },
        { tipo: 'carga', pid: 'rafael', nome: 'Rafael Antunes', quando: 'Ontem · 19:50', exercicio: 'Supino reto', incompleto: true, nota: 'Não completou — parou na 3a serie', series: [ { kg: 72, reps: 8 }, { kg: 72, reps: 7 }, { kg: 72, reps: 3, falhou: true } ] },
        { tipo: 'carga', pid: 'maria', nome: 'Maria Clara Souza', quando: 'Ontem · 18:42', exercicio: 'Agachamento livre', series: [ { kg: 60, reps: 10 }, { kg: 60, reps: 10 }, { kg: 62, reps: 8 }, { kg: 62, reps: 8 } ] },
        { tipo: 'peso', pid: 'rafael', nome: 'Rafael Antunes', quando: 'Ontem · 07:30', kg: 82.4, delta: 0.2 },
        { tipo: 'carga', pid: 'bia', nome: 'Beatriz Carvalho', quando: '2 dias · 17:10', exercicio: 'Leg press', series: [ { kg: 90, reps: 12 }, { kg: 90, reps: 12 }, { kg: 92, reps: 10 } ] },
        { tipo: 'peso', pid: 'bia', nome: 'Beatriz Carvalho', quando: '2 dias · 07:50', kg: 74.2, delta: -0.5 },
        { tipo: 'carga', pid: 'maria', nome: 'Maria Clara Souza', quando: '3 dias · 18:30', exercicio: 'Agachamento livre', series: [ { kg: 58, reps: 10 }, { kg: 58, reps: 10 }, { kg: 60, reps: 8 }, { kg: 60, reps: 8 } ] },
        { tipo: 'carga', pid: 'rafael', nome: 'Rafael Antunes', quando: '4 dias · 19:40', exercicio: 'Supino reto', series: [ { kg: 70, reps: 10 }, { kg: 70, reps: 9 }, { kg: 70, reps: 8 } ] },
        { tipo: 'peso', pid: 'maria', nome: 'Maria Clara Souza', quando: '1 sem · 08:05', kg: 68.9, delta: -0.4 },
        { tipo: 'carga', pid: 'bia', nome: 'Beatriz Carvalho', quando: '1 sem · 17:00', exercicio: 'Leg press', series: [ { kg: 85, reps: 12 }, { kg: 85, reps: 11 }, { kg: 88, reps: 9 } ] }
      ],
      consults: {},
      anamneseDone: {}
    };
    seedTodayLog(s);
    return s;
  }

  function seedTodayLog(s) {
    var t = todayISO();
    s.logs = s.logs || {}; s.logs.maria = s.logs.maria || {};
    s.logs.maria[t] = { done: ['sup-0', 'sup-1', 'ref-0', 'ref-1', 'hab-agua'], treino: { setsDone: [], kg: {} } };
  }

  var mem = null;
  function read() { try { var raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch (e) {} return mem; }
  function write(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { mem = s; } }
  function load() {
    var s = read();
    if (!s || !s.meta || s.meta.version !== 4) { s = seed(); write(s); return s; }
    var t = todayISO();
    if (!s.logs.maria || !s.logs.maria[t]) { seedTodayLog(s); write(s); }
    if (!s.timeline) { var fr = seed(); s.timeline = fr.timeline; s.resumoProgresso = fr.resumoProgresso; write(s); }
    return s;
  }

  function buildTodayItems(proto) {
    var items = [];
    (proto.suplementos || []).forEach(function (x, i) { items.push({ id: 'sup-' + i, group: 'sup', name: x.n, time: x.t, sub: x.d }); });
    (proto.nutricao || []).forEach(function (x, i) { items.push({ id: 'ref-' + i, group: 'ref', name: x.n, time: x.t, sub: x.d }); });
    var nSets = 0; (proto.treino || []).forEach(function (ex) { nSets += (ex.sets || []).length; });
    items.push({ id: 'trn', group: 'trn', name: 'Treino do dia', time: proto.treinoHorario || '18:00', sub: (proto.treino || []).length + ' exercícios · ' + nSets + ' séries' });
    var h = proto.habitos || {};
    items.push({ id: 'hab-agua', group: 'hab', name: 'Água ' + (h.agua || ''), time: '', sub: '' });
    items.push({ id: 'hab-sono', group: 'hab', name: 'Sono ' + (h.sono || ''), time: '', sub: '' });
    return items;
  }

  function trnLog(s, pid) {
    var t = todayISO(); s.logs[pid] = s.logs[pid] || {}; s.logs[pid][t] = s.logs[pid][t] || { done: [] };
    s.logs[pid][t].treino = s.logs[pid][t].treino || { setsDone: [], kg: {} };
    return s.logs[pid][t].treino;
  }
  function totalSets(s, pid) { var p = s.protocols[pid]; var n = 0; if (p && p.treino) p.treino.forEach(function (ex) { n += (ex.sets || []).length; }); return n; }
  function syncTrn(s, pid) {
    var t = todayISO(); var dl = s.logs[pid][t]; var tl = dl.treino; var total = totalSets(s, pid);
    var i = dl.done.indexOf('trn');
    if (total > 0 && tl.setsDone.length >= total) { if (i < 0) dl.done.push('trn'); }
    else { if (i >= 0) dl.done.splice(i, 1); }
  }

  var API = {
    KEY: KEY,
    reset: function () { var s = seed(); write(s); return s; },
    all: function () { return load(); },
    today: todayISO,
    patients: function () { return load().patients; },
    patient: function (id) { return load().patients.filter(function (p) { return p.id === id; })[0]; },
    currentId: function () { return load().currentPatientId; },
    current: function () { var s = load(); return API.patient(s.currentPatientId); },
    addPatient: function (nome, objetivo) { var s = load(); var id = 'p' + Date.now(); s.patients.unshift({ id: id, nome: nome, objetivo: objetivo || 'Saúde geral', status: 'aguardando', sentRel: 'agora' }); write(s); return id; },
    setStatus: function (id, st) { var s = load(); var p = API.patient(id); if (p) { p.status = st; write(s); } },

    anamnese: function (id) { return load().anamneses[id] || null; },
    saveAnamnese: function (id, data) { var s = load(); s.anamneses[id] = data; s.anamneseDone[id] = new Date().toISOString(); var p = API.patient(id); if (p && p.status === 'aguardando') p.status = 'triagem'; write(s); },
    anamneseDone: function (id) { return !!load().anamneseDone[id]; },

    protocol: function (id) { return load().protocols[id] || null; },
    hasProtocol: function (id) { return !!load().protocols[id]; },
    saveProtocol: function (id, proto) { var s = load(); s.protocols[id] = proto; var p = API.patient(id); if (p) p.status = 'ativo'; if (!s.logs[id]) s.logs[id] = {}; write(s); },

    todayItems: function (id) {
      var s = load(); var proto = s.protocols[id]; if (!proto) return [];
      var t = todayISO(); var doneArr = (s.logs[id] && s.logs[id][t] && s.logs[id][t].done) || [];
      return buildTodayItems(proto).map(function (it) { it.done = doneArr.indexOf(it.id) >= 0; return it; });
    },
    toggleItem: function (id, itemId) { var s = load(); var t = todayISO(); s.logs[id] = s.logs[id] || {}; s.logs[id][t] = s.logs[id][t] || { done: [] }; var arr = s.logs[id][t].done; var i = arr.indexOf(itemId); if (i >= 0) arr.splice(i, 1); else arr.push(itemId); write(s); return arr.indexOf(itemId) >= 0; },
    isDone: function (id, itemId) { var s = load(); var t = todayISO(); return !!(s.logs[id] && s.logs[id][t] && s.logs[id][t].done.indexOf(itemId) >= 0); },
    adherenceToday: function (id) { var items = API.todayItems(id); var total = items.length || 1; var done = items.filter(function (i) { return i.done; }).length; return { done: done, total: total, pct: Math.round((done / total) * 100) }; },
    adherenceWeek: function (id) { var p = API.patient(id); return p && p.adesaoSemana != null ? p.adesaoSemana : 0; },
    weeks: function (id) { return load().weeks[id] || []; },
    timeline: function () { return load().timeline || []; },
    resumoProgresso: function () { return load().resumoProgresso || []; },

    /* --- treino por série --- */
    toggleSet: function (id, ex, set) { var s = load(); var tl = trnLog(s, id); var k = ex + '-' + set; var i = tl.setsDone.indexOf(k); if (i >= 0) tl.setsDone.splice(i, 1); else tl.setsDone.push(k); syncTrn(s, id); write(s); return tl.setsDone.indexOf(k) >= 0; },
    isSetDone: function (id, ex, set) { var s = load(); var t = todayISO(); var tl = s.logs[id] && s.logs[id][t] && s.logs[id][t].treino; return !!(tl && tl.setsDone.indexOf(ex + '-' + set) >= 0); },
    setKg: function (id, ex, set, kg) { var s = load(); var tl = trnLog(s, id); tl.kg[ex + '-' + set] = kg; write(s); },
    getKg: function (id, ex, set) { var s = load(); var t = todayISO(); var tl = s.logs[id] && s.logs[id][t] && s.logs[id][t].treino; return (tl && tl.kg[ex + '-' + set]) || ''; },
    treinoProgress: function (id) { var s = load(); var total = totalSets(s, id); var t = todayISO(); var tl = s.logs[id] && s.logs[id][t] && s.logs[id][t].treino; return { done: tl ? tl.setsDone.length : 0, total: total }; },
    setMetodo: function (id, ex, metodo) { var s = load(); if (s.protocols[id] && s.protocols[id].treino[ex]) { s.protocols[id].treino[ex].metodo = metodo; write(s); } },

    weights: function (id) { return load().weights[id] || []; },
    addWeight: function (id, kg) { var s = load(); s.weights[id] = s.weights[id] || []; var d = new Date(); var lbl = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2); s.weights[id].push({ d: lbl, kg: kg }); write(s); },

    consult: function (id) { return load().consults[id] || null; },
    scheduleConsult: function (id, quando, link) { var s = load(); s.consults[id] = { quando: quando, link: link || 'https://meet.google.com/abc-defg-hij' }; write(s); }
  };
  global.PVDB = API;
})(window);
