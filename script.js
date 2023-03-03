"use strict";

// --------------------------------
//      GLOBA VARIABLES
// --------------------------------
let score_players = [0, 0];
let active_player = 0;
let current_score = 0;
let winning_score = 20;

let game_active = true;

// --------------------------------
//      ELEMENT SELECTORS
// --------------------------------

// Selecting Elements
const score_0 = document.getElementById("score--0");
const score_1 = document.getElementById("score--1");

const current_0 = document.getElementById("current--0");
const current_1 = document.getElementById("current--1");

const player0_area = document.querySelector(".player--0");
const player1_area = document.querySelector(".player--1");

const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

// Set Initial Conditions
score_0.textContent = "0";
score_1.textContent = "0";
dice.classList.add("hidden");

// --------------------------------
//      CUSTOM FUNCTIONS
// --------------------------------
const resetCurrent = function () {
  // Restart Current Active Player Score
  document.getElementById(`current--${active_player}`).textContent = "0";

  // Remove Current Player Active Sate
  document
    .querySelector(`.player--${active_player}`)
    .classList.toggle("player--active");

  // Reset Score
  current_score = 0;
  if (score_players[active_player] >= winning_score) {
    // Add Current player Active State
    document
      .querySelector(`.player--${active_player}`)
      .classList.remove("player--active");
    document
      .querySelector(`.player--${active_player}`)
      .classList.add("player--winner");

    // Deactivate Game
    game_active = false;

    // Remove Dice
    dice.classList.add("hidden");
  } else {
    // Change Active Player
    active_player === 0 ? (active_player = 1) : (active_player = 0);

    // Add Current player Active State
    document
      .querySelector(`.player--${active_player}`)
      .classList.toggle("player--active");
  }
};

// --------------------------------
//      EVENT HANDLERS
// --------------------------------
const btnRoll_handler = function () {
  if (game_active) {
    // New Random Number
    let diceNumber = Math.floor(Math.random() * 6) + 1;

    // Get images from File
    dice.src = `img/dice-${diceNumber}.png`;

    // Show Image
    dice.classList.remove("hidden");

    if (diceNumber !== 1) {
      // Add dice to current score
      current_score += diceNumber;

      // Update Current Active Player Score
      document.getElementById(`current--${active_player}`).textContent =
        String(current_score);
    } else {
      // Reset Current
      resetCurrent();
    }
  }
};

const btnHold_handler = function () {
  if (game_active) {
    // Update Player Score
    score_players[active_player] += current_score;

    // Update Current Active Player Score
    document.getElementById(`score--${active_player}`).textContent = String(
      score_players[active_player]
    );

    if (score_players[active_player] === 100) {
      // Add Current player Active State
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${active_player}`)
        .classList.add("player--winner");
    }

    // Reset Current Score
    resetCurrent();
  }
};

const btnNew_handler = function () {
  score_players = [0, 0];
  resetCurrent();
  // Reset Scores
  active_player = 0;
  game_active = true;
  document.getElementById("score--0").textContent = "0";
  document.getElementById("score--1").textContent = "0";
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
};

// --------------------------------
//      EVENT LISTENERS
// --------------------------------
btnRoll.addEventListener("click", btnRoll_handler);
btnHold.addEventListener("click", btnHold_handler);
btnNew.addEventListener("click", btnNew_handler);
