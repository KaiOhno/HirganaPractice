let hiragana = [
  { symbol: 'あ', romaji: 'a' },
  { symbol: 'い', romaji: 'i' },
  { symbol: 'う', romaji: 'u' },
  { symbol: 'え', romaji: 'e' },
  { symbol: 'お', romaji: 'o' },
  { symbol: 'か', romaji: 'ka' },
  { symbol: 'き', romaji: 'ki' },
  { symbol: 'く', romaji: 'ku' },
  { symbol: 'け', romaji: 'ke' },
  { symbol: 'こ', romaji: 'ko' },
  { symbol: 'さ', romaji: 'sa' },
  { symbol: 'し', romaji: 'shi' },
  { symbol: 'す', romaji: 'su' },
  { symbol: 'せ', romaji: 'se' },
  { symbol: 'そ', romaji: 'so' },
  { symbol: 'た', romaji: 'ta' },
  { symbol: 'ち', romaji: 'chi' },
  { symbol: 'つ', romaji: 'tsu' },
  { symbol: 'て', romaji: 'te' },
  { symbol: 'と', romaji: 'to' },
  { symbol: 'な', romaji: 'na' },
  { symbol: 'に', romaji: 'ni' },
  { symbol: 'ぬ', romaji: 'nu' },
  { symbol: 'ね', romaji: 'ne' },
  { symbol: 'の', romaji: 'no' },
  { symbol: 'は', romaji: 'ha' },
  { symbol: 'ひ', romaji: 'hi' },
  { symbol: 'ふ', romaji: 'fu' },
  { symbol: 'へ', romaji: 'he' },
  { symbol: 'ほ', romaji: 'ho' },
  { symbol: 'ま', romaji: 'ma' },
  { symbol: 'み', romaji: 'mi' },
  { symbol: 'む', romaji: 'mu' },
  { symbol: 'め', romaji: 'me' },
  { symbol: 'も', romaji: 'mo' },
  { symbol: 'や', romaji: 'ya' },
  { symbol: 'ゆ', romaji: 'yu' },
  { symbol: 'よ', romaji: 'yo' },
  { symbol: 'ら', romaji: 'ra' },
  { symbol: 'り', romaji: 'ri' },
  { symbol: 'る', romaji: 'ru' },
  { symbol: 'れ', romaji: 're' },
  { symbol: 'ろ', romaji: 'ro' },
  { symbol: 'わ', romaji: 'wa' },
  { symbol: 'を', romaji: 'wo' },
  { symbol: 'ん', romaji: 'n' },
];

