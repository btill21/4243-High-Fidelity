/* =========================================
   1. FOOTBALL TERMS DICTIONARY
   ========================================= */
const footballTerms = {
  "YAC": {
    term: "YAC",
    definition: "Yards After Catch - The distance a receiver gains after catching the ball. This measures how effective a receiver is at running with the ball after the catch."
  },
  "scramble": {
    term: "Scramble",
    definition: "When a quarterback runs with the ball instead of throwing it, usually because no receivers are open or the pocket collapses. The QB uses their legs to gain yards."
  },
  "scrambles": {
    term: "Scramble",
    definition: "When a quarterback runs with the ball instead of throwing it, usually because no receivers are open or the pocket collapses. The QB uses their legs to gain yards."
  },
  "Holding": {
    term: "Holding",
    definition: "A penalty where an offensive player illegally grabs or restricts a defensive player. This results in a 10-yard penalty and loss of down. It's one of the most common penalties in football."
  },
  "holding": {
    term: "Holding",
    definition: "A penalty where an offensive player illegally grabs or restricts a defensive player. This results in a 10-yard penalty and loss of down. It's one of the most common penalties in football."
  },
  "Penalty": {
    term: "Penalty",
    definition: "A rule violation that results in yardage being assessed against the offending team. Common penalties include holding, false start, pass interference, and offsides."
  },
  "penalty": {
    term: "Penalty",
    definition: "A rule violation that results in yardage being assessed against the offending team. Common penalties include holding, false start, pass interference, and offsides."
  },
  "First down": {
    term: "First Down",
    definition: "When the offense gains 10 yards in 4 attempts (downs), they get a new set of 4 downs. This is called a 'first down' and is a key objective on every offensive drive."
  },
  "first down": {
    term: "First Down",
    definition: "When the offense gains 10 yards in 4 attempts (downs), they get a new set of 4 downs. This is called a 'first down' and is a key objective on every offensive drive."
  },
  "TOUCHDOWN": {
    term: "Touchdown",
    definition: "When a player carries the ball into the end zone or catches a pass in the end zone. Worth 6 points, followed by an extra point attempt (1 point) or two-point conversion (2 points)."
  },
  "Touchdown": {
    term: "Touchdown",
    definition: "When a player carries the ball into the end zone or catches a pass in the end zone. Worth 6 points, followed by an extra point attempt (1 point) or two-point conversion (2 points)."
  },
  "touchdown": {
    term: "Touchdown",
    definition: "When a player carries the ball into the end zone or catches a pass in the end zone. Worth 6 points, followed by an extra point attempt (1 point) or two-point conversion (2 points)."
  },
  "Play-action": {
    term: "Play-Action",
    definition: "A fake handoff to a running back that makes the defense think it's a run play, then the quarterback throws a pass. This deception can create open receivers downfield."
  },
  "play-action": {
    term: "Play-Action",
    definition: "A fake handoff to a running back that makes the defense think it's a run play, then the quarterback throws a pass. This deception can create open receivers downfield."
  },
  "slant": {
    term: "Slant",
    definition: "A pass route where the receiver runs diagonally across the field, usually at a sharp angle. It's a quick route designed to get the ball to the receiver fast."
  },
  "Tackled": {
    term: "Tackle",
    definition: "When a defensive player brings down the ball carrier by grabbing and stopping them. The play ends when the ball carrier is tackled or goes out of bounds."
  },
  "tackled": {
    term: "Tackle",
    definition: "When a defensive player brings down the ball carrier by grabbing and stopping them. The play ends when the ball carrier is tackled or goes out of bounds."
  }
};

/* =========================================
   2. TEXT PARSER (HIGHLIGHTER)
   ========================================= */
function highlightTerms(text) {
  let processedText = text;
  const termPatterns = Object.keys(footballTerms).sort((a, b) => b.length - a.length);

  termPatterns.forEach(term => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');

    processedText = processedText.replace(regex, (match, offset, string) => {
      const beforeMatch = string.substring(Math.max(0, offset - 200), offset);
      const lastOpenSpan = beforeMatch.lastIndexOf('<span');
      const lastCloseSpan = beforeMatch.lastIndexOf('</span>');

      if (lastOpenSpan > lastCloseSpan) {
        return match;
      }

      const termKey = Object.keys(footballTerms).find(
        k => k.toLowerCase() === term.toLowerCase()
      );
      const termData = footballTerms[termKey];

      if (termData) {
        return `<span class="football-term" data-term="${termData.term}" data-definition="${termData.definition.replace(/"/g, '&quot;')}">${match}</span>`;
      }
      return match;
    });
  });

  return processedText;
}

/* =========================================
   3. MOCK DATA (THE PLAYS)
   ========================================= */
