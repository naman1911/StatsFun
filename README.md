# StatsFun

An app to teach all the concepts of statistics in the most fun way.

**Play it:** https://naman1911.github.io/StatsFun/

308 concepts across 11 worlds, from "what is a variable" to causal inference, meta-analysis and
honest reporting, plus 15 boss levels. Every level opens with a short lesson card and then runs a
mini-game on freshly generated data, so replays are never the same. Progress (XP, stars, streaks,
badges) is stored in your browser.

## How a level works

1. **Lesson card**: definition, formula, synonyms, the classic misconception, a real-world example.
2. **Game rounds** on one of the reusable engines, chosen per concept:
   - **ESTIMATE**: read a plot or scenario, set a slider, scored by closeness to the truth.
   - **PICK / QUIZ**: choose the plot, table or statement that matches.
   - **DETECTIVE**: flag every flaw in a study, chart or set of claims.
   - **CORRELATION GUESS**: see a scatter plot, guess r (or Spearman's rho).
   - **SIGNIFICANCE BET**: see the data, bet how likely p < 0.05 is, scored by the Brier rule.
   - **PREDICT-THEN-SIMULATE**: state a probability or expected value, then watch thousands of
     simulated trials converge (or not) on your guess.
   - **SAMPLER**: draw repeated samples and watch a sampling, null, bootstrap or chi-square
     distribution build up before answering a question about it.
   - **BUILD**: drag dots on a number line until a live statistic hits a target.
3. **Concept check**: one round built from the curriculum text (spot the misconception, match the
   definition, name the concept from an example).

Concepts without a bespoke game yet fall back to concept-check rounds, so every level is playable.

## Run locally

No build step. Serve the folder with any static server:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Tests

```sh
node tests/stats.test.mjs      # statistics engine against reference values
node tools/convert.mjs         # regenerate js/data/curriculum.js from docs/curriculum.md
```

## Layout

- `index.html`, `css/style.css`: shell and styling (light and dark)
- `js/stats.js`: pure statistics engine (descriptives, distributions, tests, ANOVA, CIs, power)
- `js/charts.js`: SVG charts (dot plot, histogram, bar, scatter, box plot, curves, line chart)
- `js/games/*.js`: the game engines listed above
- `js/levels.js`: bespoke game rounds for each concept id
- `js/rounds.js`: generic concept-check rounds generated from the curriculum text
- `js/runner.js`, `js/badges.js`, `js/state.js`: level runner, badges, saved progress
- `js/main.js`: routing, world map, world and level pages, bosses, settings
- `docs/curriculum.md`: the curriculum and game design (source of truth)
- `js/data/curriculum.js`: generated from the markdown by `tools/convert.mjs`
- `docs/CONTENT_PROMPT.md`: the research prompt used to produce the curriculum

## Deployment

Pushing to `main` runs the tests and mirrors the site into the `gh-pages` branch, which GitHub
Pages serves (`.github/workflows/pages.yml`).
