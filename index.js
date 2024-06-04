// Fix: when to cards has matched and two others didn't they don't unflip themselves (flippingCounter problem)
// TODO: Remove matching-cards class

const cardsContainer = document.querySelector(".game");
const cardsElements = document.querySelectorAll(".card");
const scoreElement = document.getElementById("score");
const failedTriesElement = document.getElementById("failed-attempts");
let flippingCounter = 0;
let score = 0;
let failedTries = 0;

console.log(cardsContainer);

const unflipCards = () => {
	const flippedCards = document.querySelectorAll(".flipped-card");
	for (let i = 0; i < flippedCards.length; i++) {
		setTimeout(() => {
			flippedCards[i].classList.value = "card";

			flippedCards[i].innerHTML = "";
			flippingCounter = 0;
		}, 300);
		// flippedCards[i].addEventListener("click", () => {
		// 	flippingCounter = 0;
		// });
	}
};

const didCardsMatched = (img, format) => {
	const flippedCards = document.querySelectorAll(".flipped-card");
	for (let i = 0; i < flippedCards.length; i++) {
		if (flippedCards[i].id == flippedCards[i + 1].id) {
			score++;
			scoreElement.textContent = `Score : ${score}`;
			flippedCards[i].addEventListener("click", () => {
				flippedCards[
					i
				].innerHTML = `<img src="./img/${flippedCards[i].id}.jpg" alt="${flippedCards[i].id}"/>`;
				flippedCards[i].classList.remove("flipped-card");
			});
		} else {
			failedTries++;
			failedTriesElement.textContent = `Failed attempts : ${failedTries}`;
		}
	}
	flippingCounter = 0;
};

for (let i = 0; i < cardsContainer.children.length; i++) {
	const cardElement = cardsContainer.children[i];
	console.log(cardElement);

	const addCardLogic = (img) => {
		cardElement.id = img;

		// cardElement.classList.toggle("flipped-card");
	};

	if (i == 0 || i == 1) {
		addCardLogic("ninja");
	} else if (i == 2 || i == 3) {
		addCardLogic("car");
	} else if (i == 4 || i == 5) {
		addCardLogic("football");
	}
}

for (let i = 0; i < cardsContainer.children.length; i++) {
	const cardElement = cardsContainer.children[i];
	cardElement.addEventListener("click", () => {
		cardElement.classList.toggle("flipped-card");
		if (flippingCounter === 2) {
			didCardsMatched();
		} else if (flippingCounter >= 2) {
			// flippingCounter = 0;
			// cardElement.innerHTML = "";
			unflipCards();
			console.log(flippingCounter);
		} else {
			if (cardElement.hasChildNodes()) {
				flippingCounter--;
				cardElement.innerHTML = "";
				console.log(flippingCounter);
			} else {
				flippingCounter++;
				console.log(flippingCounter);
				switch (cardElement.id) {
					case "ninja":
						cardElement.innerHTML = `<img src="./img/ninja.png" alt="ninja"/>`;
						break;

					case "car":
						cardElement.innerHTML = `<img src="./img/car.jpg" alt="car"/>`;
						break;
					case "football":
						cardElement.innerHTML = `<img src="./img/football.jpg" alt="football"/>`;
						break;
				}
			}
		}
	});
}
