const words = {
  greetings: [
    { emoji: '👋', label: 'Hello' },
    { emoji: '👋', label: 'Goodbye' },
    { emoji: '🙏', label: 'Please' },
    { emoji: '🙏', label: 'Thank you' },
    { emoji: '😊', label: 'Yes' },
    { emoji: '🚫', label: 'No' },
    { emoji: '❓', label: 'Help' },
    { emoji: '🔄', label: 'Again' },
    { emoji: '⏸️', label: 'Wait' },
    { emoji: '👂', label: 'Listen' }
  ],
  feelings: [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😰', label: 'Scared' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '🤗', label: 'Loved' },
    { emoji: '😖', label: 'Frustrated' },
    { emoji: '😆', label: 'Silly' },
    { emoji: '😐', label: 'Calm' },
    { emoji: '🤒', label: 'Sick' }
  ],
  food: [
    { emoji: '🍕', label: 'Pizza' },
    { emoji: '🍔', label: 'Burger' },
    { emoji: '🍝', label: 'Pasta' },
    { emoji: '🍚', label: 'Rice' },
    { emoji: '🥗', label: 'Salad' },
    { emoji: '🍗', label: 'Chicken' },
    { emoji: '🥞', label: 'Pancakes' },
    { emoji: '🍿', label: 'Snack' },
    { emoji: '🍦', label: 'Ice cream' },
    { emoji: '🍎', label: 'Apple' },
    { emoji: '🍌', label: 'Banana' },
    { emoji: '🍪', label: 'Cookie' }
  ],
  drinks: [
    { emoji: '🥛', label: 'Milk' },
    { emoji: '🧃', label: 'Juice' },
    { emoji: '💧', label: 'Water' },
    { emoji: '☕', label: 'Tea' },
    { emoji: '🥤', label: 'Smoothie' },
    { emoji: '🍵', label: 'Hot cocoa' }
  ],
  activities: [
    { emoji: '🎮', label: 'Play' },
    { emoji: '📖', label: 'Read' },
    { emoji: '🎨', label: 'Draw' },
    { emoji: '🎵', label: 'Music' },
    { emoji: '🏃', label: 'Run' },
    { emoji: '🏊', label: 'Swim' },
    { emoji: '🖍️', label: 'Color' },
    { emoji: '🧩', label: 'Puzzle' },
    { emoji: '📺', label: 'TV' },
    { emoji: '🛏️', label: 'Sleep' },
    { emoji: '🛀', label: 'Bath' },
    { emoji: '🚴', label: 'Bike' }
  ],
  people: [
    { emoji: '👩', label: 'Mom' },
    { emoji: '👨', label: 'Dad' },
    { emoji: '👧', label: 'Sister' },
    { emoji: '👦', label: 'Brother' },
    { emoji: '👵', label: 'Grandma' },
    { emoji: '👴', label: 'Grandpa' },
    { emoji: '👩‍🏫', label: 'Teacher' },
    { emoji: '👩‍⚕️', label: 'Doctor' },
    { emoji: '🤝', label: 'Friend' },
    { emoji: '👶', label: 'Baby' }
  ],
  places: [
    { emoji: '🏠', label: 'Home' },
    { emoji: '🏫', label: 'School' },
    { emoji: '🏥', label: 'Hospital' },
    { emoji: '🛒', label: 'Store' },
    { emoji: '🌳', label: 'Park' },
    { emoji: '🏊', label: 'Pool' },
    { emoji: '📚', label: 'Library' },
    { emoji: '⛪', label: 'Church' }
  ],
  body: [
    { emoji: '🤚', label: 'Hand' },
    { emoji: '🦶', label: 'Foot' },
    { emoji: '👀', label: 'Eyes' },
    { emoji: '👂', label: 'Ears' },
    { emoji: '👃', label: 'Nose' },
    { emoji: '👄', label: 'Mouth' },
    { emoji: '🦷', label: 'Teeth' },
    { emoji: '🦵', label: 'Leg' },
    { emoji: '💪', label: 'Arm' },
    { emoji: '🖐️', label: 'Fingers' }
  ],
  colors: [
    { emoji: '🟥', label: 'Red' },
    { emoji: '🟦', label: 'Blue' },
    { emoji: '🟩', label: 'Green' },
    { emoji: '🟨', label: 'Yellow' },
    { emoji: '🟧', label: 'Orange' },
    { emoji: '🟪', label: 'Purple' },
    { emoji: '⬜', label: 'White' },
    { emoji: '⬛', label: 'Black' },
    { emoji: '🟫', label: 'Brown' },
    { emoji: '🩷', label: 'Pink' }
  ],
  numbers: [
    { emoji: '1️⃣', label: 'One' },
    { emoji: '2️⃣', label: 'Two' },
    { emoji: '3️⃣', label: 'Three' },
    { emoji: '4️⃣', label: 'Four' },
    { emoji: '5️⃣', label: 'Five' },
    { emoji: '6️⃣', label: 'Six' },
    { emoji: '7️⃣', label: 'Seven' },
    { emoji: '8️⃣', label: 'Eight' },
    { emoji: '9️⃣', label: 'Nine' },
    { emoji: '🔟', label: 'Ten' },
    { emoji: '🔢', label: 'More' },
    { emoji: '📏', label: 'Big' },
    { emoji: '📐', label: 'Small' }
  ]
};

let currentSentence = [];
let currentCategory = 'greetings';
let speechSynth = window.speechSynthesis;

function renderGrid(category) {
  const grid = document.getElementById('wordGrid');
  const items = words[category];
  if (!items) return;

  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `
      <span class="emoji">${item.emoji}</span>
      <span class="label">${item.label}</span>
    `;
    card.addEventListener('click', () => addWord(item));
    grid.appendChild(card);
  });
}

function addWord(item) {
  currentSentence.push(item);
  updateSentenceBar();
  speakText(item.label);
}

function updateSentenceBar() {
  const el = document.getElementById('sentenceText');
  if (currentSentence.length === 0) {
    el.innerHTML = '';
    return;
  }
  el.innerHTML = currentSentence.map(w =>
    `<span class="word-tag">${w.emoji} ${w.label}</span>`
  ).join(' ');
}

function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.85;
  utter.pitch = 1.1;
  const voices = speechSynth.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en'));
  if (preferred) utter.voice = preferred;
  speechSynth.speak(utter);
}

function speakSentence() {
  if (currentSentence.length === 0) return;
  const text = currentSentence.map(w => w.label).join(' ');
  speakText(text);
}

function clearSentence() {
  currentSentence = [];
  updateSentenceBar();
  window.speechSynthesis.cancel();
}

document.addEventListener('DOMContentLoaded', () => {
  renderGrid('greetings');

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      renderGrid(currentCategory);
    });
  });

  document.getElementById('speakBtn').addEventListener('click', speakSentence);
  document.getElementById('clearBtn').addEventListener('click', clearSentence);

  if (window.speechSynthesis) {
    speechSynth.getVoices();
    speechSynth.onvoiceschanged = () => speechSynth.getVoices();
  }
});