# STATE — NEET MCQ Practice App

Yukti ka NEET practice PWA (vanilla JS, GitHub Pages). Har push par ye file update hoti hai.

## Current version
- `app.js` → `APP_VER = 'v1.23'`
- `sw.js` → `CACHE = 'neet-v24'`

## Content (NCERT Biology)
| Subject | Class 11 | Class 12 |
|---|---|---|
| Botany | Ch 1, 2, 3, 5, 6, 8, 10, 11, 12, 13 | Ch 1, 4, 5, 8, 11, 12, 13 |
| Zoology | Ch 4, 7, 9, 14–19 (14–19 grouped as "Human Physiology") | Ch 2, 3, 6, 7, 9, 10 |
| Physics / Chemistry | — | — |

Total (v1.23): 32 chapters · 2241 points · 4788 questions.

## Version history (recent)
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

## Pending
- With Zoology XII Ch 2, all 19 Class XI and 13 Class XII NCERT Biology chapters (current numbering) are in the app.
- Physics and Chemistry not started.
