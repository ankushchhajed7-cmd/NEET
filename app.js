/* NEET — MCQ practice PWA
   Vanilla JS, saara data localStorage mein. Content data/*.js files se aata hai. */
'use strict';

/* Har release par badhao (sw.js ka CACHE bhi) */
const APP_VER = 'v1.3';

/* ================= storage ================= */
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function load(k, d) { try { const x = localStorage.getItem(k); return x ? JSON.parse(x) : d; } catch (e) { return d; } }

const SUBJ = window.NEET_SUBJECTS;
const CHS = window.NEET_CH.slice().sort(function (a, b) {
  return (SUBJ.findIndex(s => s.id === a.subj) - SUBJ.findIndex(s => s.id === b.subj)) || ((a.cls || 0) - (b.cls || 0)) || ((a.no || 0) - (b.no || 0));
});

/* Options ka order har question ke liye fixed-random (gid se seed) — taaki sahi jawab
   hamesha (2) par na rahe. "How many / statements" wale (stmts) aur A-R, St I/II ka order NEET jaisa hi rehta hai. */
function seeded(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return function () { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; }; }
function mixOptions(g, q) {
  if (!q.o || q.fixed || (q.type !== 'mcq' && q.type !== 'match')) return;
  const rnd = seeded(g), idx = q.o.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const o = idx.map(i => q.o[i]);
  q.a = idx.indexOf(q.a); q.o = o;
  if (q.h && q.h.o) q.h.o = idx.map(i => q.h.o[i]);
}

/* global question index: gid = chapterId|questionId */
const QIDX = {};
CHS.forEach(function (c) { (c.qs || []).forEach(function (q) { const g = c.id + '|' + q.id; mixOptions(g, q); QIDX[g] = { c: c, q: q }; }); });
function gid(c, q) { return c.id + '|' + q.id; }
function chOf(id) { return CHS.find(c => c.id === id); }
function subjOf(id) { return SUBJ.find(s => s.id === id); }
function chaptersOf(sid) { return CHS.filter(c => c.subj === sid); }
function allGids(chs) { const out = []; chs.forEach(c => (c.qs || []).forEach(q => out.push(gid(c, q)))); return out; }

/* ================= settings / stats ================= */
function settings() { return Object.assign({ theme: 'light', lang: 'en', name: '', goal: 50, voice: true, vlang: 'hi', vspeed: 'normal', vexpl: false }, load('neet_set', {})); }
function setSetting(k, v) { const s = settings(); s[k] = v; save('neet_set', s); applyTheme(); render(); }
(function () {
  // ek baar: default ab Silver (ShopSathi) theme
  if (load('neet_theme_v13', false)) return;
  const s = load('neet_set', null); if (s && s.theme === 'dark') { s.theme = 'light'; save('neet_set', s); }
  save('neet_theme_v13', true);
})();
function applyTheme() {
  const t = settings().theme; document.documentElement.setAttribute('data-theme', t);
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t === 'dark' ? '#0B0C0F' : '#C2C7CC';
}

