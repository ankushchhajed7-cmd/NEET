# NEET — MCQ Practice App (PWA)

Mobile mein install hone wala NEET preparation app. Gold–silver mirror-finish logo, dark/light theme, poora offline chalta hai.

## Features
- **Chapter-wise practice** — har sawaal ke baad turant sahi/galat, explanation aur NCERT ka wo **point** jis se sawaal bana.
- **Har point ki revision list** — chapter ke saare points, tick karke revise; har point par kitne question, accuracy, aur sirf us point ki practice.
- **NEET pattern tests** — +4 / −1 / 0 marking, timer (1 min per question), question palette, *Mark for review*, beech mein band ho jaye to **resume**.
  - Chapter test (45 Q), Subject test (45 Q · 45 min), **Full NEET Mock** (180 Q · 180 min, 45 per subject).
- **Question types (NEET jaise)** — simple MCQ, Assertion–Reason, Statement I/II, Match List I–II, "How many statements are correct".
- **Mistakes bank** — galat sawaal apne aap jama; sahi karte hi hat jaata hai. **Bookmarks** ⭐.
- **Progress** — roz ka target, streak, 14 din ka graph, subject-wise accuracy, kamzor chapters.
- **Backup / Restore** — phone badalne par progress file se wapas.
- English / हिन्दी medium switch (jahan Hindi version diya ho).
- "NEET exam kaisa hota hai" page — pattern, marking, question types, tips.

## Content abhi tak
| Subject | Chapter | Points | Questions |
|---|---|---|---|
| Botany | Class 12 · Ch 1 — Sexual Reproduction in Flowering Plants | 156 | 383 |

Har point par kam se kam 2 question hain (`node tools/check-coverage.js --min 2`).

## Install (phone)
GitHub Pages par host karo (Settings → Pages → branch `main`, folder `/`). Phir link Chrome mein kholo → ⋮ → **Install app / Add to Home screen**. iPhone Safari: Share → **Add to Home Screen**.

## Naya chapter kaise jode
1. `data/<subj>/<cls>-<no>-points.js` — `addChapter({ id, subj, cls, no, title, src, points: [...], qs: [] })`
   - `subj`: `phy` | `chem` | `bot` | `zoo`
   - `points`: `{ id: 'p1', topic: 'Section', t: 'book ki line / fact' }`
2. `data/<subj>/<cls>-<no>-q1.js` … — `addQs('<chapter id>', [ ...questions ])`
3. Dono files ka `<script>` `index.html` mein aur path `sw.js` ki `FILES` list mein jodo; `sw.js` ka `CACHE` version badhao.
4. `node tools/check-coverage.js --min 2` — har point covered, ids, answers, options sab check.

### Question format
```js
{ id: 'q1', p: ['p1'], type: 'mcq', lvl: 1,          // p = kis point se bana
  q: 'Question text (HTML chalega)', o: ['..','..','..','..'], a: 2,   // a = sahi option index (0-3)
  e: 'Explanation', pyq: 'NEET 2023' /* optional */ }
```
| type | extra fields | options |
|---|---|---|
| `mcq` | `q` | `o` (app shuffle karta hai, fixed seed se) |
| `ar` | `ar: { A, R }` | default 4 NEET options (o dena zaruri nahi) |
| `st` | `st: [I, II]` | default 4 NEET options |
| `match` | `match: { h:[..], l:[..], r:[..] }`, `q` | `o` codes jaise `A-III, B-I, ...` |
| `stmts` | `q`, `s: [...]` | `o` (order fixed rehta hai) |

Hindi: kisi bhi question mein `h: { q, o, e, s, ar, st, match }` jodo.
