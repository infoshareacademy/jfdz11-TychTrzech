const pornStarTiles = [
  "star1",
  "star1",
  "star2",
  "star2",
  "star3",
  "star3",
  "star4",
  "star4",
  "star5",
  "star5",
  "star6",
  "star6",
  "star7",
  "star7",
  "star8",
  "star8"
];
// const pornStarTiles = ['star1', 'star1', 'star2', 'star2',  'star3', 'star3','star4', 'star4' , 'star5', 'star5'];
let cards = document.querySelectorAll(".content div");
cards = [...cards];

let scoreboardArray = JSON.parse(localStorage.getItem("scoreboardArray"));
if (scoreboardArray === null) {
  scoreboardArray = [];
}
/*
 ***************************************************timer stop/start****************************************
 */
const scoreboardElement = document.getElementById("scoreboard");
let sortedScoreboard = scoreboardArray.sort((a, b) => a - b);
scoreboardElement.innerHTML = sortedScoreboard
  .map(function(item, index) {
    return index + 1 + ":" + " " + item + "<br />";
  })
  .join("");

const buttonStart = document.getElementById("button__start");
const buttonStop = document.getElementById("button__stop");
let gameResult = 0;

function Timer(buttonStart, buttonStop, info) {
  this.gameTime = 0;
  this.buttonStart = buttonStart;
  this.buttonStop = buttonStop;
  this.info = info;
  this.timeInterval = null;

  this.start = () => {
    this.buttonStart.removeEventListener("click", this.start);
    this.timeInterval = setInterval(() => {
      this.gameTime += 0.01;
      this.info.textContent = this.gameTime.toFixed(2);
    }, 10);
  };

  this.stop = () => {
    clearInterval(this.timeInterval);
    this.buttonStart.addEventListener("click", this.start);
  };

  this.finish = () => {
    clearInterval(this.timeInterval);
  };

  this.getCurrentTime = () => {
    return this.gameTime;
  };

  this.setCurrentTime = time => {
    this.gameTime = time;
  };

  this.start = this.start.bind(this);
}

const timer = new Timer(
  document.getElementById("button__start"),
  document.getElementById("button__stop"),
  document.getElementById("info")
);

buttonStart.addEventListener("click", timer.start);
buttonStart.addEventListener("click", memoryGame);
buttonStop.addEventListener("click", timer.stop);

/********************************************************************************************************/
function BonusTime(buttonBonus) {
  this.result = gameResult;
  this.timeInterval = null;
  this.time = timer.getCurrentTime();
  this.bonusTime = 0;
  this.buttonBonus = buttonBonus;
  this.bonus = 0;

  this.countBonus = () => {
    if (this.timeInterval !== null) {
      console.log("clear interval");
      clearInterval(this.timeInterval);
      if (gameResult - this.result === 2) {
        console.log("sound 2");
        const myAudio1 = document.getElementById("audio1");
        myAudio1.play();
      }
      if (gameResult - this.result === 4) {
        console.log("sound 2");
        const myAudio1 = document.getElementById("audio2");
        myAudio1.play();
      }
      if (gameResult - this.result === 3) {
        console.log("sound 3");
        const myAudio1 = document.getElementById("audio3");
        myAudio1.play();
      }
      if (gameResult - this.result === 5) {
        console.log("sound 4");
        const myAudio1 = document.getElementById("audio4");
        myAudio1.play();
      }
    }
    this.timeInterval = setInterval(() => {
      console.log("poprzedni result to:   " + this.result);
      console.log("obecnt result to: " + gameResult);
      if (gameResult - this.result > 1) {
        this.buttonBonus.textContent = "BONUS: " + this.bonus;
        if (this.bonus < 3) {
          this.bonus += gameResult - this.result;
          this.result = gameResult;
        }
      } else {
        console.log(timer.getCurrentTime());
        timer.setCurrentTime(timer.getCurrentTime() - this.bonus);
        console.log(timer.getCurrentTime());
        this.bonus = 0;
        this.result = gameResult;
        this.buttonBonus.textContent = "NOT BONUS";
      }
    }, 5000);
  };

  this.getBonus = () => {
    return this.bonus;
  };

  this.finish = () => {
    clearInterval(this.timeInterval);
  };
}

const bonus = new BonusTime(document.getElementById("button__bonus"));

/********************************************************************************************************/

function memoryGame() {
  buttonStart.removeEventListener("click", memoryGame);
  let activeCard = "";
  const activeCards = [];
  const gameFinishScore = cards.length / 2;

  const clickCard = function() {
    activeCard = this;
    if (activeCard === activeCards[0]) return;
    activeCard.classList.remove("hidden");
    if (activeCards.length === 0) {
      activeCards[0] = activeCard;
    } else {
      cards.forEach(card => card.removeEventListener("click", clickCard));
      activeCards[1] = activeCard;

      setTimeout(function() {
        if (activeCards[0].className === activeCards[1].className) {
          activeCards.forEach(card => card.classList.add("victory"));
          const myAudioCoin = document.getElementById("coin");
          myAudioCoin.play();
          gameResult++;
          bonus.countBonus();
          cards = cards.filter(card => !card.classList.contains("victory"));
          if (gameResult === gameFinishScore) {
            win();
          }
        } else {
          activeCards.forEach(card => card.classList.add("hidden"));
        }
        activeCard = "";
        activeCards.length = 0;
        cards.forEach(card => card.addEventListener("click", clickCard));
      }, 800);
    }
  };

  function refreshScoreboard(newFinishTime) {
    console.log(scoreboardArray);
    scoreboardArray.push(newFinishTime);
    let sortedScoreboard = scoreboardArray.sort((a, b) => a - b);
    scoreboardElement.innerHTML = sortedScoreboard
      .map(function(item, index) {
        return index + 1 + ":" + " " + item + "<br />";
      })
      .join("");
    localStorage.setItem("scoreboardArray", JSON.stringify(sortedScoreboard));
  }

  function win() {
    //bonus.finish();
    timer.finish();
    const myAudio4 = document.getElementById("audio5");
    myAudio4.play();
    let finishTime = timer.getCurrentTime().toFixed(2);
    document.getElementById("info").textContent =
      "YOUR TIME: " + finishTime + "s";
    refreshScoreboard(finishTime);
    buttonStart.addEventListener("click", () => {
      location.reload();
    });
  }

  const reloadGame = () => {
    const reloadButton = document.querySelector("#button__reload");
    reloadButton.addEventListener("click", () => {
      location.reload();
    });
  };

  const init = function() {
    cards.forEach(card => {
      const position = Math.floor(Math.random() * pornStarTiles.length);
      card.classList.add(pornStarTiles[position]);
      pornStarTiles.splice(position, 1);
    });
    cards.forEach(card => {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard);
    });
  };
  reloadGame();
  init();
}
/**********************************************Next lvl****************************************************/

let check__1 = document.getElementById("Poziom1");
let check__2 = document.getElementById("Poziom2");

let content__2 = document.getElementById("contentDiv");

function newCheck() {
  for (let i = 0; i < 4; i++) {
    let nextDiv = document.createElement("div");
    content__2.appendChild(nextDiv);
  }
  pornStarTiles.push("star9", "star9", "star10", "star10");
  console.log(pornStarTiles);
  let gameFinishScore = cards.length / 2;
  console.log(gameFinishScore);
  const newCards = document.querySelectorAll(".content div");
  cards = [...newCards];
}

check__2 = document
  .getElementById("Poziom2")
  .addEventListener("click", newCheck);
