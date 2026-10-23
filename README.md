# StatsFun

An app to teach all the concepts of statistics in the most fun way.

**Play it:** https://naman1911.github.io/StatsFun/

Short lesson cards, then mini-games on freshly generated data, from mean, median and mode
up to the methods used in research. Progress (XP, stars, streaks) is stored in your browser.

## Run locally

No build step. Serve the folder with any static server, for example:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Tests

```sh
node tests/stats.test.mjs
```

## Layout

- `index.html`, `css/style.css`: shell and styling
- `js/stats.js`: pure statistics engine (tested)
- `js/charts.js`: SVG chart helpers
- `js/state.js`: progress saved in localStorage
- `js/main.js`: routing, world map, game levels
- `docs/CONTENT_PROMPT.md`: research prompt used to assemble the full curriculum
