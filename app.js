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

// creates a card element for each play
function createPlayCard(playData) {
  const card = document.createElement("div");
  card.classList.add("feed-card");
  card.innerHTML = `
    <h3>${playData.title}</h3>
    <p>${playData.details}</p>
  `;

  return card;
}

// adds the next play to the feed
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
// simulated live feed update every 5 seconds, can change for more realism
const playInterval = setInterval(addNextPlay, 5000);

/* to implement:
- hover functionality to show notes (contextual portion)
- add scroll functionality
- fix navbar
- more plays
- functionality to pause/resume feed
- better styling/ui
- different tabs, games, guide profile, etc..


*/