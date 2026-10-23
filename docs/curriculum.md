# StatsFun — Complete Curriculum and Game Design

## How to read this file

- One `##` heading = one World (ordered beginner → research). The `##` line carries `World N — Name (tier range)`.
- One `###` heading = one concept, prefixed with an ID (`W3.07`) for stable JSON keys.
- Every concept has exactly 16 bullet fields, always in the same order and with the same labels. The first 8 are the curriculum (Deliverable 1); the last 8 are its mini-game (Deliverable 2). A converter can split them into `concept` and `game` objects.
- **Engine type** uses the ten reusable engines (ESTIMATE, PICK, CORRELATION GUESS, SIGNIFICANCE BET, PROBABILITY PREDICT-THEN-SIMULATE, SAMPLER, MATCH, BUILD, DETECTIVE, QUIZ) or `NEW: <name>` when a new engine is proposed. Three new engines are proposed and defined at the end: `TUNE` (turn dials on a live model and watch an output), `TIMELINE` (interact with a sequence/time axis), `DIAGRAM` (build a graph of nodes and arrows).
- **Prerequisites** reference concept IDs. "—" means none.
- Boss levels and badges are in the final two sections.

Fields per concept:
`Name` · `Synonyms/notation` · `Definition` · `Formula/procedure` · `Prerequisites` · `Misconception` · `Real-world example` · `Difficulty tier` · `Game name` · `Goal` · `Interaction` · `Data generation` · `Scoring` · `Reveal` · `Why it works` · `Engine type`

Scoring convention used throughout: every level returns 0–100 points; stars = 1 at ≥40, 2 at ≥70, 3 at ≥90. "Closeness score" means `100 × max(0, 1 − |guess − truth| / tolerance)` where tolerance is stated per game.

---

## World 1 — Data Island (Beginner)

Theme: a harbour of crates and labels. The player learns what data *is* before computing anything.

### W1.01 Variables, observations and the data table
- **Name:** Variable and observation
- **Synonyms/notation:** variable, column, feature, attribute; observation, case, row, record, unit; dataset, data frame, tidy data; n = number of observations
- **Definition:** A variable is one thing you measure about each case; an observation is one case with all its measurements, and a dataset is a table with one row per case and one column per variable.
- **Formula/procedure:** Tidy rule: each row = one observation, each column = one variable, each cell = one value. n counts rows.
- **Prerequisites:** —
- **Misconception:** Treating a column of category labels (e.g. "Group A") as if the labels are the observations; or putting the same variable across several columns (Week1, Week2…) instead of a `week` column.
- **Real-world example:** A hospital spreadsheet where each row is a patient and columns are age, ward and blood pressure; mixing rows that are patients with rows that are wards breaks every analysis.
- **Difficulty tier:** Beginner
- **Game name:** Tidy Up
- **Goal:** Rebuild a scrambled pile of value-tiles into a proper data table.
- **Interaction:** Drag tiles (e.g. "Age: 34", "Ward: ICU") into a grid; rows are cases, columns are variables; a tile snaps only if its variable matches the column header.
- **Data generation:** Pick a random scenario (patients, cars, pupils, shops) and 4–6 variables; generate 5–8 cases with plausible random values; shuffle all tiles.
- **Scoring:** 100 × (correctly placed tiles / total) minus 5 per wrong drop; time bonus +10 if under 60 s.
- **Reveal:** The finished table highlights one row ("this is one observation") and one column ("this is one variable") and prints n.
- **Why it works:** Physically separating rows from columns makes the row/column distinction a motor memory before any formula appears.
- **Engine type:** BUILD

### W1.02 Qualitative vs quantitative variables
- **Name:** Categorical vs numerical variable
- **Synonyms/notation:** qualitative/categorical/factor; quantitative/numerical/numeric
- **Definition:** A categorical variable puts each case into a named bucket; a numerical variable gives each case a number you can do arithmetic on.
- **Formula/procedure:** Ask "can I sensibly average it?" Yes → numerical; no → categorical.
- **Prerequisites:** W1.01
- **Misconception:** Thinking anything stored as a number is numerical (postcodes, jersey numbers and phone numbers are categorical).
- **Real-world example:** Averaging ZIP codes of customers gives a meaningless number; counting customers per ZIP is the right summary.
- **Difficulty tier:** Beginner
- **Game name:** Sort Sortie
- **Goal:** Sort a conveyor belt of variable cards into the Categorical or Numerical chute before they fall off.
- **Interaction:** Click/drag each card left or right; speed increases each round.
- **Data generation:** Draw 12 cards from a pool of ~80 variable descriptions tagged with type and a "trap" flag (numbers used as labels); ensure ≥3 traps.
- **Scoring:** +8 per correct, −8 per wrong, 0 if missed; trap cards worth double.
- **Reveal:** Each wrong card flips to show the one-line reason ("Jersey number: you can't average it").
- **Why it works:** Time pressure forces the "can I average it?" heuristic to become automatic, and traps target the exact mistake.
- **Engine type:** MATCH

### W1.03 Nominal scale
- **Name:** Nominal variable
- **Synonyms/notation:** nominal level, named categories, unordered categorical
- **Definition:** Categories with names but no natural order, like eye colour or country.
- **Formula/procedure:** Allowed summaries: counts, proportions, mode. Not allowed: median, mean, differences.
- **Prerequisites:** W1.02
- **Misconception:** Coding categories as 1, 2, 3 and then computing a mean of the codes.
- **Real-world example:** A survey codes "bus=1, train=2, car=3"; reporting "mean transport = 2.1" is nonsense.
- **Difficulty tier:** Beginner
- **Game name:** Name Tag
- **Goal:** For a shown nominal variable, switch on only the summaries that make sense.
- **Interaction:** Toggle switches labelled Count, %, Mode, Median, Mean, Range; press Confirm.
- **Data generation:** Random nominal variable (pet type, blood group, favourite app) with 4–6 categories and random counts.
- **Scoring:** 100 if all six toggles correct; −20 per wrong toggle.
- **Reveal:** Shows the bar chart of counts with the mode highlighted and a crossed-out "mean = 2.3" to show what nonsense looks like.
- **Why it works:** The player decides what is *permitted*, which is the actual skill, instead of memorising a definition.
- **Engine type:** PICK

### W1.04 Ordinal scale
- **Name:** Ordinal variable
- **Synonyms/notation:** ordinal level, ranked categories, Likert scale
- **Definition:** Categories that have an order (small/medium/large) but where the gaps between them are not necessarily equal.
- **Formula/procedure:** Allowed: counts, mode, median, percentiles, rank-based methods. Mean is debatable (common for Likert, strictly not justified).
- **Prerequisites:** W1.03
- **Misconception:** Assuming "strongly agree" is exactly as far from "agree" as "agree" is from "neutral".
- **Real-world example:** Hotel star ratings: a 4-star is better than a 3-star, but not "one unit" better in any measurable sense.
- **Difficulty tier:** Beginner
- **Game name:** Rank Rails
- **Goal:** Put shuffled ordinal labels back in order, then decide whether the gaps are equal.
- **Interaction:** Drag labels onto a rail in order; then drag a "gap" slider to show whether gaps are known-equal or unknown; pick the allowed summaries.
- **Data generation:** Random ordinal set (pain scale, education level, satisfaction, T-shirt size) from a pool of 25; shuffle.
- **Scoring:** 50 for correct order (partial credit by Kendall tau with correct order), 25 for correct gap answer, 25 for allowed summaries.
- **Reveal:** The rail animates with unequal spacing to show "order yes, distance no" and highlights median as the natural centre.
- **Why it works:** Ordering by hand and then being asked about distance makes the order/distance distinction concrete.
- **Engine type:** BUILD

### W1.05 Interval scale
- **Name:** Interval variable
- **Synonyms/notation:** interval level, equal-interval, arbitrary zero
- **Definition:** Numbers where differences mean something but zero is just a convention, so you can't say one value is "twice" another.
- **Formula/procedure:** Allowed: mean, SD, differences, correlation. Not allowed: ratios ("twice as").
- **Prerequisites:** W1.04
- **Misconception:** Saying 20 °C is twice as hot as 10 °C (in kelvin it's 293 vs 283, nowhere near double).
- **Real-world example:** IQ scores and calendar years: year 2000 is not "twice" year 1000, and IQ 0 does not mean no intelligence.
- **Difficulty tier:** Beginner
- **Game name:** Zero Means Nothing
- **Goal:** Spot the statements about an interval variable that are illegal.
- **Interaction:** A list of 6 claims appears; tap the ones that are invalid; one "convert to kelvin" button lets you check temperature claims.
- **Data generation:** Random interval variable (°C, °F, year, clock time, IQ) and random numbers; 6 claims generated from templates, 2–3 ratio-type (invalid).
- **Scoring:** +16 per correct judgement, −16 per wrong.
- **Reveal:** Shows the same values on a true-ratio scale (kelvin, years since a real event) to show why the ratio claim fails.
- **Why it works:** Converting to a ratio scale lets players *see* the arbitrary zero rather than take it on faith.
- **Engine type:** PICK

### W1.06 Ratio scale
- **Name:** Ratio variable
- **Synonyms/notation:** ratio level, true zero, absolute zero
- **Definition:** Numbers with a real zero meaning "none", so ratios are meaningful: 10 kg is twice 5 kg.
- **Formula/procedure:** All arithmetic allowed, including geometric mean and coefficient of variation.
- **Prerequisites:** W1.05
- **Misconception:** Thinking every variable with negative values is interval; ratio variables can't be negative (count, mass, time elapsed).
- **Real-world example:** Income, height, reaction time and number of children all have a true zero.
- **Difficulty tier:** Beginner
- **Game name:** Twice as Much
- **Goal:** Climb the measurement ladder by classifying variables as nominal, ordinal, interval or ratio.
- **Interaction:** Four rungs on screen; drag each variable card onto a rung; mistakes drop the card one rung down.
- **Data generation:** 10 cards sampled from a tagged pool (~120 variables) ensuring at least 2 per level.
- **Scoring:** +10 per correct placement; streak bonus +5 for 5 in a row.
- **Reveal:** For each card, shows which operations are allowed at its level in a cumulative table (nominal ⊂ ordinal ⊂ interval ⊂ ratio).
- **Why it works:** The ladder image encodes that each level inherits the previous level's permitted operations.
- **Engine type:** MATCH

### W1.07 Discrete vs continuous
- **Name:** Discrete vs continuous variable
- **Synonyms/notation:** discrete/countable; continuous/measurable
- **Definition:** Discrete variables jump between separate values (number of children: 0, 1, 2); continuous ones can take any value in a range (height: 1.731 m).
- **Formula/procedure:** Ask "between two possible values, is there always another possible value?" Yes → continuous.
- **Prerequisites:** W1.02
- **Misconception:** Thinking continuous means "has decimals" (shoe size 7.5 is still discrete) or that money is continuous (it's discrete in cents, though usually modelled as continuous).
- **Real-world example:** Number of website visits is discrete; time spent on the site is continuous.
- **Difficulty tier:** Beginner
- **Game name:** Countable Cove
- **Goal:** Zoom in on a number line between two values and decide if a value can exist there.
- **Interaction:** A magnifier slider zooms between two displayed values; player presses "Always another value" or "Gaps".
- **Data generation:** Random variable from pool with discrete/continuous tag; two adjacent-ish values generated.
- **Scoring:** 20 per correct over 5 rounds; bonus 10 for correctly handling a "decimal but discrete" trap.
- **Reveal:** Zooming shows either a dense line or isolated ticks; a histogram vs bar chart preview hints at later worlds.
- **Why it works:** The "is there a value between?" test becomes visual.
- **Engine type:** PICK

### W1.08 Population vs sample
- **Name:** Population vs sample
- **Synonyms/notation:** population (N), sample (n), census, target population
- **Definition:** The population is everyone or everything you want to know about; a sample is the smaller part you actually measure.
- **Formula/procedure:** Define the population precisely first ("all adults in Mumbai in 2026"), then describe how the sample was taken.
- **Prerequisites:** W1.01
- **Misconception:** Thinking "population" means people; it can be bolts, tweets or trees. Also assuming a big sample is a population.
- **Real-world example:** Exit polls interview a few thousand voters (sample) to predict all voters (population).
- **Difficulty tier:** Beginner
- **Game name:** Pond Census
- **Goal:** Estimate how many of the pond's fish are red, choosing between counting all of them (slow) or netting a sample (fast).
- **Interaction:** Click "Net 10" repeatedly or "Count all" (costs much more time); enter your estimate; a timer runs.
- **Data generation:** Pond of N = 200–2000 fish with a random red proportion 0.1–0.9 rendered as dots.
- **Scoring:** Closeness score (tolerance 0.15) × efficiency multiplier (fewer fish examined → up to 1.5×).
- **Reveal:** True proportion, your sample proportion, and the labels "parameter" (pond) vs "statistic" (net) foreshadowing W1.09.
- **Why it works:** Players feel the cost/benefit trade-off that is the whole reason sampling exists.
- **Engine type:** SAMPLER

### W1.09 Parameter vs statistic
- **Name:** Parameter vs statistic
- **Synonyms/notation:** parameter: μ, σ, p, ρ, β (Greek); statistic/estimate: x̄, s, p̂, r, b (Roman or hat)
- **Definition:** A parameter is a fixed number describing a population; a statistic is a number computed from a sample that estimates it.
- **Formula/procedure:** Greek letters → population parameters; Roman letters or hats → sample statistics.
- **Prerequisites:** W1.08
- **Misconception:** Treating the sample mean as if it were the population mean, or thinking the parameter changes from sample to sample (it's the statistic that varies).
- **Real-world example:** The true average height of all Indian 18-year-olds is μ; the average of 500 measured recruits is x̄.
- **Difficulty tier:** Beginner
- **Game name:** Greek or Roman
- **Goal:** Match each symbol to its meaning and to population or sample.
- **Interaction:** Drag symbol tiles (μ, x̄, σ, s, p, p̂, N, n, ρ, r) into two columns (Population / Sample) and onto the correct description.
- **Data generation:** Random subset of 6 symbols; descriptions shuffled; occasionally a decoy symbol (λ, θ) appears.
- **Scoring:** +15 per fully correct tile (column + description), +5 if only column correct.
- **Reveal:** The pond from W1.08 reappears with μ printed on the pond and x̄ on the net.
- **Why it works:** Symbol literacy is pure recall; matching with a spatial population/sample split anchors it.
- **Engine type:** MATCH

### W1.10 Independent variable
- **Name:** Independent variable
- **Synonyms/notation:** IV, predictor, explanatory variable, treatment, factor, exposure, x
- **Definition:** The thing you change or compare to see what effect it has.
- **Formula/procedure:** In "does X affect Y?", X is independent.
- **Prerequisites:** W1.01
- **Misconception:** Thinking "independent" means it's unrelated to everything; it means it's the input you control or compare on.
- **Real-world example:** In a fertiliser trial, fertiliser dose is the independent variable.
- **Difficulty tier:** Beginner
- **Game name:** Cause Cards: Input
- **Goal:** For each study description, drop the right variable into the "I change / compare this" slot.
- **Interaction:** Read a 2-line scenario; drag one of 3–4 variable chips into the IV slot.
- **Data generation:** Scenario templates with randomised nouns (crop, drug, app design, study method) and distractor chips (outcome, confounder, constant).
- **Scoring:** 20 per correct over 5 scenarios; −10 for picking the outcome.
- **Reveal:** The scenario is redrawn as "X → Y" with the IV on the left.
- **Why it works:** Locating the IV in messy prose is the real-life skill.
- **Engine type:** MATCH

### W1.11 Dependent variable
- **Name:** Dependent variable
- **Synonyms/notation:** DV, outcome, response, criterion, y
- **Definition:** The thing you measure to see whether it changed.
- **Formula/procedure:** In "does X affect Y?", Y is dependent.
- **Prerequisites:** W1.10
- **Misconception:** Swapping IV and DV when the sentence is written backwards ("Exam scores were compared across study methods").
- **Real-world example:** Crop yield is the dependent variable in the fertiliser trial.
- **Difficulty tier:** Beginner
- **Game name:** Cause Cards: Output
- **Goal:** Fill both IV and DV slots, including for reversed-order sentences.
- **Interaction:** Same as W1.10 but two slots; half the scenarios are phrased outcome-first.
- **Data generation:** As W1.10 with a 50% chance of reversed phrasing.
- **Scoring:** 10 per slot correct; bonus 20 for perfect set.
- **Reveal:** Arrow diagram X → Y, with a note on which one goes on the horizontal axis of a plot.
- **Why it works:** Reversed phrasing is where learners actually fail, so the game drills it.
- **Engine type:** MATCH

### W1.12 Confounding variable
- **Name:** Confounding variable
- **Synonyms/notation:** confounder, lurking variable, third variable, extraneous variable, nuisance variable
- **Definition:** A hidden variable that affects both the thing you changed and the thing you measured, so it can fake a cause-and-effect relationship.
- **Formula/procedure:** Confounder Z must (1) be associated with X and (2) independently affect Y and (3) not be caused by X.
- **Prerequisites:** W1.10, W1.11
- **Misconception:** Thinking any third variable is a confounder; mediators (on the causal path) and colliders are different.
- **Real-world example:** Ice-cream sales and drownings rise together because hot weather drives both.
- **Difficulty tier:** Beginner
- **Game name:** Lurker Hunt
- **Goal:** Find the hidden variable that explains a suspicious correlation.
- **Interaction:** A headline appears ("Cities with more churches have more crime"); pick the lurker from 4 chips; then drag it into a triangle diagram with arrows to X and Y.
- **Data generation:** Pool of ~40 classic spurious-correlation scenarios with distractor chips; random selection.
- **Scoring:** 60 for right chip, 40 for correct arrows (Z→X, Z→Y, no arrow X→Y).
- **Reveal:** Shows the data split by the confounder: within each level of Z, the X–Y relationship vanishes (scatter animation).
- **Why it works:** Seeing the correlation disappear once Z is held constant is the moment confounding "clicks".
- **Engine type:** DETECTIVE

### W1.13 Descriptive vs inferential statistics
- **Name:** Descriptive vs inferential statistics
- **Synonyms/notation:** descriptive (summarising), inferential (generalising, inference)
- **Definition:** Descriptive statistics summarise the data you have; inferential statistics use that data to make claims about a wider population.
- **Formula/procedure:** If the sentence is only about the cases measured → descriptive; if it generalises beyond them → inferential.
- **Prerequisites:** W1.08
- **Misconception:** Believing a large sample makes a descriptive statement automatically inferential, or that inference means "guessing".
- **Real-world example:** "Our 300 respondents averaged 7.2/10" is descriptive; "Customers nationally rate us about 7" is inferential.
- **Difficulty tier:** Beginner
- **Game name:** Describe or Infer
- **Goal:** Stamp each claim as describing the sample or inferring about a population.
- **Interaction:** Two stamps; claims scroll past; tap a stamp.
- **Data generation:** Claim templates with random numbers and random scope words (these, our, all, nationally, every).
- **Scoring:** 10 per correct over 10 claims.
- **Reveal:** Each claim is rewritten in the other mode so the player sees the difference in wording.
- **Why it works:** The whole game is noticing scope words, which is exactly how to tell the two apart in reading.
- **Engine type:** PICK

### W1.14 Frequency tables and relative frequency
- **Name:** Frequency table
- **Synonyms/notation:** frequency (f, count), relative frequency (proportion, %), cumulative frequency, tally
- **Definition:** A table counting how many cases fall in each category, often with the proportion of the total.
- **Formula/procedure:** relative frequency = f / n; cumulative frequency = running total of f.
- **Prerequisites:** W1.02
- **Misconception:** Comparing raw counts between groups of different sizes instead of proportions.
- **Real-world example:** Comparing 50 complaints from 1,000 customers with 60 from 10,000: the second is a lower rate.
- **Difficulty tier:** Beginner
- **Game name:** Tally Tower
- **Goal:** Tally a stream of events into bins and then report the proportions.
- **Interaction:** Click the matching bin as each event flashes (tally marks stack); after the stream, type each relative frequency.
- **Data generation:** 20–40 events drawn from 3–5 categories with random probabilities.
- **Scoring:** 50 × tally accuracy + 50 × closeness of proportions (tolerance 0.05).
- **Reveal:** Table with f, f/n and % side by side; a bar chart of relative frequencies.
- **Why it works:** Manual tallying converts "count then divide" into a habit.
- **Engine type:** BUILD

### W1.15 Summation notation
- **Name:** Summation notation
- **Synonyms/notation:** Σ (sigma), Σxᵢ, Σ from i=1 to n, index i
- **Definition:** A compact way to write "add up all the values": Σxᵢ means x₁ + x₂ + … + xₙ.
- **Formula/procedure:** Σᵢ₌₁ⁿ xᵢ = x₁ + … + xₙ; Σ(xᵢ − c) = Σxᵢ − nc; Σxᵢ² ≠ (Σxᵢ)².
- **Prerequisites:** —
- **Misconception:** Confusing Σx² (square then add) with (Σx)² (add then square).
- **Real-world example:** Every formula for mean, variance and regression is written with Σ; reading it correctly is the entry ticket.
- **Difficulty tier:** Beginner
- **Game name:** Sigma Sums
- **Goal:** Compute the value of a Σ expression from a small displayed dataset.
- **Interaction:** Expression shown (Σxᵢ, Σxᵢ², (Σxᵢ)², Σ(xᵢ−3)); tap the number tiles in the order you'd add them; result auto-sums; submit.
- **Data generation:** 4–6 random integers 1–9; expression picked from 6 templates.
- **Scoring:** 25 per correct expression over 4 rounds; −10 for the Σx² vs (Σx)² confusion.
- **Reveal:** The expanded sum written out term by term under the sigma.
- **Why it works:** Tapping terms in order makes the index loop physical.
- **Engine type:** BUILD

### W1.16 Binary variables
- **Name:** Binary variable
- **Synonyms/notation:** dichotomous, dummy, indicator, 0/1, Boolean, yes/no, success/failure
- **Definition:** A variable with exactly two possible values, usually coded 0 and 1.
- **Formula/procedure:** Mean of a 0/1 variable = proportion of 1s.
- **Prerequisites:** W1.03
- **Misconception:** Not realising the mean of a binary variable is a proportion, so "mean = 0.37" is meaningful here even though the variable is categorical.
- **Real-world example:** "Clicked the ad" coded 1/0; the mean is the click-through rate.
- **Difficulty tier:** Beginner
- **Game name:** Flip to One
- **Goal:** Guess the proportion of 1s from a grid of coloured cells, then verify it equals the mean.
- **Interaction:** Slider for proportion; after submit, press "Average the 0s and 1s" to see the mean computed.
- **Data generation:** 40–100 cells, Bernoulli(p) with random p.
- **Scoring:** Closeness (tolerance 0.15).
- **Reveal:** Σ of 1s / n shown next to the proportion to prove they are the same number.
- **Why it works:** Connects a categorical idea to arithmetic, which is needed for proportions, logistic regression and dummy variables later.
- **Engine type:** ESTIMATE

---

## World 2 — Centre Cove (Beginner)

Theme: a lighthouse that must be placed at the "centre" of a scattered archipelago of dots.

### W2.01 Arithmetic mean
- **Name:** Mean
- **Synonyms/notation:** average, arithmetic mean, x̄ (sample), μ (population), E[X] (expected value)
- **Definition:** Add up all the values and divide by how many there are; it's the balance point of the data.
- **Formula/procedure:** x̄ = Σxᵢ / n
- **Prerequisites:** W1.15
- **Misconception:** Thinking the mean is always a "typical" value; with skewed data most values can be below the mean (most people earn less than the average income).
- **Real-world example:** Average household electricity use sets the tariff bands; a few huge users pull it up.
- **Difficulty tier:** Beginner
- **Game name:** Balance Beam
- **Goal:** Place the fulcrum where the dot plot balances.
- **Interaction:** Drag a triangle fulcrum under a dot plot; the beam tilts live according to Σ(xᵢ − fulcrum).
- **Data generation:** 8–30 values from a random mixture (symmetric, skewed, or with one outlier).
- **Scoring:** Closeness (tolerance = 0.5 SD).
- **Reveal:** The beam snaps level at x̄; formula shown with the actual numbers substituted; deviations drawn as arrows summing to zero.
- **Why it works:** The mean as physical balance point explains why outliers tug it so hard.
- **Engine type:** ESTIMATE

### W2.02 Median
- **Name:** Median
- **Synonyms/notation:** middle value, 50th percentile, Q2, Md, M̃
- **Definition:** The middle value when the data are sorted; half the values are below it and half above.
- **Formula/procedure:** Sort; if n is odd, take the middle; if even, average the two middle values.
- **Prerequisites:** W1.04
- **Misconception:** Taking the middle of the *unsorted* list, or thinking the median must be one of the data values (for even n it may not be).
- **Real-world example:** Median house price is reported because a few mansions would distort the mean.
- **Difficulty tier:** Beginner
- **Game name:** Middle Marker
- **Goal:** Drop a divider so exactly half the dots are on each side.
- **Interaction:** Drag a vertical bar across an unsorted dot plot; counters show dots left/right.
- **Data generation:** 7–25 values; 50% chance n is even; sometimes heavily skewed.
- **Scoring:** 100 if counts are equal (or differ by ≤1 for odd n and the bar is on the middle dot); otherwise 100 − 20 × |left − right|.
- **Reveal:** Dots sort themselves in an animation; the median is highlighted; the mean is also shown so the player sees the gap on skewed data.
- **Why it works:** Counting left and right is the operational definition; the sort animation prevents the "unsorted" error.
- **Engine type:** ESTIMATE

### W2.03 Mode
- **Name:** Mode
- **Synonyms/notation:** modal value, most frequent value, modal class; unimodal/bimodal/multimodal
- **Definition:** The value or category that appears most often.
- **Formula/procedure:** Count each value; the mode is the one with the largest count. There can be more than one or none.
- **Prerequisites:** W1.14
- **Misconception:** Thinking the mode is the tallest bar's *height* rather than the value under it; or that every dataset has one mode.
- **Real-world example:** A shoe shop stocks most of the modal size, not the mean size (there is no size 8.37).
- **Difficulty tier:** Beginner
- **Game name:** Peak Finder
- **Goal:** Tap the mode(s) of a histogram or bar chart, and declare how many modes there are.
- **Interaction:** Tap bars; choose "1 mode / 2 modes / no mode".
- **Data generation:** Random categorical or discrete data; 30% bimodal, 10% no mode (all counts equal).
- **Scoring:** 60 for correct bars, 40 for correct modality.
- **Reveal:** Frequency table beside the chart with the top count highlighted.
- **Why it works:** Separating "which value" from "how tall" fixes the most common slip.
- **Engine type:** PICK

### W2.04 Weighted mean
- **Name:** Weighted mean
- **Synonyms/notation:** weighted average, x̄_w, Σwᵢxᵢ/Σwᵢ
- **Definition:** A mean where some values count more than others according to their weights.
- **Formula/procedure:** x̄_w = Σwᵢxᵢ / Σwᵢ
- **Prerequisites:** W2.01
- **Misconception:** Averaging group means without weighting by group size ("the mean of the means").
- **Real-world example:** A course grade where the exam is 60% and homework 40%; or combining class averages of different class sizes.
- **Difficulty tier:** Beginner
- **Game name:** Grade Mixer
- **Goal:** Set the weights on three assessment components so the final grade hits a target.
- **Interaction:** Three sliders for weights (auto-normalised to sum to 100%); live weighted mean display is hidden until submit.
- **Data generation:** Three random scores 40–100; a feasible target picked between min and max score.
- **Scoring:** Closeness (tolerance 5 points).
- **Reveal:** Formula with numbers; a bar whose segments are proportional to each weight × score.
- **Why it works:** Manipulating weights shows that the weighted mean is a tug-of-war between values.
- **Engine type:** BUILD

### W2.05 Trimmed mean
- **Name:** Trimmed mean
- **Synonyms/notation:** truncated mean, 10% trimmed mean, winsorised mean (related)
- **Definition:** The mean after chopping off a fixed percentage of the smallest and largest values.
- **Formula/procedure:** Sort; remove the lowest k% and highest k%; average the rest. Winsorising instead replaces them with the nearest kept value.
- **Prerequisites:** W2.01, W2.02
- **Misconception:** Trimming only one side, or trimming "the outliers" by eye rather than a fixed percentage.
- **Real-world example:** Olympic diving drops the highest and lowest judge's scores before averaging.
- **Difficulty tier:** Intermediate
- **Game name:** Trim Trim
- **Goal:** Choose a trim percentage that brings the mean within reach of the median, then estimate the trimmed mean.
- **Interaction:** Trim slider (0–25%) greys out dots at each end; then a second slider to guess the trimmed mean.
- **Data generation:** 20–40 values from a skewed distribution with 1–3 injected outliers.
- **Scoring:** Closeness (tolerance 0.3 SD) on the trimmed mean guess.
- **Reveal:** Track of mean vs trim % as a curve, with median as a horizontal line.
- **Why it works:** Watching the mean slide toward the median as trim increases reveals the mean–median continuum.
- **Engine type:** ESTIMATE

### W2.06 Geometric mean
- **Name:** Geometric mean
- **Synonyms/notation:** GM, (Πxᵢ)^(1/n), exp(mean of logs)
- **Definition:** The right "average" for growth rates and ratios: multiply the values and take the nth root.
- **Formula/procedure:** GM = (x₁·x₂·…·xₙ)^(1/n) = exp(Σ ln xᵢ / n). Only for positive values.
- **Prerequisites:** W2.01, W1.06
- **Misconception:** Averaging percentage growth arithmetically: +50% then −50% is not 0% but −25%.
- **Real-world example:** Average annual return on an investment over several years.
- **Difficulty tier:** Intermediate
- **Game name:** Growth Gauge
- **Goal:** Guess the single constant yearly growth rate that would give the same final value as the actual year-by-year rates.
- **Interaction:** Five yearly growth bars shown; slider for the constant rate; a "replay" button animates the investment growing.
- **Data generation:** 4–6 growth factors between 0.6 and 1.6.
- **Scoring:** Closeness (tolerance 3 percentage points).
- **Reveal:** Arithmetic mean of rates vs geometric mean, with the final balances under each, showing the arithmetic one overstates.
- **Why it works:** The replay makes compounding visible, so the player sees why multiplication, not addition, is the right operation.
- **Engine type:** ESTIMATE

### W2.07 Harmonic mean
- **Name:** Harmonic mean
- **Synonyms/notation:** HM, n / Σ(1/xᵢ)
- **Definition:** The right average for rates like speeds when the same distance is covered at each rate.
- **Formula/procedure:** HM = n / Σ(1/xᵢ). HM ≤ GM ≤ AM.
- **Prerequisites:** W2.06
- **Misconception:** Averaging 60 km/h out and 30 km/h back as 45 km/h (true average speed is 40).
- **Real-world example:** F1-score in machine learning is the harmonic mean of precision and recall.
- **Difficulty tier:** Intermediate
- **Game name:** Round Trip
- **Goal:** Guess the average speed of a round trip made at two different speeds.
- **Interaction:** Watch a boat go to the island at speed A and back at speed B; set a slider for the average speed; a ghost boat then travels at your guess.
- **Data generation:** Speeds 10–100, distance fixed.
- **Scoring:** Closeness (tolerance 5 units).
- **Reveal:** Total distance / total time computed, shown to equal the harmonic mean; ghost boat arrives early if you guessed the arithmetic mean.
- **Why it works:** The ghost boat makes the arithmetic-mean error visibly wrong.
- **Engine type:** ESTIMATE

### W2.08 Midrange
- **Name:** Midrange
- **Synonyms/notation:** mid-extreme, (min + max)/2
- **Definition:** Halfway between the smallest and largest value; quick but extremely sensitive to outliers.
- **Formula/procedure:** (min + max) / 2
- **Prerequisites:** W2.01
- **Misconception:** Using it as a serious measure of centre; it uses only two numbers.
- **Real-world example:** Daily "mean temperature" on many weather sites is actually (high + low)/2.
- **Difficulty tier:** Beginner
- **Game name:** Two-Point Centre
- **Goal:** Place markers on min and max and predict how far the midrange sits from the mean.
- **Interaction:** Tap min and max dots; slider for midrange; then predict whether mean is left/right of it.
- **Data generation:** 10–20 values, 50% with a far outlier.
- **Scoring:** 40 for min/max, 40 closeness (tolerance 0.3 SD), 20 for the direction call.
- **Reveal:** Midrange, mean, median on one axis.
- **Why it works:** Shows the player how little information two points carry.
- **Engine type:** ESTIMATE

### W2.09 Effect of outliers and resistance
- **Name:** Resistance (robustness) to outliers
- **Synonyms/notation:** robust statistic, resistant measure, breakdown point, sensitivity to extremes
- **Definition:** A resistant statistic barely moves when a few values are extreme; the median is resistant, the mean is not.
- **Formula/procedure:** Breakdown point = fraction of data that can be corrupted before the statistic becomes arbitrary (median 50%, mean 0%).
- **Prerequisites:** W2.01, W2.02
- **Misconception:** Deleting outliers automatically; outliers may be the most important data (fraud, rare disease).
- **Real-world example:** Average salary at a startup jumps when the founder's pay is included; the median barely changes.
- **Difficulty tier:** Beginner
- **Game name:** Outlier Tug
- **Goal:** Drag one dot to shift the mean by a target amount without moving the median.
- **Interaction:** Drag any single dot; live read-outs for mean and median; target ΔMean displayed.
- **Data generation:** 9–15 values, odd n; target shift random 0.5–2 SD.
- **Scoring:** 100 if the mean shift is within 10% of target and the median is unchanged; partial credit by closeness.
- **Reveal:** Plot of mean and median as functions of the dragged dot's position (a line vs a flat step).
- **Why it works:** The player personally drags the mean around and feels that the median refuses to follow.
- **Engine type:** BUILD

### W2.10 Choosing a measure of centre
- **Name:** Choosing mean, median or mode
- **Synonyms/notation:** measure of central tendency, measure of location
- **Definition:** Use the mean for symmetric numerical data, the median for skewed data or ordinal data, the mode for categories.
- **Formula/procedure:** Nominal → mode; ordinal → median (mode); numerical symmetric → mean; numerical skewed/outliers → median; growth rates → geometric; rates per unit → harmonic.
- **Prerequisites:** W2.01–W2.09, W1.03–W1.06
- **Misconception:** Thinking there is one "correct" average; the right one depends on data type and question.
- **Real-world example:** A politician quotes mean income (higher) while an opponent quotes median income (lower); both are "the average".
- **Difficulty tier:** Beginner
- **Game name:** Which Average?
- **Goal:** For each scenario, pick the measure that best answers the question asked.
- **Interaction:** Scenario card with a dot plot or category chart; choose mean/median/mode/geometric/harmonic; optionally flip the card to see the data.
- **Data generation:** Scenario templates tagged with the right measure; data generated to match (skewed, symmetric, categorical, growth).
- **Scoring:** 20 per scenario over 5; a second-best answer scores 10.
- **Reveal:** All measures computed for the actual data with a sentence on why the chosen one fits.
- **Why it works:** Judgement is the skill; seeing all measures side by side on real data calibrates it.
- **Engine type:** PICK

### W2.11 Deviations sum to zero
- **Name:** Deviations from the mean
- **Synonyms/notation:** deviation score, xᵢ − x̄, residual from the mean; Σ(xᵢ − x̄) = 0
- **Definition:** Each value's distance from the mean; the positive and negative distances always cancel out exactly.
- **Formula/procedure:** dᵢ = xᵢ − x̄; Σdᵢ = 0 always. This is why spread uses squared or absolute deviations.
- **Prerequisites:** W2.01
- **Misconception:** Proposing "the average deviation" as a spread measure and not noticing it is always zero.
- **Real-world example:** In quality control, the sum of deviations of parts from the batch mean is zero by construction, so inspectors track squared deviations instead.
- **Difficulty tier:** Beginner
- **Game name:** Zero Sum Shore
- **Goal:** Add a final dot so the deviations balance to zero, then predict the "average deviation".
- **Interaction:** Four dots and their deviation arrows are shown; drag the fifth dot; arrows update; submit; then type what Σd is.
- **Data generation:** Four random values; the fifth must be placed at 5·x̄_target − Σ of four, where x̄_target is given.
- **Scoring:** 70 for placing within tolerance; 30 for answering zero.
- **Reveal:** Arrows stack head-to-tail to length zero; teaser: "so we square them next".
- **Why it works:** Sets up the motivation for variance in W3.
- **Engine type:** BUILD

---

## World 3 — Spread Shores (Beginner → Intermediate)

Theme: tide pools of varying width; the player measures how far the water reaches.

### W3.01 Range
- **Name:** Range
- **Synonyms/notation:** max − min, R
- **Definition:** The distance between the largest and smallest value.
- **Formula/procedure:** Range = max − min
- **Prerequisites:** W1.07
- **Misconception:** Reporting the range as "12 to 48" (that's the interval) instead of 36; or thinking it describes the middle of the data.
- **Real-world example:** Temperature range in a day matters more to a greenhouse grower than the mean.
- **Difficulty tier:** Beginner
- **Game name:** Stretch Guess
- **Goal:** Guess the range of a dot plot before the axis labels appear.
- **Interaction:** Dots shown on an unlabelled axis with only a scale bar; set the range with a slider; then axis labels appear.
- **Data generation:** 10–40 values; 25% with a lone outlier.
- **Scoring:** Closeness (tolerance 20% of true range).
- **Reveal:** Min and max circled, the span drawn, with the note that one point changed everything when an outlier exists.
- **Why it works:** Fast calibration of eye vs number, and the outlier cases show range's fragility.
- **Engine type:** ESTIMATE

### W3.02 Mean absolute deviation
- **Name:** Mean absolute deviation
- **Synonyms/notation:** MAD (mean), average absolute deviation, Σ|xᵢ − x̄|/n
- **Definition:** The average distance of values from the mean, ignoring direction.
- **Formula/procedure:** MAD = Σ|xᵢ − x̄| / n
- **Prerequisites:** W2.11
- **Misconception:** Confusing it with the *median* absolute deviation (W3.09), also abbreviated MAD.
- **Real-world example:** Forecast accuracy in supply chains is often reported as mean absolute error, the same idea applied to predictions.
- **Difficulty tier:** Beginner
- **Game name:** Average Distance
- **Goal:** Guess the typical distance of a dot from the mean.
- **Interaction:** Mean is marked; drag a bracket out from the mean until it looks like the average gap; submit.
- **Data generation:** 8–20 values from random distribution.
- **Scoring:** Closeness (tolerance 30% of true MAD).
- **Reveal:** All deviation arrows laid end to end and divided by n.
- **Why it works:** The arrows-laid-end-to-end image is the formula.
- **Engine type:** ESTIMATE

### W3.03 Variance
- **Name:** Variance
- **Synonyms/notation:** s² (sample), σ² (population), Var(X), mean squared deviation
- **Definition:** The average of the squared distances from the mean; a spread measure in squared units.
- **Formula/procedure:** σ² = Σ(xᵢ − μ)²/N; s² = Σ(xᵢ − x̄)²/(n − 1)
- **Prerequisites:** W2.11, W1.15
- **Misconception:** Reporting variance as if it were in the original units (it's in units²), or forgetting to square.
- **Real-world example:** Portfolio variance is the standard risk measure in finance.
- **Difficulty tier:** Beginner
- **Game name:** Square Patch
- **Goal:** Guess the average area of the squares drawn on each deviation.
- **Interaction:** Each deviation becomes a literal square on screen; drag a single "average square" to match the mean area.
- **Data generation:** 6–12 values, integers for clean squares.
- **Scoring:** Closeness (tolerance 30%).
- **Reveal:** Squares tile into one rectangle of total area Σd², then split into n equal squares; the side of each is the SD.
- **Why it works:** Variance as area and SD as side length makes the square/root relationship geometric.
- **Engine type:** ESTIMATE

### W3.04 Standard deviation
- **Name:** Standard deviation
- **Synonyms/notation:** SD, s (sample), σ (population, sigma), √variance, root mean square deviation
- **Definition:** A typical distance of values from the mean, in the original units.
- **Formula/procedure:** s = √[Σ(xᵢ − x̄)²/(n − 1)]
- **Prerequisites:** W3.03
- **Misconception:** Thinking SD is the maximum distance, or that "1 SD" always contains 68% of data (only for roughly normal data).
- **Real-world example:** Exam standardisation, manufacturing tolerances, and "sigma" quality levels.
- **Difficulty tier:** Beginner
- **Game name:** Ruler of Spread
- **Goal:** Set a ruler either side of the mean to the SD.
- **Interaction:** Symmetric slider; dots within ±1 ruler-length light up; submit.
- **Data generation:** 15–50 values from normal, uniform or skewed distributions.
- **Scoring:** Closeness (tolerance 25% of SD).
- **Reveal:** True SD with the computed formula and the percentage of dots inside ±1 SD (varies by shape, foreshadowing 68%).
- **Why it works:** Repeated eye calibration builds the "typical distance" sense that formulas can't.
- **Engine type:** ESTIMATE

### W3.05 Why n − 1 (Bessel's correction)
- **Name:** Bessel's correction
- **Synonyms/notation:** n − 1, degrees of freedom (df), unbiased sample variance
- **Definition:** Dividing by n − 1 instead of n when computing sample variance, because the sample mean sits closer to the sample than the true mean does.
- **Formula/procedure:** s² = Σ(xᵢ − x̄)²/(n − 1); one degree of freedom is "used up" estimating x̄.
- **Prerequisites:** W3.03, W1.09
- **Misconception:** Thinking n − 1 is a hack; it exactly corrects the downward bias of the n version.
- **Real-world example:** Calculators and spreadsheets offer STDEV.S and STDEV.P; picking the wrong one biases quality reports.
- **Difficulty tier:** Intermediate
- **Game name:** Minus One Mystery
- **Goal:** Find which divisor (n or n − 1) gives sample variances that average out to the true population variance.
- **Interaction:** Press "Draw sample of 5" repeatedly; two running averages (÷n and ÷n−1) build up; after 30 draws, bet on which matches σ².
- **Data generation:** Population of 1,000 values with known σ²; samples of n = 3–8.
- **Scoring:** 50 for the correct bet; 50 × closeness of a pre-bet guess of how far ÷n falls short (tolerance 15%).
- **Reveal:** Both running averages converge: ÷n to (n−1)/n × σ², ÷(n−1) to σ².
- **Why it works:** The bias is seen empirically before any algebra is offered.
- **Engine type:** SAMPLER

### W3.06 Percentiles
- **Name:** Percentile
- **Synonyms/notation:** percentile rank, Pₖ, kth percentile, quantile, decile
- **Definition:** The value below which k% of the data fall.
- **Formula/procedure:** Sort; position = k/100 × (n + 1) (one of several conventions); interpolate if needed. Percentile rank of x = % of values below x.
- **Prerequisites:** W2.02
- **Misconception:** Confusing a percentile (a value) with a percentage score (90th percentile ≠ scored 90%).
- **Real-world example:** Children's growth charts place a child at the 40th percentile for height.
- **Difficulty tier:** Beginner
- **Game name:** Where Do I Rank?
- **Goal:** Place a highlighted dot's percentile rank, then find the value at a requested percentile.
- **Interaction:** Round 1: slider 0–100 for the rank of the glowing dot. Round 2: drag a marker to the value at the Pₖ asked for.
- **Data generation:** 20–100 values; random k.
- **Scoring:** Closeness, tolerance 8 percentile points / 0.25 SD.
- **Reveal:** Sorted dots with the cut shown and the count below it.
- **Why it works:** Doing both directions (value→rank, rank→value) prevents the common one-way understanding.
- **Engine type:** ESTIMATE

### W3.07 Quartiles and the five-number summary
- **Name:** Quartiles
- **Synonyms/notation:** Q1 (25th), Q2 (median), Q3 (75th); five-number summary: min, Q1, median, Q3, max
- **Definition:** The three values that split sorted data into four equal-sized groups.
- **Formula/procedure:** Median of the lower half = Q1; median of upper half = Q3 (conventions differ on including the median).
- **Prerequisites:** W3.06
- **Misconception:** Thinking the quartiles split the *range* into four equal lengths rather than the *count*.
- **Real-world example:** Income quartiles in economics reports; top-quartile fund performance.
- **Difficulty tier:** Beginner
- **Game name:** Quarter Cutter
- **Goal:** Drop three cutters so each of the four segments holds the same number of dots.
- **Interaction:** Drag three bars across a dot plot; segment counts shown live.
- **Data generation:** n divisible by 4 (12–40), random distribution.
- **Scoring:** 100 − 10 × Σ|count − n/4|.
- **Reveal:** Five-number summary table; a box plot drawn from it (teaser for W3.16).
- **Why it works:** Equal counts, not equal lengths, is drilled visually on skewed data.
- **Engine type:** BUILD

### W3.08 Interquartile range
- **Name:** Interquartile range
- **Synonyms/notation:** IQR, Q3 − Q1, midspread, H-spread
- **Definition:** The width of the middle 50% of the data; a spread measure immune to extreme values.
- **Formula/procedure:** IQR = Q3 − Q1
- **Prerequisites:** W3.07
- **Misconception:** Reading the IQR as the range of the whole box plot including whiskers.
- **Real-world example:** Salary ranges in job adverts often quote the IQR ("most earn between…").
- **Difficulty tier:** Beginner
- **Game name:** Middle Half
- **Goal:** Drag a window to cover exactly the middle 50% of dots, and read off its width.
- **Interaction:** A resizable window; counter shows dots inside and the number excluded on each side.
- **Data generation:** 20–60 values, 40% with outliers.
- **Scoring:** Closeness of window edges to Q1 and Q3 (tolerance 0.15 IQR each).
- **Reveal:** IQR printed; range printed; the outlier cases show range doubling while IQR stays put.
- **Why it works:** Direct contrast with range teaches resistance.
- **Engine type:** ESTIMATE

### W3.09 Median absolute deviation
- **Name:** Median absolute deviation
- **Synonyms/notation:** MAD (median), robust SD ≈ 1.4826 × MAD
- **Definition:** The median of the distances from the median; a robust stand-in for the SD.
- **Formula/procedure:** MAD = median(|xᵢ − median(x)|); for normal data SD ≈ 1.4826 × MAD.
- **Prerequisites:** W3.02, W2.09
- **Misconception:** Mixing it up with mean absolute deviation; or forgetting the 1.4826 scaling when comparing to SD.
- **Real-world example:** Outlier detection in sensor data uses MAD because one broken sensor would blow up the SD.
- **Difficulty tier:** Intermediate
- **Game name:** Robust Ruler
- **Goal:** Estimate the SD and the MAD of the same data before and after an outlier is injected.
- **Interaction:** Two sliders (SD, MAD); press "Inject outlier"; re-estimate both.
- **Data generation:** 15–30 normal values; the outlier is 6–10 SD away.
- **Scoring:** Closeness on four estimates (tolerance 30%).
- **Reveal:** SD jumps, MAD barely moves; both formulas shown with numbers.
- **Why it works:** The before/after contrast is the whole point of robustness.
- **Engine type:** ESTIMATE

### W3.10 Coefficient of variation
- **Name:** Coefficient of variation
- **Synonyms/notation:** CV, relative standard deviation (RSD), s/x̄, often as %
- **Definition:** The SD as a fraction of the mean, letting you compare spread between things measured on different scales.
- **Formula/procedure:** CV = s / x̄ (× 100 for %). Only for ratio-scale data with positive mean.
- **Prerequisites:** W3.04, W1.06
- **Misconception:** Using CV on interval data such as temperature in °C, where the mean's zero is arbitrary.
- **Real-world example:** Comparing the consistency of a lab assay measured in ng/mL with one measured in mmol/L.
- **Difficulty tier:** Intermediate
- **Game name:** Relative Rumble
- **Goal:** Decide which of two datasets on different scales is relatively more variable.
- **Interaction:** Two dot plots (e.g. elephant weights in kg, mouse weights in g); tap the more variable one; then slider for each CV.
- **Data generation:** Two random means (differing by 10–1000×) with random CVs 5–60%.
- **Scoring:** 40 for the right pick, 60 closeness on CVs (tolerance 10 points).
- **Reveal:** SDs (misleading) vs CVs (fair comparison) in a table.
- **Why it works:** Raw SD visibly fools the eye; CV corrects it.
- **Engine type:** PICK

### W3.11 z-score
- **Name:** z-score
- **Synonyms/notation:** standard score, standardised value, z = (x − μ)/σ
- **Definition:** How many standard deviations a value is above (positive) or below (negative) the mean.
- **Formula/procedure:** z = (x − x̄)/s. Mean of z-scores is 0, SD is 1.
- **Prerequisites:** W3.04
- **Misconception:** Thinking a z-score is a percentile; z = 2 is not "the 2nd" anything, and it maps to a percentile only for a known distribution shape.
- **Real-world example:** Bone-density T-scores for osteoporosis diagnosis are z-scores against young-adult norms.
- **Difficulty tier:** Beginner
- **Game name:** How Many Sigmas?
- **Goal:** Guess the z-score of a highlighted dot.
- **Interaction:** Mean and SD shown as a ruler; drag a slider for z; the dot's position in SD units is hidden until submit.
- **Data generation:** Random dataset; pick a dot from the tails 50% of the time; also "reverse" rounds: given z, place the dot.
- **Scoring:** Closeness (tolerance 0.4 z).
- **Reveal:** (x − x̄)/s computed; the axis relabelled in z units.
- **Why it works:** Re-labelling the axis in SD units is the whole idea of standardisation.
- **Engine type:** ESTIMATE

### W3.12 Standardisation and comparing across scales
- **Name:** Standardisation
- **Synonyms/notation:** standardising, normalising (ambiguous), rescaling to z, comparing apples with oranges
- **Definition:** Converting different measurements to z-scores so they can be compared on the same footing.
- **Formula/procedure:** Compute z for each value within its own distribution; compare the z's.
- **Prerequisites:** W3.11
- **Misconception:** Comparing raw scores from tests with different means/SDs; or assuming equal z means equal percentile when shapes differ.
- **Real-world example:** Deciding whether a 1250 SAT or a 28 ACT is the stronger score.
- **Difficulty tier:** Beginner
- **Game name:** Who Did Better?
- **Goal:** Pick which of two athletes/students performed better relative to their own group.
- **Interaction:** Two cards (score, group mean, group SD); tap the winner; then set sliders for both z's.
- **Data generation:** Random means/SDs; the raw-score winner is the z-score loser 50% of the time.
- **Scoring:** 40 for the pick, 60 closeness on z's.
- **Reveal:** Both scores plotted on a single z axis.
- **Why it works:** Designing half the rounds as raw-vs-standardised reversals forces the learner to standardise.
- **Engine type:** PICK

### W3.13 Skewness
- **Name:** Skewness
- **Synonyms/notation:** skew, right/positive skew, left/negative skew, asymmetry, γ₁, Pearson's skewness 3(mean − median)/SD
- **Definition:** Lopsidedness: a long tail to the right is positive skew, to the left is negative skew.
- **Formula/procedure:** γ₁ = Σ(xᵢ − x̄)³ / (n·s³). Rule of thumb: right skew ⇒ mean > median.
- **Prerequisites:** W2.01, W2.02, W3.04
- **Misconception:** Naming the skew by where the *hump* is rather than where the *tail* is.
- **Real-world example:** Income, house prices and hospital stays are right-skewed; exam scores on easy tests are left-skewed.
- **Difficulty tier:** Beginner
- **Game name:** Tail Tailor
- **Goal:** Drag histogram bars to build a distribution with the requested skew and the requested mean–median gap.
- **Interaction:** Raise/lower 10 bars; live mean and median markers; target e.g. "right skew, mean − median ≈ +1.5".
- **Data generation:** Random target sign and gap; random starting histogram.
- **Scoring:** 50 for correct sign of skewness; 50 closeness on gap (tolerance 0.5).
- **Reveal:** Skewness coefficient computed; tail labelled; mean pulled toward the tail animation.
- **Why it works:** Building the shape yourself fixes the tail-vs-hump confusion.
- **Engine type:** BUILD

### W3.14 Kurtosis
- **Name:** Kurtosis
- **Synonyms/notation:** excess kurtosis, γ₂, heavy/fat tails (leptokurtic), light tails (platykurtic), mesokurtic (normal = 0 excess)
- **Definition:** How heavy the tails are: high kurtosis means extreme values happen more often than a normal distribution predicts.
- **Formula/procedure:** γ₂ = Σ(xᵢ − x̄)⁴/(n·s⁴) − 3
- **Prerequisites:** W3.13
- **Misconception:** Thinking kurtosis is about "peakedness"; it's dominated by the tails.
- **Real-world example:** Stock returns have heavy tails: crashes happen far more often than a normal model says.
- **Difficulty tier:** Intermediate
- **Game name:** Tails & Peaks
- **Goal:** Pick which of three distributions has the heaviest tails, judged by its most extreme z-scores.
- **Interaction:** Three dot plots with the same SD; tap the heaviest-tailed; optional "show |z| > 3 count" button costs points.
- **Data generation:** Samples from normal, t(3), and uniform, rescaled to equal SD.
- **Scoring:** 100 if right, 50 if used the hint.
- **Reveal:** Excess kurtosis of each; count of |z| > 3 in each.
- **Why it works:** Comparing at equal SD isolates tail weight from spread.
- **Engine type:** PICK

### W3.15 Outliers and the 1.5 × IQR rule
- **Name:** Outlier
- **Synonyms/notation:** extreme value, anomaly, 1.5 × IQR fence, Tukey's fences, |z| > 3 rule
- **Definition:** A value far from the rest; one common rule flags anything more than 1.5 IQRs beyond the quartiles.
- **Formula/procedure:** Lower fence = Q1 − 1.5·IQR; upper fence = Q3 + 1.5·IQR. Values outside are outliers (3 × IQR = "far out").
- **Prerequisites:** W3.08
- **Misconception:** Removing outliers because they're inconvenient; the right action depends on whether they're errors or real.
- **Real-world example:** A credit-card transaction 20× the customer's usual spend is flagged for fraud review.
- **Difficulty tier:** Beginner
- **Game name:** Fence Builder
- **Goal:** Place the two fences from Q1, Q3 and IQR, then flag every outlier.
- **Interaction:** Q1 and Q3 marked; drag fence lines; tap dots you think are outside; submit.
- **Data generation:** 20–50 values with 0–4 injected outliers; 20% contain zero outliers.
- **Scoring:** 40 for fences within 0.2 IQR; 60 × (correct flags − wrong flags)/true outliers (min 0; full marks for correctly flagging none).
- **Reveal:** Box plot with fences and whiskers; a prompt "error or real?" with the scenario's answer.
- **Why it works:** Includes zero-outlier rounds so the player learns not to always find something.
- **Engine type:** BUILD

### W3.16 Box plot
- **Name:** Box plot
- **Synonyms/notation:** box-and-whisker plot, Tukey box plot
- **Definition:** A picture of the five-number summary: a box from Q1 to Q3 with a line at the median and whiskers to the last non-outlier values.
- **Formula/procedure:** Box = Q1..Q3; line = median; whiskers extend to the furthest values within the fences; outliers drawn as points.
- **Prerequisites:** W3.07, W3.15
- **Misconception:** Reading a longer box section as "more data" (each section holds 25% regardless of length) or whiskers as the range.
- **Real-world example:** Side-by-side box plots comparing delivery times across couriers.
- **Difficulty tier:** Beginner
- **Game name:** Box Match
- **Goal:** Match each histogram to its box plot.
- **Interaction:** Drag three histograms onto three box plots; ties lock when matched.
- **Data generation:** Three datasets of contrasting skew/outlier structure drawn randomly; render both views.
- **Scoring:** 33 per correct match; −15 per wrong attempt.
- **Reveal:** The matched pairs overlay with quartile lines passing through both.
- **Why it works:** Translating between shapes builds the mental conversion from box to distribution.
- **Engine type:** MATCH

### W3.17 Histogram and bin width
- **Name:** Histogram
- **Synonyms/notation:** frequency histogram, density histogram, bins/classes, bin width, class interval
- **Definition:** A bar chart for numerical data where each bar counts values in a range; bars touch because the data are continuous.
- **Formula/procedure:** Choose bin width w; count values in each bin; height = count (or count/(n·w) for density). Rules of thumb: Sturges k = 1 + log₂n; Freedman–Diaconis w = 2·IQR/n^(1/3).
- **Prerequisites:** W1.14, W1.07
- **Misconception:** Treating a histogram like a bar chart (reordering bins) or believing the shape is independent of bin width.
- **Real-world example:** Age distribution of a country's population; "population pyramids" are paired histograms.
- **Difficulty tier:** Beginner
- **Game name:** Bin There
- **Goal:** Slide the bin width to find the setting that reveals the true shape (hidden bimodality, etc.).
- **Interaction:** Bin-width slider; press "Lock" when you think the shape is revealed; then answer "how many peaks?"
- **Data generation:** Mixture of 1–3 normal components; starting bin width deliberately too wide or too narrow.
- **Scoring:** 60 for correct peak count; 40 for locking within the "good" width band (0.5–2× Freedman–Diaconis).
- **Reveal:** The underlying density curve overlaid; too-narrow and too-wide versions side by side.
- **Why it works:** Playing with width shows that the picture is a choice, not a fact.
- **Engine type:** BUILD

### W3.18 Stem-and-leaf plot
- **Name:** Stem-and-leaf plot
- **Synonyms/notation:** stemplot, stem and leaf display, back-to-back stemplot
- **Definition:** A histogram built from the digits themselves: the leading digit is the stem, the last digit is a leaf.
- **Formula/procedure:** Split each value into stem (all but last digit) and leaf (last digit); list leaves in order beside each stem; add a key.
- **Prerequisites:** W3.17
- **Misconception:** Forgetting to sort leaves or to include empty stems, which hides gaps.
- **Real-world example:** Quick hand analysis of 30 test scores in a classroom with no computer.
- **Difficulty tier:** Beginner
- **Game name:** Leaf Sorter
- **Goal:** Drag leaves onto the right stems in order.
- **Interaction:** A pile of two-digit numbers becomes leaf tiles; drag to stems; empty stems must be kept.
- **Data generation:** 15–25 two-digit values with at least one empty stem.
- **Scoring:** 100 × correct placements, −10 if an empty stem is deleted.
- **Reveal:** Rotated 90° to show it is a histogram; median leaf highlighted.
- **Why it works:** The rotation reveal links stemplots to histograms and medians.
- **Engine type:** BUILD

### W3.19 Dot plot, bar chart and when to use which chart
- **Name:** Basic chart types
- **Synonyms/notation:** dot plot (strip plot), bar chart (bar graph), histogram, pie chart, line chart
- **Definition:** Bar charts show counts per category; histograms show the shape of numerical data; dot plots show every value; line charts show change over time.
- **Formula/procedure:** Categorical → bar/pie; numerical distribution → histogram/dot/box; time → line; two numerical → scatter.
- **Prerequisites:** W3.17, W1.02
- **Misconception:** Using a line chart for categories (implying a trend between "Apples" and "Bananas") or a pie chart for more than ~5 slices.
- **Real-world example:** A newspaper showing a line chart of party vote share across unrelated countries.
- **Difficulty tier:** Beginner
- **Game name:** Chart Chooser
- **Goal:** For each dataset description, pick the chart that fits and reject the ones that mislead.
- **Interaction:** Data card; four chart thumbnails rendered from the actual data; tap the best; tap any that are actively misleading.
- **Data generation:** Random variable type and random data; thumbnails generated live.
- **Scoring:** 60 best choice, 40 for correctly flagging misleading ones.
- **Reveal:** Short reason per chart.
- **Why it works:** Seeing the wrong chart drawn from real data makes the problem obvious.
- **Engine type:** PICK

### W3.20 Cumulative frequency and the ogive
- **Name:** Cumulative frequency curve
- **Synonyms/notation:** ogive, cumulative distribution plot, empirical CDF (ECDF)
- **Definition:** A rising curve showing how many (or what fraction of) values are at or below each point.
- **Formula/procedure:** Sort; plot (value, count ≤ value)/n; percentiles are read by going across from the y-axis and down.
- **Prerequisites:** W3.06
- **Misconception:** Reading the slope as frequency (steep = many values there) is correct, but learners often read the height as frequency instead.
- **Real-world example:** "What share of deliveries arrive within 2 days?" is read straight off an ECDF.
- **Difficulty tier:** Intermediate
- **Game name:** Climb the Curve
- **Goal:** Read a percentile from an ECDF, then draw the ECDF of a small dataset.
- **Interaction:** Round 1: click the point on the curve for P70. Round 2: tap dots on a number line in order; the step curve draws.
- **Data generation:** 20–200 values; random k.
- **Scoring:** 50 closeness (tolerance 5 percentile points), 50 for correct step heights.
- **Reveal:** Histogram shown under the ECDF with slope ↔ bar height linked.
- **Why it works:** Bridges to CDFs in World 5.
- **Engine type:** ESTIMATE

### W3.21 Modality
- **Name:** Modality
- **Synonyms/notation:** unimodal, bimodal, multimodal, mixture
- **Definition:** The number of distinct humps in a distribution; two humps usually mean two hidden groups mixed together.
- **Formula/procedure:** Inspect histogram/density at sensible bin width; consider splitting by a grouping variable.
- **Prerequisites:** W3.17, W2.03
- **Misconception:** Reporting the mean of bimodal data as "typical" when almost no case is near it.
- **Real-world example:** Restaurant arrival times peak at lunch and dinner; a mean of 3:30 pm describes nobody.
- **Difficulty tier:** Beginner
- **Game name:** Hidden Tribes
- **Goal:** Guess how many groups are mixed in the data and where their centres are.
- **Interaction:** Choose 1–3; drag that many markers to the centres; submit.
- **Data generation:** Mixture of 1–3 normals with random weights and separation.
- **Scoring:** 50 for count, 50 closeness of markers (tolerance 0.5 within-group SD).
- **Reveal:** Colour the dots by true group; show each group's mean and the overall mean.
- **Why it works:** Colouring by group turns an abstract "mixture" into a visible reality.
- **Engine type:** ESTIMATE

### W3.22 Chebyshev's inequality
- **Name:** Chebyshev's inequality
- **Synonyms/notation:** Chebyshev's theorem, 1 − 1/k² rule
- **Definition:** For any distribution at all, at least 1 − 1/k² of values lie within k SDs of the mean.
- **Formula/procedure:** P(|X − μ| ≥ kσ) ≤ 1/k²; e.g. at least 75% within 2 SD, 89% within 3 SD.
- **Prerequisites:** W3.04
- **Misconception:** Applying the 68-95-99.7 rule to non-normal data; Chebyshev is the shape-free fallback.
- **Real-world example:** Guaranteeing a service-level bound when you only know a process's mean and SD.
- **Difficulty tier:** Intermediate
- **Game name:** Worst-Case Fence
- **Goal:** Set the minimum guaranteed proportion inside ±k SD for a weird-shaped dataset, then test it.
- **Interaction:** k slider; type guaranteed %; press "Test on 5 strange distributions".
- **Data generation:** Five adversarial distributions (two-point, heavy-tailed, uniform, etc.) with equal SD.
- **Scoring:** 100 if the stated guarantee is ≤ 1 − 1/k² and ≥ 1 − 1/k² − 10 points; otherwise scaled.
- **Reveal:** Actual proportions for each distribution all ≥ the bound; the two-point distribution attains it.
- **Why it works:** Seeing the bound touched by the two-point case shows it's tight, not arbitrary.
- **Engine type:** ESTIMATE

### W3.23 Choosing a measure of spread
- **Name:** Choosing a measure of spread
- **Synonyms/notation:** dispersion, variability, measure of scale
- **Definition:** Pair the spread measure with the centre: SD with mean, IQR with median, MAD for robustness, CV for comparing scales.
- **Formula/procedure:** Symmetric → mean ± SD; skewed/outliers → median & IQR; comparing scales → CV; ordinal → IQR only.
- **Prerequisites:** W3.01–W3.10, W2.10
- **Misconception:** Reporting "mean ± SD" for skewed data, which can imply impossible negative values.
- **Real-world example:** Hospital length-of-stay reported as median (IQR) in medical papers because of long-stay outliers.
- **Difficulty tier:** Intermediate
- **Game name:** Summary Builder
- **Goal:** Assemble a one-line summary (centre + spread) that a reviewer would accept.
- **Interaction:** Drag a centre chip and a spread chip into a sentence; a data plot shows the shape.
- **Data generation:** Random shape (symmetric, skewed, ordinal, with outliers).
- **Scoring:** 50 per correct chip; 30 for an acceptable alternative.
- **Reveal:** The summary rendered as text plus the picture it implies (e.g. mean ± SD bars extending below zero).
- **Why it works:** Seeing the implied picture of a wrong summary teaches consequences.
- **Engine type:** PICK

---

## World 4 — Probability Peninsula (Beginner → Intermediate)

Theme: a casino-free carnival of dice, spinners and urns; every game is "predict, then watch".

### W4.01 Sample space and outcomes
- **Name:** Sample space
- **Synonyms/notation:** S, Ω, outcome space, elementary outcome, equally likely outcomes
- **Definition:** The list of every possible result of a random process.
- **Formula/procedure:** Enumerate systematically (table, tree, grid). For two dice: 36 ordered pairs.
- **Prerequisites:** —
- **Misconception:** Listing unordered outcomes ({1,2} once) and treating them as equally likely; (1,2) and (2,1) are separate outcomes.
- **Real-world example:** Lottery design starts by counting the sample space to set the odds.
- **Difficulty tier:** Beginner
- **Game name:** List Every Outcome
- **Goal:** Fill the whole outcome grid for a two-step experiment.
- **Interaction:** A grid appears (e.g. 6×6 for two dice, 2×2×2 for three coins as a tree); tap cells to mark them; submit when you think the space is complete.
- **Data generation:** Random experiment from a pool (dice, coins, spinner with k sectors, drawing coloured balls); dimension 2–3.
- **Scoring:** 100 × marked-correct / total − 10 per spurious outcome.
- **Reveal:** Count of outcomes and the "ordered pairs" note where relevant.
- **Why it works:** Enumeration by hand is the root of every counting-based probability.
- **Engine type:** BUILD

### W4.02 Events and classical probability
- **Name:** Event and probability
- **Synonyms/notation:** P(A), event A, favourable outcomes, classical/theoretical probability, relative-frequency (empirical) probability, subjective probability
- **Definition:** An event is a set of outcomes; its probability (with equally likely outcomes) is the share of the sample space it covers.
- **Formula/procedure:** P(A) = (number of outcomes in A)/(total outcomes); 0 ≤ P ≤ 1; P(S) = 1.
- **Prerequisites:** W4.01
- **Misconception:** Using the classical formula when outcomes aren't equally likely ("either it rains or it doesn't, so 50%").
- **Real-world example:** Probability of rolling a total of 7 with two dice = 6/36.
- **Difficulty tier:** Beginner
- **Game name:** Shade the Space
- **Goal:** Shade the outcomes that make the event true, then state the probability.
- **Interaction:** Grid of outcomes; tap to shade; fraction slider; submit.
- **Data generation:** Random event template ("sum ≥ 9", "at least one head", "same colour twice") over the random space.
- **Scoring:** 50 shading accuracy, 50 closeness of probability (tolerance 0.05).
- **Reveal:** Shaded count / total written as a fraction and decimal; empirical frequency from 1,000 simulated trials shown beside.
- **Why it works:** Puts theoretical and empirical probability side by side from the start.
- **Engine type:** ESTIMATE

### W4.03 Complement rule
- **Name:** Complement
- **Synonyms/notation:** Aᶜ, A′, "not A", P(not A) = 1 − P(A), "at least one"
- **Definition:** The probability something doesn't happen is one minus the probability it does.
- **Formula/procedure:** P(Aᶜ) = 1 − P(A). "At least one success in n tries" = 1 − P(no successes).
- **Prerequisites:** W4.02
- **Misconception:** Computing "at least one" by adding single-trial probabilities (3 tries at 1/6 is not 50%).
- **Real-world example:** The chance that at least one of 20 components fails this year.
- **Difficulty tier:** Beginner
- **Game name:** At Least One
- **Goal:** Predict the chance of at least one success in n tries, then run it.
- **Interaction:** Slider for prediction; "Run 500" button; convergence bar.
- **Data generation:** Random single-trial p (0.05–0.5) and n (2–10).
- **Scoring:** Closeness (tolerance 0.1) of the prediction to the true 1 − (1−p)ⁿ.
- **Reveal:** The naive sum n·p shown exceeding 1 for large n; the complement calculation stepwise.
- **Why it works:** The naive answer breaks visibly (probabilities above 1), so the complement trick is remembered.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W4.04 Mutually exclusive events and the addition rule
- **Name:** Addition rule (disjoint)
- **Synonyms/notation:** mutually exclusive, disjoint, P(A or B) = P(A) + P(B), union, A ∪ B
- **Definition:** If two events can't both happen, the chance of either is the sum of their chances.
- **Formula/procedure:** P(A ∪ B) = P(A) + P(B) when A ∩ B = ∅.
- **Prerequisites:** W4.02
- **Misconception:** Adding probabilities of events that can overlap.
- **Real-world example:** A customer picks exactly one plan: P(Basic or Pro) = P(Basic) + P(Pro).
- **Difficulty tier:** Beginner
- **Game name:** Venn Vault
- **Goal:** Arrange two circles in a Venn diagram to match the described relationship, then compute P(A or B).
- **Interaction:** Drag circles (overlap changes area); input probability.
- **Data generation:** Random P(A), P(B) and a flag for disjoint vs overlapping.
- **Scoring:** 50 for correct overlap state; 50 closeness (tolerance 0.05).
- **Reveal:** Shaded union area with its numeric value.
- **Why it works:** Area as probability makes "no double counting" visual.
- **Engine type:** BUILD

### W4.05 General addition rule
- **Name:** General addition rule
- **Synonyms/notation:** inclusion–exclusion, P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
- **Definition:** When events can overlap, add their chances then subtract the overlap so it isn't counted twice.
- **Formula/procedure:** P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
- **Prerequisites:** W4.04
- **Misconception:** Forgetting the subtraction, giving probabilities above 1.
- **Real-world example:** Share of customers who use the app or the website, when many use both.
- **Difficulty tier:** Beginner
- **Game name:** Double Count
- **Goal:** From a two-way table, compute P(A or B) without double counting.
- **Interaction:** Tap cells of a 2×2 count table that belong to A ∪ B; cells can be tapped twice by mistake (they glow red); submit.
- **Data generation:** Random 2×2 counts summing to 100.
- **Scoring:** 100 if exact; −25 per double-counted cell.
- **Reveal:** The formula with numbers, the overlap cell highlighted.
- **Why it works:** The physical double-tap mirrors the arithmetic error.
- **Engine type:** BUILD

### W4.06 Independence
- **Name:** Independent events
- **Synonyms/notation:** independence, P(A ∩ B) = P(A)P(B), P(A|B) = P(A)
- **Definition:** Two events are independent when knowing one happened tells you nothing about the other.
- **Formula/procedure:** Check P(A and B) = P(A) × P(B), or equivalently P(A|B) = P(A).
- **Prerequisites:** W4.02
- **Misconception:** Confusing independent with mutually exclusive (disjoint events are strongly dependent: if one happens the other can't).
- **Real-world example:** Two unrelated components failing; but two components sharing a power supply are not independent.
- **Difficulty tier:** Beginner
- **Game name:** Coin Memory
- **Goal:** Predict whether the chance of heads changes after a run of five heads, then test it.
- **Interaction:** Slider for P(heads next | five heads); "Flip 10,000 sequences" button filters to those starting with five heads and shows the next-flip proportion.
- **Data generation:** Fair coin by default; 30% of rounds use a hidden biased coin so independence still holds but p ≠ 0.5.
- **Scoring:** Closeness (tolerance 0.07).
- **Reveal:** Filtered proportion ≈ p regardless of the run; a 2×2 table of P(A∩B) vs P(A)P(B).
- **Why it works:** Simulation with conditioning kills the "due for tails" intuition.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W4.07 Multiplication rule
- **Name:** Multiplication rule
- **Synonyms/notation:** P(A and B) = P(A)·P(B|A); intersection A ∩ B; joint probability
- **Definition:** The chance both things happen is the chance of the first times the chance of the second given the first.
- **Formula/procedure:** P(A ∩ B) = P(A)·P(B|A); if independent, = P(A)·P(B).
- **Prerequisites:** W4.06
- **Misconception:** Multiplying unconditional probabilities when the second event depends on the first (drawing without replacement).
- **Real-world example:** Chance of passing both interview rounds when the second depends on the first.
- **Difficulty tier:** Beginner
- **Game name:** Chain of Chance
- **Goal:** Predict the probability of a chain of 2–3 events, with and without replacement.
- **Interaction:** Urn shown; toggle "replace / don't replace"; slider prediction; run 2,000 draws.
- **Data generation:** Urn with random composition (5–15 balls, 2–3 colours); chain length 2–3.
- **Scoring:** Closeness (tolerance 0.05).
- **Reveal:** Tree diagram with branch probabilities; the second-stage probabilities change when not replacing.
- **Why it works:** The replace toggle makes the conditional factor visible.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W4.08 Conditional probability
- **Name:** Conditional probability
- **Synonyms/notation:** P(A|B), "probability of A given B", conditioning, restricted sample space
- **Definition:** The chance of A once you know B happened: you shrink the world to the B cases and ask how many are also A.
- **Formula/procedure:** P(A|B) = P(A ∩ B)/P(B)
- **Prerequisites:** W4.07
- **Misconception:** Thinking P(A|B) = P(B|A) (the "inverse fallacy").
- **Real-world example:** Probability a positive test means disease (P(disease|positive)) is very different from P(positive|disease).
- **Difficulty tier:** Beginner
- **Game name:** Given That
- **Goal:** Restrict a population grid to the condition and read off the conditional probability.
- **Interaction:** 10×10 grid of people with two attributes (colour, shape); tap "Given: shape = square" to grey out everyone else; set slider for P(colour | square).
- **Data generation:** Random joint distribution over 2×2 attributes.
- **Scoring:** Closeness (tolerance 0.05); bonus round swaps A and B.
- **Reveal:** Both P(A|B) and P(B|A) shown with their different denominators.
- **Why it works:** Greying out the non-B cases is the definition made visible.
- **Engine type:** ESTIMATE

### W4.09 Joint, marginal and conditional distributions from a table
- **Name:** Two-way table probabilities
- **Synonyms/notation:** contingency table, joint probability, marginal probability (row/column totals), conditional (row %/column %)
- **Definition:** A table of counts for two categorical variables lets you read joint (cell), marginal (totals) and conditional (cell ÷ total) probabilities.
- **Formula/procedure:** Joint = cell/n; marginal = row total/n; conditional on row = cell/row total.
- **Prerequisites:** W4.08, W1.14
- **Misconception:** Dividing by the wrong total (grand vs row vs column).
- **Real-world example:** Vaccination status × infection table in public-health reports.
- **Difficulty tier:** Intermediate
- **Game name:** Table Turner
- **Goal:** Answer a mix of joint, marginal and conditional questions by tapping the numerator and denominator cells.
- **Interaction:** For each question tap the cells that form the numerator, then the cells forming the denominator.
- **Data generation:** Random 2×3 or 3×3 table; 6 questions sampled across the three types.
- **Scoring:** 16 per fully correct question; 8 if numerator right but denominator wrong.
- **Reveal:** Table re-coloured per question with the fraction shown.
- **Why it works:** Forces the "which total?" decision explicitly every time.
- **Engine type:** BUILD

### W4.10 Law of total probability and tree diagrams
- **Name:** Law of total probability
- **Synonyms/notation:** partition, tree diagram, P(B) = Σ P(B|Aᵢ)P(Aᵢ)
- **Definition:** To get the overall chance of B, add up the chance of B along every possible route.
- **Formula/procedure:** P(B) = P(B|A)P(A) + P(B|Aᶜ)P(Aᶜ); multiply along branches, add across branches.
- **Prerequisites:** W4.07
- **Misconception:** Averaging the conditional probabilities without weighting by branch probability.
- **Real-world example:** Overall defect rate when three factories with different defect rates supply different shares.
- **Difficulty tier:** Intermediate
- **Game name:** Tree Totals
- **Goal:** Fill in a probability tree and compute the total probability of the end event.
- **Interaction:** Drag probability chips onto branches; leaf products auto-compute; tap leaves that count toward B; submit sum.
- **Data generation:** 2–3 first-stage branches with random probabilities; random conditional probabilities.
- **Scoring:** 60 for correct branch labels; 40 closeness of final answer (tolerance 0.03).
- **Reveal:** Tree with "multiply along, add across" annotations.
- **Why it works:** Trees are the scaffolding for Bayes next.
- **Engine type:** BUILD

### W4.11 Bayes' theorem
- **Name:** Bayes' theorem
- **Synonyms/notation:** Bayes' rule, P(A|B) = P(B|A)P(A)/P(B), prior, likelihood, posterior, natural frequencies
- **Definition:** A way to flip a conditional probability around, combining how likely the evidence is under each possibility with how common each possibility is to begin with.
- **Formula/procedure:** P(A|B) = P(B|A)·P(A) / [P(B|A)P(A) + P(B|Aᶜ)P(Aᶜ)]. Natural-frequency method: imagine 1,000 people, count.
- **Prerequisites:** W4.10, W4.08
- **Misconception:** Ignoring the base rate: assuming a 99%-accurate test means a positive result is 99% likely to be true.
- **Real-world example:** Mammogram screening: with 1% prevalence, most positive results are false positives.
- **Difficulty tier:** Intermediate
- **Game name:** Test Positive
- **Goal:** Estimate the chance a person with a positive test actually has the condition, then count it out on a 1,000-person grid.
- **Interaction:** Slider guess; then a 1,000-dot grid: drag a divider for prevalence, then for sensitivity among the sick and false-positive rate among the healthy; the positives light up; read off the fraction.
- **Data generation:** Random prevalence (0.1–20%), sensitivity (70–99%), specificity (80–99.5%).
- **Scoring:** 40 closeness of first guess (tolerance 0.15), 60 for correct grid construction.
- **Reveal:** Posterior as a fraction of lit dots; the algebraic Bayes formula with numbers beside it.
- **Why it works:** Natural frequencies are proven to make Bayes intuitive; the grid is that method as a game.
- **Engine type:** BUILD

### W4.12 Base-rate fallacy
- **Name:** Base-rate fallacy
- **Synonyms/notation:** base-rate neglect, prior neglect, false-positive paradox
- **Definition:** Ignoring how rare something is to begin with when judging how likely it is after seeing evidence.
- **Formula/procedure:** Always compute P(cause | evidence) with the prior included (Bayes); compare P(cause) before and after.
- **Prerequisites:** W4.11
- **Misconception:** Believing vivid evidence outweighs any base rate.
- **Real-world example:** Airport security profiling: even a very accurate detector flags mostly innocent travellers because threats are rare.
- **Difficulty tier:** Intermediate
- **Game name:** Rare Alarm
- **Goal:** Rank four scenarios by the true probability the alarm is correct, before seeing any calculation.
- **Interaction:** Drag four scenario cards (varying base rate and accuracy) into order from most to least trustworthy alarm.
- **Data generation:** Four random (prevalence, sensitivity, specificity) triples; ensure the highest-accuracy test is not the most trustworthy.
- **Scoring:** 100 × rank correlation with the true order.
- **Reveal:** Posterior for each with the 1,000-person grids side by side.
- **Why it works:** Ranking forces trade-offs between accuracy and base rate, the heart of the fallacy.
- **Engine type:** DETECTIVE

### W4.13 Random variables
- **Name:** Random variable
- **Synonyms/notation:** X, Y; discrete/continuous random variable; realisation x; support
- **Definition:** A rule that assigns a number to each outcome of a random process, like "the total on two dice".
- **Formula/procedure:** Define X: S → ℝ; list its possible values and their probabilities (its distribution).
- **Prerequisites:** W4.01, W1.07
- **Misconception:** Thinking a random variable is "a variable that's random" rather than a function on outcomes; or confusing X with its observed value x.
- **Real-world example:** Daily number of calls to a help desk; the height of the next customer.
- **Difficulty tier:** Beginner
- **Game name:** Number Machine
- **Goal:** Build the distribution of X by mapping outcomes to numbers.
- **Interaction:** Outcomes of an experiment fall through a machine; type the number X assigns to each (e.g. sum of dice); bars accumulate for each value.
- **Data generation:** Random experiment and random rule ("sum", "max", "number of heads", "difference").
- **Scoring:** 100 × correct mappings.
- **Reveal:** The resulting PMF bar chart with probabilities as fractions.
- **Why it works:** Mapping outcomes to numbers by hand is the definition enacted.
- **Engine type:** BUILD

### W4.14 Expected value
- **Name:** Expected value
- **Synonyms/notation:** E[X], mean of a random variable, μ, expectation, long-run average, Σx·P(x)
- **Definition:** The long-run average value you'd get per play if you repeated the random process forever.
- **Formula/procedure:** E[X] = Σ xᵢ·P(xᵢ) (discrete); ∫x·f(x)dx (continuous). Linearity: E[aX + b] = aE[X] + b.
- **Prerequisites:** W4.13, W2.04
- **Misconception:** Expecting to actually get the expected value on a single play (E of a die is 3.5, which never appears).
- **Real-world example:** Insurance premiums are priced above the expected payout; lottery tickets are priced above the expected prize.
- **Difficulty tier:** Beginner
- **Game name:** Fair Price
- **Goal:** Set the price you'd pay to play a random game so it is fair, then play 200 rounds.
- **Interaction:** Game card shows outcomes and probabilities; bet chips to set a price; "Play 200" animates the bankroll.
- **Data generation:** 3–5 outcomes with random payouts and probabilities.
- **Scoring:** Closeness of price to E[X] (tolerance 15% of E[X]).
- **Reveal:** Σx·P(x) computed; bankroll curve hovering around 0 if priced fairly.
- **Why it works:** Betting makes expected value feel like money, which is how it was invented.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W4.15 Variance and SD of a random variable
- **Name:** Variance of a random variable
- **Synonyms/notation:** Var(X), σ², E[(X − μ)²], E[X²] − μ², SD(X) = σ
- **Definition:** The expected squared distance from the expected value: how much the outcomes scatter around their long-run mean.
- **Formula/procedure:** Var(X) = Σ(x − μ)²P(x) = E[X²] − (E[X])²; Var(aX + b) = a²Var(X); for independent X, Y: Var(X + Y) = Var(X) + Var(Y).
- **Prerequisites:** W4.14, W3.03
- **Misconception:** Thinking SD(X + Y) = SD(X) + SD(Y) (it's the variances that add, and only if independent).
- **Real-world example:** Risk of a two-asset portfolio depends on variances and how they co-move.
- **Difficulty tier:** Intermediate
- **Game name:** Risky Spinner
- **Goal:** Choose between two spinners with the same expected value but different risk, then estimate each SD.
- **Interaction:** Two spinners; pick the "safer"; slider for each SD; "Spin 500" shows scatter of outcomes.
- **Data generation:** Two discrete distributions with equal E[X] and random variances.
- **Scoring:** 30 for safer pick; 70 closeness on SDs (tolerance 25%).
- **Reveal:** Variance formula with numbers; the 500 spins' spread compared.
- **Why it works:** Same mean, different spread isolates variance as the concept.
- **Engine type:** ESTIMATE

### W4.16 Law of large numbers
- **Name:** Law of large numbers
- **Synonyms/notation:** LLN, long-run frequency, convergence of the sample mean, "law of averages" (misnomer)
- **Definition:** As you repeat a random process more and more times, the average result settles down to the expected value.
- **Formula/procedure:** x̄ₙ → μ as n → ∞. Fluctuations shrink roughly like 1/√n.
- **Prerequisites:** W4.14
- **Misconception:** The "law of averages": believing a shortfall of heads must be made up by extra heads soon (it's diluted, not corrected).
- **Real-world example:** Casinos profit reliably over millions of bets despite losing individual ones.
- **Difficulty tier:** Beginner
- **Game name:** Converge Cove
- **Goal:** Predict how many trials it takes for the running mean to stay within a band around the truth, then watch.
- **Interaction:** Choose the band width; slider for n needed; press "Run" to see the running-mean trace.
- **Data generation:** Random distribution (coin, die, skewed payout); run 5,000 trials.
- **Scoring:** Closeness on log scale (within a factor of 2 = full marks).
- **Reveal:** Trace with the band; a second trace of "excess heads" (count difference) that does *not* shrink, to kill the law-of-averages myth.
- **Why it works:** Showing proportions converging while counts don't is the precise correction to the myth.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W4.17 Factorials and permutations
- **Name:** Permutations
- **Synonyms/notation:** n!, nPr = n!/(n − r)!, arrangements, ordered selections
- **Definition:** The number of ways to arrange r things chosen from n when order matters.
- **Formula/procedure:** n! = n × (n − 1) × … × 1; nPr = n!/(n − r)!
- **Prerequisites:** W4.01
- **Misconception:** Using permutations when order doesn't matter (committees), inflating the count.
- **Real-world example:** Number of possible 4-digit PINs with no repeated digit: 10P4 = 5,040.
- **Difficulty tier:** Beginner
- **Game name:** Line Them Up
- **Goal:** Guess how many ways r of n characters can line up, then watch them cycle.
- **Interaction:** Slider on a log scale for the count; "Show me" cycles through arrangements at increasing speed with a counter.
- **Data generation:** n = 3–8, r = 2–n.
- **Scoring:** Closeness on log scale (factor-of-2 tolerance).
- **Reveal:** n × (n−1) × … product shown with the characters.
- **Why it works:** The "slots × remaining" product is seen as characters take positions.
- **Engine type:** BUILD

### W4.18 Combinations
- **Name:** Combinations
- **Synonyms/notation:** nCr, C(n, r), "n choose r", binomial coefficient, (n r)
- **Definition:** The number of ways to choose r things from n when order doesn't matter.
- **Formula/procedure:** nCr = n!/[r!(n − r)!] = nPr / r!
- **Prerequisites:** W4.17
- **Misconception:** Forgetting to divide by r! (counting {A,B} and {B,A} separately).
- **Real-world example:** Lottery odds: 6 from 49 gives 13,983,816 combinations.
- **Difficulty tier:** Beginner
- **Game name:** Pick a Team
- **Goal:** Choose all distinct teams of r from n players without duplicates.
- **Interaction:** Tap players to form a team; submit it; duplicates (same set, different order) are rejected with a buzz; declare "done" when you think all are found.
- **Data generation:** n = 4–6, r = 2–3.
- **Scoring:** 100 × teams found / nCr, −5 per duplicate attempt.
- **Reveal:** nPr / r! computed; Pascal's triangle row highlighted.
- **Why it works:** Rejected duplicates teach the r! division viscerally.
- **Engine type:** BUILD

### W4.19 Odds vs probability
- **Name:** Odds
- **Synonyms/notation:** odds = p/(1 − p), odds for/against, "3 to 1", log-odds (logit), bookmaker odds
- **Definition:** Odds compare the chance of something happening to the chance of it not happening; 75% probability is 3-to-1 odds.
- **Formula/procedure:** odds = p/(1−p); p = odds/(1+odds). Fractional odds "3/1 against" = p of 1/4.
- **Prerequisites:** W4.02
- **Misconception:** Reading "odds of 1 in 5" as odds when it's a probability of 20% (odds 1:4).
- **Real-world example:** Betting markets and logistic-regression coefficients both speak in odds.
- **Difficulty tier:** Beginner
- **Game name:** Odds Converter
- **Goal:** Convert between probability and odds in both directions under time pressure.
- **Interaction:** A dual slider (probability on top, odds on bottom, linked but one hidden); set the hidden one.
- **Data generation:** Random p in (0.02, 0.98) or random odds in (0.05, 50).
- **Scoring:** 10 per conversion within tolerance (5% of value) over 10 rounds.
- **Reveal:** Both scales drawn together showing odds stretch toward infinity as p → 1.
- **Why it works:** The linked slider makes the nonlinearity physical.
- **Engine type:** MATCH

### W4.20 Gambler's fallacy
- **Name:** Gambler's fallacy
- **Synonyms/notation:** Monte Carlo fallacy, "due" fallacy, maturity of chances
- **Definition:** Believing that past independent results change future chances ("red is due after five blacks").
- **Formula/procedure:** For independent trials, P(next) is unchanged by history. Check with a conditional simulation.
- **Prerequisites:** W4.06, W4.16
- **Misconception:** The fallacy itself; also its mirror, the "hot hand" belief in streaks continuing.
- **Real-world example:** Roulette players at Monte Carlo in 1913 lost fortunes betting against a 26-black streak.
- **Difficulty tier:** Beginner
- **Game name:** Due or Not
- **Goal:** Bet chips on the next spin after a long streak, with the payout fixed at fair odds.
- **Interaction:** See a streak; allocate chips between "same again" / "other" / "no bet"; spin; repeat 10 times.
- **Data generation:** Independent fair spins; streak lengths 3–8 (pre-generated).
- **Scoring:** 100 if bankroll variance is minimised by a no-bet or balanced strategy; betting consistently on "due" loses points equal to expected loss.
- **Reveal:** Across 10,000 simulated streaks, the next-outcome frequency after a streak ≈ 50%.
- **Why it works:** The player's own bankroll is the evidence.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W4.21 Randomness looks clumpy (streaks)
- **Name:** Clustering illusion
- **Synonyms/notation:** streaks in random data, hot-hand fallacy, clustering illusion, apophenia
- **Definition:** Truly random sequences contain longer streaks and bigger clumps than people expect.
- **Formula/procedure:** In n fair flips, the longest run is about log₂n; expect ~n/4 runs of length ≥2.
- **Prerequisites:** W4.20
- **Misconception:** Judging a sequence with no long runs as "more random".
- **Real-world example:** Cancer clusters in small towns often arise by chance; fake coin-flip data is caught because it has too few streaks.
- **Difficulty tier:** Intermediate
- **Game name:** Real or Fake Flips
- **Goal:** Tell which of two 100-flip sequences is genuinely random and which was typed by a human.
- **Interaction:** Two strips of H/T; tap the real one; optional "longest run" overlay for a penalty.
- **Data generation:** One true Bernoulli(0.5) sequence; one generated by a "human-like" model that alternates too often (switch probability 0.65).
- **Scoring:** 100 right (50 with overlay), 0 wrong; 5 rounds averaged.
- **Reveal:** Longest-run and run-count stats for both vs the theoretical expectation.
- **Why it works:** The player learns that the signature of randomness is streakiness.
- **Engine type:** PICK

### W4.22 Conjunction fallacy
- **Name:** Conjunction fallacy
- **Synonyms/notation:** Linda problem, P(A ∩ B) ≤ P(A)
- **Definition:** Thinking a specific, detailed story is more likely than a general one it is part of; the detailed story can never be more likely.
- **Formula/procedure:** P(A and B) ≤ min(P(A), P(B)) always.
- **Prerequisites:** W4.07
- **Misconception:** Representativeness: "sounds more like her" is mistaken for "more probable".
- **Real-world example:** Forecasters rating "Russia invades Ukraine and the EU bans Russian gas" as likelier than "the EU bans Russian gas".
- **Difficulty tier:** Intermediate
- **Game name:** Smaller Circle
- **Goal:** Rank statements by probability and place them as nested circles.
- **Interaction:** Drag 4 statement discs (A, A∧B, B, A∧B∧C) and resize; a disc must fit inside any disc it's a sub-event of.
- **Data generation:** Random persona vignette and attribute set from a pool.
- **Scoring:** 100 × correct containment relations.
- **Reveal:** Nested Venn with the probability inequality written.
- **Why it works:** Nesting forces the inequality geometrically.
- **Engine type:** BUILD

### W4.23 Inverse fallacy / prosecutor's fallacy
- **Name:** Prosecutor's fallacy
- **Synonyms/notation:** inverse fallacy, confusion of the inverse, transposed conditional, P(evidence|innocent) vs P(innocent|evidence)
- **Definition:** Confusing "how unlikely is this evidence if innocent" with "how unlikely is innocence given this evidence".
- **Formula/procedure:** Use Bayes with the population base rate: P(innocent|match) depends on how many people could match.
- **Prerequisites:** W4.11, W4.08
- **Misconception:** "A 1-in-a-million DNA match means a 1-in-a-million chance of innocence."
- **Real-world example:** The Sally Clark case, where the probability of two cot deaths was mis-presented as the probability of innocence.
- **Difficulty tier:** Intermediate
- **Game name:** Courtroom Flip
- **Goal:** Correct the prosecutor's statement by computing the right conditional.
- **Interaction:** Read the claim; drag the right numerator/denominator into P(_|_); then enter the correct posterior using a city-population slider.
- **Data generation:** Random match probability (1 in 10³–10⁶) and random population (10⁴–10⁷).
- **Scoring:** 50 for correct conditional orientation; 50 closeness of posterior (tolerance 50% relative).
- **Reveal:** Expected number of innocent matches in the population shown as dots.
- **Why it works:** Counting expected innocent matches makes the inversion concrete.
- **Engine type:** DETECTIVE

### W4.24 Monty Hall problem
- **Name:** Monty Hall problem
- **Synonyms/notation:** three-door problem, switching strategy
- **Definition:** After the host (who knows where the prize is) opens a losing door, switching wins 2/3 of the time.
- **Formula/procedure:** Enumerate: initial pick right 1/3 (switch loses), wrong 2/3 (switch wins). Host's knowledge is the key.
- **Prerequisites:** W4.08, W4.10
- **Misconception:** "Two doors left, so 50/50."
- **Real-world example:** The puzzle is a lesson in how new information that is *not* random changes probabilities.
- **Difficulty tier:** Intermediate
- **Game name:** Three Doors
- **Goal:** State the win probability for switching, then play 100 rounds on auto with each strategy.
- **Interaction:** Slider prediction; "Auto-play stay" / "Auto-play switch" with win counters; variant toggle where the host opens a door at random (and may reveal the car).
- **Data generation:** Random prize door each round.
- **Scoring:** Closeness (tolerance 0.1) for both the standard and the random-host variant.
- **Reveal:** Tree diagram; the random-host variant converges to 1/2 to show why the host's knowledge matters.
- **Why it works:** The variant isolates the exact source of the extra information.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W4.25 Birthday problem
- **Name:** Birthday problem
- **Synonyms/notation:** birthday paradox, collision probability, pigeonhole intuition failure
- **Definition:** In a group of just 23 people there's a 50% chance two share a birthday, because there are many pairs.
- **Formula/procedure:** P(no match) = Π (365 − i)/365 for i = 0..n−1; P(match) = 1 − that. Pairs = nC2.
- **Prerequisites:** W4.03, W4.18
- **Misconception:** Comparing with "someone shares *my* birthday" (needs ~253 people).
- **Real-world example:** Hash collisions in computing; coincidences in small datasets.
- **Difficulty tier:** Intermediate
- **Game name:** Party Match
- **Goal:** Guess the group size for a 50% chance of a shared birthday, then fill a room.
- **Interaction:** Slider for n; people walk into a room one by one, birthdays shown on a 365-day calendar; stop when a match appears; repeat 50 times for a histogram of stopping points.
- **Data generation:** Uniform birthdays (optionally real-world non-uniform).
- **Scoring:** Closeness (tolerance 8 people).
- **Reveal:** The complement product and the nC2 pair count.
- **Why it works:** Watching matches arrive early, repeatedly, re-calibrates intuition about pairs.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

---

## World 5 — Distribution Delta (Intermediate)

Theme: a river delta whose channels are curves; each channel is a named distribution.

### W5.01 Probability mass function
- **Name:** Probability mass function
- **Synonyms/notation:** PMF, p(x), P(X = x), discrete distribution, probability distribution table
- **Definition:** For a discrete random variable, a list or formula giving the probability of each possible value; the probabilities add to 1.
- **Formula/procedure:** p(x) ≥ 0; Σp(x) = 1; P(a ≤ X ≤ b) = Σ p(x) over that range.
- **Prerequisites:** W4.13
- **Misconception:** Letting the bars sum to more or less than 1; or reading bar height as a count.
- **Real-world example:** Distribution of the number of goals in a football match.
- **Difficulty tier:** Beginner
- **Game name:** Bar Probabilities
- **Goal:** Set bar heights for a described discrete variable so they sum to exactly 1.
- **Interaction:** Drag bar tops; a running total gauge; a "fill the rest" button is not provided.
- **Data generation:** Random description ("fair die", "loaded die with 6 twice as likely", "number of heads in 3 flips").
- **Scoring:** 50 for sum within 0.01 of 1; 50 × closeness of shape (1 − total absolute error/2).
- **Reveal:** True PMF overlaid; P(X ≥ k) computed by summing highlighted bars.
- **Why it works:** The sum-to-one constraint is felt rather than stated.
- **Engine type:** BUILD

### W5.02 Probability density function
- **Name:** Probability density function
- **Synonyms/notation:** PDF, f(x), density, continuous distribution
- **Definition:** For a continuous variable, a curve whose area between two values gives the probability of landing there; the height itself is not a probability.
- **Formula/procedure:** f(x) ≥ 0; ∫f(x)dx = 1; P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx; P(X = exactly a) = 0.
- **Prerequisites:** W5.01, W1.07
- **Misconception:** Reading f(x) as "the probability of x" (densities can exceed 1).
- **Real-world example:** Height of adults: the chance someone is between 170 and 175 cm is an area.
- **Difficulty tier:** Intermediate
- **Game name:** Area Under
- **Goal:** Estimate the probability as a shaded area under a curve.
- **Interaction:** Drag two handles to set the interval; slider for probability; submit.
- **Data generation:** Random density (normal, skewed, triangular, uniform) and random interval.
- **Scoring:** Closeness (tolerance 0.08).
- **Reveal:** Area shaded and computed; a 10,000-dot rain shows the same fraction landing in the interval; a "P(X = 170.000) = 0" note.
- **Why it works:** The rain of dots links area to frequency.
- **Engine type:** ESTIMATE

### W5.03 Cumulative distribution function
- **Name:** Cumulative distribution function
- **Synonyms/notation:** CDF, F(x) = P(X ≤ x), distribution function, quantile function (inverse CDF, F⁻¹)
- **Definition:** The running total of probability up to x; it starts at 0, ends at 1 and never goes down.
- **Formula/procedure:** F(x) = P(X ≤ x); P(a < X ≤ b) = F(b) − F(a); percentile = F⁻¹(p).
- **Prerequisites:** W5.02, W3.20
- **Misconception:** Confusing F(x) with f(x), or forgetting that for discrete variables F is a staircase.
- **Real-world example:** "What is the chance of waiting less than 10 minutes?" is F(10).
- **Difficulty tier:** Intermediate
- **Game name:** Climb to One
- **Goal:** Sketch the CDF of a shown PDF/PMF by placing control points.
- **Interaction:** Place 5–7 points on an empty graph; the curve interpolates; submit.
- **Data generation:** Random PDF or PMF.
- **Scoring:** 100 × (1 − mean absolute error between sketched and true F).
- **Reveal:** True CDF overlaid; animation of area accumulating under the PDF as the CDF rises.
- **Why it works:** Drawing the accumulation links the two views permanently.
- **Engine type:** BUILD

### W5.04 Discrete uniform distribution
- **Name:** Discrete uniform
- **Synonyms/notation:** U{a, …, b}, equally likely outcomes, fair die
- **Definition:** Every one of k outcomes has the same probability 1/k.
- **Formula/procedure:** P(X = x) = 1/k; mean = (a + b)/2; variance = (k² − 1)/12.
- **Prerequisites:** W5.01
- **Misconception:** Expecting each outcome to appear exactly n/k times in n trials.
- **Real-world example:** A fair lottery draw; random assignment to k groups.
- **Difficulty tier:** Beginner
- **Game name:** Fair or Loaded
- **Goal:** Decide whether a die is fair from a sample of rolls, then see how many rolls you'd need to be sure.
- **Interaction:** Press "Roll 30"; look at counts; vote Fair/Loaded; may roll more at a cost.
- **Data generation:** 50% fair, 50% loaded (one face 1.5–3× likely).
- **Scoring:** 100 for correct vote minus 5 per extra batch of rolls.
- **Reveal:** Expected 1/k line; chi-square teaser.
- **Why it works:** Learners see how much a fair die wobbles, which they need before testing fairness in W7.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W5.05 Continuous uniform distribution
- **Name:** Continuous uniform
- **Synonyms/notation:** U(a, b), rectangular distribution
- **Definition:** Any value between a and b is equally likely; the density is a flat rectangle of height 1/(b − a).
- **Formula/procedure:** f(x) = 1/(b − a) on [a, b]; mean = (a + b)/2; variance = (b − a)²/12.
- **Prerequisites:** W5.02
- **Misconception:** Expecting a histogram of uniform samples to be perfectly flat.
- **Real-world example:** Arrival time of a bus known only to come between 10:00 and 10:20.
- **Difficulty tier:** Beginner
- **Game name:** Flat River
- **Goal:** Set the rectangle's height so its area is 1, then estimate a probability.
- **Interaction:** Drag the top of the rectangle; then drag an interval; slider for probability.
- **Data generation:** Random a, b and interval.
- **Scoring:** 50 for height within 5%; 50 closeness of probability (tolerance 0.05).
- **Reveal:** Area = width × height; 1,000 sampled dots.
- **Why it works:** The "area must be 1" rule is learned on the simplest shape.
- **Engine type:** BUILD

### W5.06 Bernoulli distribution
- **Name:** Bernoulli distribution
- **Synonyms/notation:** Bernoulli(p), single trial, success/failure, indicator
- **Definition:** One trial with probability p of success (1) and 1 − p of failure (0).
- **Formula/procedure:** P(X = 1) = p; mean = p; variance = p(1 − p).
- **Prerequisites:** W1.16, W5.01
- **Misconception:** Thinking variance is largest when p is near 1 (it peaks at p = 0.5).
- **Real-world example:** Whether a single email is opened.
- **Difficulty tier:** Beginner
- **Game name:** One Flip
- **Goal:** Match p values to the variance of the trial.
- **Interaction:** Slider for p; guess variance; then drag along the p axis to find the p with maximum variance.
- **Data generation:** Random p.
- **Scoring:** 50 closeness on variance (tolerance 0.04); 50 for finding max at 0.5 ± 0.05.
- **Reveal:** Parabola p(1 − p).
- **Why it works:** The parabola explains why 50/50 outcomes are the hardest to predict.
- **Engine type:** ESTIMATE

### W5.07 Binomial distribution
- **Name:** Binomial distribution
- **Synonyms/notation:** B(n, p), Bin(n, p), number of successes in n trials
- **Definition:** The number of successes in n independent yes/no trials with the same probability p.
- **Formula/procedure:** P(X = k) = nCk pᵏ(1 − p)ⁿ⁻ᵏ; mean = np; variance = np(1 − p). Conditions: fixed n, independent, constant p, two outcomes (BINS).
- **Prerequisites:** W5.06, W4.18
- **Misconception:** Using the binomial when trials aren't independent (sampling without replacement from a small population).
- **Real-world example:** Number of defective items in a batch of 50; number of free throws made in 10 attempts.
- **Difficulty tier:** Intermediate
- **Game name:** Free Throws
- **Goal:** Predict the chance of making at least k of n shots, then let the player shoot 1,000 games.
- **Interaction:** Set p from the player's season average; slider for prediction; run; histogram of makes builds.
- **Data generation:** Random p (0.3–0.9), n (5–20), k.
- **Scoring:** Closeness (tolerance 0.08).
- **Reveal:** Binomial PMF overlaid on the empirical histogram; nCk pᵏ(1−p)ⁿ⁻ᵏ for one bar shown with numbers.
- **Why it works:** The overlay shows the formula is the limit of the simulation.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W5.08 Geometric distribution
- **Name:** Geometric distribution
- **Synonyms/notation:** Geom(p), trials until first success, memoryless (discrete)
- **Definition:** The number of tries until the first success, when each try has probability p.
- **Formula/procedure:** P(X = k) = (1 − p)ᵏ⁻¹p; mean = 1/p; P(X > k) = (1 − p)ᵏ.
- **Prerequisites:** W5.06
- **Misconception:** Expecting the most likely value to be near the mean (the mode is always 1).
- **Real-world example:** Number of sales calls until the first sale.
- **Difficulty tier:** Intermediate
- **Game name:** Until First Success
- **Goal:** Predict the mean and the most likely number of tries until a success.
- **Interaction:** Two sliders (mean, mode); run 500 episodes; histogram builds.
- **Data generation:** Random p 0.05–0.6.
- **Scoring:** 60 closeness on mean (tolerance 25%); 40 for mode = 1.
- **Reveal:** Decaying PMF; 1/p computed.
- **Why it works:** The surprising mode = 1 result corrects a near-universal misconception.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W5.09 Negative binomial distribution
- **Name:** Negative binomial
- **Synonyms/notation:** NB(r, p), trials until rth success, Pascal distribution; also overdispersed-count parametrisation
- **Definition:** The number of trials needed to get r successes; generalises the geometric.
- **Formula/procedure:** P(X = k) = (k−1)C(r−1) pʳ(1−p)ᵏ⁻ʳ; mean = r/p.
- **Prerequisites:** W5.08
- **Misconception:** Confusing with binomial (fixed trials, random successes vs fixed successes, random trials).
- **Real-world example:** Number of interviews needed to hire 3 engineers; modelling overdispersed counts like website visits.
- **Difficulty tier:** Advanced
- **Game name:** Three Hires
- **Goal:** Predict how many candidates you'll interview to make r hires.
- **Interaction:** Slider for expected total; run 300 hiring rounds.
- **Data generation:** Random p, r = 2–5.
- **Scoring:** Closeness (tolerance 25%).
- **Reveal:** r/p; histogram right-skewed; binomial vs negative binomial contrast card.
- **Why it works:** The fixed-successes framing is grasped by living the hiring loop.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W5.10 Hypergeometric distribution
- **Name:** Hypergeometric distribution
- **Synonyms/notation:** HG(N, K, n), sampling without replacement
- **Definition:** Number of successes when drawing n items without replacement from N items of which K are successes.
- **Formula/procedure:** P(X = k) = KCk·(N−K)C(n−k)/NCn; mean = nK/N.
- **Prerequisites:** W5.07, W4.07
- **Misconception:** Using the binomial for small-population draws; it's close only when n ≪ N.
- **Real-world example:** Quality inspection of 10 items from a lot of 50; lottery matching numbers.
- **Difficulty tier:** Advanced
- **Game name:** Without Replacement
- **Goal:** Predict the chance of exactly k winners in a hand drawn from a small deck, then compare with the binomial.
- **Interaction:** Slider prediction; draw 1,000 hands; toggle to view binomial approximation error as N grows.
- **Data generation:** N 10–60, K, n random.
- **Scoring:** Closeness (tolerance 0.06).
- **Reveal:** Hypergeometric vs binomial PMFs overlaid; gap shrinks as N slider rises.
- **Why it works:** The N slider shows when the approximation is safe.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W5.11 Poisson distribution
- **Name:** Poisson distribution
- **Synonyms/notation:** Pois(λ), rate λ, counts of rare events, Poisson process
- **Definition:** The number of events in a fixed interval when events happen independently at a steady average rate λ.
- **Formula/procedure:** P(X = k) = e^(−λ)λᵏ/k!; mean = variance = λ. Approximates binomial when n large, p small (λ = np).
- **Prerequisites:** W5.07
- **Misconception:** Using Poisson for events that cluster or can't overlap (it assumes independence and no upper limit).
- **Real-world example:** Emails per hour, goals per match, radioactive decays per second.
- **Difficulty tier:** Intermediate
- **Game name:** Rare Events
- **Goal:** Predict P(more than k events) in the next hour and then watch the hour play out 400 times.
- **Interaction:** Rate shown; slider prediction; events drop onto a timeline as the hour runs; histogram builds.
- **Data generation:** λ 0.5–12; random k.
- **Scoring:** Closeness (tolerance 0.08).
- **Reveal:** PMF; mean and variance both equal λ shown numerically; "overdispersion" warning if the simulation uses a clustered process in a trick round.
- **Why it works:** The timeline makes "rate" tangible; the variance = mean check becomes a diagnostic.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W5.12 Normal distribution
- **Name:** Normal distribution
- **Synonyms/notation:** Gaussian, bell curve, N(μ, σ²), N(μ, σ)
- **Definition:** The symmetric bell-shaped curve described fully by its mean and SD; many averages and measurements follow it.
- **Formula/procedure:** f(x) = (1/(σ√2π)) e^(−(x−μ)²/(2σ²)); mean μ, SD σ; symmetric; inflection points at μ ± σ.
- **Prerequisites:** W5.02, W3.04
- **Misconception:** Assuming everything is normal (incomes, waiting times and counts are not); or that "normal" means "typical".
- **Real-world example:** Heights, measurement errors, and means of large samples.
- **Difficulty tier:** Intermediate
- **Game name:** Bell Fit
- **Goal:** Tune μ and σ until the bell fits the histogram.
- **Interaction:** Two sliders; live overlay; submit.
- **Data generation:** 200–1,000 normal samples with random μ, σ; occasionally a skewed dataset where no fit works and the player should press "Not normal".
- **Scoring:** Closeness on both parameters (tolerance 0.2σ and 20% of σ); 100 for correctly pressing "Not normal".
- **Reveal:** True parameters; inflection points marked at μ ± σ.
- **Why it works:** Seeing σ at the inflection point gives a visual handle on SD.
- **Engine type:** ESTIMATE

### W5.13 Empirical rule (68-95-99.7)
- **Name:** 68-95-99.7 rule
- **Synonyms/notation:** empirical rule, three-sigma rule
- **Definition:** For normal data, about 68% of values are within 1 SD of the mean, 95% within 2 SD, 99.7% within 3 SD.
- **Formula/procedure:** P(μ − σ < X < μ + σ) ≈ 0.683; 2σ ≈ 0.954; 3σ ≈ 0.997.
- **Prerequisites:** W5.12
- **Misconception:** Applying it to skewed data; or thinking 95% means exactly ±2 (it's ±1.96).
- **Real-world example:** Six Sigma manufacturing; "2 SD above the mean" cut-offs in screening.
- **Difficulty tier:** Beginner
- **Game name:** Shade the Bell
- **Goal:** Shade the region of a normal curve matching a stated proportion, or state the proportion for a shaded region.
- **Interaction:** Drag handles on the curve in SD units; or slider for proportion.
- **Data generation:** Random μ, σ; random target (one of 68/95/99.7, half-regions, or tails).
- **Scoring:** Closeness (tolerance 0.3 SD / 5 percentage points).
- **Reveal:** Shaded area with exact value; a skewed-data round shows the rule failing.
- **Why it works:** Alternating directions (region ↔ proportion) builds the lookup both ways.
- **Engine type:** ESTIMATE

### W5.14 Standard normal and z-tables
- **Name:** Standard normal distribution
- **Synonyms/notation:** Z ~ N(0, 1), Φ(z), z-table, standard normal CDF, critical z (1.645, 1.96, 2.576)
- **Definition:** The normal distribution with mean 0 and SD 1; any normal value becomes a z-score so one table serves all.
- **Formula/procedure:** z = (x − μ)/σ; P(X ≤ x) = Φ(z); inverse: x = μ + zσ.
- **Prerequisites:** W5.12, W3.11
- **Misconception:** Reading the table as "area to the right" when it's "area to the left" (or vice versa) without checking.
- **Real-world example:** Converting an IQ of 130 to "top 2.3%".
- **Difficulty tier:** Intermediate
- **Game name:** Table Dive
- **Goal:** Answer normal-probability questions by standardising and reading Φ.
- **Interaction:** Question shown; set z with a slider; read area from an on-screen interactive table/curve; enter answer.
- **Data generation:** Random μ, σ, x; question types: below, above, between, inverse (find x for given %).
- **Scoring:** 20 per question over 5 (tolerance 0.02 / 0.1σ).
- **Reveal:** Standardisation shown step by step; critical values 1.645/1.96/2.576 highlighted.
- **Why it works:** Repeated standardise-then-lookup builds the reflex used in every z-test.
- **Engine type:** ESTIMATE

### W5.15 Student's t distribution
- **Name:** t distribution
- **Synonyms/notation:** Student's t, t(df), t_ν, degrees of freedom
- **Definition:** A bell curve with fatter tails than the normal, used when the SD is estimated from a small sample; it approaches the normal as df grows.
- **Formula/procedure:** t = (x̄ − μ)/(s/√n) with df = n − 1; critical t > critical z for small df (t₀.₉₇₅,₄ = 2.78).
- **Prerequisites:** W5.14, W3.05
- **Misconception:** Using z instead of t with small samples, which makes intervals too narrow.
- **Real-world example:** A pilot study with 8 participants: its uncertainty is wider than the normal suggests.
- **Difficulty tier:** Intermediate
- **Game name:** Fat Tails
- **Goal:** Slide df until the t curve becomes indistinguishable from the normal, and estimate the 97.5% critical value at a given df.
- **Interaction:** df slider overlays t on N(0,1); critical-value slider.
- **Data generation:** Random target df (2–60).
- **Scoring:** 50 closeness on critical value (tolerance 0.15); 50 for identifying "≈ normal" within df 25–40.
- **Reveal:** Table of critical values vs df; tail areas highlighted.
- **Why it works:** Moving df makes the normal a limiting case rather than a separate fact.
- **Engine type:** PICK

### W5.16 Chi-square distribution
- **Name:** Chi-square distribution
- **Synonyms/notation:** χ²(k), chi-squared, sum of k squared standard normals
- **Definition:** The distribution of a sum of k squared z-scores; always positive and right-skewed, used for variances and count tests.
- **Formula/procedure:** If Z₁..Zₖ ~ N(0,1), then ΣZᵢ² ~ χ²(k); mean k, variance 2k.
- **Prerequisites:** W5.14
- **Misconception:** Expecting it to be symmetric; or using it with expected counts below 5.
- **Real-world example:** Testing whether observed category counts match a theory.
- **Difficulty tier:** Intermediate
- **Game name:** Square and Sum
- **Goal:** Build the χ² distribution by drawing k z-scores, squaring, summing.
- **Interaction:** Press "Draw k z's" to see them squared and summed; the sum drops into a histogram; predict the mean after 10 draws.
- **Data generation:** k = 1–10.
- **Scoring:** Closeness of mean guess (tolerance 25%).
- **Reveal:** χ²(k) curve over the histogram; mean = k.
- **Why it works:** Constructing it from z-scores removes the mystery.
- **Engine type:** SAMPLER

### W5.17 F distribution
- **Name:** F distribution
- **Synonyms/notation:** F(d₁, d₂), variance ratio, Fisher–Snedecor
- **Definition:** The distribution of the ratio of two independent variance estimates, used in ANOVA and regression.
- **Formula/procedure:** F = (χ²₁/d₁)/(χ²₂/d₂); right-skewed, ≥ 0; under H₀ of equal variances, F ≈ 1.
- **Prerequisites:** W5.16
- **Misconception:** Thinking F < 1 is impossible or meaningless.
- **Real-world example:** The F statistic in a one-way ANOVA comparing three teaching methods.
- **Difficulty tier:** Advanced
- **Game name:** Ratio Rapids
- **Goal:** Predict where the ratio of two sample variances will typically land when the true variances are equal.
- **Interaction:** Draw two samples (sizes n₁, n₂) from the same population; ratio drops into a histogram; predict the 95th percentile.
- **Data generation:** n₁, n₂ 3–30.
- **Scoring:** Closeness (tolerance 20%).
- **Reveal:** F curve; critical value; note that it centres near 1 but skews right.
- **Why it works:** Seeing F ≈ 1 under equal variances sets up ANOVA's logic.
- **Engine type:** SAMPLER

### W5.18 Exponential distribution
- **Name:** Exponential distribution
- **Synonyms/notation:** Exp(λ), waiting time, memoryless, rate λ, mean 1/λ
- **Definition:** The time between events in a Poisson process; it has no memory, so having waited doesn't make the event more imminent.
- **Formula/procedure:** f(t) = λe^(−λt); P(T > t) = e^(−λt); mean = SD = 1/λ; P(T > s + t | T > s) = P(T > t).
- **Prerequisites:** W5.11, W5.02
- **Misconception:** Believing a bus that's "late" is more likely to arrive in the next minute (not for memoryless arrivals).
- **Real-world example:** Time between customer arrivals; lifetime of components without wear-out.
- **Difficulty tier:** Intermediate
- **Game name:** Waiting Time
- **Goal:** Predict the chance of waiting more than t more minutes, given you've already waited s.
- **Interaction:** Slider; run 1,000 waits conditioned on s; compare to unconditional.
- **Data generation:** λ random; s, t random.
- **Scoring:** Closeness (tolerance 0.07).
- **Reveal:** Both proportions equal; the exponential curve "restarts" visually at s.
- **Why it works:** The restart animation is memorylessness itself.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W5.19 Log-normal distribution
- **Name:** Log-normal distribution
- **Synonyms/notation:** lognormal, LN(μ, σ), multiplicative processes, log transform
- **Definition:** A right-skewed distribution whose logarithm is normal; arises when many small percentage effects multiply.
- **Formula/procedure:** If ln X ~ N(μ, σ²) then X is log-normal; median = e^μ; mean = e^(μ + σ²/2) > median.
- **Prerequisites:** W5.12, W3.13, W2.06
- **Misconception:** Reporting mean ± SD for log-normal data; or thinking the log-transform "cheats".
- **Real-world example:** Incomes, city sizes, stock prices, time to complete tasks.
- **Difficulty tier:** Advanced
- **Game name:** Log Lens
- **Goal:** Pick which dataset becomes normal when logged, then apply the lens.
- **Interaction:** Three skewed histograms; tap one; press "Log lens" to transform; confirm.
- **Data generation:** One log-normal, one gamma, one mixture (only the first becomes bell-shaped).
- **Scoring:** 100 right first time, 50 second.
- **Reveal:** Transformed histograms; mean vs median on the original scale.
- **Why it works:** Transformation as a lens makes it a tool, not a trick.
- **Engine type:** PICK

### W5.20 Beta distribution
- **Name:** Beta distribution
- **Synonyms/notation:** Beta(α, β), distribution over proportions, conjugate prior for a probability
- **Definition:** A flexible distribution on the interval 0–1, used to describe uncertainty about a probability.
- **Formula/procedure:** f(p) ∝ p^(α−1)(1−p)^(β−1); mean α/(α+β); Beta(1,1) is uniform.
- **Prerequisites:** W5.05, W5.06
- **Misconception:** Thinking α and β are "successes and failures" (they're successes + 1 and failures + 1 under a uniform prior).
- **Real-world example:** Belief about a new drug's response rate after 7 responders in 10.
- **Difficulty tier:** Advanced
- **Game name:** Shape Shifter
- **Goal:** Match the sliders α, β to reproduce a target curve, then describe the belief it encodes.
- **Interaction:** Two sliders; live curve; pick a one-line description from 4 ("fairly sure p ≈ 0.7", "no idea", etc.).
- **Data generation:** Random target α, β in 0.5–30.
- **Scoring:** 70 closeness on parameters (tolerance 20% each), 30 description.
- **Reveal:** Mean and 95% interval of the target.
- **Why it works:** Prepares the hands for Bayesian updating in W10.
- **Engine type:** ESTIMATE

### W5.21 Gamma distribution
- **Name:** Gamma distribution
- **Synonyms/notation:** Gamma(k, θ) or Gamma(α, β), shape/scale, sum of exponentials, Erlang
- **Definition:** The waiting time until the kth event in a Poisson process; a flexible positive, right-skewed distribution.
- **Formula/procedure:** Sum of k Exp(λ) ~ Gamma(k, 1/λ); mean kθ; chi-square is a special case.
- **Prerequisites:** W5.18
- **Misconception:** Confusing shape and scale parameters across software conventions.
- **Real-world example:** Rainfall amounts; insurance claim sizes; time to the third machine failure.
- **Difficulty tier:** Research
- **Game name:** Third Arrival
- **Goal:** Predict the mean and shape of the time until the kth customer.
- **Interaction:** Set k; slider for mean; run 500 simulations summing exponentials.
- **Data generation:** λ, k random.
- **Scoring:** Closeness (tolerance 20%).
- **Reveal:** Histogram vs Gamma curve; as k grows the shape becomes bell-like (CLT preview).
- **Why it works:** Building it as a sum of waits demystifies the parameters.
- **Engine type:** SAMPLER

### W5.22 Central limit theorem
- **Name:** Central limit theorem
- **Synonyms/notation:** CLT, sampling distribution of the mean tends to normal, √n law
- **Definition:** Averages of enough independent values are approximately normally distributed, whatever shape the original data have.
- **Formula/procedure:** x̄ ≈ N(μ, σ²/n) for large n; the SD of the mean shrinks by √n. "Large" depends on skew (often n ≥ 30 is quoted).
- **Prerequisites:** W5.12, W4.16
- **Misconception:** Believing the CLT makes the *data* normal when n is large (it's the *means* that become normal).
- **Real-world example:** Why polling averages and manufacturing batch means are modelled as normal.
- **Difficulty tier:** Intermediate
- **Game name:** Dice Avalanche
- **Goal:** Predict the shape and spread of the distribution of sample means from a weird population, then let the avalanche run.
- **Interaction:** Choose population shape (uniform, bimodal, skewed, two-point); set n; draw sample means one by one, then 1,000 at once; slider for predicted SD of means.
- **Data generation:** Random population; n from 1 to 50.
- **Scoring:** 50 closeness on SD of means (tolerance 25%); 50 for correctly answering "is the data histogram normal now?" (no).
- **Reveal:** Population histogram vs sampling-distribution histogram side by side; σ/√n.
- **Why it works:** Showing population and means side by side defeats the "data become normal" myth.
- **Engine type:** SAMPLER

### W5.23 Q–Q plots and normality checks
- **Name:** Q–Q plot
- **Synonyms/notation:** quantile–quantile plot, normal probability plot, normality check, Shapiro–Wilk test
- **Definition:** A plot of the data's quantiles against a normal's quantiles; a straight line means the data look normal.
- **Formula/procedure:** Sort data; plot each against the expected normal quantile for its rank; curvature at ends indicates skew/heavy tails.
- **Prerequisites:** W5.12, W3.06
- **Misconception:** Relying on a Shapiro–Wilk p-value alone (it rejects trivial deviations in large samples and misses big ones in small samples).
- **Real-world example:** Checking regression residuals before trusting a t-test.
- **Difficulty tier:** Advanced
- **Game name:** Straight Line Check
- **Goal:** Match each Q–Q plot to its histogram and name the deviation (right skew, heavy tails, bimodal, fine).
- **Interaction:** Drag four Q–Q plots to four histograms; pick a label for each.
- **Data generation:** Samples from normal, log-normal, t(3), mixture.
- **Scoring:** 60 matching, 40 labels.
- **Reveal:** Overlaid curves with the S-shape, banana-shape annotations.
- **Why it works:** Learning the signature shapes is faster than any test statistic.
- **Engine type:** MATCH

### W5.24 Transformations to tame skew
- **Name:** Data transformation
- **Synonyms/notation:** log transform, square-root transform, Box–Cox, reciprocal, variance-stabilising transformation
- **Definition:** Applying a function like log to each value to make a skewed distribution more symmetric and spread more even.
- **Formula/procedure:** Right skew: try √x, log x, 1/x in increasing strength; counts: √; proportions: logit or arcsine-√.
- **Prerequisites:** W5.19, W3.13
- **Misconception:** Interpreting a mean difference on the log scale as a difference in original units (it's a ratio).
- **Real-world example:** Analysing reaction times or incomes on a log scale.
- **Difficulty tier:** Advanced
- **Game name:** Dial the Power
- **Goal:** Turn a Box–Cox λ dial until the histogram is as symmetric as possible.
- **Interaction:** λ dial from −1 to 1 (0 = log); live skewness read-out hidden; submit.
- **Data generation:** Random skewed data generated by inverse-transforming normal data with a hidden λ*.
- **Scoring:** Closeness to λ* (tolerance 0.3).
- **Reveal:** Skewness vs λ curve; the "ratio not difference" interpretation note.
- **Why it works:** A single dial unifies log/√/reciprocal as one family.
- **Engine type:** BUILD

---

## World 6 — Sampling Sea (Intermediate)

Theme: a fishing fleet; the player decides how to cast nets and how sure to be about the catch.

### W6.01 Simple random sampling
- **Name:** Simple random sample
- **Synonyms/notation:** SRS, random sampling, lottery sampling, random number table
- **Definition:** Every group of n members of the population has the same chance of being chosen.
- **Formula/procedure:** Number the population; use random numbers to pick n; sample without replacement.
- **Prerequisites:** W1.08
- **Misconception:** Thinking "haphazard" or "I picked without thinking" is random.
- **Real-world example:** Auditors selecting invoices for inspection.
- **Difficulty tier:** Beginner
- **Game name:** Lucky Net
- **Goal:** Pick a sample "by eye", then a truly random one, and compare their bias over 20 repeats.
- **Interaction:** Tap 10 fish by eye in a crowded pond; then press "Random 10"; repeat; two running means.
- **Data generation:** Pond with size-related clustering (big fish drawn larger and more central).
- **Scoring:** 100 × closeness of the random-sample mean to the pond mean, plus 20 bonus if the player correctly predicts which method is biased.
- **Reveal:** The by-eye means are consistently high (people tap big, central fish).
- **Why it works:** Players discover their own selection bias.
- **Engine type:** SAMPLER

### W6.02 Stratified sampling
- **Name:** Stratified sampling
- **Synonyms/notation:** strata, proportional allocation, stratified random sample
- **Definition:** Split the population into groups that matter, then randomly sample within each group so every group is properly represented.
- **Formula/procedure:** Choose strata; sample nₕ ∝ Nₕ (proportional) or by variance (Neyman); combine with weights.
- **Prerequisites:** W6.01
- **Misconception:** Confusing it with cluster sampling (stratified samples *within* every group; cluster samples *whole* groups).
- **Real-world example:** Polling that ensures each region and age band is represented.
- **Difficulty tier:** Intermediate
- **Game name:** Layer Cake
- **Goal:** Allocate a sample of 40 across strata so the estimate's error is smallest.
- **Interaction:** Sliders for sample size per stratum (sum fixed); run 200 samples; compare SE with SRS.
- **Data generation:** Three strata with random sizes and random within-stratum SDs.
- **Scoring:** 100 × (SE_SRS − SE_yours)/(SE_SRS − SE_optimal), floor 0.
- **Reveal:** Optimal allocation; the SE comparison bar.
- **Why it works:** Players see stratification as a precision tool, not just fairness.
- **Engine type:** SAMPLER

### W6.03 Cluster sampling
- **Name:** Cluster sampling
- **Synonyms/notation:** cluster sample, multistage sampling, primary sampling unit, design effect
- **Definition:** Randomly choose whole groups (schools, villages) and measure everyone inside them; cheaper but noisier.
- **Formula/procedure:** List clusters; randomly select k; measure all members (or sub-sample). Design effect ≈ 1 + (m − 1)ρ.
- **Prerequisites:** W6.02
- **Misconception:** Treating 10 villages × 50 people as if it were 500 independent people.
- **Real-world example:** Household surveys in developing countries sampling villages first.
- **Difficulty tier:** Intermediate
- **Game name:** Village Picker
- **Goal:** Choose between surveying 5 whole villages or 50 scattered households at the same cost, then see which estimate is more accurate.
- **Interaction:** Pick strategy; run 100 surveys; compare spread of estimates.
- **Data generation:** Map of 20 villages with random between-village variation (ICC 0.05–0.5).
- **Scoring:** 100 if the player predicts the direction of the SE difference and the design effect within 50%.
- **Reveal:** Design effect computed; the "effective sample size" shown.
- **Why it works:** Seeing effective n drop is the lesson.
- **Engine type:** SAMPLER

### W6.04 Systematic sampling
- **Name:** Systematic sampling
- **Synonyms/notation:** every kth, interval sampling, periodicity trap
- **Definition:** Pick a random start, then take every kth item from a list.
- **Formula/procedure:** k = N/n; random start r in 1..k; take r, r + k, r + 2k…
- **Prerequisites:** W6.01
- **Misconception:** Assuming it's always as good as SRS; a list with a cycle matching k gives a badly biased sample.
- **Real-world example:** Exit polls interviewing every 10th voter.
- **Difficulty tier:** Beginner
- **Game name:** Every kth
- **Goal:** Choose k for a list that may have a hidden cycle; avoid the trap.
- **Interaction:** A list scrolls (e.g. shifts repeating every 7); choose k; sample; estimate mean.
- **Data generation:** Random cycle length 5–12 in the list; random N.
- **Scoring:** Closeness of estimate (tolerance 0.3 SD); −30 if k is a multiple of the cycle.
- **Reveal:** The cycle revealed by colour; which k values were safe.
- **Why it works:** Hitting the periodicity trap once is unforgettable.
- **Engine type:** SAMPLER

### W6.05 Convenience and voluntary-response sampling
- **Name:** Convenience sampling
- **Synonyms/notation:** convenience sample, voluntary response, self-selected sample, online poll, grab sample
- **Definition:** Taking whoever is easy to reach or who chooses to respond; cheap, but usually biased.
- **Formula/procedure:** No probability structure; cannot compute valid standard errors; look for who is missing.
- **Prerequisites:** W6.01
- **Misconception:** Believing a huge convenience sample beats a small random one (the 1936 Literary Digest poll of 2.4 million was wrong).
- **Real-world example:** Twitter polls; customer reviews.
- **Difficulty tier:** Beginner
- **Game name:** Who Showed Up
- **Goal:** Predict the direction of bias from a described convenience sample, then see it.
- **Interaction:** Scenario card; choose "overestimates / underestimates / unbiased"; press "Simulate" to compare sample vs population.
- **Data generation:** Population with a trait correlated with the probability of being reached (random sign and strength).
- **Scoring:** 100 for right direction and a magnitude within 50%.
- **Reveal:** Reached vs unreached distributions overlaid.
- **Why it works:** The "who is missing?" habit is drilled.
- **Engine type:** DETECTIVE

### W6.06 Other non-probability sampling
- **Name:** Non-probability sampling methods
- **Synonyms/notation:** quota sampling, snowball sampling, purposive/judgement sampling, respondent-driven sampling
- **Definition:** Methods that don't give every member a known chance; useful for hard-to-reach groups but risky for generalising.
- **Formula/procedure:** Quota: fill fixed counts per group non-randomly; snowball: ask participants to recruit others; purposive: choose by expert judgement.
- **Prerequisites:** W6.05
- **Misconception:** Assuming quota sampling equals stratified sampling (quota is non-random within groups).
- **Real-world example:** Studies of homeless populations using snowball recruitment.
- **Difficulty tier:** Intermediate
- **Game name:** Method Match
- **Goal:** Match study descriptions to sampling methods and rank their generalisability.
- **Interaction:** Drag 6 descriptions to 6 methods; then order the methods on a "how far can you generalise" bar.
- **Data generation:** Random descriptions from a pool per method.
- **Scoring:** 60 matching, 40 ordering (rank correlation).
- **Reveal:** One-line "best use" per method.
- **Why it works:** Knowing the vocabulary is prerequisite to reading methods sections.
- **Engine type:** MATCH

### W6.07 Sampling frame and coverage error
- **Name:** Sampling frame
- **Synonyms/notation:** frame, list, coverage bias, undercoverage, overcoverage
- **Definition:** The actual list you sample from; if it misses part of the population, your sample can't represent them.
- **Formula/procedure:** Compare frame to target population; identify who is excluded; estimate their share.
- **Prerequisites:** W1.08, W6.01
- **Misconception:** Thinking random sampling fixes a bad frame.
- **Real-world example:** Landline phone polls missing mobile-only households.
- **Difficulty tier:** Intermediate
- **Game name:** Missing from the List
- **Goal:** Identify who the frame excludes and estimate how it skews a result.
- **Interaction:** Scenario; tap the excluded group among 4; slider for direction/size of bias; simulate.
- **Data generation:** Population with a frame-exclusion correlated with the outcome.
- **Scoring:** 50 identification, 50 closeness.
- **Reveal:** Frame vs population; estimates compared.
- **Why it works:** Separates frame error from sampling error.
- **Engine type:** DETECTIVE

### W6.08 Sampling error vs sampling bias
- **Name:** Sampling error vs bias
- **Synonyms/notation:** sampling variability, random error, systematic error, accuracy vs precision
- **Definition:** Sampling error is the random wobble between samples; bias is a consistent lean in one direction. More data shrinks error, not bias.
- **Formula/procedure:** Error ∝ 1/√n; bias is unchanged by n.
- **Prerequisites:** W6.01, W6.05
- **Misconception:** "A bigger sample will fix it" when the problem is bias.
- **Real-world example:** A huge online survey remains biased no matter how many respond.
- **Difficulty tier:** Intermediate
- **Game name:** Wobble or Lean
- **Goal:** Diagnose whether an estimator's dartboard pattern shows error, bias, both or neither.
- **Interaction:** Dartboards (clusters of estimates around a bullseye) appear; choose a label; then increase n and predict what changes.
- **Data generation:** Random bias (0 or nonzero) and SE; n doubling button.
- **Scoring:** 60 labels, 40 predictions.
- **Reveal:** Spread shrinks with n; centre doesn't move.
- **Why it works:** The dartboard metaphor makes the two kinds of error separate axes.
- **Engine type:** PICK

### W6.09 Non-response bias
- **Name:** Non-response bias
- **Synonyms/notation:** response rate, non-response, unit vs item non-response, differential non-response
- **Definition:** When the people who don't answer differ from those who do, the results tilt toward the responders.
- **Formula/procedure:** Compare responders to known population figures; reweight; chase non-responders; report response rate.
- **Prerequisites:** W6.08
- **Misconception:** Thinking a 30% response rate is fine as long as n is big.
- **Real-world example:** Employee engagement surveys where unhappy staff ignore the survey.
- **Difficulty tier:** Intermediate
- **Game name:** Who Answered?
- **Goal:** Guess the true satisfaction score from the responders' score and a description of who tends to respond.
- **Interaction:** Responders' mean shown; scenario hints; slider for true mean; reveal non-responders.
- **Data generation:** Response probability depends on satisfaction with random strength.
- **Scoring:** Closeness (tolerance 0.5 SD).
- **Reveal:** Responders vs non-responders; the weighted correction.
- **Why it works:** Players practise reasoning about the invisible group.
- **Engine type:** DETECTIVE

### W6.10 Sampling distribution of the mean
- **Name:** Sampling distribution
- **Synonyms/notation:** sampling distribution of x̄, distribution of a statistic, repeated sampling
- **Definition:** The distribution you'd get by computing a statistic from every possible sample of size n; it tells you how much the statistic wobbles.
- **Formula/procedure:** Mean of x̄ = μ; SD of x̄ = σ/√n; shape → normal (CLT).
- **Prerequisites:** W5.22, W1.09
- **Misconception:** Confusing the sampling distribution (of means) with the sample's distribution (of values).
- **Real-world example:** Why repeated polls give slightly different numbers.
- **Difficulty tier:** Intermediate
- **Game name:** Many Nets
- **Goal:** Predict the SD of the means from n-fish nets, then cast 500 nets.
- **Interaction:** Choose n; slider; cast; means pile into a histogram alongside the population histogram.
- **Data generation:** Random population; n from 2 to 100.
- **Scoring:** Closeness (tolerance 20%).
- **Reveal:** σ/√n; three panels: population, one sample, sampling distribution.
- **Why it works:** The three-panel reveal is the picture most textbooks fail to make stick.
- **Engine type:** SAMPLER

### W6.11 Standard error
- **Name:** Standard error
- **Synonyms/notation:** SE, SEM (standard error of the mean), s/√n, SE of a proportion √(p(1−p)/n)
- **Definition:** The SD of a statistic across repeated samples; how much your estimate would typically move if you re-sampled.
- **Formula/procedure:** SE(x̄) = s/√n; SE(p̂) = √(p̂(1 − p̂)/n).
- **Prerequisites:** W6.10
- **Misconception:** Confusing SE (precision of an estimate) with SD (spread of data); and expecting SE to halve when n doubles (it needs 4×).
- **Real-world example:** Error bars on a bar chart might be SD, SE or CI; they tell very different stories.
- **Difficulty tier:** Intermediate
- **Game name:** Shrink by Root n
- **Goal:** Predict how much n must grow to halve the SE, then verify.
- **Interaction:** Current n and SE shown; slider for new n; run 300 samples at the new n.
- **Data generation:** Random σ, starting n.
- **Scoring:** 100 if new n within 15% of 4×; partial by closeness on log scale.
- **Reveal:** SE vs n curve; SD stays flat.
- **Why it works:** Learning the √n cost of precision is the most practical fact in the world.
- **Engine type:** ESTIMATE

### W6.12 Sampling distribution of a proportion
- **Name:** Sampling distribution of p̂
- **Synonyms/notation:** p̂, sample proportion, normal approximation np ≥ 10 and n(1−p) ≥ 10
- **Definition:** The sample proportion wobbles around the true proportion with SD √(p(1−p)/n) and is roughly normal if n is big enough.
- **Formula/procedure:** p̂ ≈ N(p, p(1−p)/n) when np, n(1−p) ≥ 10.
- **Prerequisites:** W6.10, W5.07
- **Misconception:** Using the normal approximation with tiny expected counts (e.g. p = 0.02, n = 50).
- **Real-world example:** The wobble in a 1,000-person poll with 52% support.
- **Difficulty tier:** Intermediate
- **Game name:** Poll Wobble
- **Goal:** Predict the range in which 95% of polls of size n would land.
- **Interaction:** Set n; drag two handles; run 500 polls.
- **Data generation:** True p random; n 20–2000.
- **Scoring:** Closeness of handles to p ± 1.96 SE (tolerance 0.3 SE each).
- **Reveal:** Histogram of p̂ with the normal overlay; a small-n round where the approximation fails.
- **Why it works:** Lays the ground for margin of error.
- **Engine type:** SAMPLER

### W6.13 Point estimate
- **Name:** Point estimate
- **Synonyms/notation:** estimator vs estimate, θ̂, plug-in estimate
- **Definition:** A single number from the sample used as the best guess for the population parameter.
- **Formula/procedure:** x̄ estimates μ; s estimates σ; p̂ estimates p; r estimates ρ.
- **Prerequisites:** W1.09
- **Misconception:** Reporting a point estimate without any uncertainty.
- **Real-world example:** "The average commute is 37 minutes" (from a sample).
- **Difficulty tier:** Beginner
- **Game name:** Best Guess
- **Goal:** Give the point estimate for the requested parameter from a sample, then say how sure you are.
- **Interaction:** Sample shown; slider for estimate; second slider for "how wide a range would you need to be 95% sure?"
- **Data generation:** Random sample, random parameter requested.
- **Scoring:** 50 closeness of estimate; 50 for a range that contains the truth without being more than 3× wider than needed.
- **Reveal:** The truth; the ideal interval (teaser for CI).
- **Why it works:** Forces the "plus or minus what?" question immediately.
- **Engine type:** ESTIMATE

### W6.14 Confidence interval for a mean (σ known, z)
- **Name:** Confidence interval
- **Synonyms/notation:** CI, interval estimate, 95% CI, x̄ ± z*·σ/√n, confidence level, critical value
- **Definition:** A range built from the sample that, in the long run, captures the true parameter a stated percentage of the time.
- **Formula/procedure:** x̄ ± z*(σ/√n); z* = 1.96 for 95%, 1.645 for 90%, 2.576 for 99%.
- **Prerequisites:** W6.11, W5.14
- **Misconception:** "There is a 95% probability that μ is in this interval" (μ is fixed; the interval is random).
- **Real-world example:** "Average sleep 6.8 h (95% CI 6.5–7.1)".
- **Difficulty tier:** Intermediate
- **Game name:** Net Caster
- **Goal:** Set the net width so it catches the true mean 95% of the time, without wasting net.
- **Interaction:** Drag half-width; cast 100 nets (each from a fresh sample); count captures.
- **Data generation:** Known σ, random μ, n.
- **Scoring:** 100 × closeness of capture rate to 95% (tolerance 4 points), minus a width penalty if more than 20% wider than needed.
- **Reveal:** The z*·σ/√n formula; the 100 intervals drawn with misses in red.
- **Why it works:** The capture-rate framing is the correct interpretation enacted.
- **Engine type:** BUILD

### W6.15 Confidence interval for a mean (σ unknown, t)
- **Name:** t confidence interval
- **Synonyms/notation:** x̄ ± t*(s/√n), df = n − 1
- **Definition:** The usual CI for a mean when the SD is estimated from the data, using t to widen it for small samples.
- **Formula/procedure:** x̄ ± t*₍df₎ s/√n.
- **Prerequisites:** W6.14, W5.15
- **Misconception:** Using 1.96 for n = 6 (t* = 2.57).
- **Real-world example:** A clinical pilot with 10 patients.
- **Difficulty tier:** Intermediate
- **Game name:** Small Net
- **Goal:** Choose z or t and the right multiplier for a small sample so the capture rate is right.
- **Interaction:** Toggle z/t; df auto; cast 200 nets; see capture rate.
- **Data generation:** n 4–15; σ unknown.
- **Scoring:** 100 if capture rate within 3 points of nominal and t chosen.
- **Reveal:** z-based nets capture only ~88% at n = 5.
- **Why it works:** Seeing the under-coverage is the reason to use t.
- **Engine type:** BUILD

### W6.16 Confidence interval for a proportion
- **Name:** CI for a proportion
- **Synonyms/notation:** p̂ ± z*√(p̂(1−p̂)/n), Wald interval, Wilson interval, Agresti–Coull
- **Definition:** A range for the true proportion from a sample proportion.
- **Formula/procedure:** Wald: p̂ ± z*√(p̂(1−p̂)/n); Wilson is better for small n or extreme p̂.
- **Prerequisites:** W6.12, W6.14
- **Misconception:** Wald interval with 0 or 1 successes gives zero width; believe the Wilson/Agresti–Coull alternative.
- **Real-world example:** Conversion rate 3.2% (95% CI 2.6–3.9%) in an A/B test.
- **Difficulty tier:** Intermediate
- **Game name:** Poll Bracket
- **Goal:** Build the interval for a poll result; then handle a tiny sample where Wald breaks.
- **Interaction:** Drag edges; choose method (Wald/Wilson); cast 200 polls.
- **Data generation:** p, n random; one round with n = 15, p̂ = 0.
- **Scoring:** Closeness of capture rate; bonus for choosing Wilson in the breaking round.
- **Reveal:** Wald vs Wilson coverage chart.
- **Why it works:** The breaking round motivates the better method.
- **Engine type:** BUILD

### W6.17 Margin of error and sample-size planning
- **Name:** Margin of error
- **Synonyms/notation:** MoE, E, half-width, ±, n = (z*σ/E)², n = z*²p(1−p)/E²
- **Definition:** The half-width of a confidence interval; the "±" in poll results.
- **Formula/procedure:** E = z*·SE; for a proportion the conservative n = (1.96/E)²·0.25 ≈ 1/E².
- **Prerequisites:** W6.14, W6.16
- **Misconception:** Thinking a bigger population needs a bigger sample (it barely matters once N ≫ n).
- **Real-world example:** A poll of 1,000 has ±3% whether the country has 5 million or 1 billion people.
- **Difficulty tier:** Intermediate
- **Game name:** Budget Pollster
- **Goal:** Pick the smallest sample that achieves a target margin of error, within budget.
- **Interaction:** Slider for n; cost meter; target E shown; submit; run 300 polls to check.
- **Data generation:** Random target E (1–6%), cost per respondent, population size (varied widely to show irrelevance).
- **Scoring:** 100 if n within 10% of required; −20 if the player raised n because population was large.
- **Reveal:** The 1/E² curve; population-size insensitivity.
- **Why it works:** Budget pressure makes the 1/E² cost memorable.
- **Engine type:** ESTIMATE

### W6.18 Interpreting the confidence level
- **Name:** Confidence-level interpretation
- **Synonyms/notation:** long-run coverage, frequentist interpretation, "95% of such intervals"
- **Definition:** 95% confidence means the *method* captures the truth in 95% of repeated samples; any single interval either does or doesn't.
- **Formula/procedure:** Coverage = proportion of repeated intervals containing the parameter.
- **Prerequisites:** W6.14
- **Misconception:** "95% of the data lie in the CI" or "95% chance the parameter is in this one".
- **Real-world example:** Reporting standards require CIs; misreading them is the most common error in press reports.
- **Difficulty tier:** Intermediate
- **Game name:** Hundred Nets
- **Goal:** Before seeing the truth, bet on how many of 100 intervals contain it; then pick the true statements about one highlighted interval.
- **Interaction:** Slider for count; reveal; then tick statements (3 true, 3 false).
- **Data generation:** Fresh 100 samples each play.
- **Scoring:** 40 closeness (tolerance 4); 60 statements.
- **Reveal:** The 100 intervals; the highlighted one labelled "contains μ: yes/no — no probability attaches".
- **Why it works:** Statement-ticking directly targets the misquotes.
- **Engine type:** SAMPLER

### W6.19 Bootstrap
- **Name:** Bootstrap
- **Synonyms/notation:** bootstrapping, resampling with replacement, bootstrap CI (percentile, BCa), bootstrap SE
- **Definition:** Estimate the wobble of a statistic by repeatedly re-sampling your own data with replacement and recomputing it.
- **Formula/procedure:** Repeat B times: draw n values with replacement from the sample, compute the statistic; the SD of the B values is the bootstrap SE; the 2.5th–97.5th percentiles give a CI.
- **Prerequisites:** W6.10, W6.11
- **Misconception:** Thinking the bootstrap creates new information or fixes a biased sample.
- **Real-world example:** CI for a median or a ratio where no formula exists.
- **Difficulty tier:** Advanced
- **Game name:** Resample Reef
- **Goal:** Build a bootstrap distribution for the median and read off its CI.
- **Interaction:** Press "Resample" to draw with replacement (duplicates shown as stacked dots); compute median; after 20 manual presses, press "×1,000"; drag CI edges.
- **Data generation:** Random skewed sample n = 15–40.
- **Scoring:** Closeness of CI edges to the percentile CI (tolerance 0.2 IQR each).
- **Reveal:** Bootstrap histogram; compared with a formula-based SE where one exists.
- **Why it works:** The stacked duplicates make "with replacement" visible.
- **Engine type:** SAMPLER

### W6.20 Bias of an estimator
- **Name:** Bias of an estimator
- **Synonyms/notation:** unbiased, E[θ̂] − θ, biased estimator, bias correction
- **Definition:** An estimator is unbiased if, on average over repeated samples, it hits the true value.
- **Formula/procedure:** Bias(θ̂) = E[θ̂] − θ.
- **Prerequisites:** W6.10, W3.05
- **Misconception:** Thinking unbiased means "correct in each sample".
- **Real-world example:** The sample maximum is a biased estimator of the population maximum (always too low).
- **Difficulty tier:** Intermediate
- **Game name:** Dart Board: Bias
- **Goal:** Identify which of three estimators for the range of a uniform is unbiased.
- **Interaction:** Press "Sample" repeatedly; three estimators' values land on a board; judge which centres on the bullseye.
- **Data generation:** Uniform(0, θ) with random θ; estimators: max, 2×mean, max×(n+1)/n.
- **Scoring:** 100 for picking the unbiased ones (two); 50 for one.
- **Reveal:** Average of each estimator over 1,000 samples vs θ.
- **Why it works:** The "German tank problem" setting is memorable and concrete.
- **Engine type:** SAMPLER

### W6.21 Variance and efficiency of an estimator
- **Name:** Efficiency of an estimator
- **Synonyms/notation:** efficiency, relative efficiency, minimum-variance unbiased estimator (MVUE), precision
- **Definition:** Among unbiased estimators, the more efficient one wobbles less from sample to sample.
- **Formula/procedure:** Relative efficiency = Var(θ̂₂)/Var(θ̂₁). For normal data, Var(median) ≈ 1.57 × Var(mean).
- **Prerequisites:** W6.20
- **Misconception:** Thinking the median is always as good as the mean for estimating the centre.
- **Real-world example:** Choosing mean vs median as the estimator in a quality lab.
- **Difficulty tier:** Advanced
- **Game name:** Steady Hand
- **Goal:** Bet which estimator (mean or median) has the tighter cluster for normal data, and again for heavy-tailed data.
- **Interaction:** Choose population; bet; sample 500 times; dart clusters appear.
- **Data generation:** Normal and t(2) populations.
- **Scoring:** 50 per correct bet.
- **Reveal:** Variance ratio 1.57 for normal; reversed for heavy tails.
- **Why it works:** Shows efficiency depends on the data's shape.
- **Engine type:** SAMPLER

### W6.22 Consistency
- **Name:** Consistency
- **Synonyms/notation:** consistent estimator, convergence in probability, large-sample property
- **Definition:** An estimator is consistent if it gets closer and closer to the truth as the sample grows.
- **Formula/procedure:** θ̂ₙ → θ as n → ∞ (bias → 0 and variance → 0).
- **Prerequisites:** W6.20, W4.16
- **Misconception:** Assuming consistency implies unbiasedness at finite n (the ÷n variance is biased but consistent).
- **Real-world example:** A biased-but-consistent estimator is fine with millions of rows; a non-consistent one is never fine.
- **Difficulty tier:** Advanced
- **Game name:** Closing In
- **Goal:** Spot the inconsistent estimator among three as n grows.
- **Interaction:** n slider from 10 to 10,000 on a log scale; three traces; tap the one that doesn't converge.
- **Data generation:** Estimators: sample mean, first observation only, ÷n variance.
- **Scoring:** 100 right, 0 wrong.
- **Reveal:** Traces with the truth line.
- **Why it works:** "First observation only" is a vivid example of an unbiased but inconsistent estimator.
- **Engine type:** SAMPLER

### W6.23 Bias–variance trade-off
- **Name:** Bias–variance trade-off
- **Synonyms/notation:** MSE = bias² + variance, accuracy vs precision, shrinkage
- **Definition:** A slightly biased estimator can be better overall if it wobbles much less; the total error combines both.
- **Formula/procedure:** MSE(θ̂) = Bias² + Var.
- **Prerequisites:** W6.20, W6.21
- **Misconception:** Always preferring the unbiased estimator.
- **Real-world example:** Shrinking small-area estimates toward the national average in official statistics.
- **Difficulty tier:** Advanced
- **Game name:** Four Dartboards
- **Goal:** Rank four dartboards (low/high bias × low/high variance) by total error.
- **Interaction:** Drag boards into order; then move a shrinkage slider that trades bias for variance and find the minimum MSE.
- **Data generation:** Random bias/variance for boards; a shrinkage estimator with a tunable factor.
- **Scoring:** 50 ranking, 50 closeness to the MSE-minimising slider setting.
- **Reveal:** MSE decomposition bars.
- **Why it works:** The slider lets the player feel the trade-off rather than read about it.
- **Engine type:** PICK

### W6.24 Finite population correction
- **Name:** Finite population correction
- **Synonyms/notation:** FPC, √((N − n)/(N − 1)), sampling fraction n/N
- **Definition:** When you sample a big fraction of a small population, estimates are more precise than the usual formula says.
- **Formula/procedure:** SE_corrected = SE × √((N − n)/(N − 1)); negligible when n/N < 5%.
- **Prerequisites:** W6.11
- **Misconception:** Applying it (or worrying about it) for huge populations.
- **Real-world example:** Surveying 80 of a company's 100 staff.
- **Difficulty tier:** Advanced
- **Game name:** Nearly Everyone
- **Goal:** Predict how the SE changes as you sample a larger share of a small pond.
- **Interaction:** Slider n up to N; predicted SE curve drawn by hand; run.
- **Data generation:** N 50–300.
- **Scoring:** 100 × (1 − mean error of the hand-drawn curve).
- **Reveal:** SE → 0 as n → N.
- **Why it works:** Seeing SE hit zero at a census is the intuition.
- **Engine type:** ESTIMATE

### W6.25 Survey weights and post-stratification
- **Name:** Survey weighting
- **Synonyms/notation:** weights, post-stratification, raking, design weights, weighted estimate
- **Definition:** Giving under-represented groups more weight so the sample mimics the population mix.
- **Formula/procedure:** wₕ = (population share of h)/(sample share of h); weighted mean = Σwᵢxᵢ/Σwᵢ.
- **Prerequisites:** W6.09, W2.04
- **Misconception:** Thinking weights can fix bias within a group (they only fix group mix).
- **Real-world example:** Polls reweighting by age, education and region.
- **Difficulty tier:** Advanced
- **Game name:** Rebalance
- **Goal:** Set weights so the sample's age mix matches the population, then read the corrected estimate.
- **Interaction:** Sliders per group; bars show sample vs population shares; corrected estimate hidden until submit.
- **Data generation:** 3–4 groups with random sample/population shares and group means.
- **Scoring:** 50 for weights within 10%; 50 closeness of estimate.
- **Reveal:** Weighted mean formula; note that heavy weights inflate variance (effective n).
- **Why it works:** Connects to the weighted mean from W2.
- **Engine type:** BUILD

---

## World 7 — Hypothesis Highlands (Intermediate → Advanced)

Theme: a mountain court where claims are put on trial; the player is prosecutor, defence and jury.

### W7.01 Null hypothesis
- **Name:** Null hypothesis
- **Synonyms/notation:** H₀, null, "no effect / no difference", status quo hypothesis
- **Definition:** The boring default claim that nothing is going on (no difference, no relationship), which the data will try to knock down.
- **Formula/procedure:** State it as an equality about a parameter: H₀: μ = 50, H₀: p₁ = p₂, H₀: ρ = 0.
- **Prerequisites:** W1.09, W6.13
- **Misconception:** Writing H₀ about the sample ("x̄ = 50") or concluding that failing to reject H₀ proves it true.
- **Real-world example:** "The new drug has the same recovery rate as placebo."
- **Difficulty tier:** Intermediate
- **Game name:** Write the Null
- **Goal:** Translate a research question into a correctly written H₀.
- **Interaction:** Drag parameter symbol, relation sign and value into an H₀ slot; distractors include x̄ and ≠.
- **Data generation:** Random research question templates (means, proportions, correlations, differences).
- **Scoring:** 20 per correct H₀ over 5; −10 for using a sample symbol.
- **Reveal:** The correct H₀ with a note on why = goes in the null.
- **Why it works:** Building the sentence from parts enforces parameter-not-statistic.
- **Engine type:** MATCH

### W7.02 Alternative hypothesis
- **Name:** Alternative hypothesis
- **Synonyms/notation:** H₁, Hₐ, research hypothesis, directional/non-directional alternative
- **Definition:** The claim you're looking for evidence of: that there *is* a difference or relationship.
- **Formula/procedure:** H₁: μ ≠ 50 (two-sided) or μ > 50 / μ < 50 (one-sided); must be the logical complement of H₀.
- **Prerequisites:** W7.01
- **Misconception:** Choosing a one-sided H₁ after seeing the data direction.
- **Real-world example:** "The new drug has a higher recovery rate than placebo."
- **Difficulty tier:** Intermediate
- **Game name:** Pick a Side
- **Goal:** Pair each H₀ with its matching H₁ and decide whether the research question justifies one tail.
- **Interaction:** Drag H₁ cards onto H₀ cards; toggle one/two-sided; justify by tapping a reason.
- **Data generation:** Random questions, half with a legitimate directional prior.
- **Scoring:** 60 matching, 40 tail decisions.
- **Reveal:** The rejection region drawn for the chosen tail.
- **Why it works:** Forces the tail decision *before* data, where it belongs.
- **Engine type:** MATCH

### W7.03 Test statistic
- **Name:** Test statistic
- **Synonyms/notation:** z, t, χ², F, U, W; signal-to-noise ratio; (estimate − null value)/SE
- **Definition:** A single number measuring how far the data are from what the null predicts, in units of typical wobble.
- **Formula/procedure:** Most take the form (observed − expected under H₀)/SE.
- **Prerequisites:** W6.11, W3.11
- **Misconception:** Thinking a bigger test statistic means a bigger effect (it also grows with n).
- **Real-world example:** t = 3.1 means the observed mean is 3.1 standard errors from the null.
- **Difficulty tier:** Intermediate
- **Game name:** Signal to Noise
- **Goal:** Estimate the test statistic from a plot showing the estimate, the null value and the SE.
- **Interaction:** Slider for the statistic; a ruler in SE units appears after submitting.
- **Data generation:** Random estimate, null, SE, n.
- **Scoring:** Closeness (tolerance 0.5).
- **Reveal:** (x̄ − μ₀)/SE computed; a second panel with the same effect but 4× n showing the statistic doubling.
- **Why it works:** The 4× n panel separates effect size from evidence.
- **Engine type:** ESTIMATE

### W7.04 Null distribution and the p-value
- **Name:** p-value
- **Synonyms/notation:** p, probability value, null distribution, "as or more extreme", observed significance level
- **Definition:** If the null were true, the probability of getting data at least as extreme as what you observed.
- **Formula/procedure:** p = P(test statistic ≥ observed | H₀); two-sided doubles the tail (or sums both).
- **Prerequisites:** W7.03, W5.14
- **Misconception:** "p is the probability that H₀ is true" or "p is the probability the result was due to chance".
- **Real-world example:** p = 0.03 means a 3% chance of a difference this large if the drug did nothing.
- **Difficulty tier:** Intermediate
- **Game name:** Shuffle Court
- **Goal:** Build the null distribution by shuffling group labels, then locate your observed difference in it.
- **Interaction:** Two groups of dots; press "Shuffle" to randomly reassign labels and plot the difference; after 20 presses, "×5,000"; drag a marker to the observed difference; the tail beyond it shades; slider for p.
- **Data generation:** Two groups (n 8–30) with a random true difference 0–1.5 SD.
- **Scoring:** Closeness of p (tolerance 0.04).
- **Reveal:** The shaded tail fraction = p; the correct sentence and two incorrect sentences, with the wrong ones crossed out.
- **Why it works:** Shuffling constructs "if H₀ were true" physically; the p-value is a shaded area the player made.
- **Engine type:** SAMPLER

### W7.05 Significance level
- **Name:** Significance level
- **Synonyms/notation:** α, alpha, 0.05, threshold, Type I error rate, "statistically significant"
- **Definition:** The cut-off chosen in advance below which a p-value is called significant; it's the false-alarm rate you're willing to accept.
- **Formula/procedure:** Reject H₀ if p < α. Choose α before the data (0.05 by convention; 0.005 or 0.01 for stricter fields).
- **Prerequisites:** W7.04
- **Misconception:** Treating 0.05 as a law of nature, or calling p = 0.049 "significant" and p = 0.051 "no effect".
- **Real-world example:** Particle physics uses 5σ (α ≈ 3×10⁻⁷); A/B tests often use 0.05.
- **Difficulty tier:** Intermediate
- **Game name:** Draw the Line
- **Goal:** Set α to balance false alarms against missed detections for a given cost scenario.
- **Interaction:** α slider; a cost scenario (false alarm costs X, miss costs Y); run 1,000 true-null and 1,000 true-effect trials; total cost shown.
- **Data generation:** Random costs and effect size.
- **Scoring:** 100 × (cost at best α)/(cost at chosen α).
- **Reveal:** Cost vs α curve; note that 0.05 is rarely the minimum.
- **Why it works:** α becomes a decision with consequences rather than a ritual.
- **Engine type:** BUILD

### W7.06 One-tailed vs two-tailed tests
- **Name:** One- vs two-tailed test
- **Synonyms/notation:** one-sided, two-sided, directional, rejection region, tail
- **Definition:** A two-tailed test looks for a difference in either direction; a one-tailed test looks in one pre-specified direction only.
- **Formula/procedure:** Two-tailed: p = 2 × one-tail area; critical z 1.96 vs 1.645 at α = 0.05.
- **Prerequisites:** W7.02, W7.05
- **Misconception:** Switching to one-tailed after seeing the data to halve the p-value.
- **Real-world example:** Testing whether a drug is *better* vs *different*; regulators usually demand two-tailed.
- **Difficulty tier:** Intermediate
- **Game name:** Which Tail
- **Goal:** Shade the correct rejection region for a described test and compute the p-value both ways.
- **Interaction:** Tap the tail(s) to shade; two p sliders.
- **Data generation:** Random z/t statistic and random hypothesis wording.
- **Scoring:** 40 shading, 60 p-values (tolerance 0.02).
- **Reveal:** Both regions; a "cheat detector" round where the player must say whether a described analysis switched tails post hoc.
- **Why it works:** Seeing the halved p-value and the cheat detector makes the abuse obvious.
- **Engine type:** PICK

### W7.07 Type I error
- **Name:** Type I error
- **Synonyms/notation:** false positive, false alarm, α error, rejecting a true H₀
- **Definition:** Concluding there's an effect when there isn't one.
- **Formula/procedure:** P(Type I) = α when H₀ is true and assumptions hold.
- **Prerequisites:** W7.05
- **Misconception:** Thinking α is the overall rate of false findings in a field (that also depends on how many nulls are true: the false discovery rate).
- **Real-world example:** Approving a useless drug; convicting an innocent person.
- **Difficulty tier:** Intermediate
- **Game name:** False Alarm
- **Goal:** Predict how many of 100 tests on pure noise will come out "significant".
- **Interaction:** Slider; press "Run 100 null tests"; significant ones light up.
- **Data generation:** 100 datasets with zero true effect.
- **Scoring:** Closeness (tolerance 3).
- **Reveal:** ≈ 5 light up; a histogram of the 100 p-values is flat (uniform under H₀).
- **Why it works:** The uniform-p histogram under the null is a key, rarely taught, intuition.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W7.08 Type II error
- **Name:** Type II error
- **Synonyms/notation:** false negative, miss, β error, failing to reject a false H₀
- **Definition:** Missing an effect that really exists.
- **Formula/procedure:** β = P(not reject | H₁ true); depends on effect size, n, α and variability.
- **Prerequisites:** W7.07
- **Misconception:** Interpreting "not significant" as "no effect".
- **Real-world example:** A screening test that misses early cancers.
- **Difficulty tier:** Intermediate
- **Game name:** Missed Signal
- **Goal:** Predict how often a real but small effect will be missed at a given n.
- **Interaction:** Effect size and n shown; slider for miss rate; run 500 studies.
- **Data generation:** Random small-medium effect, n 10–80.
- **Scoring:** Closeness (tolerance 0.1).
- **Reveal:** The two overlapping sampling distributions with β shaded.
- **Why it works:** Shows that "not significant" is often the expected result of a weak study.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W7.09 Statistical power
- **Name:** Power
- **Synonyms/notation:** 1 − β, sensitivity of a test, power analysis, a priori power, 80% convention
- **Definition:** The probability a study detects an effect of a given size if it's really there.
- **Formula/procedure:** Power = 1 − β; increases with n, effect size and α, decreases with noise. For two-group means: n per group ≈ 2(z_α/2 + z_β)²/d².
- **Prerequisites:** W7.08, W7.10
- **Misconception:** Computing "post-hoc power" from the observed effect (it's just a function of p).
- **Real-world example:** Most pre-2015 psychology studies had power ~35% for typical effects.
- **Difficulty tier:** Intermediate
- **Game name:** Power Dials
- **Goal:** Turn the dials (n, effect size, α, SD) to reach 80% power with the least cost.
- **Interaction:** Four dials; power gauge hidden until "Check"; each check costs points.
- **Data generation:** Random fixed effect size and SD; n and α adjustable; cost per participant.
- **Scoring:** 100 − 10 × checks used, if 80% reached within 10% of minimum n.
- **Reveal:** Power curve vs n; the overlapping distributions.
- **Why it works:** Feeling which dial moves power most is the practical knowledge.
- **Engine type:** NEW: TUNE

### W7.10 Effect size: Cohen's d
- **Name:** Cohen's d
- **Synonyms/notation:** d, standardised mean difference, SMD, Hedges' g (small-sample corrected), Glass's Δ
- **Definition:** The difference between two means measured in standard deviations.
- **Formula/procedure:** d = (x̄₁ − x̄₂)/s_pooled; benchmarks 0.2 small, 0.5 medium, 0.8 large (context-dependent).
- **Prerequisites:** W3.04, W7.03
- **Misconception:** Treating a small p as a large effect; p and d are different things.
- **Real-world example:** A tutoring programme with d = 0.3 is meaningful in education even though it looks "small".
- **Difficulty tier:** Intermediate
- **Game name:** Overlap
- **Goal:** Estimate d from two overlapping distributions, and from two mean/SD cards.
- **Interaction:** Slider for d; round 2: slide one curve until the overlap matches a target d.
- **Data generation:** Random means and pooled SD.
- **Scoring:** Closeness (tolerance 0.2).
- **Reveal:** Overlap percentage and "probability of superiority" for the true d.
- **Why it works:** Overlap pictures give d a meaning beyond a number.
- **Engine type:** ESTIMATE

### W7.11 Effect size: r and eta-squared
- **Name:** Correlation-type effect sizes
- **Synonyms/notation:** r, r², η² (eta-squared), partial η², ω², Cohen's f, variance explained
- **Definition:** Effect sizes that express how much of the outcome's variation is linked to the predictor or group.
- **Formula/procedure:** r² = proportion of variance explained; η² = SS_between/SS_total; conversions: d ≈ 2r/√(1 − r²).
- **Prerequisites:** W7.10, W3.03
- **Misconception:** Reading r = 0.3 as "30% of variance" (it's 9%).
- **Real-world example:** Reporting η² alongside an ANOVA F.
- **Difficulty tier:** Advanced
- **Game name:** Slice the Variance
- **Goal:** Split a bar of total variance into "explained by group" and "leftover" to match the data.
- **Interaction:** Drag a divider on a variance bar; the group plot is shown.
- **Data generation:** 2–4 groups with random between/within variance.
- **Scoring:** Closeness of η² (tolerance 0.08).
- **Reveal:** SS_between and SS_within as coloured squares; r² ↔ η² equivalence for two groups.
- **Why it works:** Variance-splitting is the common thread of r², η² and ANOVA.
- **Engine type:** ESTIMATE

### W7.12 Odds ratio
- **Name:** Odds ratio
- **Synonyms/notation:** OR, cross-product ratio, (a·d)/(b·c), log odds ratio
- **Definition:** How many times higher the odds of an outcome are in one group than another.
- **Formula/procedure:** OR = [p₁/(1−p₁)]/[p₂/(1−p₂)] = ad/bc from a 2×2 table; OR = 1 means no association.
- **Prerequisites:** W4.19, W4.09
- **Misconception:** Reading OR as a relative risk (they differ when the outcome is common).
- **Real-world example:** Case-control studies of smoking and lung cancer report ORs because risks can't be computed.
- **Difficulty tier:** Intermediate
- **Game name:** Cross Product
- **Goal:** Estimate the OR from a 2×2 table and judge whether it approximates the RR.
- **Interaction:** Table shown; slider (log scale) for OR; toggle "outcome rare?"
- **Data generation:** Random 2×2; 50% with common outcome.
- **Scoring:** Closeness on log scale (factor 1.3 tolerance); 20 bonus for the rare/common judgement.
- **Reveal:** ad/bc computed; OR vs RR side by side.
- **Why it works:** The side-by-side shows when OR exaggerates.
- **Engine type:** ESTIMATE

### W7.13 Relative risk, absolute risk and NNT
- **Name:** Relative risk
- **Synonyms/notation:** RR, risk ratio, absolute risk reduction (ARR), relative risk reduction (RRR), number needed to treat (NNT = 1/ARR), number needed to harm
- **Definition:** The ratio of the probability of an outcome in one group to that in another; absolute risk reduction is the difference.
- **Formula/procedure:** RR = p₁/p₂; ARR = p₂ − p₁; NNT = 1/ARR.
- **Prerequisites:** W7.12
- **Misconception:** "Halves your risk" sounds huge when risk goes from 2 in 10,000 to 1 in 10,000.
- **Real-world example:** Statin headlines quote RRR (−30%) while ARR may be ~1 percentage point.
- **Difficulty tier:** Intermediate
- **Game name:** Headline Converter
- **Goal:** Convert a relative-risk headline into absolute risk and NNT using an icon array.
- **Interaction:** 1,000-person icon array; drag to colour the sick in each group; sliders for ARR and NNT.
- **Data generation:** Random baseline risk (0.1–30%) and RR (0.3–3).
- **Scoring:** Closeness of ARR (tolerance 20% relative) and NNT (factor 1.3).
- **Reveal:** Both groups' arrays side by side; the headline rewritten honestly.
- **Why it works:** Icon arrays are the evidence-based way to communicate risk; the player builds one.
- **Engine type:** BUILD

### W7.14 Critical values and rejection regions
- **Name:** Critical value
- **Synonyms/notation:** critical region, rejection region, z_crit, t_crit, decision rule
- **Definition:** The cut-off value of the test statistic beyond which you reject H₀; equivalent to comparing p with α.
- **Formula/procedure:** Reject if |statistic| > critical value for the chosen α and df.
- **Prerequisites:** W7.05, W5.15
- **Misconception:** Forgetting df when looking up t, or using a one-tailed critical value for a two-tailed test.
- **Real-world example:** Old-style tables before software: "t(18) = 2.3 > 2.10, reject".
- **Difficulty tier:** Intermediate
- **Game name:** Border Patrol
- **Goal:** Place the critical boundaries on the null distribution for given α, df and tails.
- **Interaction:** Drag boundary lines; press "Check" to see α shaded.
- **Data generation:** Random α (0.1/0.05/0.01), df, tails.
- **Scoring:** Closeness (tolerance 0.1 in statistic units).
- **Reveal:** The equivalence "statistic beyond boundary ⇔ p < α" animated.
- **Why it works:** Makes the two decision rules visibly identical.
- **Engine type:** BUILD

### W7.15 z-test for a proportion
- **Name:** One-proportion z-test
- **Synonyms/notation:** z-test, test of a proportion, binomial test (exact alternative)
- **Definition:** Tests whether a sample proportion differs from a claimed value.
- **Formula/procedure:** z = (p̂ − p₀)/√(p₀(1 − p₀)/n); requires np₀, n(1−p₀) ≥ 10.
- **Prerequisites:** W6.12, W7.04
- **Misconception:** Using p̂ instead of p₀ in the SE for the test.
- **Real-world example:** Does the coin-flip app produce heads 50% of the time?
- **Difficulty tier:** Intermediate
- **Game name:** Claim Checker
- **Goal:** Bet whether the sample proportion is significantly different from the claim, then see the z-test.
- **Interaction:** Claim and sample shown; bet chips on "significant / not"; confidence slider; reveal.
- **Data generation:** Random p₀, true p near p₀, n.
- **Scoring:** Chips won if correct, scaled by how well the confidence matched the actual p-value (Brier-style).
- **Reveal:** z computed with numbers; p-value; CI for p.
- **Why it works:** Betting with calibration scoring trains honest uncertainty.
- **Engine type:** SIGNIFICANCE BET

### W7.16 One-sample t-test
- **Name:** One-sample t-test
- **Synonyms/notation:** single-sample t, t = (x̄ − μ₀)/(s/√n), df = n − 1
- **Definition:** Tests whether a sample mean differs from a specified value.
- **Formula/procedure:** t = (x̄ − μ₀)/(s/√n); compare to t(n − 1).
- **Prerequisites:** W7.03, W6.15
- **Misconception:** Thinking non-normal data always forbids it (robust for n ≳ 30 unless very skewed).
- **Real-world example:** Are our 500 mL bottles really filled to 500 mL on average?
- **Difficulty tier:** Intermediate
- **Game name:** Bottle Inspector
- **Goal:** Bet whether the sample mean differs significantly from the label.
- **Interaction:** Dot plot with label line; bet; confidence slider; reveal.
- **Data generation:** Random true shift 0–1 SD, n 5–40.
- **Scoring:** Calibrated betting score.
- **Reveal:** t, df, p, CI; the formula with numbers.
- **Why it works:** Eye vs test comparison calibrates the "looks different" sense.
- **Engine type:** SIGNIFICANCE BET

### W7.17 Paired t-test
- **Name:** Paired t-test
- **Synonyms/notation:** dependent-samples t, matched-pairs t, repeated-measures t, test on differences
- **Definition:** For before/after or matched pairs, test whether the average difference is zero.
- **Formula/procedure:** Compute dᵢ = x₁ᵢ − x₂ᵢ; one-sample t on d with μ₀ = 0.
- **Prerequisites:** W7.16
- **Misconception:** Running an independent t-test on paired data, throwing away the pairing and losing power.
- **Real-world example:** Blood pressure before and after a drug in the same patients.
- **Difficulty tier:** Intermediate
- **Game name:** Before & After
- **Goal:** Bet on significance, first viewing the two groups unpaired, then with pairing lines drawn.
- **Interaction:** Two bets: one before "Show pairs", one after.
- **Data generation:** Strong subject effect, small consistent treatment effect so pairing changes the verdict.
- **Scoring:** Calibrated score averaged across both bets; bonus for updating in the right direction.
- **Reveal:** Independent vs paired t side by side; differences plotted.
- **Why it works:** The verdict flips when pairing is revealed, which is the whole lesson.
- **Engine type:** SIGNIFICANCE BET

### W7.18 Independent-samples t-test
- **Name:** Independent two-sample t-test
- **Synonyms/notation:** Student's t-test, pooled t, unpaired t, df = n₁ + n₂ − 2
- **Definition:** Tests whether the means of two separate groups differ.
- **Formula/procedure:** t = (x̄₁ − x̄₂)/(s_p√(1/n₁ + 1/n₂)); s_p² = [(n₁−1)s₁² + (n₂−1)s₂²]/(n₁+n₂−2).
- **Prerequisites:** W7.16, W7.10
- **Misconception:** Assuming equal variances by default; Welch's version (W7.19) is safer.
- **Real-world example:** Comparing test scores of two classes taught differently.
- **Difficulty tier:** Intermediate
- **Game name:** Two Camps
- **Goal:** Bet whether two groups differ significantly, with varying n and overlap.
- **Interaction:** Two dot plots; bet; confidence; reveal.
- **Data generation:** Random d 0–1.2, n per group 5–50.
- **Scoring:** Calibrated betting score.
- **Reveal:** t, df, p, d, CI for the difference.
- **Why it works:** Repeated exposure to overlap vs n builds the central intuition of inference.
- **Engine type:** SIGNIFICANCE BET

### W7.19 Welch's t-test
- **Name:** Welch's t-test
- **Synonyms/notation:** unequal-variances t, Welch–Satterthwaite df
- **Definition:** A version of the two-sample t-test that doesn't assume equal variances; recommended as the default.
- **Formula/procedure:** t = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂); df from the Welch–Satterthwaite formula.
- **Prerequisites:** W7.18
- **Misconception:** Running Levene's test first and choosing accordingly (this two-step procedure inflates error; just use Welch).
- **Real-world example:** Comparing salaries of a small senior group (high variance) with a large junior group.
- **Difficulty tier:** Advanced
- **Game name:** Unequal Camps
- **Goal:** Predict which test keeps the Type I error at 5% when variances and group sizes differ.
- **Interaction:** Set variance ratio and n ratio; bet on Student vs Welch; run 1,000 null simulations for each.
- **Data generation:** Variance ratio 1–9; n ratio 1–5.
- **Scoring:** 100 for correct bet and predicting the direction of Student's error inflation.
- **Reveal:** False-alarm rates for both tests.
- **Why it works:** Seeing Student's test hit 12% false alarms is convincing.
- **Engine type:** SAMPLER

### W7.20 Assumption checking (normality, equal variances)
- **Name:** Test assumptions
- **Synonyms/notation:** normality, homogeneity of variance, Levene's test, Shapiro–Wilk, independence, robustness
- **Definition:** The conditions a test relies on; checking them means looking at plots and considering the design, not just running more tests.
- **Formula/procedure:** Plot residuals/groups; Q–Q plot; Levene's test for variances; think about how data were collected for independence.
- **Prerequisites:** W5.23, W7.18
- **Misconception:** Believing assumption tests are required gatekeepers; or that violations always invalidate results.
- **Real-world example:** A t-test on heavily skewed hospital-stay data misleads; a log transform or Mann–Whitney is better.
- **Difficulty tier:** Advanced
- **Game name:** Pre-flight Check
- **Goal:** Inspect the data and tick which assumptions look fine and which are violated, then pick a remedy.
- **Interaction:** Panels: histogram per group, Q–Q plot, a design note; tick boxes; choose remedy (transform, Welch, non-parametric, proceed).
- **Data generation:** Random violations injected (skew, unequal variance, clustered sampling).
- **Scoring:** 60 for correct ticks, 40 for an acceptable remedy.
- **Reveal:** Simulated false-alarm rate with and without the remedy.
- **Why it works:** Diagnosis-then-remedy mirrors real analysis.
- **Engine type:** DETECTIVE

### W7.21 Chi-square goodness-of-fit test
- **Name:** Chi-square goodness of fit
- **Synonyms/notation:** χ² GOF, one-way chi-square, Σ(O − E)²/E, df = k − 1
- **Definition:** Tests whether observed category counts match the counts a theory predicts.
- **Formula/procedure:** χ² = Σ(O − E)²/E; df = k − 1; expected counts ≥ 5.
- **Prerequisites:** W5.16, W5.04
- **Misconception:** Using percentages instead of counts (χ² needs raw counts).
- **Real-world example:** Are M&M colours produced in the stated proportions? Is a die fair?
- **Difficulty tier:** Intermediate
- **Game name:** Loaded Die
- **Goal:** Bet whether the die is loaded from 60 rolls, then see the χ² test.
- **Interaction:** Bar chart of counts vs expected line; bet; confidence; reveal; "roll more" option.
- **Data generation:** Fair or loaded (random face weights).
- **Scoring:** Calibrated betting score.
- **Reveal:** Σ(O − E)²/E term by term; p; the sampling distribution of χ² under fairness.
- **Why it works:** Revisits W5.04 with the formal test, closing the loop.
- **Engine type:** SIGNIFICANCE BET

### W7.22 Chi-square test of independence
- **Name:** Chi-square test of independence
- **Synonyms/notation:** χ² test of association, contingency-table test, df = (r − 1)(c − 1), Cramér's V (effect size)
- **Definition:** Tests whether two categorical variables are related, by comparing the table's counts with what independence would predict.
- **Formula/procedure:** E_ij = (row total × column total)/n; χ² = Σ(O − E)²/E; df = (r−1)(c−1); Cramér's V = √(χ²/(n·min(r−1, c−1))).
- **Prerequisites:** W7.21, W4.09
- **Misconception:** Interpreting a significant χ² as a *strong* association (it's just non-zero; check V).
- **Real-world example:** Is vaccination status associated with infection?
- **Difficulty tier:** Intermediate
- **Game name:** Table Trial
- **Goal:** Bet whether rows and columns are associated; then fill the expected counts yourself.
- **Interaction:** Table shown as mosaic plot; bet; then type expected counts for 2 cells.
- **Data generation:** Random 2×2 to 3×3 with random association strength and n.
- **Scoring:** 60 calibrated bet; 40 expected counts (tolerance 10%).
- **Reveal:** Observed vs expected tables; χ², p, V.
- **Why it works:** Computing expected counts demystifies the formula.
- **Engine type:** SIGNIFICANCE BET

### W7.23 Fisher's exact test
- **Name:** Fisher's exact test
- **Synonyms/notation:** exact test for 2×2 tables, hypergeometric test, "lady tasting tea"
- **Definition:** An exact test for small 2×2 tables that counts every possible table with the same margins.
- **Formula/procedure:** p = sum of hypergeometric probabilities of tables as or more extreme than observed, with fixed margins.
- **Prerequisites:** W5.10, W7.22
- **Misconception:** Using χ² with expected counts < 5 when Fisher's is appropriate.
- **Real-world example:** Rare adverse events in a small trial (3 of 12 vs 0 of 11).
- **Difficulty tier:** Advanced
- **Game name:** Tea Tasting
- **Goal:** Enumerate all tables with fixed margins and find the exact p-value.
- **Interaction:** Slider moves one cell count (others adjust to keep margins); the probability of each table appears as a bar; tap the bars as or more extreme than observed.
- **Data generation:** Small 2×2 (n 10–25).
- **Scoring:** 100 × correct bars tapped − 20 per wrong bar.
- **Reveal:** Summed p; comparison with χ² p.
- **Why it works:** The player literally sees the discrete sampling distribution.
- **Engine type:** BUILD

### W7.24 One-way ANOVA
- **Name:** One-way ANOVA
- **Synonyms/notation:** analysis of variance, F-test, between-groups vs within-groups variance, SS_between, SS_within, MS, F = MS_between/MS_within
- **Definition:** Tests whether three or more group means differ by comparing spread between group means with spread inside groups.
- **Formula/procedure:** F = [SS_between/(k − 1)]/[SS_within/(N − k)]; compare to F(k − 1, N − k).
- **Prerequisites:** W5.17, W7.18
- **Misconception:** Running several t-tests instead (inflates Type I error); or thinking a significant F says *which* groups differ.
- **Real-world example:** Comparing yields across four fertiliser brands.
- **Difficulty tier:** Advanced
- **Game name:** Three Camps
- **Goal:** Bet whether the groups differ, judging between-spread against within-spread.
- **Interaction:** 3–5 group dot plots; a "between ruler" and "within ruler" the player drags; bet; reveal.
- **Data generation:** k 3–5 groups; random between-group variance.
- **Scoring:** 60 calibrated bet; 40 closeness of ruler ratio to F (tolerance 40%).
- **Reveal:** SS decomposition; F, p, η².
- **Why it works:** The two-ruler mechanic *is* the F ratio.
- **Engine type:** SIGNIFICANCE BET

### W7.25 Two-way ANOVA and interactions
- **Name:** Two-way ANOVA
- **Synonyms/notation:** factorial ANOVA, main effect, interaction effect, A × B, cell means, interaction plot
- **Definition:** Tests two grouping factors at once, including whether the effect of one depends on the level of the other.
- **Formula/procedure:** Partition SS into A, B, A×B and error; F for each.
- **Prerequisites:** W7.24
- **Misconception:** Interpreting main effects when a strong interaction is present.
- **Real-world example:** Does a drug's effect differ between men and women?
- **Difficulty tier:** Advanced
- **Game name:** Crossing Lines
- **Goal:** Build an interaction plot showing the requested pattern (main effect of A only, interaction only, both).
- **Interaction:** Drag four cell-mean points; the lines update; submit.
- **Data generation:** Random requested pattern.
- **Scoring:** 100 if the pattern's qualitative signature is correct (parallel/crossing/etc.); partial by closeness.
- **Reveal:** The ANOVA table for simulated data with that pattern.
- **Why it works:** Drawing interactions is the fastest way to read them.
- **Engine type:** BUILD

### W7.26 Repeated-measures ANOVA
- **Name:** Repeated-measures ANOVA
- **Synonyms/notation:** within-subjects ANOVA, sphericity, Greenhouse–Geisser correction, Mauchly's test
- **Definition:** ANOVA for the same subjects measured several times, removing subject-to-subject differences from the error.
- **Formula/procedure:** Partition SS into conditions, subjects and error; F = MS_conditions/MS_error; correct df if sphericity fails.
- **Prerequisites:** W7.24, W7.17
- **Misconception:** Treating repeated measures as independent groups.
- **Real-world example:** Reaction times across four sleep-deprivation nights.
- **Difficulty tier:** Advanced
- **Game name:** Same Faces
- **Goal:** Bet on significance before and after subject lines are drawn across conditions.
- **Interaction:** Like W7.17 across 3–4 conditions.
- **Data generation:** Large subject effect, small condition effect.
- **Scoring:** Calibrated score across both bets.
- **Reveal:** Between-subjects vs within-subjects ANOVA tables; error term shrinks.
- **Why it works:** Extends the pairing lesson to more conditions.
- **Engine type:** SIGNIFICANCE BET

### W7.27 Post-hoc tests
- **Name:** Post-hoc comparisons
- **Synonyms/notation:** Tukey HSD, Scheffé, Dunnett, pairwise comparisons, family-wise error rate, compact letter display
- **Definition:** After a significant ANOVA, tests that find which specific groups differ while keeping the overall false-alarm rate controlled.
- **Formula/procedure:** Tukey HSD: compare |x̄ᵢ − x̄ⱼ| with q_crit·√(MS_within/n).
- **Prerequisites:** W7.24, W7.34
- **Misconception:** Doing uncorrected t-tests after ANOVA.
- **Real-world example:** Which of five teaching methods differ from each other?
- **Difficulty tier:** Advanced
- **Game name:** Letter Groups
- **Goal:** Assign letters to groups so groups sharing a letter are not significantly different.
- **Interaction:** Drag letter tags onto group bars; check.
- **Data generation:** 4–5 groups with a random structure of true differences.
- **Scoring:** 100 × correct pairwise same/different decisions.
- **Reveal:** Tukey HSD table; the honest letter display.
- **Why it works:** Letter displays are how results are published; building one teaches the logic.
- **Engine type:** BUILD

### W7.28 Mann–Whitney U test
- **Name:** Mann–Whitney U test
- **Synonyms/notation:** Wilcoxon rank-sum test, U statistic, rank test for two independent groups, probability of superiority
- **Definition:** A test comparing two independent groups by ranking all values together, with no normality assumption.
- **Formula/procedure:** Rank all N values; U = R₁ − n₁(n₁ + 1)/2; compare to its null distribution (normal approximation for large n).
- **Prerequisites:** W7.18, W3.06
- **Misconception:** Saying it tests medians (it tests stochastic dominance; medians only under equal shapes).
- **Real-world example:** Comparing ordinal pain scores between two treatments.
- **Difficulty tier:** Advanced
- **Game name:** Rank Rumble
- **Goal:** Bet whether one group's values tend to be larger, then rank the pooled values yourself.
- **Interaction:** Bet; then drag values into a single ranked line; the rank sum for group 1 updates.
- **Data generation:** Skewed data, n 6–15 per group.
- **Scoring:** 50 calibrated bet; 50 ranking accuracy.
- **Reveal:** U, p, and the probability of superiority.
- **Why it works:** Hand-ranking shows why outliers can't dominate.
- **Engine type:** SIGNIFICANCE BET

### W7.29 Wilcoxon signed-rank test
- **Name:** Wilcoxon signed-rank test
- **Synonyms/notation:** paired non-parametric test, W or T statistic
- **Definition:** The non-parametric paired test: rank the absolute differences and see whether positive and negative ranks balance.
- **Formula/procedure:** dᵢ = pairs' differences; rank |dᵢ|; W = sum of ranks with positive sign; compare to null.
- **Prerequisites:** W7.17, W7.28
- **Misconception:** Confusing it with the rank-sum test.
- **Real-world example:** Before/after satisfaction scores on a 1–7 scale.
- **Difficulty tier:** Advanced
- **Game name:** Signed Seesaw
- **Goal:** Place positive and negative ranks on a seesaw and bet whether it tips significantly.
- **Interaction:** Difference tiles with signs; drag to rank positions; seesaw tilts by signed rank sum; bet.
- **Data generation:** n 8–20 pairs, ordinal differences.
- **Scoring:** 50 ranks, 50 calibrated bet.
- **Reveal:** W, p; a paired t on the same data for comparison.
- **Why it works:** The seesaw externalises the signed-rank statistic.
- **Engine type:** SIGNIFICANCE BET

### W7.30 Kruskal–Wallis test
- **Name:** Kruskal–Wallis test
- **Synonyms/notation:** H test, non-parametric one-way ANOVA, Dunn's post-hoc
- **Definition:** Rank-based test for differences among three or more independent groups.
- **Formula/procedure:** H = [12/(N(N+1))]ΣRᵢ²/nᵢ − 3(N + 1); ≈ χ²(k − 1).
- **Prerequisites:** W7.28, W7.24
- **Misconception:** Following a significant H with uncorrected Mann–Whitney tests.
- **Real-world example:** Comparing customer wait times across three branches with skewed data.
- **Difficulty tier:** Advanced
- **Game name:** Rank Camps
- **Goal:** Bet on a difference among three skewed groups and compare the rank test to ANOVA.
- **Interaction:** Bet; reveal both tests.
- **Data generation:** Log-normal groups with random shift.
- **Scoring:** Calibrated bet.
- **Reveal:** H, p; F, p; note on which assumption ANOVA violates here.
- **Why it works:** Direct comparison of robust vs parametric outcomes.
- **Engine type:** SIGNIFICANCE BET

### W7.31 Sign test
- **Name:** Sign test
- **Synonyms/notation:** binomial sign test, median test (one-sample)
- **Definition:** The simplest test: count how many differences are positive and ask if that's unlikely under 50/50.
- **Formula/procedure:** Discard zeros; X = number of positive differences ~ Bin(n, 0.5) under H₀; p from the binomial.
- **Prerequisites:** W5.07, W7.17
- **Misconception:** Thinking it uses the sizes of differences (it ignores them, hence low power).
- **Real-world example:** Does a majority of tasters prefer recipe A?
- **Difficulty tier:** Intermediate
- **Game name:** Thumbs Up
- **Goal:** Predict the p-value for k of n positive signs, then see the binomial.
- **Interaction:** Signs shown; slider for p; reveal.
- **Data generation:** n 8–30, k random.
- **Scoring:** Closeness (tolerance 0.05).
- **Reveal:** Bin(n, 0.5) bars with tails shaded; comparison with signed-rank power.
- **Why it works:** Connects testing back to the binomial directly.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W7.32 Choosing the right test
- **Name:** Test selection
- **Synonyms/notation:** decision tree for tests, parametric vs non-parametric, flowchart
- **Definition:** Matching the data type, number of groups, pairing and assumptions to the appropriate test.
- **Formula/procedure:** Outcome type? → groups? → paired? → assumptions? → test (e.g. numeric, 2 independent groups, normal → Welch t; ordinal → Mann–Whitney; categorical → χ²/Fisher).
- **Prerequisites:** W7.15–W7.31
- **Misconception:** Choosing the test by what software defaults to.
- **Real-world example:** A reviewer asks why a χ² was used on a 1–5 rating scale.
- **Difficulty tier:** Advanced
- **Game name:** Test Picker
- **Goal:** Route each scenario through the decision tree to the right test.
- **Interaction:** Tap branches of an interactive flowchart; the test lights up.
- **Data generation:** Random scenario cards (design + data type + assumption state).
- **Scoring:** 20 per correct route over 5; 10 for an acceptable alternative.
- **Reveal:** The route and a one-line justification; the test's output on simulated data.
- **Why it works:** Explicit routing builds a durable mental flowchart.
- **Engine type:** PICK

### W7.33 Statistical vs practical significance
- **Name:** Practical significance
- **Synonyms/notation:** clinical significance, meaningful difference, minimal important difference (MID), "significant but trivial"
- **Definition:** A result can be statistically significant (unlikely under H₀) yet too small to matter, especially with huge samples.
- **Formula/procedure:** Report the effect size and CI; compare with a pre-defined minimal important difference.
- **Prerequisites:** W7.10, W7.05
- **Misconception:** Equating "significant" with "important".
- **Real-world example:** A million-user A/B test finds a 0.01% lift with p < 0.001.
- **Difficulty tier:** Intermediate
- **Game name:** Does It Matter?
- **Goal:** Sort results into four quadrants: significant/not × meaningful/not.
- **Interaction:** Drag result cards (effect, CI, p, n, MID) into a 2×2 grid.
- **Data generation:** Random cards covering all four quadrants.
- **Scoring:** 100 × correct placements.
- **Reveal:** Each card redrawn as a CI vs the MID line.
- **Why it works:** The 2×2 grid separates the two axes that learners conflate.
- **Engine type:** PICK

### W7.34 Multiple comparisons problem
- **Name:** Multiple comparisons
- **Synonyms/notation:** multiplicity, family-wise error rate (FWER), 1 − (1 − α)ᵐ, look-elsewhere effect, data dredging
- **Definition:** Running many tests makes at least one false positive very likely, even when nothing is real.
- **Formula/procedure:** P(≥1 false positive among m independent null tests) = 1 − (1 − α)ᵐ; for m = 20, ≈ 64%.
- **Prerequisites:** W7.07, W4.03
- **Misconception:** Reporting the one significant result out of twenty as a finding.
- **Real-world example:** The "green jelly beans cause acne" comic; genome-wide scans testing millions of variants.
- **Difficulty tier:** Intermediate
- **Game name:** Twenty Jelly Beans
- **Goal:** Predict the chance of at least one "significant" colour among 20 when none has any effect, then run it.
- **Interaction:** Slider; press "Test all 20 colours"; repeat 100 times to see how often a headline appears.
- **Data generation:** 20 null tests per run.
- **Scoring:** Closeness (tolerance 0.1).
- **Reveal:** 1 − 0.95²⁰; the "headline" generator prints a fake news story each time.
- **Why it works:** Generating a fake headline from noise is memorable.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W7.35 Bonferroni correction
- **Name:** Bonferroni correction
- **Synonyms/notation:** α/m, adjusted α, Šidák (1 − (1 − α)^(1/m))
- **Definition:** Divide α by the number of tests so the chance of any false positive stays at α; simple but conservative.
- **Formula/procedure:** Reject if p < α/m (or multiply each p by m).
- **Prerequisites:** W7.34
- **Misconception:** Applying it to tests that are not a "family", or forgetting it also slashes power.
- **Real-world example:** A paper with 10 outcomes using α = 0.005 per outcome.
- **Difficulty tier:** Intermediate
- **Game name:** Divide the Alpha
- **Goal:** Apply Bonferroni to a list of p-values and see which survive, then count the power lost.
- **Interaction:** Drag the threshold line down to α/m on a sorted p-value strip; results flip; run power simulation.
- **Data generation:** m 5–30 with a random number of true effects.
- **Scoring:** 60 correct survivors; 40 closeness of power-loss estimate.
- **Reveal:** FWER under null with and without correction.
- **Why it works:** The visible loss of true effects balances the protection.
- **Engine type:** BUILD

### W7.36 Holm's step-down procedure
- **Name:** Holm–Bonferroni
- **Synonyms/notation:** Holm correction, step-down, sequentially rejective
- **Definition:** A smarter Bonferroni: test the smallest p at α/m, the next at α/(m − 1), and so on until one fails.
- **Formula/procedure:** Sort p₍₁₎ ≤ … ≤ p₍ₘ₎; reject p₍ᵢ₎ if p₍ⱼ₎ < α/(m − j + 1) for all j ≤ i; stop at first failure.
- **Prerequisites:** W7.35
- **Misconception:** Continuing to reject after the first failure.
- **Real-world example:** Clinical trials with several secondary endpoints.
- **Difficulty tier:** Advanced
- **Game name:** Step Down
- **Goal:** Walk down a staircase of sorted p-values, applying the shrinking threshold, and stop correctly.
- **Interaction:** Tap each step to reject or stop; thresholds shown per step.
- **Data generation:** Random p-values with a few true effects.
- **Scoring:** 100 if the stopping point is correct; −20 per wrong step.
- **Reveal:** Holm vs Bonferroni survivors.
- **Why it works:** Stepping is the algorithm.
- **Engine type:** BUILD

### W7.37 False discovery rate (Benjamini–Hochberg)
- **Name:** False discovery rate
- **Synonyms/notation:** FDR, Benjamini–Hochberg (BH), q-value, p₍ᵢ₎ ≤ (i/m)·q
- **Definition:** Instead of preventing *any* false positive, control the *proportion* of discoveries that are false; much more power when testing thousands of things.
- **Formula/procedure:** Sort p's; find the largest i with p₍ᵢ₎ ≤ (i/m)·q; reject all p up to that i.
- **Prerequisites:** W7.36
- **Misconception:** Thinking FDR = FWER, or reading a q-value as a p-value.
- **Real-world example:** Gene-expression studies testing 20,000 genes at FDR 5%.
- **Difficulty tier:** Advanced
- **Game name:** Discovery Line
- **Goal:** Draw the BH line on a plot of sorted p-values and pick the rejections.
- **Interaction:** Drag the line's slope (q); points below the line up to the last crossing light up; submit.
- **Data generation:** m 50–500 with a random proportion of true effects.
- **Scoring:** 100 × correct rejection set; bonus for predicting the actual share of false discoveries.
- **Reveal:** True/false discoveries coloured; realised FDR vs q.
- **Why it works:** The line picture is the whole BH procedure.
- **Engine type:** BUILD

### W7.38 Confidence intervals and tests are the same thing
- **Name:** CI–test duality
- **Synonyms/notation:** confidence interval approach, "CI excludes null", inverting a test
- **Definition:** A 95% CI contains exactly the null values that a two-sided α = 0.05 test would not reject.
- **Formula/procedure:** p < 0.05 ⇔ null value outside the 95% CI (for the same test statistic).
- **Prerequisites:** W6.14, W7.05
- **Misconception:** Comparing two groups' CIs for overlap (overlapping CIs can still be significantly different).
- **Real-world example:** Journals increasingly require CIs because they show both significance and size.
- **Difficulty tier:** Intermediate
- **Game name:** Interval Verdict
- **Goal:** From a CI alone, state the test verdict; then judge two-group overlap cases.
- **Interaction:** CI drawn with null line; tap Reject/Fail; round 2: two CIs, bet whether the difference is significant.
- **Data generation:** Random CIs; round 2 includes overlapping-but-significant cases.
- **Scoring:** 50 per round.
- **Reveal:** The CI for the *difference* shown, resolving the overlap cases.
- **Why it works:** The overlap trap is extremely common and best learned by being caught.
- **Engine type:** PICK

### W7.39 Equivalence and non-inferiority testing
- **Name:** Equivalence testing
- **Synonyms/notation:** TOST (two one-sided tests), equivalence margin, non-inferiority trial, smallest effect size of interest
- **Definition:** Testing whether an effect is small enough to be ignored, which "not significant" can never show.
- **Formula/procedure:** Set margin ±Δ; run two one-sided tests that the effect is > −Δ and < +Δ; equivalence if both reject (equivalently, 90% CI within ±Δ).
- **Prerequisites:** W7.38, W7.33
- **Misconception:** Claiming "no difference" from p > 0.05.
- **Real-world example:** Generic drug approval: show bioequivalence within ±20%.
- **Difficulty tier:** Advanced
- **Game name:** Inside the Lines
- **Goal:** Set the equivalence margin and decide whether the CI proves equivalence, absence of evidence, or difference.
- **Interaction:** Drag margin lines; CI shown; tap one of three verdicts.
- **Data generation:** Random CI positions relative to margins.
- **Scoring:** 20 per correct verdict over 5.
- **Reveal:** The three verdict pictures side by side.
- **Why it works:** Makes "absence of evidence ≠ evidence of absence" visual.
- **Engine type:** PICK

### W7.40 Common p-value misinterpretations
- **Name:** p-value pitfalls
- **Synonyms/notation:** ASA statement on p-values, dichotomania, "trend toward significance", p = 0.000
- **Definition:** A catalogue of wrong sentences about p-values and what they should say instead.
- **Formula/procedure:** p is not P(H₀), not P(chance), not 1 − P(replication), not effect size; report exact p, effect and CI.
- **Prerequisites:** W7.04, W7.33
- **Misconception:** All of the above, plus "p = 0.000" (impossible; write p < 0.001).
- **Real-world example:** The ASA's 2016 statement was issued because misuse was so widespread.
- **Difficulty tier:** Intermediate
- **Game name:** Sentence Surgeon
- **Goal:** Fix five flawed sentences from a fake results section.
- **Interaction:** Tap the wrong phrase; pick the correct replacement from 3.
- **Data generation:** Templates with random numbers and random flaws.
- **Scoring:** 20 per fix.
- **Reveal:** The corrected paragraph.
- **Why it works:** Editing is more active than recognising.
- **Engine type:** DETECTIVE

---

## World 8 — Regression Ridge (Intermediate → Advanced)

Theme: climbing a ridge whose slope the player must fit; clouds of points, lines of best fit.

### W8.01 Scatter plot
- **Name:** Scatter plot
- **Synonyms/notation:** scattergram, x–y plot, bivariate plot, form/direction/strength
- **Definition:** A plot with one dot per case showing two numerical variables, used to see whether they move together.
- **Formula/procedure:** Explanatory on x, response on y; describe form (linear/curved), direction (+/−), strength, outliers.
- **Prerequisites:** W1.10, W1.11
- **Misconception:** Putting the response on the x-axis.
- **Real-world example:** Advertising spend vs sales by month.
- **Difficulty tier:** Beginner
- **Game name:** Dot Describer
- **Goal:** Describe a scatter plot's form, direction and strength with three dials.
- **Interaction:** Dials: form (linear/curved/none), direction (+/−), strength (weak/moderate/strong); tap outliers.
- **Data generation:** Random bivariate data with random form/r/outliers.
- **Scoring:** 25 per dial, 25 outliers.
- **Reveal:** r and a fitted curve.
- **Why it works:** The vocabulary of scatter plots is learned by using it.
- **Engine type:** PICK

### W8.02 Covariance
- **Name:** Covariance
- **Synonyms/notation:** Cov(X, Y), s_xy, Σ(xᵢ − x̄)(yᵢ − ȳ)/(n − 1)
- **Definition:** A measure of whether two variables rise and fall together; positive if they do, negative if opposite, but in awkward units.
- **Formula/procedure:** s_xy = Σ(xᵢ − x̄)(yᵢ − ȳ)/(n − 1); units are x-units × y-units.
- **Prerequisites:** W3.03, W2.11
- **Misconception:** Comparing covariances across datasets with different scales.
- **Real-world example:** The covariance matrix in portfolio theory.
- **Difficulty tier:** Intermediate
- **Game name:** Quadrant Count
- **Goal:** Predict the sign and rough size of covariance by looking at which quadrants (around the means) the points fall in.
- **Interaction:** Mean lines drawn; tap quadrants to colour; choose sign; slider for magnitude on a log scale.
- **Data generation:** Random bivariate data.
- **Scoring:** 50 sign, 50 magnitude (factor of 2).
- **Reveal:** Each point's (x − x̄)(y − ȳ) as a signed rectangle; sum shown.
- **Why it works:** Rectangles-with-signs is the formula as picture.
- **Engine type:** ESTIMATE

### W8.03 Pearson correlation
- **Name:** Pearson correlation coefficient
- **Synonyms/notation:** r, ρ (population), product-moment correlation, linear correlation
- **Definition:** A number from −1 to +1 measuring how tightly points follow a straight line and in which direction.
- **Formula/procedure:** r = s_xy/(s_x s_y) = Σz_x z_y/(n − 1); unit-free; symmetric in x and y.
- **Prerequisites:** W8.02, W3.11
- **Misconception:** r = 0 means no relationship (only no *linear* one); r measures slope (it doesn't).
- **Real-world example:** Height and weight correlate about 0.5 in adults.
- **Difficulty tier:** Intermediate
- **Game name:** Guess the r
- **Goal:** Guess r from a scatter plot.
- **Interaction:** Slider −1 to 1; submit; streak mode with increasing subtlety.
- **Data generation:** Bivariate normal with random r; random aspect ratio and n to decouple r from visual slope.
- **Scoring:** Closeness (tolerance 0.25); streak multiplier.
- **Reveal:** True r; the same data re-plotted with a different aspect ratio to show slope ≠ r.
- **Why it works:** The classic "guess the correlation" game is proven to build calibration quickly.
- **Engine type:** CORRELATION GUESS

### W8.04 Spearman's rank correlation
- **Name:** Spearman's rho
- **Synonyms/notation:** ρ_s, r_s, rank correlation, monotonic association
- **Definition:** Pearson's r computed on ranks; measures whether y tends to rise with x, even if not in a straight line.
- **Formula/procedure:** Rank x and y; compute Pearson r on ranks (or 1 − 6Σd²/(n(n² − 1)) with no ties).
- **Prerequisites:** W8.03, W3.06
- **Misconception:** Using Spearman to "fix" outliers without saying so, or thinking it detects any relationship (non-monotonic ones still give 0).
- **Real-world example:** Correlating hospital rankings between two rating agencies.
- **Difficulty tier:** Intermediate
- **Game name:** Rank the Cloud
- **Goal:** Guess both Pearson r and Spearman ρ for a scatter plot with a curve or outlier.
- **Interaction:** Two sliders; submit.
- **Data generation:** Monotonic curved relationships and outlier cases where the two differ.
- **Scoring:** Closeness on both (tolerance 0.25).
- **Reveal:** The ranked scatter plot shown beside the raw one.
- **Why it works:** Seeing the rank plot straighten a curve is the insight.
- **Engine type:** CORRELATION GUESS

### W8.05 Kendall's tau
- **Name:** Kendall's tau
- **Synonyms/notation:** τ, concordant/discordant pairs, tau-b
- **Definition:** A rank correlation based on counting pairs of points that agree in order (concordant) versus disagree (discordant).
- **Formula/procedure:** τ = (C − D)/(n(n − 1)/2).
- **Prerequisites:** W8.04
- **Misconception:** Expecting τ and ρ_s to be equal (τ is usually smaller in magnitude).
- **Real-world example:** Agreement between two judges' rankings in a competition.
- **Difficulty tier:** Advanced
- **Game name:** Pair Agreement
- **Goal:** Count concordant and discordant pairs for a small set and compute τ.
- **Interaction:** Tap pairs of points; each is marked C or D automatically after you guess; τ slider.
- **Data generation:** n = 6–8 points.
- **Scoring:** 50 pair labels, 50 τ (tolerance 0.15).
- **Reveal:** τ with the pair counts; Spearman for comparison.
- **Why it works:** Counting pairs is tau's definition.
- **Engine type:** BUILD

### W8.06 Correlation vs causation
- **Name:** Correlation does not imply causation
- **Synonyms/notation:** spurious correlation, reverse causation, common cause, confounding, coincidence
- **Definition:** Two things moving together doesn't mean one causes the other; the link may be reversed, due to a third factor, or chance.
- **Formula/procedure:** Ask: reverse causation? confounder? selection? chance (multiple comparisons)? Experiment or causal design needed to claim cause.
- **Prerequisites:** W8.03, W1.12
- **Misconception:** Hearing "correlation ≠ causation" and concluding correlations are useless.
- **Real-world example:** Countries' chocolate consumption correlates with Nobel prizes per capita (wealth confounds).
- **Difficulty tier:** Intermediate
- **Game name:** Explain the Link
- **Goal:** For each correlation, pick the most plausible explanation (causal, reverse, confounder, coincidence) and name the confounder if any.
- **Interaction:** Headline card; four buttons; if confounder, pick from 4 chips.
- **Data generation:** Pool of ~60 scenarios, including some genuinely causal ones.
- **Scoring:** 20 per scenario over 5.
- **Reveal:** The explanation and what design could settle it.
- **Why it works:** Including real causal cases prevents reflexive dismissal.
- **Engine type:** DETECTIVE

### W8.07 Nonlinearity and r = 0
- **Name:** Nonlinear relationships
- **Synonyms/notation:** curvilinear, U-shaped, Anscombe's quartet, Datasaurus
- **Definition:** A strong relationship can have r ≈ 0 if it's not a straight line; always look at the plot.
- **Formula/procedure:** Plot first; consider transformations or nonlinear models.
- **Prerequisites:** W8.03
- **Misconception:** Trusting summary statistics without a plot.
- **Real-world example:** Anscombe's quartet: four datasets with identical r and regression lines but totally different shapes.
- **Difficulty tier:** Intermediate
- **Game name:** Same Stats, Different Story
- **Goal:** Match four datasets with identical summary statistics to their scatter plots, and pick which one the linear summary describes well.
- **Interaction:** Drag stat cards to plots; tap the one plot that is honestly linear.
- **Data generation:** Generated quartets via constrained simulated annealing (hidden); plus a round that asks the player to drag points to make r ≈ 0 while keeping a clear U-shape.
- **Scoring:** 60 matching, 40 for the U-shape build.
- **Reveal:** Statistics printed identically under each plot.
- **Why it works:** The quartet is the most convincing argument for plotting ever made.
- **Engine type:** MATCH

### W8.08 Outliers and range restriction in correlation
- **Name:** Influences on correlation
- **Synonyms/notation:** influential point, restriction of range, attenuation, leverage
- **Definition:** A single far point can create or destroy a correlation, and looking only at a narrow slice of x shrinks r.
- **Formula/procedure:** Recompute r with and without suspect points; compare r in the full vs restricted range.
- **Prerequisites:** W8.03, W3.15
- **Misconception:** Concluding that admission test scores don't predict grades because r is low among admitted students (range restricted).
- **Real-world example:** The low correlation between NBA players' height and performance (everyone is tall).
- **Difficulty tier:** Intermediate
- **Game name:** One Point Changes Everything
- **Goal:** Drag one point to flip the sign of r; then slide a range window and watch r shrink.
- **Interaction:** Drag a point; live r hidden until submit; then a range-window slider with r guesses at two widths.
- **Data generation:** Moderate r cloud; one draggable point.
- **Scoring:** 50 for flipping the sign; 50 closeness on restricted-range r.
- **Reveal:** r with/without the point; r vs window width curve.
- **Why it works:** Direct manipulation shows fragility and attenuation in one sitting.
- **Engine type:** BUILD

### W8.09 Simple linear regression
- **Name:** Simple linear regression
- **Synonyms/notation:** OLS line, ŷ = b₀ + b₁x, y = β₀ + β₁x + ε, line of best fit, fitted values
- **Definition:** The straight line that best predicts y from x.
- **Formula/procedure:** b₁ = r·s_y/s_x; b₀ = ȳ − b₁x̄; the line passes through (x̄, ȳ).
- **Prerequisites:** W8.03
- **Misconception:** Thinking the line is symmetric (regressing x on y gives a different line).
- **Real-world example:** Predicting house price from floor area.
- **Difficulty tier:** Intermediate
- **Game name:** Draw the Line
- **Goal:** Draw the line that best predicts y from x.
- **Interaction:** Drag two handles to set a line; submit.
- **Data generation:** Random linear data with noise; random r and n.
- **Scoring:** 100 × (SSE_OLS/SSE_yours), capped at 100.
- **Reveal:** The OLS line; the fact it passes through (x̄, ȳ); slope formula with numbers.
- **Why it works:** Scoring by SSE ratio quietly teaches the least-squares criterion.
- **Engine type:** BUILD

### W8.10 Least squares
- **Name:** Least squares
- **Synonyms/notation:** OLS, ordinary least squares, minimise Σ(yᵢ − ŷᵢ)², sum of squared residuals (SSE/RSS)
- **Definition:** The best line is the one that makes the total of the squared vertical gaps as small as possible.
- **Formula/procedure:** Choose b₀, b₁ to minimise Σ(yᵢ − b₀ − b₁xᵢ)²; closed-form solution as in W8.09.
- **Prerequisites:** W8.09, W3.03
- **Misconception:** Thinking it minimises perpendicular distances, or absolute distances.
- **Real-world example:** Nearly every fitted trend line in business and science is OLS.
- **Difficulty tier:** Intermediate
- **Game name:** Shrink the Squares
- **Goal:** Tilt and shift the line to minimise the total area of residual squares drawn on screen.
- **Interaction:** Two sliders (slope, intercept); squares redraw live; total area shown as a bar; lock in.
- **Data generation:** 6–12 points for legible squares.
- **Scoring:** 100 × SSE_min/SSE_yours.
- **Reveal:** Surface plot of SSE over (b₀, b₁) with the player's path and the minimum.
- **Why it works:** The area bar makes the objective function tangible.
- **Engine type:** BUILD

### W8.11 Interpreting slope and intercept
- **Name:** Slope and intercept interpretation
- **Synonyms/notation:** b₁ (change in ŷ per unit x), b₀ (ŷ at x = 0), units, "associated with"
- **Definition:** The slope says how much y is expected to change when x rises by one unit; the intercept is the predicted y at x = 0 (often meaningless).
- **Formula/procedure:** Sentence template: "Each additional [x unit] is associated with a [b₁] [y unit] change in [y], on average."
- **Prerequisites:** W8.09
- **Misconception:** Saying the slope "causes" the change, or interpreting an intercept outside the data range.
- **Real-world example:** "Each extra year of education is associated with ₹X higher annual income."
- **Difficulty tier:** Intermediate
- **Game name:** Say It Right
- **Goal:** Assemble a correct interpretation sentence from word tiles, with units.
- **Interaction:** Drag tiles (number, unit, direction, hedge word) into a template; decide whether the intercept is meaningful.
- **Data generation:** Random variables, units and fitted coefficients.
- **Scoring:** 70 sentence, 30 intercept judgement.
- **Reveal:** Model sentence; data range highlighted on the plot.
- **Why it works:** Interpretation is a writing skill; tiles make it practice.
- **Engine type:** MATCH

### W8.12 Residuals
- **Name:** Residual
- **Synonyms/notation:** e = y − ŷ, error, residual plot, standardised residual
- **Definition:** The gap between an actual value and the value the line predicts; positive above the line, negative below.
- **Formula/procedure:** eᵢ = yᵢ − ŷᵢ; Σeᵢ = 0; residual plot: e vs x or vs ŷ should look like random noise.
- **Prerequisites:** W8.09
- **Misconception:** Reading a residual plot's pattern as "the relationship" rather than "what the model missed".
- **Real-world example:** A residual plot with a curve reveals a missing squared term.
- **Difficulty tier:** Intermediate
- **Game name:** Gap Hunter
- **Goal:** Tap the point with the largest residual and the one with the largest *positive* residual, then sketch the residual plot.
- **Interaction:** Tap points; then drag 6 markers to sketch residuals vs x.
- **Data generation:** Random data with a fitted line; sometimes with curvature.
- **Scoring:** 40 taps, 60 sketch accuracy.
- **Reveal:** Residual plot drawn; any pattern annotated.
- **Why it works:** Sketching the residual plot trains the eye to subtract the line.
- **Engine type:** BUILD

### W8.13 R-squared
- **Name:** R-squared
- **Synonyms/notation:** R², coefficient of determination, proportion of variance explained, 1 − SSE/SST
- **Definition:** The fraction of the variation in y that the model accounts for; in simple regression it equals r².
- **Formula/procedure:** R² = 1 − SSE/SST = SSR/SST.
- **Prerequisites:** W8.10, W7.11
- **Misconception:** Thinking high R² means the model is correct or causal, or that low R² means useless (noisy outcomes can still have real effects).
- **Real-world example:** Weather models with R² = 0.3 for rainfall still beat guessing.
- **Difficulty tier:** Intermediate
- **Game name:** Explain the Spread
- **Goal:** Estimate R² by comparing the scatter around the mean line vs around the regression line.
- **Interaction:** Toggle between the two views; slider for R².
- **Data generation:** Random r.
- **Scoring:** Closeness (tolerance 0.15).
- **Reveal:** SST and SSE as stacked bars; R² = 1 − ratio.
- **Why it works:** The toggle view is the definition ("how much better than the mean?").
- **Engine type:** ESTIMATE

### W8.14 Standard error of the regression (RMSE)
- **Name:** Residual standard error
- **Synonyms/notation:** RMSE, root mean squared error, s_e, σ̂, standard error of the estimate
- **Definition:** The typical size of a prediction error, in y's units.
- **Formula/procedure:** s_e = √(SSE/(n − 2)); for a new prediction, errors are roughly ±2s_e.
- **Prerequisites:** W8.12, W3.04
- **Misconception:** Confusing RMSE (prediction error) with the SE of the slope (uncertainty in b₁).
- **Real-world example:** "Our forecast is typically off by 12 units."
- **Difficulty tier:** Intermediate
- **Game name:** Typical Miss
- **Goal:** Set a band around the line that holds about 95% of points.
- **Interaction:** Symmetric band slider; submit.
- **Data generation:** Random noise level.
- **Scoring:** Closeness of band half-width to 2s_e (tolerance 25%).
- **Reveal:** Band drawn; s_e computed.
- **Why it works:** A band around the line is what RMSE means for prediction.
- **Engine type:** ESTIMATE

### W8.15 Linearity assumption
- **Name:** Linearity assumption
- **Synonyms/notation:** functional form, curvature, misspecification
- **Definition:** The relationship between x and the mean of y should be a straight line; otherwise the line is the wrong model.
- **Formula/procedure:** Residual plot should show no curve; add x² or transform if it does.
- **Prerequisites:** W8.12
- **Misconception:** Judging linearity from R² rather than the residual plot.
- **Real-world example:** Dose–response curves that plateau.
- **Difficulty tier:** Intermediate
- **Game name:** Straight Enough?
- **Goal:** From residual plots alone, decide which models were wrongly fitted as straight lines.
- **Interaction:** Four residual plots; tap the curved ones.
- **Data generation:** Mix of linear and quadratic/log truths.
- **Scoring:** 25 per correct judgement.
- **Reveal:** The original scatter plots.
- **Why it works:** Diagnosing from residuals only is the professional habit.
- **Engine type:** PICK

### W8.16 Homoscedasticity
- **Name:** Homoscedasticity
- **Synonyms/notation:** constant variance, equal error variance; heteroscedasticity (fan/funnel shape); Breusch–Pagan test; robust (HC) standard errors
- **Definition:** The scatter of residuals should be the same size everywhere along the line; a fan shape means errors grow with x.
- **Formula/procedure:** Residuals vs fitted should be a horizontal band; remedies: transform y, weighted least squares, robust SEs.
- **Prerequisites:** W8.12
- **Misconception:** Thinking heteroscedasticity biases the slope (it doesn't; it makes SEs and p-values wrong).
- **Real-world example:** Spending vs income: rich households vary far more.
- **Difficulty tier:** Advanced
- **Game name:** Fan or Band
- **Goal:** Spot fan-shaped residual plots and choose the fix.
- **Interaction:** Tap plots with changing spread; choose remedy.
- **Data generation:** Random variance structures.
- **Scoring:** 60 detection, 40 remedy.
- **Reveal:** Fixed vs unfixed CIs for the slope.
- **Why it works:** Seeing the CI change (not the slope) corrects the misconception.
- **Engine type:** PICK

### W8.17 Normality of residuals
- **Name:** Normality of errors
- **Synonyms/notation:** normal residuals, Q–Q plot of residuals, needed for small-sample inference
- **Definition:** Residuals should be roughly bell-shaped for t-based CIs and tests to be exact in small samples.
- **Formula/procedure:** Q–Q plot of residuals; matters less for large n (CLT); prediction intervals need it more than coefficient tests.
- **Prerequisites:** W8.12, W5.23
- **Misconception:** Checking normality of y (the raw outcome) instead of residuals.
- **Real-world example:** A skewed outcome with a strong predictor can have perfectly normal residuals.
- **Difficulty tier:** Advanced
- **Game name:** Residual Q–Q
- **Goal:** Match residual Q–Q plots to their raw-y histograms and declare whether the assumption holds.
- **Interaction:** Drag to match; tick.
- **Data generation:** Cases where y is skewed but residuals normal, and vice versa.
- **Scoring:** 100 × correct.
- **Reveal:** Both views side by side.
- **Why it works:** Targets the "check y not residuals" mistake precisely.
- **Engine type:** MATCH

### W8.18 Independence of errors
- **Name:** Independence of errors
- **Synonyms/notation:** autocorrelation, serial correlation, Durbin–Watson, clustered errors, pseudoreplication
- **Definition:** Each residual should carry no information about the others; time series and grouped data break this.
- **Formula/procedure:** Plot residuals in order; Durbin–Watson ≈ 2 means no autocorrelation; use time-series or mixed models when violated.
- **Prerequisites:** W8.12, W6.03
- **Misconception:** Treating 10 measurements on each of 5 patients as 50 independent points.
- **Real-world example:** Monthly sales residuals that are positive for a run of months.
- **Difficulty tier:** Advanced
- **Game name:** Memory in the Noise
- **Goal:** Spot which residual sequences have memory (runs) vs none.
- **Interaction:** Four residual-in-order plots; tap the autocorrelated ones.
- **Data generation:** AR(1) with φ = 0 or 0.6–0.9.
- **Scoring:** 25 per plot.
- **Reveal:** Durbin–Watson values; the inflated false-alarm rate if ignored.
- **Why it works:** Residual-order plots are the diagnostic.
- **Engine type:** PICK

### W8.19 Influential points, leverage and Cook's distance
- **Name:** Influential observations
- **Synonyms/notation:** leverage (hat value), Cook's distance, DFFITS, outlier in x vs outlier in y
- **Definition:** A point far out in x (high leverage) can swing the whole line; influence combines leverage with a large residual.
- **Formula/procedure:** Cook's D > 4/n (rough flag); refit without the point and compare.
- **Prerequisites:** W8.09, W8.08
- **Misconception:** Thinking influential = large residual (a very influential point often has a small residual because it pulled the line to itself).
- **Real-world example:** One giant customer in a sales regression.
- **Difficulty tier:** Advanced
- **Game name:** Lever Point
- **Goal:** Drag one point to maximise its influence on the slope, then find the position that gives high leverage but zero influence.
- **Interaction:** Drag; slope read-out hidden until submit; two rounds.
- **Data generation:** Random cloud; one free point.
- **Scoring:** 50 for achieving a slope change ≥ target; 50 for the zero-influence placement (on the line, far out).
- **Reveal:** Cook's D of the point in both placements.
- **Why it works:** Discovering that "far out but on the line" has no influence is the key insight.
- **Engine type:** BUILD

### W8.20 Extrapolation
- **Name:** Extrapolation
- **Synonyms/notation:** out-of-range prediction, data range, interpolation vs extrapolation
- **Definition:** Predicting outside the range of x you observed; the line may not hold there.
- **Formula/procedure:** Only predict within [min x, max x] unless theory justifies otherwise.
- **Prerequisites:** W8.11
- **Misconception:** Trusting a straight line indefinitely ("by 2100 sprinters will run 100 m in 0 seconds").
- **Real-world example:** The 2004 Nature paper extrapolating women's sprint times past men's.
- **Difficulty tier:** Beginner
- **Game name:** Off the Edge
- **Goal:** Predict y at an out-of-range x, then see the true hidden curve.
- **Interaction:** Fit shown; choose a prediction and a confidence band width; reveal.
- **Data generation:** True relationship is curved/saturating outside the observed window.
- **Scoring:** Points for widening the band appropriately rather than for the point guess.
- **Reveal:** The true curve; the honest answer "we don't know".
- **Why it works:** Rewards humility explicitly.
- **Engine type:** DETECTIVE

### W8.21 Multiple linear regression
- **Name:** Multiple regression
- **Synonyms/notation:** ŷ = b₀ + b₁x₁ + b₂x₂ + …, partial slopes, "controlling for", "holding constant", coefficient table
- **Definition:** Predicting y from several variables at once; each slope is the effect of its variable with the others held fixed.
- **Formula/procedure:** OLS in matrix form b = (XᵀX)⁻¹Xᵀy; interpret bⱼ as change in ŷ per unit xⱼ, others constant.
- **Prerequisites:** W8.11, W1.12
- **Misconception:** Expecting a coefficient to equal the simple-regression slope (it changes when other predictors are added).
- **Real-world example:** House price from area, bedrooms and distance to the station.
- **Difficulty tier:** Advanced
- **Game name:** Two Dials
- **Goal:** Set two partial slopes so the plane fits a 3D cloud, then explain why one slope changed from its simple-regression value.
- **Interaction:** Two sliders; rotating 3D scatter with a plane; then pick the reason for the change (confounding/none).
- **Data generation:** Correlated predictors with random coefficients.
- **Scoring:** 70 closeness on slopes; 30 explanation.
- **Reveal:** Coefficient table; simple vs multiple slopes side by side.
- **Why it works:** The 3D plane makes "holding constant" visible.
- **Engine type:** NEW: TUNE

### W8.22 Adjusted R-squared
- **Name:** Adjusted R-squared
- **Synonyms/notation:** R̄², adj. R², penalised R²
- **Definition:** R² corrected for the number of predictors, so adding useless variables doesn't inflate it.
- **Formula/procedure:** R̄² = 1 − (1 − R²)(n − 1)/(n − p − 1).
- **Prerequisites:** W8.21, W8.13
- **Misconception:** Comparing plain R² across models with different numbers of predictors.
- **Real-world example:** A model with 30 random predictors and n = 40 has R² ≈ 0.75 by chance alone.
- **Difficulty tier:** Advanced
- **Game name:** Junk Predictors
- **Goal:** Add random-noise predictors one by one and predict what happens to R² and adjusted R².
- **Interaction:** "Add noise predictor" button; sketch both curves before pressing; compare.
- **Data generation:** Fixed real model plus noise columns.
- **Scoring:** 100 × accuracy of sketched trends (R² rising, adj. R² flat/falling).
- **Reveal:** Both curves; formula.
- **Why it works:** Watching R² climb on pure noise is unforgettable.
- **Engine type:** SAMPLER

### W8.23 Adjusting for confounders
- **Name:** Statistical adjustment
- **Synonyms/notation:** controlling for, adjusting for, covariate, partial effect, added-variable plot
- **Definition:** Including a confounder in the model removes its distorting effect from the other coefficients.
- **Formula/procedure:** Compare the coefficient of x with and without the confounder in the model; a big change signals confounding.
- **Prerequisites:** W8.21, W1.12
- **Misconception:** Adjusting for everything available (adjusting for mediators or colliders creates new bias).
- **Real-world example:** The coffee–heart disease link shrinks when smoking is added to the model.
- **Difficulty tier:** Advanced
- **Game name:** Add the Confounder
- **Goal:** Predict how the x coefficient changes when a confounder is added, then add it.
- **Interaction:** Slider for the new coefficient; press "Add Z"; reveal.
- **Data generation:** Z causes both X and Y with random strengths; 20% of rounds Z is a mediator (adding it is wrong).
- **Scoring:** Closeness (tolerance 25%); bonus for refusing to add a mediator.
- **Reveal:** Both models' tables; the DAG (teaser for W10).
- **Why it works:** Mediator rounds inoculate against over-adjustment.
- **Engine type:** NEW: TUNE

### W8.24 Multicollinearity
- **Name:** Multicollinearity
- **Synonyms/notation:** collinearity, VIF (variance inflation factor), correlated predictors, unstable coefficients
- **Definition:** When predictors are highly correlated, the model can't tell which one matters, so coefficients become wild and unstable.
- **Formula/procedure:** VIF_j = 1/(1 − R²_j) where R²_j is from regressing x_j on the others; VIF > 5–10 is a warning. Prediction is unaffected; interpretation is.
- **Prerequisites:** W8.21
- **Misconception:** Thinking collinearity hurts predictive accuracy (it hurts coefficient interpretation).
- **Real-world example:** Height in cm and height in inches both as predictors.
- **Difficulty tier:** Advanced
- **Game name:** Twins in the Model
- **Goal:** Watch coefficients swing as you increase the correlation between two predictors; predict the VIF.
- **Interaction:** Correlation slider; resample button; coefficient traces; VIF slider.
- **Data generation:** Two predictors with adjustable correlation.
- **Scoring:** Closeness on VIF (factor 1.5); bonus for predicting that R² stays stable.
- **Reveal:** VIF formula; coefficient CIs widening.
- **Why it works:** Seeing coefficients flail while R² stays put makes the distinction.
- **Engine type:** NEW: TUNE

### W8.25 Interaction terms
- **Name:** Interaction
- **Synonyms/notation:** moderation, x₁ × x₂ term, effect modification, simple slopes
- **Definition:** When the effect of one predictor depends on the value of another; modelled by multiplying them.
- **Formula/procedure:** ŷ = b₀ + b₁x₁ + b₂x₂ + b₃x₁x₂; slope of x₁ is b₁ + b₃x₂.
- **Prerequisites:** W8.21, W7.25
- **Misconception:** Interpreting b₁ as "the effect of x₁" when an interaction is present (it's the effect at x₂ = 0).
- **Real-world example:** A fertiliser that helps only when there's enough rain.
- **Difficulty tier:** Advanced
- **Game name:** Slope Changer
- **Goal:** Set the interaction coefficient so the slope of x₁ changes across x₂ as described.
- **Interaction:** Three sliders (b₁, b₂, b₃); two lines (x₂ low/high) update; submit.
- **Data generation:** Random target description.
- **Scoring:** Closeness on b₃ and on the implied simple slopes.
- **Reveal:** Simple-slopes equations.
- **Why it works:** The two-line plot makes the product term intuitive.
- **Engine type:** NEW: TUNE

### W8.26 Dummy variables
- **Name:** Dummy variables
- **Synonyms/notation:** indicator variables, one-hot encoding, reference category, k − 1 dummies, dummy-variable trap
- **Definition:** Putting a categorical predictor in a regression by creating 0/1 columns, one fewer than the number of categories.
- **Formula/procedure:** Pick a reference category; each dummy's coefficient is the difference from the reference; including all k dummies plus an intercept is perfectly collinear.
- **Prerequisites:** W1.16, W8.21
- **Misconception:** Coding categories as 1, 2, 3 in one column (implies equal spacing and order).
- **Real-world example:** Region (North/South/East/West) in a wage regression.
- **Difficulty tier:** Advanced
- **Game name:** Code the Category
- **Goal:** Build the dummy columns for a categorical variable and interpret the coefficients.
- **Interaction:** Drag 0/1 tiles into a table; choose reference; then match coefficients to group-mean differences.
- **Data generation:** Random 3–4 category variable with group means.
- **Scoring:** 60 coding, 40 interpretation; −30 for the dummy trap.
- **Reveal:** Group means and the regression table side by side.
- **Why it works:** Seeing coefficients equal mean differences links regression to ANOVA.
- **Engine type:** BUILD

### W8.27 Transformations and polynomial terms
- **Name:** Nonlinear terms in regression
- **Synonyms/notation:** polynomial regression (x², x³), log-transformed predictors/outcomes, log–log (elasticity), splines
- **Definition:** Keeping the model linear in its coefficients while letting the curve bend by adding powers or logs.
- **Formula/procedure:** ŷ = b₀ + b₁x + b₂x²; log(y) on log(x) gives b₁ as % change per % change.
- **Prerequisites:** W8.15, W5.24
- **Misconception:** Using a high-degree polynomial that fits every wiggle (overfitting, W8.31).
- **Real-world example:** Age and income: rises then falls, so x² is needed.
- **Difficulty tier:** Advanced
- **Game name:** Bend the Line
- **Goal:** Choose the smallest set of terms that captures the pattern in a residual plot.
- **Interaction:** Toggle terms (x, x², x³, log x); fit updates; submit.
- **Data generation:** Random truth from the term family plus noise.
- **Scoring:** 100 if the true term set chosen; −20 per unnecessary term.
- **Reveal:** Residual plot before and after.
- **Why it works:** Penalising extra terms teaches parsimony.
- **Engine type:** BUILD

### W8.28 Logistic regression
- **Name:** Logistic regression
- **Synonyms/notation:** logit model, log-odds, sigmoid, binary outcome regression, P(y = 1) = 1/(1 + e^(−(b₀ + b₁x)))
- **Definition:** Regression for yes/no outcomes that models the log-odds as a straight line, so predictions stay between 0 and 1.
- **Formula/procedure:** logit(p) = ln(p/(1 − p)) = b₀ + b₁x; fitted by maximum likelihood.
- **Prerequisites:** W4.19, W8.09
- **Misconception:** Fitting a straight line to 0/1 data (predictions outside [0, 1]).
- **Real-world example:** Probability a customer churns given months since last purchase.
- **Difficulty tier:** Advanced
- **Game name:** S-Curve
- **Goal:** Bend the S-curve to fit 0/1 data scattered along x.
- **Interaction:** Two sliders (b₀, b₁); curve updates; submit.
- **Data generation:** Random logistic truth; n 40–200.
- **Scoring:** 100 × (log-likelihood_yours − LL_null)/(LL_max − LL_null), floor 0.
- **Reveal:** A straight line fitted to the same data going below 0 and above 1.
- **Why it works:** Seeing the straight line fail motivates the sigmoid.
- **Engine type:** NEW: TUNE

### W8.29 Odds ratios from logistic coefficients
- **Name:** Logistic coefficients as odds ratios
- **Synonyms/notation:** e^b, OR per unit, adjusted odds ratio
- **Definition:** Exponentiating a logistic coefficient gives the factor by which the odds multiply per unit of x.
- **Formula/procedure:** OR = e^(b₁); 95% CI = e^(b₁ ± 1.96·SE).
- **Prerequisites:** W8.28, W7.12
- **Misconception:** Reading b₁ = 0.7 as "70% more likely" (it's an OR of 2.01 on the odds, not probability).
- **Real-world example:** "Each extra cigarette per day multiplied the odds of disease by 1.08."
- **Difficulty tier:** Advanced
- **Game name:** Exponentiate
- **Goal:** Convert coefficients to odds ratios and write the sentence.
- **Interaction:** Slider on a log scale; tile sentence builder.
- **Data generation:** Random coefficients.
- **Scoring:** 50 OR (factor 1.2), 50 sentence.
- **Reveal:** Probability at two x values to show OR ≠ probability ratio.
- **Why it works:** Pairs the arithmetic with the correct wording.
- **Engine type:** ESTIMATE

### W8.30 Classification accuracy, sensitivity, specificity and ROC
- **Name:** Classification metrics
- **Synonyms/notation:** confusion matrix, accuracy, sensitivity (recall, TPR), specificity (TNR), precision (PPV), F1, ROC curve, AUC, threshold
- **Definition:** Ways to judge a yes/no predictor: how many positives it catches, how many negatives it keeps, and how that trades off as the threshold moves.
- **Formula/procedure:** Sensitivity = TP/(TP + FN); specificity = TN/(TN + FP); ROC plots TPR vs FPR across thresholds; AUC = P(random positive scores higher than random negative).
- **Prerequisites:** W8.28, W4.11
- **Misconception:** Reporting accuracy on imbalanced data (99% accuracy by predicting "no" always).
- **Real-world example:** Choosing a threshold for a cancer screening model.
- **Difficulty tier:** Advanced
- **Game name:** Threshold Slider
- **Goal:** Move the threshold to hit a target sensitivity while keeping specificity as high as possible; trace the ROC.
- **Interaction:** Slider; confusion matrix updates; each setting drops a point on the ROC.
- **Data generation:** Two score distributions with random separation and prevalence.
- **Scoring:** 100 × closeness to the target with specificity ≥ best achievable − 0.05.
- **Reveal:** Full ROC; AUC; a 99%-accuracy-but-useless case.
- **Why it works:** The trade-off is felt in the slider.
- **Engine type:** NEW: TUNE

### W8.31 Overfitting
- **Name:** Overfitting
- **Synonyms/notation:** overfit, fitting noise, memorising, generalisation gap, underfitting
- **Definition:** A model that follows the training data so closely it captures noise and predicts new data badly.
- **Formula/procedure:** Compare training error with held-out error; a large gap signals overfitting.
- **Prerequisites:** W8.27, W8.22
- **Misconception:** Judging a model by how well it fits the data it was built on.
- **Real-world example:** A stock-picking rule that explains the past perfectly and fails next year.
- **Difficulty tier:** Advanced
- **Game name:** Wiggle Trap
- **Goal:** Pick the polynomial degree that predicts new data best.
- **Interaction:** Degree slider 1–12; fit shown on training dots; press "Reveal test dots".
- **Data generation:** True smooth curve plus noise; separate test set.
- **Scoring:** 100 × test-error_best/test-error_yours.
- **Reveal:** Training vs test error curves vs degree (the U-shape).
- **Why it works:** The U-shaped test-error curve is the concept.
- **Engine type:** NEW: TUNE

### W8.32 Train/test split and cross-validation
- **Name:** Cross-validation
- **Synonyms/notation:** hold-out, train/validation/test, k-fold CV, leave-one-out (LOOCV), out-of-sample error
- **Definition:** Judge a model on data it hasn't seen by repeatedly splitting the dataset into training and testing parts.
- **Formula/procedure:** Split into k folds; for each fold, train on the other k − 1 and test on it; average the test errors.
- **Prerequisites:** W8.31
- **Misconception:** Choosing features using all the data and then cross-validating (leakage).
- **Real-world example:** Model selection in any machine-learning competition.
- **Difficulty tier:** Advanced
- **Game name:** Fold It
- **Goal:** Run 5-fold CV by hand to choose between two models.
- **Interaction:** Drag data blocks into folds; press "Fit on 4, test on 1" five times; average; pick the model.
- **Data generation:** Two candidate models (degree 1 vs 4); random data.
- **Scoring:** 100 for correct choice with correct averaged errors (tolerance 15%).
- **Reveal:** CV error for both; the leakage warning with a round where a leaked feature fools the naive procedure.
- **Why it works:** Manual folding makes the procedure concrete.
- **Engine type:** SAMPLER

### W8.33 Ridge regression
- **Name:** Ridge regression
- **Synonyms/notation:** L2 regularisation, Tikhonov, penalty λΣb², shrinkage
- **Definition:** Regression that shrinks coefficients toward zero to reduce variance, trading a little bias for better predictions.
- **Formula/procedure:** Minimise Σ(y − ŷ)² + λΣbⱼ²; choose λ by cross-validation.
- **Prerequisites:** W8.31, W6.23, W8.24
- **Misconception:** Thinking ridge selects variables (it shrinks but never zeroes them).
- **Real-world example:** Predicting with many correlated gene-expression predictors.
- **Difficulty tier:** Research
- **Game name:** Shrink Dial
- **Goal:** Turn λ to minimise test error and watch coefficients shrink.
- **Interaction:** λ dial on a log scale; coefficient paths; press "Check test error" (costs points).
- **Data generation:** Correlated predictors, n small relative to p.
- **Scoring:** 100 × test-error_best/test-error_yours − 10 per check.
- **Reveal:** Coefficient path plot; CV curve.
- **Why it works:** The dial links regularisation to the bias–variance curve.
- **Engine type:** NEW: TUNE

### W8.34 Lasso
- **Name:** Lasso
- **Synonyms/notation:** L1 regularisation, penalty λΣ|b|, sparse model, variable selection, elastic net (mix)
- **Definition:** Like ridge, but the penalty can push coefficients to exactly zero, so it selects variables automatically.
- **Formula/procedure:** Minimise Σ(y − ŷ)² + λΣ|bⱼ|.
- **Prerequisites:** W8.33
- **Misconception:** Treating the selected variables as "the true causes".
- **Real-world example:** Picking a handful of predictors from hundreds of survey items.
- **Difficulty tier:** Research
- **Game name:** Zero It Out
- **Goal:** Turn λ until exactly the true non-zero predictors remain.
- **Interaction:** λ dial; coefficient bars drop to zero one by one; submit.
- **Data generation:** p 10–20 predictors, 3–5 truly non-zero.
- **Scoring:** 100 × (correct selections − wrong)/true count.
- **Reveal:** Lasso vs ridge paths side by side; the diamond vs circle constraint picture.
- **Why it works:** Watching bars hit zero is the L1 property.
- **Engine type:** NEW: TUNE

### W8.35 Model selection with AIC and BIC
- **Name:** Information criteria
- **Synonyms/notation:** AIC = 2k − 2ln L, BIC = k·ln n − 2ln L, Akaike, Bayesian information criterion, parsimony, likelihood ratio test
- **Definition:** Scores that reward fit but penalise complexity; lower is better; BIC penalises extra parameters more.
- **Formula/procedure:** Compute for each candidate model; choose the lowest; differences < 2 are negligible.
- **Prerequisites:** W8.22, W10.01
- **Misconception:** Comparing AICs across models fitted to different datasets or transformed outcomes.
- **Real-world example:** Choosing the number of lags in a time-series model.
- **Difficulty tier:** Research
- **Game name:** Pay for Parameters
- **Goal:** Rank candidate models by AIC given their fit and parameter counts.
- **Interaction:** Cards with ln L and k; drag into order; toggle to BIC and re-order.
- **Data generation:** Random candidate set, random n.
- **Scoring:** Rank correlation for both criteria.
- **Reveal:** AIC/BIC computed; the model where they disagree highlighted.
- **Why it works:** Computing the penalty by hand makes it tangible.
- **Engine type:** PICK

### W8.36 Stepwise selection and its pitfalls
- **Name:** Stepwise selection
- **Synonyms/notation:** forward/backward/stepwise regression, garden of forking paths in modelling
- **Definition:** Automatically adding or removing predictors by p-value; popular, but it inflates significance and overfits.
- **Formula/procedure:** Prefer theory-driven models, regularisation, or CV; if stepwise is used, validate on new data.
- **Prerequisites:** W8.35, W7.34
- **Misconception:** Reporting stepwise p-values as if from a single pre-specified test.
- **Real-world example:** Stepwise models in epidemiology that don't replicate.
- **Difficulty tier:** Research
- **Game name:** Noise Miner
- **Goal:** Run stepwise on pure noise and predict how many "significant" predictors it finds.
- **Interaction:** Slider; press "Stepwise on 20 noise columns"; count.
- **Data generation:** y and 20 predictors all random.
- **Scoring:** Closeness (tolerance 1 predictor).
- **Reveal:** The spuriously significant predictors and their p-values; replication fails.
- **Why it works:** Producing a "model" from nothing is the lesson.
- **Engine type:** SAMPLER

### W8.37 Confidence vs prediction intervals
- **Name:** Prediction interval
- **Synonyms/notation:** PI vs CI for the mean response, ŷ ± t·s_e√(1 + 1/n + …)
- **Definition:** A CI brackets the average y at a given x; a prediction interval brackets a single new y, so it's much wider.
- **Formula/procedure:** CI for mean: ŷ ± t·s_e√(1/n + (x − x̄)²/Σ(xᵢ − x̄)²); PI adds 1 inside the root.
- **Prerequisites:** W8.14, W6.15
- **Misconception:** Quoting a CI when a customer asks "what will *my* house sell for?"
- **Real-world example:** Forecasting next month's sales (PI) vs the long-run average (CI).
- **Difficulty tier:** Advanced
- **Game name:** Two Bands
- **Goal:** Draw the narrow band for the mean and the wide band for new points, then test with fresh data.
- **Interaction:** Two band sliders; reveal 50 new points.
- **Data generation:** Random regression.
- **Scoring:** Closeness of both bands (tolerance 25%); bonus if ~95% of new points fall in the PI.
- **Reveal:** Both bands; curvature of the bands away from x̄.
- **Why it works:** Fresh points falling outside the CI but inside the PI is the distinction.
- **Engine type:** BUILD

### W8.38 Simpson's paradox
- **Name:** Simpson's paradox
- **Synonyms/notation:** Yule–Simpson effect, reversal paradox, aggregation bias
- **Definition:** A trend that appears in every subgroup can reverse when the groups are combined, because of unequal group sizes.
- **Formula/procedure:** Compare within-group rates with the pooled rate; check whether a confounder determines group membership and outcome.
- **Prerequisites:** W1.12, W4.09
- **Misconception:** Assuming the pooled result is always the "real" one (or that the subgroup result always is; it depends on the causal structure).
- **Real-world example:** UC Berkeley 1973 admissions: women rejected more overall yet admitted at higher rates within departments.
- **Difficulty tier:** Intermediate
- **Game name:** Reversal
- **Goal:** Build a 2×2×2 table where treatment A wins in both subgroups but loses overall.
- **Interaction:** Four sliders (group sizes and success rates); pooled rate updates; submit.
- **Data generation:** Random success-rate constraints.
- **Scoring:** 100 if the reversal is achieved; partial for subgroup wins without reversal.
- **Reveal:** Weighted-average arithmetic; a vector diagram of the paradox.
- **Why it works:** Constructing the paradox yourself proves it's arithmetic, not magic.
- **Engine type:** BUILD

### W8.39 Regression to the mean
- **Name:** Regression to the mean
- **Synonyms/notation:** regression effect, regression fallacy, "sophomore slump", "sports illustrated jinx"
- **Definition:** Extreme measurements tend to be followed by less extreme ones, simply because part of the extreme was luck.
- **Formula/procedure:** Expected follow-up z ≈ r × initial z; the gap is regression toward the mean.
- **Prerequisites:** W8.03, W3.11
- **Misconception:** Attributing the improvement of the worst performers after an intervention to the intervention.
- **Real-world example:** Speed cameras placed at crash blackspots "reduce" crashes partly by regression to the mean.
- **Difficulty tier:** Intermediate
- **Game name:** Slump Predictor
- **Goal:** Predict the second-test scores of the top 10% from test 1.
- **Interaction:** Slider for predicted mean z of the top group; reveal.
- **Data generation:** Two correlated scores (r random 0.3–0.9).
- **Scoring:** Closeness (tolerance 0.3 z).
- **Reveal:** r × z; the scatter with the top group highlighted and their drop.
- **Why it works:** Quantifying the drop as r × z makes it predictable rather than mysterious.
- **Engine type:** SAMPLER

### W8.40 Ecological fallacy
- **Name:** Ecological fallacy
- **Synonyms/notation:** aggregation fallacy, group-level vs individual-level inference, atomistic fallacy (reverse)
- **Definition:** Assuming a relationship seen between groups (countries, states) holds for individuals within them.
- **Formula/procedure:** Separate between-group and within-group correlations; they can differ in sign.
- **Prerequisites:** W8.06, W8.38
- **Misconception:** "Richer states vote Democrat, so richer people vote Democrat" (within states, the reverse held).
- **Real-world example:** Robinson's 1950 literacy and immigration study.
- **Difficulty tier:** Advanced
- **Game name:** Zoom In
- **Goal:** Guess the individual-level correlation after seeing only the group-level one.
- **Interaction:** Group means scatter; slider; press "Zoom in" to reveal individuals.
- **Data generation:** Between-group and within-group r with opposite signs.
- **Scoring:** Closeness (tolerance 0.3).
- **Reveal:** Both correlations with the overlaid clouds.
- **Why it works:** The zoom reveal is the fallacy exposed.
- **Engine type:** PICK

### W8.41 Attenuation due to measurement error
- **Name:** Regression dilution
- **Synonyms/notation:** attenuation bias, errors-in-variables, disattenuation r_true = r_obs/√(rel_x·rel_y)
- **Definition:** Noise in a predictor flattens its estimated slope and correlation toward zero.
- **Formula/procedure:** Observed slope ≈ true slope × reliability of x; correct with the reliability ratio.
- **Prerequisites:** W8.03, W9.18
- **Misconception:** Thinking measurement error only adds noise without biasing estimates.
- **Real-world example:** Blood-pressure–stroke relationships underestimated because single BP readings are noisy.
- **Difficulty tier:** Research
- **Game name:** Fuzzy X
- **Goal:** Add measurement noise to x and predict how the slope shrinks.
- **Interaction:** Noise slider; slope guess; reveal.
- **Data generation:** True slope fixed; noise variance adjustable.
- **Scoring:** Closeness (tolerance 20%).
- **Reveal:** Slope vs reliability curve.
- **Why it works:** Direct manipulation of noise shows the bias direction.
- **Engine type:** NEW: TUNE

---

## World 9 — Design Docks (Intermediate → Advanced)

Theme: a shipyard where studies are built; bad designs sink.

### W9.01 Observational vs experimental studies
- **Name:** Observational vs experimental
- **Synonyms/notation:** observational study, experiment, intervention, manipulation, "nature assigns" vs "researcher assigns"
- **Definition:** In an experiment the researcher decides who gets the treatment; in an observational study they only watch what already happens.
- **Formula/procedure:** Ask "who assigned the exposure?" Researcher → experiment; circumstances → observational.
- **Prerequisites:** W1.10, W8.06
- **Misconception:** Calling any study with a comparison group an experiment.
- **Real-world example:** Smoking and cancer could only ever be studied observationally in humans.
- **Difficulty tier:** Beginner
- **Game name:** Who Assigned It?
- **Goal:** Classify study blurbs and say what causal claim each can support.
- **Interaction:** Stamp Observational/Experimental; then choose the strongest allowable claim from 3.
- **Data generation:** Random blurbs from a tagged pool.
- **Scoring:** 10 per stamp, 10 per claim, 5 rounds.
- **Reveal:** The claim ladder (association → causation) with the study placed on it.
- **Why it works:** Ties design type to permitted language.
- **Engine type:** PICK

### W9.02 Randomised controlled trial
- **Name:** Randomised controlled trial
- **Synonyms/notation:** RCT, randomised experiment, gold standard, arms, allocation
- **Definition:** An experiment where participants are randomly assigned to treatment or control so the groups are alike except for the treatment.
- **Formula/procedure:** Recruit; randomise; treat; measure outcome; analyse by assigned group.
- **Prerequisites:** W9.01, W6.01
- **Misconception:** Thinking randomisation guarantees identical groups in any single trial (it balances on average and lets you quantify the imbalance).
- **Real-world example:** Vaccine phase III trials.
- **Difficulty tier:** Intermediate
- **Game name:** Build a Trial
- **Goal:** Assemble an RCT from component cards in the right order and spot the missing piece.
- **Interaction:** Drag cards (recruit, randomise, blind, treat, measure, analyse) into a pipeline; one card is a decoy.
- **Data generation:** Random scenario; random missing/decoy card.
- **Scoring:** 100 × correct sequence; −20 for including the decoy.
- **Reveal:** Simulated results with and without the missing step.
- **Why it works:** Pipeline-building shows the role of each component.
- **Engine type:** BUILD

### W9.03 Control group
- **Name:** Control group
- **Synonyms/notation:** comparison group, untreated group, baseline, active control, waitlist control, counterfactual group
- **Definition:** A group that doesn't receive the treatment, showing what would have happened anyway.
- **Formula/procedure:** Effect = outcome(treated) − outcome(control), if groups are comparable.
- **Prerequisites:** W9.01
- **Misconception:** Before/after on one group counts as a control (it doesn't: time, regression to the mean and other changes confound it).
- **Real-world example:** A reading programme "improves" scores, but untreated children improved as much over the year.
- **Difficulty tier:** Beginner
- **Game name:** What Would Have Happened
- **Goal:** Estimate the treatment effect correctly once a control group's trend is revealed.
- **Interaction:** Before/after bars for the treated group; slider for the effect; reveal control's before/after; revise.
- **Data generation:** Random secular trend and true effect (often zero).
- **Scoring:** 100 × closeness of the revised estimate (tolerance 25%).
- **Reveal:** Difference-in-differences picture (teaser for W10).
- **Why it works:** The revision step shows why a control is needed.
- **Engine type:** DETECTIVE

### W9.04 Placebo and placebo effect
- **Name:** Placebo
- **Synonyms/notation:** placebo, sham treatment, placebo effect, nocebo, placebo-controlled
- **Definition:** A fake treatment that looks real, used so that expectations affect both groups equally.
- **Formula/procedure:** Compare active vs placebo; the difference is the specific effect; placebo vs no-treatment is the expectancy effect.
- **Prerequisites:** W9.03
- **Misconception:** Thinking the placebo effect means "imaginary"; it includes real physiological responses and regression to the mean.
- **Real-world example:** Sham surgery trials in orthopaedics showing no benefit of certain knee operations.
- **Difficulty tier:** Beginner
- **Game name:** Sugar Pill
- **Goal:** Split a treatment group's improvement into placebo, natural recovery and true drug effect.
- **Interaction:** Three stacked sliders; three groups' data revealed one at a time (no treatment, placebo, drug).
- **Data generation:** Random components.
- **Scoring:** Closeness on each component (tolerance 25%).
- **Reveal:** Stacked bar decomposition.
- **Why it works:** The three-group reveal is the design logic.
- **Engine type:** ESTIMATE

### W9.05 Blinding
- **Name:** Blinding
- **Synonyms/notation:** masking, single-blind, double-blind, triple-blind, open-label, allocation concealment
- **Definition:** Keeping participants, and ideally researchers and assessors, unaware of who got which treatment, so expectations can't bias results.
- **Formula/procedure:** Single: participants blind; double: participants and staff; triple: analysts too. Allocation concealment prevents selective enrolment.
- **Prerequisites:** W9.04
- **Misconception:** Confusing blinding with randomisation; or believing surgical/behavioural trials can't blind anyone (outcome assessors usually can be).
- **Real-world example:** Unblinded acupuncture trials show larger effects than blinded ones.
- **Difficulty tier:** Intermediate
- **Game name:** Who Knows?
- **Goal:** For each role in a trial, decide whether they can and should be blinded, and name the bias that results if not.
- **Interaction:** Role cards (patient, nurse, surgeon, outcome assessor, analyst); toggle blind; pick bias from 3.
- **Data generation:** Random trial type (drug, surgery, therapy, device).
- **Scoring:** 10 per role decision, 10 per bias name.
- **Reveal:** Simulated effect inflation by role unblinded.
- **Why it works:** Role-by-role thinking is how protocols are written.
- **Engine type:** MATCH

### W9.06 Randomisation
- **Name:** Random assignment
- **Synonyms/notation:** randomisation, allocation, random assignment vs random sampling, balance of covariates
- **Definition:** Using chance to decide who gets which treatment, so known and unknown confounders are balanced on average.
- **Formula/procedure:** Coin flip, random number list, or computer; check baseline balance tables afterwards (as description, not tests).
- **Prerequisites:** W9.02, W6.01
- **Misconception:** Confusing random assignment (for causation) with random sampling (for generalisation).
- **Real-world example:** Alternating assignment by day of week is not random and can be gamed.
- **Difficulty tier:** Intermediate
- **Game name:** Fair Shuffle
- **Goal:** Assign 40 patients by hand "fairly", then randomly, and compare covariate balance across 100 repeats.
- **Interaction:** Drag patients into two arms; press "Randomise"; balance meter.
- **Data generation:** Patients with visible and hidden covariates.
- **Scoring:** 100 if the player predicts correctly that hidden covariates balance only under randomisation.
- **Reveal:** Balance on hidden covariates for both methods.
- **Why it works:** Hidden covariates are the whole argument for randomisation.
- **Engine type:** SAMPLER

### W9.07 Blocking and stratified randomisation
- **Name:** Blocking
- **Synonyms/notation:** randomised block design, stratified randomisation, permuted blocks, minimisation
- **Definition:** Grouping similar units first, then randomising within each group, to remove a known source of variation.
- **Formula/procedure:** Form blocks on a nuisance variable; randomise treatments within blocks; include block in the analysis.
- **Prerequisites:** W9.06, W6.02
- **Misconception:** Blocking on the outcome or on a variable affected by treatment.
- **Real-world example:** Agricultural trials blocked by field plot; clinical trials stratified by site.
- **Difficulty tier:** Advanced
- **Game name:** Block Party
- **Goal:** Choose a blocking variable and see how much the error variance shrinks.
- **Interaction:** Pick one of 4 candidate variables to block on; run 200 trials; SE of the effect shown.
- **Data generation:** One variable strongly related to the outcome, others not.
- **Scoring:** 100 × SE_best/SE_yours.
- **Reveal:** Variance decomposition before/after blocking.
- **Why it works:** Choosing wrong blocks and seeing no gain teaches what blocking is for.
- **Engine type:** SAMPLER

### W9.08 Matched-pairs design
- **Name:** Matched pairs
- **Synonyms/notation:** matching, paired design, within-subject design, crossover design, twin study
- **Definition:** Pairing similar units (or using each unit as its own control) and randomising within pairs.
- **Formula/procedure:** Match on key covariates; randomise within pair; analyse differences (paired t / signed-rank).
- **Prerequisites:** W9.07, W7.17
- **Misconception:** Analysing matched data as independent groups.
- **Real-world example:** Crossover trials where each patient gets both drugs in random order.
- **Difficulty tier:** Advanced
- **Game name:** Perfect Partners
- **Goal:** Match participants into pairs to minimise within-pair differences, then see the power gain.
- **Interaction:** Drag cards into pairs; pair distance shown; run.
- **Data generation:** 12–16 participants with 2–3 covariates.
- **Scoring:** 100 × optimal-distance/your-distance; bonus for predicting the power gain.
- **Reveal:** Paired vs unpaired analysis power.
- **Why it works:** Hands-on matching plus the power payoff.
- **Engine type:** BUILD

### W9.09 Factorial designs
- **Name:** Factorial design
- **Synonyms/notation:** 2×2 design, 2ᵏ factorial, main effects, interactions, fractional factorial
- **Definition:** Testing two or more factors at once in all combinations, so you learn each effect and whether they interact.
- **Formula/procedure:** Every combination of levels becomes a cell; randomise units to cells; analyse with factorial ANOVA.
- **Prerequisites:** W7.25, W9.02
- **Misconception:** Running one-factor-at-a-time experiments, which can't detect interactions and waste units.
- **Real-world example:** Website tests of headline × image × button colour.
- **Difficulty tier:** Advanced
- **Game name:** Cell Filler
- **Goal:** Lay out a 2×2 (or 2×3) design and allocate a fixed budget of units to detect an interaction.
- **Interaction:** Drag unit tokens into cells; run; see which effects are detectable.
- **Data generation:** Random true main/interaction effects.
- **Scoring:** 100 if the interaction is detected with balanced cells; partial otherwise.
- **Reveal:** Factorial vs one-at-a-time comparison at equal budget.
- **Why it works:** The equal-budget comparison shows the efficiency of factorials.
- **Engine type:** BUILD

### W9.10 Cohort study
- **Name:** Cohort study
- **Synonyms/notation:** prospective/retrospective cohort, longitudinal, exposed vs unexposed, incidence, relative risk
- **Definition:** Follow groups with and without an exposure forward in time and compare how many develop the outcome.
- **Formula/procedure:** Define cohorts by exposure; follow up; compute incidence and RR; adjust for confounders.
- **Prerequisites:** W9.01, W7.13
- **Misconception:** Thinking cohort studies can't be biased because they're prospective (loss to follow-up, confounding remain).
- **Real-world example:** The Framingham Heart Study; the British Doctors Study on smoking.
- **Difficulty tier:** Intermediate
- **Game name:** Follow the Ships
- **Goal:** Run a cohort through time, track outcomes and compute the RR, while handling dropouts.
- **Interaction:** Press "Advance year"; ships (participants) develop outcomes or drop out; enter RR at the end.
- **Data generation:** Random exposure effect and differential dropout.
- **Scoring:** Closeness on RR (factor 1.3); bonus for flagging differential dropout.
- **Reveal:** Incidence table; dropout bias illustrated.
- **Why it works:** Time-forward play distinguishes cohort from case-control.
- **Engine type:** NEW: TIMELINE

### W9.11 Case-control study
- **Name:** Case-control study
- **Synonyms/notation:** retrospective, cases vs controls, odds ratio, recall bias, control selection
- **Definition:** Start with people who have the outcome (cases) and comparable people who don't (controls), then look back at exposures.
- **Formula/procedure:** Select cases and controls; measure past exposure; compute OR (RR cannot be computed).
- **Prerequisites:** W9.10, W7.12
- **Misconception:** Computing a risk or incidence from case-control data.
- **Real-world example:** Doll and Hill's 1950 lung-cancer study.
- **Difficulty tier:** Intermediate
- **Game name:** Look Back
- **Goal:** Pick appropriate controls and compute the OR; avoid computing a "risk".
- **Interaction:** Choose a control source from 3 (one is biased); build the 2×2; slider for OR; a "risk" button is a trap.
- **Data generation:** Random true OR and a biased control pool.
- **Scoring:** 40 control choice, 60 OR; −30 for pressing "risk".
- **Reveal:** Why RR is unavailable (sampling on the outcome).
- **Why it works:** The trap button targets the exact error.
- **Engine type:** BUILD

### W9.12 Cross-sectional study
- **Name:** Cross-sectional study
- **Synonyms/notation:** prevalence study, survey, snapshot, temporal ambiguity
- **Definition:** Measuring exposure and outcome at one moment in time, which shows association but can't tell which came first.
- **Formula/procedure:** Compute prevalence and prevalence ratios; beware reverse causation.
- **Prerequisites:** W9.01
- **Misconception:** Claiming causation from a cross-sectional association.
- **Real-world example:** National health surveys linking screen time and depression at one time point.
- **Difficulty tier:** Beginner
- **Game name:** Snapshot
- **Goal:** For a cross-sectional finding, propose both causal directions and pick the design that could distinguish them.
- **Interaction:** Drag arrow direction; choose follow-up design from 3.
- **Data generation:** Random association scenarios.
- **Scoring:** 50 for stating both directions, 50 for the design.
- **Reveal:** A simulated cohort resolving the direction.
- **Why it works:** Forces the temporal-ambiguity reflex.
- **Engine type:** DETECTIVE

### W9.13 Longitudinal and panel studies
- **Name:** Longitudinal study
- **Synonyms/notation:** panel data, repeated measures over time, attrition, within-person change
- **Definition:** Measuring the same people repeatedly over time to study change.
- **Formula/procedure:** Multiple waves; analyse within-person change; handle attrition and time-varying confounding.
- **Prerequisites:** W9.10, W9.12
- **Misconception:** Confusing a series of separate cross-sections (repeated surveys of new people) with a true panel.
- **Real-world example:** The Millennium Cohort Study following children born in 2000–01.
- **Difficulty tier:** Intermediate
- **Game name:** Same People, New Year
- **Goal:** Distinguish repeated cross-sections from panels and identify what each can answer.
- **Interaction:** Two animations; tag which is which; pick the question each can answer.
- **Data generation:** Random scenario.
- **Scoring:** 50 + 50.
- **Reveal:** Within-person trajectories only visible in the panel.
- **Why it works:** Visual trajectories make "same people" concrete.
- **Engine type:** PICK

### W9.14 Hierarchy of evidence
- **Name:** Hierarchy of evidence
- **Synonyms/notation:** evidence pyramid, levels of evidence, GRADE
- **Definition:** A rough ranking of study designs by how much confidence they give about causation, from expert opinion up to systematic reviews of RCTs.
- **Formula/procedure:** Case report < cross-sectional < case-control < cohort < RCT < systematic review/meta-analysis of RCTs; adjust for quality.
- **Prerequisites:** W9.02, W9.10–W9.13
- **Misconception:** Treating the pyramid as absolute (a huge well-run cohort can beat a tiny flawed RCT).
- **Real-world example:** Clinical guideline committees grading evidence strength.
- **Difficulty tier:** Intermediate
- **Game name:** Stack the Pyramid
- **Goal:** Order study designs into the pyramid, then re-rank specific studies by quality.
- **Interaction:** Drag design tiles into tiers; then drag study cards (with quality flags) into a final ranking.
- **Data generation:** Random study cards with quality issues.
- **Scoring:** 50 pyramid, 50 rank correlation on the quality ranking.
- **Reveal:** Annotated pyramid.
- **Why it works:** The second step prevents a rigid reading of the hierarchy.
- **Engine type:** BUILD

### W9.15 Internal validity
- **Name:** Internal validity
- **Synonyms/notation:** threats to internal validity, history, maturation, testing, instrumentation, regression, selection, attrition
- **Definition:** Whether the study's design lets you trust that the treatment, and not something else, caused the result.
- **Formula/procedure:** Checklist the classic threats; randomisation and control groups address most.
- **Prerequisites:** W9.03, W8.39
- **Misconception:** Thinking a large sample improves internal validity.
- **Real-world example:** A training programme evaluated with a pre/post test with no control group.
- **Difficulty tier:** Intermediate
- **Game name:** Threat Scanner
- **Goal:** Identify the internal-validity threats present in a described study.
- **Interaction:** Tap threat tiles that apply; justify each with a line from the description.
- **Data generation:** Random study with 1–3 injected threats.
- **Scoring:** 100 × (correct − wrong)/true threats.
- **Reveal:** The fix for each threat.
- **Why it works:** Checklist practice on varied studies.
- **Engine type:** DETECTIVE

### W9.16 External validity
- **Name:** External validity
- **Synonyms/notation:** generalisability, transportability, ecological validity, WEIRD samples
- **Definition:** Whether the results apply beyond the people, setting and time of the study.
- **Formula/procedure:** Compare sample to target population; consider setting and era; replicate in new contexts.
- **Prerequisites:** W9.15, W6.05
- **Misconception:** Thinking RCTs automatically generalise (tightly selected participants may not resemble real patients).
- **Real-world example:** Psychology findings from US undergraduates applied worldwide.
- **Difficulty tier:** Intermediate
- **Game name:** Does It Travel?
- **Goal:** Judge how far a result generalises and name the limiting feature.
- **Interaction:** Slider from "this sample only" to "everyone"; pick limiting feature from chips.
- **Data generation:** Random sample descriptors.
- **Scoring:** 50 slider band, 50 feature.
- **Reveal:** The target-population mismatch highlighted.
- **Why it works:** Separates internal and external validity cleanly.
- **Engine type:** DETECTIVE

### W9.17 Construct validity
- **Name:** Construct validity
- **Synonyms/notation:** convergent/discriminant validity, content validity, criterion validity, face validity, measurement validity
- **Definition:** Whether the thing you measured really captures the concept you meant to measure.
- **Formula/procedure:** Does the measure correlate with related measures (convergent) and not with unrelated ones (discriminant)? Does it predict relevant outcomes (criterion)?
- **Prerequisites:** W9.22
- **Misconception:** Equating validity with reliability (a scale can be consistently wrong).
- **Real-world example:** Using "number of library visits" as a measure of intelligence.
- **Difficulty tier:** Advanced
- **Game name:** Measure the Right Thing
- **Goal:** Pick the measure that best captures a construct and reject proxies that measure something else.
- **Interaction:** Construct card; 4 candidate measures; rank them; name the validity type each fails.
- **Data generation:** Random constructs and proxies.
- **Scoring:** Rank correlation + validity-type labels.
- **Reveal:** Correlation web (convergent/discriminant) for the measures.
- **Why it works:** Ranking proxies trains the validity vocabulary.
- **Engine type:** PICK

### W9.18 Reliability (test-retest)
- **Name:** Test-retest reliability
- **Synonyms/notation:** reliability, consistency, repeatability, ICC, reliability coefficient
- **Definition:** Whether a measure gives the same answer when repeated on the same thing.
- **Formula/procedure:** Correlate (or ICC) scores at time 1 and time 2; reliability = true-score variance / total variance.
- **Prerequisites:** W8.03
- **Misconception:** Thinking high reliability implies validity.
- **Real-world example:** A bathroom scale that reads the same every time but is 2 kg off.
- **Difficulty tier:** Intermediate
- **Game name:** Weigh It Twice
- **Goal:** Estimate reliability from a test-retest scatter, and separate it from validity.
- **Interaction:** Slider for r; then judge "reliable? valid?" for a scale with offset.
- **Data generation:** Random reliability; random bias.
- **Scoring:** 50 closeness, 50 judgement.
- **Reveal:** Dartboard: tight cluster off-centre.
- **Why it works:** Dartboard metaphor again, now for measurement.
- **Engine type:** ESTIMATE

### W9.19 Cronbach's alpha
- **Name:** Cronbach's alpha
- **Synonyms/notation:** α, internal consistency, McDonald's omega, item-total correlation
- **Definition:** How consistently the items of a questionnaire measure the same thing; a 0–1 number, ≥ 0.7 conventionally acceptable.
- **Formula/procedure:** α = (k/(k − 1))(1 − Σs²_items/s²_total).
- **Prerequisites:** W9.18, W3.03
- **Misconception:** Thinking high α proves one-dimensionality, or chasing α by adding redundant items.
- **Real-world example:** Validating a 10-item job-satisfaction scale.
- **Difficulty tier:** Advanced
- **Game name:** Item Mixer
- **Goal:** Remove the item that is dragging α down, and predict α after removal.
- **Interaction:** Item correlation heatmap; tap an item to drop; slider for new α.
- **Data generation:** k 5–10 items, one off-topic.
- **Scoring:** 50 correct item, 50 closeness.
- **Reveal:** α if-item-deleted table.
- **Why it works:** Mirrors the actual scale-development workflow.
- **Engine type:** BUILD

### W9.20 Inter-rater reliability
- **Name:** Inter-rater reliability
- **Synonyms/notation:** Cohen's kappa κ, Fleiss' kappa, agreement, percent agreement, ICC
- **Definition:** How much two or more raters agree beyond what chance would give.
- **Formula/procedure:** κ = (p_o − p_e)/(1 − p_e); p_o observed agreement, p_e chance agreement from margins.
- **Prerequisites:** W4.09, W4.06
- **Misconception:** Reporting raw percent agreement (chance agreement can be high).
- **Real-world example:** Two radiologists classifying X-rays.
- **Difficulty tier:** Advanced
- **Game name:** Two Judges
- **Goal:** Estimate κ from an agreement table after computing chance agreement.
- **Interaction:** Table shown; slider for p_e; slider for κ.
- **Data generation:** Random marginals and agreement.
- **Scoring:** Closeness on both (tolerance 0.08).
- **Reveal:** κ formula; a case with 85% agreement but κ = 0.1.
- **Why it works:** The high-agreement-low-kappa case is the lesson.
- **Engine type:** ESTIMATE

### W9.21 Measurement error
- **Name:** Measurement error
- **Synonyms/notation:** random error, systematic error (bias), precision vs accuracy, noise, calibration
- **Definition:** The gap between a recorded value and the true value; random error averages out, systematic error doesn't.
- **Formula/procedure:** Observed = true + bias + random noise; reduce random error by repeating, bias by calibration.
- **Prerequisites:** W6.08
- **Misconception:** Assuming more measurements fix a mis-calibrated instrument.
- **Real-world example:** Thermometers reading 0.5 °C high across a clinic.
- **Difficulty tier:** Beginner
- **Game name:** Calibrate
- **Goal:** Separate random from systematic error in repeated readings and fix the instrument.
- **Interaction:** Readings stream in; sliders for bias and noise SD; press "Calibrate" by the bias.
- **Data generation:** Random bias and noise.
- **Scoring:** Closeness on both (tolerance 25%).
- **Reveal:** Readings re-centred after calibration; noise unchanged.
- **Why it works:** Separates the two error types operationally.
- **Engine type:** ESTIMATE

### W9.22 Operationalisation
- **Name:** Operationalisation
- **Synonyms/notation:** operational definition, measurable proxy, indicator, latent construct
- **Definition:** Turning an abstract idea ("stress") into something you can actually measure ("cortisol level", "a 10-item scale").
- **Formula/procedure:** Define the construct; choose observable indicators; specify exactly how they are recorded.
- **Prerequisites:** W1.01
- **Misconception:** Treating the proxy as the thing itself ("GDP is wellbeing").
- **Real-world example:** Measuring "engagement" by time on page.
- **Difficulty tier:** Beginner
- **Game name:** Make It Measurable
- **Goal:** Match abstract constructs to concrete measures and rate each measure's fit.
- **Interaction:** Drag measure cards to constructs; star-rate fit.
- **Data generation:** Random constructs and measure pools.
- **Scoring:** 60 matching, 40 fit ratings vs expert ratings.
- **Reveal:** Expert commentary per measure.
- **Why it works:** The rating step introduces construct validity thinking.
- **Engine type:** MATCH

### W9.23 Sample size and power calculation
- **Name:** Sample-size calculation
- **Synonyms/notation:** power analysis, a priori sample size, n per group, minimum detectable effect (MDE)
- **Definition:** Working out before the study how many participants are needed to detect the smallest effect worth finding.
- **Formula/procedure:** Inputs: α, power, effect size, SD (or baseline rate); n per group ≈ 2(z_{1−α/2} + z_{1−β})²σ²/δ². Use software; justify the effect size.
- **Prerequisites:** W7.09, W6.17
- **Misconception:** Choosing the effect size from a pilot's point estimate (noisy) rather than the minimal important difference.
- **Real-world example:** Ethics boards require sample-size justification for trials.
- **Difficulty tier:** Advanced
- **Game name:** Budget vs Power
- **Goal:** Choose n to achieve 80% power for the MID within a budget; if impossible, say so.
- **Interaction:** Sliders for n; inputs shown; "Can't be done" button.
- **Data generation:** Random MID, SD, budget; 30% infeasible.
- **Scoring:** 100 if n within 10% of required or correctly declared infeasible.
- **Reveal:** Power curve; the cost of chasing a smaller effect.
- **Why it works:** Including infeasible cases teaches honest planning.
- **Engine type:** NEW: TUNE

### W9.24 Pre-registration
- **Name:** Pre-registration
- **Synonyms/notation:** registered report, pre-analysis plan, OSF, clinical-trial registration, confirmatory vs exploratory
- **Definition:** Writing down hypotheses, sample size and analysis plan before collecting data, so later flexibility can't inflate findings.
- **Formula/procedure:** Register: hypotheses, primary outcome, n and stopping rule, analysis code; label deviations as exploratory.
- **Prerequisites:** W7.34, W9.23
- **Misconception:** Thinking pre-registration forbids exploration (it just labels it).
- **Real-world example:** Registered reports show ~44% positive results vs ~96% in standard papers.
- **Difficulty tier:** Advanced
- **Game name:** Lock the Plan
- **Goal:** Write a minimal pre-registration from a study idea by choosing required elements, then audit a paper against it.
- **Interaction:** Tick elements; later compare a results summary with the plan and flag deviations.
- **Data generation:** Random study; random deviations injected.
- **Scoring:** 50 elements, 50 deviations found.
- **Reveal:** Confirmatory vs exploratory labelling.
- **Why it works:** Auditing against one's own plan shows the point.
- **Engine type:** DETECTIVE

### W9.25 p-hacking and the garden of forking paths
- **Name:** p-hacking
- **Synonyms/notation:** data dredging, researcher degrees of freedom, garden of forking paths, optional stopping, outcome switching
- **Definition:** Trying many analyses (outcomes, subgroups, exclusions, covariates) until one is significant, then reporting only that.
- **Formula/procedure:** Each flexible choice multiplies the false-positive rate; with a few choices it exceeds 60%.
- **Prerequisites:** W7.34, W9.24
- **Misconception:** Thinking p-hacking requires dishonesty (it happens through innocent flexibility).
- **Real-world example:** Simmons, Nelson & Simonsohn (2011) showed listening to a song "reduced age" via flexible analysis.
- **Difficulty tier:** Intermediate
- **Game name:** Hack the p
- **Goal:** Get p < 0.05 from pure noise using the flexibility dials, then count how many choices you needed.
- **Interaction:** Toggle covariates, drop outliers, pick outcomes, peek and add 10 more; p updates.
- **Data generation:** All-noise dataset with 2 outcomes, 3 covariates.
- **Scoring:** The level is "won" by succeeding; the score rewards correctly estimating the inflated false-positive rate afterward (tolerance 0.15).
- **Reveal:** Simulation of 1,000 researchers with the same freedom: % who "find" an effect.
- **Why it works:** Doing it yourself makes the mechanism undeniable.
- **Engine type:** SAMPLER

### W9.26 HARKing
- **Name:** HARKing
- **Synonyms/notation:** hypothesising after results are known, post-hoc storytelling, Texas sharpshooter
- **Definition:** Presenting a hypothesis invented after seeing the data as if it had been predicted all along.
- **Formula/procedure:** Distinguish prediction from explanation; exploratory findings need confirmation in new data.
- **Prerequisites:** W9.25
- **Misconception:** Believing a good story about a pattern is evidence for it.
- **Real-world example:** Post-hoc subgroup "findings" in failed drug trials.
- **Difficulty tier:** Intermediate
- **Game name:** Sharpshooter
- **Goal:** Given a random scatter of "bullet holes", draw a target that makes you look accurate, then recognise the trick in a paper.
- **Interaction:** Draw a circle anywhere; then read a results blurb and tap the HARKed sentence.
- **Data generation:** Random points; random blurbs.
- **Scoring:** 100 for identifying the HARK.
- **Reveal:** Prediction vs postdiction timeline.
- **Why it works:** The Texas sharpshooter image is sticky.
- **Engine type:** DETECTIVE

### W9.27 Publication bias
- **Name:** Publication bias
- **Synonyms/notation:** file-drawer problem, positive-results bias, funnel-plot asymmetry, trim-and-fill
- **Definition:** Significant results get published; null results get filed away, so the literature overstates effects.
- **Formula/procedure:** Funnel plot of effect vs precision; asymmetry suggests missing small null studies; Egger's test.
- **Prerequisites:** W7.07, W10.24
- **Misconception:** Thinking a dozen published positive studies means an effect is real.
- **Real-world example:** Antidepressant trials: 94% of published trials positive vs 51% of all FDA-registered trials.
- **Difficulty tier:** Advanced
- **Game name:** File Drawer
- **Goal:** Simulate 50 labs studying a null effect, publish only p < 0.05, and predict the apparent effect size in the literature.
- **Interaction:** Set publication rule; run; slider for the published mean effect.
- **Data generation:** True effect 0 or small; 50 studies with random n.
- **Scoring:** Closeness (tolerance 0.15 d).
- **Reveal:** Full vs published funnel plot.
- **Why it works:** Watching a literature inflate from nothing.
- **Engine type:** SAMPLER

### W9.28 Survivorship bias
- **Name:** Survivorship bias
- **Synonyms/notation:** survivor bias, missing-data on failures, Wald's bomber
- **Definition:** Drawing conclusions only from things that "survived" a selection process, ignoring those that didn't.
- **Formula/procedure:** Ask "what am I not seeing?"; find or model the non-survivors.
- **Prerequisites:** W6.05
- **Misconception:** Studying successful companies' habits to learn what causes success.
- **Real-world example:** Abraham Wald recommending armour where returning planes had *no* bullet holes.
- **Difficulty tier:** Beginner
- **Game name:** Returning Planes
- **Goal:** Decide where to add armour from bullet-hole data on returning planes.
- **Interaction:** Tap plane regions to armour; submit; see where downed planes were hit.
- **Data generation:** Random vulnerability map; hits on survivors drawn from the non-fatal regions.
- **Scoring:** 100 × survival improvement vs optimal.
- **Reveal:** Downed planes overlay.
- **Why it works:** Wald's story is the canonical teaching case; playing it beats hearing it.
- **Engine type:** DETECTIVE

### W9.29 Selection bias
- **Name:** Selection bias
- **Synonyms/notation:** sampling bias, self-selection, healthy-worker effect, immortal-time bias, collider bias (related)
- **Definition:** When the way people enter a study is related to both exposure and outcome, the comparison is distorted.
- **Formula/procedure:** Diagram who gets into the sample; compare selection probabilities by group.
- **Prerequisites:** W6.08, W9.15
- **Misconception:** Thinking selection bias only matters for descriptive surveys, not for comparisons.
- **Real-world example:** Workers appear healthier than the general population because sick people don't work.
- **Difficulty tier:** Intermediate
- **Game name:** Through the Door
- **Goal:** Set entry rules for a study and predict how they distort the measured association.
- **Interaction:** Toggle entry filters; prediction slider; run.
- **Data generation:** Population with known association; filters correlated with both variables.
- **Scoring:** Closeness (tolerance 30%).
- **Reveal:** Population vs selected scatter.
- **Why it works:** The player creates the bias and sees the mechanism.
- **Engine type:** SAMPLER

### W9.30 Attrition bias
- **Name:** Attrition bias
- **Synonyms/notation:** loss to follow-up, differential dropout, intention-to-treat (ITT), per-protocol, last observation carried forward
- **Definition:** When participants drop out for reasons related to treatment or outcome, the remaining groups no longer compare fairly.
- **Formula/procedure:** Report dropout per arm; analyse by ITT; sensitivity analyses for missing outcomes.
- **Prerequisites:** W9.10, W9.29
- **Misconception:** Analysing only completers ("per-protocol") as the main result.
- **Real-world example:** A diet trial where those who fail drop out, making the diet look effective.
- **Difficulty tier:** Advanced
- **Game name:** Who Stayed
- **Goal:** Compare completers-only vs intention-to-treat estimates when dropout depends on outcome.
- **Interaction:** Set dropout rule; two estimates sliders; run.
- **Data generation:** Random dropout mechanism.
- **Scoring:** Closeness on both estimates.
- **Reveal:** The ITT vs per-protocol tables.
- **Why it works:** Creating the dropout rule reveals the bias.
- **Engine type:** SAMPLER

### W9.31 Hawthorne effect
- **Name:** Hawthorne effect
- **Synonyms/notation:** observer effect, reactivity, being-watched effect
- **Definition:** People change their behaviour because they know they're being studied, not because of the treatment.
- **Formula/procedure:** Use unobtrusive measures, control groups that are equally observed, or wash-in periods.
- **Prerequisites:** W9.03
- **Misconception:** Thinking it can be eliminated by telling participants not to change.
- **Real-world example:** Hand-hygiene compliance jumps when auditors are visible.
- **Difficulty tier:** Beginner
- **Game name:** Watched
- **Goal:** Design a comparison that separates the treatment effect from the being-watched effect.
- **Interaction:** Choose arms from a menu (treated+watched, untreated+watched, untreated+unwatched...); submit.
- **Data generation:** Random effect sizes.
- **Scoring:** 100 if the chosen arms identify the effect; partial otherwise.
- **Reveal:** The subtraction that isolates the effect.
- **Why it works:** Design-as-subtraction thinking.
- **Engine type:** DETECTIVE

### W9.32 Demand characteristics and experimenter bias
- **Name:** Demand characteristics
- **Synonyms/notation:** experimenter expectancy, Rosenthal effect, social desirability, response bias, acquiescence
- **Definition:** Participants guess what the study wants and act accordingly; experimenters unconsciously nudge results.
- **Formula/procedure:** Blinding, cover stories, neutral wording, automated procedures.
- **Prerequisites:** W9.05
- **Misconception:** Assuming self-reports are honest when the "right" answer is obvious.
- **Real-world example:** Clever Hans the horse responding to his trainer's cues.
- **Difficulty tier:** Intermediate
- **Game name:** Leading Questions
- **Goal:** Rewrite loaded survey items as neutral ones and spot experimenter cues in a script.
- **Interaction:** Pick the neutral version from 3; tap cue lines in a script.
- **Data generation:** Random item and script pools.
- **Scoring:** 50 + 50.
- **Reveal:** Simulated response shift from wording.
- **Why it works:** Practical survey-writing skill.
- **Engine type:** DETECTIVE

### W9.33 Berkson's paradox
- **Name:** Berkson's paradox
- **Synonyms/notation:** Berkson's bias, collider bias, admission-rate bias, selection-induced correlation
- **Definition:** Selecting on a variable that both factors influence creates a spurious (often negative) correlation between them.
- **Formula/procedure:** If selection depends on X + Y, then within the selected group X and Y are negatively correlated even if independent overall.
- **Prerequisites:** W9.29, W8.06
- **Misconception:** Thinking two traits really trade off because they seem to in a selected group (e.g. "attractive people are less kind" among dating-app matches).
- **Real-world example:** Hospital patients showing a negative correlation between two diseases that are unrelated in the population.
- **Difficulty tier:** Advanced
- **Game name:** Admission Filter
- **Goal:** Apply a selection filter to independent X and Y and predict the correlation that appears.
- **Interaction:** Drag a diagonal filter line; slider for r in the selected group; reveal.
- **Data generation:** Independent X, Y; filter on X + Y > c.
- **Scoring:** Closeness (tolerance 0.2).
- **Reveal:** Population r = 0 vs selected r < 0.
- **Why it works:** Creating a correlation from nothing is unforgettable.
- **Engine type:** SAMPLER

### W9.34 Replication and the replication crisis
- **Name:** Replication
- **Synonyms/notation:** direct replication, conceptual replication, reproducibility, replication crisis, Many Labs
- **Definition:** Repeating a study to see if the result holds; many famous findings failed to replicate, revealing systemic problems.
- **Formula/procedure:** Pre-register; use larger n; report effect sizes; judge by CI overlap and effect size, not just p.
- **Prerequisites:** W9.25, W9.27, W7.09
- **Misconception:** Thinking a replication with p > 0.05 "disproves" the original (compare effect sizes and precision).
- **Real-world example:** The 2015 Reproducibility Project replicated 36% of 100 psychology findings.
- **Difficulty tier:** Advanced
- **Game name:** Replication Lab
- **Goal:** Predict what share of a simulated literature replicates given its power and publication bias, then run it.
- **Interaction:** Set power, prior probability of true effects, publication filter; slider prediction; run 200 replications.
- **Data generation:** Simulated literature.
- **Scoring:** Closeness (tolerance 0.15).
- **Reveal:** Positive predictive value formula: PPV = (1 − β)R/[(1 − β)R + α].
- **Why it works:** Ioannidis's argument as a simulation.
- **Engine type:** SAMPLER

### W9.35 Intention-to-treat vs per-protocol
- **Name:** Intention-to-treat
- **Synonyms/notation:** ITT, as-randomised, per-protocol (PP), as-treated, compliance, non-adherence
- **Definition:** Analysing everyone in the group they were randomised to, regardless of whether they actually took the treatment, to preserve randomisation.
- **Formula/procedure:** ITT estimates the effect of *offering* treatment; PP estimates the effect of *receiving* it but reintroduces selection bias.
- **Prerequisites:** W9.30, W9.06
- **Misconception:** Thinking PP is "more accurate" because it reflects real dosing.
- **Real-world example:** A drug trial where sick patients stop taking the drug.
- **Difficulty tier:** Advanced
- **Game name:** As Randomised
- **Goal:** Compute ITT and PP estimates when non-compliance depends on prognosis, and say which is unbiased for the offer effect.
- **Interaction:** Set compliance rule; two sliders; pick.
- **Data generation:** Random compliance mechanisms.
- **Scoring:** Closeness + choice.
- **Reveal:** Both estimates vs truth.
- **Why it works:** Seeing PP go wrong is the argument for ITT.
- **Engine type:** SAMPLER

### W9.36 Natural experiments and quasi-experiments
- **Name:** Quasi-experiment
- **Synonyms/notation:** natural experiment, as-if random, interrupted time series, regression discontinuity, difference-in-differences
- **Definition:** Situations where circumstances, not researchers, assign treatment in a way that is almost random, allowing causal inference without an RCT.
- **Formula/procedure:** Argue that assignment is as-if random (lottery, policy cut-off, timing); use matching designs (W10.28–W10.34).
- **Prerequisites:** W9.01, W9.02
- **Misconception:** Calling any observational comparison a natural experiment.
- **Real-world example:** The Vietnam draft lottery used to study effects of military service.
- **Difficulty tier:** Advanced
- **Game name:** Found Experiments
- **Goal:** Identify which scenarios contain an as-if-random assignment mechanism and name it.
- **Interaction:** Tap scenarios; pick mechanism (lottery, cut-off, timing, geography); reject non-examples.
- **Data generation:** Random pool.
- **Scoring:** 100 × correct.
- **Reveal:** The causal design each enables.
- **Why it works:** Trains the eye for exploitable randomness.
- **Engine type:** PICK

### W9.37 Research ethics
- **Name:** Research ethics
- **Synonyms/notation:** informed consent, IRB/ethics committee, equipoise, Belmont principles, data protection, Declaration of Helsinki
- **Definition:** Rules that protect participants: consent, minimal harm, fair selection, privacy, and only running trials when the better option is unknown (equipoise).
- **Formula/procedure:** Consent → risk/benefit review → fair recruitment → confidentiality → monitoring and stopping rules.
- **Prerequisites:** W9.02
- **Misconception:** Thinking ethics is a paperwork step unrelated to design (stopping rules and equipoise shape the statistics).
- **Real-world example:** The Tuskegee study and the resulting Belmont Report.
- **Difficulty tier:** Intermediate
- **Game name:** Ethics Gate
- **Goal:** Approve, revise or reject proposals and cite the principle.
- **Interaction:** Proposal cards; three buttons; pick principle.
- **Data generation:** Random proposal pool with violations.
- **Scoring:** 20 per correct decision + principle over 5.
- **Reveal:** Explanation and historical case.
- **Why it works:** Case-based ethics is standard training.
- **Engine type:** QUIZ

---

## World 10 — Frontier Fjords (Advanced → Research)

Theme: deep fjords of modern methods; each inlet is a toolkit used in research and data science.

### W10.01 Likelihood function
- **Name:** Likelihood
- **Synonyms/notation:** L(θ | data), likelihood function, log-likelihood ℓ(θ), likelihood ratio
- **Definition:** How probable the observed data are under each possible parameter value, viewed as a function of the parameter.
- **Formula/procedure:** L(θ) = Π f(xᵢ | θ); ℓ(θ) = Σ ln f(xᵢ | θ).
- **Prerequisites:** W5.07, W4.07
- **Misconception:** Reading the likelihood as a probability distribution over θ (it doesn't integrate to 1).
- **Real-world example:** The curve showing which coin bias best explains 7 heads in 10.
- **Difficulty tier:** Advanced
- **Game name:** Likelihood Curve
- **Goal:** Sketch the likelihood of p for an observed sequence of flips, then find its peak.
- **Interaction:** Place 6 control points over p ∈ [0,1]; submit; tap the maximum.
- **Data generation:** Random n, k.
- **Scoring:** 60 curve shape (normalised MAE), 40 peak location (tolerance 0.05).
- **Reveal:** True curve pᵏ(1−p)ⁿ⁻ᵏ; peak at k/n.
- **Why it works:** Drawing the curve makes "function of θ" concrete.
- **Engine type:** BUILD

### W10.02 Maximum likelihood estimation
- **Name:** Maximum likelihood estimation
- **Synonyms/notation:** MLE, θ̂_ML, score equation, Fisher information, asymptotic normality
- **Definition:** Choose the parameter value that makes the observed data most probable.
- **Formula/procedure:** Maximise ℓ(θ); set dℓ/dθ = 0; SE ≈ 1/√(Fisher information). MLE of a normal mean is x̄; of a proportion is k/n.
- **Prerequisites:** W10.01
- **Misconception:** Expecting MLEs to be unbiased (the MLE of variance divides by n).
- **Real-world example:** Logistic regression coefficients are MLEs.
- **Difficulty tier:** Advanced
- **Game name:** Hill Climb
- **Goal:** Find the parameter pair (μ, σ) maximising the log-likelihood of a sample with the fewest evaluations.
- **Interaction:** Click points on the (μ, σ) plane; each click reveals ℓ there; 8 clicks max.
- **Data generation:** Random normal sample.
- **Scoring:** 100 × exp(−(ℓ_max − ℓ_best_found)).
- **Reveal:** Contour map; MLE = (x̄, s_n).
- **Why it works:** Optimisation as a search game builds the geometry of likelihood surfaces.
- **Engine type:** BUILD

### W10.03 Prior distribution
- **Name:** Prior
- **Synonyms/notation:** prior distribution, p(θ), informative/weakly informative/flat prior, elicitation, prior predictive
- **Definition:** What you believe about a parameter before seeing the data, written as a distribution.
- **Formula/procedure:** Choose a distribution over θ; check its implications with prior predictive simulation.
- **Prerequisites:** W5.20, W4.11
- **Misconception:** Thinking flat priors are "objective" (a flat prior on one scale is informative on another).
- **Real-world example:** A clinician's prior that a new drug's effect is probably modest.
- **Difficulty tier:** Advanced
- **Game name:** State Your Belief
- **Goal:** Draw a prior for a quantity you have some knowledge of, then compare it with a calibrated expert's.
- **Interaction:** Drag a Beta or normal curve's sliders; submit; see expert prior and prior predictive samples.
- **Data generation:** Random real-world quantity with a reference distribution.
- **Scoring:** Scored by whether the true value lies inside the prior's 90% interval and how narrow it is (proper scoring).
- **Reveal:** Overlaid priors; prior predictive draws.
- **Why it works:** Calibration scoring teaches honest priors.
- **Engine type:** BUILD

### W10.04 Posterior and Bayesian updating
- **Name:** Posterior distribution
- **Synonyms/notation:** posterior ∝ likelihood × prior, p(θ | data), Bayesian updating, sequential updating
- **Definition:** Your belief after combining the prior with the data through the likelihood.
- **Formula/procedure:** p(θ | data) ∝ L(θ) p(θ); for Beta(a, b) prior and k successes in n: Beta(a + k, b + n − k).
- **Prerequisites:** W10.03, W10.01
- **Misconception:** Thinking the order of data matters, or that the prior "dominates forever" (data overwhelm it as n grows).
- **Real-world example:** Updating the probability of rain as the morning's clouds arrive.
- **Difficulty tier:** Advanced
- **Game name:** Update Lab
- **Goal:** Watch a Beta posterior update one observation at a time and predict where it lands after n.
- **Interaction:** Press "Next observation" (the curve moves); after 5, slider-predict the posterior mean after 50; run.
- **Data generation:** Random true p; random prior.
- **Scoring:** Closeness (tolerance 0.05).
- **Reveal:** Prior, likelihood and posterior curves; the conjugate formula.
- **Why it works:** Seeing the curve sharpen is Bayesian learning itself.
- **Engine type:** SAMPLER

### W10.05 Credible interval
- **Name:** Credible interval
- **Synonyms/notation:** Bayesian interval, highest-density interval (HDI), equal-tailed interval, 95% credible interval
- **Definition:** A range of parameter values that holds 95% of the posterior probability; unlike a CI, it *does* mean "95% probability the parameter is here".
- **Formula/procedure:** Take the 2.5th and 97.5th percentiles of the posterior (or the narrowest 95% region for the HDI).
- **Prerequisites:** W10.04, W6.18
- **Misconception:** Treating credible and confidence intervals as interchangeable (they answer different questions, though often numerically close).
- **Real-world example:** "There's a 95% probability the lift is between 1% and 4%."
- **Difficulty tier:** Advanced
- **Game name:** Belief Band
- **Goal:** Shade 95% of a posterior and state the correct sentence; then pick which sentence is OK for a CI vs a credible interval.
- **Interaction:** Drag handles; pick sentences.
- **Data generation:** Random posterior shape.
- **Scoring:** 50 shading, 50 sentences.
- **Reveal:** HDI vs equal-tailed for a skewed posterior; the two sentence types.
- **Why it works:** Puts the CI/credible distinction on sentences, where it bites.
- **Engine type:** BUILD

### W10.06 Bayes factor
- **Name:** Bayes factor
- **Synonyms/notation:** BF₁₀, BF₀₁, marginal likelihood ratio, evidence ratio, Jeffreys' scale
- **Definition:** How many times more likely the data are under one hypothesis than another; evidence that can favour the null.
- **Formula/procedure:** BF₁₀ = p(data | H₁)/p(data | H₀); posterior odds = BF × prior odds. Rough scale: 3 moderate, 10 strong, 30 very strong.
- **Prerequisites:** W10.04, W4.19
- **Misconception:** Reading BF as a posterior probability, or ignoring its dependence on the H₁ prior.
- **Real-world example:** Psychology papers reporting BF₀₁ = 8 as evidence for no effect.
- **Difficulty tier:** Research
- **Game name:** Evidence Scale
- **Goal:** Estimate the Bayes factor for a coin result under "fair" vs "biased with Beta(1,1)".
- **Interaction:** Slider (log scale); reveal; then combine with prior odds via a second slider.
- **Data generation:** Random n, k.
- **Scoring:** Closeness on log BF (tolerance 0.5).
- **Reveal:** Marginal likelihood integrals shown as areas; posterior odds.
- **Why it works:** Area pictures make "marginal likelihood" less mystical.
- **Engine type:** ESTIMATE

### W10.07 Conjugate priors
- **Name:** Conjugate prior
- **Synonyms/notation:** conjugacy, Beta–binomial, normal–normal, gamma–Poisson, closed-form posterior
- **Definition:** A prior family that, combined with a likelihood, gives a posterior in the same family, so updating is simple arithmetic.
- **Formula/procedure:** Beta(a,b) + Bin(k of n) → Beta(a+k, b+n−k); Gamma(α,β) + Poisson(Σx over n) → Gamma(α+Σx, β+n).
- **Prerequisites:** W10.04, W5.20
- **Misconception:** Thinking conjugacy is required for Bayesian analysis (it's just convenient).
- **Real-world example:** Bandit algorithms tracking click rates with Beta posteriors.
- **Difficulty tier:** Research
- **Game name:** Add the Counts
- **Goal:** Update Beta parameters by hand across a sequence of batches.
- **Interaction:** Batch results appear; type new (a, b); the curve updates if correct.
- **Data generation:** Random batches.
- **Scoring:** 20 per correct update over 5.
- **Reveal:** Pseudo-count interpretation of a and b.
- **Why it works:** Arithmetic updates show the prior as "pseudo-data".
- **Engine type:** BUILD

### W10.08 MCMC
- **Name:** Markov chain Monte Carlo
- **Synonyms/notation:** MCMC, Metropolis–Hastings, Gibbs sampling, Hamiltonian Monte Carlo (HMC), burn-in, trace plot, convergence (R̂), effective sample size
- **Definition:** A way to draw samples from a posterior you can't write down, by wandering through parameter space in a way that visits regions in proportion to their probability.
- **Formula/procedure:** Propose a move; accept with probability min(1, p(new)/p(old)); repeat; discard burn-in; check traces.
- **Prerequisites:** W10.04, W10.11
- **Misconception:** Treating consecutive draws as independent, or trusting a chain that hasn't converged.
- **Real-world example:** Hierarchical models fitted in Stan or PyMC.
- **Difficulty tier:** Research
- **Game name:** Random Walker
- **Goal:** Tune the step size of a Metropolis walker so the histogram of visited points matches the target curve fastest.
- **Interaction:** Step-size slider; press "Run 2,000 steps"; acceptance rate and trace shown.
- **Data generation:** Random bimodal or skewed target.
- **Scoring:** 100 × closeness of the sampled histogram to the target (1 − total variation), with a bonus for acceptance rate 20–50%.
- **Reveal:** Trace plots at too-small, good and too-large step sizes.
- **Why it works:** Tuning step size teaches what convergence diagnostics mean.
- **Engine type:** NEW: TUNE

### W10.09 Permutation test
- **Name:** Permutation test
- **Synonyms/notation:** randomisation test, exact test, re-randomisation, shuffle test
- **Definition:** A test that builds the null distribution by shuffling group labels many times and seeing how often the shuffled statistic beats the real one.
- **Formula/procedure:** Compute observed statistic; repeat B times: shuffle labels, recompute; p = (count ≥ observed + 1)/(B + 1).
- **Prerequisites:** W7.04
- **Misconception:** Thinking it needs no assumptions (it assumes exchangeability under H₀).
- **Real-world example:** Comparing medians or any odd statistic between A/B groups.
- **Difficulty tier:** Advanced
- **Game name:** Shuffle Engine
- **Goal:** Run a permutation test on a statistic of your choice (median difference, ratio of SDs) and compute p.
- **Interaction:** Choose statistic; shuffle; histogram; mark observed; enter p.
- **Data generation:** Random two-group data.
- **Scoring:** Closeness (tolerance 0.03).
- **Reveal:** p compared with the parametric test where one exists.
- **Why it works:** Generalises W7.04 to any statistic.
- **Engine type:** SAMPLER

### W10.10 Monte Carlo simulation
- **Name:** Monte Carlo simulation
- **Synonyms/notation:** simulation, stochastic simulation, random sampling methods, Monte Carlo integration, seed, pseudo-random numbers
- **Definition:** Estimating a quantity by generating many random scenarios on a computer and averaging what happens.
- **Formula/procedure:** Define the random process; simulate N times; estimate = average; SE ≈ SD/√N; set a seed for reproducibility.
- **Prerequisites:** W4.16
- **Misconception:** Believing simulation gives exact answers (it has its own Monte Carlo error).
- **Real-world example:** Estimating π by throwing darts; project-risk analysis; option pricing.
- **Difficulty tier:** Intermediate
- **Game name:** Dart Pi
- **Goal:** Estimate π by throwing random darts at a square with an inscribed circle, and predict how many darts you need for two decimal places.
- **Interaction:** Throw 10/100/10,000; estimate updates; slider for the N needed.
- **Data generation:** Uniform darts.
- **Scoring:** Closeness on log N (factor 2).
- **Reveal:** Error vs N on a log-log plot (slope −1/2).
- **Why it works:** The −1/2 slope is the universal law of simulation cost.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W10.11 Markov chains
- **Name:** Markov chain
- **Synonyms/notation:** transition matrix, state, stationary distribution, memoryless property, absorbing state, random walk
- **Definition:** A process that hops between states where the next state depends only on the current one.
- **Formula/procedure:** Transition matrix P; distribution after k steps = π₀Pᵏ; stationary π solves π = πP.
- **Prerequisites:** W4.08, W4.06
- **Misconception:** Thinking the chain "remembers" earlier states.
- **Real-world example:** Weather models (sunny → rainy), customer churn states, PageRank.
- **Difficulty tier:** Advanced
- **Game name:** Weather Hopper
- **Goal:** Set transition probabilities and predict the long-run share of sunny days.
- **Interaction:** Drag arrow weights between 2–3 states (rows auto-normalise); slider prediction; run 1,000 days.
- **Data generation:** Random target stationary distribution.
- **Scoring:** Closeness (tolerance 0.07).
- **Reveal:** Stationary distribution solved; convergence trace.
- **Why it works:** Playing with arrows reveals the stationary distribution as a balance.
- **Engine type:** NEW: DIAGRAM

### W10.12 Time series: trend
- **Name:** Trend
- **Synonyms/notation:** secular trend, trend line, detrending, linear/exponential trend
- **Definition:** The long-run direction of a series over time, separate from short-term wiggles.
- **Formula/procedure:** Fit a smooth or a regression on time; detrend by subtracting it.
- **Prerequisites:** W8.09
- **Misconception:** Reading a short run of increases as a trend.
- **Real-world example:** Global temperature anomalies since 1880.
- **Difficulty tier:** Intermediate
- **Game name:** Draw the Trend
- **Goal:** Draw the trend through a noisy series and predict the next 5 points' average.
- **Interaction:** Draw a smooth line; slider for forecast.
- **Data generation:** Random trend (linear, exponential, none) with noise.
- **Scoring:** 60 trend fit, 40 forecast (tolerance 1 noise SD).
- **Reveal:** True trend; the detrended residual series.
- **Why it works:** Forecasting forces commitment to a trend reading.
- **Engine type:** NEW: TIMELINE

### W10.13 Seasonality
- **Name:** Seasonality
- **Synonyms/notation:** seasonal component, periodicity, seasonal adjustment, decomposition (trend + seasonal + remainder), cycle
- **Definition:** A pattern that repeats at a fixed interval (daily, weekly, yearly).
- **Formula/procedure:** Decompose: y = trend + seasonal + remainder (or multiplicative); seasonal index per period.
- **Prerequisites:** W10.12
- **Misconception:** Calling December's sales spike a "trend"; or confusing seasonality with cycles of irregular length.
- **Real-world example:** Ice-cream sales, electricity demand, retail sales.
- **Difficulty tier:** Intermediate
- **Game name:** Find the Period
- **Goal:** Identify the seasonal period and amplitude in a series and then seasonally adjust it.
- **Interaction:** Slider for period; slider for amplitude; press "Adjust".
- **Data generation:** Random period (7, 12, 24, 52) and amplitude.
- **Scoring:** 50 period (exact), 50 amplitude (tolerance 25%).
- **Reveal:** Decomposition panels.
- **Why it works:** Decomposition panels are how analysts actually look at series.
- **Engine type:** NEW: TIMELINE

### W10.14 Autocorrelation
- **Name:** Autocorrelation
- **Synonyms/notation:** serial correlation, ACF, PACF, lag, correlogram, AR(1)
- **Definition:** Correlation of a series with a lagged copy of itself; tells you whether today predicts tomorrow.
- **Formula/procedure:** r_k = Σ(yₜ − ȳ)(yₜ₊ₖ − ȳ)/Σ(yₜ − ȳ)²; plot vs k.
- **Prerequisites:** W8.03, W8.18
- **Misconception:** Treating autocorrelated observations as independent (massively inflates significance).
- **Real-world example:** Daily temperatures; stock volatility clustering.
- **Difficulty tier:** Advanced
- **Game name:** Lag Lens
- **Goal:** Guess the lag-1 autocorrelation from a series and sketch the ACF.
- **Interaction:** Slider; then drag bars for lags 1–6.
- **Data generation:** AR(1) with random φ; sometimes seasonal.
- **Scoring:** 50 lag-1 (tolerance 0.2), 50 ACF shape.
- **Reveal:** Lag plot (yₜ vs yₜ₋₁); true ACF.
- **Why it works:** The lag plot turns autocorrelation into a scatter plot the player already understands.
- **Engine type:** CORRELATION GUESS

### W10.15 Moving averages and smoothing
- **Name:** Moving average
- **Synonyms/notation:** rolling mean, window, exponential smoothing, LOESS, smoothing parameter
- **Definition:** Replacing each point with the average of its neighbours to reveal the underlying pattern.
- **Formula/procedure:** MA(k)ₜ = mean(yₜ₋ₖ₊₁ … yₜ); exponential: sₜ = αyₜ + (1 − α)sₜ₋₁.
- **Prerequisites:** W10.12
- **Misconception:** Using a window that matches the seasonal period and then "discovering" there's no seasonality; or reading the lag introduced by trailing MAs as a real delay.
- **Real-world example:** 7-day averages of COVID cases.
- **Difficulty tier:** Intermediate
- **Game name:** Smooth Operator
- **Goal:** Choose a window that reveals the trend without erasing a genuine short-lived event.
- **Interaction:** Window slider; event marker must stay visible; submit.
- **Data generation:** Noisy series with a real 3-day event.
- **Scoring:** 100 if the window is in the "good" band (reduces noise ≥ 60% and preserves ≥ 50% of event height).
- **Reveal:** Over- and under-smoothed versions.
- **Why it works:** The trade-off is explicit in the constraint.
- **Engine type:** NEW: TUNE

### W10.16 Stationarity and differencing
- **Name:** Stationarity
- **Synonyms/notation:** stationary series, unit root, differencing (Δyₜ), random walk, spurious regression, ADF test
- **Definition:** A series whose mean and variance don't change over time; many methods need it, and regressing two non-stationary series produces fake relationships.
- **Formula/procedure:** Difference until stationary (Δyₜ = yₜ − yₜ₋₁); check ACF decays quickly; ADF test.
- **Prerequisites:** W10.14, W8.06
- **Misconception:** Correlating two trending series and announcing a relationship (Granger–Newbold spurious regression).
- **Real-world example:** Two random walks correlate at |r| > 0.5 most of the time.
- **Difficulty tier:** Advanced
- **Game name:** Fake Friends
- **Goal:** Predict the correlation between two independent random walks, then difference them and re-check.
- **Interaction:** Slider; generate; press "Difference"; slider again.
- **Data generation:** Two independent random walks.
- **Scoring:** 50 + 50 closeness.
- **Reveal:** r before (often large) vs after (≈ 0).
- **Why it works:** The spurious correlation disappears on differencing, showing why stationarity matters.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W10.17 Forecasting basics
- **Name:** Forecasting
- **Synonyms/notation:** point forecast, forecast interval, horizon, exponential smoothing (Holt–Winters), ARIMA, naive forecast, MAPE
- **Definition:** Predicting future values of a series, with uncertainty that grows with the horizon.
- **Formula/procedure:** Start with the naive and seasonal-naive baselines; try exponential smoothing or ARIMA; evaluate on a hold-out period with MAE/MAPE.
- **Prerequisites:** W10.13, W10.15, W8.37
- **Misconception:** Reporting a point forecast without an interval; forgetting to beat the naive baseline.
- **Real-world example:** Demand forecasting for inventory.
- **Difficulty tier:** Advanced
- **Game name:** Fan Chart
- **Goal:** Draw a forecast and a widening uncertainty fan for the next 12 periods, then see the truth.
- **Interaction:** Drag forecast points and fan edges; reveal.
- **Data generation:** Random series with trend/seasonality.
- **Scoring:** Interval score (reward coverage, penalise width).
- **Reveal:** Truth overlaid; naive baseline error vs yours.
- **Why it works:** Interval scoring teaches calibrated forecasting.
- **Engine type:** NEW: TIMELINE

### W10.18 Censoring
- **Name:** Censoring
- **Synonyms/notation:** right-censoring, left-censoring, interval censoring, time-to-event, follow-up
- **Definition:** When you know an event hadn't happened by the time observation stopped, but not when it happened; survival methods use that partial information.
- **Formula/procedure:** Record (time, event indicator); censored cases contribute "survived at least this long".
- **Prerequisites:** W9.10
- **Misconception:** Dropping censored cases or treating censoring time as the event time (both bias survival estimates).
- **Real-world example:** Patients still alive at the end of a 5-year study; customers who haven't churned yet.
- **Difficulty tier:** Advanced
- **Game name:** Still Going
- **Goal:** Label each participant timeline as event or censored and predict how dropping censored cases biases median survival.
- **Interaction:** Tap timelines; choose bias direction; reveal.
- **Data generation:** Random survival times and censoring.
- **Scoring:** 60 labels, 40 bias direction.
- **Reveal:** Median survival with/without censored cases.
- **Why it works:** Seeing the bias direction prevents the classic error.
- **Engine type:** NEW: TIMELINE

### W10.19 Kaplan–Meier estimator
- **Name:** Kaplan–Meier curve
- **Synonyms/notation:** KM estimator, survival curve, product-limit estimator, median survival, log-rank test
- **Definition:** A step curve showing the proportion still event-free over time, built by multiplying survival probabilities at each event time.
- **Formula/procedure:** S(t) = Π over event times tᵢ ≤ t of (1 − dᵢ/nᵢ), where dᵢ events and nᵢ at risk; log-rank test compares curves.
- **Prerequisites:** W10.18
- **Misconception:** Reading the curve's tail as precise when few are at risk.
- **Real-world example:** Survival after cancer treatment by arm.
- **Difficulty tier:** Advanced
- **Game name:** Step Down
- **Goal:** Build the KM curve step by step from a small dataset.
- **Interaction:** At each event time, type the number at risk and the number of events; the step draws.
- **Data generation:** 8–12 participants with censoring.
- **Scoring:** 100 × correct steps.
- **Reveal:** Full curve with at-risk table; median survival.
- **Why it works:** Hand-building the product-limit makes censoring's role clear.
- **Engine type:** BUILD

### W10.20 Hazard ratios and Cox regression
- **Name:** Hazard ratio
- **Synonyms/notation:** HR, hazard function, Cox proportional hazards model, proportional-hazards assumption
- **Definition:** The ratio of event rates at any moment between two groups; HR = 0.7 means a 30% lower instantaneous risk.
- **Formula/procedure:** Cox: h(t | x) = h₀(t)exp(βx); HR = e^β; check proportional hazards (curves shouldn't cross).
- **Prerequisites:** W10.19, W8.29
- **Misconception:** Reading HR as a relative risk at the end of the study, or as a ratio of median survival times.
- **Real-world example:** "Treatment reduced the hazard of death by 25% (HR 0.75, 95% CI 0.6–0.9)."
- **Difficulty tier:** Research
- **Game name:** Rate Ratio
- **Goal:** Estimate the HR from two KM curves and judge whether hazards are proportional.
- **Interaction:** Slider (log scale); tap "proportional?" yes/no.
- **Data generation:** Random HR; 30% with crossing hazards.
- **Scoring:** 60 closeness (factor 1.3), 40 PH judgement.
- **Reveal:** Cox output; log(−log S) plot.
- **Why it works:** Associating curve shapes with HR builds reading skill for papers.
- **Engine type:** ESTIMATE

### W10.21 Meta-analysis
- **Name:** Meta-analysis
- **Synonyms/notation:** pooled estimate, weighted average of effects, inverse-variance weighting, systematic review, PRISMA
- **Definition:** Combining results from several studies into one overall estimate, weighting precise studies more.
- **Formula/procedure:** Pooled = Σwᵢθᵢ/Σwᵢ with wᵢ = 1/SEᵢ² (fixed effect); random effects adds between-study variance τ².
- **Prerequisites:** W2.04, W6.11
- **Misconception:** Averaging effect sizes without weights, or counting significant vs non-significant studies ("vote counting").
- **Real-world example:** Cochrane reviews of treatments.
- **Difficulty tier:** Advanced
- **Game name:** Pool the Studies
- **Goal:** Set weights for five studies by their precision and compute the pooled effect.
- **Interaction:** Weight sliders; pooled estimate hidden; submit.
- **Data generation:** Random effects and SEs.
- **Scoring:** 50 weights (correlation with 1/SE²), 50 pooled closeness.
- **Reveal:** Forest plot (teaser).
- **Why it works:** Weighting by hand shows why big precise studies dominate.
- **Engine type:** BUILD

### W10.22 Forest plot
- **Name:** Forest plot
- **Synonyms/notation:** blobbogram, study-level CIs, diamond (pooled), line of no effect
- **Definition:** A chart with one row per study showing its effect and CI, and a diamond for the pooled result.
- **Formula/procedure:** Box size ∝ weight; horizontal line = CI; diamond width = pooled CI; vertical line at null.
- **Prerequisites:** W10.21, W7.38
- **Misconception:** Reading the number of CIs crossing the null as the verdict.
- **Real-world example:** Every Cochrane review summary figure.
- **Difficulty tier:** Advanced
- **Game name:** Read the Forest
- **Goal:** Answer five reading questions about a forest plot (which study weighs most, is the pooled effect significant, which study is an outlier, etc.).
- **Interaction:** Tap rows; tap yes/no.
- **Data generation:** Random forest plot.
- **Scoring:** 20 per question.
- **Reveal:** Annotated plot.
- **Why it works:** Forest plots are ubiquitous; practised reading is the skill.
- **Engine type:** PICK

### W10.23 Heterogeneity and I²
- **Name:** Heterogeneity
- **Synonyms/notation:** between-study variance τ², Cochran's Q, I², prediction interval in meta-analysis
- **Definition:** How much the studies' true effects differ from each other beyond chance; I² is the share of variation due to real differences.
- **Formula/procedure:** Q = Σwᵢ(θᵢ − θ̂)²; I² = max(0, (Q − df)/Q); rough bands 25/50/75%.
- **Prerequisites:** W10.21
- **Misconception:** Treating a high I² as "the meta-analysis is invalid" rather than "effects vary; explore why".
- **Real-world example:** Education interventions varying by country.
- **Difficulty tier:** Research
- **Game name:** Same Effect?
- **Goal:** Judge from a forest plot whether studies share an effect and estimate I².
- **Interaction:** Slider for I²; pick "fixed OK / random needed".
- **Data generation:** Random τ².
- **Scoring:** 60 closeness (tolerance 20 points), 40 choice.
- **Reveal:** Q, I², τ²; prediction interval.
- **Why it works:** Eye-calibrating I² against spread is practical.
- **Engine type:** ESTIMATE

### W10.24 Funnel plot
- **Name:** Funnel plot
- **Synonyms/notation:** publication-bias plot, small-study effects, Egger's test, trim-and-fill
- **Definition:** Effect size vs precision for each study; symmetry suggests no publication bias, a missing corner suggests unpublished nulls.
- **Formula/procedure:** Plot effect on x, SE (inverted) on y; small studies should scatter widely and symmetrically.
- **Prerequisites:** W9.27, W10.21
- **Misconception:** Reading asymmetry as proof of publication bias (heterogeneity and chance can cause it too).
- **Real-world example:** Funnel plots exposing bias in antidepressant literature.
- **Difficulty tier:** Research
- **Game name:** Missing Corner
- **Goal:** Spot the asymmetric funnel and estimate the true effect after filling in the missing studies.
- **Interaction:** Tap the suspicious plot among 3; drag mirror-studies in; slider.
- **Data generation:** Simulated literatures with/without a publication filter.
- **Scoring:** 50 detection, 50 closeness.
- **Reveal:** Trim-and-fill result.
- **Why it works:** Filling the corner by hand is the trim-and-fill intuition.
- **Engine type:** DETECTIVE

### W10.25 Fixed vs random effects (meta-analysis)
- **Name:** Fixed vs random effects
- **Synonyms/notation:** common-effect model, random-effects model, DerSimonian–Laird, REML
- **Definition:** Fixed assumes all studies estimate one true effect; random lets each study have its own true effect drawn from a distribution.
- **Formula/procedure:** Random-effects weights wᵢ* = 1/(SEᵢ² + τ²), which flattens weights across studies.
- **Prerequisites:** W10.23
- **Misconception:** Thinking random effects is always "safer" (it gives small, biased studies more weight).
- **Real-world example:** Choosing a model for trials across many countries.
- **Difficulty tier:** Research
- **Game name:** Weight Shift
- **Goal:** Predict how weights change when switching from fixed to random effects.
- **Interaction:** Slider per study for the new weight; reveal.
- **Data generation:** Random meta-analysis.
- **Scoring:** Correlation of predicted vs actual weights.
- **Reveal:** Both weight columns; pooled estimates.
- **Why it works:** Seeing small studies gain weight explains the trade-off.
- **Engine type:** ESTIMATE

### W10.26 Mixed-effects / hierarchical models
- **Name:** Mixed-effects model
- **Synonyms/notation:** multilevel model, hierarchical model, random intercepts/slopes, fixed vs random effects, partial pooling, shrinkage
- **Definition:** A regression for grouped data (students in schools, repeated measures in people) that lets groups have their own intercepts or slopes, pulled toward the average.
- **Formula/procedure:** yᵢⱼ = β₀ + u_j + β₁xᵢⱼ + εᵢⱼ with u_j ~ N(0, τ²); estimates by REML/ML; compare no-pooling, complete-pooling, partial-pooling.
- **Prerequisites:** W8.21, W8.18, W6.03
- **Misconception:** Ignoring the grouping (pseudoreplication) or fitting a separate model per group (noisy).
- **Real-world example:** Test scores of pupils nested in classes nested in schools.
- **Difficulty tier:** Research
- **Game name:** Pull Toward the Middle
- **Goal:** Set the shrinkage of small groups' estimates toward the grand mean to minimise error.
- **Interaction:** Shrinkage slider; group estimates move; reveal truth.
- **Data generation:** Groups of varying sizes with random true means.
- **Scoring:** 100 × MSE_best/MSE_yours.
- **Reveal:** No-pooling, partial-pooling, complete-pooling estimates side by side.
- **Why it works:** Partial pooling is felt as a dial between two extremes.
- **Engine type:** NEW: TUNE

### W10.27 Intraclass correlation
- **Name:** Intraclass correlation
- **Synonyms/notation:** ICC, ρ, variance partition coefficient, design effect
- **Definition:** The share of total variance that lies between groups; high ICC means members of a group resemble each other.
- **Formula/procedure:** ICC = τ²/(τ² + σ²); design effect = 1 + (m − 1)ICC.
- **Prerequisites:** W10.26, W6.03
- **Misconception:** Treating a low ICC (0.05) as negligible (with 50 per cluster it still inflates variance 3.5×).
- **Real-world example:** Patients within hospitals in a cluster-randomised trial.
- **Difficulty tier:** Research
- **Game name:** Family Resemblance
- **Goal:** Estimate the ICC from grouped dot plots and compute the effective sample size.
- **Interaction:** Slider for ICC; slider for effective n.
- **Data generation:** Random τ², σ², cluster size.
- **Scoring:** Closeness on both.
- **Reveal:** Variance components; design effect.
- **Why it works:** Connects a visual to a planning number.
- **Engine type:** ESTIMATE

### W10.28 Counterfactuals and potential outcomes
- **Name:** Potential outcomes
- **Synonyms/notation:** Rubin causal model, Y(1), Y(0), individual treatment effect, average treatment effect (ATE), fundamental problem of causal inference, SUTVA
- **Definition:** Each person has an outcome under treatment and one under no treatment; the causal effect is the difference, but you only ever see one.
- **Formula/procedure:** τᵢ = Yᵢ(1) − Yᵢ(0); ATE = E[Y(1) − Y(0)]; randomisation makes E[Y(0) | treated] = E[Y(0) | control].
- **Prerequisites:** W9.03, W9.06
- **Misconception:** Thinking the observed difference between groups equals the ATE without randomisation or adjustment.
- **Real-world example:** "Would this patient have recovered without the drug?"
- **Difficulty tier:** Advanced
- **Game name:** Both Worlds
- **Goal:** Fill in the missing potential outcomes in a table using different assumptions and compute the ATE.
- **Interaction:** Table with Y(1), Y(0) columns half-missing; toggle assumption (randomised / selection on prognosis); type ATE.
- **Data generation:** Random full table hidden; reveal.
- **Scoring:** Closeness under the correct assumption.
- **Reveal:** The full table; the naive difference vs ATE.
- **Why it works:** Seeing the whole table once makes the "missing half" concept concrete forever.
- **Engine type:** BUILD

### W10.29 Directed acyclic graphs (DAGs)
- **Name:** Causal diagram
- **Synonyms/notation:** DAG, causal graph, nodes/edges, path, d-separation, chain/fork/collider
- **Definition:** A diagram of arrows showing which variables cause which, used to decide what to adjust for.
- **Formula/procedure:** Draw nodes and arrows (no cycles); identify paths from exposure to outcome; forks (confounders) open paths, colliders close them; adjust to block non-causal paths.
- **Prerequisites:** W1.12, W8.23
- **Misconception:** Adjusting for everything correlated with the outcome.
- **Real-world example:** Deciding whether to adjust for BMI when studying exercise and heart disease.
- **Difficulty tier:** Research
- **Game name:** Draw the Arrows
- **Goal:** Build a DAG from a scenario and identify the confounders, mediators and colliders.
- **Interaction:** Drag nodes; draw arrows; tag nodes by role.
- **Data generation:** Random scenario with a known DAG.
- **Scoring:** 60 structure, 40 role tags.
- **Reveal:** The correct DAG with paths highlighted.
- **Why it works:** Drawing arrows is how causal thinking is done in practice.
- **Engine type:** NEW: DIAGRAM

### W10.30 Colliders and the backdoor criterion
- **Name:** Backdoor criterion
- **Synonyms/notation:** backdoor path, collider bias, M-bias, adjustment set, minimal sufficient set
- **Definition:** To estimate a causal effect, block every path from exposure to outcome that enters the exposure through an arrow pointing in, and never condition on a collider.
- **Formula/procedure:** List backdoor paths; choose a set of variables that blocks them without opening collider paths; adjust for that set.
- **Prerequisites:** W10.29, W9.33
- **Misconception:** Conditioning on a post-treatment variable to "clean up" the comparison.
- **Real-world example:** Adjusting for hospitalisation when studying a disease's cause creates collider bias.
- **Difficulty tier:** Research
- **Game name:** Block the Backdoors
- **Goal:** Select the minimal adjustment set on a given DAG.
- **Interaction:** Tap nodes to adjust; paths animate open/closed; submit.
- **Data generation:** Random DAGs of 5–8 nodes.
- **Scoring:** 100 for a valid minimal set; 60 valid non-minimal; 0 if a collider is conditioned.
- **Reveal:** Simulated estimate bias with the chosen set vs truth.
- **Why it works:** Paths opening/closing animates d-separation.
- **Engine type:** NEW: DIAGRAM

### W10.31 Instrumental variables
- **Name:** Instrumental variable
- **Synonyms/notation:** IV, instrument, two-stage least squares (2SLS), exclusion restriction, relevance, LATE, weak instrument
- **Definition:** A variable that nudges the treatment but affects the outcome only through it, letting you estimate a causal effect despite unmeasured confounding.
- **Formula/procedure:** β_IV = Cov(Z, Y)/Cov(Z, X); 2SLS: regress X on Z, then Y on fitted X. Needs relevance and exclusion.
- **Prerequisites:** W10.29, W8.21
- **Misconception:** Accepting any correlated variable as an instrument without defending the exclusion restriction.
- **Real-world example:** Distance to college as an instrument for education's effect on wages; Mendelian randomisation.
- **Difficulty tier:** Research
- **Game name:** Nudge Not Cause
- **Goal:** Pick a valid instrument from candidates on a DAG and compute the Wald IV estimate.
- **Interaction:** Tap candidate; the DAG shows violated arrows if invalid; slider for estimate.
- **Data generation:** Random DAG with one valid instrument.
- **Scoring:** 50 choice, 50 estimate.
- **Reveal:** Naive OLS vs IV estimate vs truth.
- **Why it works:** The DAG check enforces the two conditions.
- **Engine type:** NEW: DIAGRAM

### W10.32 Difference-in-differences
- **Name:** Difference-in-differences
- **Synonyms/notation:** DiD, diff-in-diff, parallel-trends assumption, event study, two-way fixed effects
- **Definition:** Compare the change over time in a treated group with the change in an untreated group; the extra change is the effect.
- **Formula/procedure:** DiD = (Y_treated,after − Y_treated,before) − (Y_control,after − Y_control,before); requires parallel pre-trends.
- **Prerequisites:** W9.03, W9.36
- **Misconception:** Using DiD when pre-trends already diverge.
- **Real-world example:** Minimum-wage effects comparing New Jersey and Pennsylvania (Card & Krueger).
- **Difficulty tier:** Research
- **Game name:** Two Lines
- **Goal:** Compute DiD from four points and judge whether parallel trends are plausible from the pre-period.
- **Interaction:** Drag the counterfactual line; slider for the effect; tick parallel trends yes/no.
- **Data generation:** Random pre-trend divergence (sometimes violating).
- **Scoring:** 60 effect, 40 judgement.
- **Reveal:** Event-study plot.
- **Why it works:** Drawing the counterfactual line is the identification assumption made visible.
- **Engine type:** NEW: TIMELINE

### W10.33 Propensity scores
- **Name:** Propensity score
- **Synonyms/notation:** PS, matching, weighting (IPTW), stratification, balance diagnostics (standardised mean differences), common support
- **Definition:** The probability of receiving treatment given covariates; matching or weighting on it creates comparable groups from observational data.
- **Formula/procedure:** Fit logistic model for treatment; match or weight by 1/PS; check covariate balance; estimate effect. Only handles *measured* confounders.
- **Prerequisites:** W8.28, W10.28
- **Misconception:** Believing PS methods fix unmeasured confounding.
- **Real-world example:** Comparing outcomes of surgery vs medication from registry data.
- **Difficulty tier:** Research
- **Game name:** Make Them Match
- **Goal:** Match treated to control units by propensity score to balance covariates, then estimate the effect.
- **Interaction:** Drag treated dots to nearest-PS controls; balance bars update; submit estimate.
- **Data generation:** Random confounding structure.
- **Scoring:** 50 balance achieved (SMD < 0.1), 50 estimate closeness.
- **Reveal:** Love plot of balance before/after; a hidden-confounder round where matching fails.
- **Why it works:** Balance bars show the goal; the hidden-confounder round shows the limit.
- **Engine type:** BUILD

### W10.34 Regression discontinuity
- **Name:** Regression discontinuity
- **Synonyms/notation:** RDD, running variable, cut-off, bandwidth, local linear regression, fuzzy RD
- **Definition:** When treatment is assigned by a threshold on a score, compare people just above and just below the cut-off.
- **Formula/procedure:** Fit separate lines each side of the cut-off within a bandwidth; effect = jump at the threshold.
- **Prerequisites:** W9.36, W8.09
- **Misconception:** Fitting one global polynomial, or ignoring manipulation of the running variable.
- **Real-world example:** Scholarship awarded at a test score ≥ 80.
- **Difficulty tier:** Research
- **Game name:** Jump at the Line
- **Goal:** Fit lines either side of a cut-off and estimate the jump; choose a bandwidth.
- **Interaction:** Bandwidth slider; two line handles; slider for jump.
- **Data generation:** Random true jump and curvature.
- **Scoring:** Closeness (tolerance 25%).
- **Reveal:** Local vs global fits; density test at the threshold.
- **Why it works:** Seeing curvature mislead a global fit motivates local estimation.
- **Engine type:** ESTIMATE

### W10.35 Missing data mechanisms
- **Name:** Missing data mechanisms
- **Synonyms/notation:** MCAR (missing completely at random), MAR (missing at random), MNAR (missing not at random), listwise deletion, complete-case analysis
- **Definition:** Why data are missing determines whether ignoring them biases results: MCAR is harmless, MAR is fixable with the right model, MNAR is the hard case.
- **Formula/procedure:** MCAR: missingness independent of everything; MAR: depends only on observed variables; MNAR: depends on the missing value itself.
- **Prerequisites:** W6.09
- **Misconception:** Thinking "missing at random" means "completely at random".
- **Real-world example:** Income non-response that depends on income itself (MNAR).
- **Difficulty tier:** Advanced
- **Game name:** Why Is It Missing?
- **Goal:** Classify missingness scenarios and predict whether complete-case analysis is biased.
- **Interaction:** Scenario cards; three stamps; prediction toggle; simulate.
- **Data generation:** Random mechanisms.
- **Scoring:** 50 classification, 50 bias prediction.
- **Reveal:** Complete-case estimate vs truth under each mechanism.
- **Why it works:** Seeing when deletion is fine and when it isn't.
- **Engine type:** PICK

### W10.36 Imputation
- **Name:** Imputation
- **Synonyms/notation:** mean imputation, regression imputation, multiple imputation (MI), Rubin's rules, chained equations (MICE), full-information ML
- **Definition:** Filling in missing values; multiple imputation fills them several times with plausible draws so uncertainty is honest.
- **Formula/procedure:** Mean imputation shrinks variance (bad); MI: create m datasets, analyse each, pool with Rubin's rules.
- **Prerequisites:** W10.35, W6.19
- **Misconception:** Mean imputation "because it's simple" (it destroys variance and correlations).
- **Real-world example:** Survey data with scattered item non-response.
- **Difficulty tier:** Research
- **Game name:** Fill the Gaps
- **Goal:** Compare mean imputation vs multiple imputation on a correlation and predict which recovers the truth.
- **Interaction:** Choose method; run; slider for recovered r.
- **Data generation:** Bivariate data with MAR missingness.
- **Scoring:** Closeness + method choice.
- **Reveal:** Scatter plots under each method; variance shrinkage.
- **Why it works:** Watching mean imputation flatten the scatter is decisive.
- **Engine type:** SAMPLER

### W10.37 Principal component analysis
- **Name:** PCA
- **Synonyms/notation:** principal components, loadings, scores, eigenvalues, scree plot, variance explained, dimensionality reduction
- **Definition:** Rotating the data to new axes that capture as much variance as possible, so many variables can be summarised by a few.
- **Formula/procedure:** Standardise; compute covariance matrix; eigen-decompose; keep components by scree/variance explained.
- **Prerequisites:** W8.02, W3.03
- **Misconception:** Interpreting components as causal "factors" or skipping standardisation when scales differ.
- **Real-world example:** Compressing 50 survey items into 3 indices; image compression.
- **Difficulty tier:** Research
- **Game name:** Find the Axis
- **Goal:** Rotate an axis through a 2D cloud to maximise the variance along it.
- **Interaction:** Rotate handle; variance along axis hidden; submit; round 2: 3 variables, pick how many components to keep from a scree plot.
- **Data generation:** Random correlated cloud.
- **Scoring:** Closeness of angle to PC1 (tolerance 10°); round 2 correct count.
- **Reveal:** PC1 and PC2 drawn; variance explained.
- **Why it works:** Rotation makes "maximum variance direction" physical.
- **Engine type:** BUILD

### W10.38 Factor analysis
- **Name:** Factor analysis
- **Synonyms/notation:** exploratory FA (EFA), confirmatory FA (CFA), latent factor, loadings, rotation (varimax/oblimin), communality
- **Definition:** Modelling many observed variables as driven by a few hidden factors plus noise.
- **Formula/procedure:** x = Λf + ε; choose number of factors; rotate for interpretability; CFA tests a hypothesised structure.
- **Prerequisites:** W10.37, W9.19
- **Misconception:** Treating PCA and FA as the same (PCA summarises variance; FA models latent causes).
- **Real-world example:** The Big Five personality factors.
- **Difficulty tier:** Research
- **Game name:** Hidden Factors
- **Goal:** From a loading matrix, name the factors and assign items.
- **Interaction:** Drag items to factors by loadings; type a label.
- **Data generation:** Random 2–3 factor structure with items.
- **Scoring:** 100 × correct assignments.
- **Reveal:** Rotated loadings; a cross-loading item flagged.
- **Why it works:** Reading loadings is the core applied skill.
- **Engine type:** MATCH

### W10.39 k-means clustering
- **Name:** k-means clustering
- **Synonyms/notation:** centroid, cluster assignment, within-cluster sum of squares, elbow method, k
- **Definition:** Splitting points into k groups by repeatedly assigning each point to the nearest centre and moving centres to their group's mean.
- **Formula/procedure:** Initialise k centres; assign; update; repeat to convergence; choose k by elbow/silhouette.
- **Prerequisites:** W2.01, W3.21
- **Misconception:** Thinking k-means finds "true" clusters (it imposes k spherical clusters whatever the shape).
- **Real-world example:** Customer segmentation.
- **Difficulty tier:** Advanced
- **Game name:** Centre Chaser
- **Goal:** Run k-means by hand for 3 iterations and choose k from an elbow plot.
- **Interaction:** Drag centres; press "Assign"; press "Update"; repeat; elbow plot for k.
- **Data generation:** Mixture of k blobs, sometimes non-spherical.
- **Scoring:** 60 convergence to the right partition, 40 k choice.
- **Reveal:** Final clusters; a crescent-shaped case where k-means fails.
- **Why it works:** Manual iterations make the algorithm transparent.
- **Engine type:** BUILD

### W10.40 Hierarchical clustering
- **Name:** Hierarchical clustering
- **Synonyms/notation:** agglomerative, dendrogram, linkage (single/complete/average/Ward), cut height, distance matrix
- **Definition:** Building a tree by repeatedly merging the two closest groups; cutting the tree at a height gives clusters.
- **Formula/procedure:** Compute distances; merge nearest pair; update distances by linkage rule; repeat.
- **Prerequisites:** W10.39
- **Misconception:** Reading horizontal order in a dendrogram as meaningful.
- **Real-world example:** Grouping genes by expression profiles.
- **Difficulty tier:** Advanced
- **Game name:** Merge Tree
- **Goal:** Merge points step by step into a dendrogram and cut it to get the requested number of clusters.
- **Interaction:** Tap the two closest clusters each round; drag the cut line.
- **Data generation:** 8–10 points.
- **Scoring:** 70 merges, 30 cut.
- **Reveal:** Correct dendrogram; linkage comparison.
- **Why it works:** Merging by hand shows what the tree encodes.
- **Engine type:** BUILD

### W10.41 A/B testing in industry
- **Name:** A/B test
- **Synonyms/notation:** online experiment, split test, control/variant, conversion rate, lift, minimum detectable effect, guardrail metrics, novelty effect
- **Definition:** A randomised experiment on users or customers, usually comparing conversion rates, run continuously on live products.
- **Formula/procedure:** Define metric and MDE; compute n; randomise by user; run the planned duration; two-proportion z-test or CI on lift; check guardrails.
- **Prerequisites:** W7.15, W9.23, W9.02
- **Misconception:** Stopping when p dips below 0.05 (peeking) and ignoring sample-ratio mismatch.
- **Real-world example:** Testing a new checkout button on 2% of traffic.
- **Difficulty tier:** Advanced
- **Game name:** Ship or Skip
- **Goal:** Run an A/B test to completion, resist early stopping, and decide to ship.
- **Interaction:** Daily results stream; "Stop" button tempts; at the planned end, bet ship/skip.
- **Data generation:** Random true lift (often 0); daily noise.
- **Scoring:** Calibrated bet at planned end; −30 for stopping early.
- **Reveal:** Full-duration result vs the early-stop snapshot; sample-ratio check.
- **Why it works:** The tempting Stop button trains discipline.
- **Engine type:** SIGNIFICANCE BET

### W10.42 Sequential testing and peeking
- **Name:** Sequential analysis
- **Synonyms/notation:** optional stopping, peeking, alpha spending, group-sequential design, O'Brien–Fleming boundaries, always-valid p-values, mSPRT
- **Definition:** Looking at results repeatedly inflates false positives unless the thresholds are designed for repeated looks.
- **Formula/procedure:** Pre-plan the number of looks; use spending functions or sequential tests that keep overall α at 0.05.
- **Prerequisites:** W10.41, W7.34
- **Misconception:** Thinking one extra look is harmless (checking daily for a month gives ~25–30% false positives).
- **Real-world example:** Clinical trial data-monitoring committees; A/B platforms with always-valid inference.
- **Difficulty tier:** Research
- **Game name:** Don't Peek
- **Goal:** Predict the false-positive rate when checking p every day for 30 days, then see a sequential boundary fix it.
- **Interaction:** Slider; run 1,000 null tests with daily peeking; toggle sequential boundaries; rerun.
- **Data generation:** Null A/B tests.
- **Scoring:** Closeness (tolerance 0.07).
- **Reveal:** p-value trajectories crossing 0.05 at least once; boundary plot.
- **Why it works:** The crossing trajectories are the whole argument.
- **Engine type:** SAMPLER

### W10.43 Multi-armed bandits
- **Name:** Multi-armed bandit
- **Synonyms/notation:** explore–exploit, Thompson sampling, epsilon-greedy, UCB, regret
- **Definition:** Adaptive experiments that shift traffic toward better options as evidence accumulates, trading some certainty for less regret.
- **Formula/procedure:** Thompson sampling: keep a Beta posterior per arm; each round, sample from each and pull the best; update.
- **Prerequisites:** W10.07, W10.41
- **Misconception:** Using bandits when the goal is a clean estimate rather than maximising reward.
- **Real-world example:** News headline selection; adaptive clinical trials.
- **Difficulty tier:** Research
- **Game name:** Slot Explorer
- **Goal:** Pull arms to maximise total reward over 100 pulls, then compare with Thompson sampling.
- **Interaction:** Tap arms; posteriors shown as Beta curves; auto-play Thompson for comparison.
- **Data generation:** 3–4 arms with random p.
- **Scoring:** 100 × your reward / Thompson's reward.
- **Reveal:** Regret curves.
- **Why it works:** Competing against the algorithm shows explore–exploit viscerally.
- **Engine type:** PROBABILITY PREDICT-THEN-SIMULATE

### W10.44 Generalised linear models
- **Name:** Generalised linear model
- **Synonyms/notation:** GLM, link function, Poisson regression, negative binomial regression, overdispersion, offset, exponential family
- **Definition:** A family of regressions for different outcome types (counts, binary, positive) that link a linear predictor to the outcome's mean through a function.
- **Formula/procedure:** g(E[y]) = Xβ; logistic uses logit, Poisson uses log; check overdispersion (variance > mean) and switch to negative binomial.
- **Prerequisites:** W8.28, W5.11
- **Misconception:** Running OLS on counts with many zeros.
- **Real-world example:** Number of hospital visits per patient per year.
- **Difficulty tier:** Research
- **Game name:** Pick the Link
- **Goal:** Match outcome types to GLM families and links, then diagnose overdispersion.
- **Interaction:** Drag outcome cards to families; for a count dataset, judge overdispersion from mean vs variance.
- **Data generation:** Random outcomes and count datasets.
- **Scoring:** 60 matching, 40 diagnosis.
- **Reveal:** Fits under wrong vs right family.
- **Why it works:** Family-picking is the central GLM decision.
- **Engine type:** MATCH

### W10.45 Kernel density estimation
- **Name:** Kernel density estimate
- **Synonyms/notation:** KDE, density plot, bandwidth, kernel, violin plot
- **Definition:** A smooth version of a histogram made by placing a little bump on each data point and adding them up.
- **Formula/procedure:** f̂(x) = (1/nh)ΣK((x − xᵢ)/h); bandwidth h controls smoothness (Silverman's rule as default).
- **Prerequisites:** W3.17
- **Misconception:** Treating the density curve as truth when the bandwidth was chosen to look nice.
- **Real-world example:** Violin plots in data-science dashboards.
- **Difficulty tier:** Advanced
- **Game name:** Bump Stacker
- **Goal:** Stack bumps on points, then tune bandwidth to reveal the true shape.
- **Interaction:** Press "Add bump" per point; bandwidth slider; submit.
- **Data generation:** Random mixture.
- **Scoring:** Closeness of bandwidth to the optimum (factor 1.5).
- **Reveal:** True density; under/over-smoothed versions.
- **Why it works:** Building the KDE from bumps demystifies it; the slider repeats the histogram lesson.
- **Engine type:** BUILD

### W10.46 Bayesian vs frequentist interpretation
- **Name:** Bayesian vs frequentist
- **Synonyms/notation:** probability as long-run frequency vs degree of belief, objective vs subjective probability
- **Definition:** Frequentists treat parameters as fixed and probabilities as long-run frequencies; Bayesians treat probability as belief and parameters as uncertain.
- **Formula/procedure:** Frequentist: p-values, CIs, long-run error control; Bayesian: priors, posteriors, credible intervals. Both are valid tools; choose by question.
- **Prerequisites:** W10.05, W6.18
- **Misconception:** Treating the choice as a religious war rather than a modelling decision.
- **Real-world example:** Drug regulators (frequentist error control) vs adaptive trials (Bayesian updating).
- **Difficulty tier:** Advanced
- **Game name:** Two Lenses
- **Goal:** Sort statements into the framework that can legitimately make them.
- **Interaction:** Drag statement cards to Frequentist / Bayesian / Both / Neither.
- **Data generation:** Random statement pool.
- **Scoring:** 100 × correct.
- **Reveal:** One-line reason per card.
- **Why it works:** Statement sorting is where the philosophical difference becomes practical.
- **Engine type:** MATCH

---

## World 11 — Reporting Reef (Intermediate → Advanced)

Theme: the final reef where results are written up and read; every chart and table can hide a trap.

### W11.01 Anatomy of a results section
- **Name:** Reading a results section
- **Synonyms/notation:** results, findings, Table 1 (baseline characteristics), primary outcome, secondary outcomes, supplementary materials
- **Definition:** The part of a paper reporting what was found; read it by locating the primary outcome, its effect size and CI, and only then the p-value.
- **Formula/procedure:** 1) Find the pre-specified primary outcome. 2) Find n analysed vs n enrolled. 3) Effect + CI. 4) p. 5) Secondary outcomes with multiplicity in mind. 6) Figures vs text consistency.
- **Prerequisites:** W7.38, W7.33, W9.30
- **Misconception:** Reading the abstract's p-values as the paper.
- **Real-world example:** A trial whose abstract trumpets a secondary outcome because the primary failed.
- **Difficulty tier:** Intermediate
- **Game name:** Find the Primary
- **Goal:** In a mock results section, locate the primary outcome, its effect, CI and the dropout count, in order.
- **Interaction:** Tap phrases in a scrollable results page in the requested order.
- **Data generation:** Templated results sections with random numbers and random outcome-switching.
- **Scoring:** 20 per correct tap; −10 for tapping a secondary outcome as primary.
- **Reveal:** Annotated page; a note if the primary was switched versus the registration.
- **Why it works:** Reading in a fixed order is the protective habit.
- **Engine type:** DETECTIVE

### W11.02 APA-style reporting of t-tests and ANOVA
- **Name:** Reporting t and F
- **Synonyms/notation:** "t(df) = x.xx, p = .xxx, d = x.xx, 95% CI [a, b]"; "F(df1, df2) = x.xx, p = .xxx, η² = .xx"
- **Definition:** The standard sentence format for reporting a test, always including the statistic, degrees of freedom, exact p and an effect size with a CI.
- **Formula/procedure:** Report means and SDs per group, then the test line; p to three decimals, p < .001 for tiny values; no leading zero for p and r in APA.
- **Prerequisites:** W7.16–W7.24, W7.10
- **Misconception:** Reporting p alone, or "p = .000".
- **Real-world example:** "Participants in the sleep condition (M = 7.2, SD = 1.1) recalled more words than controls (M = 6.1, SD = 1.3), t(58) = 3.54, p < .001, d = 0.92, 95% CI [0.38, 1.46]."
- **Difficulty tier:** Intermediate
- **Game name:** Fill the Sentence
- **Goal:** Complete a report sentence from a software output table.
- **Interaction:** Drag numbers from the output into blanks; format choices (decimal places) checked.
- **Data generation:** Random simulated test output.
- **Scoring:** 100 × correct blanks; −10 for formatting errors.
- **Reveal:** The finished sentence.
- **Why it works:** Transcribing from output to prose is the literal task researchers do.
- **Engine type:** BUILD

### W11.03 Reporting chi-square, correlation and non-parametric tests
- **Name:** Reporting χ², r and rank tests
- **Synonyms/notation:** "χ²(df, N = n) = x.xx, p = .xxx, V = .xx"; "r(df) = .xx, p = .xxx"; "U = xxx, p = .xxx, r = .xx"
- **Definition:** Standard formats for categorical, correlational and rank-based tests, each with its own effect size.
- **Formula/procedure:** χ² needs N and df; r reports df = n − 2; Mann–Whitney reports U (or z) and an effect size r = z/√N.
- **Prerequisites:** W7.21, W7.22, W8.03, W7.28
- **Misconception:** Omitting N for χ² or reporting r without n.
- **Real-world example:** "Gender and preference were associated, χ²(1, N = 200) = 6.4, p = .011, V = .18."
- **Difficulty tier:** Intermediate
- **Game name:** Fill the Sentence II
- **Goal:** As W11.02 for these test families.
- **Interaction:** Drag-to-blank.
- **Data generation:** Random outputs.
- **Scoring:** As W11.02.
- **Reveal:** Finished sentences.
- **Why it works:** Same drill, different families.
- **Engine type:** BUILD

### W11.04 Reading and reporting a regression table
- **Name:** Regression table
- **Synonyms/notation:** coefficient table, B/β (unstandardised/standardised), SE, t, p, 95% CI, R², F, n, reference category, stars
- **Definition:** The table listing each predictor's coefficient, its uncertainty and significance, plus overall model fit.
- **Formula/procedure:** Read B with units; check SE and CI; note reference categories for dummies; find R²/adj R² and n; look for interaction rows.
- **Prerequisites:** W8.21, W8.26, W8.29
- **Misconception:** Comparing unstandardised coefficients across predictors with different units to judge "importance".
- **Real-world example:** Economics papers with 6 model columns.
- **Difficulty tier:** Advanced
- **Game name:** Table Reader
- **Goal:** Answer questions from a regression table (which predictor's CI excludes 0, what the dummy means, predicted y for a case).
- **Interaction:** Tap cells; type a predicted value.
- **Data generation:** Random fitted models.
- **Scoring:** 20 per question.
- **Reveal:** Annotated table.
- **Why it works:** Table literacy is reading skill number one for applied work.
- **Engine type:** DETECTIVE

### W11.05 Reading p-value tables and significance stars
- **Name:** p-value tables
- **Synonyms/notation:** asterisks (* p < .05, ** p < .01, *** p < .001), "n.s.", dichotomisation
- **Definition:** Tables that mark significance with stars; useful for scanning, dangerous for thinking.
- **Formula/procedure:** Read stars as a coarse index; go back to effect sizes and CIs; count the tests to think about multiplicity.
- **Prerequisites:** W7.05, W7.34
- **Misconception:** Treating three stars as "big effect" and no star as "no effect".
- **Real-world example:** A 40-cell correlation matrix with stars where ~2 are expected by chance.
- **Difficulty tier:** Intermediate
- **Game name:** Star Gazer
- **Goal:** From a starred correlation matrix, pick the correlations that are both significant and non-trivial in size, and estimate how many stars chance alone would produce.
- **Interaction:** Tap cells; slider.
- **Data generation:** Random matrix with mostly null correlations.
- **Scoring:** 60 picks, 40 chance estimate.
- **Reveal:** True non-null cells; expected false stars.
- **Why it works:** Separates stars from size and multiplicity.
- **Engine type:** DETECTIVE

### W11.06 Reading confidence-interval tables and plots
- **Name:** CI tables
- **Synonyms/notation:** "95% CI [a, b]", interval plot, coefficient plot, caterpillar plot, dot-and-whisker
- **Definition:** Reporting that shows the estimate with a range; readers can judge both significance and plausible size at once.
- **Formula/procedure:** Does the CI exclude the null? How wide is it? Is the lower bound still meaningful? Is the upper bound alarming?
- **Prerequisites:** W7.38, W7.33
- **Misconception:** Reading only the point estimate.
- **Real-world example:** A drug with RR 0.9 (CI 0.5–1.6): compatible with benefit and harm.
- **Difficulty tier:** Intermediate
- **Game name:** Interval Interpreter
- **Goal:** Classify each CI as "clearly beneficial", "clearly harmful", "inconclusive, could matter", "precisely null".
- **Interaction:** Drag CIs into four bins given a minimal important difference.
- **Data generation:** Random CIs.
- **Scoring:** 100 × correct.
- **Reveal:** The MID lines and each CI's status.
- **Why it works:** Four-way classification is richer than significant/not.
- **Engine type:** PICK

### W11.07 Forest-plot reading for consumers
- **Name:** Forest plots in reports
- **Synonyms/notation:** subgroup forest plot, interaction p for subgroups, "favours treatment / favours control"
- **Definition:** Forest plots also appear within single trials to show subgroup effects; reading them needs awareness that subgroup differences are usually noise.
- **Formula/procedure:** Check the overall diamond first; treat subgroup CIs as exploratory; look for a test of interaction, not per-subgroup p-values.
- **Prerequisites:** W10.22, W7.34
- **Misconception:** "The drug works in women but not men" because one CI crosses 1 and the other doesn't.
- **Real-world example:** ISIS-2 showed aspirin "didn't work" for Gemini and Libra patients.
- **Difficulty tier:** Advanced
- **Game name:** Subgroup Sceptic
- **Goal:** Identify which subgroup claims are supported by an interaction test and which are noise.
- **Interaction:** Tap subgroup rows; declare supported/not.
- **Data generation:** Random subgroup forest plots with a true interaction in 30% of rounds.
- **Scoring:** 100 × correct declarations.
- **Reveal:** Interaction p-values; simulation of star-sign subgroups.
- **Why it works:** The star-sign example immunises against subgroup over-reading.
- **Engine type:** DETECTIVE

### W11.08 Effect-size interpretation and benchmarks
- **Name:** Interpreting effect sizes
- **Synonyms/notation:** Cohen's benchmarks, common-language effect size, probability of superiority, number needed to treat, binomial effect-size display, U3
- **Definition:** Translating a number like d = 0.4 into something a human can picture, such as "the average treated person beats 66% of controls".
- **Formula/procedure:** U3 = Φ(d); probability of superiority = Φ(d/√2); for r, use the binomial effect-size display; always ask "compared with what?"
- **Prerequisites:** W7.10, W7.11, W7.13
- **Misconception:** Applying Cohen's "small/medium/large" without field context (d = 0.2 can be enormous for mortality).
- **Real-world example:** Aspirin's effect on heart attack had r ≈ 0.03 and saved thousands of lives.
- **Difficulty tier:** Intermediate
- **Game name:** Picture the Effect
- **Goal:** Convert an effect size into an icon-array picture and a plain-English sentence.
- **Interaction:** Slider for "% of treated above control median"; build sentence from tiles.
- **Data generation:** Random d or r.
- **Scoring:** 50 closeness (tolerance 7 points), 50 sentence.
- **Reveal:** Overlapping curves with U3 shaded; the aspirin example.
- **Why it works:** Converting to people-pictures is what communicators do.
- **Engine type:** ESTIMATE

### W11.09 Truncated axes
- **Name:** Truncated y-axis
- **Synonyms/notation:** non-zero baseline, axis manipulation, exaggerated differences
- **Definition:** Starting a bar chart's y-axis above zero so small differences look huge.
- **Formula/procedure:** Bars must start at zero; lines may use a non-zero baseline if clearly labelled; compute the real percentage difference.
- **Prerequisites:** W3.19
- **Misconception:** Thinking any non-zero axis is dishonest (for lines showing change it can be appropriate).
- **Real-world example:** A "tax rate soars" chart showing 35% vs 39.6% as a tripling.
- **Difficulty tier:** Beginner
- **Game name:** Reset the Axis
- **Goal:** Guess the true percentage difference from a truncated bar chart, then drag the axis to zero.
- **Interaction:** Slider; drag axis base; compare.
- **Data generation:** Random values and truncation.
- **Scoring:** Closeness (tolerance 25% relative).
- **Reveal:** Honest chart side by side.
- **Why it works:** The drag reveals the trick physically.
- **Engine type:** DETECTIVE

### W11.10 Cherry-picked ranges
- **Name:** Cherry-picking time ranges
- **Synonyms/notation:** selective window, start-date bias, endpoint selection, "since 1998"
- **Definition:** Choosing the start or end point of a chart to make a trend appear or disappear.
- **Formula/procedure:** Ask why the window was chosen; view the full series; test sensitivity to start date.
- **Prerequisites:** W10.12
- **Misconception:** Accepting any trend line with a plausible-sounding start date.
- **Real-world example:** "No warming since 1998" (an El Niño peak year).
- **Difficulty tier:** Intermediate
- **Game name:** Widen the Window
- **Goal:** Find the window that makes a rising series look flat, then show the full series.
- **Interaction:** Drag window edges; submit when the trend looks flat; reveal full series.
- **Data generation:** Rising series with noise and spikes.
- **Scoring:** 50 for achieving flatness, 50 for correctly describing the full trend.
- **Reveal:** Slope vs start-year plot.
- **Why it works:** Doing the cherry-pick yourself makes it recognisable.
- **Engine type:** DETECTIVE

### W11.11 Dual axes
- **Name:** Dual-axis charts
- **Synonyms/notation:** two y-axes, secondary axis, axis scaling, spurious crossing
- **Definition:** Plotting two series with different y-axes on one chart; the scales can be chosen to make any two series look related.
- **Formula/procedure:** Prefer indexed series (both = 100 at start) or two panels; if dual axes, start both at zero and label clearly.
- **Prerequisites:** W8.06
- **Misconception:** Reading two lines that "track" on a dual-axis chart as correlated.
- **Real-world example:** Charts implying a link between autism diagnoses and organic-food sales.
- **Difficulty tier:** Intermediate
- **Game name:** Make Them Match
- **Goal:** Adjust the secondary axis to make two unrelated series look perfectly aligned, then compute their actual r.
- **Interaction:** Axis scale/offset sliders; r slider.
- **Data generation:** Two independent trending series.
- **Scoring:** 50 for alignment achieved, 50 r closeness.
- **Reveal:** Indexed version of the chart.
- **Why it works:** Perpetrating the trick teaches it.
- **Engine type:** BUILD

### W11.12 Relative vs absolute risk in headlines
- **Name:** Risk communication
- **Synonyms/notation:** relative risk reduction in headlines, mismatched framing, natural frequencies, "doubles your risk"
- **Definition:** Headlines quote relative changes (big-sounding) while the absolute change may be tiny; honest reporting gives both.
- **Formula/procedure:** Rewrite as "x in 1,000 vs y in 1,000"; report ARR and NNT alongside RR.
- **Prerequisites:** W7.13
- **Misconception:** Thinking "doubles your risk" is always alarming.
- **Real-world example:** "Bacon raises bowel-cancer risk by 18%" (from 5.6% to 6.6% lifetime).
- **Difficulty tier:** Beginner
- **Game name:** Honest Headline
- **Goal:** Rewrite a scary headline with absolute numbers and judge whether it's still newsworthy.
- **Interaction:** Icon array; tile sentence builder; newsworthy toggle.
- **Data generation:** Random baseline and RR.
- **Scoring:** 70 sentence, 30 judgement vs panel.
- **Reveal:** Both framings side by side.
- **Why it works:** Translation practice.
- **Engine type:** BUILD

### W11.13 Log scales
- **Name:** Logarithmic axes
- **Synonyms/notation:** log scale, semi-log, log-log, orders of magnitude, exponential growth as a straight line
- **Definition:** An axis where each step multiplies by a constant; useful for exponential growth and wide ranges, confusing if unlabelled.
- **Formula/procedure:** Exponential growth appears linear on a log axis; equal vertical gaps mean equal ratios.
- **Prerequisites:** W5.19
- **Misconception:** Reading a flattening log curve as "growth has stopped" when it means growth is now linear.
- **Real-world example:** Pandemic case-count charts.
- **Difficulty tier:** Intermediate
- **Game name:** Linear or Log
- **Goal:** Read values and growth rates off a log-scale chart and switch between scales.
- **Interaction:** Toggle scale; tap points; type ratios.
- **Data generation:** Random exponential series.
- **Scoring:** 20 per reading.
- **Reveal:** The same data on both scales.
- **Why it works:** Toggling the same data builds the translation.
- **Engine type:** PICK

### W11.14 Error bars: SD, SE or CI?
- **Name:** Error bars
- **Synonyms/notation:** ±SD, ±SEM, 95% CI, whiskers, "error bars represent…"
- **Definition:** The little lines on a bar chart could mean three very different things; a chart without a caption saying which is uninterpretable.
- **Formula/procedure:** SD = spread of data; SE = SD/√n; 95% CI ≈ 2 SE. Same data gives bars of very different lengths.
- **Prerequisites:** W6.11, W6.14
- **Misconception:** Judging significance from whether SE bars overlap.
- **Real-world example:** Biology papers with unlabelled error bars.
- **Difficulty tier:** Intermediate
- **Game name:** What Are the Bars?
- **Goal:** Given the data, draw SD, SE and CI bars; then identify which a mystery chart used.
- **Interaction:** Three sliders; then tap the type.
- **Data generation:** Random data, n.
- **Scoring:** 60 bars (tolerance 20%), 40 identification.
- **Reveal:** All three on one chart.
- **Why it works:** Seeing all three at once on the same data is unforgettable.
- **Engine type:** BUILD

### W11.15 Pie charts, 3D charts and area illusions
- **Name:** Chart junk and visual distortion
- **Synonyms/notation:** 3D pie, exploded pie, area/volume scaling, lie factor, chartjunk, pictograms
- **Definition:** Visual choices that distort perception: 3D perspective, scaling icons by height so area grows quadratically, too many pie slices.
- **Formula/procedure:** Lie factor = (size of effect in graphic)/(size of effect in data); keep it near 1.
- **Prerequisites:** W3.19
- **Misconception:** Thinking 3D makes a chart more informative.
- **Real-world example:** Pictograms where a 2× quantity is drawn as a 2× taller (4× larger) icon.
- **Difficulty tier:** Beginner
- **Game name:** Lie Factor
- **Goal:** Estimate the lie factor of a distorted chart and redraw it honestly.
- **Interaction:** Slider; drag honest bars.
- **Data generation:** Random distortion type.
- **Scoring:** 50 lie factor (tolerance 30%), 50 redraw.
- **Reveal:** Both charts.
- **Why it works:** Quantifying distortion makes it objective.
- **Engine type:** DETECTIVE

### W11.16 Percentages, percentage points and base confusion
- **Name:** Percentage pitfalls
- **Synonyms/notation:** percentage points (pp) vs percent change, base rate confusion, denominator neglect, Simpson-like base shifts
- **Definition:** A change from 10% to 15% is 5 percentage points but a 50% increase; mixing these misleads.
- **Formula/procedure:** % change = (new − old)/old × 100; pp change = new − old; always state the base.
- **Prerequisites:** W1.14
- **Misconception:** "Unemployment rose 2%" when it rose 2 percentage points (from 5% to 7%, a 40% rise).
- **Real-world example:** Election swing reporting.
- **Difficulty tier:** Beginner
- **Game name:** Points or Percent
- **Goal:** Compute both the pp change and the % change and pick the honest phrasing.
- **Interaction:** Two sliders; tile sentence.
- **Data generation:** Random rates.
- **Scoring:** 40 + 40 + 20.
- **Reveal:** Both numbers labelled.
- **Why it works:** Repeated dual computation makes the distinction automatic.
- **Engine type:** BUILD

### W11.17 Reporting checklists
- **Name:** Reporting guidelines
- **Synonyms/notation:** CONSORT (trials), STROBE (observational), PRISMA (systematic reviews), ARRIVE (animal), TRIPOD (prediction models), EQUATOR network
- **Definition:** Checklists that specify what a paper of each type must report so readers can judge it.
- **Formula/procedure:** Pick the checklist for the design; verify flow diagram, outcomes, sample size, missing data, funding and registration are reported.
- **Prerequisites:** W9.14, W9.24
- **Misconception:** Thinking checklists are only for authors; they are reading tools too.
- **Real-world example:** The CONSORT flow diagram showing how 1,200 screened became 400 analysed.
- **Difficulty tier:** Advanced
- **Game name:** Checklist Audit
- **Goal:** Audit a mock paper against the right checklist and find the missing items.
- **Interaction:** Pick checklist; tick items as found; flag missing.
- **Data generation:** Mock paper with random omissions.
- **Scoring:** 100 × (correct flags − wrong)/omissions.
- **Reveal:** Missing items with why they matter.
- **Why it works:** Auditing is active reading.
- **Engine type:** DETECTIVE

### W11.18 Correlation claims in headlines
- **Name:** Headline reading
- **Synonyms/notation:** "linked to", "associated with", "causes", "may", press-release inflation, hype
- **Definition:** News headlines routinely turn associations into causes; reading them means decoding the verb and finding the study design.
- **Formula/procedure:** Spot the verb (linked/associated vs causes/boosts); find n, design, effect size; check whether the press release overclaimed.
- **Prerequisites:** W8.06, W9.01
- **Misconception:** Assuming hype comes from journalists (press releases from universities often overclaim first).
- **Real-world example:** Sumner et al. (2014) found 40% of press releases contained exaggerated advice.
- **Difficulty tier:** Beginner
- **Game name:** Verb Detector
- **Goal:** Rewrite a hyped headline to match the study's actual design and effect.
- **Interaction:** Study summary card; headline tiles (verb, hedge, population, number).
- **Data generation:** Random studies and hyped headlines.
- **Scoring:** 100 × tile correctness.
- **Reveal:** The honest headline and the original side by side.
- **Why it works:** Rewriting beats spotting.
- **Engine type:** DETECTIVE

### W11.19 Precision, rounding and significant figures
- **Name:** Numerical precision in reporting
- **Synonyms/notation:** significant figures, false precision, rounding, "M = 3.2847", decimal places
- **Definition:** Reporting numbers with no more precision than the data justify; 3 significant figures is usually plenty.
- **Formula/procedure:** Match decimals to the measurement's precision; percentages to 1 dp (0 dp for n < 100); p to 2–3 dp; never "p = 0.000".
- **Prerequisites:** W6.11
- **Misconception:** Thinking more decimals means more accuracy.
- **Real-world example:** "The average family has 2.39 children" from a survey of 30 households.
- **Difficulty tier:** Beginner
- **Game name:** Round Right
- **Goal:** Round reported numbers to a defensible precision given n and the measurement.
- **Interaction:** Dial decimals for each number; submit.
- **Data generation:** Random statistics with n and SE.
- **Scoring:** 100 × numbers within the accepted band.
- **Reveal:** SE-based justification per number.
- **Why it works:** Links precision to SE rather than habit.
- **Engine type:** BUILD

### W11.20 Reproducibility: code, data and open science
- **Name:** Reproducible research
- **Synonyms/notation:** computational reproducibility, open data, open code, data availability statement, FAIR data, version control, random seed
- **Definition:** Sharing the data and code so anyone can regenerate every number and figure in the paper.
- **Formula/procedure:** Scripted analysis (no manual steps); fixed seeds; data dictionary; archived repository with DOI; document software versions.
- **Prerequisites:** W9.24, W10.10
- **Misconception:** Equating reproducibility (same data, same result) with replication (new data, same conclusion).
- **Real-world example:** The Reinhart–Rogoff spreadsheet error found only because a student obtained the data.
- **Difficulty tier:** Intermediate
- **Game name:** Rebuild the Figure
- **Goal:** Reproduce a figure from provided data and a described pipeline, and spot the undocumented step.
- **Interaction:** Choose pipeline steps in order; the figure renders; compare with the paper's.
- **Data generation:** Random dataset and pipeline with one undocumented filter.
- **Scoring:** 70 for matching the figure; 30 for identifying the undocumented step.
- **Reveal:** The missing step and its effect.
- **Why it works:** Failing to reproduce until the hidden step is found is the lesson.
- **Engine type:** BUILD

---

## Proposed new engine types

Three engines appear repeatedly above and are not in the original ten:

- **TUNE** — The player turns one or more dials on a live model and watches an output (a curve, a fit, a power gauge, a coefficient), then commits to a setting or a prediction. Differs from ESTIMATE (which guesses a fixed hidden value) and BUILD (which constructs data). Used by: W7.09, W8.21, W8.23, W8.24, W8.25, W8.28, W8.30, W8.31, W8.33, W8.34, W8.41, W9.23, W10.08, W10.15, W10.26.
- **TIMELINE** — The player interacts with a sequence or time axis: advancing periods, drawing trends and forecast fans, labelling event/censoring timelines, placing a counterfactual line. Used by: W9.10, W10.12, W10.13, W10.17, W10.18, W10.32.
- **DIAGRAM** — The player builds a graph of nodes and arrows (DAGs, Markov chains, instrument diagrams) and the engine evaluates paths and structure. Used by: W10.11, W10.29, W10.30, W10.31.

---

## Boss levels

Each boss combines several concepts in a realistic scenario, runs 10–15 minutes, awards 3× XP, and unlocks the next world. Data are regenerated each attempt so the "three problems" differ.

### B1 The Pond Report (end of World 1–2) — Beginner
- **Scenario:** You are the junior analyst for a lake conservation group. A volunteer has written a one-page report on fish counts with six claims.
- **Concepts combined:** W1.02–W1.06, W1.08, W1.09, W2.01, W2.02, W2.10.
- **Mechanic:** DETECTIVE + ESTIMATE. Find the three errors (an averaged nominal code, a sample mean reported as the population mean, the mean quoted for a skewed count where the median is appropriate), then recompute the correct summary from the raw data.
- **Win condition:** All three flagged and the corrected summary within tolerance.

### B2 Quality Control Night Shift (end of World 3) — Beginner/Intermediate
- **Scenario:** A bottling line sends you 200 fill-volume readings every hour for six hours.
- **Concepts combined:** W3.04, W3.11, W3.15, W3.16, W3.17, W3.21.
- **Mechanic:** BUILD + PICK. For each hour: build the box plot, flag outliers by the 1.5 IQR rule, compute z-scores for flagged bottles, and decide whether to stop the line. A hidden bimodality (two nozzles) appears in hour 4.
- **Win condition:** Correct stop/continue decisions in ≥ 5 of 6 hours and detection of the two-nozzle problem.

### B3 The Screening Programme (end of World 4) — Intermediate
- **Scenario:** Advise a health minister whether to roll out a screening test for a rare disease.
- **Concepts combined:** W4.08, W4.10, W4.11, W4.12, W4.14, W4.19.
- **Mechanic:** BUILD (1,000-person grid) + PROBABILITY PREDICT-THEN-SIMULATE. Compute the positive predictive value, expected false positives per 100,000, and the expected cost; then recommend a threshold.
- **Win condition:** PPV within 5 points; recommendation consistent with the cost model.

### B4 Casino Consultant (end of World 4–5) — Intermediate
- **Scenario:** A casino suspects one of four games has been tampered with.
- **Concepts combined:** W4.14, W4.16, W5.04, W5.07, W5.11, W5.22.
- **Mechanic:** SAMPLER + SIGNIFICANCE BET. Watch results stream from four games, model each with the right distribution, and bet on which one deviates. Limited observation budget.
- **Win condition:** Correct game identified before budget runs out, with the correct distribution named for each.

### B5 The Poll That Went Wrong (end of World 6) — Intermediate
- **Scenario:** Reconstruct why a pre-election poll missed by 8 points.
- **Concepts combined:** W6.05, W6.07, W6.09, W6.11, W6.16, W6.17, W6.18, W6.25.
- **Mechanic:** DETECTIVE + BUILD. Examine the sampling frame, response rates by group and the reported margin of error; identify the two bias sources; reweight the data and produce a corrected interval.
- **Win condition:** Both bias sources named; corrected interval covers the actual result.

### B6 Journal Reviewer I: The Miracle Supplement (end of World 7) — Intermediate/Advanced
- **Scenario:** You review a manuscript claiming a supplement improves memory.
- **Concepts combined:** W7.04, W7.06, W7.09, W7.10, W7.17, W7.19, W7.33, W7.34, W7.38, W7.40.
- **Mechanic:** DETECTIVE. Find the three methodological problems (one-tailed test chosen post hoc, 12 outcomes with no correction, paired data analysed as independent) and write the decision by selecting review sentences.
- **Win condition:** All three found; the recommended analysis is correct.

### B7 The Housing Model (end of World 8) — Advanced
- **Scenario:** A city asks you to build and defend a model of house prices.
- **Concepts combined:** W8.09–W8.13, W8.15, W8.16, W8.19, W8.21, W8.24, W8.26, W8.31, W8.32, W8.37.
- **Mechanic:** TUNE + BUILD. Choose predictors, check residual diagnostics, handle a collinear pair and an influential mansion, cross-validate, and deliver a prediction interval for one specific house.
- **Win condition:** Test RMSE within 10% of the best achievable; diagnostics issues resolved; PI covers the hidden true price.

### B8 Simpson's City (end of World 8) — Advanced
- **Scenario:** Two hospitals, two surgery types, conflicting mortality claims in the newspaper.
- **Concepts combined:** W8.38, W8.40, W4.09, W7.12, W7.22, W1.12.
- **Mechanic:** BUILD + DETECTIVE. Reconstruct the stratified tables, show the reversal, identify the confounder (case mix), compute stratified ORs, and choose the honest headline.
- **Win condition:** Correct stratified conclusion and confounder.

### B9 Journal Reviewer II: The Education Study (end of World 9) — Advanced
- **Scenario:** An observational study claims tablets in classrooms raise test scores.
- **Concepts combined:** W9.01, W9.03, W9.15, W9.16, W9.25, W9.27, W9.29, W9.31, W9.34, W8.39.
- **Mechanic:** DETECTIVE. Find three design flaws (schools self-selected into the programme, no control for prior scores so regression to the mean is possible, Hawthorne effect uncontrolled) and propose a design (matched schools, pre-registration) from parts.
- **Win condition:** All three flaws and an acceptable redesign.

### B10 The Vaccine Trial (end of World 9) — Advanced
- **Scenario:** Design and run a phase III trial from scratch, then handle dropouts and an interim look.
- **Concepts combined:** W9.02, W9.05, W9.06, W9.23, W9.30, W9.35, W9.37, W10.42, W7.13.
- **Mechanic:** BUILD + SAMPLER + SIGNIFICANCE BET. Choose n via power analysis, randomise with blinding, pre-register one interim analysis with a spending boundary, run the trial, analyse by ITT, and report RR, ARR and NNT.
- **Win condition:** Pre-specified plan followed; correct ITT estimate; no unplanned peeking.

### B11 Causal Detective (end of World 10) — Research
- **Scenario:** Did a city's congestion charge reduce air pollution? You have monthly data for the city and three comparison cities.
- **Concepts combined:** W10.12, W10.13, W10.16, W10.29, W10.30, W10.32, W10.36, W9.36.
- **Mechanic:** TIMELINE + DIAGRAM. Draw the DAG, check parallel pre-trends, seasonally adjust, handle a missing quarter, run DiD, and state the effect with a CI.
- **Win condition:** DAG with correct adjustment set; parallel-trends judgement correct; DiD effect within 20%.

### B12 The Meta-Analyst (end of World 10) — Research
- **Scenario:** Combine 12 trials of a therapy, two of which look suspicious.
- **Concepts combined:** W10.21–W10.25, W9.27, W7.38, W11.07.
- **Mechanic:** BUILD + DETECTIVE. Weight studies, choose fixed vs random effects from I², draw the funnel plot, identify the two small outlying studies, run trim-and-fill, and interpret subgroup forest rows.
- **Win condition:** Pooled estimate within 15% of the correct random-effects value; publication bias correctly diagnosed.

### B13 Bayesian A/B Showdown (end of World 10) — Research
- **Scenario:** A product team wants to ship a new checkout flow by Friday; traffic is limited.
- **Concepts combined:** W10.03, W10.04, W10.05, W10.07, W10.41, W10.42, W10.43, W6.16.
- **Mechanic:** SAMPLER + TUNE + SIGNIFICANCE BET. Set a prior, run a bandit or a fixed A/B test (your choice), update daily, and decide to ship with a stated posterior probability of improvement; compare with the frequentist analysis.
- **Win condition:** Posterior correct within tolerance; decision consistent with a stated loss function; no peeking violation if the frequentist route is chosen.

### B14 The Press Office (end of World 11) — Intermediate/Advanced
- **Scenario:** Turn three research papers into honest press releases and spot the one chart the designer has mangled.
- **Concepts combined:** W11.01, W11.08, W11.09, W11.11, W11.12, W11.14, W11.16, W11.18.
- **Mechanic:** BUILD + DETECTIVE. Build headlines from tiles with correct verbs and absolute risks; fix the truncated axis; relabel error bars; choose the honest chart.
- **Win condition:** All headlines accepted by the honesty checker; chart fixed.

### B15 Grand Reviewer: The Full Paper (final boss) — Research
- **Scenario:** A complete 8-page mock paper (abstract, methods, results, figures, tables) with six seeded problems across design, analysis and reporting.
- **Concepts combined:** drawn randomly from every world; at least one each from W7, W8, W9, W10, W11.
- **Mechanic:** DETECTIVE at scale, with a budget of "reviewer hours". Each section can be inspected; each problem found earns points; wrong accusations cost hours. End by choosing Accept / Minor / Major / Reject.
- **Win condition:** ≥ 5 of 6 problems found; correct editorial decision.

---

## Badges and achievements

| Badge | Condition |
|---|---|
| First Steps | Complete any level. |
| Islander | Earn 3 stars on every level in a world (one badge per world, 11 total). |
| Balance Master | Score ≥ 95 on Balance Beam (W2.01) five times in a row. |
| Median Minder | Beat Outlier Tug (W2.09) with the median unmoved three times. |
| Sigma Eye | Ten consecutive Ruler of Spread (W3.04) guesses within 15%. |
| Fence Builder | Correctly flag zero outliers in a no-outlier round of W3.15. |
| Bayes Brain | Perfect score on Test Positive (W4.11) with prevalence below 2%. |
| Not Due | Finish Due or Not (W4.20) with zero "due" bets. |
| Streak Spotter | Identify the real random sequence in W4.21 five rounds running. |
| Bell Ringer | Fit μ and σ within 5% on Bell Fit (W5.12). |
| Avalanche Witness | Run Dice Avalanche (W5.22) with a two-point population and predict the SD of means within 10%. |
| Net Caster | Capture rate 93–97% with net width within 10% of optimal (W6.14). |
| Hundred Nets | Predict the capture count within 2 in Hundred Nets (W6.18). |
| Bootstrapper | Build a bootstrap CI (W6.19) that covers the truth five times running. |
| Shuffle Judge | p-value within 0.01 on Shuffle Court (W7.04). |
| Calibrated Bettor | Across 20 SIGNIFICANCE BET levels, Brier score ≤ 0.15. |
| Power Lifter | Reach 80% power on Power Dials (W7.09) with one check. |
| Jelly Bean Sceptic | Predict within 5 points on Twenty Jelly Beans (W7.34). |
| Line Drawer | Draw the Line (W8.09) within 2% of the OLS SSE three times. |
| Correlation Whisperer | 25 Guess the r (W8.03) guesses within 0.1. |
| Paradox Builder | Construct the reversal in Simpson's City (W8.38) in under 60 s. |
| Wiggle Resister | Choose the test-optimal degree in Wiggle Trap (W8.31) three times. |
| Plane Armourer | Perfect armour placement in Returning Planes (W9.28). |
| Pre-registered | Write a complete plan and find every deviation in Lock the Plan (W9.24). |
| p-Hacker Reformed | Succeed at Hack the p (W9.25) and then predict the inflated false-positive rate within 10 points. |
| Backdoor Blocker | Five minimal adjustment sets in a row (W10.30). |
| Forest Ranger | Perfect scores on Read the Forest (W10.22) and Subgroup Sceptic (W11.07). |
| Honest Axis | Fix every misleading chart in World 11 on the first attempt. |
| Reviewer | Clear Journal Reviewer I (B6). |
| Senior Reviewer | Clear Journal Reviewer II (B9). |
| Editor-in-Chief | Clear the Grand Reviewer (B15) with all six problems found. |
| Marathon | 7-day streak. |
| Iron Streak | 30-day streak. |
| Comeback | Earn 3 stars on a level you previously scored 1 star on. |
| Explorer | Play at least one level using every engine type (13 including the three new ones). |
| Completionist | 3 stars on every level and every boss. |

Suggested XP: 10 per star, 50 per badge, 3× level XP for bosses, +5 per day of streak (capped at 50).