/* per-question stats: gid -> [seen, correct, lastCorrect(0/1)] */
function qstats() { return load('neet_qs', {}); }
function recordAnswer(g, ok) {
  const s = qstats(); const r = s[g] || [0, 0, 0];
  r[0]++; if (ok) r[1]++; r[2] = ok ? 1 : 0; s[g] = r; save('neet_qs', s);
  bumpDay();
}
function dkey(d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function todayKey() { return dkey(new Date()); }
function bumpDay() {
  const days = load('neet_days', {}); const t = todayKey(); days[t] = (days[t] || 0) + 1; save('neet_days', days);
  const st = load('neet_streak', { last: null, days: 0 });
  if (st.last !== t) {
    const y = dkey(new Date(Date.now() - 86400000));
    st.days = (st.last === y) ? (st.days || 0) + 1 : 1; st.last = t; save('neet_streak', st);
  }
}
function streak() {
  const st = load('neet_streak', { last: null, days: 0 });
  const y = dkey(new Date(Date.now() - 86400000));
  return (st.last === todayKey() || st.last === y) ? st.days : 0;
}
function todayCount() { return load('neet_days', {})[todayKey()] || 0; }

function summary(gids) {
  const s = qstats(); let seen = 0, att = 0, cor = 0, wrong = 0;
  gids.forEach(function (g) { const r = s[g]; if (r) { seen++; att += r[0]; cor += r[1]; if (!r[2]) wrong++; } });
  return { total: gids.length, seen: seen, acc: att ? cor / att : null, wrong: wrong };
}
function mistakes(sid) {
  const s = qstats();
  return Object.keys(s).filter(g => QIDX[g] && !s[g][2] && (!sid || QIDX[g].c.subj === sid));
}
function bookmarks() { return load('neet_bm', []).filter(g => QIDX[g]); }
function toggleBm(g) {
  let b = load('neet_bm', []); const i = b.indexOf(g);
  if (i < 0) b.push(g); else b.splice(i, 1);
  save('neet_bm', b); render();
}
function revised() { return load('neet_rev', {}); }
function toggleRev(cid, pid) {
  const r = revised(); r[cid] = r[cid] || {};
  if (r[cid][pid]) delete r[cid][pid]; else r[cid][pid] = 1;
  save('neet_rev', r); render();
}

/* ================= question view helpers ================= */
const AR_OPTS = [
  'Both Assertion (A) and Reason (R) are true and R is the correct explanation of A.',
  'Both Assertion (A) and Reason (R) are true but R is NOT the correct explanation of A.',
  'Assertion (A) is true but Reason (R) is false.',
  'Assertion (A) is false but Reason (R) is true.'
];
const ST_OPTS = [
  'Both Statement I and Statement II are true.',
  'Both Statement I and Statement II are false.',
  'Statement I is true but Statement II is false.',
  'Statement I is false but Statement II is true.'
];
const AR_OPTS_HI = [
  'अभिकथन (A) और कारण (R) दोनों सही हैं तथा R, A की सही व्याख्या है।',
  'अभिकथन (A) और कारण (R) दोनों सही हैं परंतु R, A की सही व्याख्या नहीं है।',
  'अभिकथन (A) सही है परंतु कारण (R) गलत है।',
  'अभिकथन (A) गलत है परंतु कारण (R) सही है।'
];
const ST_OPTS_HI = [
  'कथन I और कथन II दोनों सही हैं।',
  'कथन I और कथन II दोनों गलत हैं।',
  'कथन I सही है परंतु कथन II गलत है।',
  'कथन I गलत है परंतु कथन II सही है।'
];
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/* Hindi medium: question mein h:{q,o,e,s,ar,st,match} ho to wahi dikhao */
function V(q) { return (settings().lang === 'hi' && q.h) ? Object.assign({}, q, q.h) : q; }
function isHi(q) { return settings().lang === 'hi' && !!q.h; }
function optsOf(q) {
  const v = V(q); if (v.o) return v.o;
  const hi = isHi(q);
  if (q.type === 'ar') return hi ? AR_OPTS_HI : AR_OPTS;
  if (q.type === 'st') return hi ? ST_OPTS_HI : ST_OPTS;
  return [];
}
function qHTML(q) {
  const v = V(q), hi = isHi(q); let h = '';
  if (q.type === 'ar') {
    if (v.q) h += '<p>' + v.q + '</p>';
    else h += '<p>' + (hi ? 'नीचे दो कथन दिए गए हैं: एक को अभिकथन (A) तथा दूसरे को कारण (R) कहा गया है।' : 'Given below are two statements: one is labelled as Assertion (A) and the other as Reason (R).') + '</p>';
    h += '<ul class="stl"><li><b>' + (hi ? 'अभिकथन (A):' : 'Assertion (A):') + '</b> ' + v.ar.A + '</li><li><b>' + (hi ? 'कारण (R):' : 'Reason (R):') + '</b> ' + v.ar.R + '</li></ul>';
  } else if (q.type === 'st') {
    h += '<p>' + (v.q || (hi ? 'नीचे दो कथन दिए गए हैं:' : 'Given below are two statements:')) + '</p>';
    h += '<ul class="stl">' + v.st.map((s, i) => '<li><b>' + (hi ? 'कथन ' : 'Statement ') + ROMAN[i] + ':</b> ' + s + '</li>').join('') + '</ul>';
  } else if (q.type === 'match') {
    const m = v.match;
    h += '<p>' + (v.q || (hi ? 'सूची I का सूची II से मिलान कीजिए।' : 'Match List I with List II.')) + '</p>';
    h += '<table class="mt"><tr><th colspan="2">' + (m.h ? m.h[0] : 'List I') + '</th><th colspan="2">' + (m.h ? m.h[1] : 'List II') + '</th></tr>';
    const n = Math.max(m.l.length, m.r.length);
    for (let i = 0; i < n; i++) {
      h += '<tr><td class="k">' + LETTERS[i] + '.</td><td>' + (m.l[i] || '') + '</td><td class="k">' + ROMAN[i] + '.</td><td>' + (m.r[i] || '') + '</td></tr>';
    }
    h += '</table>';
  } else {
    h += '<p>' + v.q + '</p>';
    if (v.s) h += '<ul class="stl">' + v.s.map((s, i) => '<li><b>' + LETTERS[i] + '.</b> ' + s + '</li>').join('') + '</ul>';
  }
  if (v.img) h += '<div style="text-align:center;margin-top:10px">' + v.img + '</div>';
  return h;
}
function pointText(c, pid) { const p = (c.points || []).find(x => x.id === pid); return p ? p.t : ''; }

/* ================= voice (bol kar batana) =================
   Phone ki Text-to-Speech. APK (WebView) khud nahi bol sakta — agar wrapper
   window.AndroidTTS bridge deta hai to wahi use hota hai (PADHAI jaisa). */
let VOICES = [], VOICE_TRIES = 0;
const HAS_TTS = 'speechSynthesis' in window;
function loadVoices() {
  if (!HAS_TTS) return;
  try { VOICES = speechSynthesis.getVoices() || []; } catch (e) { VOICES = []; }
  // Android par pehle pal getVoices() khaali aata hai — thodi der poochte raho
  if (!VOICES.length && VOICE_TRIES < 15) { VOICE_TRIES++; setTimeout(loadVoices, 300); }
}
if (HAS_TTS) { loadVoices(); try { speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {} }
function findV(re) { return VOICES.find(v => re.test(v.lang)); }
function getVoice(lang) {
  const v = lang === 'hi' ? (findV(/hi-IN/i) || findV(/^hi/i)) : (findV(/en-IN/i) || findV(/en-GB/i) || findV(/^en/i));
  return v || findV(/^en/i) || VOICES[0] || null;
}
function voiceRate() { const sp = settings().vspeed; return sp === 'slow' ? 0.75 : sp === 'fast' ? 1.1 : 0.92; }
function hasBridge() { return window.AndroidTTS && typeof window.AndroidTTS.speak === 'function'; }
/* apk-factory wale APK ka native bridge: ANVAlert.speak(text) — phone ka TTS (Hindi voice) */
function hasAnv() { return window.ANVAlert && typeof window.ANVAlert.speak === 'function'; }
try { if (hasAnv() && window.ANVAlert.prepare) window.ANVAlert.prepare(); } catch (e) {}

// phone tabhi bolne deta hai jab ek baar tap ho chuka ho
let TTS_UNLOCKED = false;
function ttsUnlock() {
  if (TTS_UNLOCKED || !HAS_TTS) return; TTS_UNLOCKED = true;
  try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch (e) {}
  loadVoices();
}
document.addEventListener('touchstart', ttsUnlock, { once: true, passive: true });
document.addEventListener('click', ttsUnlock, { once: true });

let TTSKEEP = null;
function speak(text, lang) {
  text = String(text || '').trim(); if (!text) return;
  lang = lang || settings().vlang;
  if (hasAnv()) { try { window.ANVAlert.speak(text); } catch (e) {} return; }
  if (hasBridge()) { try { window.AndroidTTS.speak(text, lang === 'hi' ? 'hi-IN' : 'en-IN', voiceRate()); } catch (e) {} return; }
  if (!HAS_TTS) return;
  ttsUnlock(); shutup();
  // cancel() aur speak() ek hi tick mein ho to Android line kha jaata hai
  setTimeout(function () {
    try {
      const u = new SpeechSynthesisUtterance(text), v = getVoice(lang);
      if (v) u.voice = v;
      u.lang = v ? v.lang : (lang === 'hi' ? 'hi-IN' : 'en-IN');
      u.rate = voiceRate(); u.pitch = 1.03;
      speechSynthesis.speak(u);
      // Chrome Android lambi line beech mein rok deta hai — sirf tab resume karo
      TTSKEEP = setInterval(function () {
        try { if (!speechSynthesis.speaking) { clearInterval(TTSKEEP); TTSKEEP = null; } else if (speechSynthesis.paused) speechSynthesis.resume(); } catch (e) {}
      }, 3000);
    } catch (e) {}
  }, 70);
}
function shutup() {
  if (TTSKEEP) { clearInterval(TTSKEEP); TTSKEEP = null; }
  if (hasAnv() && window.ANVAlert.stopSpeak) { try { window.ANVAlert.stopSpeak(); } catch (e) {} }
  if (hasBridge()) { try { window.AndroidTTS.stop(); } catch (e) {} }
  if (HAS_TTS) { try { speechSynthesis.cancel(); } catch (e) {} }
}
function plain(html) { const d = document.createElement('div'); d.innerHTML = String(html || '').replace(/<br\s*\/?>/gi, '. ').replace(/<\/(li|p|tr|td)>/gi, '. $&'); return (d.textContent || '').replace(/\s+/g, ' ').replace(/(\.\s*){2,}/g, '. ').trim(); }
function pickLine(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function callName() {
  // "YUKTI" jaisa caps naam TTS akshar-akshar padhta hai — bolte waqt "Yukti" karo
  return (settings().name || '').replace(/[A-Za-z]+/g, w => w === w.toUpperCase() ? w.charAt(0) + w.slice(1).toLowerCase() : w);
}

const SAY = {
  hi: {
    ok: ['शाबाश {n}! आपका जवाब सही है।', 'बहुत बढ़िया {n}! बिल्कुल सही जवाब।', 'वाह {n}! सही जवाब, चार नंबर पक्के।', '{n}, एकदम सही! ऐसे ही चलते रहो।'],
    fixed: ['शाबाश {n}! ये गलती अब सुधर गई।'],
    combo: ['कमाल {n}! लगातार {c} सही जवाब!'],
    bad: ['{n}, आपका जवाब गलत है। सही जवाब ऑप्शन {k} है।', 'ओह {n}, ये गलत हो गया। सही जवाब ऑप्शन {k} है। व्याख्या ध्यान से पढ़ो।', '{n}, कोई बात नहीं। सही जवाब ऑप्शन {k} है।'],
    test: '{n}, आपका स्कोर {m} में से {s} है। {c} सही, {w} गलत, और {u} छोड़े।',
    prac: '{n}, आपने {t} में से {c} सवाल सही किए।',
    hello: 'नमस्ते {n}! नीट की तैयारी में आपका स्वागत है। चलो पढ़ाई शुरू करें।',
    test1: 'नमस्ते {n}! क्या मेरी आवाज़ सुनाई दे रही है?'
  },
  en: {
    ok: ['Well done {n}! Your answer is correct.', 'Excellent {n}! That is the right answer.', 'Great {n}! Correct, four marks.', '{n}, perfect! Keep going.'],
    fixed: ['Well done {n}! That mistake is now fixed.'],
    combo: ['Amazing {n}! {c} correct in a row!'],
    bad: ['{n}, your answer is wrong. The correct answer is option {k}.', 'Oh {n}, that is wrong. The correct answer is option {k}. Read the explanation carefully.', 'No problem {n}. The correct answer is option {k}.'],
    test: '{n}, your score is {s} out of {m}. {c} correct, {w} wrong and {u} left.',
    prac: '{n}, you got {c} out of {t} correct.',
    hello: 'Hello {n}! Welcome to your NEET preparation. Let us start studying.',
    test1: 'Hello {n}! Can you hear me?'
  }
};
function say(key, vars) {
  const st = settings(); if (!st.voice) return;
  const L = SAY[st.vlang] || SAY.hi; let t = L[key]; if (Array.isArray(t)) t = pickLine(t);
  vars = Object.assign({ n: callName() }, vars || {});
  t = t.replace(/\{(\w)\}/g, (_, k) => vars[k] == null ? '' : vars[k]).replace(/^[,\s]+|\s+(?=[,!।.])/g, '').replace(/^\s*,\s*/, '');
  speak(t, st.vlang);
}
/* question aur explanation English mein hain — unhe English voice padhegi (Hindi version ho to Hindi) */
function readQuestion() {
  if (!RUN) return; const ent = QIDX[RUN.items[RUN.i]], q = ent.q;
  const hi = isHi(q);
  const opts = optsOf(q).map((o, k) => (hi ? 'विकल्प ' : 'Option ') + (k + 1) + '. ' + plain(o)).join('. ');
  speak(plain(qHTML(q)) + '. ' + opts, hi ? 'hi' : 'en');
}
function readExpl() {
  if (!RUN) return; const q = QIDX[RUN.items[RUN.i]].q, v = V(q);
  speak((isHi(q) ? 'सही जवाब विकल्प ' : 'The correct answer is option ') + (q.a + 1) + '. ' + plain(v.e), isHi(q) ? 'hi' : 'en');
}
function appEnv() {
  const ua = navigator.userAgent || '';
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const webview = /\bwv\b/i.test(ua) || /; ?wv\)/i.test(ua) || (/Android/i.test(ua) && !/Chrome\/\d/i.test(ua));
  return { standalone: standalone, webview: webview, bridge: hasBridge() || hasAnv() };
}
function soundTest() {
  ttsUnlock(); loadVoices();
  const e = appEnv(), where = hasAnv() ? 'APK (apk-factory awaaz)' : e.bridge ? 'APK (Android TTS bridge)' : e.webview ? 'APK / WebView' : e.standalone ? 'Home-screen app' : 'Chrome browser';
  const st = settings();
  speak((SAY[st.vlang] || SAY.hi).test1.replace('{n}', callName()), st.vlang);
  setTimeout(function () {
    let m = 'Kahan chal raha hai: ' + where + '\n';
    if (e.bridge) m += 'Android ki apni awaaz chalu hai.' + (hasAnv() && window.ANVAlert.ttsReady && !window.ANVAlert.ttsReady() ? '\n(Pehli baar 1-2 second lagte hain — dobara test karo.)' : '') +
      '\n\nAwaaz na aaye to:\n1. Media volume badhao\n2. Settings → Text-to-speech → Google Speech Services chalu karo, Hindi voice download karo';
    else if (!HAS_TTS || (e.webview && !VOICES.length)) m += '\nYahan awaaz nahi aa sakti — APK ka WebView khud nahi bolta.\n\nHal: Chrome mein app ka link kholo → ⋮ → "Add to Home screen" / "Install app". Wahan awaaz aayegi.';
    else if (!VOICES.length) m += '\nPhone mein koi voice nahi mili.\nSettings → Accessibility → Text-to-speech → "Google Speech Services" chalu karo aur Hindi voice download karo.';
    else m += 'Voice mili: ' + VOICES.length + '\n\nAwaaz na aaye to:\n1. Media volume badhao\n2. Silent / vibrate band karo\n3. Text-to-speech mein Hindi voice download karo';
    alert(m);
  }, 1500);
}

/* ================= app state ================= */
const state = { screen: 'home', subj: null, cid: null, sheet: null, chTab: 'qs' };
let RUN = null;        // current practice/test/review session
let TICK = null;
let deferredInstall = null;

function go(s) { shutup(); state.screen = s; state.sheet = null; window.scrollTo(0, 0); render(); }
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 1800);
}
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pct(x) { return x == null ? '—' : Math.round(x * 100) + '%'; }
function fmtTime(sec) { sec = Math.max(0, Math.round(sec)); const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return (h ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s; }
function ring(p, txt, sz, col) {
  sz = sz || 46; const r = sz / 2 - 4, c = 2 * Math.PI * r; p = Math.max(0, Math.min(1, p || 0));
  return `<div class="ring" style="width:${sz}px;height:${sz}px"><svg width="${sz}" height="${sz}">
  <circle cx="${sz / 2}" cy="${sz / 2}" r="${r}" fill="none" stroke="var(--surface2)" stroke-width="4"/>
  <circle cx="${sz / 2}" cy="${sz / 2}" r="${r}" fill="none" stroke="${col || 'var(--gold)'}" stroke-width="4" stroke-linecap="round"
   stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}" transform="rotate(-90 ${sz / 2} ${sz / 2})"/></svg><span>${txt}</span></div>`;
}

/* ================= render ================= */
function render() {
  clearInterval(TICK); TICK = null;
  const app = document.getElementById('app');
  const needName = !settings().name && ['home', 'subjects', 'tests', 'progress'].indexOf(state.screen) >= 0;
  const fn = needName ? SCREENS.welcome : (SCREENS[state.screen] || SCREENS.home);
  const withNav = !needName && ['home', 'subjects', 'tests', 'progress', 'more'].indexOf(state.screen) >= 0;
  document.body.classList.toggle('hasnav', withNav);
  app.innerHTML = fn() + (withNav ? navBar() : '') + (state.sheet ? state.sheet() : '');
  if (state.screen === 'run' && RUN && RUN.mode === 'test') { TICK = setInterval(testTick, 1000); testTick(); }
}
function navBar() {
  const it = [['home', '🏠', 'Home'], ['subjects', '📚', 'Subjects'], ['tests', '📝', 'Tests'], ['progress', '📊', 'Progress'], ['more', '⚙️', 'More']];
  return '<div class="nav"><div class="in">' + it.map(x =>
    `<button class="${state.screen === x[0] ? 'on' : ''}" onclick="go('${x[0]}')"><span class="e">${x[1]}</span>${x[2]}</button>`).join('') + '</div></div>';
}

const SCREENS = {};

/* ---------- pehli baar: naam ---------- */
SCREENS.welcome = function () {
  return `<div style="text-align:center;margin-top:48px"><img src="icons/icon-192.png" alt="" style="width:104px;height:104px;border-radius:26px;box-shadow:0 0 0 1px rgba(230,185,74,.4),0 18px 40px -14px rgba(230,185,74,.5)">
    <div class="mont silvertx" style="font-weight:900;font-size:30px;letter-spacing:.06em;margin-top:16px">NEET</div>
    <div class="muted" style="font-size:14px;margin:8px 0 22px">Aapka naam kya hai? App aapko isi naam se bulayega 🔊</div></div>
    <div class="card"><input class="txt" id="wn" maxlength="20" placeholder="Jaise: Raj" style="text-align:center;font-size:19px;font-weight:700"
      onkeydown="if(event.key==='Enter')saveWelcome()">
    <div id="wnErr" style="color:var(--bad);font-weight:700;font-size:13px;text-align:center;min-height:18px;margin-top:6px"></div>
    <button class="btn" onclick="saveWelcome()">Chalo shuru karein 🚀</button></div>
    <div class="muted" style="text-align:center;margin-top:14px;line-height:1.5">💡 Chhota naam likho jo pukarne mein achha lage.<br>Sahi/galat jawab par app isi naam se bolega.</div>`;
};
function saveWelcome() {
  const el = document.getElementById('wn'), name = (el.value || '').trim();
  if (!name) { document.getElementById('wnErr').textContent = 'Pehle apna naam likho'; el.focus(); return; }
  const s = settings(); s.name = name; save('neet_set', s);
  go('home'); say('hello');
}

/* ---------- Home ---------- */
SCREENS.home = function () {
  const st = settings(), all = allGids(CHS), sm = summary(all), mk = mistakes().length, bm = bookmarks().length;
  const goal = st.goal || 50, today = todayCount();
  const hist = load('neet_hist', []);
  const lastTest = hist[hist.length - 1];
  const saved = load('neet_run', null);
  const hr = new Date().getHours();
  const hello = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
  let h = `<div class="topbar"><div class="brand"><img src="icons/icon-192.png" alt="">
    <div><div class="t silvertx">NEET <span class="tag g" style="font-family:Inter,sans-serif;font-size:10.5px;letter-spacing:0;vertical-align:4px">${APP_VER}</span></div>
    <div class="st">${hello}${st.name ? ', ' + esc(st.name) : ''} ✨</div></div></div>
    <div style="display:flex;gap:8px"><button class="iconbtn" title="Refresh — naya version laao" onclick="appRefresh()">🔄</button>
    <button class="iconbtn" onclick="setSetting('theme', settings().theme==='dark'?'light':'dark')">${st.theme === 'dark' ? '☀️' : '🌙'}</button></div></div>`;

  h += `<div class="hero"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
    <div><div class="lbl">Aaj ka target</div><div class="big goldtx">${today}<span style="font-size:18px;color:var(--heroSoft);-webkit-text-fill-color:var(--heroSoft)"> / ${goal}</span></div>
    <div style="font-size:12.5px;color:var(--heroSoft);font-weight:600;margin-top:6px">🔥 ${streak()} din ki streak · ${sm.seen}/${sm.total} questions done</div></div>
    ${ring(today / goal, Math.min(100, Math.round(today / goal * 100)) + '%', 66)}</div>
    <div class="bar" style="margin-top:14px;background:var(--heroBar)"><i style="width:${sm.total ? sm.seen / sm.total * 100 : 0}%"></i></div></div>`;

  if (saved) {
    h += `<div class="tile" style="margin-top:12px;border-color:var(--gold)" onclick="resumeRun()"><div class="ic">⏸️</div>
      <div class="g1"><div class="n">Test adhoora hai — resume karo</div><div class="s">${esc(saved.title)} · ${saved.items.length} Qs</div></div><div class="ch">›</div></div>`;
  }

  h += `<div class="stats"><div class="stat"><b class="goldtx">${pct(sm.acc)}</b><span>Accuracy</span></div>
    <div class="stat"><b>${mk}</b><span>Galtiyan</span></div>
    <div class="stat"><b>${lastTest ? lastTest.score : '—'}</b><span>Last test</span></div></div>`;

  h += `<div class="sec">Quick start</div><div class="grid2">
    <div class="qa gold" onclick="startMixed(null,20)"><div class="e">⚡</div><div class="n">Quick 20</div><div class="s">Sab chapters se mix</div></div>
    <div class="qa" onclick="go('tests')"><div class="e">🏆</div><div class="n">NEET Mock</div><div class="s">180 Q · 180 min</div></div>
    <div class="qa" onclick="startList(mistakes(),'Galtiyan sudharo','practice')"><div class="e">🎯</div><div class="n">Mistakes</div><div class="s">${mk} questions</div></div>
    <div class="qa" onclick="startList(bookmarks(),'Bookmarks','practice')"><div class="e">⭐</div><div class="n">Bookmarks</div><div class="s">${bm} saved</div></div></div>`;

  h += `<div class="sec">Subjects</div>` + SUBJ.map(subjTile).join('');
  if (!CHS.length || CHS.every(c => c.demo)) {
    h += `<div class="card" style="margin-top:6px;font-size:13.5px;line-height:1.55;color:var(--ink2)">📄 Abhi sirf <b>demo</b> chapter hai. Subject ki PDF aate hi har lesson ka har point yahan MCQ ban kar aa jayega.</div>`;
  }
  return h;
};
function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function subjTile(s) {
  const chs = chaptersOf(s.id), sm = summary(allGids(chs));
  return `<div class="tile" onclick="openSubject('${s.id}')"><div class="ic">${s.ic}</div><div class="g1">
    <div class="n">${s.name} <span class="muted" style="font-weight:600">· ${s.hi}</span></div>
    <div class="s">${chs.length} chapters · ${sm.total} Qs · accuracy ${pct(sm.acc)}</div>
    <div class="bar"><i style="width:${sm.total ? sm.seen / sm.total * 100 : 0}%"></i></div></div><div class="ch">›</div></div>`;
}

/* ---------- Subjects ---------- */
SCREENS.subjects = function () {
  return `<div class="topbar"><div class="h1 silvertx">Subjects</div></div>` + SUBJ.map(subjTile).join('');
};
function openSubject(id) { state.subj = id; go('subject'); }
SCREENS.subject = function () {
  const s = subjOf(state.subj), chs = chaptersOf(s.id), mk = mistakes(s.id).length;
  let h = `<div class="topbar"><button class="link" onclick="go('subjects')">‹ Back</button><div class="muted">${s.hi}</div></div>
    <div class="h1">${s.ic} ${s.name}</div>
    <div class="row" style="margin-top:14px">
      <button class="btn sm" onclick="startMixed('${s.id}',45,'test')" ${chs.length ? '' : 'disabled'}>📝 Subject test</button>
      <button class="btn gh sm" onclick="startList(mistakes('${s.id}'),'${s.name} — mistakes','practice')">🎯 Mistakes (${mk})</button></div>`;
  if (!chs.length) return h + `<div class="empty">📄 Is subject ka content abhi nahi aaya.<br>PDF bhejo — har chapter yahan aa jayega.</div>`;
  let cls = null;
  chs.forEach(function (c) {
    if (c.cls !== cls) { cls = c.cls; h += `<div class="sec">Class ${cls || '—'}</div>`; }
    const sm = summary(allGids([c]));
    const rv = Object.keys(revised()[c.id] || {}).length, np = (c.points || []).length;
    h += `<div class="tile" onclick="openChapter('${c.id}')">${ring(sm.total ? sm.seen / sm.total : 0, sm.seen ? pct(sm.acc) : (c.no || '•'), 44)}
      <div class="g1"><div class="n">${c.no ? c.no + '. ' : ''}${esc(c.title)}</div>
      <div class="s">${sm.total} Qs · ${sm.seen} done · ${rv}/${np} points revised${sm.wrong ? ' · <span style="color:var(--bad)">' + sm.wrong + ' galat</span>' : ''}</div></div><div class="ch">›</div></div>`;
  });
  return h;
};

/* ---------- Chapter ---------- */
function openChapter(id) { state.cid = id; state.subj = chOf(id).subj; state.chTab = 'qs'; go('chapter'); }
SCREENS.chapter = function () {
  const c = chOf(state.cid), gids = allGids([c]), sm = summary(gids), pos = load('neet_pos', {})[c.id] || 0;
  const mk = mistakes().filter(g => QIDX[g].c.id === c.id), bm = bookmarks().filter(g => QIDX[g].c.id === c.id);
  let h = `<div class="topbar"><button class="link" onclick="openSubject('${c.subj}')">‹ ${subjOf(c.subj).name}</button>
    <span class="tag g">Class ${c.cls || '—'}${c.no ? ' · Ch ' + c.no : ''}</span></div>
    <div class="h1">${esc(c.title)}</div>${c.src ? `<div class="muted" style="margin-top:4px">${esc(c.src)}</div>` : ''}
    <div class="stats"><div class="stat"><b>${sm.seen}/${sm.total}</b><span>Done</span></div>
      <div class="stat"><b class="goldtx">${pct(sm.acc)}</b><span>Accuracy</span></div>
      <div class="stat"><b>${(c.points || []).length}</b><span>Points</span></div></div>
    <div style="margin-top:14px"><button class="btn" onclick="startChapter('${c.id}')">${pos > 0 && pos < gids.length ? '▶ Continue practice (Q' + (pos + 1) + ')' : '▶ Practice shuru karo'}</button></div>
    <div class="row" style="margin-top:9px">
      <button class="btn gh sm" onclick="startList(shuffle(allGids([chOf('${c.id}')])).slice(0,45),'${jsq(c.title)} — test','test')">📝 Chapter test</button>
      <button class="btn gh sm" onclick="startList(shuffle(allGids([chOf('${c.id}')])),'${jsq(c.title)} — random','practice')">🔀 Random</button></div>
    <div class="row" style="margin-top:9px">
      <button class="btn gh sm" onclick="startList(mistakes().filter(g=>QIDX[g].c.id==='${c.id}'),'${jsq(c.title)} — mistakes','practice')" ${mk.length ? '' : 'disabled'}>🎯 Galtiyan (${mk.length})</button>
      <button class="btn gh sm" onclick="startList(bookmarks().filter(g=>QIDX[g].c.id==='${c.id}'),'${jsq(c.title)} — bookmarks','practice')" ${bm.length ? '' : 'disabled'}>⭐ Saved (${bm.length})</button></div>`;

  h += `<div class="sec">Har point · revision <span>${Object.keys(revised()[c.id] || {}).length}/${(c.points || []).length} revised</span></div>`;
  const rv = revised()[c.id] || {}, s = qstats();
  let topic = null;
  h += '<div class="card" style="padding:4px 14px">';
  (c.points || []).forEach(function (p, i) {
    if (p.topic && p.topic !== topic) { topic = p.topic; h += `<div style="font-family:Montserrat;font-weight:800;font-size:12px;color:var(--gold);padding-top:12px">${esc(topic)}</div>`; }
    const qs = (c.qs || []).filter(q => (q.p || []).indexOf(p.id) >= 0);
    let att = 0, cor = 0; qs.forEach(q => { const r = s[gid(c, q)]; if (r) { att += r[0]; cor += r[1]; } });
    const acc = att ? cor / att : null;
    h += `<div class="pt-row"><div class="chk ${rv[p.id] ? 'on' : ''}" onclick="toggleRev('${c.id}','${p.id}')">✓</div>
      <div class="t">${p.t}<div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap">
      <span class="tag">${qs.length} Q</span>${acc == null ? '' : `<span class="tag ${acc >= .7 ? 'ok' : 'bad'}">${pct(acc)}</span>`}
      ${qs.length ? `<span class="tag g" style="cursor:pointer" onclick="startList(${JSON.stringify(qs.map(q => gid(c, q))).replace(/"/g, "'")},'Point ${i + 1}','practice')">▶ Practice</span>` : ''}</div></div></div>`;
  });
  h += '</div>';
  return h;
};
function jsq(t) { return String(t).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;'); }

/* ---------- Tests ---------- */
SCREENS.tests = function () {
  const hist = load('neet_hist', []).slice().reverse();
  let h = `<div class="topbar"><div class="h1 silvertx">Tests</div></div>
    <div class="card" style="border-color:rgba(230,185,74,.45)"><div style="display:flex;gap:12px;align-items:center">
      <div style="font-size:30px">🏆</div><div style="flex:1"><div class="mont" style="font-weight:800;font-size:16px">Full NEET Mock</div>
      <div class="muted">180 Q · 45 per subject · 180 min · +4 / −1</div></div></div>
      <button class="btn" style="margin-top:12px" onclick="startMock()">Mock shuru karo</button></div>
    <div class="sec">Subject test <span>45 Q · 45 min</span></div><div class="grid2">` +
    SUBJ.map(s => `<div class="qa" onclick="startMixed('${s.id}',45,'test')"><div class="e">${s.ic}</div><div class="n">${s.name}</div><div class="s">${allGids(chaptersOf(s.id)).length} Qs available</div></div>`).join('') +
    `</div><div class="sec">Test history <span>${hist.length}</span></div>`;
  if (!hist.length) h += '<div class="empty">Abhi koi test nahi diya.</div>';
  hist.slice(0, 30).forEach(function (t) {
    h += `<div class="tile" style="cursor:default"><div class="ic mont" style="font-size:13px;font-weight:800">${Math.round(t.score / Math.max(1, t.max) * 100)}%</div>
      <div class="g1"><div class="n">${esc(t.title)}</div><div class="s">${t.date} · ${t.score}/${t.max} · ✓${t.c} ✗${t.w} –${t.u} · ${fmtTime(t.dur)}</div></div></div>`;
  });
  return h;
};

/* ---------- Progress ---------- */
SCREENS.progress = function () {
  const s = qstats(), days = load('neet_days', {});
  let h = `<div class="topbar"><div class="h1 silvertx">Progress</div></div>`;
  // last 14 days activity
  let bars = '', mx = 1; const arr = [];
  for (let i = 13; i >= 0; i--) { const d = new Date(Date.now() - i * 86400000); const n = days[dkey(d)] || 0; arr.push([d, n]); mx = Math.max(mx, n); }
  arr.forEach(function (x) {
    bars += `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px"><div style="width:100%;height:70px;display:flex;align-items:flex-end">
      <div style="width:100%;height:${Math.max(3, x[1] / mx * 70)}px;border-radius:4px;background:${x[1] ? 'var(--goldG)' : 'var(--surface2)'}"></div></div>
      <div style="font-size:9.5px;color:var(--soft);font-weight:700">${x[0].getDate()}</div></div>`;
  });
  h += `<div class="card"><div class="muted">Pichhle 14 din · roz kitne questions</div><div style="display:flex;gap:4px;margin-top:10px">${bars}</div></div>`;
  h += `<div class="sec">Subject-wise</div>`;
  SUBJ.forEach(function (sb) {
    const sm = summary(allGids(chaptersOf(sb.id)));
    h += `<div class="tile" onclick="openSubject('${sb.id}')">${ring(sm.acc || 0, pct(sm.acc), 48, sm.acc == null ? 'var(--surface2)' : sm.acc >= .7 ? 'var(--ok)' : sm.acc >= .5 ? 'var(--gold)' : 'var(--bad)')}
      <div class="g1"><div class="n">${sb.ic} ${sb.name}</div><div class="s">${sm.seen}/${sm.total} done · ${sm.wrong} galat pending</div>
      <div class="bar"><i style="width:${sm.total ? sm.seen / sm.total * 100 : 0}%"></i></div></div></div>`;
  });
  // weak chapters
  const weak = CHS.map(c => ({ c: c, sm: summary(allGids([c])) })).filter(x => x.sm.acc != null).sort((a, b) => a.sm.acc - b.sm.acc).slice(0, 6);
  h += `<div class="sec">Kamzor chapters <span>sabse kam accuracy</span></div>`;
  if (!weak.length) h += '<div class="empty">Practice karo — phir yahan dikhega kahan mehnat chahiye.</div>';
  weak.forEach(x => {
    h += `<div class="tile" onclick="openChapter('${x.c.id}')"><div class="ic">${subjOf(x.c.subj).ic}</div><div class="g1"><div class="n">${esc(x.c.title)}</div>
      <div class="s">Accuracy <b style="color:${x.sm.acc >= .7 ? 'var(--ok)' : 'var(--bad)'}">${pct(x.sm.acc)}</b> · ${x.sm.wrong} galat</div></div><div class="ch">›</div></div>`;
  });
  return h;
};

/* ---------- More / settings ---------- */
SCREENS.more = function () {
  const st = settings();
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  let h = `<div class="topbar"><div class="h1 silvertx">More</div></div>`;
  if (!standalone) {
    h += `<div class="card" style="border-color:rgba(230,185,74,.45)"><div class="mont" style="font-weight:800">📲 Phone mein install karo</div>
      <div class="muted" style="margin-top:4px;line-height:1.5">${deferredInstall ? 'Ek tap — app home screen par aa jayega.' : 'Chrome: ⋮ menu → "Add to Home screen" / "Install app".<br>iPhone Safari: Share ⬆️ → "Add to Home Screen".'}</div>
      ${deferredInstall ? '<button class="btn" style="margin-top:10px" onclick="doInstall()">Install NEET</button>' : ''}</div>`;
  }
  h += `<div class="tile" onclick="go('about')"><div class="ic">ℹ️</div><div class="g1"><div class="n">NEET exam kaisa hota hai?</div>
      <div class="s">Pattern, marking, question types, tips</div></div><div class="ch">›</div></div>
    <div class="sec">Naam <span>app isi naam se bulayega</span></div><div class="row"><input class="txt" id="nm" value="${esc(st.name)}" placeholder="Apna naam"><button class="btn sm" style="flex:0 0 90px" onclick="const v=document.getElementById('nm').value.trim();if(v){setSetting('name',v);toast('Naam save ho gaya');say('hello')}">Save</button></div>
    <div class="sec">Awaaz 🔊 <span>sahi / galat bol kar batana</span></div>
    <div class="seg"><button class="${st.voice ? 'on' : ''}" onclick="setSetting('voice',true)">🔊 On</button><button class="${!st.voice ? 'on' : ''}" onclick="shutup();setSetting('voice',false)">🔇 Off</button></div>
    <div class="seg" style="margin-top:8px"><button class="${st.vlang === 'hi' ? 'on' : ''}" onclick="setSetting('vlang','hi')">हिन्दी में बोले</button><button class="${st.vlang === 'en' ? 'on' : ''}" onclick="setSetting('vlang','en')">English</button></div>
    <div class="seg" style="margin-top:8px">${[['slow', 'Dheere'], ['normal', 'Normal'], ['fast', 'Tez']].map(x => `<button class="${st.vspeed === x[0] ? 'on' : ''}" onclick="setSetting('vspeed','${x[0]}')">${x[1]}</button>`).join('')}</div>
    <div class="seg" style="margin-top:8px"><button class="${st.vexpl ? 'on' : ''}" onclick="setSetting('vexpl',!settings().vexpl)">${st.vexpl ? '✓ ' : ''}Jawab ke baad explanation bhi bolo</button></div>
    <button class="btn gh sm" style="margin-top:8px" onclick="soundTest()">🔊 Awaaz test karo</button>
    <div class="sec">Roz ka target <span>questions / day</span></div><div class="seg">` +
    [30, 50, 100, 150, 200].map(n => `<button class="${st.goal === n ? 'on' : ''}" onclick="setSetting('goal',${n})">${n}</button>`).join('') + `</div>
    <div class="sec">Medium</div><div class="seg">
      <button class="${st.lang === 'en' ? 'on' : ''}" onclick="setSetting('lang','en')">English</button>
      <button class="${st.lang === 'hi' ? 'on' : ''}" onclick="setSetting('lang','hi')">हिन्दी</button></div>
    <div class="muted" style="margin-top:6px">Hindi sirf un questions mein dikhega jinka Hindi version add hua hai; baaki English mein.</div>
    <div class="sec">Theme</div><div class="seg">
      <button class="${st.theme === 'dark' ? 'on' : ''}" onclick="setSetting('theme','dark')">🌙 Dark</button>
      <button class="${st.theme === 'light' ? 'on' : ''}" onclick="setSetting('theme','light')">🪞 Silver</button></div>
    <div class="sec">Backup <span>phone badalne par progress na jaye</span></div>
    <div class="row"><button class="btn gh sm" onclick="exportData()">⬇️ Backup file</button><button class="btn gh sm" onclick="document.getElementById('imp').click()">⬆️ Restore</button></div>
    <input type="file" id="imp" accept="application/json,.json" style="display:none" onchange="importData(this.files[0])">
    <div class="sec">Content</div><div class="card" style="font-size:13px;line-height:1.6;color:var(--ink2)">
      ${CHS.length} chapters · ${Object.keys(QIDX).length} questions · ${CHS.reduce((n, c) => n + (c.points || []).length, 0)} points<br>
      Marking: +4 sahi, −1 galat, 0 chhoda (NEET pattern)</div>
    <button class="btn gh sm" style="margin-top:22px;color:var(--bad)" onclick="resetAll()">Saari progress mitao</button>
    <div style="text-align:center;margin-top:18px"><button class="link" style="font-size:12.5px" onclick="appRefresh()">🔄 NEET ${APP_VER} · Refresh</button></div>`;
  return h;
};
SCREENS.about = function () {
  const row = (a, b) => `<div class="pt-row" style="align-items:center"><div class="t" style="color:var(--ink2)">${a}</div><div class="mont" style="font-weight:800;text-align:right">${b}</div></div>`;
  const ex = (t, d) => `<div class="pt-row"><div class="t"><b class="goldtx">${t}</b><div style="color:var(--ink2);font-size:13.5px;margin-top:3px">${d}</div></div></div>`;
  return `<div class="topbar"><button class="link" onclick="go('more')">‹ Back</button><div class="muted">NEET (UG) · NTA</div></div>
    <div class="h1">NEET exam kaisa hota hai</div>
    <div class="sec">Pattern</div><div class="card" style="padding:4px 14px">
      ${row('Kaun leta hai', 'NTA')}${row('Mode', 'Pen-paper (OMR)')}${row('Total questions', '180 (sab compulsory)')}
      ${row('Time', '3 ghante (180 min)')}${row('Total marks', '720')}${row('Physics', '45 Q · 180')}${row('Chemistry', '45 Q · 180')}
      ${row('Biology (Botany + Zoology)', '90 Q · 360')}${row('Syllabus', 'NCERT Class 11 + 12')}${row('Medium', 'English, Hindi + 11 aur')}</div>
    <div class="sec">Marking</div><div class="card" style="padding:4px 14px">
      ${row('Sahi jawab', '<span style="color:var(--ok)">+4</span>')}${row('Galat jawab', '<span style="color:var(--bad)">−1</span>')}${row('Chhoda (unattempted)', '0')}</div>
    <div class="card" style="margin-top:9px;font-size:13.5px;line-height:1.55;color:var(--ink2)">💡 Galat jawab par 1 number katta hai — pakka na ho to tukka mat lagao. 2 options pakka hata sako tabhi guess karo.</div>
    <div class="sec">Question types (app mein sab hain)</div><div class="card" style="padding:4px 14px">
      ${ex('1. Simple MCQ', 'Ek sawaal, 4 options, ek sahi.')}
      ${ex('2. Assertion – Reason', 'Do kathan A aur R: dono sahi/galat, aur kya R, A ko explain karta hai.')}
      ${ex('3. Statement I / Statement II', 'Do statements — kaun sahi, kaun galat.')}
      ${ex('4. Match the following', 'List I ko List II se milao — options codes mein (A-III, B-I …).')}
      ${ex('5. Kitne statements sahi hain', 'A, B, C, D statements — kitne / kaunse sahi hain.')}
      ${ex('6. Diagram / graph based', 'Figure dekh kar jawab.')}</div>
    <div class="sec">App mein kaise padhein</div><div class="card" style="font-size:13.5px;line-height:1.65;color:var(--ink2)">
      1️⃣ Chapter kholo → <b>Practice</b>: har sawaal ka turant jawab + explanation + NCERT point.<br>
      2️⃣ Chapter ke <b>points</b> tick karo — revision ho gaya.<br>
      3️⃣ <b>Chapter test</b> — time + NEET marking.<br>
      4️⃣ <b>Galtiyan</b> roz dobara karo — sahi hone par list se hat jaati hain.<br>
      5️⃣ Har hafte <b>Subject test</b>, mahine mein <b>Full Mock</b> (180 Q / 3 ghante).<br>
      6️⃣ Mock mein ~1 min per question; Biology jaldi karke Physics ke liye time bachao.</div>
    <div class="muted" style="margin:14px 2px;line-height:1.5">Exam date, form aur official rules ke liye har saal NTA ka information bulletin (neet.nta.nic.in) zaroor dekhein.</div>`;
};
/* cache aur service worker saaf karke naya version load — progress (localStorage) safe rehti hai */
async function appRefresh() {
  if (!confirm('App ka naya version laayein? (Progress safe rahega)')) return;
  toast('Naya version aa raha hai…');
  try {
    if (window.caches) { const ks = await caches.keys(); for (const k of ks) await caches.delete(k); }
    if (navigator.serviceWorker) { const rs = await navigator.serviceWorker.getRegistrations(); for (const r of rs) await r.unregister(); }
  } catch (e) {}
  location.reload();
}
function doInstall() { if (!deferredInstall) return; deferredInstall.prompt(); deferredInstall.userChoice.finally(() => { deferredInstall = null; render(); }); }
function exportData() {
  const o = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.indexOf('neet_') === 0) o[k] = localStorage.getItem(k); }
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(o)], { type: 'application/json' }));
  a.download = 'neet-backup-' + todayKey() + '.json'; a.click();
}
function importData(f) {
  if (!f) return; const r = new FileReader();
  r.onload = function () {
    try { const o = JSON.parse(r.result); Object.keys(o).forEach(k => { if (k.indexOf('neet_') === 0) localStorage.setItem(k, o[k]); }); applyTheme(); toast('Progress restore ho gayi ✅'); go('home'); }
    catch (e) { alert('Ye backup file sahi nahi hai.'); }
  };
  r.readAsText(f);
}
function resetAll() {
  if (!confirm('Saari progress, galtiyan, bookmarks aur test history mit jayegi. Pakka?')) return;
  Object.keys(localStorage).filter(k => k.indexOf('neet_') === 0 && k !== 'neet_set').forEach(k => localStorage.removeItem(k));
  go('home');
}

