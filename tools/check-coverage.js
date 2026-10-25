#!/usr/bin/env node
/* Content checker — "ek bhi point miss na ho" ki guarantee.
   Chalao:  node tools/check-coverage.js            (sab chapters)
            node tools/check-coverage.js --min 3    (har point par kam se kam 3 question)
   Checks: har point par question hai ya nahi, galat point id, duplicate id,
   answer index, 4 options, explanation, aur sab data files index.html + sw.js mein jude hain ya nahi. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const minIdx = process.argv.indexOf('--min');
const MIN = minIdx > 0 ? +process.argv[minIdx + 1] : 1;

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const scripts = [...html.matchAll(/<script src="(data\/[^"]+)"/g)].map(m => m[1]);

const ctx = { window: {} };
vm.createContext(ctx);
scripts.forEach(f => {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
  if (f === 'data/subjects.js') { ctx.addChapter = ctx.window.addChapter; ctx.addQs = ctx.window.addQs; }
});

let errors = 0, warns = 0;
const err = m => { errors++; console.log('  ✗ ' + m); };
const warn = m => { warns++; console.log('  ! ' + m); };

// every data file on disk must be loaded + cached
function walk(d) { return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]); }
const onDisk = walk(path.join(root, 'data')).filter(f => f.endsWith('.js')).map(f => path.relative(root, f).split(path.sep).join('/'));
console.log('Files');
onDisk.forEach(f => {
  if (scripts.indexOf(f) < 0) err(f + ' index.html mein <script> se nahi juda');
  if (sw.indexOf("'./" + f + "'") < 0) err(f + ' sw.js FILES list mein nahi hai (offline nahi chalega)');
});

const chs = ctx.window.NEET_CH;
const subjIds = ctx.window.NEET_SUBJECTS.map(s => s.id);
const chIds = new Set();
let totQ = 0, totP = 0;
const AUTO = { ar: 1, st: 1 };

chs.forEach(c => {
  console.log('\n' + c.subj + ' · ' + c.id + ' · ' + c.title);
  if (chIds.has(c.id)) err('duplicate chapter id ' + c.id);
  chIds.add(c.id);
  if (subjIds.indexOf(c.subj) < 0) err('unknown subject ' + c.subj);
  const pts = c.points || [], qs = c.qs || [];
  totQ += qs.length; totP += pts.length;
  const pid = new Set(), qid = new Set(), hits = {};
  pts.forEach(p => { if (pid.has(p.id)) err('duplicate point id ' + p.id); pid.add(p.id); hits[p.id] = 0; if (!p.t) err('point ' + p.id + ' ka text khaali'); });
  qs.forEach(q => {
    const tag = 'Q ' + q.id;
    if (qid.has(q.id)) err('duplicate question id ' + q.id);
    qid.add(q.id);
    if (!q.p || !q.p.length) err(tag + ': koi point (p) nahi diya');
    (q.p || []).forEach(p => { if (!pid.has(p)) err(tag + ': point ' + p + ' exist nahi karta'); else hits[p]++; });
    const n = q.o ? q.o.length : (AUTO[q.type] ? 4 : 0);
    if (n !== 4) err(tag + ': 4 options chahiye, mile ' + n);
    if (!(Number.isInteger(q.a) && q.a >= 0 && q.a < n)) err(tag + ': answer index a=' + q.a + ' galat');
    if (!q.e) err(tag + ': explanation (e) nahi hai');
    if (q.type === 'ar' && !(q.ar && q.ar.A && q.ar.R)) err(tag + ': ar.A / ar.R chahiye');
    if (q.type === 'st' && !(q.st && q.st.length === 2)) err(tag + ': st mein 2 statements chahiye');
    if (q.type === 'match' && !(q.match && q.match.l && q.match.r)) err(tag + ': match.l / match.r chahiye');
    if ((q.type === 'mcq' || q.type === 'stmts' || !q.type) && !q.q) err(tag + ': question text (q) nahi hai');
    if (q.o && new Set(q.o).size !== q.o.length) err(tag + ': do options same hain');
  });
  const missing = pts.filter(p => hits[p.id] < MIN);
  missing.forEach(p => (hits[p.id] === 0 ? err : warn)('point ' + p.id + ' par ' + hits[p.id] + ' question (min ' + MIN + '): ' + p.t.slice(0, 80)));
  console.log('  ' + pts.length + ' points · ' + qs.length + ' questions · covered ' + (pts.length - pts.filter(p => !hits[p.id]).length) + '/' + pts.length);
});

console.log('\nTOTAL: ' + chs.length + ' chapters · ' + totP + ' points · ' + totQ + ' questions');
console.log(errors ? '✗ ' + errors + ' errors, ' + warns + ' warnings' : '✓ sab theek' + (warns ? ' (' + warns + ' warnings)' : ''));
process.exit(errors ? 1 : 0);
