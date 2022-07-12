let header;
let startingBoard;
let startBtn;
let allCards;
let clickedCardID = [];
let firstCard = [];
let gameActivSection;
let movesCount;
let movesCounterText;
let countTime;
let timeCounter;
let seconds;
let minutes;
let clientWidth;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	headerTop = document.querySelector(".header-top");
	startingBoard = document.querySelector(".starting-board");
	startBtn = document.querySelector(".start-btn");
	allCards = document.querySelectorAll(".game-card");
	gameActivSection = document.querySelector(".game-active");
	movesCount = 0;
	movesCounterText = document.querySelector(".moves-counter");
	timeCounter = document.querySelector(".time-counter");
	seconds = 0;
	minutes = 0;
	clientWidth = document.documentElement.clientWidth;
	console.log(clientWidth);
};

const prepareDOMEvents = () => {
	startBtn.addEventListener("click", gameStart);
	allCards.forEach(card => card.addEventListener("click", checkMatch));
};

const gameStart = () => {
	startingBoard.classList.add("game-start-animation");
	setTimeout(headerStartAnimation, 450);
	setTimeout(gameBoardActivation, 1250);
	setTimeout(timeStart, 1000);
	allCards.forEach(cardsShuffle)
};

const gameBoardActivation = () => {
	gameActivSection.style.zIndex = "3";
};

const headerStartAnimation = () => {
	headerTop.classList.add("header-game-active");
};

const checkMatch = e => {
	clickedCardID.push(e.target.id);
	e.target.style.pointerEvents = "none";
	const clickedCardReverse = e.target.childNodes[1];
	const clickedCardObverse = e.target.childNodes[3];
	movesCount++;
	movesCounterText.textContent = `${movesCount}`;

	if (clickedCardID.length === 1) {
		firstCard.push(e.target);
		clickedCardReverse.classList.add("selected-reverse");
		clickedCardObverse.classList.add("selected-obverse");
	} else {
		clickedCardReverse.classList.add("selected-reverse");
		clickedCardObverse.classList.add("selected-obverse");
		allCards.forEach(card => (card.style.pointerEvents = "none"));

		if (firstCard[0].id === e.target.id) {
			e.target.classList.add("card-match");
			firstCard[0].classList.add("card-match");
			clickedCardID = [];
			firstCard = [];
			allCards.forEach(card => (card.style.pointerEvents = ""));
		} else {
			setTimeout(clear, 700, e);
		}
	}
};

const clear = e => {
	const clickedCardReverse = e.target.childNodes[1];
	const clickedCardObverse = e.target.childNodes[3];
	clickedCardReverse.classList.remove("selected-reverse");
	clickedCardObverse.classList.remove("selected-obverse");
	firstCard[0].childNodes[1].classList.remove("selected-reverse");
	firstCard[0].childNodes[3].classList.remove("selected-obverse");
	clickedCardID = [];
	firstCard = [];
	allCards.forEach(card => (card.style.pointerEvents = ""));
};

const cardsShuffle = (card) => {
if (card.id < 11) {
	card.style.display = 'flex'
}
		}
	

	


const timeStart = () => {
	clearInterval(countTime);

	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++;
			timeCounter.textContent = `${minutes}:0${seconds}`;
		} else if (seconds >= 9 && seconds < 59) {
			seconds++;
			timeCounter.textContent = `${minutes}:${seconds}`;
		} else {
			minutes++;
			seconds = 0;
			timeCounter.textContent = `${minutes}:00`;
		}
	}, 300);
};

document.addEventListener("DOMContentLoaded", main);