const mockPlays = [
  {
    title: "1st & 10 @ LSU 25 (10:05 1Q)",
    details: "J. Daniels pass complete to M. Thomas to the left for 15 yards.",
    notes: [{ label: "YAC", value: "8 yards after catch." }]
  },
  {
    title: "1st & 10 @ LSU 40 (9:40 1Q)",
    details: "J. Emery rush up the middle for 6 yards. Tackled by #94 T. Johnson.",
    notes: []
  },
  {
    title: "2nd & 4 @ LSU 46 (9:10 1Q)",
    details: "Play-action pass. J. Daniels scrambles right for 8 yards and steps out of bounds.",
    notes: [{ label: "Scramble", value: "No receivers open." }]
  },
  {
    title: "1st & 10 @ WKU 46 (8:50 1Q)",
    details: "J. Daniels pass complete to B. Nabers on a slant for 12 yards. First down LSU.",
    notes: []
  },
  {
    title: "1st & 10 @ WKU 34 (8:10 1Q)",
    details: "Penalty: Holding, Offense #68 (10 yards).",
    notes: []
  },
  {
    title: "1st & 20 @ WKU 44 (8:00 1Q)",
    details: "J. Emery rush up the middle for 7 yards. Tackled at the WKU 37.",
    notes: []
  },
  {
    title: "2nd & 13 @ WKU 37 (7:25 1Q)",
    details: "J. Daniels pass complete to B. Nabers for 14 yards. First down LSU.",
    notes: []
  },
  {
    title: "1st & 10 @ WKU 23 (6:55 1Q)",
    details: "J. Emery rush to the right for 8 yards, tackled at the WKU 15.",
    notes: []
  },
  {
    title: "2nd & 2 @ WKU 15 (6:30 1Q)",
    details: "Quick pass to B. Nabers for 10 yards. First down LSU.",
    notes: []
  },
  {
    title: "1st & Goal @ WKU 5 (6:10 1Q)",
    details: "J. Daniels pass to M. Thomas in the corner of the end zone. TOUCHDOWN LSU!",
    notes: []
  },
  {
    title: "EXTRA POINT (6:05 1Q)",
    details: "K. Ramos kick is GOOD. LSU leads 7-0.",
    notes: []
  }
];

/* =========================================
   4. FEED GENERATION LOGIC
   ========================================= */
const feedContainer = document.getElementById("live-feed-container");
let playIndex = 0;

function createPlayCard(playData) {
  const card = document.createElement("div");
  card.classList.add("feed-card");

  const highlightedDetails = highlightTerms(playData.details);

  card.innerHTML = `
    <h3>${playData.title}</h3>
    <p>${highlightedDetails}</p>
  `;

  // Add click listeners to the terms inside this card
  const terms = card.querySelectorAll('.football-term');
  terms.forEach(termSpan => {
    termSpan.addEventListener('click', (e) => {
      e.stopPropagation();
      const term = termSpan.getAttribute('data-term');
      const definition = termSpan.getAttribute('data-definition');
      showTermDefinition(term, definition);
    });
  });

  return card;
}

function showTermDefinition(term, definition) {
  const existingModal = document.getElementById('term-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'term-modal';
  modal.classList.add('term-modal');
  modal.innerHTML = `
    <div class="term-modal-content">
      <div class="term-modal-header">
        <h3>${term}</h3>
        <button class="term-modal-close">&times;</button>
      </div>
      <div class="term-modal-body">
        <p>${definition}</p>
      </div>
    </div>
  `;

  const appContainer = document.querySelector('.mobile-app-container');
  appContainer.appendChild(modal);

  const closeBtn = modal.querySelector('.term-modal-close');
  closeBtn.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  setTimeout(() => { modal.classList.add('show'); }, 10);
}

function addNextPlay() {
  if (playIndex < mockPlays.length) {
    const nextPlayData = mockPlays[playIndex];
    const newCard = createPlayCard(nextPlayData);
    feedContainer.prepend(newCard);
    playIndex++;
  } else {
    clearInterval(playInterval);
  }
}

// Start adding plays every 5 seconds
const playInterval = setInterval(addNextPlay, 5000);


/* =========================================
   5. NAVIGATION + TABS + PROFILE (UPDATED)
   ========================================= */

const navGames = document.getElementById('nav-games');
const navGuide = document.getElementById('nav-guide');
const navProfile = document.getElementById('nav-profile');

const gamesListView = document.getElementById('games-list-view');
const gameDetailView = document.getElementById('game-detail-view');
const guideView = document.getElementById('guide-view');
const profileView = document.getElementById('profile-view');
const liveFeedContainer = document.getElementById('live-feed-container');
const feedHeader = document.querySelector('.feed-header');

function switchTab(tab) {
  // 1. Reset all nav buttons
  navGames.classList.remove('active');
  navGuide.classList.remove('active');
  navProfile.classList.remove('active');

  gamesListView.classList.add('hidden');
  gameDetailView.classList.add('hidden');
  guideView.classList.add('hidden');
  profileView.classList.add('hidden');

  // 3. Activate the chosen view
  if (tab === 'games') {
    navGames.classList.add('active');
    gamesListView.classList.remove('hidden');
  } else if (tab === 'guide') {
    navGuide.classList.add('active');
    guideView.classList.remove('hidden');
    renderGuide();
  } else if (tab === 'profile') {
    navProfile.classList.add('active');
    profileView.classList.remove('hidden');
  }
}

navGames.addEventListener('click', (e) => { e.preventDefault(); switchTab('games'); });
navGuide.addEventListener('click', (e) => { e.preventDefault(); switchTab('guide'); });
navProfile.addEventListener('click', (e) => { e.preventDefault(); switchTab('profile'); });

function renderGuide() {
  const guideContent = document.querySelector('.guide-content');
  if (guideContent.children.length > 0) return;

  const categories = {
    "Offense": ["YAC", "Scramble", "First Down", "Play-Action", "Slant", "Touchdown"],
    "Defense": ["Tackled"],
    "Penalties": ["Holding", "Penalty"]
  };

  for (const [category, terms] of Object.entries(categories)) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('guide-category');

    const title = document.createElement('h3');
    title.textContent = category;
    categoryDiv.appendChild(title);

    const terms = categories[category];
    terms.forEach(termKey => {
      const realKey = Object.keys(footballTerms).find(k => k.toLowerCase() === termKey.toLowerCase());
      if (realKey) {
        const termData = footballTerms[realKey];
        const termItem = document.createElement('div');
        termItem.classList.add('term-item');
        termItem.innerHTML = `
          <h4>${termData.term}</h4>
          <p>${termData.definition}</p>
        `;
        categoryDiv.appendChild(termItem);
      }
    });

    guideContent.appendChild(categoryDiv);
  }
}

