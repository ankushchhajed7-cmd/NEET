# STATE — NEET MCQ Practice App

Yukti ka NEET practice PWA (vanilla JS, GitHub Pages). Har push par ye file update hoti hai.

## Current version
- `app.js` → `APP_VER = 'v1.32'`
- `sw.js` → `CACHE = 'neet-v33'`

## Content (NCERT)
| Subject | Class 11 | Class 12 |
|---|---|---|
| Botany | Ch 1, 2, 3, 5, 6, 8, 10, 11, 12, 13 | Ch 1, 4, 5, 8, 11, 12, 13 |
| Zoology | Ch 4, 7, 9, 14–19 (14–19 grouped as "Human Physiology") | Ch 2, 3, 6, 7, 9, 10 |
| Physics | Ch 1–14 (Class XI complete) | Ch 1–14 (Class XII complete) |
| Chemistry | Ch 1, 2, 5, 6, 7 (Physical) | Ch 1, 2, 3 (Physical) |

Total (v1.30): 68 chapters · 3989 points · 9073 questions.

## Version history (recent)
- **v1.32** — (1) **Galat jawab → revision:** practice mein galat jawab par usi point ke 2 sawaal turant agle aate hain (🔁 Revision tag); point kam sawaal wala ho to same topic / paas ke points se. Galat point `neet_weak` mein; us point ke 2 sahi jawab (aur koi sawaal galat na bacha) par hatta hai. **🎯 Meri galtiyan** screen: subject filter, weak points list (chapter-wise, kitni baar galat, ▶ Revision), "Weak points ki revision" mix, "Sirf galat sawaal". Chapter ke point par ⚠️ Weak tag. Test result par "🔁 Galat topics ki revision". (2) **♾️ Unlimited practice:** Easy / Medium / Hard alag (q.lvl), subject filter; bank (~9000) se pehle galat, phir naye, phir kam practice wale — kabhi khatam nahi (10-10 karke judte hain). Gemini key ho to har 3rd sawaal ✨ AI: NCERT point text se 4 MCQ (weak points par 50%), validate karke `neet_aiq` mein save (max 600) aur QIDX mein jud jaate hain. Revision bhi usi level ki. ✕ par aaj ka summary.
- **v1.31** — 📷 *Chapter scan karo* (Home): NCERT page ke 1–4 screenshot/photo do (+ optional note ki kya samajh nahi aaya). Same Gemini key (Doubt poocho wali) se mentor-style Hinglish samjhaav live stream hota hai: overview, step-by-step, figure/table, formula + numericals, NEET points, trick, common galtiyan, 5 check-up sawaal. Photo phone par hi 1600px JPEG banti hai. 🔊 Suno aur 💬 'Aage doubt poocho' (samjhaav chat mein chala jaata hai). Last samjhaav `neet_scan` mein save.
- **v1.30** — Physical Chemistry (`data/chem/`): XI Ch 1 *Some Basic Concepts of Chemistry* (46 points, 114 questions, 40 numericals), Ch 2 *Structure of Atom* (60, 134, 35), Ch 5 *Thermodynamics* (48, 111, 28), Ch 6 *Equilibrium* (53, 131, 39), Ch 7 *Redox Reactions* (35, 102, 21); XII Ch 1 *Solutions* (42, 123, 30), Ch 2 *Electrochemistry* (58, 179, 48), Ch 3 *Chemical Kinetics* (49, 143, 48). Total 391 points, 1037 questions, 289 numericals, 57 graph/diagram questions. Covers every section, figure, table, example, intext question, summary and exercises.
- **v1.29** — Physics XII Ch 2 *Electrostatic Potential and Capacitance* (49 points, 111 questions, 29 numericals), Ch 4 *Moving Charges and Magnetism* (44 points, 105 questions, 26 numericals), Ch 12 *Atoms* (31 points, 86 questions, 18 numericals). Physics XI and XII now complete.
- **v1.28** — Physics XII Ch 1, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14 (`data/phy/12-xx.js`): 451 points, 1203 questions, 273 numericals with step-by-step solutions, 140 graph/diagram questions (inline SVG). Covers every section, figure, table, example, summary, points to ponder and exercises. Ch 2, 4 and 12 PDFs not received yet.
- **v1.27** — Physics XI Ch 4 *Laws of Motion* (`data/phy/11-04.js`: 60 points, 133 questions, 44 numericals, 19 graph/diagram) and Ch 10 *Thermal Properties of Matter* (`data/phy/11-10.js`: 61 points, 143 questions, 39 numericals, 18 graph/diagram). Physics Class XI now complete.
- **v1.26** — Physics XI Ch 1, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14 (`data/phy/11-xx.js`): 651 points, 1316 questions, 467 numericals with step-by-step solutions, 157 graph/diagram questions (inline SVG). Covers every section, figure, table, box, summary, points to ponder and exercises. Ch 4 and Ch 10 PDFs not received yet.
- **v1.25** — Physics XI Ch 2 review: all 60 numericals re-solved and correct; q41 (match Fig 2.3 v–t graphs) now shows the four graphs (a)–(d) as inline SVG.
- **v1.24** — Physics XI Ch 2 *Motion in a Straight Line* (`data/phy/11-02.js`): 60 points, 151 questions (60 numericals with step-by-step solutions, 17 graph/diagram questions as inline SVG). App: new `num` question type (🧮 Numerical tag + `sol` steps), `tag` label, `img` styling, `stmts` statements shown as Statement I/II/III.
- **v1.23** — Zoology XII Ch 2 *Human Reproduction* (`data/zoo/12-02.js`): 80 points, 187 questions; covers every section 2.1–2.7, Fig 2.1–2.12 labels, Menstrual Hygiene box and Summary (chapter has no table).
- v1.22 — Zoology XII Ch 3, 6, 7, 9, 10.
- v1.21 — Zoology XI Ch 4, 7, 9.
- v1.20 — Chapter titles pink, bold, pulsing.
- v1.19 — Zoology XI Ch 14–19 grouped under Human Physiology unit.
- v1.18 — Zoology XI Ch 14–19.
- v1.17 / v1.16 / v1.15 — Botany XI and XII chapters.

## Rules / decisions
- One file per chapter: `data/<subj>/<cls>-<no>.js` with `addChapter({...points, qs})`; extra questions via `addQs()`.
- Every point needs ≥ 2 questions: `node tools/check-coverage.js --min 2` must end with "sab theek".
- New file must be added to `index.html` loader list and `sw.js` FILES list; bump `APP_VER` and `CACHE` every release.
- Match options use app codes `A-III, B-I, ...` (app labels List I as A–D, List II as I–IV).
- Correct answers spread over all four options; A-R and Statement I/II use all four answer values.
- Facts only from NCERT text, figures, boxes and summary.
- Physics and Chemistry chapters: NCERT points + Points to Ponder + key Exercises; NEET-style numericals (`type: 'num'`, `sol: [Given, Formula, Substitution, Answer]`), graph/diagram questions via inline SVG in `img` (currentColor + gold #D9A520, no single quotes), plus A-R, Statement, Match, multi-concept questions; easy/medium/hard mix.

## Pending
- With Zoology XII Ch 2, all 19 Class XI and 13 Class XII NCERT Biology chapters (current numbering) are in the app.
- Physics: Class XI and XII complete (Ch 1–14 each). Chemistry: Physical chemistry done (XI Ch 1, 2, 5, 6, 7; XII Ch 1, 2, 3). Inorganic and Organic chapters pending.
