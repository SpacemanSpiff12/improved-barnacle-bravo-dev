# YGO Draw Odds > Calculate opening hand probabilities for Yu-Gi-Oh! deck building

**Author:** Brandon Harwell  
**Project:** dev|delta  
**Version:** 0.4  
**Date:** 2026-11-10  

---

## 📖 User Story

- **As a** competitive Yu-Gi-Oh! deck builder
- **I want** to calculate live opening-hand probability ratios and manage database records dynamically with role-based access control (RBAC).
- **So that** I can build optimized 40-to-60 card deck ratios, secure administrative parameters, and consistently open critical combo pieces.

---

## 📝 Project Narrative

Yu-Gi-Oh! deck building heavily relies on mathematical ratios to ensure players open combo starters in their 5-card opening hand while maintaining optimal coverage for going second. Currently, players must calculate probabilities manually or use generic calculators that lack card-game context. 

**YGO Draw Odds** addresses this problem by providing a tailored interface specifically designed around custom deck sizes (up to 60 cards) powered by hypergeometric probability models. The application features a fully dynamic data layer driven by `cards.json` and `sessionStorage`, a responsive Bootstrap interface, and a robust AuthN/AuthZ system that dynamically renders an Admin Control Center for session and database management.

---

## 🧪 Simple Pass/Fail Test

- [x] 🧪 **TEST**: Can an Admin user view elevated controls and reset local database state?
- [x] ✅ **PASS**: The admin panel renders dynamically when signed in as an Admin, allowing session storage overrides and database resets.
- [x] ✅ **PASS**: The user can calculate dynamic hypergeometric opening hand probabilities for custom deck sizes up to 60 and variable copy counts.

---

## 🛠️ Technology Stack

- **HTML5** - Page structure and semantic elements
- **CSS3** - Custom page layout and component styling
- **JavaScript (ES6+)** - Client-side interaction hooks, hypergeometric math models, and dynamic UI rendering
- **Bootstrap 5** - Responsive layout framework, navbar, forms, modals, and cards
- **Bootstrap Icons** - UI icons for categories, navigation, and security badges
- **Google Fonts (Inter)** - Typography
- **Git & GitHub** - Version control, branching (`dev|bravo` to `dev|delta`), and source management
- **GitHub Pages** - Project deployment hosting

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
├── data/
│   └── cards.json
├── js/
│   └── app.js
└── README.md
