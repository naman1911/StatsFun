// Small SVG chart helpers. Each returns an SVG string. No dependencies.
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function niceTicks(lo, hi, n = 6) {
  const span = hi - lo || 1;
  const step0 = span / n;
  const mag = 10 ** Math.floor(Math.log10(step0));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0);
  const ticks = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi + 1e-9; t += step) ticks.push(+t.toFixed(10));
  return ticks;
}

const PAD = { l: 34, r: 20, t: 22, b: 36 };

function frame(width, height, lo, hi, label = '') {
  const x = (v) => PAD.l + ((v - lo) / (hi - lo || 1)) * (width - PAD.l - PAD.r);
  const ticks = niceTicks(lo, hi).map((t) =>
    `<line class="axis" x1="${x(t)}" x2="${x(t)}" y1="${height - PAD.b}" y2="${height - PAD.b + 5}"/><text class="tick" x="${x(t)}" y="${height - PAD.b + 18}" text-anchor="middle">${t}</text>`).join('');
  const base = `<line class="axis" x1="${PAD.l}" x2="${width - PAD.r}" y1="${height - PAD.b}" y2="${height - PAD.b}"/>${ticks}` +
    (label ? `<text class="tick" x="${(PAD.l + width - PAD.r) / 2}" y="${height - 4}" text-anchor="middle">${esc(label)}</text>` : '');
  return { x, base };
}

// Vertical reference lines: [{v, cls:'truth'|'guess'|'ref', label}]
function vlines(x, lines, height) {
  return (lines || []).filter((l) => l && l.v != null && Number.isFinite(l.v)).map((l, i) =>
    `<line class="${l.cls || 'ref'}" x1="${x(l.v)}" x2="${x(l.v)}" y1="${PAD.t}" y2="${height - PAD.b}"/>` +
    (l.label ? `<text class="label" x="${x(l.v)}" y="${PAD.t - 7 + (i % 2) * 0}" text-anchor="middle" fill="currentColor">${esc(l.label)}</text>` : '')).join('');
}

