import * as S from './stats.js';
import { dotPlot } from './charts.js';
import { progress } from './state.js';

const app = document.getElementById('app');

// ---------- Worlds shown on the map. Only the warm-up is playable until the full curriculum lands.
const WORLDS = [
  { id: 'foundations', emoji: '🏝️', name: 'Foundations Island', blurb: 'Mean, median, mode, and why they disagree.', open: true },
  { id: 'spread', emoji: '🏔️', name: 'Spread & Shape', blurb: 'Variance, SD, quartiles, skew, z-scores.' },
  { id: 'probability', emoji: '🎲', name: 'Probability Playground', blurb: 'Dice, coins, Bayes, expected value.' },
  { id: 'distributions', emoji: '🔔', name: 'Distribution Dunes', blurb: 'Binomial, normal, Poisson, the CLT.' },
  { id: 'sampling', emoji: '🌊', name: 'Sampling Shores', blurb: 'Standard error, confidence intervals, bias.' },
  { id: 'testing', emoji: '⚓', name: 'Hypothesis Harbor', blurb: 'p-values, t-tests, chi-square, errors.' },
  { id: 'relationships', emoji: '🧗', name: 'Relationship Ridge', blurb: 'Correlation, regression, confounders.' },
  { id: 'research', emoji: '🔬', name: 'Research Realm', blurb: 'Design, power, ANOVA, Bayes, meta-analysis.' },
];

// ---------- Warm-up level: four rounds of "estimate the statistic" on fresh data.
const warmup = {
  id: 'foundations-1',
  title: 'The Balancing Point',
  lesson: 'The <b>mean</b> is the balance point of the data: add everything up and share it out equally. The <b>median</b> is the middle value once the data are sorted. They agree on symmetric data and fight when there are outliers, because the mean gets dragged toward extreme values and the median does not.',
  rounds: [
    { stat: 'mean', gen: () => S.intsNormal(12, 50, 10, 10, 90), text: 'Where is the <b>mean</b> of these 12 test scores?' },
    { stat: 'median', gen: () => S.intsNormal(11, 40, 12, 5, 95), text: 'Where is the <b>median</b> of these 11 reaction times?' },
    { stat: 'mean', gen: () => [...S.intsNormal(9, 30, 5, 15, 45), S.randInt(85, 99)], text: 'One value is far out. Where is the <b>mean</b> now?' },
    { stat: 'median', gen: () => [...S.intsNormal(9, 30, 5, 15, 45), S.randInt(85, 99)], text: 'Same kind of data, one outlier. Where is the <b>median</b>?' },
  ],
};
const STAT_FN = { mean: S.mean, median: S.median };

function hud() {
  document.getElementById('hud-xp').textContent = `⭐ ${progress.xp} XP`;
  document.getElementById('hud-streak').textContent = `🔥 ${progress.streak}`;
}

function home() {
  app.innerHTML = `
    <section class="hero pop">
      <h1>Learn statistics by playing.</h1>
      <p>Short lessons, then games on freshly generated data. From the humble average to the methods researchers argue about.</p>
    </section>
    <section class="grid">
      ${WORLDS.map((w) => `
        <a class="card world ${w.open ? '' : 'locked'}" href="${w.open ? '#/level/foundations-1' : '#'}">
          <span class="tag">${w.open ? (progress.stars('foundations-1') ? '★'.repeat(progress.stars('foundations-1')) : 'Play') : 'Soon'}</span>
          <div class="emoji">${w.emoji}</div>
          <h3>${w.name}</h3>
          <p>${w.blurb}</p>
        </a>`).join('')}
    </section>`;
}

function playLevel(level) {
  let i = 0, total = 0;
  const next = () => {
    if (i >= level.rounds.length) return summary(level, total);
    const round = level.rounds[i];
    const data = round.gen();
    const truth = STAT_FN[round.stat](data);
    const lo = Math.min(...data), hi = Math.max(...data);
    let guess = (lo + hi) / 2;
    app.innerHTML = `
      <section class="level card pop">
        <div class="progress">${level.rounds.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'now' : ''}"></span>`).join('')}</div>
        <h2>${level.title}</h2>
        ${i === 0 ? `<div class="lesson">${level.lesson}</div>` : ''}
        <p class="prompt">${round.text}</p>
        <div id="chart"></div>
        <input id="slider" class="slider" type="range" min="${lo}" max="${hi}" step="0.5" value="${guess}" aria-label="Your guess" />
        <div class="readout"><span>Your guess</span><span class="val" id="val">${guess}</span></div>
        <div class="row"><button id="lock">Lock it in</button><span id="hint" style="color:var(--muted)">Drag the slider onto the ${round.stat}.</span></div>
        <div id="fb"></div>
      </section>`;
    const chart = document.getElementById('chart');
    const draw = (t) => { chart.innerHTML = dotPlot(data, { guess, truth: t, truthLabel: t == null ? '' : `${round.stat} = ${S.fmt(t)}`, domain: [lo, hi] }); };
    draw(null);
    const slider = document.getElementById('slider');
    slider.oninput = () => { guess = +slider.value; document.getElementById('val').textContent = guess; draw(null); };
    document.getElementById('lock').onclick = () => {
      slider.disabled = true; document.getElementById('lock').disabled = true;
      draw(truth);
      const err = Math.abs(guess - truth) / (hi - lo);          // error as a share of the data range
      const pts = Math.max(0, Math.round(100 * (1 - err * 5)));  // 0 pts once you are 20% of the range off
      total += pts;
      if (pts >= 70) progress.hit(); else progress.miss();
      progress.addXp(pts); hud();
      const sorted = [...data].sort((a, b) => a - b).join(', ');
      const explain = round.stat === 'mean'
        ? `Sum ${S.sum(data)} ÷ ${data.length} values = <b>${S.fmt(truth)}</b>.`
        : `Sorted: ${sorted}. The middle ${data.length % 2 ? 'value' : 'two values average to'} <b>${S.fmt(truth)}</b>.`;
      const cls = pts >= 85 ? '' : pts >= 50 ? 'meh' : 'bad';
      const word = pts >= 85 ? 'Bullseye!' : pts >= 50 ? 'Close!' : 'Not quite.';
      document.getElementById('fb').innerHTML = `
        <div class="feedback ${cls} pop">
          <div class="big">${word} +${pts} pts</div>
          <div>You said ${guess}; the ${round.stat} is ${S.fmt(truth)}. ${explain}</div>
          <div class="row"><button id="next">${i + 1 < level.rounds.length ? 'Next round →' : 'See results'}</button></div>
        </div>`;
      document.getElementById('next').onclick = () => { i += 1; next(); };
    };
  };
  next();
}

function summary(level, total) {
  const pct = total / (level.rounds.length * 100);
  const stars = pct >= 0.85 ? 3 : pct >= 0.6 ? 2 : pct >= 0.3 ? 1 : 0;
  progress.finish(level.id, stars); hud();
  app.innerHTML = `
    <section class="level card summary pop">
      <h2>${level.title} complete</h2>
      <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
      <p><b>${total}</b> of ${level.rounds.length * 100} points. ${stars === 3 ? 'Flawless.' : 'Fresh data every time, so replay to improve.'}</p>
      <div class="row" style="justify-content:center">
        <button id="again">Play again</button>
        <a class="ghost" href="#/"><button class="ghost">Back to map</button></a>
      </div>
    </section>`;
  document.getElementById('again').onclick = () => playLevel(level);
}

function route() {
  const h = location.hash || '#/';
  if (h.startsWith('#/level/')) return playLevel(warmup);
  home();
}
window.addEventListener('hashchange', route);
hud(); route();
