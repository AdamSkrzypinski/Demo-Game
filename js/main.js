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
let progressPercent;
let progressPercentText;
let matchCounter;
let clientWidth;
let cardAmount;
let cardOrder;

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
	progressPercentText = document.querySelector(".progress-counter");
	progressPercent = 0;
	matchCounter = 0;
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
	allCards.forEach(cardsShuffle);
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
			matchCounter++;
			progressPercent = (matchCounter / cardAmount) * 100;
			progressPercentText.textContent = Math.round(progressPercent) + '%';
		} else {
			setTimeout(clear, 500, e);
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

const checkResolution = () => {
	if (clientWidth < 400) {
		cardAmount = 8;
	} else if (clientWidth > 400 && clientWidth < 600) {
		cardAmount = 10;
	} else if (clientWidth > 600 && clientWidth < 800) {
		cardAmount = 12;
	} else {
		cardAmount = 16;
	}
};

const cardsShuffle = card => {
	checkResolution();
	console.log(cardAmount);
	cardOrder = Math.random() * 1000;
	console.log(cardOrder);
	if (card.id <= cardAmount) {
		card.style.display = "flex";
		card.style.order = Math.round(cardOrder);
	}
};

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
	}, 1000);
};

document.addEventListener("DOMContentLoaded", main);
