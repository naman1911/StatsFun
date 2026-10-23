import { lineChart } from '../charts.js';
import { closeness, slider, readout, button, fmtN } from './ui.js';

// State a probability/expected value, then watch a simulation converge.
// trial(): returns a number (1/0 for events, or a value); truth: the theoretical value.
export function predictRound({ prompt, truth, tolerance, trial, trials = 2000, min = 0, max = 1, step = 0.01, unit = '', explain = '', view = '', label = 'Running average' }) {
  return {
    engine: 'PROBABILITY PREDICT-THEN-SIMULATE',
    render(el, finish) {
      let g = +((min + max) / 2).toFixed(4);
      el.innerHTML = `<p class="prompt">${prompt}</p>${view ? `<div class="stage">${view}</div>` : ''}${slider('g', { min, max, step, value: g })}${readout('v', 'Your prediction', fmtN(g, 3), unit)}<div class="row">${button('lock', 'Predict, then simulate')}</div><div class="stage sim"></div>`;
      const s = el.querySelector('#g'); s.oninput = () => { g = +s.value; el.querySelector('#v').textContent = fmtN(g, 3); };
      el.querySelector('#lock').onclick = () => {
        s.disabled = true; el.querySelector('#lock').disabled = true;
        const sim = el.querySelector('.sim');
        const ys = []; let acc = 0, k = 0;
        const stepSim = () => {
          const batch = Math.max(1, Math.floor(trials / 60));
          for (let i = 0; i < batch && k < trials; i++) { acc += trial(); k++; ys.push(acc / k); }
          sim.innerHTML = `<div class="muted">${k.toLocaleString()} trials, running value <b>${fmtN(acc / k, 3)}</b></div>` +
            lineChart([{ ys, cls: 'guessline' }], { href: truth, label: `${label}: your guess ${fmtN(g, 3)}, theory ${fmtN(truth, 3)}` , yDomain: [Math.min(min, truth * 0.8), Math.max(max, truth * 1.2)] });
          if (k < trials) requestAnimationFrame(stepSim);
          else finish({ score: closeness(g, truth, tolerance), html: `You predicted <b>${fmtN(g, 3)}${unit}</b>; theory says <b>${fmtN(truth, 3)}${unit}</b> and ${k.toLocaleString()} simulated trials landed at <b>${fmtN(acc / k, 3)}</b>. ${explain}` });
        };
        stepSim();
      };
    },
  };
}
