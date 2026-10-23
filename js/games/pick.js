import { esc } from './ui.js';

// Choose one option among several (plots, text, tables). options: [{html, correct, score?, why}]
export function pickRound({ prompt, options, layout = 'grid', reveal = '' }) {
  return {
    engine: 'PICK',
    render(el, finish) {
      el.innerHTML = `<p class="prompt">${prompt}</p><div class="options ${layout}">${options.map((o, i) =>
        `<button class="opt" data-i="${i}">${o.html}</button>`).join('')}</div>`;
      el.querySelectorAll('.opt').forEach((b) => {
        b.onclick = () => {
          const i = +b.dataset.i; const o = options[i];
          el.querySelectorAll('.opt').forEach((x, k) => { x.disabled = true; if (options[k].correct) x.classList.add('right'); });
          if (!o.correct) b.classList.add('wrong');
          const score = o.correct ? 100 : (o.score || 0);
          const why = o.why || (o.correct ? 'Correct.' : options.find((x) => x.correct)?.why || '');
          finish({ score, html: `${o.correct ? '<b>Correct.</b> ' : '<b>Not that one.</b> '}${why}${reveal ? `<div class="reveal">${reveal}</div>` : ''}` });
        };
      });
    },
  };
}

// Multiple choice with plain text options (QUIZ / MATCH flavour).
export const quizRound = ({ prompt, choices, answer, why, reveal }) =>
  pickRound({ prompt, layout: 'list', reveal, options: choices.map((c, i) => ({ html: esc(c), correct: i === answer, why })) });

// Select all that apply (DETECTIVE): items [{html, flaw, why}]. Player toggles then submits.
export function multiPickRound({ prompt, items, submitText = 'Submit verdict', intro = '' }) {
  return {
    engine: 'DETECTIVE',
    render(el, finish) {
      el.innerHTML = `<p class="prompt">${prompt}</p>${intro ? `<div class="scenario">${intro}</div>` : ''}
        <div class="options list">${items.map((o, i) => `<button class="opt toggle" data-i="${i}">${o.html}</button>`).join('')}</div>
        <div class="row"><button id="sub">${submitText}</button></div>`;
      el.querySelectorAll('.toggle').forEach((b) => { b.onclick = () => b.classList.toggle('sel'); });
      el.querySelector('#sub').onclick = () => {
        const sel = [...el.querySelectorAll('.toggle')].map((b) => b.classList.contains('sel'));
        const flaws = items.filter((o) => o.flaw).length;
        let hits = 0, wrong = 0;
        items.forEach((o, i) => { if (o.flaw && sel[i]) hits++; if (!o.flaw && sel[i]) wrong++; });
        el.querySelectorAll('.toggle').forEach((b, i) => { b.disabled = true; if (items[i].flaw) b.classList.add('right'); else if (sel[i]) b.classList.add('wrong'); });
        el.querySelector('#sub').disabled = true;
        const score = Math.max(0, Math.round(100 * hits / Math.max(1, flaws) - 25 * wrong));
        const expl = items.filter((o) => o.flaw).map((o) => `<li>${o.why}</li>`).join('');
        finish({ score, html: `You found <b>${hits} of ${flaws}</b>${wrong ? ` and wrongly accused ${wrong}` : ''}.<ul>${expl}</ul>` });
      };
    },
  };
}
