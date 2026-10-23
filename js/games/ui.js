// Shared helpers for engines. Every engine exports a factory returning
// { engine, render(el, finish) } where finish({ score, html, correct }) is called once.
import { esc } from '../charts.js';
export { esc };

export const closeness = (guess, truth, tol) => Math.round(100 * Math.max(0, 1 - Math.abs(guess - truth) / tol));
export const fmtN = (x, d = 2) => (Number.isFinite(x) ? (+(+x).toFixed(d)).toString() : '—');

export function slider(id, { min, max, step, value, label = '' }) {
  return `<input id="${id}" class="slider" type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${esc(label || 'Your guess')}" />`;
}
export function readout(id, label, value, unit = '') {
  return `<div class="readout"><span>${esc(label)}</span><span class="val"><span id="${id}">${value}</span>${unit}</span></div>`;
}
export function button(id, text, cls = '') { return `<button id="${id}" class="${cls}">${text}</button>`; }

// Pointer helper: convert a pointer event on an SVG to viewBox x units.
export function svgX(svg, ev) {
  const r = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  return ((ev.clientX - r.left) / r.width) * vb.width;
}