/* ================= sessions (practice / test / review) ================= */
/* RUN = {mode, title, items:[gid], i, ans:[idx|null], rev:[bool], done:[bool](practice), tq:[sec], start, end, ret} */
function newRun(items, title, mode) {
  items = items.filter(g => QIDX[g]);
  if (!items.length) { toast('Yahan abhi koi question nahi hai'); return null; }
  const n = items.length;
  return { mode: mode, title: title, items: items, i: 0, ans: Array(n).fill(null), rev: Array(n).fill(false),
    done: Array(n).fill(false), tq: Array(n).fill(0), start: Date.now(), qt0: Date.now(),
    end: mode === 'test' ? Date.now() + n * 60000 : null, ret: { screen: state.screen, subj: state.subj, cid: state.cid } };
}
function startList(items, title, mode) {
  if (load('neet_run', null) && mode === 'test' && !confirm('Ek test adhoora pada hai. Naya shuru karne par wo hat jayega. Chalega?')) return;
  const r = newRun(items, title, mode); if (!r) return;
  RUN = r; if (mode === 'test') saveRun(); go('run');
}
function startChapter(cid) {
  const c = chOf(cid), items = allGids([c]);
  const r = newRun(items, c.title, 'practice'); if (!r) return;
  r.chapterSeq = cid; r.i = Math.min(load('neet_pos', {})[cid] || 0, items.length - 1);
  if (r.i >= items.length - 1 && r.i > 0 && summary(items).seen === items.length) r.i = 0;
  RUN = r; go('run');
}
function startMixed(sid, n, mode) {
  const chs = sid ? chaptersOf(sid) : CHS;
  const items = shuffle(allGids(chs)).slice(0, n);
  const s = sid ? subjOf(sid) : null;
  startList(items, (s ? s.name : 'Mixed') + (mode === 'test' ? ' test' : ' · Quick ' + n), mode || 'practice');
}
function startMock() {
  let items = [];
  SUBJ.forEach(s => { items = items.concat(shuffle(allGids(chaptersOf(s.id))).slice(0, s.neet || 45)); });
  if (items.length < 180 && !confirm('Abhi sirf ' + items.length + ' questions available hain (full mock 180 ka hota hai). Inhi se test dein?')) return;
  startList(items, 'NEET Mock', 'test');
}
function saveRun() { if (RUN && RUN.mode === 'test') save('neet_run', RUN); }
function resumeRun() {
  const r = load('neet_run', null); if (!r) return;
  r.items = r.items.filter(g => QIDX[g]); if (!r.items.length) { localStorage.removeItem('neet_run'); return render(); }
  RUN = r; RUN.qt0 = Date.now();
  if (Date.now() >= RUN.end) return submitTest(true);
  go('run');
}
function leaveQ() { if (!RUN) return; RUN.tq[RUN.i] = (RUN.tq[RUN.i] || 0) + (Date.now() - RUN.qt0) / 1000; RUN.qt0 = Date.now(); }
function goQ(i) { if (!RUN) return; leaveQ(); RUN.i = Math.max(0, Math.min(RUN.items.length - 1, i)); state.sheet = null; saveRun(); render(); window.scrollTo(0, 0); }
function quitRun() {
  // review se back -> result par wapas, parent run ke saath
  if (RUN && RUN.mode === 'review' && RUN.parent) { RUN = RUN.parent; return go('result'); }
  if (state.screen !== 'result' && RUN.mode === 'test') {
    if (!confirm('Test chhod rahe ho? Baad mein Home se resume kar sakte ho.')) return;
    leaveQ(); saveRun();
  }
  const ret = RUN.ret || { screen: 'home' };
  RUN = null; state.subj = ret.subj; state.cid = ret.cid; go(ret.screen === 'run' ? 'home' : ret.screen);
}

