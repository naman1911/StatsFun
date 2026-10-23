# Content research prompt for StatsFun

Use this prompt to gather the full curriculum (terms, definitions, misconceptions) and a
game mechanic for every concept. The answer is meant to be converted into `js/curriculum.js`.

---

I am building "StatsFun", a browser-based game that teaches ALL of statistics, from the very first
ideas (average, mean, median, mode) up to the advanced methods used in academic research and data
science. The player works through "worlds" (themed islands) made of short levels. Each level teaches
one concept with a 3-5 sentence lesson card and then a replayable mini-game built on real statistics
code and randomly generated data, so the player practises with fresh numbers every time. Progress
is tracked with XP, stars (1-3 per level), streaks, and badges.

I need you to produce two deliverables.

DELIVERABLE 1: THE COMPLETE CURRICULUM
List every statistics concept and term a learner should know, ordered from beginner to expert and
grouped into 8-12 worlds. For each concept give:
  - Name, plus common synonyms/notation (e.g. "standard deviation, SD, sigma, s")
  - A one-line plain-English definition a 14-year-old could follow
  - The formula or procedure, if any
  - Prerequisites (which earlier concepts it depends on)
  - The most common misconception or mistake learners make
  - One real-world example where it matters
  - Difficulty tier: Beginner / Intermediate / Advanced / Research

Cover at least these areas, and add anything I have missed:
  1. Data basics: types of data (nominal, ordinal, interval, ratio), discrete vs continuous,
     population vs sample, parameter vs statistic, variables (independent, dependent, confounding).
  2. Central tendency: mean, median, mode, weighted mean, trimmed mean, geometric and harmonic
     mean, when to use which, effect of outliers.
  3. Spread and shape: range, variance, SD, IQR, percentiles/quartiles, MAD, coefficient of
     variation, z-scores, skewness, kurtosis, outliers, box plots, histograms, stem-and-leaf.
  4. Probability: sample space, events, addition/multiplication rules, complement, independence,
     conditional probability, Bayes' theorem, expected value, law of large numbers, combinatorics,
     odds vs probability, gambler's fallacy, base-rate fallacy.
  5. Distributions: uniform, Bernoulli, binomial, geometric, Poisson, normal (68-95-99.7), standard
     normal, t, chi-square, F, exponential, log-normal; PDF/PMF/CDF; central limit theorem.
  6. Sampling and estimation: random, stratified, cluster, systematic, convenience sampling;
     sampling bias; standard error; confidence intervals; margin of error; bootstrap; point vs
     interval estimates; bias and variance of estimators.
  7. Hypothesis testing: null/alternative, p-value, alpha, one- vs two-tailed, Type I/II error,
     power, effect size (Cohen's d, r, odds ratio, relative risk), z-test, t-tests (one-sample,
     paired, independent, Welch), chi-square tests (goodness of fit, independence), Fisher's exact,
     ANOVA (one-way, two-way, repeated measures), post-hoc tests, non-parametric tests
     (Mann-Whitney, Wilcoxon, Kruskal-Wallis, sign test), multiple comparisons (Bonferroni,
     Holm, FDR / Benjamini-Hochberg), statistical vs practical significance.
  8. Relationships and modelling: covariance, Pearson and Spearman correlation, correlation vs
     causation, simple and multiple linear regression, least squares, residuals, R-squared,
     adjusted R-squared, assumptions (linearity, homoscedasticity, normality of residuals,
     independence), multicollinearity, interaction terms, dummy variables, logistic regression,
     odds ratios, overfitting, cross-validation, regularisation (ridge, lasso), model selection
     (AIC, BIC), Simpson's paradox, regression to the mean, ecological fallacy.
  9. Research methods and study design: observational vs experimental, randomised controlled
     trials, control groups, placebo, blinding, randomisation, blocking, factorial designs,
     cohort/case-control/cross-sectional studies, validity (internal, external, construct),
     reliability (test-retest, Cronbach's alpha), measurement error, operationalisation,
     sample-size and power calculation, pre-registration, p-hacking, HARKing, publication bias,
     survivorship bias, selection bias, Hawthorne effect, Berkson's paradox, replication crisis.
 10. Advanced and modern methods: Bayesian inference (priors, likelihood, posterior, credible
     intervals, Bayes factors), maximum likelihood estimation, permutation tests, Monte Carlo
     simulation, Markov chains, time series basics (trend, seasonality, autocorrelation, moving
     averages), survival analysis (Kaplan-Meier, hazard ratios), meta-analysis (forest plots,
     heterogeneity, I-squared), mixed-effects / hierarchical models, causal inference
     (counterfactuals, DAGs, instrumental variables, difference-in-differences, propensity
     scores), missing data (MCAR/MAR/MNAR, imputation), dimensionality reduction (PCA, factor
     analysis), clustering basics, A/B testing in industry, sequential testing.
 11. Reading and reporting: how to read a research paper's results section, APA-style reporting,
     reading tables of p-values and CIs, forest plots, effect-size interpretation, common
     misleading charts (truncated axes, cherry-picked ranges, dual axes).

DELIVERABLE 2: A GAME MECHANIC FOR EVERY CONCEPT
For each concept above, propose one mini-game that teaches it by DOING, not by multiple-choice
alone. For each game give:
  - Game name (fun, short)
  - The player's goal in one sentence
  - The exact interaction (slider, drag, click dots, draw a line, bet chips, sort cards, run a
    simulation, pick the odd one out, etc.)
  - How the data is randomly generated so the game is replayable
  - How the score is computed (e.g. "100 points scaled by how close the guess is to the true mean")
  - What the reveal/feedback shows after the player answers (the true value, the formula applied
    to their actual data, a visual such as a dot plot or curve)
  - Why this mechanic builds intuition for this specific concept
  - Which of these reusable engine types it fits, or whether a new type is needed:
      * ESTIMATE: look at a plot, set a slider to guess a statistic
      * PICK: choose which of 2-4 plots/datasets matches a description
      * CORRELATION GUESS: see a scatter plot, guess r
      * SIGNIFICANCE BET: see two groups, bet whether the difference is significant, reveal the test
      * PROBABILITY PREDICT-THEN-SIMULATE: state a probability, then run the simulation and watch
        it converge
      * SAMPLER: draw repeated samples and watch a sampling distribution build up
      * MATCH: pair terms with definitions, formulas, or pictures
      * BUILD: drag bars/points to construct a dataset with a target property
      * DETECTIVE: spot the flaw in a described study or chart
      * QUIZ: multiple choice with an explanation (use sparingly)
Also suggest 10-15 "boss levels" that combine several concepts into a realistic scenario (for
example: "You are a journal reviewer; find the three problems with this paper's methods"), and a
set of badges/achievements with the condition that earns each one.

FORMAT
Return everything as structured Markdown with one H2 per world, one H3 per concept, and bullet
fields exactly as named above, so it can be converted directly into a JSON curriculum file.
Be exhaustive on terminology: it is better to include a term I decide to cut than to miss one.
