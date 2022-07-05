let header;
let startingBoard;
let startBtn;
let allCards;
let clickedCardID = [];
let firstCard = [];
let gameActivSection;

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
	console.log(allCards);
};

const prepareDOMEvents = () => {
	startBtn.addEventListener("click", gameStart);
	allCards.forEach(card => card.addEventListener("click", checkMatch));
};

const gameStart = () => {
	startingBoard.classList.add("game-start-animation");
	setTimeout(headerStartAnimation, 450);
	setTimeout(gameBoardActivatio, 1250);
};

const gameBoardActivatio = () => {
	gameActivSection.style.zIndex = "3";
};

const headerStartAnimation = () => {
	headerTop.classList.add("header-game-active");
};

const checkMatch = e => {
	clickedCardID.push(e.target.id);
	const clickedCardReverse = e.target.childNodes[1];
	const clickedCardObverse = e.target.childNodes[3];

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
};

document.addEventListener("DOMContentLoaded", main);
