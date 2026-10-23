import { slider, readout, button, fmtN } from './ui.js';
import { progress } from '../state.js';

// Player states how confident they are the result is significant at alpha; scored by Brier.
// result: { p, text } where text explains the test. view: html showing the data.
export function sigBetRound({ prompt, view, result, alpha = 0.05, hint = '' }) {
  const sig = result.p < alpha;
  return {
    engine: 'SIGNIFICANCE BET',
    render(el, finish) {
      let conf = 50;
      el.innerHTML = `<p class="prompt">${prompt}</p><div class="stage">${view}</div>${hint ? `<p class="muted">${hint}</p>` : ''}
        ${slider('g', { min: 0, max: 100, step: 1, value: 50 })}${readout('v', `How likely is it that p < ${alpha}?`, '50', '%')}<div class="row">${button('lock', 'Place bet')}</div>`;
      const s = el.querySelector('#g'); s.oninput = () => { conf = +s.value; el.querySelector('#v').textContent = conf; };
      el.querySelector('#lock').onclick = () => {
        s.disabled = true; el.querySelector('#lock').disabled = true;
        const pr = conf / 100;
        const score = Math.round(100 * (1 - (pr - (sig ? 1 : 0)) ** 2));
        progress.recordBet(pr, sig);
        finish({ score, html: `<b>${sig ? 'Significant' : 'Not significant'}</b> at α = ${alpha}: ${S_fmtP(result.p)}. ${result.text}<br><span class="muted">You bet ${conf}%. Betting is scored by the Brier rule, so honest uncertainty beats bluffing.</span>` });
      };
    },
  };
}
const S_fmtP = (p) => (p < 0.001 ? 'p < 0.001' : `p = ${fmtN(p, 3)}`);
