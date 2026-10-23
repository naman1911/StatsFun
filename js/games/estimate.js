import { dotPlot, histogram } from '../charts.js';
import { closeness, slider, readout, button, fmtN, esc } from './ui.js';

// Guess a hidden statistic on a plot with a slider.
export function estimateRound({ prompt, data = null, chart = 'dot', truth, tolerance, domain = null, min, max, step = null, unit = '', explain = '', view = null, revealLines = [], label = '', truthLabel = '', bins = 12 }) {
  const lo = min ?? (domain ? domain[0] : Math.min(...data));
  const hi = max ?? (domain ? domain[1] : Math.max(...data));
  const st = step ?? +((hi - lo) / 200).toPrecision(1);
  const draw = (lines) => data ? (chart === 'hist' ? histogram(data, { lines, domain: domain || [lo, hi], label, bins }) : dotPlot(data, { lines, domain: domain || [lo, hi], label })) : (view || '');
  return {
    engine: 'ESTIMATE',
    render(el, finish) {
      let guess = +((lo + hi) / 2).toFixed(6);
      el.innerHTML = `<p class="prompt">${prompt}</p><div class="stage"></div>${slider('g', { min: lo, max: hi, step: st, value: guess })}
        ${readout('v', 'Your guess', fmtN(guess), unit)}<div class="row">${button('lock', 'Lock it in')}</div>`;
      const stage = el.querySelector('.stage');
      const paint = (t) => { stage.innerHTML = draw([{ v: guess, cls: 'guess' }, ...(t == null ? [] : [{ v: t, cls: 'truth', label: truthLabel || `truth = ${fmtN(t)}${unit}` }, ...revealLines])]); };
      paint(null);
      const s = el.querySelector('#g');
      s.oninput = () => { guess = +s.value; el.querySelector('#v').textContent = fmtN(guess); paint(null); };
      el.querySelector('#lock').onclick = () => {
        s.disabled = true; el.querySelector('#lock').disabled = true; paint(truth);
        const score = closeness(guess, truth, tolerance);
        const ex = typeof explain === 'function' ? explain(truth, data, guess) : explain;
        finish({ score, html: `You said <b>${fmtN(guess)}${unit}</b>; the answer is <b>${fmtN(truth)}${unit}</b>. ${ex}` });
      };
    },
  };
}
