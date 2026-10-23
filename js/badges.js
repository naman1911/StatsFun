import { WORLDS, BOSSES, BADGES } from './data/curriculum.js';
import { progress } from './state.js';

const ALL_ENGINES = ['ESTIMATE', 'PICK', 'CORRELATION GUESS', 'SIGNIFICANCE BET', 'PROBABILITY PREDICT-THEN-SIMULATE', 'SAMPLER', 'DETECTIVE', 'BUILD'];

// Returns the names of badges earned right now. Only badges that are computable are implemented.
export function checkBadges({ levelId, stars, prevStars }) {
  const earned = [];
  const give = (name) => { if (progress.award(name)) earned.push(name); };
  give('First Steps');
  for (const w of WORLDS) if (w.concepts.every((c) => progress.stars(c.id) === 3)) give(`Islander: ${w.name}`);
  if (progress.dayStreak >= 7) give('Marathon');
  if (progress.dayStreak >= 30) give('Iron Streak');
  if (prevStars === 1 && stars === 3) give('Comeback');
  if (ALL_ENGINES.every((e) => progress.enginesUsed.includes(e))) give('Explorer');
  if (levelId === 'B6' && stars > 0) give('Reviewer');
  if (levelId === 'B9' && stars > 0) give('Senior Reviewer');
  if (levelId === 'B15' && stars === 3) give('Editor-in-Chief');
  const bets = progress.bets;
  if (bets.length >= 20) { const brier = bets.slice(-20).reduce((s, [p, o]) => s + (p - o) ** 2, 0) / 20; if (brier <= 0.15) give('Calibrated Bettor'); }
  const everything = [...WORLDS.flatMap((w) => w.concepts.map((c) => c.id)), ...BOSSES.map((b) => b.id)];
  if (everything.every((id) => progress.stars(id) === 3)) give('Completionist');
  return earned;
}

export function badgeCatalogue() {
  const implemented = new Set(['First Steps', 'Islander', 'Marathon', 'Iron Streak', 'Comeback', 'Explorer', 'Reviewer', 'Senior Reviewer', 'Editor-in-Chief', 'Calibrated Bettor', 'Completionist']);
  return BADGES.map((b) => ({ ...b, implemented: implemented.has(b.name), earned: b.name === 'Islander' ? WORLDS.filter((w) => progress.hasBadge(`Islander: ${w.name}`)).length : progress.hasBadge(b.name) ? 1 : 0 }));
}