let categories = [
  { id: 'a-category', symbols: ['あ', 'い', 'う', 'え', 'お'] },
  { id: 'ka-category', symbols: ['か', 'き', 'く', 'け', 'こ'] },
  { id: 'sa-category', symbols: ['さ', 'し', 'す', 'せ', 'そ'] },
  { id: 'ta-category', symbols: ['た', 'ち', 'つ', 'て', 'と'] },
  { id: 'na-category', symbols: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { id: 'ha-category', symbols: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { id: 'ma-category', symbols: ['ま', 'み', 'む', 'め', 'も'] },
  { id: 'ya-category', symbols: ['や', 'ゆ', 'よ'] },
  { id: 'ra-category', symbols: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { id: 'wa-category', symbols: ['わ', 'を', 'ん'] },
  // Additional categories
  { id: 'ga-category', symbols: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  { id: 'za-category', symbols: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  { id: 'da-category', symbols: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
  { id: 'ba-category', symbols: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  { id: 'pa-category', symbols: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },
];

// Rest of the code...
let performance = hiragana.map(k => ({ ...k, incorrect: 0 }));

let streak = 0;
let correct = 0;
let incorrect = 0;

let streakCounter = document.getElementById('streak');
let correctCounter = document.getElementById('correct');
let incorrectCounter = document.getElementById('incorrect');
let correctPercent = document.getElementById('correct-percent');
let incorrectPercent = document.getElementById('incorrect-percent');

let regenerateButton = document.getElementById('regenerate');

regenerateButton.addEventListener('click', function () {
  grid.innerHTML = '';
  generateGrid();
});

function checkAnswer(input, cell, romajiDiv, k) {
  if (input.value === k.romaji) {
    cell.style.backgroundColor = 'green';
    streak++;
    correct++;
  } else {
    cell.style.backgroundColor = 'red';
    performance.find(x => x.symbol === k.symbol).incorrect++;
    streak = 0;
    incorrect++;
  }

  input.disabled = true; // Disable further input once answered
  updateScores();
}

function updateScores() {
  streakCounter.innerText = 'Streak: ' + streak;
  correctCounter.innerText = 'Correct: ' + correct;
  incorrectCounter.innerText = 'Incorrect: ' + incorrect;

  let totalAttempts = correct + incorrect;
  correctPercent.innerText =
    'Correct: ' + ((correct / totalAttempts) * 100).toFixed(2) + '%';
  incorrectPercent.innerText =
    'Incorrect: ' + ((incorrect / totalAttempts) * 100).toFixed(2) + '%';
}

let grid = document.getElementById('hiragana-grid');

function generateGrid() {
  let selectedCategories = categories.filter(
    category => document.getElementById(category.id).checked
  );
  let selectedSymbols = selectedCategories.flatMap(
    category => category.symbols
  );
  let selectedHiragana = [];

  selectedCategories.forEach(category => {
    const shuffledSymbols = shuffleArray(category.symbols);
    selectedHiragana = selectedHiragana.concat(
      shuffledSymbols.map(symbol => hiragana.find(k => k.symbol === symbol))
    );
  });

  selectedHiragana.forEach((k, index) => {
    let cell = document.createElement('div');
    cell.classList.add('hiragana-cell');

    let symbolDiv = document.createElement('div');
    symbolDiv.innerText = k.symbol;
    cell.appendChild(symbolDiv);

    let romajiDiv = document.createElement('div');
    cell.appendChild(romajiDiv);

    let input = document.createElement('input');
    input.type = 'text';
    cell.appendChild(input);

    cell.addEventListener('click', function () {
      if (cell.style.backgroundColor === 'red') {
        cell.style.backgroundColor = '#FFA500';
        romajiDiv.innerText = ' (' + k.romaji + ')';
      }
      input.focus(); // Automatically focus on the input when clicked
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        checkAnswer(input, cell, romajiDiv, k);
        const nextIndex = index + 1;
        if (nextIndex < selectedHiragana.length) {
          selectedHiragana[nextIndex].cell.querySelector('input').focus();
        }
      }
    });

    grid.appendChild(cell);

    // Set focus on the first input box by default
    if (index === 0) {
      input.focus();
    }
  });
}

function shuffleArray(array, level) {
  const totalShuffles = Math.floor(array.length * level);

  for (let i = 0; i < totalShuffles; i++) {
    const randomIndex1 = Math.floor(Math.random() * array.length);
    const randomIndex2 = Math.floor(Math.random() * array.length);

    [array[randomIndex1], array[randomIndex2]] = [
      array[randomIndex2],
      array[randomIndex1],
    ];
  }

  return array;
}

document.addEventListener('DOMContentLoaded', event => {
  const inputs = Array.from(document.querySelectorAll('.hiragana-cell input'));

  inputs.forEach((input, index) => {
    input.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        // Check if enter was pressed
        e.preventDefault(); // Prevent the default action
        this.style.display = 'none'; // Hide the current input
        if (index < inputs.length - 1) {
          // If it's not the last input
          inputs[index + 1].focus(); // Move the focus to the next input
        }
      }
    });
  });
});

regenerateButton.addEventListener('click', function () {
  // Resetting the grid and scores when regenerated
  grid.innerHTML = '';
  performance = hiragana.map(k => ({ ...k, incorrect: 0 }));
  streak = 0;
  correct = 0;
  incorrect = 0;
  updateScores();
  generateGrid();
});

generateGrid();
