# STATE — NEET MCQ Practice App

Yukti ka NEET practice PWA (vanilla JS, GitHub Pages). Har push par ye file update hoti hai.

## Current version
- `app.js` → `APP_VER = 'v1.29'`
- `sw.js` → `CACHE = 'neet-v27'`

## Content (NCERT)
| Subject | Class 11 | Class 12 |
|---|---|---|
| Botany | Ch 1, 2, 3, 5, 6, 8, 10, 11, 12, 13 | Ch 1, 4, 5, 8, 11, 12, 13 |
| Zoology | Ch 4, 7, 9, 14–19 (14–19 grouped as "Human Physiology") | Ch 2, 3, 6, 7, 9, 10 |
| Physics | Ch 1–14 (Class XI complete) | Ch 1–14 (Class XII complete) |
| Chemistry | — | — |

Total (v1.29): 60 chapters · 3598 points · 8036 questions.

## Version history (recent)
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
- Physics chapters: NCERT points + Points to Ponder + key Exercises; NEET-style numericals (`type: 'num'`, `sol: [Given, Formula, Substitution, Answer]`), graph/diagram questions via inline SVG in `img` (currentColor + gold #D9A520, no single quotes), plus A-R, Statement, Match, multi-concept questions; easy/medium/hard mix.

## Pending
- With Zoology XII Ch 2, all 19 Class XI and 13 Class XII NCERT Biology chapters (current numbering) are in the app.
- Physics: Class XI and XII complete (Ch 1–14 each). Chemistry not started.
