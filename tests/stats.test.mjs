import assert from 'node:assert/strict';
import * as S from '../js/stats.js';

const close = (a, b, tol = 1e-3, msg = '') => assert.ok(Math.abs(a - b) < tol, `${msg} expected ${b} got ${a}`);

close(S.mean([1, 2, 3, 4]), 2.5, 1e-12, 'mean');
assert.equal(S.median([3, 1, 2]), 2);
assert.equal(S.median([4, 1, 3, 2]), 2.5);
assert.deepEqual(S.modes([1, 2, 2, 3, 3]), [2, 3]);
assert.deepEqual(S.modes([1, 2, 3]), []);
assert.equal(S.range([5, 1, 9]), 8);
close(S.variance([2, 4, 4, 4, 5, 5, 7, 9]), 32 / 7, 1e-9, 'sample var');
close(S.sd([2, 4, 4, 4, 5, 5, 7, 9], false), 2, 1e-9, 'pop sd');
close(S.quantile([1, 2, 3, 4, 5], 0.5), 3, 1e-12, 'q50');
close(S.quantile([1, 2, 3, 4], 0.25), 1.75, 1e-12, 'q25 type7');
close(S.pearson([1, 2, 3, 4], [2, 4, 6, 8]), 1, 1e-9, 'r');
const lr = S.linreg([1, 2, 3, 4], [3, 5, 7, 9]);
close(lr.slope, 2, 1e-9, 'slope'); close(lr.intercept, 1, 1e-9, 'intercept');

close(S.normalCdf(1.96), 0.975, 1e-4, 'Phi(1.96)');
close(S.normalCdf(0), 0.5, 1e-9, 'Phi(0)');
close(S.normalInv(0.975), 1.959964, 1e-4, 'invPhi');
close(S.normalInv(0.01), -2.326348, 1e-4, 'invPhi low');
close(S.tCdf(2.228, 10), 0.975, 1e-3, 't cdf');
close(S.tInv(0.975, 10), 2.228, 1e-3, 't inv');
close(S.chiSqCdf(3.841, 1), 0.95, 1e-3, 'chi2 cdf');
close(S.chiSqCdf(7.815, 3), 0.95, 1e-3, 'chi2 cdf df3');
close(S.binomPmf(3, 10, 0.5), 0.1171875, 1e-6, 'binom');
close(S.poissonPmf(2, 3), 0.2240418, 1e-6, 'poisson');
close(Math.exp(S.lgamma(5)), 24, 1e-6, 'gamma(5)');

// Welch t: classic example
const a = [27.5, 21.0, 19.0, 23.6, 17.0, 17.9, 16.9, 20.1, 21.9, 22.6, 23.1, 19.6, 19.0, 21.7, 21.4];
const b = [27.1, 22.0, 20.8, 23.4, 23.4, 23.5, 25.8, 22.0, 24.8, 20.2, 21.9, 22.1, 22.9, 20.5, 24.4];
const w = S.welchT(a, b);
close(w.t, -2.4554, 1e-3, 'welch t'); close(w.df, 24.989, 1e-2, 'welch df');
close(w.p, 0.0211, 2e-3, 'welch p');

const chi = S.chiSquare([[20, 30], [30, 20]]);
close(chi.stat, 4, 1e-9, 'chi stat'); close(chi.p, 0.0455, 1e-3, 'chi p');

const an = S.anova([[1, 2, 3], [2, 3, 4], [5, 6, 7]]);
close(an.F, 13, 1e-9, 'F'); close(an.p, 0.0066, 1e-3, 'anova p');

close(S.powerTwoSample(0.5, 64), 0.80, 0.02, 'power');
const ci = S.meanCI([1, 2, 3, 4, 5]);
close(ci.lo, 1.036, 1e-2, 'ci lo'); close(ci.hi, 4.964, 1e-2, 'ci hi');

const { xs, ys } = S.correlated(5000, 0.7);
close(S.pearson(xs, ys), 0.7, 0.05, 'correlated gen');
console.log('all stats tests passed');
