// Pure statistics helpers. No DOM. Everything here is testable with node.

export const sum = (a) => a.reduce((s, x) => s + x, 0);
export const mean = (a) => (a.length ? sum(a) / a.length : NaN);

export function median(a) {
  if (!a.length) return NaN;
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

// Returns all modes (array). Empty array when every value is unique.
export function modes(a) {
  const counts = new Map();
  for (const x of a) counts.set(x, (counts.get(x) || 0) + 1);
  let best = 0;
  for (const c of counts.values()) best = Math.max(best, c);
  if (best <= 1) return [];
  return [...counts.entries()].filter(([, c]) => c === best).map(([v]) => v).sort((x, y) => x - y);
}

export const range = (a) => Math.max(...a) - Math.min(...a);

export function variance(a, sample = true) {
  if (a.length < 2) return NaN;
  const m = mean(a);
  return sum(a.map((x) => (x - m) ** 2)) / (a.length - (sample ? 1 : 0));
}
export const sd = (a, sample = true) => Math.sqrt(variance(a, sample));

// Linear interpolation quantile (type 7, same as R default / numpy).
export function quantile(a, q) {
  const s = [...a].sort((x, y) => x - y);
  const pos = (s.length - 1) * q;
  const lo = Math.floor(pos), hi = Math.ceil(pos);
  return s[lo] + (s[hi] - s[lo]) * (pos - lo);
}
export const iqr = (a) => quantile(a, 0.75) - quantile(a, 0.25);

export function zScore(x, a) {
  return (x - mean(a)) / sd(a);
}

// Fisher-Pearson skewness coefficient (population form).
export function skewness(a) {
  const m = mean(a), s = sd(a, false);
  return sum(a.map((x) => ((x - m) / s) ** 3)) / a.length;
}

export function pearson(xs, ys) {
  const mx = mean(xs), my = mean(ys);
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < xs.length; i++) {
    const a = xs[i] - mx, b = ys[i] - my;
    num += a * b; dx += a * a; dy += b * b;
  }
  return num / Math.sqrt(dx * dy);
}

export function linreg(xs, ys) {
  const mx = mean(xs), my = mean(ys);
  let num = 0, den = 0;
  for (let i = 0; i < xs.length; i++) {
    num += (xs[i] - mx) * (ys[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  const slope = num / den;
  const intercept = my - slope * mx;
  const r = pearson(xs, ys);
  return { slope, intercept, r, r2: r * r };
}

export function cohensD(a, b) {
  const pooled = Math.sqrt(((a.length - 1) * variance(a) + (b.length - 1) * variance(b)) / (a.length + b.length - 2));
  return (mean(a) - mean(b)) / pooled;
}

// ---------- Distributions ----------
export const normalPdf = (x, mu = 0, sigma = 1) =>
  Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));

// Abramowitz & Stegun 7.1.26 style erf, accurate to ~1e-7.
export function erf(x) {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return sign * y;
}
export const normalCdf = (x, mu = 0, sigma = 1) => 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));

// Inverse normal CDF (Acklam's algorithm).
export function normalInv(p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425, ph = 1 - pl;
  let q, r;
  if (p < pl) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p <= ph) {
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
}

// Log-gamma (Lanczos).
export function lgamma(z) {
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

// Regularized incomplete beta I_x(a,b) via continued fraction (Numerical Recipes betacf).
export function betaInc(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  const cf = (x, a, b) => {
    const MAXIT = 200, EPS = 3e-12, FPMIN = 1e-300;
    let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    d = 1 / d;
    let h = d;
    for (let m = 1; m <= MAXIT; m++) {
      const m2 = 2 * m;
      let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d; h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d;
      const del = d * c;
      h *= del;
      if (Math.abs(del - 1) < EPS) break;
    }
    return h;
  };
  if (x < (a + 1) / (a + b + 2)) return bt * cf(x, a, b) / a;
  return 1 - bt * cf(1 - x, b, a) / b;
}

// Student t CDF.
export function tCdf(t, df) {
  const x = df / (df + t * t);
  const p = 0.5 * betaInc(x, df / 2, 0.5);
  return t > 0 ? 1 - p : p;
}

// Regularized lower incomplete gamma P(a, x).
export function gammaInc(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let ap = a, s = 1 / a, del = s;
    for (let n = 0; n < 300; n++) {
      ap += 1; del *= x / ap; s += del;
      if (Math.abs(del) < Math.abs(s) * 1e-12) break;
    }
    return s * Math.exp(-x + a * Math.log(x) - lgamma(a));
  }
  // continued fraction for Q
  let b = x + 1 - a, c = 1 / 1e-300, d = 1 / b, h = d;
  for (let i = 1; i < 300; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-12) break;
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
}
export const chiSqCdf = (x, k) => gammaInc(k / 2, x / 2);

