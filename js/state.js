// Player progress persisted in localStorage. Degrades gracefully if storage is blocked.
const KEY = 'statsfun.progress.v2';
const blank = () => ({
  xp: 0, streak: 0, dayStreak: 0, lastDay: null, best: {}, bestScore: {}, plays: {}, history: {},
  badges: {}, engines: {}, freeRoam: false, bets: [],
});
let state = blank();
try { state = { ...blank(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { /* ignore */ }
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } }

const today = () => new Date().toISOString().slice(0, 10);
export function touchDay() {
  const t = today();
  if (state.lastDay === t) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  state.dayStreak = state.lastDay === y ? state.dayStreak + 1 : 1;
  state.lastDay = t; save();
}

export const progress = {
  get xp() { return state.xp; },
  get streak() { return state.streak; },
  get dayStreak() { return state.dayStreak; },
  get freeRoam() { return state.freeRoam; },
  set freeRoam(v) { state.freeRoam = !!v; save(); },
  stars(id) { return state.best[id] || 0; },
  bestScore(id) { return state.bestScore[id] || 0; },
  plays(id) { return state.plays[id] || 0; },
  history(id) { return state.history[id] || []; },
  addXp(n) { state.xp += Math.max(0, Math.round(n)); save(); },
  hit() { state.streak += 1; save(); },
  miss() { state.streak = 0; save(); },
  engineUsed(e) { state.engines[e] = true; save(); },
  get enginesUsed() { return Object.keys(state.engines); },
  recordBet(prob, outcome) { state.bets.push([prob, outcome ? 1 : 0]); if (state.bets.length > 200) state.bets.shift(); save(); },
  get bets() { return state.bets; },
  finish(id, stars, score) {
    const h = state.history[id] || []; h.push(stars); state.history[id] = h.slice(-10);
    state.best[id] = Math.max(state.best[id] || 0, stars);
    state.bestScore[id] = Math.max(state.bestScore[id] || 0, score);
    state.plays[id] = (state.plays[id] || 0) + 1; save();
  },
  award(badge) { if (state.badges[badge]) return false; state.badges[badge] = today(); save(); return true; },
  hasBadge(b) { return !!state.badges[b]; },
  get badgeList() { return state.badges; },
  completedCount(ids) { return ids.filter((id) => state.best[id] > 0).length; },
  reset() { state = blank(); save(); },
};
