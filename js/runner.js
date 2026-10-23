// Runs a sequence of rounds, shows feedback, awards XP and stars.
import { progress, touchDay } from './state.js';
import { checkBadges } from './badges.js';

export const starsFor = (score) => (score >= 90 ? 3 : score >= 70 ? 2 : score >= 40 ? 1 : 0);

export function runLevel(app, { id, title, rounds, xpMult = 1, lesson = '', onExit = '#/' }, hud) {
  let i = 0, total = 0;
  touchDay();
  const next = () => {
    if (i >= rounds.length) return summary();
    const round = rounds[i];
    progress.engineUsed(round.engine);
    app.innerHTML = `<section class="level card pop">
      <div class="progress">${rounds.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}"></span>`).join('')}</div>
      <div class="lvlhead"><h2>${title}</h2><span class="chip">${round.engine}</span></div>
      ${i === 0 && lesson ? lesson : ''}
      <div id="round"></div><div id="fb"></div></section>`;
    const el = document.getElementById('round');
    let finished = false;
    round.render(el, ({ score, html }) => {
      if (finished) return; finished = true;
      score = Math.max(0, Math.min(100, Math.round(score)));
      total += score;
      if (score >= 70) progress.hit(); else progress.miss();
      progress.addXp(score / 10 * xpMult); hud();
      const cls = score >= 85 ? '' : score >= 50 ? 'meh' : 'bad';
      const word = score >= 85 ? 'Bullseye!' : score >= 50 ? 'Close!' : 'Not quite.';
      document.getElementById('fb').innerHTML = `<div class="feedback ${cls} pop"><div class="big">${word} +${score} pts</div><div>${html}</div>
        <div class="row"><button id="next">${i + 1 < rounds.length ? 'Next round →' : 'See results'}</button></div></div>`;
      document.getElementById('next').onclick = () => { i += 1; next(); };
      document.getElementById('next').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };
  const summary = () => {
    const score = Math.round(total / rounds.length);
    const stars = starsFor(score);
    const prevStars = progress.stars(id);
    progress.finish(id, stars, score);
    progress.addXp(stars * 10 * xpMult);
    const earned = checkBadges({ levelId: id, score, stars, prevStars });
    hud();
    app.innerHTML = `<section class="level card summary pop">
      <h2>${title}</h2><div class="stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
      <p>Score <b>${score}</b> / 100 · +${Math.round(score / 10 * xpMult + stars * 10 * xpMult)} XP${xpMult > 1 ? ` (boss ×${xpMult})` : ''}</p>
      ${earned.length ? `<div class="badges-earned">${earned.map((b) => `<span class="badge new">🏅 ${b}</span>`).join('')}</div>` : ''}
      <p class="muted">${stars === 3 ? 'Flawless. ' : ''}Fresh data every time, so replay to sharpen your eye.</p>
      <div class="row center"><button id="again">Play again</button><a href="${onExit}"><button class="ghost">Back</button></a></div></section>`;
    document.getElementById('again').onclick = () => { i = 0; total = 0; next(); };
  };
  next();
}
