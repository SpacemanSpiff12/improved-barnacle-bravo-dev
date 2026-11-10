// --- Application State Management ---
window.appState = {
  currentUser: {
    username: "SpacemanSpiff12",
    role: "Admin" // Admin or User role for AuthZ testing
  },
  cards: [],
  filters: {
    search: "",
    category: "all"
  }
};

// Check sessionStorage for persisted user session on load
const savedUser = sessionStorage.getItem("ygo_user");
if (savedUser) {
  window.appState.currentUser = JSON.parse(savedUser);
}

// --- Probability Function ---
// Calculates probability of drawing >= 1 success in 'n' draws given 'N' population, 'K' successes in population.
function calculateHypergeometric(N, K, n, k = 1) {
  // Combination helper
  function combination(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k > n / k) k = n - k;
    let c = 1;
    for (let i = 1; i <= k; i++) {
      c = (c * (n - (i - 1))) / i;
    }
    return c;
  }

  // P(X >= k) = 1 - P(X < k)
  let exactMatchesProbability = 0;
  for (let i = 0; i < k; i++) {
    const numerator = combination(K, i) * combination(N - K, n - i);
    const denominator = combination(N, n);
    if (denominator > 0) {
      exactMatchesProbability += numerator / denominator;
    }
  }

  const probability = 1 - exactMatchesProbability;
  return (probability * 100).toFixed(2);
}

// --- Initialize App ---
document.addEventListener("DOMContentLoaded", () => {
  initializeAppData();
  setupEventListeners();
  updateAuthUI();
});

// --- Fetch Data & sessionStorage Integration ---
async function initializeAppData() {
  const cachedData = sessionStorage.getItem("ygo_cards");

  if (cachedData) {
    window.appState.cards = JSON.parse(cachedData);
    renderCards(window.appState.cards);
    updateRecordCount(window.appState.cards.length);
  } else {
    try {
      const response = await fetch("data/cards.json");
      if (!response.ok) throw new Error("Failed to load cards database.");
      const data = await response.json();
      
      window.appState.cards = data;
      sessionStorage.setItem("ygo_cards", JSON.stringify(data));
      
      renderCards(data);
      updateRecordCount(data.length);
    } catch (error) {
      console.error("Error fetching card data:", error);
      document.getElementById("content-container").innerHTML = `
        <div class="col-12 text-center text-danger">
          <p>Failed to load card database. Please check your local server or JSON format.</p>
        </div>
      `;
    }
  }
}

// --- Render Cards to DOM ---
function renderCards(cardsToRender) {
  const container = document.getElementById("content-container");
  container.innerHTML = "";

  if (cardsToRender.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center text-muted py-3">
        <p class="mb-0">No matching cards found in database.</p>
      </div>
    `;
    return;
  }

  cardsToRender.forEach(card => {
    // Calculate odds dynamically for each card based on its copies in a standard 40-card deck, 5-card hand
    const odds = calculateHypergeometric(40, card.copies, 5, 1);

    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card h-100 border-warning shadow-sm">
        <div class="card-header bg-dark text-warning d-flex justify-content-between align-items-center">
          <span class="fw-bold">${card.title}</span>
          <span class="badge bg-warning text-dark">${card.copies} Copies</span>
        </div>
        <div class="card-body">
          <p class="card-text small text-muted mb-2">${card.description}</p>
          <div class="bg-light p-2 rounded text-center border">
            <span class="fs-5 fw-bold text-success">${odds}%</span>
            <span class="d-block text-muted small">Opening Hand Odds (40-Card Deck)</span>
          </div>
        </div>
        <div class="card-footer bg-transparent d-flex justify-content-between align-items-center small text-muted">
          <span>Category: <strong>${card.category}</strong></span>
          <div>
            ${card.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Calculator Form Submission
  const oddsForm = document.getElementById("odds-form");
  if (oddsForm) {
    oddsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const deckSize = parseInt(document.getElementById("deck-size").value);
      const cardCopies = parseInt(document.getElementById("card-copies").value);
      const handSize = parseInt(document.getElementById("hand-size").value);

      const resultPercent = calculateHypergeometric(deckSize, cardCopies, handSize, 1);

      const resultBox = document.getElementById("calc-result");
      const outputSpan = document.getElementById("probability-output");
      
      outputSpan.textContent = `${resultPercent}%`;
      resultBox.classList.remove("d-none");
    });
  }

  // Search & Filter Listeners
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", applyFilters);
  }

  const searchBox = document.getElementById("search-box");
  if (searchBox) {
    searchBox.addEventListener("input", (e) => {
      window.appState.filters.search = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  const categoryFilter = document.getElementById("category-filter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", (e) => {
      window.appState.filters.category = e.target.value;
      applyFilters();
    });
  }
}

// --- Filter Logic ---
function applyFilters() {
  const { search, category } = window.appState.filters;

  const filtered = window.appState.cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(search) || card.description.toLowerCase().includes(search);
    const matchesCategory = category === "all" || card.category === category;
    return matchesSearch && matchesCategory;
  });

  renderCards(filtered);
  updateRecordCount(filtered.length);
}

function updateRecordCount(count) {
  const badge = document.getElementById("record-count");
  if (badge) {
    badge.textContent = `${count} record${count === 1 ? '' : 's'}`;
  }
}

// Admin Reset DB Button
  const resetBtn = document.getElementById("reset-db-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      sessionStorage.removeItem("ygo_cards");
      window.location.reload();
    });
  }