function pick(k) {
  const i = RUN.i, g = RUN.items[i];
  if (RUN.mode === 'practice') {
    if (RUN.done[i]) return;
    RUN.ans[i] = k; RUN.done[i] = true;
    const q = QIDX[g].q, ok = q.a === k, wasWrong = (qstats()[g] || [0, 0, 1])[2] === 0;
    recordAnswer(g, ok);
    RUN.combo = ok ? (RUN.combo || 0) + 1 : 0;
    if (!ok) say('bad', { k: q.a + 1 });
    else if (wasWrong) say('fixed');
    else if (RUN.combo >= 5 && RUN.combo % 5 === 0) say('combo', { c: RUN.combo });
    else say('ok');
    if (settings().vexpl) setTimeout(function () { if (settings().voice) readExplAfter(); }, 2600);
    if (RUN.chapterSeq) { const p = load('neet_pos', {}); p[RUN.chapterSeq] = i + 1; save('neet_pos', p); }
    render();
    if (navigator.vibrate) navigator.vibrate(ok ? 15 : [30, 40, 30]);
    const ex = document.getElementById('expl'); if (ex) ex.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else if (RUN.mode === 'test') {
    RUN.ans[i] = RUN.ans[i] === k ? null : k; saveRun(); render();
  }
}
function readExplAfter() {
  // feedback line khatam hone ke baad explanation padho
  if (HAS_TTS && !hasBridge() && speechSynthesis.speaking) return setTimeout(readExplAfter, 400);
  if (state.screen === 'run' && RUN && RUN.mode === 'practice' && RUN.done[RUN.i]) readExpl();
}
function clearAns() { RUN.ans[RUN.i] = null; saveRun(); render(); }
function markNext() { RUN.rev[RUN.i] = !RUN.rev[RUN.i]; if (RUN.rev[RUN.i] && RUN.i < RUN.items.length - 1) goQ(RUN.i + 1); else { saveRun(); render(); } }
function nextQ() {
  if (RUN.i < RUN.items.length - 1) return goQ(RUN.i + 1);
  if (RUN.mode === 'test') return state.sheet = paletteSheet, render();
  if (RUN.mode === 'practice') return finishPractice();
  quitRun();
}
function testTick() {
  const el = document.getElementById('timer'); if (!RUN || !el) return;
  const left = (RUN.end - Date.now()) / 1000;
  el.textContent = '⏱ ' + fmtTime(left); el.classList.toggle('low', left < 300);
  if (left <= 0) { clearInterval(TICK); submitTest(true); }
}

SCREENS.run = function () {
  if (!RUN) return SCREENS.home();
  const i = RUN.i, n = RUN.items.length, g = RUN.items[i], ent = QIDX[g], q = ent.q, c = ent.c;
  const opts = optsOf(q), mode = RUN.mode, sel = RUN.ans[i];
  const shown = mode === 'review' || (mode === 'practice' && RUN.done[i]);
  const isBm = load('neet_bm', []).indexOf(g) >= 0;
  let h = `<div class="topbar"><button class="iconbtn" onclick="quitRun()">✕</button>
    <div style="flex:1;min-width:0;text-align:center"><div class="mont" style="font-weight:800;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(RUN.title)}</div>
    <div class="bar" style="margin-top:6px"><i style="width:${(i + 1) / n * 100}%"></i></div></div>
    ${mode === 'test' ? '<div class="timer" id="timer">⏱</div>' : `<button class="iconbtn ${isBm ? 'on' : ''}" onclick="toggleBm('${g}')">${isBm ? '★' : '☆'}</button>`}</div>`;

  h += `<div class="card"><div class="qhead"><div class="qno">Q ${i + 1} / ${n}</div><div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">
    <span class="tag">${subjOf(c.subj).name}</span>${q.pyq ? `<span class="tag g">${esc(q.pyq)}</span>` : ''}
    ${mode === 'test' ? `<button class="tag" style="border:none;cursor:pointer" onclick="toggleBm('${g}')">${isBm ? '★' : '☆'}</button>` : ''}
    <button class="tag" style="border:none;cursor:pointer" onclick="readQuestion()" title="Sawaal suno">🔊</button></div></div>
    <div class="qtext">${qHTML(q)}</div></div><div style="margin-top:12px">`;

  opts.forEach(function (o, k) {
    let cls = '';
    if (shown) { if (k === q.a) cls = 'ok'; else if (k === sel) cls = 'bad'; }
    else if (k === sel) cls = 'sel';
    h += `<button class="opt ${cls}" ${shown ? 'disabled' : ''} onclick="pick(${k})"><span class="k">${k + 1}</span><span>${o}</span></button>`;
  });
  h += '</div>';

  if (shown) {
    const ok = sel === q.a, v = V(q);
    const head = sel == null ? '<span style="color:var(--soft)">Chhoda tha · sahi jawab (' + (q.a + 1) + ')</span>'
      : ok ? '<span style="color:var(--ok)">✓ Sahi jawab! +4</span>' : '<span style="color:var(--bad)">✗ Galat · sahi jawab (' + (q.a + 1) + ')</span>';
    const pts = (q.p || []).map(p => pointText(c, p)).filter(Boolean);
    h += `<div class="expl" id="expl"><div class="h" style="display:flex;justify-content:space-between;align-items:center;gap:8px">${head}<button class="tag" style="border:none;cursor:pointer;flex:0 0 auto" onclick="readExpl()">🔊 Suno</button></div>${v.e || ''}
      ${pts.length ? '<div class="pt">📌 <b>Point:</b> ' + pts.join('<br>📌 ') + '</div>' : ''}
      <div class="pt" style="font-size:11.5px">${esc(c.title)}${c.src ? ' · ' + esc(c.src) : ''}</div></div>`;
  }

  if (mode === 'test') {
    h += `<div class="row" style="margin-top:14px"><button class="btn gh sm" onclick="clearAns()">Clear</button>
      <button class="btn gh sm" style="color:var(--rev)" onclick="markNext()">${RUN.rev[i] ? '✓ Marked' : 'Mark for review'}</button></div>
      <div class="row" style="margin-top:9px"><button class="btn gh sm" onclick="goQ(${i - 1})" ${i ? '' : 'disabled'}>‹ Prev</button>
      <button class="btn gh sm" onclick="state.sheet=paletteSheet;render()">▦ ${RUN.ans.filter(x => x != null).length}/${n}</button>
      <button class="btn sm" onclick="nextQ()">${i < n - 1 ? 'Save & Next' : 'Submit'}</button></div>`;
  } else {
    h += `<div class="row" style="margin-top:14px"><button class="btn gh sm" onclick="goQ(${i - 1})" ${i ? '' : 'disabled'}>‹ Prev</button>
      <button class="btn sm" onclick="nextQ()" ${mode === 'practice' && !RUN.done[i] ? 'style="opacity:.55"' : ''}>${i < n - 1 ? 'Next ›' : mode === 'practice' ? 'Finish ✓' : 'Done'}</button></div>`;
  }
  return h;
};

function paletteSheet() {
  const n = RUN.items.length;
  const ans = RUN.ans.filter(x => x != null).length, rv = RUN.rev.filter(Boolean).length;
  let b = '';
  for (let k = 0; k < n; k++) {
    let cls = '';
    if (RUN.mode === 'review') cls = RUN.ans[k] == null ? '' : RUN.ans[k] === QIDX[RUN.items[k]].q.a ? 'a' : 'v';
    else cls = RUN.rev[k] ? (RUN.ans[k] != null ? 'ar' : 'r') : RUN.ans[k] != null ? 'a' : (RUN.tq[k] > 0 ? 'v' : '');
    b += `<button class="${cls} ${k === RUN.i ? 'cur' : ''}" onclick="goQ(${k})">${k + 1}</button>`;
  }
  return `<div class="sheet" onclick="if(event.target===this){state.sheet=null;render()}"><div class="in">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div class="mont" style="font-weight:800">Question palette</div>
    <button class="link" onclick="state.sheet=null;render()">Close</button></div>
    <div class="pal">${b}</div>
    <div class="legend"><span><i style="background:var(--ok)"></i>Answered ${ans}</span><span><i style="background:var(--rev)"></i>Review ${rv}</span>
    <span><i style="border:1px solid var(--bad)"></i>Dekha, jawab nahi</span><span><i style="background:var(--surface2);border:1px solid var(--line)"></i>Not visited</span></div>
    ${RUN.mode === 'test' ? `<button class="btn" style="margin-top:16px" onclick="submitTest()">Submit test (${ans}/${n} answered)</button>` : ''}</div></div>`;
}

function scoreOf(run) {
  let c = 0, w = 0, u = 0; const bySubj = {};
  run.items.forEach(function (g, k) {
    const e = QIDX[g]; if (!e) return; const sid = e.c.subj;
    const b = bySubj[sid] = bySubj[sid] || { c: 0, w: 0, u: 0, n: 0 }; b.n++;
    if (run.ans[k] == null) { u++; b.u++; } else if (run.ans[k] === e.q.a) { c++; b.c++; } else { w++; b.w++; }
  });
  return { c: c, w: w, u: u, score: c * 4 - w, max: run.items.length * 4, bySubj: bySubj };
}
function submitTest(auto) {
  if (!RUN) return;
  if (!auto) {
    const un = RUN.ans.filter(x => x == null).length;
    if (!confirm(un ? un + ' questions abhi chhode hue hain. Submit karein?' : 'Test submit karein?')) return;
  }
  leaveQ(); clearInterval(TICK);
  RUN.items.forEach((g, k) => { if (RUN.ans[k] != null) recordAnswer(g, RUN.ans[k] === QIDX[g].q.a); });
  RUN.finished = Date.now();
  const sc = scoreOf(RUN), d = new Date();
  const hist = load('neet_hist', []);
  hist.push({ title: RUN.title, date: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(), score: sc.score, max: sc.max,
    c: sc.c, w: sc.w, u: sc.u, dur: Math.round((Math.min(RUN.finished, RUN.end) - RUN.start) / 1000) });
  save('neet_hist', hist.slice(-100));
  localStorage.removeItem('neet_run');
  if (auto) toast('Time khatam — test submit ho gaya');
  go('result');
}
function finishPractice() {
  leaveQ(); RUN.finished = Date.now();
  RUN.items.forEach((g, k) => { if (!RUN.done[k]) RUN.ans[k] = null; });
  go('result');
}

SCREENS.result = function () {
  if (!RUN) return SCREENS.home();
  const sc = scoreOf(RUN), n = RUN.items.length, att = sc.c + sc.w;
  const dur = ((RUN.finished || Date.now()) - RUN.start) / 1000;
  const isTest = RUN.mode === 'test';
  const p = sc.max ? Math.max(0, sc.score) / sc.max : 0;
  if (!RUN.spoken) { RUN.spoken = true; setTimeout(function () { isTest ? say('test', { s: sc.score, m: sc.max, c: sc.c, w: sc.w, u: sc.u }) : say('prac', { c: sc.c, t: att }); }, 300); }
  const msg = p >= .85 ? 'Zabardast! 🏆' : p >= .65 ? 'Bahut badhiya! 💪' : p >= .4 ? 'Achha hai — aur practice! 📚' : 'Galtiyon se seekho — dobara karo 🎯';
  let h = `<div class="topbar"><button class="link" onclick="quitRun()">‹ Back</button><div class="muted">${esc(RUN.title)}</div></div>
    <div class="hero" style="text-align:center"><div class="lbl">${isTest ? 'NEET score' : 'Practice score'}</div>
    <div class="big goldtx" style="font-size:52px;margin-top:6px">${sc.score}<span style="font-size:20px;-webkit-text-fill-color:var(--heroSoft)"> / ${sc.max}</span></div>
    <div style="margin-top:8px;font-weight:700;color:var(--heroInk)">${msg}</div></div>
    <div class="stats"><div class="stat"><b style="color:var(--ok)">${sc.c}</b><span>Sahi (+${sc.c * 4})</span></div>
      <div class="stat"><b style="color:var(--bad)">${sc.w}</b><span>Galat (−${sc.w})</span></div>
      <div class="stat"><b>${sc.u}</b><span>Chhode</span></div></div>
    <div class="stats"><div class="stat"><b class="goldtx">${att ? pct(sc.c / att) : '—'}</b><span>Accuracy</span></div>
      <div class="stat"><b>${fmtTime(dur)}</b><span>Time</span></div>
      <div class="stat"><b>${att ? Math.round(dur / att) + 's' : '—'}</b><span>Per question</span></div></div>`;
  const subs = Object.keys(sc.bySubj);
  if (subs.length > 1) {
    h += `<div class="sec">Subject-wise</div><div class="card" style="padding:6px 14px">` + subs.map(sid => {
      const b = sc.bySubj[sid];
      return `<div class="pt-row" style="align-items:center"><div class="t"><b>${subjOf(sid).ic} ${subjOf(sid).name}</b><div class="muted">✓${b.c} ✗${b.w} –${b.u} of ${b.n}</div></div>
        <div class="mont goldtx" style="font-weight:800;font-size:18px">${b.c * 4 - b.w}/${b.n * 4}</div></div>`;
    }).join('') + '</div>';
  }
  h += `<div style="margin-top:16px"><button class="btn" onclick="reviewRun(false)">Saare answers dekho</button></div>
    <div class="row" style="margin-top:9px"><button class="btn gh sm" onclick="reviewRun(true)" ${sc.w + sc.u ? '' : 'disabled'}>✗ Sirf galat / chhode (${sc.w + sc.u})</button>
    <button class="btn gh sm" onclick="retryRun()">↻ Dobara</button></div>`;
  return h;
};
function reviewRun(onlyWrong) {
  const r = RUN; let idx = r.items.map((_, k) => k);
  if (onlyWrong) idx = idx.filter(k => r.ans[k] == null || r.ans[k] !== QIDX[r.items[k]].q.a);
  if (!idx.length) return;
  RUN = { mode: 'review', title: (onlyWrong ? 'Galat · ' : 'Review · ') + r.title, items: idx.map(k => r.items[k]), ans: idx.map(k => r.ans[k]),
    rev: idx.map(() => false), done: idx.map(() => true), tq: idx.map(() => 0), i: 0, start: Date.now(), qt0: Date.now(), ret: { screen: 'result' }, parent: r };
  go('run');
}
function retryRun() {
  const r = RUN.parent || RUN;
  const nr = newRun(r.mode === 'test' ? shuffle(r.items) : r.items, r.title, r.mode); if (!nr) return;
  nr.ret = r.ret; RUN = nr; if (nr.mode === 'test') saveRun(); go('run');
}
/* ================= boot ================= */
window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredInstall = e; if (state.screen === 'more') render(); });
window.addEventListener('appinstalled', function () { deferredInstall = null; toast('NEET install ho gaya ✅'); });
window.addEventListener('pagehide', function () { if (RUN && RUN.mode === 'test') { leaveQ(); saveRun(); } });
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
}
applyTheme();
render();