export function binomPmf(k, n, p) {
  return Math.exp(lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}
export const poissonPmf = (k, lambda) => Math.exp(k * Math.log(lambda) - lambda - lgamma(k + 1));

// ---------- Tests ----------
// Welch's two-sample t-test (two-tailed).
export function welchT(a, b) {
  const va = variance(a) / a.length, vb = variance(b) / b.length;
  const t = (mean(a) - mean(b)) / Math.sqrt(va + vb);
  const df = (va + vb) ** 2 / (va ** 2 / (a.length - 1) + vb ** 2 / (b.length - 1));
  const p = 2 * (1 - tCdf(Math.abs(t), df));
  return { t, df, p };
}

// One-sample t-test against mu0.
export function oneSampleT(a, mu0) {
  const t = (mean(a) - mu0) / (sd(a) / Math.sqrt(a.length));
  const df = a.length - 1;
  return { t, df, p: 2 * (1 - tCdf(Math.abs(t), df)) };
}

// Confidence interval for a mean using t.
export function meanCI(a, level = 0.95) {
  const df = a.length - 1;
  const tcrit = tInv(1 - (1 - level) / 2, df);
  const se = sd(a) / Math.sqrt(a.length);
  return { lo: mean(a) - tcrit * se, hi: mean(a) + tcrit * se, se, tcrit };
}

// t quantile via bisection on tCdf.
export function tInv(p, df) {
  let lo = -50, hi = 50;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (tCdf(mid, df) < p) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

// Chi-square test of independence on a 2D table [[a,b],[c,d]...]
export function chiSquare(table) {
  const rows = table.length, cols = table[0].length;
  const rowT = table.map((r) => sum(r));
  const colT = table[0].map((_, j) => sum(table.map((r) => r[j])));
  const N = sum(rowT);
  let stat = 0;
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
    const e = (rowT[i] * colT[j]) / N;
    stat += (table[i][j] - e) ** 2 / e;
  }
  const df = (rows - 1) * (cols - 1);
  return { stat, df, p: 1 - chiSqCdf(stat, df) };
}

// One-way ANOVA. groups: array of arrays.
export function anova(groups) {
  const all = groups.flat();
  const gm = mean(all);
  const ssb = sum(groups.map((g) => g.length * (mean(g) - gm) ** 2));
  const ssw = sum(groups.map((g) => sum(g.map((x) => (x - mean(g)) ** 2))));
  const dfb = groups.length - 1, dfw = all.length - groups.length;
  const F = (ssb / dfb) / (ssw / dfw);
  // F cdf via beta: P(F<=f) = I_{dfb f/(dfb f + dfw)}(dfb/2, dfw/2)
  const p = 1 - betaInc((dfb * F) / (dfb * F + dfw), dfb / 2, dfw / 2);
  return { F, dfb, dfw, p };
}

// Power of a two-sample t test (approximate, normal approximation) for effect size d, n per group.
export function powerTwoSample(d, n, alpha = 0.05) {
  const zcrit = normalInv(1 - alpha / 2);
  const ncp = d * Math.sqrt(n / 2);
  return 1 - normalCdf(zcrit - ncp) + normalCdf(-zcrit - ncp);
}

// ---------- Random generators ----------
export const rand = Math.random;
export const randInt = (lo, hi) => lo + Math.floor(rand() * (hi - lo + 1));
export const choice = (arr) => arr[Math.floor(rand() * arr.length)];
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function randNormal(mu = 0, sigma = 1) {
  let u = 0, v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
export const normals = (n, mu, sigma) => Array.from({ length: n }, () => randNormal(mu, sigma));
export const uniforms = (n, lo, hi) => Array.from({ length: n }, () => lo + rand() * (hi - lo));
export const intsNormal = (n, mu, sigma, lo = -Infinity, hi = Infinity) =>
  Array.from({ length: n }, () => Math.min(hi, Math.max(lo, Math.round(randNormal(mu, sigma)))));
// Right-skewed positive values (log-normal-ish), rounded.
export function skewed(n, scale = 10, shape = 0.6, right = true) {
  const v = Array.from({ length: n }, () => Math.round(scale * Math.exp(randNormal(0, shape))));
  if (right) return v;
  const mx = Math.max(...v) + Math.min(...v);
  return v.map((x) => mx - x);
}
// Pair of correlated samples with target r.
export function correlated(n, r, { mx = 50, sx = 12, my = 50, sy = 12 } = {}) {
  const xs = [], ys = [];
  for (let i = 0; i < n; i++) {
    const z1 = randNormal(), z2 = randNormal();
    xs.push(mx + sx * z1);
    ys.push(my + sy * (r * z1 + Math.sqrt(1 - r * r) * z2));
  }
  return { xs, ys };
}
export const round = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
export const fmt = (x, d = 2) => (Number.isFinite(x) ? (Math.abs(x) >= 1000 ? Math.round(x).toLocaleString() : (+x.toFixed(d)).toString()) : '—');
export const fmtP = (p) => (p < 0.001 ? 'p < 0.001' : `p = ${p.toFixed(3)}`);
