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

// mock data for the live feed
// notes are for when you hover over something specific and you will be able
// see more details ( the contextual portion - to be implemented)
const mockPlays = [
  {
    title: "1st & 10 @ LSU 25 (10:05 1Q)",
    details: "J. Daniels pass complete to M. Thomas to the left for 15 yards.",
    notes: [
      {
        label: "YAC",
        value: "8 yards after catch — Thomas broke a tackle near the sideline."
      }
    ]
  },
  {
    title: "1st & 10 @ LSU 40 (9:40 1Q)",
    details: "J. Emery rush up the middle for 6 yards. Tackled by #94 T. Johnson.",
    notes: []
  },
  {
    title: "2nd & 4 @ LSU 46 (9:10 1Q)",
    details: "Play-action pass. J. Daniels scrambles right for 8 yards and steps out of bounds.",
    notes: [
      {
        label: "Scramble",
        value: "No receivers open; Daniels gained 8 yards with his legs."
      }
    ]
  },
  {
    title: "1st & 10 @ WKU 46 (8:50 1Q)",
    details: "J. Daniels pass complete to B. Nabers on a slant for 12 yards. First down LSU.",
    notes: [
      {
        label: "YAC",
        value: "5 yards after catch — Nabers turned upfield quickly through a gap."
      }
    ]
  },
  {
    title: "1st & 10 @ WKU 34 (8:10 1Q)",
    details: "Penalty: Holding, Offense #68 (10 yards).",
    notes: [
      {
        label: "Penalty",
        value: "Left guard was flagged for holding the defender during a rush attempt."
      }
    ]
  },
  {
    title: "1st & 20 @ WKU 44 (8:00 1Q)",
    details: "J. Emery rush up the middle for 7 yards. Tackled at the WKU 37.",
    notes: []
  },
  {
    title: "2nd & 13 @ WKU 37 (7:25 1Q)",
    details: "J. Daniels pass complete to B. Nabers for 14 yards. First down LSU.",
    notes: [
      {
        label: "YAC",
        value: "10 yards after catch — Nabers made two defenders miss on the way to the marker."
      }
    ]
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
    notes: [
      {
        label: "Play Design",
        value: "Fade route to isolate Thomas one-on-one against the corner."
      }
    ]
  },
  {
    title: "EXTRA POINT (6:05 1Q)",
    details: "K. Ramos kick is GOOD. LSU leads 7-0.",
    notes: []
  }
];



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
  if (existingModal) {
    existingModal.remove();
  }

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
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
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
const playInterval = setInterval(addNextPlay, 5000);


/* navigation + guide */

const navGames = document.getElementById('nav-games');
const navGuide = document.getElementById('nav-guide');
const navProfile = document.getElementById('nav-profile');

const liveFeedContainer = document.getElementById('live-feed-container');
const guideView = document.getElementById('guide-view');
const feedHeader = document.querySelector('.feed-header');

function switchTab(tab) {
  navGames.classList.remove('active');
  navGuide.classList.remove('active');
  navProfile.classList.remove('active');
  liveFeedContainer.classList.add('hidden');
  guideView.classList.add('hidden');
  feedHeader.classList.add('hidden');

  if (tab === 'games') {
    navGames.classList.add('active');
    liveFeedContainer.classList.remove('hidden');
    feedHeader.classList.remove('hidden');
  } else if (tab === 'guide') {
    navGuide.classList.add('active');
    guideView.classList.remove('hidden');
    renderGuide();
  } else if (tab === 'profile') {
    navProfile.classList.add('active');
  }
}

navGames.addEventListener('click', (e) => {
  e.preventDefault();
  switchTab('games');
});

navGuide.addEventListener('click', (e) => {
  e.preventDefault();
  switchTab('guide');
});

navProfile.addEventListener('click', (e) => {
  e.preventDefault();
  switchTab('profile');
});

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
/* --- GAME CLOCK LOGIC --- */

// 1. Select the time element from the HTML
const timeDisplay = document.querySelector('.time');

// 2. Set the starting time (Matches your HTML "6:05")
let gameMinutes = 6;
let gameSeconds = 5;

function updateClock() {
  // Decrease seconds by 1
  gameSeconds--;

  // If seconds hit less than 0, restart seconds at 59 and lower the minute
  if (gameSeconds < 0) {
    gameSeconds = 59;
    gameMinutes--;
  }

  // If the clock finishes (0:00), stop the timer
  if (gameMinutes < 0) {
    clearInterval(clockTimer);
    timeDisplay.textContent = "0:00"; // Force display to 0:00
    return;
  }

  // Formatting: Add a "0" in front if seconds are single digit (e.g., "5:09" instead of "5:9")
  const formattedSeconds = gameSeconds < 10 ? `0${gameSeconds}` : gameSeconds;

  // Update the text on the screen
  timeDisplay.textContent = `${gameMinutes}:${formattedSeconds}`;
}

// 3. Start the interval (Run the function every 1000 milliseconds / 1 second)
const clockTimer = setInterval(updateClock, 1000);
