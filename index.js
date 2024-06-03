// Fix: when to cards has matched and two others didn't they don't unflip themselves (flippingCounter problem)
// TODO: Remove matching-cards class

const cardsElements = document.querySelectorAll(".card");
const scoreElement = document.getElementById("score");
const failedTriesElement = document.getElementById("failed-attempts");
let flippingCounter = 0;
let score = 0;
let failedTries = 0;

const unflipCards = () => {
	const flippedCards = document.querySelectorAll(".flipped-card");
	for (let i = 0; i < flippedCards.length; i++) {
		setTimeout(() => {
			flippedCards[i].classList.value = "card";
			if (flippedCards[i].hasChildNodes()) {
				flippedCards[i].firstChild.remove();
				flippingCounter = 0;
			}
		}, 500);
		// flippedCards[i].addEventListener("click", () => {
		// 	flippingCounter = 0;
		// });
	}
};

const cardsHasMatched = (img, format) => {
	const flippedCards = document.querySelectorAll(".flipped-card");
	for (let i = 0; i < flippedCards.length; i++) {
		flippedCards[i].addEventListener("click", () => {
			flippedCards[i].classList.remove("flipped-card");
			flippedCards[
				i
			].innerHTML = `<img src="./img/${img}.${format}" alt="${img}" id="${img}"/>`;
		});
		flippedCards[i].classList.value = "card matching-cards";
		flippingCounter = 0;
	}
};

for (let i = 0; i < cardsElements.length; i++) {
	const cardElement = cardsElements[i];

	const addCardLogic = (img, format) => {
		cardElement.addEventListener("click", () => {
			if (cardElement.hasChildNodes()) {
				cardElement.removeChild(cardElement.firstChild);
				flippingCounter--;
			} else {
				cardElement.innerHTML = `<img src="./img/${img}.${format}" alt="${img}" id="${img}"/>`;
				flippingCounter++;
			}
			cardElement.classList.toggle("flipped-card");

			if (flippingCounter == 2) {
				const flippedCards = document.querySelectorAll(".flipped-card");
				if (flippedCards[0].firstChild.id == flippedCards[1].firstChild.id) {
					score++;
					scoreElement.textContent = `Score : ${score}`;
					cardsHasMatched(img, format);
					flippingCounter = 0;
				} else {
					failedTries++;
					failedTriesElement.textContent = `Failed attempts : ${failedTries}`;
					unflipCards();
					flippingCounter = 0;
				}
			}
		});
	};

	if (i == 0 || i == 1) {
		addCardLogic("ninja", "png");
	} else if (i == 2 || i == 3) {
		addCardLogic("car", "jpg");
	} else {
		addCardLogic("football", "jpg");
	}
}
