import { histogram, dotPlot } from '../charts.js';
import * as S from '../stats.js';
import { closeness, slider, readout, button, fmtN } from './ui.js';

// Draw repeated samples from a population, watch the sampling distribution build, then answer a question about it.
// population: array; stat: fn(sample) -> number; question: {prompt, truth, tolerance, min, max, unit, explain}
export function samplerRound({ prompt, population, sampleSize, stat = S.mean, statName = 'sample mean', question, minDraws = 50, popLabel = 'Population' }) {
  const plo = Math.min(...population), phi = Math.max(...population);
  return {
    engine: 'SAMPLER',
    render(el, finish) {
      const stats = [];
      el.innerHTML = `<p class="prompt">${prompt}</p>
        <div class="two"><div><div class="muted">${popLabel} (N = ${population.length}, mean ${fmtN(S.mean(population))}, SD ${fmtN(S.sd(population, false))})</div><div id="pop"></div></div>
        <div><div class="muted" id="cnt">Distribution of the ${statName} (n = ${sampleSize}): 0 samples</div><div id="dist"></div></div></div>
        <div class="row">${button('d1', 'Draw 1 sample', 'ghost')}${button('d10', 'Draw 10', 'ghost')}${button('d100', 'Draw 100')}<span class="muted">Draw at least ${minDraws} to unlock the question.</span></div>
        <div id="q" class="hidden"><p class="prompt">${question.prompt}</p>${slider('g', { min: question.min, max: question.max, step: (question.max - question.min) / 200, value: (question.min + question.max) / 2 })}${readout('v', 'Your answer', fmtN((question.min + question.max) / 2), question.unit || '')}<div class="row">${button('lock', 'Lock it in')}</div></div>`;
      el.querySelector('#pop').innerHTML = histogram(population, { domain: [plo, phi], bins: 20, height: 180 });
      const paint = (last) => {
        el.querySelector('#cnt').textContent = `Distribution of the ${statName} (n = ${sampleSize}): ${stats.length} samples` + (stats.length > 1 ? `, SD of ${statName}s = ${fmtN(S.sd(stats))}` : '');
        el.querySelector('#dist').innerHTML = stats.length ? histogram(stats, { domain: [plo, phi], bins: 40, height: 180, lines: last == null ? [] : [{ v: last, cls: 'guess' }] }) : '';
        if (stats.length >= minDraws) el.querySelector('#q').classList.remove('hidden');
      };
      const draw = (k) => { let last; for (let i = 0; i < k; i++) { const smp = Array.from({ length: sampleSize }, () => S.choice(population)); last = stat(smp); stats.push(last); } paint(last); };
      el.querySelector('#d1').onclick = () => draw(1); el.querySelector('#d10').onclick = () => draw(10); el.querySelector('#d100').onclick = () => draw(100);
      let g = (question.min + question.max) / 2;
      const s = el.querySelector('#g'); s.oninput = () => { g = +s.value; el.querySelector('#v').textContent = fmtN(g); };
      el.querySelector('#lock').onclick = () => {
        s.disabled = true; el.querySelector('#lock').disabled = true;
        const truth = typeof question.truth === 'function' ? question.truth(stats) : question.truth;
        const ex = typeof question.explain === 'function' ? question.explain(stats, truth) : question.explain;
        finish({ score: closeness(g, truth, question.tolerance), html: `You said <b>${fmtN(g)}${question.unit || ''}</b>; the answer is <b>${fmtN(truth)}${question.unit || ''}</b>. ${ex || ''}` });
      };
    },
  };
}