/* Auth Logic */
const authView = document.getElementById('auth-view');
const authForm = document.getElementById('auth-form');
const authNameInput = document.getElementById('auth-name');
const authTeamInput = document.getElementById('auth-team');
const scoreboard = document.getElementById('scoreboard');
const navBar = document.getElementById('nav-bar');

navBar.style.opacity = '0';

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = authNameInput.value;
  const team = authTeamInput.value;

  document.getElementById('profile-name').textContent = name;
  document.querySelector('.profile-avatar').textContent = getInitials(name);
  document.getElementById('profile-team').textContent = team;

  authView.style.opacity = '0';
  setTimeout(() => {
    authView.classList.add('hidden');
    navBar.style.transition = 'opacity 0.5s';
    navBar.style.opacity = '1';
    switchTab('games');
  }, 500);
});

/* Games Navigation Logic */
const lsuGameCard = document.getElementById('open-lsu-game');
const backToGamesBtn = document.getElementById('back-to-games');

if (lsuGameCard) {
  lsuGameCard.addEventListener('click', () => {
    gamesListView.classList.add('hidden');
    gameDetailView.classList.remove('hidden');
  });
}

if (backToGamesBtn) {
  backToGamesBtn.addEventListener('click', () => {
    gameDetailView.classList.add('hidden');
    gamesListView.classList.remove('hidden');
  });
}

const notifBtn = document.getElementById('btn-notifications');
if (notifBtn) {
  notifBtn.addEventListener('click', () => {
    const toggle = notifBtn.querySelector('.toggle-switch');
    toggle.classList.toggle('active');
  });
}

const logoutBtn = document.getElementById('btn-logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    authView.classList.remove('hidden');
    void authView.offsetWidth;
    authView.style.opacity = '1';

    navBar.style.opacity = '0';

    authNameInput.value = '';
    authTeamInput.value = '';

    document.getElementById('profile-name').textContent = 'John Doe';
    document.querySelector('.profile-avatar').textContent = 'JD';
    document.getElementById('profile-team').textContent = 'LSU Tigers >';
    learnedTerms.clear();

    switchTab('games');
  });
}

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/* User Stats Logic */
const learnedTerms = new Set();

function trackTermLearned(term) {
  if (!learnedTerms.has(term)) {
    learnedTerms.add(term);
    const termStat = document.getElementById('profile-terms');
    if (termStat) termStat.textContent = learnedTerms.size;
  }
}

/* =========================================
   6. GAME CLOCK LOGIC (NEW)
   ========================================= */

const timeDisplay = document.querySelector('.time');
let gameMinutes = 6;
let gameSeconds = 5;

function updateClock() {
  gameSeconds--;

  // If seconds drop below 0, roll over to 59 and decrease minute
  if (gameSeconds < 0) {
    gameSeconds = 59;
    gameMinutes--;
  }

  // If minutes drop below 0, stop the game
  if (gameMinutes < 0) {
    clearInterval(clockTimer);
    if (timeDisplay) timeDisplay.textContent = "0:00";
    return;
  }

  // Format seconds to always have two digits (e.g. "09" not "9")
  const formattedSeconds = gameSeconds < 10 ? `0${gameSeconds}` : gameSeconds;

  // Update screen only if the element exists
  if (timeDisplay) timeDisplay.textContent = `${gameMinutes}:${formattedSeconds}`;
}

// Start the clock updates
const clockTimer = setInterval(updateClock, 1000);
