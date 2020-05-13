let Openedcards = [];
let matched = 0;
let countClicks = 0;

const deck = document.querySelector('#cards');
let cards = [...deck.getElementsByClassName('card')]
const reload = document.querySelector('.restart');
const nextCard = document.querySelector('#next-card');
const score = document.querySelector('#score');
let allCards = ['fas fa-frog', 'fas fa-atom', 'fas fa-feather', 'fas fa-cogs', 'fas fa-anchor', 'fas fa-fan', 'fas fa-bolt', 'fas fa-hat-wizard', 'fas fa-apple-alt', 'fas fa-bell', 'fas fa-bomb', 'fas fa-brain'];
let availableCards = ['fas fa-frog', 'fas fa-atom', 'fas fa-feather', 'fas fa-cogs', 'fas fa-anchor', 'fas fa-fan', 'fas fa-bolt', 'fas fa-hat-wizard', 'fas fa-apple-alt', 'fas fa-bell', 'fas fa-bomb', 'fas fa-brain'];

deck.addEventListener('click', flipCard, true);
reload.addEventListener('click', restartGame);

let shuffle = function (array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

restartGame();

function flipCard(event) {
  event.preventDefault()
  let target = event.target;
  if (target.classList.contains('card') && !target.classList.contains('show')) {
    target.classList.add('open', 'show');
    console.log(allCards);
    Openedcards.push(target);
    match();
  }
}

function closeCard(card) {
  setTimeout(function () {
    card.classList.remove('open', 'show');
  }, 1000);
}

function matchCard(card) {
  setTimeout(function () {
    card.classList.add('matched');
  }, 1000);
  matched++;
  availableCards.pop();
}

function match() {
  const firstCard = Openedcards[0];

  if (Openedcards.length === 1) {
    if (firstCard.children[0].classList.toString() === nextCard.children[0].classList.toString()) {

      matchCard(firstCard);
      changeCard();
    } else {
      closeCard(firstCard);
    }
    countClicks++;
    score.textContent = countClicks;
    Openedcards = [];
    win();
  }

}

function changeCard() {
  availableCards = shuffle(availableCards);
  setTimeout(function () {
    availableCards.forEach((card, index) => {
      nextCard.children[0].className = "";
      nextCard.children[0].classList = availableCards[index];
    });
  }, 800);

}

function restartGame() {
  OpenedCards = [];
  countClicks = 0;
  changeCard();

  allCards = shuffle(allCards);
  cards.forEach((card, index) => {
    card.classList.remove('open', 'show', 'matched');
    card.children[0].className = '';
    card.children[0].classList = allCards[index];
  });
}

function win() {
  if (matched === 12) {
    alert('You Win');
  }
}


