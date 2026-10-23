import { scatter } from '../charts.js';
import * as S from '../stats.js';
import { closeness, slider, readout, button, fmtN } from './ui.js';

export function corrRound({ prompt = 'Guess the correlation coefficient <b>r</b> of this scatter plot.', xs, ys, tolerance = 0.25, rank = false }) {
  const truth = rank ? spearman(xs, ys) : S.pearson(xs, ys);
  return {
    engine: 'CORRELATION GUESS',
    render(el, finish) {
      let g = 0;
      el.innerHTML = `<p class="prompt">${prompt}</p><div class="stage">${scatter(xs, ys)}</div>${slider('g', { min: -1, max: 1, step: 0.01, value: 0 })}${readout('v', 'Your r', '0')}<div class="row">${button('lock', 'Lock it in')}</div>`;
      const s = el.querySelector('#g'); s.oninput = () => { g = +s.value; el.querySelector('#v').textContent = fmtN(g); };
      el.querySelector('#lock').onclick = () => {
        s.disabled = true; el.querySelector('#lock').disabled = true;
        const fit = S.linreg(xs, ys);
        el.querySelector('.stage').innerHTML = scatter(xs, ys, { line: fit });
        finish({ score: closeness(g, truth, tolerance), html: `You said <b>${fmtN(g)}</b>; the true ${rank ? 'Spearman ρ' : 'Pearson r'} is <b>${fmtN(truth)}</b>. The fitted line is drawn; r² = ${fmtN(truth * truth)} of the variation in y is explained by x.` });
      };
    },
  };
}
export function spearman(xs, ys) {
  const rk = (a) => { const s = [...a].map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]); const r = []; s.forEach(([, i], k) => { r[i] = k + 1; }); return r; };
  return S.pearson(rk(xs), rk(ys));
}
