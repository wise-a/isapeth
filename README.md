> **License:** GNU General Public License v3.0 (GPL-3.0)

# ISAPETH

## Ideological Scale, Analysis, Positioning, Evaluation, Taxonomy & Heuristics

ISAPETH is a two-dimensional framework for representing and comparing political ideology.

Rather than attempting to place political positions on a single left–right line, ISAPETH assigns positions to a coordinate system with two independent dimensions:

* **Economy** — economic policy, markets, taxation, labor, welfare, healthcare, infrastructure, trade, and related subjects.
* **Other** — social, cultural, institutional, constitutional, civil-liberties, immigration, criminal-justice, environmental, foreign-policy, and other non-economic subjects.

Each dimension ranges continuously from **−10 to +10**.

| Score | General direction         |
| ----: | ------------------------- |
|   −10 | Most progressive / left   |
|     0 | Center                    |
|   +10 | Most conservative / right |

The two coordinates together form an ideological position:

> **(Economy, Other)**

For example:

> **(−1.9, +0.6)**

would represent a position that is somewhat left-leaning economically while remaining close to the social/cultural center.

---

## Why ISAPETH?

Political ideology is multidimensional, but political behavior is often difficult to summarize without reducing it to a simple left–right spectrum.

ISAPETH deliberately makes a different compromise.

It uses **exactly two headline dimensions**, allowing ideology to be plotted and compared on a simple two-dimensional map while retaining substantially more information than a one-dimensional spectrum.

The model is particularly useful for examining:

* Political parties
* Party factions
* Individual politicians
* Historical political figures
* Political movements
* Policy platforms
* Voting coalitions
* Ideological coalitions
* Cross-pressured political positions
* Changes in political ideology over time

The purpose is not to determine what someone's ideology *really is*. The purpose is to provide a **consistent coordinate system for representing political positions**.

---

# The Two Dimensions

## 1. Economy

The **Economy** dimension measures positions concerning the organization, regulation, and distribution of economic resources.

Potential policy categories include:

* Taxation
* Tax progressivity
* Corporate taxation
* Capital gains taxation
* Wealth and estate taxation
* Economic regulation
* Consumer protection
* Antitrust
* Market competition
* Public ownership
* Privatization
* Industrial policy
* Labor unions
* Collective bargaining
* Minimum wage
* Worker protections
* Paid leave
* Welfare
* Social insurance
* Social Security
* Housing assistance
* Universal basic income
* Healthcare financing
* Public healthcare
* Private healthcare
* Medicare
* Medicaid
* Education spending
* Higher-education subsidies
* Housing supply
* Zoning
* Rent regulation
* Infrastructure
* Transportation
* Public transit
* Energy policy
* Trade
* Tariffs
* Manufacturing policy
* Foreign investment

These individual subjects can be scored separately and then aggregated into the Economy coordinate.

---

## 2. Other

The **Other** dimension contains political questions that are not primarily economic.

This intentionally broad category can include:

* Family and social values
* Abortion
* LGBT legal equality
* Religion
* Church–state relations
* Civil rights
* Race-conscious policy
* Immigration
* Border policy
* Asylum
* Criminal justice
* Policing
* Guns
* Civil liberties
* Privacy
* Government surveillance
* Freedom of speech
* Education and culture
* Climate and environmental policy
* Elections
* Campaign finance
* Constitutional structure
* Federalism
* Executive power
* Judicial power
* Administrative government
* Technology regulation
* Foreign policy
* Nationalism
* Internationalism
* Military intervention
* International alliances

The category is intentionally broad.

**“Other” does not mean that these issues are unimportant or inherently related.** It is the second coordinate in a deliberately two-dimensional model.

---

# Policy Taxonomy

ISAPETH separates the **policy taxonomy** from the **headline dimensions**.

This is important.

A model can contain dozens or hundreds of individual policy subjects without creating dozens or hundreds of ideological dimensions.

For example:

```text
Economy
├── Taxation
├── Regulation & Markets
├── Labor
├── Welfare & Social Insurance
├── Healthcare
├── Education Economics
├── Housing & Land Economics
├── Infrastructure
├── Transportation
├── Energy
└── Trade & Global Economics

Other
├── Family & Social Values
├── Religion
├── Race & Civil Rights
├── Immigration
├── Criminal Justice
├── Policing
├── Civil Liberties
├── Guns
├── Education & Culture
├── Climate & Environment
├── Democracy & Elections
├── Campaigns & Political Money
├── Constitutional & Institutional
├── Technology & Privacy
└── Nationalism, Internationalism & Foreign Policy
```

Individual subjects can therefore be analyzed independently while still rolling up into the two primary coordinates.

---

# Scoring

Individual policy positions are represented numerically on the same **−10 to +10** scale.

The system should support arbitrary decimal precision.

For example:

```text
Taxation:             -2.8
Economic Regulation:  -1.7
Healthcare:           -1.8
Labor:                -1.1
Welfare:              -2.1

Marriage & Family:    +2.0
Climate:              -3.3
Immigration:          -0.9
Justice & Policing:   +0.8
Nationalism:          +1.4
```

Category scores can then be calculated from their component subjects.

The final Economy and Other coordinates are calculated from the relevant category scores.

The exact weighting system should remain configurable rather than being permanently embedded in the interface.

---

# Classification

ISAPETH coordinates are continuous.

Classification labels are therefore **descriptive bands**, not discrete ideological identities.

### Economy

