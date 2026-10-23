// Small SVG chart helpers. Each returns an SVG string.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function niceTicks(lo, hi, n = 6) {
  const span = hi - lo || 1;
  const step0 = span / n;
  const mag = 10 ** Math.floor(Math.log10(step0));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0);
  const ticks = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi + 1e-9; t += step) ticks.push(+t.toFixed(10));
  return ticks;
}

// Dot plot: stacks identical (rounded) values vertically.
export function dotPlot(data, { width = 680, height = 220, guess = null, truth = null, truthLabel = '', guessLabel = '', domain = null } = {}) {
  const pad = { l: 24, r: 24, t: 20, b: 36 };
  const lo = domain ? domain[0] : Math.min(...data);
  const hi = domain ? domain[1] : Math.max(...data);
  const x = (v) => pad.l + ((v - lo) / (hi - lo || 1)) * (width - pad.l - pad.r);
  const counts = new Map();
  const r = Math.max(4, Math.min(9, (width - pad.l - pad.r) / (hi - lo + 1) / 2.2));
  const dots = [...data].sort((a, b) => a - b).map((v) => {
    const k = Math.round(v * 2) / 2;
    const c = counts.get(k) || 0; counts.set(k, c + 1);
    return `<circle class="dot" cx="${x(v).toFixed(1)}" cy="${(height - pad.b - r - c * (2 * r + 1)).toFixed(1)}" r="${r}"/>`;
  }).join('');
  const ticks = niceTicks(lo, hi).map((t) =>
    `<line class="axis" x1="${x(t)}" x2="${x(t)}" y1="${height - pad.b}" y2="${height - pad.b + 5}"/><text class="tick" x="${x(t)}" y="${height - pad.b + 18}" text-anchor="middle">${t}</text>`).join('');
  const line = (v, cls, label, y) => v == null ? '' :
    `<line class="${cls}" x1="${x(v)}" x2="${x(v)}" y1="${pad.t}" y2="${height - pad.b}"/>` +
    (label ? `<text class="label" x="${x(v)}" y="${y}" text-anchor="middle" fill="currentColor">${esc(label)}</text>` : '');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Dot plot of ${data.length} values">
    <line class="axis" x1="${pad.l}" x2="${width - pad.r}" y1="${height - pad.b}" y2="${height - pad.b}"/>
    ${ticks}${dots}${line(truth, 'truth', truthLabel, pad.t - 6)}${line(guess, 'guess', guessLabel, pad.t - 6)}
  </svg>`;
}
