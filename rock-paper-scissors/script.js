const scoreEl = document.querySelector("#score");
const paperEl = document.querySelector("#paper");
const scissorEl = document.querySelector("#scissor");
const rockEl = document.querySelector("#rock");
const handElements = document.querySelectorAll(".hand");
const choiceScreen = document.querySelector(".choice");
const gameScreen = document.querySelector(".game");
const playerHand = document.querySelector("#player");
const cpuHand = document.querySelector("#cpu");
const playAgainButton = document.querySelector(".play-again");
const resultElement = document.querySelector(".result");
const cpuImage = document.querySelector("#cpu-image");
const btnOpenModal = document.querySelector(".rules");
const btnCloseModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const reset = document.querySelector(".reset");
const options = ["paper", "scissor", "rock"];

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

let score = 0;
scoreEl.textContent = score;
const resetGameScreen = () => {
  playerHand.innerHTML = `
        <div class="game-title">
            <h2>YOU PICKED</h2>
        </div>
    `;
  cpuImage.classList.remove(...cpuImage.classList);
  cpuImage.classList.add("blank");
  cpuImage.innerHTML = "";
  resultElement.classList.add("hidden");
  choiceScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
};

const generateResponse = () => {
  const randomHand = options[Math.floor(Math.random() * 3)];
  setTimeout(() => {
    cpuImage.classList.remove("blank");
    cpuImage.classList.add("game-hand", randomHand);
    cpuImage.innerHTML = `<img src="./images/icon-${randomHand}.svg" alt="${randomHand}" />`;
  }, 1000);
  return randomHand;
};

const generateResult = (playerValue, cpuValue) => {
  let result;
  if (playerValue === cpuValue) return -1;
  if (playerValue === "paper" && cpuValue === "rock") {
    result = 1;
  } else if (playerValue === "scissor" && cpuValue === "paper") {
    result = 1;
  } else if (playerHand === "rock" && cpuValue === "scissor") {
    result = 1;
  } else result = 0;
  return result;
};

const displayResult = (res) => {
  let result, time;
  if (res === -1) {
    result = "IT'S A TIE";
    time = 1600;
  }
  if (res === 0) {
    score--;
    result = "YOU LOSE";
    time = 2000;
  }
  if (res === 1) {
    score++;
    result = "YOU WIN";
    time = 2000;
  }
  setTimeout(() => {
    document.querySelector("#status").textContent = result;
    resultElement.classList.remove("hidden");
    scoreEl.textContent = score;
  }, time);
};

handElements.forEach((el) => {
  el.addEventListener("click", (e) => {
    let value;
    if (e.target.id) value = e.target.id;
    else value = e.target.alt;
    choiceScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    const playerHtml = `
    <div class="game-hand ${value}">
        <img src="./images/icon-${value}.svg" alt="${value}" />
    </div>
    `;
    playerHand.insertAdjacentHTML("beforeend", playerHtml);
    const response = generateResponse();
    const result = generateResult(value, response);
    displayResult(result);
  });
});

playAgainButton.addEventListener("click", (e) => {
  e.preventDefault();
  resetGameScreen();
});

reset.addEventListener("click", (e) => {
  e.preventDefault();
  score = 0;
  scoreEl.textContent = score;
  resetGameScreen();
});