// Dot plot: stacks identical (rounded) values vertically.
export function dotPlot(data, { width = 680, height = 220, lines = [], domain = null, label = '', highlight = null, ids = false } = {}) {
  const lo = domain ? domain[0] : Math.min(...data);
  const hi = domain ? domain[1] : Math.max(...data);
  const { x, base } = frame(width, height, lo, hi, label);
  const counts = new Map();
  const r = Math.max(4, Math.min(9, (width - PAD.l - PAD.r) / (hi - lo + 1) / 2.2));
  const order = data.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  const dots = order.map(([v, i]) => {
    const k = Math.round(v * 2) / 2;
    const c = counts.get(k) || 0; counts.set(k, c + 1);
    const hl = highlight && highlight.includes(i) ? ' hl' : '';
    return `<circle class="dot${hl}" ${ids ? `data-i="${i}"` : ''} cx="${x(v).toFixed(1)}" cy="${(height - PAD.b - r - c * (2 * r + 1)).toFixed(1)}" r="${r}"/>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Dot plot of ${data.length} values">${base}${dots}${vlines(x, lines, height)}</svg>`;
}

export function binData(data, bins, lo, hi) {
  const w = (hi - lo) / bins;
  const counts = new Array(bins).fill(0);
  for (const v of data) { let b = Math.floor((v - lo) / w); if (b >= bins) b = bins - 1; if (b < 0) b = 0; counts[b]++; }
  return { counts, w };
}

export function histogram(data, { width = 680, height = 240, bins = 12, lines = [], domain = null, label = '', curve = null, density = false } = {}) {
  const lo = domain ? domain[0] : Math.min(...data);
  const hi = domain ? domain[1] : Math.max(...data);
  const { x, base } = frame(width, height, lo, hi, label);
  const { counts, w } = binData(data, bins, lo, hi);
  const n = data.length;
  const vals = density ? counts.map((c) => c / (n * w)) : counts;
  let maxV = Math.max(...vals, 1e-9);
  let curvePts = '';
  if (curve) {
    const pts = [];
    for (let i = 0; i <= 100; i++) { const v = lo + (hi - lo) * i / 100; pts.push([v, curve(v)]); }
    maxV = Math.max(maxV, ...pts.map((p) => p[1]));
    curvePts = pts.map(([v, y]) => `${x(v).toFixed(1)},${(height - PAD.b - (y / maxV) * (height - PAD.t - PAD.b)).toFixed(1)}`).join(' ');
  }
  const y = (v) => height - PAD.b - (v / maxV) * (height - PAD.t - PAD.b);
  const bars = vals.map((v, i) => `<rect class="bar" x="${x(lo + i * w) + 1}" y="${y(v)}" width="${Math.max(1, x(lo + w) - x(lo) - 2)}" height="${height - PAD.b - y(v)}"/>`).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Histogram">${base}${bars}${curvePts ? `<polyline class="curve" points="${curvePts}"/>` : ''}${vlines(x, lines, height)}</svg>`;
}

// Bar chart of categories: [{label, value}]. Handles negative values (baseline at 0).
export function barChart(items, { width = 680, height = 240, highlight = [], ids = false, yLabel = '' } = {}) {
  const maxV = Math.max(0, ...items.map((d) => d.value), 1e-9);
  const minV = Math.min(0, ...items.map((d) => d.value));
  const n = items.length;
  const bw = (width - PAD.l - PAD.r) / n;
  const y = (v) => height - PAD.b - ((v - minV) / (maxV - minV || 1)) * (height - PAD.t - PAD.b);
  const y0 = y(0);
  const bars = items.map((d, i) => {
    const hl = highlight.includes(i) ? ' hl' : '';
    const top = Math.min(y(d.value), y0), h = Math.abs(y(d.value) - y0);
    return `<rect class="bar${hl}" ${ids ? `data-i="${i}"` : ''} x="${PAD.l + i * bw + bw * 0.12}" y="${top}" width="${bw * 0.76}" height="${h}"/>` +
      `<text class="tick" x="${PAD.l + i * bw + bw / 2}" y="${height - PAD.b + 16}" text-anchor="middle">${esc(d.label)}</text>` +
      `<text class="tick" x="${PAD.l + i * bw + bw / 2}" y="${d.value >= 0 ? top - 4 : top + h + 12}" text-anchor="middle">${d.value}</text>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart">
    <line class="axis" x1="${PAD.l}" x2="${width - PAD.r}" y1="${y0}" y2="${y0}"/>${bars}
    ${yLabel ? `<text class="tick" x="${PAD.l}" y="${PAD.t - 8}">${esc(yLabel)}</text>` : ''}</svg>`;
}

export function scatter(xs, ys, { width = 680, height = 300, line = null, lines = [], xLabel = '', yLabel = '', domain = null, range = null, highlight = [], ids = false } = {}) {
  const lo = domain ? domain[0] : Math.min(...xs), hi = domain ? domain[1] : Math.max(...xs);
  const ylo = range ? range[0] : Math.min(...ys), yhi = range ? range[1] : Math.max(...ys);
  const { x, base } = frame(width, height, lo, hi, xLabel);
  const y = (v) => height - PAD.b - ((v - ylo) / (yhi - ylo || 1)) * (height - PAD.t - PAD.b);
  const yt = niceTicks(ylo, yhi, 5).map((t) => `<text class="tick" x="${PAD.l - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text><line class="axis" x1="${PAD.l - 4}" x2="${PAD.l}" y1="${y(t)}" y2="${y(t)}"/>`).join('');
  const pts = xs.map((v, i) => `<circle class="dot${highlight.includes(i) ? ' hl' : ''}" ${ids ? `data-i="${i}"` : ''} cx="${x(v).toFixed(1)}" cy="${y(ys[i]).toFixed(1)}" r="5"/>`).join('');
  const fit = line ? `<line class="fit ${line.cls || ''}" x1="${x(lo)}" y1="${y(line.intercept + line.slope * lo)}" x2="${x(hi)}" y2="${y(line.intercept + line.slope * hi)}"/>` : '';
  const extra = lines.map((l) => `<line class="fit ${l.cls || ''}" x1="${x(lo)}" y1="${y(l.intercept + l.slope * lo)}" x2="${x(hi)}" y2="${y(l.intercept + l.slope * hi)}"/>`).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Scatter plot">
    <line class="axis" x1="${PAD.l}" x2="${PAD.l}" y1="${PAD.t}" y2="${height - PAD.b}"/>${base}${yt}${pts}${fit}${extra}
    ${yLabel ? `<text class="tick" x="${PAD.l + 4}" y="${PAD.t - 6}">${esc(yLabel)}</text>` : ''}</svg>`;
}

// Box plot(s): groups = [{label, data}]
export function boxPlot(groups, { width = 680, height = 200, domain = null, showOutliers = true } = {}) {
  const all = groups.flatMap((g) => g.data);
  const lo = domain ? domain[0] : Math.min(...all), hi = domain ? domain[1] : Math.max(...all);
  const { x, base } = frame(width, height, lo, hi);
  const rowH = (height - PAD.t - PAD.b) / groups.length;
  const q = (a, p) => { const s = [...a].sort((u, v) => u - v); const pos = (s.length - 1) * p, i = Math.floor(pos); return s[i] + (s[Math.min(i + 1, s.length - 1)] - s[i]) * (pos - i); };
  const rows = groups.map((g, gi) => {
    const q1 = q(g.data, 0.25), med = q(g.data, 0.5), q3 = q(g.data, 0.75), iq = q3 - q1;
    const inl = g.data.filter((v) => v >= q1 - 1.5 * iq && v <= q3 + 1.5 * iq);
    const wlo = Math.min(...inl), whi = Math.max(...inl);
    const cy = PAD.t + rowH * gi + rowH / 2, h = Math.min(40, rowH * 0.6);
    const outs = showOutliers ? g.data.filter((v) => v < q1 - 1.5 * iq || v > q3 + 1.5 * iq).map((v) => `<circle class="dot out" cx="${x(v)}" cy="${cy}" r="4"/>`).join('') : '';
    return `<line class="whisk" x1="${x(wlo)}" x2="${x(q1)}" y1="${cy}" y2="${cy}"/><line class="whisk" x1="${x(q3)}" x2="${x(whi)}" y1="${cy}" y2="${cy}"/>
      <rect class="box" x="${x(q1)}" y="${cy - h / 2}" width="${x(q3) - x(q1)}" height="${h}"/>
      <line class="med" x1="${x(med)}" x2="${x(med)}" y1="${cy - h / 2}" y2="${cy + h / 2}"/>${outs}
      ${g.label ? `<text class="tick" x="${PAD.l}" y="${cy - h / 2 - 4}">${esc(g.label)}</text>` : ''}`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Box plot">${base}${rows}</svg>`;
}

// Plain function curve(s) over a domain. curves: [{fn, cls, label}]; optional shaded region [a,b] under curves[0].
export function curvePlot(curves, { width = 680, height = 240, domain = [-4, 4], shade = null, lines = [], label = '' } = {}) {
  const [lo, hi] = domain;
  const { x, base } = frame(width, height, lo, hi, label);
  const samples = curves.map((c) => Array.from({ length: 161 }, (_, i) => { const v = lo + (hi - lo) * i / 160; return [v, c.fn(v)]; }));
  const maxY = Math.max(...samples.flat().map((p) => p[1])) || 1;
  const y = (v) => height - PAD.b - (v / maxY) * (height - PAD.t - PAD.b);
  const paths = samples.map((pts, i) => `<polyline class="curve ${curves[i].cls || ''}" points="${pts.map(([v, yy]) => `${x(v).toFixed(1)},${y(yy).toFixed(1)}`).join(' ')}"/>`).join('');
  let shaded = '';
  if (shade) {
    const pts = samples[0].filter(([v]) => v >= shade[0] && v <= shade[1]);
    if (pts.length) shaded = `<polygon class="shade" points="${x(pts[0][0])},${y(0)} ${pts.map(([v, yy]) => `${x(v).toFixed(1)},${y(yy).toFixed(1)}`).join(' ')} ${x(pts[pts.length - 1][0])},${y(0)}"/>`;
  }
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Curve">${base}${shaded}${paths}${vlines(x, lines, height)}</svg>`;
}

// Line chart over an index: series = [{ys, cls}], with optional horizontal reference.
export function lineChart(series, { width = 680, height = 220, href = null, label = '', yDomain = null } = {}) {
  const n = Math.max(...series.map((s) => s.ys.length));
  const all = series.flatMap((s) => s.ys).concat(href == null ? [] : [href]);
  const ylo = yDomain ? yDomain[0] : Math.min(...all), yhi = yDomain ? yDomain[1] : Math.max(...all);
  const { x, base } = frame(width, height, 0, Math.max(1, n - 1), label);
  const y = (v) => height - PAD.b - ((v - ylo) / (yhi - ylo || 1)) * (height - PAD.t - PAD.b);
  const yt = niceTicks(ylo, yhi, 4).map((t) => `<text class="tick" x="${PAD.l - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text>`).join('');
  const paths = series.map((s) => `<polyline class="curve ${s.cls || ''}" points="${s.ys.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')}"/>`).join('');
  const ref = href == null ? '' : `<line class="truth" x1="${PAD.l}" x2="${width - PAD.r}" y1="${y(href)}" y2="${y(href)}"/>`;
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart">${base}${yt}${ref}${paths}</svg>`;
}
