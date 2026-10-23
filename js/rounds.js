// Generic rounds generated from the curriculum text itself, so every concept is playable.
import { WORLDS, CONCEPTS } from './data/curriculum.js';
import { pickRound } from './games/pick.js';
import { esc } from './games/ui.js';
import { shuffle } from './stats.js';

const strip = (s) => s.replace(/\*\*/g, '').replace(/`/g, '');
const md = (s) => esc(strip(s || '')).replace(/\*(.+?)\*/g, '<i>$1</i>');

// Distractor pool: other concepts in the same world first, then neighbours.
function others(c, field, k = 3) {
  const w = WORLDS.find((x) => x.id === c.world);
  const wi = WORLDS.indexOf(w);
  const pool = [w, WORLDS[wi - 1], WORLDS[wi + 1]].filter(Boolean).flatMap((x) => x.concepts)
    .filter((o) => o.id !== c.id && o[field] && o[field] !== '—' && o[field] !== c[field]);
  return shuffle(pool).slice(0, k);
}
function fourWay(c, field, prompt, showField, why) {
  const alts = others(c, field);
  const opts = shuffle([{ c, correct: true }, ...alts.map((o) => ({ c: o, correct: false }))]);
  return pickRound({ prompt, layout: 'list', options: opts.map((o) => ({ html: md(o.c[showField]), correct: o.correct, why })) });
}

export const genericRounds = {
  definition: (c) => fourWay(c, 'definition', `Which of these is the definition of <b>${esc(c.name)}</b>?`, 'definition', `<b>${esc(c.name)}:</b> ${md(c.definition)}`),
  term: (c) => fourWay(c, 'definition', `“${md(c.definition)}” <br>Which concept is this?`, 'name', `That is the definition of <b>${esc(c.name)}</b>.`),
  formula: (c) => fourWay(c, 'formula', `Which formula or procedure belongs to <b>${esc(c.name)}</b>?`, 'formula', `<b>${esc(c.name)}:</b> ${md(c.formula)}`),
  trap: (c) => fourWay(c, 'misconception', `Which of these is the classic <b>mistake</b> people make with <b>${esc(c.name)}</b>?`, 'misconception', `The trap: ${md(c.misconception)}`),
  example: (c) => fourWay(c, 'example', `“${md(c.example)}” <br>Which concept is at work here?`, 'name', `This illustrates <b>${esc(c.name)}</b>: ${md(c.definition)}`),
  synonyms: (c) => fourWay(c, 'synonyms', `Which concept goes by these names or symbols?<br><i>${md(c.synonyms)}</i>`, 'name', `<b>${esc(c.name)}</b> is also written as: ${md(c.synonyms)}`),
};

export function genericLevel(c) {
  const r = [genericRounds.definition(c), genericRounds.term(c)];
  if (c.formula && c.formula !== '—' && c.formula.length > 8) r.push(genericRounds.formula(c));
  r.push(genericRounds.trap(c), genericRounds.example(c));
  return r;
}
export const conceptById = (id) => CONCEPTS[id];
