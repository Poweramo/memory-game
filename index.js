// Fix: when to cards has matched and two others didn't they don't unflip themselves (flippingCounter problem)
// TODO: Remove matching-cards class

const cardsContainer = document.querySelector(".game");
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
	if (flippedCards.length > 2) {
		for (let i = 0; i < flippedCards.length; i++) {
			flippedCards[i].innerHTML = "";
			flippedCards[i].classList.remove("flipped-card");
		}
	} else {
		if (flippedCards.length == 2) {
			if (flippedCards[0].id == flippedCards[1].id) {
				for (let i = 0; i < flippedCards.length; i++) {
					flippedCards[
						i
					].innerHTML = `<img src="./img/${flippedCards[i].id}.jpg" alt="${flippedCards[i].id}"/>`;
					flippedCards[i].classList.remove("flipped-card");
					flippedCards[i].addEventListener("click", () => {
						flippedCards[
							i
						].innerHTML = `<img src="./img/${flippedCards[i].id}.jpg" alt="${flippedCards[i].id}"/>`;
						flippedCards[i].classList.remove("flipped-card");
					});
					flippedCards[i].classList.add("matching-cards");
				}
				score++;
				scoreElement.textContent = `Score : ${score}`;
			} else {
				failedTries++;
				failedTriesElement.textContent = `Failed attempts : ${failedTries}`;
				for (let i = 0; i < flippedCards.length; i++) {
					setTimeout(() => {
						flippedCards[i].innerHTML = "";
						flippedCards[i].classList.remove("flipped-card");
					}, 300);
				}
			}
		}
	}
};

for (let i = 0; i < cardsContainer.children.length; i++) {
	const cardElement = cardsContainer.children[i];

	const addCardLogic = (img) => {
		cardElement.id = img;
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

		if (cardElement.hasChildNodes()) {
			flippingCounter--;
			cardElement.innerHTML = "";
		} else {
			flippingCounter++;
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
		didCardsMatched();
	});
}
