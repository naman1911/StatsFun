import { WORLDS, BOSSES, CONCEPTS } from './data/curriculum.js';
import { progress } from './state.js';
import { runLevel } from './runner.js';
import { genericLevel, genericRounds } from './rounds.js';
import { bespoke } from './levels.js';
import { badgeCatalogue } from './badges.js';
import { esc } from './charts.js';
import { shuffle } from './stats.js';

const app = document.getElementById('app');
const EMOJI = { w1: '🏝️', w2: '🗼', w3: '🌊', w4: '🎡', w5: '🔔', w6: '⛵', w7: '⚖️', w8: '🧗', w9: '🚢', w10: '🏔️', w11: '🪸' };
const md = (s) => esc((s || '').replace(/\*\*/g, '')).replace(/\*(.+?)\*/g, '<i>$1</i>');

function hud() {
  document.getElementById('hud-xp').textContent = `⭐ ${Math.round(progress.xp)} XP`;
  document.getElementById('hud-streak').textContent = `🔥 ${progress.streak}`;
  document.getElementById('hud-day').textContent = `📅 ${progress.dayStreak}d`;
}

// ---------- progression rules
const worldStars = (w) => w.concepts.reduce((s, c) => s + progress.stars(c.id), 0);
const worldDone = (w) => progress.completedCount(w.concepts.map((c) => c.id));
function worldUnlocked(idx) {
  if (progress.freeRoam || idx === 0) return true;
  const prev = WORLDS[idx - 1];
  return worldDone(prev) >= Math.ceil(prev.concepts.length * 0.5);
}
function levelUnlocked(w, k) {
  if (progress.freeRoam || k === 0) return true;
  return progress.stars(w.concepts[k - 1].id) > 0;
}
const bossUnlocked = (b) => progress.freeRoam || worldDone(WORLDS[b.afterWorld - 1]) >= Math.ceil(WORLDS[b.afterWorld - 1].concepts.length * 0.5);

// ---------- rounds for a concept: bespoke engine rounds first, then generic checks on the text
function roundsFor(c) {
  const b = bespoke[c.id];
  if (b) {
    try {
      const r = b(c);
      return [...r, genericRounds.trap(c)];
    } catch (e) { console.error('bespoke level failed, using generic', c.id, e); }
  }
  return genericLevel(c);
}

