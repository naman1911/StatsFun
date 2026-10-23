import { dotPlot } from '../charts.js';
import { closeness, button, fmtN, svgX } from './ui.js';

// Drag dots along a number line until a live statistic hits a target.
// data: starting values; movable: indices that can be dragged (default all); stat(data) -> number; target: value; tolerance
export function buildRound({ prompt, data, movable = null, stat, statName, target, tolerance, domain, explain = '', extra = null }) {
  const vals = [...data];
  const can = movable || vals.map((_, i) => i);
  return {
    engine: 'BUILD',
    render(el, finish) {
      el.innerHTML = `<p class="prompt">${prompt}</p><div class="muted">Drag the highlighted dots. Target: <b>${statName} = ${fmtN(target)}</b></div><div class="stage"></div>
        <div class="readout"><span>Current ${statName}</span><span class="val" id="cur"></span></div>${extra ? `<div class="readout"><span>${extra.name}</span><span class="val" id="ex"></span></div>` : ''}<div class="row">${button('lock', 'Lock it in')}</div>`;
      const stage = el.querySelector('.stage');
      const paint = () => {
        stage.innerHTML = dotPlot(vals, { domain, highlight: can, ids: true, lines: [{ v: target, cls: 'truth', label: `target ${fmtN(target)}` }] });
        el.querySelector('#cur').textContent = fmtN(stat(vals));
        if (extra) el.querySelector('#ex').textContent = fmtN(extra.fn(vals));
      };
      paint();
      let dragging = null;
      const toVal = (ev) => { const svg = stage.querySelector('svg'); const vb = svg.viewBox.baseVal; const px = svgX(svg, ev); const frac = (px - 34) / (vb.width - 34 - 20); return Math.min(domain[1], Math.max(domain[0], domain[0] + frac * (domain[1] - domain[0]))); };
      stage.addEventListener('pointerdown', (ev) => { const t = ev.target; if (t.classList && t.classList.contains('hl')) { dragging = +t.dataset.i; ev.preventDefault(); } });
      window.addEventListener('pointermove', (ev) => { if (dragging == null) return; vals[dragging] = Math.round(toVal(ev) * 2) / 2; paint(); });
      window.addEventListener('pointerup', () => { dragging = null; });
      stage.addEventListener('click', (ev) => { // tap-to-move fallback: moves the nearest movable dot to the tap
        if (ev.target.tagName === 'circle') return;
        const v = toVal(ev); let best = can[0], bd = Infinity;
        for (const i of can) { const d = Math.abs(vals[i] - v); if (d < bd) { bd = d; best = i; } }
        vals[best] = Math.round(v * 2) / 2; paint();
      });
      el.querySelector('#lock').onclick = () => {
        el.querySelector('#lock').disabled = true;
        const got = stat(vals);
        const ex = typeof explain === 'function' ? explain(vals, got) : explain;
        finish({ score: closeness(got, target, tolerance), html: `Your ${statName} is <b>${fmtN(got)}</b> (target ${fmtN(target)}). ${ex}` });
      };
    },
  };
}
