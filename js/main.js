let header;
let startingBoard;
let startBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	headerTop = document.querySelector(".header-top");
	startingBoard = document.querySelector(".starting-board");
	startBtn = document.querySelector(".start-btn");
    console.log(headerTop);
};

const prepareDOMEvents = () => {
	startBtn.addEventListener("click", gameStart);
};

const gameStart = () => {
	startingBoard.classList.add("game-in-progress");
    setTimeout(headerStartAnimation, 450)
};

const headerStartAnimation = () => {
	headerTop.classList.add("header-game-active");
};

document.addEventListener("DOMContentLoaded", main);