// ---------- pages
function home() {
  const totalLevels = WORLDS.reduce((n, w) => n + w.concepts.length, 0);
  const done = WORLDS.reduce((n, w) => n + worldDone(w), 0);
  app.innerHTML = `
    <section class="hero pop"><h1>Learn statistics by playing.</h1>
      <p>${totalLevels} concepts across ${WORLDS.length} worlds, ${BOSSES.length} boss levels. Short lessons, then games on freshly generated data.</p>
      <p class="muted">${done} / ${totalLevels} levels cleared · <a href="#/badges">badges</a> · <a href="#/settings">settings</a></p></section>
    <section class="grid">${WORLDS.map((w, i) => {
      const open = worldUnlocked(i);
      return `<a class="card world ${open ? '' : 'locked'}" href="${open ? `#/world/${w.id}` : '#/'}">
        <span class="tag">${open ? `${worldStars(w)}/${w.concepts.length * 3} ★` : '🔒'}</span>
        <div class="emoji">${EMOJI[w.id]}</div><h3>${w.num}. ${esc(w.name)}</h3><p>${esc(w.tier)} · ${w.concepts.length} levels</p>
        <p class="theme">${md(w.theme)}</p></a>`; }).join('')}</section>
    <h2 class="sect">Boss levels</h2>
    <section class="grid">${BOSSES.map((b) => bossCard(b)).join('')}</section>`;
}
function bossCard(b) {
  const open = bossUnlocked(b);
  return `<a class="card world boss ${open ? '' : 'locked'}" href="${open ? `#/boss/${b.id}` : '#/'}"><span class="tag">${open ? ('★'.repeat(progress.stars(b.id)) || 'Fight') : '🔒'}</span>
    <div class="emoji">👑</div><h3>${b.id} ${esc(b.title)}</h3><p>${esc(b.placement)} · ${esc(b.tier)}</p></a>`;
}

function world(id) {
  const w = WORLDS.find((x) => x.id === id); const idx = WORLDS.indexOf(w);
  if (!w || !worldUnlocked(idx)) return home();
  app.innerHTML = `<section class="whead pop"><a class="back" href="#/">← Map</a><h1>${EMOJI[w.id]} ${esc(w.name)}</h1><p class="muted">${md(w.theme)}</p>
    <p>${worldDone(w)} / ${w.concepts.length} cleared · ${worldStars(w)} / ${w.concepts.length * 3} stars</p></section>
    <section class="levels">${w.concepts.map((c, k) => {
      const open = levelUnlocked(w, k); const st = progress.stars(c.id);
      return `<a class="lvl card ${open ? '' : 'locked'}" href="${open ? `#/level/${c.id}` : `#/world/${w.id}`}">
        <span class="num">${k + 1}</span><span class="info"><b>${esc(c.title)}</b><span class="muted">${esc(c.gameName)} · ${esc(c.engine)}${bespoke[c.id] ? '' : ' · concept check'} · ${esc(c.tier)}</span></span>
        <span class="st">${open ? '★'.repeat(st) + '☆'.repeat(3 - st) : '🔒'}</span></a>`; }).join('')}</section>
    ${BOSSES.filter((b) => b.afterWorld === w.num).length ? `<h2 class="sect">Boss</h2><section class="grid">${BOSSES.filter((b) => b.afterWorld === w.num).map(bossCard).join('')}</section>` : ''}`;
}

function lessonCard(c) {
  return `<details class="lesson" open><summary><b>${esc(c.name)}</b> <span class="muted">· lesson</span></summary>
    <p>${md(c.definition)}</p>
    ${c.formula && c.formula !== '—' ? `<p><b>How:</b> ${md(c.formula)}</p>` : ''}
    <p><b>Also called:</b> ${md(c.synonyms)}</p>
    <p><b>Watch out:</b> ${md(c.misconception)}</p>
    <p><b>In the wild:</b> ${md(c.example)}</p></details>`;
}

function level(id) {
  const c = CONCEPTS[id]; if (!c) return home();
  const w = WORLDS.find((x) => x.id === c.world);
  app.innerHTML = `<section class="level card pop"><a class="back" href="#/world/${w.id}">← ${esc(w.name)}</a>
    <h2>${esc(c.title)}</h2><p class="muted">Game: <b>${esc(c.gameName)}</b> · ${esc(c.goal)}</p>${lessonCard(c)}
    ${c.prereqs.length ? `<p class="muted">Builds on: ${c.prereqs.map((p) => CONCEPTS[p] ? `<a href="#/level/${p}">${esc(CONCEPTS[p].name)}</a>` : p).join(', ')}</p>` : ''}
    <div class="row"><button id="play">Play</button><span class="muted">Best: ${'★'.repeat(progress.stars(id)) || 'not yet played'}</span></div></section>`;
  document.getElementById('play').onclick = () => runLevel(app, { id, title: c.gameName, rounds: roundsFor(c), lesson: lessonCard(c), onExit: `#/world/${w.id}` }, hud);
}

function boss(id) {
  const b = BOSSES.find((x) => x.id === id); if (!b || !bossUnlocked(b)) return home();
  const concepts = b.concepts.map((cid) => CONCEPTS[cid]).filter(Boolean);
  app.innerHTML = `<section class="level card pop"><a class="back" href="#/">← Map</a><h2>👑 ${esc(b.title)}</h2>
    <p>${md(b.scenario)}</p><p class="muted"><b>Mechanic:</b> ${md(b.mechanic)}</p><p class="muted"><b>Win:</b> ${md(b.win)}</p>
    <p class="muted">Draws on: ${concepts.map((c) => `<a href="#/level/${c.id}">${esc(c.name)}</a>`).join(', ')}</p>
    <div class="row"><button id="play">Fight (3× XP)</button><span class="muted">Best: ${'★'.repeat(progress.stars(id)) || 'unbeaten'}</span></div></section>`;
  document.getElementById('play').onclick = () => {
    const picks = shuffle(concepts).slice(0, 8);
    const rounds = picks.flatMap((c) => { const r = bespoke[c.id] ? (() => { try { return bespoke[c.id](c); } catch { return []; } })() : []; return r.length ? [r[Math.floor(Math.random() * r.length)]] : [genericRounds[['definition', 'trap', 'example'][Math.floor(Math.random() * 3)]](c)]; });
    runLevel(app, { id, title: b.title, rounds, xpMult: 3, onExit: '#/' }, hud);
  };
}

function badges() {
  const cat = badgeCatalogue();
  app.innerHTML = `<section class="whead pop"><a class="back" href="#/">← Map</a><h1>🏅 Badges</h1><p class="muted">${cat.filter((b) => b.earned).length} earned. Greyed badges are not yet wired to a game.</p></section>
    <section class="grid">${cat.map((b) => `<div class="card badge-card ${b.earned ? 'earned' : ''} ${b.implemented ? '' : 'locked'}"><h3>${b.earned ? '🏅' : '🔘'} ${esc(b.name)}${b.name === 'Islander' && b.earned ? ` ×${b.earned}` : ''}</h3><p class="muted">${esc(b.condition)}</p></div>`).join('')}</section>`;
}

function settings() {
  app.innerHTML = `<section class="level card pop"><a class="back" href="#/">← Map</a><h2>Settings</h2>
    <label class="row"><input type="checkbox" id="roam" ${progress.freeRoam ? 'checked' : ''}/> Free roam: unlock every world and level</label>
    <p class="muted">Progress is stored in this browser only.</p>
    <div class="row"><button class="ghost" id="reset">Reset all progress</button></div></section>`;
  document.getElementById('roam').onchange = (e) => { progress.freeRoam = e.target.checked; };
  document.getElementById('reset').onclick = () => { if (confirm('Erase all progress?')) { progress.reset(); hud(); home(); } };
}

function route() {
  const h = location.hash || '#/';
  window.scrollTo(0, 0);
  const [, page, arg] = h.split('/');
  if (page === 'world') return world(arg);
  if (page === 'level') return level(arg);
  if (page === 'boss') return boss(arg);
  if (page === 'badges') return badges();
  if (page === 'settings') return settings();
  home();
}
window.addEventListener('hashchange', route);
hud(); route();
