/* NEET subjects + chapter registry.
   Har chapter ki file (data/<subj>/<file>.js) addChapter({...}) call karti hai.
   Format ke liye README.md dekho. */
window.NEET_SUBJECTS = [
  { id: 'phy',  name: 'Physics',   hi: 'भौतिकी',          ic: '⚛️', neet: 45 },
  { id: 'chem', name: 'Chemistry', hi: 'रसायन विज्ञान',     ic: '🧪', neet: 45 },
  { id: 'bot',  name: 'Botany',    hi: 'वनस्पति विज्ञान',   ic: '🌿', neet: 45 },
  { id: 'zoo',  name: 'Zoology',   hi: 'प्राणी विज्ञान',    ic: '🧬', neet: 45 }
];

window.NEET_CH = [];
window.addChapter = function (c) { window.NEET_CH.push(c); };
/* Bade chapter ke questions alag files mein: addQs('<chapterId>', [...]) */
window.addQs = function (cid, qs) {
  const c = window.NEET_CH.find(function (x) { return x.id === cid; });
  if (c) c.qs = (c.qs || []).concat(qs);
};
