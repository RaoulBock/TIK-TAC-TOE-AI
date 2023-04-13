// specify variables based on css classes

const selectBox = document.querySelector(".select-box"),
  selectBtnX = document.querySelector(".options .playerX"),
  selectBtnO = document.querySelector(".options .playerO"),
  playBoard = document.querySelector(".play-board"),
  players = document.querySelector(".players"),
  allBox = document.querySelectorAll("section span"),
  resultBox = document.querySelector(".result-box"),
  wonText = document.querySelector(".won-text"),
  replayBtn = document.querySelector("button");

window.onload = () => {
  // make sure that all the boxes on the board is clickable.
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
};

selectBtnX.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
};

selectBtnO.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  players.setAttribute("class", "players active player");
};

let playerXIcon = "X",
  playerOIcon = "O",
  playerSign = "X",
  runBot = true;

// user interaction with the board
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O";
    element.innerHTML = `${playerOIcon}`;
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `${playerXIcon}`;
    element.setAttribute("id", playerSign);
    players.classList.add("active");
  }
  selectWinner();
  element.style.pointerEvents = "none";
  playBoard.style.pointerEvents = "none";

  //buffer time to pretend that the AI is thinking
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomTimeDelay);
}

// computer interaction with the board

function bot() {
  let array = [];
  if (runBot) {
    playerSign = "O";

    // find the remaining boxes that has not been marked

    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    // get random box from remaining tiles
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        playerSign = "X";
        allBox[randomBox].innerHTML = `${playerXIcon}`;
        allBox[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");
      } else {
        allBox[randomBox].innerHTML = `${playerOIcon}`;
        players.classList.add("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

// get's the sign of a certain box
function getIdVal(classname) {
  return document.querySelector(".box" + classname).id;
}

// check 3 tiles to see if they are the same sign
function checkIdSign(val1, val2, val3, sign) {
  if (
    getIdVal(val1) == sign &&
    getIdVal(val2) == sign &&
    getIdVal(val3) == sign
  ) {
    return true;
  }
  return false;
}

// check winner
function selectWinner() {
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    runBot = false;
    bot(runBot);

    // buffer time
    setTimeout(() => {
      resultBox.classList.add("show");
      playBoard.classList.remove("show");
    }, 700);
    wonText.innerHTML = `Player ${playerSign}<br> won the game!`;
  } else {
    // check if the board is full.
    if (
      getIdVal(1) != "" &&
      getIdVal(2) != "" &&
      getIdVal(3) != "" &&
      getIdVal(4) != "" &&
      getIdVal(5) != "" &&
      getIdVal(6) != "" &&
      getIdVal(7) != "" &&
      getIdVal(8) != "" &&
      getIdVal(9) != ""
    ) {
      runBot(false);
      bot(runBot);

      // buffer time to show that match was drawn
      setTimeout(() => {
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
      }, 700);
      wonText.innerHTML = `Draw!`;
    }
  }
}
