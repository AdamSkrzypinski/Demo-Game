let header;
let startingBoard;
let startBtn;
let allCards;
let clickedCardID = [];
let firstCard = [];
let gameActivSection;
let movesCount;
let movesCounterText;

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
	movesCounterText = document.querySelector('.moves-counter')
};

const prepareDOMEvents = () => {
	startBtn.addEventListener("click", gameStart);
	allCards.forEach(card => card.addEventListener("click", checkMatch));
};

const gameStart = () => {
	startingBoard.classList.add("game-start-animation");
	setTimeout(headerStartAnimation, 450);
	setTimeout(gameBoardActivation, 1250);
};

const gameBoardActivation = () => {
	gameActivSection.style.zIndex = "3";
};

const headerStartAnimation = () => {
	headerTop.classList.add("header-game-active");
};

const checkMatch = e => {
	clickedCardID.push(e.target.id);
	e.target.style.pointerEvents = 'none'
	const clickedCardReverse = e.target.childNodes[1];
	const clickedCardObverse = e.target.childNodes[3];
	movesCount++
	movesCounterText.textContent = `${movesCount}`
	

	if (clickedCardID.length === 1) {
		firstCard.push(e.target);
		clickedCardReverse.classList.add("selected-reverse");
		clickedCardObverse.classList.add("selected-obverse");
	} else {
		clickedCardReverse.classList.add("selected-reverse");
		clickedCardObverse.classList.add("selected-obverse");

		if (firstCard[0].id === e.target.id) {
			e.target.classList.add("card-match");
			firstCard[0].classList.add("card-match");
			clickedCardID = [];
			firstCard = [];
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
	allCards.forEach(card => card.style.pointerEvents = '')
};

document.addEventListener("DOMContentLoaded", main);
