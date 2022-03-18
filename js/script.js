const container = document.querySelector(".container");
const remainingLivesElement = document.querySelector(".remaining-lives");
const remainingLivesCount = document.querySelector(".remaining-lives__count");
const cardsWrapper = document.querySelector(".cards-wrapper");
let livesCount = 6;

// FETCH DATA
const fetchData = async () => {
  const response = await fetch("data.json");
  const data = response.json();
  return data;
};

fetchData().then((data) => randomizeData(data));

// RANDOMIZE THE DATA
function randomizeData(mainData) {
  mainData.sort(() => Math.random() - 0.5);
  addCardsInDocument(mainData);
}

// ADD CARDS IN THE DOCUMENT
function addCardsInDocument(mainData) {
  mainData.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src=${element.imgSrc} class="face" />
                        <div class="back"></div>`;
    card.setAttribute("name", element.name);
    cardsWrapper.appendChild(card);

    // CARD CLICK EVENT AND FLIP THE CARD
    card.addEventListener("click", () => {
      card.classList.add("rotate-card");
      card.classList.add("flipped");

      const flippedCards = document.querySelectorAll(".flipped");

      // LOGIC
      if (flippedCards.length === 2) {
        if (
          flippedCards[0].getAttribute("name") ===
          flippedCards[1].getAttribute("name")
        ) {
          flippedCards.forEach((flippedElement) => {
            setTimeout(() => {
              flippedElement.classList.remove("flipped");
              flippedElement.style.pointerEvents = "none";
            }, 500);
          });
          const cards = document.querySelectorAll(".rotate-card");
          if (cards.length === 16) {
            const mainCard = document.querySelectorAll(".card");
            mainCard.forEach((mainCardElement) => {
              setTimeout(() => {
                mainCardElement.classList.remove("flipped");
                mainCardElement.classList.remove("rotate-card");
              }, 500);
              setTimeout(() => {
                mainCardElement.remove();
              }, 800);
            });
            setTimeout(() => {
              restart("&#127881;", "Congractulations! You won the game.");
            }, 1000);
          }
        } else {
          flippedCards.forEach((flippedElement) => {
            setTimeout(() => {
              flippedElement.classList.remove("rotate-card");
              flippedElement.classList.remove("flipped");
            }, 500);
          });
          livesCount--;
          remainingLivesCount.innerText = livesCount;
          if (livesCount === 0) {
            const mainCard = document.querySelectorAll(".card");
            mainCard.forEach((mainCardElement) => {
              setTimeout(() => {
                mainCardElement.classList.remove("flipped");
                mainCardElement.classList.remove("rotate-card");
              }, 500);
              setTimeout(() => {
                mainCardElement.remove();
              }, 800);
            });
            setTimeout(() => {
              restart("&#128542;", "You loss the game!");
            }, 1000);
          }
        }
      }
    });
  });
}

// RESTART THE GAME
function restart(restartEmoji, restartTitle) {
  const restartCard = document.createElement("div");
  restartCard.classList.add("restart-card");
  restartCard.innerHTML = `<span class="restart-card__emoji">${restartEmoji}</span>
                            <h2 class="restart-card__title">${restartTitle}</h2>
                            <button class="restart-btn">Play Again</button>`;
  container.appendChild(restartCard);
  remainingLivesElement.classList.add("restart-game");

  const restartBtn = document.querySelector(".restart-btn");
  restartBtn.addEventListener("click", () => {
    cardsWrapper.classList.remove("restart-game");
    remainingLivesElement.classList.remove("restart-game");
    restartCard.remove();
    fetchData().then((data) => randomizeData(data));
    livesCount = 6;
    remainingLivesCount.innerText = livesCount;
  });
}

// &#127881;
// &#128542;
