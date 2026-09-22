# YGO Draw Odds > Calculate opening hand probabilities for Yu-Gi-Oh! deck building

**Author:** Brandon Andrew Harwell  
**Project:** dev|bravo  
**Version:** 0.2  
**Date:** 2026-09-22  

---

## 📖 User Story

* **As a** competitive Yu-Gi-Oh! deck builder
* **I want** to search and view exact opening-hand probability ratios for starters, handtraps, and breakers.
* **So that** I can build my 40-to-60 card deck ratio to consistently open combo starters while minimizing bricks.

---

## 📝 Project Narrative

Yu-Gi-Oh! deck building heavily relies on ratios to ensure players open combo starters in their 5-card opening hand while maintaining optimal coverage for going second. Currently, players must calculate probabilities manually or use generic calculators that lack card-game context. 

**YGO Draw Odds** addresses this problem by providing a tailored interface specifically designed around deck sizes (40–60 cards). In this `dev|bravo` shell stage, the user interface establishes card display cards, search/filter controls, and custom probability calculation forms. Later versions will calculate opening odds live and allow users to save deck profiles.

---

## 🧪 Simple Pass/Fail Test

- [ ] 🧪 **TEST**: Can a user locate the opening probability for a 3-copy card in a 40-card deck?
- [x] ✅ **PASS**: The user can locate "Ash Blossom & Joyous Spring" in the content cards section and view the 33.76% probability.
- [ ] ❌ **FAIL**: The user cannot identify opening hand odds on the interface.

---

## 🛠️ Technology Stack

* **HTML5** - Page structure and semantic elements
* **CSS3** - Custom page layout and component hover styling
* **JavaScript (ES6)** - Client-side interaction hooks
* **jQuery (3.7.1)** - Event listener handling
* **Bootstrap 5** - Responsive layout framework, navbar, forms, and cards
* **Bootstrap Icons** - UI icons for categories and navigation
* **Normalize.css** - Cross-browser element default resets
* **Google Fonts (Inter)** - Typography
* **Git & GitHub** - Version control and source management
* **GitHub Pages** - Project deployment hosting

---

## 📁 Project Structure

```text
improved-barnacle-bravo-lab/
├── index.html
├── pages/
│   ├── deck-builder.html
│   └── signin.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── README.md
