// Player progress persisted in localStorage. Everything degrades gracefully if storage is blocked.
const KEY = 'statsfun.progress.v1';
const blank = () => ({ xp: 0, streak: 0, best: {}, completed: {} });
let state = blank();
try { state = { ...blank(), ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { /* ignore */ }

function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } }

export const progress = {
  get xp() { return state.xp; },
  get streak() { return state.streak; },
  stars(levelId) { return state.best[levelId] || 0; },
  addXp(n) { state.xp += n; save(); },
  hit() { state.streak += 1; save(); },
  miss() { state.streak = 0; save(); },
  finish(levelId, stars) {
    state.best[levelId] = Math.max(state.best[levelId] || 0, stars);
    state.completed[levelId] = true; save();
  },
};