|          Range | Classification                     |
| -------------: | ---------------------------------- |
|      −10 to −8 | Hard Left / Socialist              |
|       −8 to −6 | Strong Left / Socialist-Leaning    |
|       −6 to −4 | Left-Wing                          |
|       −4 to −2 | Center-Left                        |
|    −2 to −0.75 | Left-Leaning Center                |
| −0.75 to +0.75 | Economic Center                    |
|    +0.75 to +2 | Right-Leaning Center               |
|       +2 to +4 | Center-Right                       |
|       +4 to +6 | Right-Wing                         |
|       +6 to +8 | Strong Right / Market Conservative |
|      +8 to +10 | Hard Right / Laissez-Faire         |

### Other

|          Range | Classification              |
| -------------: | --------------------------- |
|      −10 to −8 | Radically Progressive       |
|       −8 to −6 | Strongly Progressive        |
|       −6 to −4 | Progressive                 |
|       −4 to −2 | Center-Progressive          |
|    −2 to −0.75 | Progressive-Leaning Center  |
| −0.75 to +0.75 | Social/Cultural Center      |
|    +0.75 to +2 | Conservative-Leaning Center |
|       +2 to +4 | Center-Conservative         |
|       +4 to +6 | Conservative                |
|       +6 to +8 | Strongly Conservative       |
|      +8 to +10 | Hard Right / Traditionalist |

The labels are intended to make coordinates easier to interpret, not to replace the underlying numerical score.

---

# Cross-Pressure

A major purpose of ISAPETH is to avoid treating a coordinate near `(0, 0)` as automatically equivalent to ideological moderation.

Two people could have nearly identical headline coordinates while having radically different distributions of individual policy positions.

For example:

```text
Person A

Economy:
-1
-1
-2
-1
-1

Other:
0
+1
0
-1
0
```

This is a relatively coherent moderate profile.

Meanwhile:

```text
Person B

Economy:
-8
+7
-6
+7
-1

Other:
-8
+8
-7
+7
0
```

could average toward the center despite containing extremely polarized positions.

ISAPETH therefore includes a **dispersion diagnostic**.

Possible classifications:

* **Coherent** — low internal variation
* **Mixed** — moderate variation
* **Heterodox** — high variation
* **Highly Cross-Pressured** — extremely high variation

Dispersion does **not** create a third dimension and does not alter the primary coordinate.

It is diagnostic information about the composition of the coordinate.

---

# Visualization

An ISAPETH profile can be plotted on a two-dimensional coordinate plane.

```text
                    OTHER
                      +10
                       │
                       │
            Progressive│Conservative
                       │
                       │
       −10 ────────────┼──────────── +10
                       │             ECONOMY
                       │
                       │
                       │
                      −10
```

The exact visualization can include:

* Individual profiles
* Political parties
* Historical parties
* Politicians
* Political movements
* Multiple profiles simultaneously
* Confidence or uncertainty ranges
* Category breakdowns
* Comparison lines
* Historical movement over time

---

# Comparison

ISAPETH coordinates allow profiles to be compared mathematically.

For two profiles:

```text
A = (x₁, y₁)
B = (x₂, y₂)
```

their Euclidean distance can be calculated as:

```text
distance = √[(x₂ − x₁)² + (y₂ − y₁)²]
```

This provides a simple measure of overall positional similarity.

The system can also separately determine:

* Who is closer economically
* Who is closer on Other issues
* Overall coordinate distance
* Which individual policy categories account for the difference

This makes it possible to distinguish between two people who are close overall but arrive there through very different policy combinations.

---

# What ISAPETH Is Not

ISAPETH is **not**:

* A political quiz
* A personality test
* A claim that ideology is actually two-dimensional
* A universal definition of left and right
* A replacement for political-science research
* The actual DW-NOMINATE methodology
* A statistical estimate of legislative voting behavior

DW-NOMINATE derives ideological coordinates from legislative roll-call voting data using statistical methods.

ISAPETH instead provides a **policy-positioning framework** in which individual positions can be explicitly specified, weighted, aggregated, and visualized.

The relationship is therefore one of inspiration rather than equivalence.

---

# Design Principles

### 1. Two dimensions, no more

The headline model remains:

> **Economy × Other**

Additional policy categories are diagnostic inputs, not additional ideological axes.

### 2. Continuous scores

Positions should not be forced into a small number of ideological boxes.

The underlying scores remain numerical.

### 3. Transparent aggregation

Users should be able to see how a final coordinate was produced.

### 4. Taxonomy separate from geometry

The policy taxonomy can expand without changing the two-dimensional coordinate system.

### 5. Cross-pressure matters

A moderate average can conceal substantial ideological disagreement among individual positions.

### 6. Comparability

Profiles should use the same scoring conventions so that parties, politicians, movements, and policy platforms can be compared.

### 7. Imperfection is intentional

The two-dimensional model is a simplification.

That simplification is not necessarily a flaw: it makes it possible to visualize political relationships, factions, coalitions, and ideological movement on a common coordinate plane.

---

# Example

A hypothetical profile might produce:

```text
Economy: −1.9
Other:   +0.6
```

Classification:

```text
Economy: Left-Leaning Center
Other:   Social/Cultural Center
```

Overall:

> **Left-Leaning Center / Social-Cultural Center**

The numerical coordinates remain the authoritative result; the textual classification is an interpretation layer.

---

# Future Development

Potential future versions may include:

* Expanded policy taxonomy
* Custom policy weights
* Party and politician databases
* Historical profiles
* Profile versioning
* Confidence intervals
* Sensitivity analysis
* Multiple weighting models
* Import/export
* Profile comparison
* Interactive two-dimensional mapping
* Historical ideological trajectories
* Automatic policy-position extraction from political documents
* Statistical validation against voting records and existing ideological measures

The core two-dimensional architecture should remain stable even as the surrounding taxonomy and analytical tools develop.

---

# Status

***License***

ISAPETH is free and open-source software licensed under the **GNU General Public License v3.0 (GPL-3.0).**

See LICENSE for the complete license terms.
