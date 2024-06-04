const cardsContainer = document.querySelector(".game");
const cardsElements = document.querySelectorAll(".card");
const scoreElement = document.getElementById("score");
const failedTriesElement = document.getElementById("failed-attempts");
let score = 0;
let failedTries = 0;

for (let i = 0; i < cardsContainer.children.length; i++) {
	const cardElement = cardsContainer.children[i];
	if (i == 0 || i == 1) {
		cardElement.id = "ninja";
	} else if (i == 2 || i == 3) {
		cardElement.id = "car";
	} else if (i == 4 || i == 5) {
		cardElement.id = "football";
	}
}

for (let i = 0; i < cardsContainer.children.length; i++) {
	const cardElement = cardsContainer.children[i];
	cardElement.addEventListener("click", (e) => {
		cardElement.classList.toggle("flipped-card");
		if (cardElement.hasChildNodes()) {
			cardElement.innerHTML = "";
		} else {
			switch (cardElement.id) {
				case "ninja":
					cardElement.innerHTML = `<img src="./img/ninja.jpg" alt="ninja"/>`;
					break;
				case "car":
					cardElement.innerHTML = `<img src="./img/car.jpg" alt="car"/>`;
					break;
				case "football":
					cardElement.innerHTML = `<img src="./img/football.jpg" alt="football"/>`;
					break;
			}
		}

		if (e.target.classList.value !== "") {
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
		}
	});
}
